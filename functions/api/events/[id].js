/*
 * Cloudflare Pages Function: GET /api/events/:id
 * Explicitly opt-in. No spreadsheet credentials, private rows or contact data
 * in static assets. This endpoint is READ ONLY, and does not accept drafts
 * or test events even when called directly.
 */
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const PUBLIC_STATUS = new Set(["Coming Soon", "Open", "Fully Booked", "Closed", "Completed", "Cancelled"]);
const HEADERS = ["Event ID", "Event Name", "Event Type", "Golf Course", "Event Date", "First Tee Time",
  "Entry Fee (₱)", "Inclusions", "Maximum Players", "Registration Deadline", "Event Description",
  "Event Image URL", "Status", "Location/Region"];
const isTest = (id, name = "") => /^TEST(?:[-_]|$)/i.test(id) || /^\s*\[TEST\]/i.test(name);
const json = (value, status = 200) => new Response(JSON.stringify(value), {
  status, headers: {"Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex"}
});
const base64url = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)))
  .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const encode = value => base64url(new TextEncoder().encode(JSON.stringify(value)));
let cachedToken;
async function accessToken(env) {
  const service = JSON.parse(env.WAGC_SHEETS_SERVICE_ACCOUNT_JSON);
  if (!service.client_email || !service.private_key) throw new Error("Missing service account");
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.email === service.client_email && cachedToken.expiry > now + 60) return cachedToken.value;
  const payload = encode({alg:"RS256",typ:"JWT"}) + "." + encode({
    iss:service.client_email,scope:"https://www.googleapis.com/auth/spreadsheets.readonly",
    aud:TOKEN_URL,iat:now,exp:now+3000
  });
  const pem = service.private_key.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g,"");
  const der = Uint8Array.from(atob(pem), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8",der,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},false,["sign"]);
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5",key,new TextEncoder().encode(payload));
  const token = await fetch(TOKEN_URL,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body:new URLSearchParams({grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",assertion:payload+"."+base64url(signature)})});
  if (!token.ok) throw new Error("Token unavailable");
  const data = await token.json();
  if (typeof data.access_token !== "string") throw new Error("Token missing");
  cachedToken = {email:service.client_email,value:data.access_token,expiry:now+Math.min(Number(data.expires_in)||300,3000)};
  return data.access_token;
}
// Pure projection function, exported for unit tests. Explicit whitelist only.
export function publicEvent(values, id) {
  if (!Array.isArray(values) || !Array.isArray(values[0]) ||
      !/^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(id) || isTest(id)) return null;
  const header = values[0];
  if (HEADERS.some(name => header.filter(h => h === name).length !== 1)) throw new Error("Event schema mismatch");
  const col = Object.fromEntries(HEADERS.map(name => [name,header.indexOf(name)]));
  const get = (row,name) => String(row[col[name]] ?? "").trim();
  const matches = values.slice(1).filter(row => get(row,"Event ID") === id);
  if (matches.length !== 1) return null;
  const row = matches[0], name = get(row,"Event Name"), status = get(row,"Status");
  if (!name || isTest(id,name) || get(row,"Event Type") !== "Standalone" || !PUBLIC_STATUS.has(status)) return null;
  const capacity = Number(get(row,"Maximum Players").replace(/,/g,""));
  const rawImage = get(row,"Event Image URL");
  let image = "";
  try {
    const u = new URL(rawImage);
    if (u.protocol === "https:" && !u.username && !u.password) image = u.href;
  } catch { if (/^\/images\/[A-Za-z0-9_./-]+$/.test(rawImage) && !rawImage.includes("..")) image = rawImage; }
  return {id,name,status,course:get(row,"Golf Course"),region:get(row,"Location/Region"),
    date:get(row,"Event Date"),teeTime:get(row,"First Tee Time"),fee:get(row,"Entry Fee (₱)"),
    inclusions:get(row,"Inclusions"),capacity:Number.isSafeInteger(capacity)&&capacity>0?capacity:null,
    deadline:get(row,"Registration Deadline"),description:get(row,"Event Description"),image};
}
export async function onRequestGet({env,params}) {
  const id = typeof params.id === "string" ? params.id : "";
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(id) || isTest(id)) return json({error:"Event not found"},404);
  if (env.WAGC_EVENTS_READ_ENABLED !== "true" || !env.WAGC_EVENTS_SHEET_ID || !env.WAGC_SHEETS_SERVICE_ACCOUNT_JSON) {
    return json({error:"Event details unavailable"},503);
  }
  try {
    const token = await accessToken(env);
    const range = encodeURIComponent("'02 Events'!A1:Z201");
    const url = "https://sheets.googleapis.com/v4/spreadsheets/" + encodeURIComponent(env.WAGC_EVENTS_SHEET_ID)
      + "/values/" + range + "?valueRenderOption=FORMATTED_VALUE";
    const response = await fetch(url,{headers:{Authorization:"Bearer "+token,Accept:"application/json"}});
    if (!response.ok) return json({error:"Event details unavailable"},503);
    const result = publicEvent((await response.json()).values,id);
    return result ? json(result) : json({error:"Event not found"},404);
  } catch {
    // Never expose Google errors, credentials, or sheet contents.
    return json({error:"Event details unavailable"},503);
  }
}
