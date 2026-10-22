# 웨일에 새 탭 하나만 열고 그 탭에만 CDP 로 붙는 작은 도구 — 잠든 다른 탭이 있어도 멈추지 않는다.
# with Tab() as t: t.go(url); t.js("...")  → 끝나면 내 탭을 닫는다
import asyncio, json, urllib.request
import websockets


class Tab:
    def __init__(self, port=9222, bg=True):
        self.port, self.bg, self.loop, self.n = port, bg, asyncio.new_event_loop(), 0

    def __enter__(self):
        v = json.load(urllib.request.urlopen("http://127.0.0.1:%d/json/version" % self.port))
        self.ws = self.loop.run_until_complete(websockets.connect(v["webSocketDebuggerUrl"], max_size=None))
        self.tid = self._send("Target.createTarget", {"url": "about:blank", "background": self.bg})["targetId"]
        self.sid = self._send("Target.attachToTarget", {"targetId": self.tid, "flatten": True})["sessionId"]
        self.cmd("Page.enable"); self.cmd("Runtime.enable")
        return self

    def __exit__(self, *a):
        try:
            self._send("Target.closeTarget", {"targetId": self.tid})
        finally:
            self.loop.run_until_complete(self.ws.close())

    def _send(self, method, params=None, sid=None, timeout=60):
        self.n += 1
        msg = {"id": self.n, "method": method, "params": params or {}}
        if sid:
            msg["sessionId"] = sid
        return self.loop.run_until_complete(self._rt(msg, timeout))

    async def _rt(self, msg, timeout):
        await self.ws.send(json.dumps(msg))
        while True:
            r = json.loads(await asyncio.wait_for(self.ws.recv(), timeout))
            if r.get("id") == msg["id"]:
                if "error" in r:
                    raise RuntimeError(r["error"])
                return r.get("result", {})

    def cmd(self, method, params=None, timeout=60):
        return self._send(method, params, self.sid, timeout)

    def js(self, expr, timeout=60):
        r = self.cmd("Runtime.evaluate", {"expression": expr, "returnByValue": True, "awaitPromise": True}, timeout)
        if "exceptionDetails" in r:
            d = r["exceptionDetails"]
            raise RuntimeError((d.get("exception") or {}).get("description") or d.get("text"))
        return r.get("result", {}).get("value")

    def wait(self, sec):
        self.loop.run_until_complete(asyncio.sleep(sec))

    def go(self, url, settle=4):
        self.cmd("Page.navigate", {"url": url})
        for _ in range(60):
            self.wait(0.5)
            try:
                if self.js("document.readyState") in ("interactive", "complete"):
                    break
            except Exception:
                pass
        self.wait(settle)

    def mclick_text(self, text):
        """글이 정확히 text 인 보이는 단추를 화면 좌표로 진짜 마우스 클릭"""
        r = self.js("""(()=>{const el=[...document.querySelectorAll('button,a,label,li,span,div')].filter(e=>(e.innerText||'').trim()===%s&&e.getBoundingClientRect().width>0).pop();
          if(!el) return null; el.scrollIntoView({block:'center'}); const b=el.getBoundingClientRect(); return [b.x+b.width/2,b.y+b.height/2]})()""" % json.dumps(text, ensure_ascii=False))
        if not r:
            return False
        self.wait(0.3)
        for ty in ("mouseMoved", "mousePressed", "mouseReleased"):
            self.cmd("Input.dispatchMouseEvent", {"type": ty, "x": r[0], "y": r[1], "button": "left", "clickCount": 1})
        return True

    def shot(self, path):
        import base64
        d = self.cmd("Page.captureScreenshot", {"format": "png"})["data"]
        open(path, "wb").write(base64.b64decode(d))
