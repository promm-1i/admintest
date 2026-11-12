import { getStore } from "@netlify/blobs";

// Byphoto (phone photos backed up to the home PC): when each phone first opened the app, so that reinstalling it
// doesn't start a new 3-day trial. The phone sends a SHA-256 hash of its app-scoped Android ID, never the ID itself;
// the only thing kept is that hash and the time it was first seen. Same as byscreen-trial, in a store of its own.
export default async (req) => {
  if (req.method !== "POST") return new Response("Not found", { status: 404 });
  let id;
  try {
    ({ id } = await req.json());
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  if (typeof id !== "string" || !/^[0-9a-f]{64}$/.test(id)) return new Response("Bad request", { status: 400 });

  const store = getStore({ name: "byphoto-trial", consistency: "strong" });
  const now = Date.now();
  let first = Number(await store.get(id));
  if (!first) {
    first = now;
    await store.set(id, String(now));
  }
  return Response.json({ first, now }, { headers: { "Cache-Control": "no-store" } });
};

export const config = { path: "/byphoto/api/trial" };
