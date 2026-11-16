import { getStore } from "@netlify/blobs";

// Bydrive family links: noveriq.co.kr/bydrive/s/<pub>/<link id> → the sender's home PC, which serves the file itself
// with a publicly trusted certificate for its IP address. Only the PC's address passes through here; the link id is
// handed on to the PC and checked there (expiry, cut), never stored here. No file, file name or list ever comes here.
// <pub>: the PC's public link name (12 letters, bydrive-signal.mjs keeps it with the PC's addresses).

const PUB = /^[a-z2-7]{12}$/;
const ID = /^[A-Za-z0-9_-]{22}$/;

const page = (ko, en, status) =>
  new Response(
    `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Bydrive</title>
<style>body{margin:0;font:16px/1.5 system-ui,"Malgun Gothic",sans-serif;background:#F4F4F4;color:#111;display:grid;place-items:center;min-height:100vh;padding:24px;text-align:center}
@media (prefers-color-scheme:dark){body{background:#000;color:#F2F2F2}}p{color:#6B6B6B;max-width:30em}</style></head>
<body><div><h1>${ko[0]}</h1><p>${ko[1]}</p><p lang="en">${en}</p></div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex", "Referrer-Policy": "no-referrer" } },
  );

/** The handler without Netlify (tests run it with an in-memory store). */
export async function handle(req, store) {
  const m = /\/bydrive\/s\/([^/]+)\/([^/?#]+)/.exec(new URL(req.url).pathname);
  if (!m || !PUB.test(m[1]) || !ID.test(m[2])) {
    return page(["링크 주소가 맞지 않아요", "받은 링크를 끝까지 다시 복사해 열어 주세요."], "This link address isn't right. Copy the whole link again.", 404);
  }
  const ref = await store.get(`pub:${m[1]}`, { type: "json" });
  const rec = ref?.id ? await store.get(ref.id, { type: "json" }) : null;
  const to = rec?.links?.[0];
  if (!to) {
    return page(
      ["보낸 사람의 PC에 닿지 않아요", "보낸 사람의 집 PC가 꺼져 있거나 바이드라이브가 꺼져 있어요. 잠시 뒤 다시 열어 보거나 보낸 사람에게 알려 주세요."],
      "The sender's home PC can't be reached right now (it may be off). Try again later or let the sender know.",
      503,
    );
  }
  return new Response(null, { status: 302, headers: { Location: `${to}/s/${m[2]}`, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
}

export default async (req) => handle(req, getStore({ name: "bydrive-signal", consistency: "strong" }));

export const config = { path: "/bydrive/s/*" };
