export function getCorsHeaders(req: Request): Record<string, string> {
  const env = Deno.env.get("ALLOWED_ORIGINS") || "";
  const allowed = env.split(",").map(o => o.trim()).filter(Boolean);
  const requestOrigin = req.headers.get("origin") || "";
  let origin = "*";
  if (allowed.length > 0) {
    origin = allowed.includes(requestOrigin) ? requestOrigin : allowed[0];
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}
