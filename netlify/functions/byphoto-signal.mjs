import { getStore } from "@netlify/blobs";
import tls from "node:tls";
import { createHash } from "node:crypto";

// Byphoto (phone photos backed up to the home PC): where a paired phone can reach its PC from outside the house.
// No photo ever passes through here (no relay, 2026-11-12 decision) — only the PC's addresses.
//   put  {op:"put", key, pcId, pin, candidates:[...], check}  PC → its outside addresses (UPnP-mapped IPv4, IPv6);
//        check:true also tries each one from here (TLS, PC's pinned certificate) and says which answered.
//   get  {op:"get", key}                                      phone → the PC's last addresses.
// key: a 32-byte secret only the PC and its paired phones know; the record is kept under its SHA-256.
// See byphoto/docs/remote.md.

const HEX64 = /^[0-9a-f]{64}$/;
const CANDIDATE = /^https:\/\/(\d{1,3}(\.\d{1,3}){3}|\[[0-9a-f:]+\]):\d{1,5}$/;

const sha256 = (s) => createHash("sha256").update(s).digest("hex");
const json = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** TLS to a candidate; true when it shows the certificate with this pin. */
export function probe(candidate, pin, timeoutMs = 4000) {
  const m = /^https:\/\/\[?([^\]]+?)\]?:(\d+)$/.exec(candidate);
  if (!m) return Promise.resolve(false);
  return new Promise((resolve) => {
    let done = false;
    const finish = (ok) => { if (!done) { done = true; socket.destroy(); resolve(ok); } };
    const socket = tls.connect({ host: m[1], port: Number(m[2]), rejectUnauthorized: false, timeout: timeoutMs }, () => {
      const cert = socket.getPeerCertificate();
      finish(!!cert?.raw && sha256(cert.raw) === pin);
    });
    socket.on("timeout", () => finish(false));
    socket.on("error", () => finish(false));
  });
}

/** The handler without Netlify, so byphoto/server/local-signal.mjs can run it with an in-memory store. */
export async function handle(req, store, clientIp) {
  if (req.method !== "POST") return new Response("Not found", { status: 404 });
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  const { op, key } = body ?? {};
  if (typeof key !== "string" || !HEX64.test(key)) return new Response("Bad request", { status: 400 });
  const id = sha256(key);

  if (op === "get") {
    const rec = await store.get(id, { type: "json" });
    return rec ? json(rec) : json({ error: "unknown" }, 404);
  }

  if (op === "put") {
    const { pcId, pin, check } = body;
    const candidates = Array.isArray(body.candidates) ? body.candidates : null;
    if (typeof pcId !== "string" || !/^[0-9a-f]{16}$/.test(pcId) || typeof pin !== "string" || !HEX64.test(pin)) {
      return new Response("Bad request", { status: 400 });
    }
    if (!candidates || candidates.length > 8 || !candidates.every((c) => typeof c === "string" && CANDIDATE.test(c))) {
      return new Response("Bad request", { status: 400 });
    }
    const rec = { pcId, pin, candidates, updated: Date.now() };
    await store.setJSON(id, rec);
    const reachable = check ? (await Promise.all(candidates.map(async (c) => ((await probe(c, pin)) ? c : null)))).filter(Boolean) : null;
    return json({ ok: true, seen: clientIp ?? null, reachable });
  }

  return new Response("Bad request", { status: 400 });
}

export default async (req, context) =>
  handle(req, getStore({ name: "byphoto-signal", consistency: "strong" }), context?.ip ?? req.headers.get("x-nf-client-connection-ip"));

export const config = { path: "/byphoto/api/signal" };
