import { useEffect, useRef } from "react";

/**
 * 커서를 따라 무지개 연기가 소용돌이치는 WebGL 유체 시뮬레이션.
 * 레퍼런스(Fluid Cursor)에서 추출한 설정값을 그대로 사용하고,
 * 알고리즘은 공개된 GPU 유체 기법(MIT, Pavel Dobryakov 계열)을 직접 구현했다.
 * - hover: 이동 궤적을 따라 무지개 색이 분사되고, click: 그 자리에서 터진다
 * - 색은 COLOR_UPDATE_SPEED 속도로 색상환을 순환한다
 * - 화면 밖·탭 숨김에서는 시뮬레이션을 멈춘다. WebGL2 미지원이면 조용히 빠진다.
 */

// 레퍼런스 소스에서 추출한 기본값 그대로
const CONF = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  DENSITY_DISSIPATION: 3.5,
  VELOCITY_DISSIPATION: 2,
  PRESSURE: 0.1,
  PRESSURE_ITERATIONS: 20,
  CURL: 3,
  SPLAT_RADIUS: 0.2,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLOR_UPDATE_SPEED: 10,
};

const BASE_VERT = `
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const CLEAR_FRAG = `
precision mediump float;
varying highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
void main () { gl_FragColor = value * texture2D(uTexture, vUv); }`;

const SPLAT_FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main () {
  vec2 p = vUv - point.xy;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}`;

const ADVECTION_FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
void main () {
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  vec4 result = texture2D(uSource, coord);
  float decay = 1.0 + dissipation * dt;
  gl_FragColor = result / decay;
}`;

const DIVERGENCE_FRAG = `
precision mediump float;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).x;
  float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y;
  float B = texture2D(uVelocity, vB).y;
  vec2 C = texture2D(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }
  float div = 0.5 * (R - L + T - B);
  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}`;

const CURL_FRAG = `
precision mediump float;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y;
  float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x;
  float B = texture2D(uVelocity, vB).x;
  float vorticity = R - L - T + B;
  gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}`;

const VORTICITY_FRAG = `
precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main () {
  float L = texture2D(uCurl, vL).x;
  float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x;
  float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity += force * dt;
  velocity = min(max(velocity, -1000.0), 1000.0);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`;

const PRESSURE_FRAG = `
precision mediump float;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  float divergence = texture2D(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}`;

const GRADIENT_SUBTRACT_FRAG = `
precision mediump float;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`;

const DISPLAY_FRAG = `
precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uTexture;
uniform vec2 texelSize;
void main () {
  vec3 c = texture2D(uTexture, vUv).rgb;
  vec3 lc = texture2D(uTexture, vL).rgb;
  vec3 rc = texture2D(uTexture, vR).rgb;
  vec3 tc = texture2D(uTexture, vT).rgb;
  vec3 bc = texture2D(uTexture, vB).rgb;
  float dx = length(rc) - length(lc);
  float dy = length(tc) - length(bc);
  vec3 n = normalize(vec3(dx, dy, length(texelSize)));
  vec3 l = vec3(0.0, 0.0, 1.0);
  float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
  c *= diffuse;
  float a = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c, a);
}`;

type FBO = {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
};

type DoubleFBO = { read: FBO; write: FBO; swap: () => void; texelSizeX: number; texelSizeY: number };

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: return [v, t, p];
    case 1: return [q, v, p];
    case 2: return [p, v, t];
    case 3: return [p, q, v];
    case 4: return [t, p, v];
    default: return [v, p, q];
  }
}

function generateColor(): [number, number, number] {
  const [r, g, b] = hsvToRgb(Math.random(), 1, 1);
  return [r * 0.15, g * 0.15, b * 0.15];
}

export function HeroFluid({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const host = targetRef.current;
    if (!canvas || !host) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    }) as WebGL2RenderingContext | null;
    if (!gl) return;
    if (!gl.getExtension("EXT_color_buffer_float")) return;
    const supportLinear = Boolean(gl.getExtension("OES_texture_float_linear"));

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const vertexShader = compile(gl.VERTEX_SHADER, BASE_VERT);
    const program = (frag: string) => {
      const p = gl.createProgram()!;
      gl.attachShader(p, vertexShader);
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, frag));
      gl.linkProgram(p);
      const uniforms: Record<string, WebGLUniformLocation> = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < n; i++) {
        const name = gl.getActiveUniform(p, i)!.name;
        uniforms[name] = gl.getUniformLocation(p, name)!;
      }
      return { p, u: uniforms };
    };

    const clearProg = program(CLEAR_FRAG);
    const splatProg = program(SPLAT_FRAG);
    const advectionProg = program(ADVECTION_FRAG);
    const divergenceProg = program(DIVERGENCE_FRAG);
    const curlProg = program(CURL_FRAG);
    const vorticityProg = program(VORTICITY_FRAG);
    const pressureProg = program(PRESSURE_FRAG);
    const gradientProg = program(GRADIENT_SUBTRACT_FRAG);
    const displayProg = program(DISPLAY_FRAG);

    // 풀스크린 삼각형 스트립
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const blit = (target: FBO | null) => {
      if (target) {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const createFBO = (w: number, h: number, internalFormat: number, format: number, filtering: number): FBO => {
      const texture = gl.createTexture()!;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, gl.HALF_FLOAT, null);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX: 1 / w,
        texelSizeY: 1 / h,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    };
    const createDoubleFBO = (w: number, h: number, internalFormat: number, format: number, filtering: number): DoubleFBO => {
      let read = createFBO(w, h, internalFormat, format, filtering);
      let write = createFBO(w, h, internalFormat, format, filtering);
      return {
        get read() { return read; },
        get write() { return write; },
        swap() { const t = read; read = write; write = t; },
        texelSizeX: 1 / w,
        texelSizeY: 1 / h,
      } as DoubleFBO;
    };

    const getResolution = (resolution: number) => {
      let aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspect < 1) aspect = 1 / aspect;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspect);
      return gl.drawingBufferWidth > gl.drawingBufferHeight
        ? { width: max, height: min }
        : { width: min, height: max };
    };

    const filtering = supportLinear ? gl.LINEAR : gl.NEAREST;
    let dye: DoubleFBO;
    let velocity: DoubleFBO;
    let divergence: FBO;
    let curlFBO: FBO;
    let pressure: DoubleFBO;

    const initFramebuffers = () => {
      const simRes = getResolution(CONF.SIM_RESOLUTION);
      const dyeRes = getResolution(CONF.DYE_RESOLUTION);
      dye = createDoubleFBO(dyeRes.width, dyeRes.height, gl.RGBA16F, gl.RGBA, filtering);
      velocity = createDoubleFBO(simRes.width, simRes.height, gl.RG16F, gl.RG, filtering);
      divergence = createFBO(simRes.width, simRes.height, gl.R16F, gl.RED, gl.NEAREST);
      curlFBO = createFBO(simRes.width, simRes.height, gl.R16F, gl.RED, gl.NEAREST);
      pressure = createDoubleFBO(simRes.width, simRes.height, gl.R16F, gl.RED, gl.NEAREST);
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        initFramebuffers();
      }
    };
    resizeCanvas();
    // rAF 첫 프레임 전에 버퍼가 미정의(흰색)로 비치지 않게 즉시 한 번 투명으로 비운다
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // ---- 포인터 ----
    const pointer = {
      down: false,
      moved: false,
      texcoordX: 0,
      texcoordY: 0,
      prevTexcoordX: 0,
      prevTexcoordY: 0,
      deltaX: 0,
      deltaY: 0,
      color: generateColor(),
    };
    let colorTimer = 0;

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = (clientX - rect.left) / rect.width;
      pointer.texcoordY = 1 - (clientY - rect.top) / rect.height;
      const aspect = canvas.width / canvas.height;
      let dx = pointer.texcoordX - pointer.prevTexcoordX;
      let dy = pointer.texcoordY - pointer.prevTexcoordY;
      if (aspect < 1) dx *= aspect;
      if (aspect > 1) dy /= aspect;
      pointer.deltaX = dx;
      pointer.deltaY = dy;
      if (Math.abs(dx) > 0 || Math.abs(dy) > 0) pointer.moved = true;
    };

    const correctRadius = (radius: number) => {
      const aspect = canvas.width / canvas.height;
      return aspect > 1 ? radius * aspect : radius;
    };

    const splat = (x: number, y: number, dx: number, dy: number, color: [number, number, number]) => {
      gl.useProgram(splatProg.p);
      gl.uniform1i(splatProg.u["uTarget"]!, velocity.read.attach(0));
      gl.uniform1f(splatProg.u["aspectRatio"]!, canvas.width / canvas.height);
      gl.uniform2f(splatProg.u["point"]!, x, y);
      gl.uniform3f(splatProg.u["color"]!, dx, dy, 0);
      gl.uniform1f(splatProg.u["radius"]!, correctRadius(CONF.SPLAT_RADIUS / 100));
      blit(velocity.write);
      velocity.swap();
      gl.uniform1i(splatProg.u["uTarget"]!, dye.read.attach(0));
      gl.uniform3f(splatProg.u["color"]!, color[0], color[1], color[2]);
      blit(dye.write);
      dye.swap();
    };

    const onMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);
    };
    const onDown = (e: MouseEvent) => {
      // 클릭 스플랫: 그 자리에서 사방으로 터진다
      updatePointer(e.clientX, e.clientY);
      for (let i = 0; i < 6; i++) {
        const color = generateColor().map((c) => c * 10) as [number, number, number];
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) updatePointer(t.clientX, t.clientY);
    };
    host.addEventListener("mousemove", onMove);
    host.addEventListener("mousedown", onDown);
    host.addEventListener("touchmove", onTouchMove, { passive: true });

    // ---- 시뮬레이션 스텝 ----
    const step = (dt: number) => {
      gl.disable(gl.BLEND);

      gl.useProgram(curlProg.p);
      gl.uniform2f(curlProg.u["texelSize"]!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProg.u["uVelocity"]!, velocity.read.attach(0));
      blit(curlFBO);

      gl.useProgram(vorticityProg.p);
      gl.uniform2f(vorticityProg.u["texelSize"]!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProg.u["uVelocity"]!, velocity.read.attach(0));
      gl.uniform1i(vorticityProg.u["uCurl"]!, curlFBO.attach(1));
      gl.uniform1f(vorticityProg.u["curl"]!, CONF.CURL);
      gl.uniform1f(vorticityProg.u["dt"]!, dt);
      blit(velocity.write);
      velocity.swap();

      gl.useProgram(divergenceProg.p);
      gl.uniform2f(divergenceProg.u["texelSize"]!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProg.u["uVelocity"]!, velocity.read.attach(0));
      blit(divergence);

      gl.useProgram(clearProg.p);
      gl.uniform1i(clearProg.u["uTexture"]!, pressure.read.attach(0));
      gl.uniform1f(clearProg.u["value"]!, CONF.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      gl.useProgram(pressureProg.p);
      gl.uniform2f(pressureProg.u["texelSize"]!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProg.u["uDivergence"]!, divergence.attach(0));
      for (let i = 0; i < CONF.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProg.u["uPressure"]!, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      gl.useProgram(gradientProg.p);
      gl.uniform2f(gradientProg.u["texelSize"]!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradientProg.u["uPressure"]!, pressure.read.attach(0));
      gl.uniform1i(gradientProg.u["uVelocity"]!, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      gl.useProgram(advectionProg.p);
      gl.uniform2f(advectionProg.u["texelSize"]!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(advectionProg.u["uVelocity"]!, velocity.read.attach(0));
      gl.uniform1i(advectionProg.u["uSource"]!, velocity.read.attach(0));
      gl.uniform1f(advectionProg.u["dt"]!, dt);
      gl.uniform1f(advectionProg.u["dissipation"]!, CONF.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(advectionProg.u["uVelocity"]!, velocity.read.attach(0));
      gl.uniform1i(advectionProg.u["uSource"]!, dye.read.attach(1));
      gl.uniform1f(advectionProg.u["dissipation"]!, CONF.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    };

    const render = () => {
      // 초기 버퍼 내용이 미정의라 매 프레임 투명으로 비운 뒤 그린다
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.disable(gl.BLEND);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(displayProg.p);
      gl.uniform2f(displayProg.u["texelSize"]!, 1 / gl.drawingBufferWidth, 1 / gl.drawingBufferHeight);
      gl.uniform1i(displayProg.u["uTexture"]!, dye.read.attach(0));
      blit(null);
    };

    // ---- 루프 (화면 밖·탭 숨김에서는 정지) ----
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let inViewport = true;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.016666);
      last = now;
      resizeCanvas();

      // 색상환 순환 (COLOR_UPDATE_SPEED)
      colorTimer += dt * CONF.COLOR_UPDATE_SPEED * 0.1;
      if (colorTimer >= 1) {
        colorTimer = 0;
        pointer.color = generateColor();
      }

      if (pointer.moved) {
        pointer.moved = false;
        const dx = pointer.deltaX * CONF.SPLAT_FORCE;
        const dy = pointer.deltaY * CONF.SPLAT_FORCE;
        splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
      }

      step(dt);
      render();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (visible && inViewport) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const io = new IntersectionObserver(([entry]) => {
      inViewport = Boolean(entry?.isIntersecting);
      start();
    });
    io.observe(host);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mousedown", onDown);
      host.removeEventListener("touchmove", onTouchMove);
      // loseContext는 부르지 않는다 — StrictMode 재마운트 시 같은 캔버스의 컨텍스트가
      // 영구 lost 상태가 되어 흰 화면만 남는다. GC가 정리하게 둔다.
    };
  }, [targetRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
