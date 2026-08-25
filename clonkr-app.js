const SB_URL = "https://pjqgupbiynamrgxvyvfa.supabase.co";
const SB_SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqcWd1cGJpeW5hbXJneHZ5dmZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTkxMzcyOSwiZXhwIjoyMDk1NDg5NzI5fQ.VVrvpMv2rRZkxiPSu3tgLs24j5pEW1WFkF99tRvOzK0";
const LK = "am_v9";
const CLAUDE_KEY_LS = "am_v9_claudekey";
function getClaudeKey() { try {
    return localStorage.getItem(CLAUDE_KEY_LS) || "";
}
catch {
    return "";
} }
function setClaudeKey(k) { try {
    if (k)
        localStorage.setItem(CLAUDE_KEY_LS, k);
    else
        localStorage.removeItem(CLAUDE_KEY_LS);
}
catch { } }
async function callClaudeAPI(content, maxTokens = 1000) { const key = getClaudeKey(); if (!key) {
    const e = new Error("No Anthropic API key set yet.");
    e.code = "NO_KEY";
    throw e;
} let resp; try {
    resp = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: maxTokens, messages: [{ role: "user", content }] }) });
}
catch (networkErr) {
    const e = new Error("Network request failed before reaching the server — check your internet connection.");
    e.code = "NETWORK";
    throw e;
} const data = await resp.json().catch(() => null); if (!resp.ok) {
    if (resp.status === 401) {
        const e = new Error("That API key was rejected — check it's copied correctly from console.anthropic.com.");
        e.code = "INVALID_KEY";
        throw e;
    }
    const e = new Error(`API error ${resp.status}: ${data?.error?.message || "unknown"}`);
    e.code = "API";
    throw e;
} return data; }
const { useState, useEffect, useCallback, useRef, useMemo, memo } = React;
const ICON_COLORS = { document: "#7a8a9a", envelope: "#4285f4", calendar: "#e0392e", hospital: "#e0392e", phone: "#0fa890", clipboard: "#7a8a9a", chart: "#4285f4", card: "#7c4dff", block: "#e0392e", contact: "#8a6a2e", refresh: "#0fa890", celebrate: "#d4a017", map: "#0fa890", edit: "#d4880a", users: "#4285f4", notebook: "#d4a017", checkCircle: "#0fa890", lock: "#7a8a9a", paperclip: "#7a8a9a", folder: "#d4a017", receipt: "#7a8a9a", handshake: "#0fa890", rocket: "#4285f4", eyeOff: "#7a8a9a", eye: "#4285f4", search: "#7a8a9a", pin: "#e0392e", palette: "#7c4dff", sparkle: "#d4a017", clean: "#8a6a2e", tag: "#d4880a", inbox: "#4285f4", gear: "#7a8a9a", warning: "#d4880a", siren: "#e0392e" };
function Ic({ name, size = 13, style }) { const color = ICON_COLORS[name] || "#7a8a9a"; const s = { display: "inline-block", verticalAlign: -2, flexShrink: 0, ...style }; switch (name) {
    case "document": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" }),
        React.createElement("path", { fill: "#fff", fillOpacity: ".55", d: "M15 2v5h5z" }));
    case "envelope": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("rect", { x: "2", y: "5", width: "20", height: "14", rx: "2", fill: color }),
        React.createElement("path", { fill: "none", stroke: "#fff", strokeOpacity: ".85", strokeWidth: "1.6", d: "M3 6l9 7 9-7" }));
    case "calendar": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2", fill: color }),
        React.createElement("rect", { x: "3", y: "4", width: "18", height: "5", rx: "2", fill: "#fff", fillOpacity: ".35" }),
        React.createElement("rect", { x: "7", y: "13", width: "4", height: "4", fill: "#fff", fillOpacity: ".9" }));
    case "hospital": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "4", fill: color }),
        React.createElement("rect", { x: "10.5", y: "6", width: "3", height: "12", fill: "#fff" }),
        React.createElement("rect", { x: "6", y: "10.5", width: "12", height: "3", fill: "#fff" }));
    case "phone": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" }));
    case "clipboard": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("rect", { x: "5", y: "4", width: "14", height: "17", rx: "2", fill: color }),
        React.createElement("rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", fill: "#5a6472" }),
        React.createElement("rect", { x: "7.5", y: "10", width: "9", height: "1.6", fill: "#fff", fillOpacity: ".8" }),
        React.createElement("rect", { x: "7.5", y: "14", width: "9", height: "1.6", fill: "#fff", fillOpacity: ".8" }));
    case "chart": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("rect", { x: "3", y: "13", width: "4", height: "8", fill: color }),
        React.createElement("rect", { x: "10", y: "8", width: "4", height: "13", fill: color }),
        React.createElement("rect", { x: "17", y: "3", width: "4", height: "18", fill: color }));
    case "card": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("rect", { x: "2", y: "5", width: "20", height: "14", rx: "2", fill: color }),
        React.createElement("rect", { x: "2", y: "9", width: "20", height: "3", fill: "#fff", fillOpacity: ".85" }));
    case "block": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("circle", { cx: "12", cy: "12", r: "9", fill: color }),
        React.createElement("rect", { x: "6", y: "11", width: "12", height: "2", fill: "#fff", transform: "rotate(45 12 12)" }));
    case "contact": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2", fill: color }),
        React.createElement("circle", { cx: "9.5", cy: "11", r: "2.4", fill: "#fff", fillOpacity: ".9" }),
        React.createElement("rect", { x: "14", y: "9", width: "5", height: "1.6", fill: "#fff", fillOpacity: ".7" }),
        React.createElement("rect", { x: "14", y: "12", width: "5", height: "1.6", fill: "#fff", fillOpacity: ".7" }),
        React.createElement("rect", { x: "6.5", y: "15.5", width: "6", height: "1.6", fill: "#fff", fillOpacity: ".7" }));
    case "refresh": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M12 4a8 8 0 1 1-7.6 5.5 1 1 0 1 1 1.9.6A6 6 0 1 0 12 6V3.2a.5.5 0 0 1 .8-.4l3.4 2.5a.5.5 0 0 1 0 .8L12.8 8.6a.5.5 0 0 1-.8-.4V4z" }));
    case "celebrate": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" }),
        React.createElement("circle", { cx: "19", cy: "18", r: "1.6", fill: color }),
        React.createElement("circle", { cx: "5", cy: "17", r: "1.2", fill: color }));
    case "map": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M9 3L3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" }),
        React.createElement("path", { fill: "none", stroke: "#fff", strokeOpacity: ".3", strokeWidth: "1.4", d: "M9 3v16M15 5v16" }));
    case "edit": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M3 17.3V21h3.7L18.8 8.9l-3.7-3.7L3 17.3zM20.7 6.4a1 1 0 0 0 0-1.4l-2.7-2.7a1 1 0 0 0-1.4 0l-1.8 1.8 3.7 3.7 1.8-1.8z" }));
    case "users": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("circle", { cx: "8.5", cy: "8", r: "3.5", fill: color }),
        React.createElement("circle", { cx: "16", cy: "9.5", r: "2.8", fill: color, opacity: ".7" }),
        React.createElement("path", { fill: color, d: "M2 20c0-3.3 2.9-6 6.5-6S15 16.7 15 20v1H2v-1z" }),
        React.createElement("path", { fill: color, opacity: ".7", d: "M15.5 14.5c2.8.3 4.5 2.6 4.5 5.5v1h-3v-1c0-2.1-.6-3.9-1.5-5.5z" }));
    case "notebook": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("rect", { x: "5", y: "3", width: "15", height: "18", rx: "2", fill: color }),
        React.createElement("rect", { x: "2", y: "3", width: "3", height: "18", rx: "1", fill: "#5a4a10" }),
        React.createElement("rect", { x: "8", y: "8", width: "9", height: "1.4", fill: "#fff", fillOpacity: ".7" }),
        React.createElement("rect", { x: "8", y: "12", width: "9", height: "1.4", fill: "#fff", fillOpacity: ".7" }));
    case "checkCircle": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("circle", { cx: "12", cy: "12", r: "9", fill: color }),
        React.createElement("path", { fill: "#fff", d: "M9.5 13.3L7.7 11.5l-1.2 1.2 3 3 6-6-1.2-1.2z" }));
    case "lock": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("rect", { x: "5", y: "10", width: "14", height: "11", rx: "2", fill: color }),
        React.createElement("path", { fill: "none", stroke: color, strokeWidth: "2.4", d: "M7.5 10V7a4.5 4.5 0 0 1 9 0v3" }));
    case "paperclip": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: "none", stroke: color, strokeWidth: "2.2", strokeLinecap: "round", d: "M17 7l-7.5 7.5a3 3 0 1 0 4.2 4.2L21 11.4a5 5 0 1 0-7-7L6 12.5" }));
    case "folder": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6z" }));
    case "receipt": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M5 2h14v20l-2.5-1.5L14 22l-2.5-1.5L9 22l-2.5-1.5L4 22V2h1z" }),
        React.createElement("rect", { x: "7.5", y: "7", width: "9", height: "1.4", fill: "#fff", fillOpacity: ".7" }),
        React.createElement("rect", { x: "7.5", y: "11", width: "9", height: "1.4", fill: "#fff", fillOpacity: ".7" }));
    case "handshake": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M2 11l4-3 4 2 3-2 5 3-3 5-3-2-3 2-3-1-4-4z" }));
    case "rocket": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-3 3-3-3c-1-1-2-3-2-5 0-4 2-8 5-10z" }),
        React.createElement("circle", { cx: "12", cy: "10", r: "1.8", fill: "#fff", fillOpacity: ".8" }),
        React.createElement("path", { fill: color, opacity: ".8", d: "M8 15l-3 1 1 3 2-4zM16 15l3 1-1 3-2-4z" }));
    case "eyeOff": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: "none", stroke: color, strokeWidth: "2", d: "M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "2.6", fill: color }),
        React.createElement("line", { x1: "3", y1: "3", x2: "21", y2: "21", stroke: color, strokeWidth: "2" }));
    case "eye": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: "none", stroke: color, strokeWidth: "2", d: "M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "2.6", fill: color }));
    case "search": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("circle", { cx: "10.5", cy: "10.5", r: "6.5", fill: "none", stroke: color, strokeWidth: "2.4" }),
        React.createElement("line", { x1: "15.5", y1: "15.5", x2: "21", y2: "21", stroke: color, strokeWidth: "2.4", strokeLinecap: "round" }));
    case "pin": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7z" }),
        React.createElement("circle", { cx: "12", cy: "9", r: "2.6", fill: "#fff" }));
    case "palette": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M12 3a9 8 0 0 0 0 16c1.2 0 2-.7 2-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-3.9-4-6-9-6z" }),
        React.createElement("circle", { cx: "8", cy: "10", r: "1.4", fill: "#e0392e" }),
        React.createElement("circle", { cx: "12", cy: "7.5", r: "1.4", fill: "#d4880a" }),
        React.createElement("circle", { cx: "16", cy: "10", r: "1.4", fill: "#0fa890" }));
    case "sparkle": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" }));
    case "clean": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("rect", { x: "10.5", y: "2", width: "2", height: "10", fill: "#a8845a" }),
        React.createElement("path", { fill: color, d: "M6 12h10l-1.5 8a2 2 0 0 1-2 1.6h-3a2 2 0 0 1-2-1.6L6 12z" }));
    case "tag": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M3 3h9l9 9-9 9-9-9V3z" }),
        React.createElement("circle", { cx: "7.5", cy: "7.5", r: "1.6", fill: "#fff" }));
    case "inbox": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M4 4h16l2 8v8H2v-8L4 4z" }),
        React.createElement("path", { fill: "#fff", fillOpacity: ".85", d: "M2 12h6l1.5 3h5L16 12h6v8H2v-8z" }));
    case "gear": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M19.4 13a7.5 7.5 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-1.7-1L15 3h-6l-.3 2.6a7.6 7.6 0 0 0-1.7 1l-2.4-1-2 3.4L4.6 11a7.5 7.5 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 0 0 1.7 1L9 21h6l.3-2.6a7.6 7.6 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6z" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "3", fill: "#fff" }));
    case "warning": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M12 2l11 20H1z" }),
        React.createElement("rect", { x: "11", y: "9", width: "2", height: "6", fill: "#fff" }),
        React.createElement("rect", { x: "11", y: "16.5", width: "2", height: "2", fill: "#fff" }));
    case "siren": return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style: s },
        React.createElement("path", { fill: color, d: "M6 21v-7a6 6 0 0 1 12 0v7z" }),
        React.createElement("rect", { x: "4", y: "21", width: "16", height: "2", rx: "1", fill: color }),
        React.createElement("rect", { x: "11", y: "3", width: "2", height: "4", fill: color }));
    default: return null;
} }
const GOOGLE_CLIENT_ID_DEFAULT = "";
const GOOGLE_API_KEY_DEFAULT = "";
const GOOGLE_CONFIG_LS = "clonkr_google_calendar_config_v2";
function getGoogleConfig() { try {
    const saved = JSON.parse(localStorage.getItem(GOOGLE_CONFIG_LS) || "null");
    return { clientId: saved?.clientId || GOOGLE_CLIENT_ID_DEFAULT, apiKey: saved?.apiKey || GOOGLE_API_KEY_DEFAULT };
}
catch {
    return { clientId: GOOGLE_CLIENT_ID_DEFAULT, apiKey: GOOGLE_API_KEY_DEFAULT };
} }
function saveGoogleConfig(cfg) { try {
    localStorage.setItem(GOOGLE_CONFIG_LS, JSON.stringify({ clientId: cfg.clientId || "", apiKey: cfg.apiKey || "" }));
}
catch { } }
function resetGoogleRuntime() { try {
    if (gcalToken && window.google?.accounts?.oauth2?.revoke)
        window.google.accounts.oauth2.revoke(gcalToken, () => { });
}
catch { } gcalToken = ""; gcalTokenClient = null; gcalInitPromise = null; }
const GOOGLE_CAL_SCOPE = "https://www.googleapis.com/auth/calendar.events";
const GOOGLE_TZ = "Africa/Cairo";
let gcalTokenClient = null;
let gcalToken = "";
let gcalInitPromise = null;
const IS_ELECTRON = !!window.clonkr?.isElectron;
function googleConfigured() { const cfg = getGoogleConfig(); return !!cfg.clientId && cfg.clientId.includes('.apps.googleusercontent.com') && !cfg.clientId.startsWith('YOUR_GOOGLE_'); }
function waitForGoogleLibraries() { if (gcalInitPromise)
    return gcalInitPromise; gcalInitPromise = new Promise((resolve, reject) => { const started = Date.now(); const timer = setInterval(() => { try {
    if (window.google?.accounts?.oauth2?.initTokenClient) {
        clearInterval(timer);
        gcalTokenClient = window.google.accounts.oauth2.initTokenClient({ client_id: getGoogleConfig().clientId, scope: GOOGLE_CAL_SCOPE, callback: () => { } });
        if (!gcalTokenClient)
            throw new Error('Google Identity Services failed to initialize.');
        resolve(true);
        return;
    }
    if (Date.now() - started > 15000) {
        clearInterval(timer);
        reject(new Error('Google Identity Services did not load. Check your internet connection and that accounts.google.com is not blocked.'));
    }
}
catch (err) {
    clearInterval(timer);
    reject(err);
} }, 100); }); return gcalInitPromise; }
async function googleConnect() { if (!googleConfigured())
    throw new Error("Google Web OAuth Client ID is missing or invalid. Enter your Web application Client ID in Google Calendar Setup."); await waitForGoogleLibraries(); if (!gcalTokenClient)
    throw new Error("Google OAuth is not initialized. Refresh ClonKR and try again."); return new Promise((resolve, reject) => { let settled = false; gcalTokenClient.callback = resp => { if (resp?.error) {
    settled = true;
    reject(new Error(resp.error_description || resp.error));
    return;
} gcalToken = resp?.access_token || ''; settled = true; if (!gcalToken)
    reject(new Error("Google did not return an access token."));
else
    resolve(gcalToken); }; try {
    gcalTokenClient.requestAccessToken({ prompt: gcalToken ? '' : 'consent' });
}
catch (err) {
    if (!settled)
        reject(err);
} }); }
function googleDisconnect() { try {
    if (gcalToken && window.google?.accounts?.oauth2?.revoke)
        window.google.accounts.oauth2.revoke(gcalToken, () => { });
}
catch { } gcalToken = ''; }
async function googleApi(path, opts = {}, retried = false) { if (!gcalToken)
    throw new Error("Google Calendar is not connected. Tap Connect Google Calendar first."); const r = await fetch('https://www.googleapis.com/calendar/v3' + path, { ...opts, headers: { Authorization: `Bearer ${gcalToken}`, 'Content-Type': 'application/json', ...(opts.headers || {}) } }); const data = await r.json().catch(() => null); if (r.status === 401 && !retried) {
    try {
        const fresh = await googleConnect();
        gcalToken = fresh || gcalToken;
        if (gcalToken)
            return googleApi(path, opts, true);
    }
    catch { }
} if (!r.ok)
    throw new Error(data?.error?.message || `Google Calendar API error ${r.status}`); return data; }
function gcalEventFromTask(t, date, aName) { const summary = `[AM] ${t.text} - ${aName}`; const body = `Account: ${aName}${t.notes ? `\n${t.notes}` : ""}`; if (t.time) {
    const start = `${date}T${t.time}:00`;
    const d = new Date(`${date}T${t.time}:00`);
    d.setHours(d.getHours() + 1);
    const end = `${d.toISOString().slice(0, 10)}T${d.toTimeString().slice(0, 8)}`;
    return { summary, description: body, start: { dateTime: start, timeZone: GOOGLE_TZ }, end: { dateTime: end, timeZone: GOOGLE_TZ }, extendedProperties: { private: { clonkrType: "task", clonkrTaskId: String(t.id) } } };
} const endDate = new Date(`${date}T00:00:00`); endDate.setDate(endDate.getDate() + 1); const end = endDate.toISOString().slice(0, 10); return { summary, description: body, start: { date }, end: { date: end }, extendedProperties: { private: { clonkrType: "task", clonkrTaskId: String(t.id) } } }; }
async function gcalCreateTask(t, date, aName) { const ev = await googleApi('/calendars/primary/events', { method: 'POST', body: JSON.stringify(gcalEventFromTask(t, date, aName)) }); return ev; }
function gcalEventFromMeeting(m) { const date = m.date || toDay(); if (m.time) {
    const start = `${date}T${m.time}:00`, d = new Date(`${date}T${m.time}:00`);
    d.setHours(d.getHours() + 1);
    const end = `${d.toISOString().slice(0, 10)}T${d.toTimeString().slice(0, 8)}`;
    return { summary: `[Meeting] ${m.name}`, description: m.topic || "", start: { dateTime: start, timeZone: GOOGLE_TZ }, end: { dateTime: end, timeZone: GOOGLE_TZ }, extendedProperties: { private: { clonkrType: "meeting", clonkrMeetingId: String(m.id) } } };
} const endDate = new Date(`${date}T00:00:00`); endDate.setDate(endDate.getDate() + 1); return { summary: `[Meeting] ${m.name}`, description: m.topic || "", start: { date }, end: { date: endDate.toISOString().slice(0, 10) }, extendedProperties: { private: { clonkrType: "meeting", clonkrMeetingId: String(m.id) } } }; }
async function gcalCreateMeeting(m) { return googleApi('/calendars/primary/events', { method: 'POST', body: JSON.stringify(gcalEventFromMeeting(m)) }); }
async function gcalListEvents(year, month) { const start = new Date(year, month, 1); const end = new Date(year, month + 1, 1); const iso = d => d.toISOString(); const q = `?timeMin=${encodeURIComponent(iso(start))}&timeMax=${encodeURIComponent(iso(end))}&singleEvents=true&orderBy=startTime&maxResults=2500`; return googleApi(`/calendars/primary/events${q}`); }
function normalizeGoogleEvent(ev) { if (ev.start?.date)
    return { ...ev, clonkrStartDay: ev.start.date, clonkrStartTime: "", clonkrEndTime: "", clonkrStartHour: null, clonkrAllDay: true }; const dt = ev.start?.dateTime ? new Date(ev.start.dateTime) : null; if (!dt || isNaN(dt.getTime()))
    return null; const parts = new Intl.DateTimeFormat('en-GB', { timeZone: GOOGLE_TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(dt).reduce((o, p) => (o[p.type] = p.value, o), {}); const day = `${parts.year}-${parts.month}-${parts.day}`; const time = `${parts.hour}:${parts.minute}`; let endTime = ""; if (ev.end?.dateTime) {
    const edt = new Date(ev.end.dateTime);
    if (!isNaN(edt.getTime())) {
        const ep = new Intl.DateTimeFormat('en-GB', { timeZone: GOOGLE_TZ, hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(edt).reduce((o, p) => (o[p.type] = p.value, o), {});
        endTime = `${ep.hour}:${ep.minute}`;
    }
} return { ...ev, clonkrStartDay: day, clonkrStartTime: time, clonkrEndTime: endTime, clonkrStartHour: Number(parts.hour), clonkrAllDay: false }; }
const SEHAONE_NETWORK = null;
;
const BI_DEFAULT = [{ id: "axa", name: "AXA Insurance", types: ["carrier", "tpa"], logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/AXA_Logo.svg/500px-AXA_Logo.svg.png", url: "https://www.axa-egypt.com/ar/home", builtin: true }, { id: "metlife", name: "MetLife", types: ["carrier", "tpa"], logo: "https://images.seeklogo.com/logo-png/33/1/metlife-logo-png_seeklogo-330397.png", url: "https://www.metlife.eg/", builtin: true }, { id: "misr", name: "Misr Insurance", types: ["carrier"], logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaPbErlZqk08sPRe2lBYRBDpmzOZlqQ1pcRg&s", url: "https://misrins.com.eg/ar/", builtin: true }, { id: "allianz", name: "Allianz", types: ["carrier"], logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Allianz-logo.png", url: "https://www.allianz.com.eg/ar_EG.html", builtin: true }, { id: "sci", name: "Suez Canal Insurance", types: ["carrier"], logo: "https://www.sci-egypt.com/public/frontdesign/wp-content/uploads/2023/03/about-strateg-768x768.png", url: "https://www.sci-egypt.net/mainpage/", builtin: true }, { id: "delta", name: "Delta Insurance", types: ["carrier"], logo: "https://sms-prod-attachments.s3.amazonaws.com/partners/delta_insurance.jpg", url: "https://www.deltains.org/en", builtin: true }, { id: "chubb", name: "CHUBB", types: ["carrier"], logo: "https://icisa.org/wp-content/uploads/2018/12/chubb.png", url: "https://life.chubb.com/mea-en/egypt/", builtin: true }, { id: "gig", name: "GIG", types: ["carrier"], logo: "https://s3-eu-west-1.amazonaws.com/tpd/logos/631eeccc8e9c83b5ad2db4a5/0x0.png", url: "http://www.amig.com.eg/en/home.aspx", builtin: true }, { id: "royal", name: "Royal Insurance", types: ["carrier"], logo: "https://media.licdn.com/dms/image/v2/D4D0BAQG5N8C4k8Kzig/company-logo_200_200/company-logo_200_200/0/1701368520561/royal_insurance_egypt_logo?e=2147483647&v=beta&t=IN6dc1K9puBOfcxllLvgDj47mdcITt8OHwm0yMz8MhU", url: "https://www.royalinsurance.com.eg/", builtin: true }, { id: "sarwa", name: "Sarwa Life", types: ["carrier"], logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2kulnVB0T_kvKyLXKRxEuF0Ad9m0Ebgq5bw&s", url: "https://sl-portal.sarwa.insurance/ords/r/sl_ws/sme-sarwa/login?session=6425012338206", builtin: true }, { id: "bupa", name: "Bupa", types: ["carrier", "tpa"], logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bupa-logo_2022.png", url: "https://www.bupaglobal.com/en/for-you/egypt-health-insurance", builtin: true }, { id: "globemed", name: "GlobeMed", types: ["tpa"], logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRk-XP8PvRXku-lEuGzJLrSQfJWqfmwQLG4Q&s", url: null, builtin: true }, { id: "medmark", name: "Medmark TPA", types: ["tpa"], logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQQUmGijKTSxOnKnsAHqq4NaPcrYTTx9T5bg&s", url: "https://medmarktpa.com", builtin: true }, { id: "nextcare", name: "NextCare Egypt", types: ["tpa"], logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtKZ7pKUdYPmn82LVUGLCG-UCs6qYipWXX-w&s", url: null, builtin: true }, { id: "medright", name: "Med Right", types: ["tpa"], logo: "https://www.med-right.net/frontend/assets/img/Med-Right-Logo.png", url: null, builtin: true }, { id: "mednet", name: "MedNet Egypt", types: ["tpa"], logo: "https://mednet.com/media/2025-07-28/279/c0aacedbd8bb064a2300bcd4ce145042.jpg", url: null, builtin: true }, { id: "sehaone", name: "SehaOne", types: ["tpa"], logo: "https://media.licdn.com/dms/image/v2/D4D0BAQE4pdp9pCIVrg/company-logo_200_200/company-logo_200_200/0/1725802170206/sehaoneegypt_logo?e=2147483647&v=beta&t=bTwtESoqZqmESRjGYinnCBEiNbn3MNPyUdMROKhezdc", url: null, portalUrl: "", network: SEHAONE_NETWORK, builtin: true }, { id: "egtak", name: "Egyptian Takaful", types: ["carrier"], logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScPVpSOjeqAkvUYbvLkYS02he13EK5n6j7tA&s", url: "https://www.egtak.com/", builtin: true }, { id: "aig", name: "AIG", types: ["carrier"], logo: "https://ariglobal.com/sites/default/files/inline-images/AIG_core_r_rgb.png", url: "https://www.aig.eg/", builtin: true }, { id: "orient", name: "Orient Takaful", types: ["carrier"], logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi80AA7HUFqgNUCtBQPiBv0_-IuraqY4nXPw&s", url: "http://www.orienttakaful.com/", builtin: true }, { id: "qnb", name: "QNB Life", types: ["carrier"], logo: "https://qnblife.com.eg/images/QNB%20AlAhli%20Logo.png", url: "https://qnblife.com.eg/", builtin: true }, { id: "wethaq", name: "Wethaq Takaful", types: ["carrier"], logo: "https://static.wixstatic.com/media/068233_6e0448a6a31d4a869f3e54b15cdf8dc1~mv2.jpg/v1/fit/w_2500,h_1330,al_c/068233_6e0448a6a31d4a869f3e54b15cdf8dc1~mv2.jpg", url: "https://www.wethaq-egypt.com/", builtin: true }, { id: "iskan", name: "Iskan Insurance", types: ["carrier"], logo: "https://www.iskaninsurance.com/Upload/Images_upload/image_share/share_logo.png", url: "https://www.iskaninsurance.com/", builtin: true }, { id: "mohandes", name: "El Mohandes", types: ["carrier"], logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV8ihtinzW1tOODdYZ1Uw2OCsqKoWVLM9otQ&s", url: null, builtin: true }, { id: "misrtak", name: "Misr Takaful", types: ["carrier"], logo: "https://media.licdn.com/dms/image/v2/C4E1BAQEyGVAUUqhbHA/company-background_1536_768/company-background_1536_768/0/1584074265420?e=2147483647&v=beta&t=0EDhwWAuOrL5BzvENC2GT4JPJNjBOkpegAqwwaY0gHA", url: "https://misr-takaful.com/", builtin: true }, { id: "medgulf", name: "MEDGULF", types: ["carrier"], logo: "https://saudipedia.com/var/site/storage/images/0/5/8/6/2646850-1-eng-GB/43a3aaf2f64f-93684.jpg", url: null, builtin: true }, { id: "lst", name: "Libano Suisse Takaful", types: ["carrier"], logo: "https://www.libano-suisse.com/contentfiles/346Image.jpg", url: "http://www.libano-suisse-takaful.com/egypt/english/home", builtin: true }, { id: "kaf", name: "KAF Insurance", types: ["carrier"], logo: "", url: null, builtin: true }, { id: "arope", name: "Arope", types: ["carrier"], logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbjFnRu1NcnVKF-2zDShp4NU5nhXdcBOkSw&s", url: null, builtin: true }, { id: "tokio", name: "Tokyo Marine", types: ["carrier"], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Tokio_Marine.svg/1280px-Tokio_Marine.svg.png", url: "https://www.tokiomarine.com.eg/", builtin: true }, { id: "esih", name: "Egyptian Saudi Insurance House-SALAMA", types: ["carrier"], logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSmwXTk0ZMXTz4A_qtNyebgD0t6iRnKkqX7Q&s", url: null, builtin: true }, { id: "misremir", name: "Misr Emirates", types: ["carrier"], logo: "https://arabmls.org/wp-content/uploads/2024/07/Misr-Emirates-Takaful-Life-Insurance-Egypt2.jpg", url: null, builtin: true }];
const SC = { healthy: { bg: "#e8faf5", text: "#0fa890", label: "Healthy" }, attention: { bg: "#fff8e6", text: "#d4880a", label: "Needs Attention" }, risk: { bg: "#fff0ef", text: "#e0392e", label: "At Risk" } };
const AP = ["#1565c0", "#4527a0", "#00695c", "#6a1b9a", "#ad1457", "#0277bd", "#00838f", "#558b2f"];
const avc = n => AP[(n || "?").charCodeAt(0) % AP.length];
const ini = n => (n || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
const HRS = Array.from({ length: 11 }, (_, i) => i + 9);
const fhr = h => `${h % 12 || 12}${h < 12 ? "am" : "pm"}`;
const TIME_SLOTS = (() => { const out = []; for (let h = 9; h <= 19; h++) {
    out.push({ value: String(h).padStart(2, "0") + ":00", label: fhr(h) });
    if (h < 19)
        out.push({ value: String(h).padStart(2, "0") + ":30", label: fhr(h) + ":30" });
} return out; })();
const DN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MNAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const toDay = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const dkf = o => { const d = new Date(); d.setDate(d.getDate() + o); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const wkf = o => { const d = new Date(); d.setDate(d.getDate() - d.getDay() + o * 7); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
function getMeetingDisplayStatus(meeting) { if (meeting.status === "completed")
    return "completed"; if (meeting.date) {
    const dt = new Date(`${meeting.date}T${meeting.time || "23:59"}:00`);
    if (!isNaN(dt) && dt > new Date())
        return "upcoming";
} return "active"; }
const lds = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fmtShort = k => { try {
    return new Date(k + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
catch {
    return k;
} };
const fmtD = k => { try {
    return new Date(k + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });
}
catch {
    return k;
} };
function sunOf(w = 0) { const d = new Date(); d.setDate(d.getDate() - d.getDay() + w * 7); d.setHours(0, 0, 0, 0); return d; }
function wdays(w = 0) { const s = sunOf(w); return Array.from({ length: 7 }, (_, i) => { const d = new Date(s); d.setDate(d.getDate() + i); return lds(d); }); }
function monthGrid(year, month) { const first = new Date(year, month, 1), last = new Date(year, month + 1, 0), cells = []; for (let i = 0; i < first.getDay(); i++) {
    const d = new Date(year, month, 1 - first.getDay() + i);
    cells.push({ date: lds(d), cur: false });
} for (let i = 1; i <= last.getDate(); i++)
    cells.push({ date: `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`, cur: true }); const rem = (7 - cells.length % 7) % 7; for (let i = 1; i <= rem; i++) {
    const d = new Date(year, month + 1, i);
    cells.push({ date: lds(d), cur: false });
} return cells; }
function fmtCurrency(n) { if (!n && n !== 0)
    return "—"; return new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(n); }
function getAdherents(acc) { if (acc?.adherents)
    return { principal: acc.adherents.principal || 0, family: acc.adherents.family || 0 }; return { principal: acc?.employees || 0, family: 0 }; }
function adherentsTotal(acc) { const a = getAdherents(acc); return a.principal + a.family; }
function getPocs(acc) { const arr = (acc?.pocs || []).filter(p => p && (p.name || p.email || p.phone)); if (arr.length > 0)
    return arr.slice(0, 3); if (acc?.poc && (acc.poc.name || acc.poc.email || acc.poc.phone))
    return [acc.poc]; return []; }
function getUnifiedPocs(data, allIns) { const out = []; (data.accounts || []).forEach(a => { getPocs(a).forEach((p, i) => { if (p.name)
    out.push({ key: `acc_${a.id}_${i}`, name: p.name, email: p.email || "", source: a.name }); }); }); (allIns || []).forEach(ins => { const pocs = (ins.pocs && ins.pocs.length ? ins.pocs : ins.poc?.name ? [ins.poc] : []).filter(p => p && p.name); pocs.forEach((p, i) => out.push({ key: `ins_${ins.id}_${i}`, name: p.name, email: p.email || "", source: ins.name })); }); (data.hospitals || []).forEach(h => { (h.salesAgents || []).forEach(sa => { if (sa.name)
    out.push({ key: `hosp_${h.id}_${sa.id}`, name: sa.name, email: sa.email || "", source: h.name + " (Hospital)" }); }); }); (data.contacts || []).forEach(ct => { if (ct.name)
    out.push({ key: `ct_${ct.id}`, name: ct.name, email: ct.email || "", source: [ct.company, ct.jobTitle].filter(Boolean).join(" · ") || "Contact", contactId: ct.id }); }); return out; }
function excelSerialToDate(serial) { const utcDays = Math.floor(serial - 25569); return new Date(utcDays * 86400 * 1000); }
function parseFlexibleDate(v) {
    if (v instanceof Date && !isNaN(v))
        return v;
    if (typeof v === "number" && v > 0)
        return excelSerialToDate(v);
    if (typeof v === "string") {
        const s = v.trim();
        if (!s)
            return null;
        const m = s.match(/^(\d{1,4})[\/\-.](\d{1,2})[\/\-.](\d{1,4})$/);
        if (m) {
            let a = parseInt(m[1]), b = parseInt(m[2]), yr = parseInt(m[3]);
            if (m[1].length === 4)
                return new Date(a, b - 1, yr);
            if (yr < 100)
                yr += yr < 50 ? 2000 : 1900;
            let day, month;
            if (a > 12 && b <= 12) {
                day = a;
                month = b;
            }
            else if (b > 12 && a <= 12) {
                day = b;
                month = a;
            }
            else {
                day = a;
                month = b;
            }
            const d = new Date(yr, month - 1, day);
            return isNaN(d) ? null : d;
        }
        const d = new Date(s);
        return isNaN(d) ? null : d;
    }
    return null;
}
function ageFromDob(dobDate) { if (!dobDate)
    return ""; const today = new Date(); let age = today.getFullYear() - dobDate.getFullYear(); const m = today.getMonth() - dobDate.getMonth(); if (m < 0 || m === 0 && today.getDate() < dobDate.getDate())
    age--; return age >= 0 && age < 130 ? String(age) : ""; }
function relationBucket(rel) { return (rel || "").toString().trim().toUpperCase().includes("PRINCIP") ? "principal" : "family"; }
function findActiveListSheet(wb) { for (const sn of wb.SheetNames) {
    const ws = wb.Sheets[sn];
    if (!ws['!ref'])
        continue;
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: true });
    for (let i = 0; i < Math.min(5, raw.length); i++) {
        const hdrs = (raw[i] || []).map(h => (h || '').toString().trim().toUpperCase());
        if (hdrs.includes('INDIVIDUAL') && hdrs.includes('RELATION'))
            return { sheetName: sn, headerRowIdx: i, hdrs: (raw[i] || []).map(h => (h || '').toString().trim()), raw };
    }
} return null; }
function parseActiveListRows({ hdrs, raw, headerRowIdx }) { const lc = h => (h || '').toString().trim().toLowerCase(); const findCol = name => hdrs.findIndex(h => lc(h) === name); const colContract = findCol('contnbrd'); const colName = findCol('adherentname'); const colMedId = findCol('individual'); const colDob = findCol('d.o.b'); const colRelation = findCol('relation'); const colSex = findCol('sex'); const colAge = findCol('age'); const colStaff = findCol('staff#'); const g = (row, idx) => idx >= 0 && idx < row.length ? row[idx] : ''; let contractId = ''; const members = []; let skipped = 0; for (let i = headerRowIdx + 1; i < raw.length; i++) {
    const row = raw[i];
    if (!row || row.every(v => v === '' || v == null))
        continue;
    const medId = (g(row, colMedId) || '').toString().trim();
    const relation = (g(row, colRelation) || '').toString().trim();
    if (!medId && !relation) {
        skipped++;
        continue;
    }
    if (!contractId && colContract >= 0) {
        const cv = g(row, colContract);
        if (cv)
            contractId = cv.toString().trim();
    }
    const dobDate = parseFlexibleDate(g(row, colDob));
    members.push({ name: (g(row, colName) || '').toString().trim(), medicalId: medId, dob: dobDate ? dobDate.toISOString().slice(0, 10) : '', age: (g(row, colAge) || '').toString().trim() || ageFromDob(dobDate), staffId: (g(row, colStaff) || '').toString().trim().replace(/^'+|'+$/g, ''), sex: (g(row, colSex) || '').toString().trim().toUpperCase(), relation: relation.toUpperCase(), bucket: relationBucket(relation) });
} const principal = members.filter(m => m.bucket === 'principal').length; const family = members.filter(m => m.bucket === 'family').length; return { contractId, members, principal, family, skipped, format: 'generic' }; }
const AXA_REL_LABELS = { Z: "Principal", ZM: "Principal", W: "Spouse", H: "Spouse", D: "Child", S: "Child", M: "Mother", F: "Father" };
function findAXAActiveListSheet(wb) { for (const sn of wb.SheetNames) {
    const ws = wb.Sheets[sn];
    if (!ws['!ref'])
        continue;
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: true });
    for (let i = 0; i < Math.min(5, raw.length); i++) {
        const hdrs = (raw[i] || []).map(h => (h || '').toString().trim());
        if (hdrs.includes('MainInsuredCardNo') && hdrs.includes('RELATION'))
            return { sheetName: sn, headerRowIdx: i, hdrs, raw };
    }
} return null; }
function parseAXAActiveListRows({ hdrs, raw, headerRowIdx }) { const findCol = name => hdrs.findIndex(h => h.trim() === name); const colClient = findCol('ClientNo'); const colFirst = findCol('FIRSTNAME'); const colMid = findCol('MIDDLENAME'); const colLast = findCol('LASTNAME'); const colMedId = findCol('MainInsuredCardNo'); const colDob = findCol('DOB'); const colSex = findCol('SEX'); const colStaff = findCol('StaffId'); const colRel = findCol('RELATION'); const colMemberType = findCol('MemberType'); const g = (row, idx) => idx >= 0 && idx < row.length ? row[idx] : ''; let contractId = ''; const members = []; let skipped = 0; for (let i = headerRowIdx + 1; i < raw.length; i++) {
    const row = raw[i];
    if (!row || row.every(v => v === '' || v == null))
        continue;
    const medId = (g(row, colMedId) || '').toString().trim();
    const relCode = (g(row, colRel) || '').toString().trim().toUpperCase();
    if (!medId && !relCode) {
        skipped++;
        continue;
    }
    if (!contractId && colClient >= 0) {
        const cv = g(row, colClient);
        if (cv)
            contractId = cv.toString().trim();
    }
    const dobDate = parseFlexibleDate(g(row, colDob));
    const memberType = (g(row, colMemberType) || '').toString().trim().toUpperCase();
    const bucket = memberType === 'EMPLOYEE' ? 'principal' : memberType === 'DEPENDENT' ? 'family' : relCode.startsWith('Z') ? 'principal' : 'family';
    const name = [g(row, colFirst), g(row, colMid), g(row, colLast)].map(x => (x || '').toString().trim()).filter(Boolean).join(' ');
    members.push({ name, medicalId: medId, dob: dobDate ? dobDate.toISOString().slice(0, 10) : '', age: ageFromDob(dobDate), staffId: (g(row, colStaff) || '').toString().trim(), sex: (g(row, colSex) || '').toString().trim().toUpperCase(), relation: AXA_REL_LABELS[relCode] || relCode || (bucket === 'principal' ? 'Principal' : 'Dependent'), bucket });
} const principal = members.filter(m => m.bucket === 'principal').length; const family = members.filter(m => m.bucket === 'family').length; return { contractId, members, principal, family, skipped, format: 'axa' }; }
const METLIFE_REL_LABELS = { '': 'Principal', S: 'Spouse', C: 'Child', P: 'Parent', F: 'Father', M: 'Mother', H: 'Spouse' };
function findMetLifeActiveListSheet(wb, excludeNames = ['termination', 'addition']) { for (const sn of wb.SheetNames) {
    if (excludeNames.some(x => sn.toLowerCase().includes(x)))
        continue;
    const ws = wb.Sheets[sn];
    if (!ws['!ref'])
        continue;
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: true });
    for (let i = 0; i < Math.min(10, raw.length); i++) {
        const hdrs = (raw[i] || []).map(h => (h || '').toString().trim());
        if (hdrs.includes('Policy') && hdrs.includes('Cert. No.') && hdrs.includes('Dependent'))
            return { sheetName: sn, headerRowIdx: i, hdrs, raw };
    }
} return null; }
function parseMetLifeActiveListRows({ hdrs, raw, headerRowIdx }, productFilter = 'CMM') { const findCol = name => hdrs.findIndex(h => h.trim() === name); const colClient = findCol('Client'); const colPolicy = findCol('Policy'); const colCert = findCol('Cert. No.'); const colProduct = findCol('Product'); const colDepType = findCol('Dependent type'); const colLast = findCol('Last Name'); const colFirst = findCol('First Name'); const colMid = findCol('Mid Name'); const colDep = findCol('Dependent'); const colDob = findCol('Dt. Of Birth'); const colSex = findCol('Sex'); const colEmpNo = findCol('Emp No'); const colSvcDesk = findCol('Service Desk ID'); const g = (row, idx) => idx >= 0 && idx < row.length ? row[idx] : ''; const trm = v => v == null ? '' : v.toString().trim(); let contractId = ''; const members = []; let skipped = 0, filteredOutByProduct = 0; for (let i = headerRowIdx + 1; i < raw.length; i++) {
    const row = raw[i];
    if (!row || row.every(v => v === '' || v == null))
        continue;
    const cert = trm(g(row, colCert));
    const depNum = trm(g(row, colDep));
    if (!cert && !depNum) {
        skipped++;
        continue;
    }
    const product = trm(g(row, colProduct)).toUpperCase();
    if (productFilter && product !== productFilter.toUpperCase()) {
        filteredOutByProduct++;
        continue;
    }
    if (!contractId && colClient >= 0) {
        const cv = trm(g(row, colClient));
        if (cv)
            contractId = cv;
    }
    const grp = trm(g(row, colPolicy));
    const dpt = depNum.padStart(2, '0');
    const medicalId = [grp, cert, dpt].filter(Boolean).join('_');
    const dobDate = parseFlexibleDate(trm(g(row, colDob)));
    const depType = trm(g(row, colDepType)).toUpperCase();
    const bucket = depType === '' ? 'principal' : 'family';
    const name = [trm(g(row, colFirst)), trm(g(row, colMid)), trm(g(row, colLast))].filter(Boolean).join(' ');
    members.push({ name, medicalId, dob: dobDate ? dobDate.toISOString().slice(0, 10) : '', age: ageFromDob(dobDate), staffId: trm(g(row, colEmpNo)), sex: trm(g(row, colSex)).toUpperCase(), relation: METLIFE_REL_LABELS[depType] || depType || 'Dependent', bucket, serviceDeskId: trm(g(row, colSvcDesk)) });
} const principal = members.filter(m => m.bucket === 'principal').length; const family = members.filter(m => m.bucket === 'family').length; return { contractId, members, principal, family, skipped, format: 'metlife', filteredOutByProduct }; }
function parseActiveListWorkbook(wb) { const axaSheet = findAXAActiveListSheet(wb); if (axaSheet)
    return { ...parseAXAActiveListRows(axaSheet), sheetName: axaSheet.sheetName }; const metlifeSheet = findMetLifeActiveListSheet(wb); if (metlifeSheet)
    return { ...parseMetLifeActiveListRows(metlifeSheet), sheetName: metlifeSheet.sheetName }; const genericSheet = findActiveListSheet(wb); if (genericSheet)
    return { ...parseActiveListRows(genericSheet), sheetName: genericSheet.sheetName }; return null; }
function ActiveListUploadModal({ acc, onSave, onClose }) {
    const [file, setFile] = useState(null);
    const [parsing, setParsing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const fileRef = useRef(null);
    async function handleFile(e) { const f = e.target.files[0]; if (!f)
        return; setFile(f.name); setParsing(true); setResult(null); setError(null); try {
        const buf = await f.arrayBuffer();
        const wb = XLSX.read(buf, { type: 'array' });
        const parsed = parseActiveListWorkbook(wb);
        if (!parsed) {
            setError(`Could not recognize this file's format (checked for AXA, MetLife, and generic Active List layouts). Sheets in file: ${wb.SheetNames.join(", ")}`);
            setParsing(false);
            return;
        }
        if (parsed.members.length === 0) {
            setError(`0 members found in sheet "${parsed.sheetName}"${parsed.filteredOutByProduct ? ` (${parsed.filteredOutByProduct} rows were excluded for not being CMM product)` : ""}.`);
            setParsing(false);
            return;
        }
        setResult(parsed);
    }
    catch (err) {
        setError("Error: " + err.message);
    } setParsing(false); }
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 620, maxHeight: "90vh", overflowY: "auto" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #edf2f7" } },
                React.createElement("div", { style: { width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#0fa890,#4285f4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 } }, React.createElement(Ic, { name: "users" })),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Upload Active List"),
                    React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } },
                        acc.name,
                        " \u2014 member roster (.xls / .xlsx)")),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
            React.createElement("div", { style: { background: "#f0f6ff", border: "1.5px dashed #4285f444", borderRadius: 10, padding: "14px", marginBottom: 14, textAlign: "center" } },
                React.createElement("button", { style: { ...c.sv, background: "#4285f4", fontSize: 13, padding: "9px 20px" }, onClick: () => fileRef.current?.click(), disabled: parsing }, parsing ? "Reading file..." : file ? "Replace File" : "Upload Active List"),
                file && React.createElement("div", { style: { fontSize: 11, color: "#4285f4", fontWeight: 600, marginTop: 8 } },
                    React.createElement(Ic, { name: "document" }),
                    " ",
                    file),
                React.createElement("input", { ref: fileRef, type: "file", accept: ".xlsx,.xls,.csv", style: { display: "none" }, onChange: handleFile }),
                React.createElement("div", { style: { fontSize: 10, color: "#a8bccf", marginTop: 6 } }, "Reads INDIVIDUAL (medical ID), D.O.B, AGE, STAFF#, SEX, RELATION and CONTNBRD (contract ID) columns \u2014 column order doesn't matter."),
                parsing && React.createElement("div", { style: { marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 } },
                    React.createElement("div", { style: { width: 16, height: 16, borderRadius: "50%", border: "3px solid #e8f0fe", borderTopColor: "#4285f4", animation: "spinSlow .8s linear infinite" } }),
                    React.createElement("span", { style: { fontSize: 11, color: "#4285f4" } }, "Reading roster..."))),
            error && React.createElement("div", { style: { background: "#fff0ef", border: "1px solid #e0392e33", borderRadius: 8, padding: "9px 12px", fontSize: 11, color: "#e0392e", lineHeight: 1.6, whiteSpace: "pre-wrap", marginBottom: 14 } }, error),
            result && React.createElement("div", null,
                React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" } },
                    React.createElement("div", { style: { background: "#e8faf8", border: "1px solid #5dd8c844", borderRadius: 9, padding: "9px 14px" } },
                        React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", fontWeight: 700, textTransform: "uppercase" } }, "Contract ID"),
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#0fa890", fontFamily: "'Clash Display',sans-serif" } }, result.contractId || "—")),
                    React.createElement("div", { style: { background: "#f0f6ff", border: "1px solid #4285f444", borderRadius: 9, padding: "9px 14px" } },
                        React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", fontWeight: 700, textTransform: "uppercase" } }, "Principal"),
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#4285f4", fontFamily: "'Clash Display',sans-serif" } }, result.principal)),
                    React.createElement("div", { style: { background: "#fff8ec", border: "1px solid #d4880a44", borderRadius: 9, padding: "9px 14px" } },
                        React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", fontWeight: 700, textTransform: "uppercase" } }, "Family"),
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#d4880a", fontFamily: "'Clash Display',sans-serif" } }, result.family)),
                    React.createElement("div", { style: { background: "#f7fbff", border: "1px solid #dde8f0", borderRadius: 9, padding: "9px 14px" } },
                        React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", fontWeight: 700, textTransform: "uppercase" } }, "Total Adherents"),
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#0f1c2e", fontFamily: "'Clash Display',sans-serif" } }, result.principal + result.family))),
                React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginBottom: 8 } },
                    "\u2713 ",
                    result.members.length,
                    " members found in \"",
                    result.sheetName,
                    "\"",
                    result.skipped > 0 ? ` · ${result.skipped} rows skipped` : "",
                    result.filteredOutByProduct > 0 ? ` · ${result.filteredOutByProduct} non-CMM (life-only) rows excluded` : "",
                    ". Saving will update this account's Adherents (Principal/Family) automatically."),
                React.createElement("div", { style: { maxHeight: 280, overflowY: "auto", border: "1px solid #edf2f7", borderRadius: 10 } },
                    React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 11 } },
                        React.createElement("thead", null,
                            React.createElement("tr", { style: { background: "#f7fbff", position: "sticky", top: 0 } }, ["Name", "Medical ID", "DOB", "Age", "Staff ID", "Sex", "Relation", ...(result.format === "metlife" ? ["Service Desk ID"] : [])].map(h => React.createElement("th", { key: h, style: { textAlign: "left", padding: "6px 9px", fontWeight: 700, color: "#7a9ab5", fontSize: 10, textTransform: "uppercase", borderBottom: "1px solid #edf2f7" } }, h)))),
                        React.createElement("tbody", null, result.members.map((m, i) => React.createElement("tr", { key: i, style: { borderBottom: "1px solid #f7fbff" } },
                            React.createElement("td", { style: { padding: "5px 9px" } }, m.name),
                            React.createElement("td", { style: { padding: "5px 9px" } }, m.medicalId),
                            React.createElement("td", { style: { padding: "5px 9px" } }, m.dob ? fmtShort(m.dob) : "—"),
                            React.createElement("td", { style: { padding: "5px 9px" } }, m.age || "—"),
                            React.createElement("td", { style: { padding: "5px 9px" } }, m.staffId || "—"),
                            React.createElement("td", { style: { padding: "5px 9px" } }, m.sex || "—"),
                            React.createElement("td", { style: { padding: "5px 9px" } },
                                React.createElement("span", { style: { background: m.bucket === "principal" ? "#e8f0fe" : "#fff8ec", color: m.bucket === "principal" ? "#4285f4" : "#d4880a", padding: "2px 8px", borderRadius: 10, fontWeight: 700, fontSize: 10 } }, m.relation)),
                            result.format === "metlife" && React.createElement("td", { style: { padding: "5px 9px" } }, m.serviceDeskId || "—")))))),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 14 } },
                    React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                    React.createElement("button", { style: { ...c.sv, background: "linear-gradient(135deg,#0fa890,#4285f4)" }, onClick: () => onSave(result) }, "\u2713 Save Active List"))),
            !result && !parsing && React.createElement("div", { style: { display: "flex", justifyContent: "flex-end" } },
                React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"))));
}
function getCycleInfo(freq) { return { quarterly: { label: "Quarterly", divisor: 4, step: 3 }, "semi-annually": { label: "Semi-Annual", divisor: 2, step: 6 }, annually: { label: "Annual", divisor: 1, step: 12 } }[freq] || { label: "Quarterly", divisor: 4, step: 3 }; }
function getNextPaymentDates(startDate, frequency, n = 4) { if (!startDate)
    return []; const ci = getCycleInfo(frequency); if (ci.divisor === 1) {
    const dates = [];
    let d = new Date(startDate);
    const now = new Date();
    while (d <= now) {
        const nd = new Date(d);
        nd.setFullYear(nd.getFullYear() + 1);
        d = nd;
    }
    for (let i = 0; i < n; i++) {
        dates.push(new Date(d));
        const nd = new Date(d);
        nd.setFullYear(nd.getFullYear() + 1);
        d = nd;
    }
    return dates;
} const dates = []; let d = new Date(startDate); const now = new Date(); while (d <= now) {
    const nd = new Date(d);
    nd.setMonth(nd.getMonth() + ci.step);
    d = nd;
} for (let i = 0; i < n; i++) {
    dates.push(new Date(d));
    const nd = new Date(d);
    nd.setMonth(nd.getMonth() + ci.step);
    d = nd;
} return dates; }
function getNextSingleDate(startDate, frequency) { const r = getNextPaymentDates(startDate, frequency, 1); return r[0] || null; }
function getPaymentSchedule(startDate, frequency) {
    if (!startDate)
        return [];
    const ci = getCycleInfo(frequency);
    const step = ci.divisor === 1 ? 12 : ci.step;
    const now = new Date();
    const start = new Date(startDate);
    const schedule = [];
    for (let i = 0; i < ci.divisor; i++) {
        const dt = new Date(start);
        dt.setMonth(dt.getMonth() + step * i);
        schedule.push({ date: dt, cycleKey: lds(dt),
            isPast: dt <= now });
    }
    return schedule;
}
function daysUntil(dt) { return Math.ceil((new Date(dt) - new Date()) / 86400000); }
function hscore(acc) { let s = 100; const open = Object.values(acc.tasks || {}).flat().filter(t => !t.done && !t.ended).length; s -= Math.min(30, open * 5); if (acc.renewalDate) {
    const d = (new Date(acc.renewalDate) - new Date()) / 86400000;
    if (d < 7)
        s -= 25;
    else if (d < 30)
        s -= 15;
    else if (d < 60)
        s -= 5;
} return Math.max(0, Math.min(100, s)); }
const hscColor = s => s >= 80 ? "#0fa890" : s >= 60 ? "#d4880a" : "#e0392e";
const sbKeyConfigured = () => SB_SECRET_KEY && !SB_SECRET_KEY.startsWith("PASTE_YOUR_");
const sbH = () => ({ headers: { "apikey": SB_SECRET_KEY, "Authorization": `Bearer ${SB_SECRET_KEY}` } });
const sbPH = () => ({ headers: { "apikey": SB_SECRET_KEY, "Authorization": `Bearer ${SB_SECRET_KEY}`, "Content-Type": "application/json" } });
async function sbGet(t, q = "") { if (!sbKeyConfigured()) {
    console.warn("Supabase sync disabled: paste your service_role key into SB_SECRET_KEY (local use only).");
    return { ok: false, disabled: true, rows: [] };
} const r = await fetch(`${SB_URL}/rest/v1/${t}${q}`, sbH()); if (!r.ok)
    throw new Error(`Supabase GET ${t} failed: ${r.status} ${r.statusText}`); return { ok: true, disabled: false, rows: await r.json() }; }
async function sbUpsert(t, b) { if (!sbKeyConfigured())
    return; try {
    await fetch(`${SB_URL}/rest/v1/${t}`, { method: "POST", ...sbPH(), headers: { ...sbPH().headers, "Prefer": "resolution=merge-duplicates" }, body: JSON.stringify(b) });
}
catch { } }
function gcalUrl(t, date, aName) { const base = "https://calendar.google.com/calendar/render?action=TEMPLATE"; const ti = encodeURIComponent(`[AM] ${t.text} - ${aName}`), de = encodeURIComponent(`Account: ${aName}`); if (t.time) {
    const [hh, mm] = t.time.split(":");
    const s = new Date(`${date}T${hh}:${mm}:00`), e = new Date(s.getTime() + 3600000), fmt = d => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    return `${base}&text=${ti}&details=${de}&dates=${fmt(s)}/${fmt(e)}`;
} const dd = date.replace(/-/g, ""); return `${base}&text=${ti}&details=${de}&dates=${dd}/${dd}`; }
function addDaysISO(dateStr, n) { if (!dateStr)
    return ""; const dt = new Date(dateStr + "T00:00:00"); if (isNaN(dt.getTime()))
    return ""; dt.setDate(dt.getDate() + n); return dt.toISOString().slice(0, 10); }
const RENEWAL_STAGES = [{ key: "m1_4", label: "Month 1–4", subtitle: "Service Delivery — exceed expectations!", tasks: [{ id: "cards_day1", label: "Cards delivered on Day 1", critical: true }, { id: "onboarding", label: "Onboarding", isOnboardingLink: true }, { id: "fast_am", label: "Fast Account Management & customer care" }, { id: "wellness_started", label: "Wellness started" }, { id: "bh_active", label: "Benefits Hero active" }] }, { key: "m5", label: "Month 5", subtitle: "Health Engagement Survey", tasks: [{ id: "health_eng_sent", label: "Sent Health Engagement" }, { id: "health_eng_followup", label: "Follow up: email & call if not started within 5 days" }, { id: "health_eng_completed", label: "Completed!" }] }, { key: "m6", label: "Month 6", subtitle: "Service Level Review", tasks: [{ id: "health_eng_analysis", label: "Health Engagement Analysis report" }, { id: "utilization_analysis", label: "Utilization Analysis" }, { id: "bh_analysis", label: "BH analysis" }, { id: "refund_approvals", label: "Refund & Approvals reports" }, { id: "slr_meeting", label: "SLR Meeting" }, { id: "meeting_minutes", label: "Sent meeting minutes" }] }, { key: "m7_8", label: "Month 7–8", subtitle: "Renewal starts + obtaining proposals", tasks: [{ id: "renewal_email", label: "Send client renewal email", critical: true }, { id: "obtain_proposals", label: "Obtain proposals from all insurers", critical: true }, { id: "shortlist1", label: "Get shortlist of insurers to present to client" }] }, { key: "m9", label: "Month 9", subtitle: "1st renewal meeting", tasks: [{ id: "meet_present", label: "Meet with client / present comparison", critical: true }] }, { key: "m9_11", label: "Month 9–11", subtitle: "Negotiations", tasks: [{ id: "negotiate", label: "Negotiate with insurers" }, { id: "keep_negotiating", label: "Keep negotiating — we are always still negotiating" }, { id: "low_cover_option", label: "Low cover / low budget option" }, { id: "advisory_role", label: "Strong advisory role" }, { id: "shortlist2", label: "Get shortlist of insurers to present to client" }] }, { key: "m11_12", label: "Month 11–12", subtitle: "Renewal warning", tasks: [{ id: "warn45", label: "1st warning — 45 days before renewal", dueOffsetDays: 45, critical: true }, { id: "warn30", label: "2nd warning — 30 days before renewal", dueOffsetDays: 30, critical: true }, { id: "warn15", label: "3rd warning — 15 days before renewal", dueOffsetDays: 15, critical: true }] }, { key: "m12", label: "Month 12", subtitle: "Final renewal meeting + Booking", tasks: [{ id: "final_meeting", label: "Final renewal meeting — 30 days before renewal (with or without insurers)", dueOffsetDays: 30, critical: true }, { id: "booking", label: "Booking — 21 days before renewal", dueOffsetDays: 21, critical: true }] }];
const RENEWAL_TASK_IDS = RENEWAL_STAGES.flatMap(s => s.tasks.filter(t => !t.isOnboardingLink).map(t => t.id));
const RENEWAL_CRITICAL_IDS = RENEWAL_STAGES.flatMap(s => s.tasks.filter(t => t.critical).map(t => t.id));
const RENEWAL_TASK_INDEX = Object.fromEntries(RENEWAL_STAGES.flatMap(s => s.tasks.map(t => [t.id, { ...t, stageKey: s.key, stageLabel: s.label }])));
const ONBOARDING_SECTIONS = [{ key: "cards", label: "Cards & Archiving", tasks: [{ id: "ob_cards_delivered", label: "Cards delivered on Day 1" }, { id: "ob_docs_drive", label: "Booking and signed documents update on Drive" }] }, { key: "contacts", label: "Contacts — Decision Makers & Influencers", tasks: [{ id: "ob_dm_bh", label: "Decision makers & influencers updated on Benefits Hero (with corresponding roles)" }, { id: "ob_hr", label: "HR" }, { id: "ob_management", label: "Management" }, { id: "ob_finance", label: "Finance" }, { id: "ob_crm", label: "Contacts sent to Marketing to update CRM" }] }, { key: "employees", label: "Employees", tasks: [{ id: "ob_emails_mobiles", label: "Emails & mobiles collected during booking" }] }, { key: "automation", label: "Automation — Benefits Hero", tasks: [{ id: "ob_build_channels", label: "Build benefits & communication channels" }, { id: "ob_video_tutorial", label: "Video tutorial / benefits explainer" }, { id: "ob_bh_csm_intro", label: "BH Customer Success Account Manager introduction" }] }, { key: "wellness", label: "Wellness", tasks: [{ id: "ob_wellness_intro", label: "Wellness program manager introduction" }, { id: "ob_wellness_2mo", label: "Ensure wellness program starts in first 2 months" }] }, { key: "training", label: "Training & Celebrating Success", tasks: [{ id: "ob_training_session", label: "Training session" }, { id: "ob_customer_care", label: "Customer Care awareness" }, { id: "ob_photo_client", label: "Photo with client" }, { id: "ob_recommendation", label: "Ask for a recommendation" }] }];
const ONBOARDING_TASK_IDS = ONBOARDING_SECTIONS.flatMap(s => s.tasks.map(t => t.id));
function getChecklist(checklistsMap, accId) { return checklistsMap && checklistsMap[accId] || { tasks: {}, onboarding: {}, quickNote: "" }; }
function getTaskState(chk, taskId) { return chk.tasks && chk.tasks[taskId] || { status: "not_started" }; }
function milestoneDate(acc, task) { if (!task.dueOffsetDays || !acc.renewalDate)
    return null; return addDaysISO(acc.renewalDate, -task.dueOffsetDays); }
function effectiveDueDate(acc, chk, task) { return getTaskState(chk, task.id).dueDate || milestoneDate(acc, task); }
function computeRenewalProgress(chk) { const done = RENEWAL_TASK_IDS.filter(id => getTaskState(chk, id).status === "completed").length; return { done, total: RENEWAL_TASK_IDS.length, pct: RENEWAL_TASK_IDS.length ? Math.round(done / RENEWAL_TASK_IDS.length * 100) : 0 }; }
function computeOnboardingProgress(chk) { const done = ONBOARDING_TASK_IDS.filter(id => chk.onboarding && chk.onboarding[id]).length; return { done, total: ONBOARDING_TASK_IDS.length, pct: ONBOARDING_TASK_IDS.length ? Math.round(done / ONBOARDING_TASK_IDS.length * 100) : 0 }; }
function computeOverallProgress(chk) { const r = computeRenewalProgress(chk), o = computeOnboardingProgress(chk); const total = r.total + o.total, done = r.done + o.done; return { done, total, pct: total ? Math.round(done / total * 100) : 0 }; }
function computeCurrentStage(acc) { if (!acc.renewalDate)
    return null; const days = Math.ceil((new Date(acc.renewalDate) - new Date()) / 86400000); if (days <= 15)
    return "m12"; if (days <= 45)
    return "m11_12"; if (days <= 90)
    return "m9_11"; if (days <= 120)
    return "m9"; if (days <= 180)
    return "m7_8"; if (days <= 210)
    return "m6"; if (days <= 240)
    return "m5"; return "m1_4"; }
function computeRenewalHealth(acc, chk) { if (!acc.renewalDate)
    return "unknown"; const now = new Date(); let hasOverdueCritical = false, hasUpcomingCritical = false; for (const id of RENEWAL_CRITICAL_IDS) {
    const task = RENEWAL_TASK_INDEX[id];
    const st = getTaskState(chk, id);
    if (st.status === "completed")
        continue;
    const due = effectiveDueDate(acc, chk, task);
    if (!due)
        continue;
    const diffDays = Math.ceil((new Date(due) - now) / 86400000);
    if (diffDays < 0)
        hasOverdueCritical = true;
    else if (diffDays <= 7)
        hasUpcomingCritical = true;
} if (hasOverdueCritical)
    return "critical"; if (hasUpcomingCritical)
    return "at_risk"; return "on_track"; }
const HEALTH_META = { on_track: { label: "ON TRACK", color: "#0fa890", bg: "#e8faf8" }, at_risk: { label: "AT RISK", color: "#d4880a", bg: "#fff8e6" }, critical: { label: "CRITICAL", color: "#e0392e", bg: "#fff0ef" }, unknown: { label: "NO RENEWAL DATE", color: "#7a9ab5", bg: "#f0f4f8" } };
function taskCellText(chk, ids) { const parts = ids.map(id => { const st = getTaskState(chk, id); const label = RENEWAL_TASK_INDEX[id]?.label || id; if (st.status === "completed")
    return `${label}: Done`; if (st.status === "in_progress")
    return `${label}: In progress${st.description ? " — " + st.description : ""}`; if (st.status === "blocked")
    return `${label}: Blocked${st.description ? " — " + st.description : ""}`; return null; }).filter(Boolean); return parts.join(" | "); }
function onboardingCellText(chk, ids) { const done = ids.filter(id => chk.onboarding && chk.onboarding[id]).length; if (done === 0)
    return ""; if (done === ids.length)
    return "Done"; return `In progress (${done}/${ids.length})`; }
function exportChecklistToExcel(acc, chk) {
    const wb = XLSX.utils.book_new();
    const q1 = [["Company Name", "Cards delivery on day one", "Booking & signed documents / Contracts", "Contacts Collection", "Automation(BH)", "Wellness", "Training and celebrating success"], [acc.name, taskCellText(chk, ["cards_day1"]), onboardingCellText(chk, ["ob_docs_drive"]), onboardingCellText(chk, ["ob_dm_bh", "ob_hr", "ob_management", "ob_finance", "ob_crm", "ob_emails_mobiles"]), onboardingCellText(chk, ["ob_build_channels", "ob_video_tutorial", "ob_bh_csm_intro"]), onboardingCellText(chk, ["ob_wellness_intro", "ob_wellness_2mo"]), onboardingCellText(chk, ["ob_training_session", "ob_customer_care", "ob_photo_client", "ob_recommendation"])]];
    const q2 = [["Company Name", "Health engagement Survey", "Health Engagement analysis", "Consumptions Analysis", "Consumptions submission on BH", "Reimb. & Approvals collective report", "SLA client meeting"], [acc.name, taskCellText(chk, ["health_eng_sent", "health_eng_followup", "health_eng_completed"]), taskCellText(chk, ["health_eng_analysis"]), taskCellText(chk, ["utilization_analysis"]), taskCellText(chk, ["bh_analysis"]), taskCellText(chk, ["refund_approvals"]), taskCellText(chk, ["slr_meeting", "meeting_minutes"])]];
    const q3 = [["Company Name", "Client Renewal Mail (temp)", "Proposals Request (on the 8th Month)"], [acc.name, taskCellText(chk, ["renewal_email"]), taskCellText(chk, ["obtain_proposals", "shortlist1"])]];
    const q4 = [["Company Name", "First Renewal Meeting", "Negotiation Feedback (client)", "Negotiation Feedback (RC)", "1st Renewal Warning", "2nd Renewal Warning", "Final Renewal Meeting", "Booking"], [acc.name, taskCellText(chk, ["meet_present"]), taskCellText(chk, ["keep_negotiating", "low_cover_option", "advisory_role"]), taskCellText(chk, ["negotiate"]), taskCellText(chk, ["warn45"]), taskCellText(chk, ["warn30", "warn15"]), taskCellText(chk, ["final_meeting"]), taskCellText(chk, ["booking"])]];
    [["First Quarter", q1], ["Second Quarter", q2], ["Third Quarter", q3], ["Fourth Quarter", q4]].forEach(([name, rows]) => { const ws = XLSX.utils.aoa_to_sheet(rows); ws["!cols"] = rows[0].map(h => ({ wch: Math.max(18, String(h).length + 2) })); XLSX.utils.book_append_sheet(wb, ws, name); });
    const overall = computeOverallProgress(chk), renProg = computeRenewalProgress(chk), obProg = computeOnboardingProgress(chk);
    const summary = [["ClonKR Renewal Checklist Export"], ["Company Name", acc.name], ["Renewal Date", acc.renewalDate ? fmtShort(acc.renewalDate) : "Not available"], ["Renewal Health", HEALTH_META[computeRenewalHealth(acc, chk)]?.label || ""], ["Overall Progress", `${overall.pct}% (${overall.done}/${overall.total})`], ["Renewal Progress", `${renProg.pct}% (${renProg.done}/${renProg.total})`], ["Onboarding Progress", `${obProg.pct}% (${obProg.done}/${obProg.total})`], ["Quick Note", chk.quickNote || ""], ["Exported", new Date().toLocaleString()]];
    const wsSum = XLSX.utils.aoa_to_sheet(summary);
    wsSum["!cols"] = [{ wch: 20 }, { wch: 50 }];
    XLSX.utils.book_append_sheet(wb, wsSum, "Summary");
    XLSX.writeFile(wb, `${acc.name.replace(/[^a-z0-9]+/gi, "_")}_checklist_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
const BLOCK_LABELS = { combined: "Medical & Life", medical: "Medical", life: "Life", family: "Family Separated Policy" };
const BLOCK_PREFIX = { combined: "comb", medical: "med", life: "life", family: "fam" };
function getPolicyBlocks(o) { const blocks = []; if (o.pkCombined)
    blocks.push({ key: "combined", label: BLOCK_LABELS.combined, carrierId: o.combCarrierId || "", tpaId: o.combTpaId || "", tpaIsCarrier: !!o.combTpaIsCarrier, hmoId: o.combHmoId || "", policyNumber: o.combPolicyNumber || "", startDate: o.combPolicyStartDate || "", endDate: o.combPolicyEndDate || "", premiumNoTax: parseFloat(o.combPremiumNoTax) || 0 }); if (o.pkMed && !o.pkCombined)
    blocks.push({ key: "medical", label: BLOCK_LABELS.medical, carrierId: o.medCarrierId || "", tpaId: o.tpaId || "", tpaIsCarrier: !!o.tpaIsCarrier, hmoId: o.hmoId || "", policyNumber: o.medPolicyNumber || "", startDate: o.medPolicyStartDate || "", endDate: o.medPolicyEndDate || "", premiumNoTax: parseFloat(o.medPremiumNoTax) || 0 }); if (o.pkLife && !o.pkCombined)
    blocks.push({ key: "life", label: BLOCK_LABELS.life, carrierId: o.lifeCarrierId || "", tpaId: "", tpaIsCarrier: false, hmoId: "", policyNumber: o.lifePolicyNumber || "", startDate: o.lifePolicyStartDate || "", endDate: o.lifePolicyEndDate || "", premiumNoTax: parseFloat(o.lifePremiumNoTax) || 0 }); if (o.pkFamilySep)
    blocks.push({ key: "family", label: BLOCK_LABELS.family, carrierId: o.famCarrierId || "", tpaId: o.famTpaId || "", tpaIsCarrier: !!o.famTpaIsCarrier, hmoId: o.famHmoId || "", policyNumber: o.famPolicyNumber || "", startDate: o.famPolicyStartDate || "", endDate: o.famPolicyEndDate || "", premiumNoTax: parseFloat(o.famPremiumNoTax) || 0 }); return blocks.map(b => ({ ...b, renewalDate: addDaysISO(b.endDate, 1) })); }
function getBlockStatus(acc, key) { return acc.blockStatus && acc.blockStatus[key] || "active"; }
function deriveLegacyPolicyFields(blocks, dateBlocks) { const forDates = dateBlocks || blocks; const carrierId = (blocks.find(b => b.carrierId) || {}).carrierId || ""; const policyNumber = blocks.filter(b => b.policyNumber).map(b => `${b.label}: ${b.policyNumber}`).join(" / "); const starts = blocks.map(b => b.startDate).filter(Boolean).sort(); const ends = forDates.map(b => b.endDate).filter(Boolean).sort(); const policyStartDate = starts[0] || "", policyEndDate = ends[0] || ""; return { carrierId, policyNumber, policyStartDate, policyEndDate, renewalDate: addDaysISO(policyEndDate, 1) }; }
function blockUpdateToAccPatch(blockKey, u) { const pfx = BLOCK_PREFIX[blockKey]; const patch = { [`${pfx}CarrierId`]: u.carrierId || "", [`${pfx}PolicyNumber`]: u.policyNumber || "", [`${pfx}PolicyStartDate`]: u.startDate || "", [`${pfx}PolicyEndDate`]: u.endDate || "", [`${pfx}PremiumNoTax`]: parseFloat(u.premiumNoTax) || 0 }; if (blockKey === "medical") {
    patch.tpaId = u.tpaIsCarrier ? "" : u.tpaId || "";
    patch.tpaIsCarrier = !!u.tpaIsCarrier;
    patch.hmoId = u.hmoId || "";
} if (blockKey === "combined") {
    patch.combTpaId = u.tpaIsCarrier ? "" : u.tpaId || "";
    patch.combTpaIsCarrier = !!u.tpaIsCarrier;
    patch.combHmoId = u.hmoId || "";
} if (blockKey === "family") {
    patch.famTpaId = u.tpaIsCarrier ? "" : u.tpaId || "";
    patch.famTpaIsCarrier = !!u.tpaIsCarrier;
    patch.famHmoId = u.hmoId || "";
} return patch; }
function eAcc() { return { name: "", industry: "", adherents: { principal: "", family: "" }, logoUrl: "", subsidiaries: [], poc: { name: "", title: "", phone: "", email: "", emailThreadUrl: "" }, pocs: [], pkCombined: false, pkMed: true, pkLife: false, pkFamilySep: false, renewalDate: "", serviceStartDate: "", policyNumber: "", policyStartDate: "", policyEndDate: "", combCarrierId: "", combPolicyNumber: "", combPolicyStartDate: "", combPolicyEndDate: "", combPremiumNoTax: "", combTpaId: "", combTpaIsCarrier: false, combHmoId: "", medCarrierId: "", medPolicyNumber: "", medPolicyStartDate: "", medPolicyEndDate: "", medPremiumNoTax: "", lifeCarrierId: "", lifePolicyNumber: "", lifePolicyStartDate: "", lifePolicyEndDate: "", lifePremiumNoTax: "", famCarrierId: "", famPolicyNumber: "", famPolicyStartDate: "", famPolicyEndDate: "", famPremiumNoTax: "", famTpaId: "", famTpaIsCarrier: false, famHmoId: "", renewalStatus: "active", status: "healthy", carrierId: "", tpaId: "", tpaIsCarrier: false, hmoId: "", renewalUpdates: [], blockStatus: {}, memory: { preferredContact: "email", communicationStyle: "formal", openIssues: "", historicalNotes: "" }, payment: { medicalTotal: "", lifeTotal: "", frequency: "quarterly", method: "wire", paidCycles: [] }, benefits: { plans: [] } }; }
function flatA(a) {
    const adh = getAdherents(a);
    const pocs = getPocs(a);
    const p = i => pocs[i] || {};
    const med = a.payment?.medicalTotal || 0, life = a.payment?.lifeTotal || 0;
    let pkCombined = !!a.pkCombined, pkMed = !!a.pkMed, pkLife = !!a.pkLife, pkFamilySep = !!a.pkFamilySep;
    if (a.pkMed === undefined && a.pkLife === undefined && a.pkCombined === undefined) {
        if (a.policyType) {
            pkMed = a.policyType === "medical" || a.policyType === "both";
            pkLife = a.policyType === "life" || a.policyType === "both";
            pkFamilySep = a.medFamilyMode === "separate" || a.lifeFamilyMode === "separate";
        }
        else {
            pkMed = !(life > 0 && !med);
            pkLife = life > 0 && !med ? true : false;
        }
    }
    const legacyCarrier = a.carrierId || "", legacyNum = a.policyNumber || "", legacyStart = a.policyStartDate || "", legacyEnd = a.policyEndDate || "";
    const migMed = pkMed && !pkCombined, migLife = pkLife && !pkCombined && !migMed;
    return { name: a.name || "", industry: a.industry || "", adherentsPrincipal: String(adh.principal || ""), adherentsFamily: String(adh.family || ""), logoUrl: a.logoUrl || "", serviceStartDate: a.serviceStartDate || "", pkCombined, pkMed, pkLife, pkFamilySep, combCarrierId: a.combCarrierId || "", combPolicyNumber: a.combPolicyNumber || "", combPolicyStartDate: a.combPolicyStartDate || "", combPolicyEndDate: a.combPolicyEndDate || "", combPremiumNoTax: String(a.combPremiumNoTax || ""), combTpaId: a.combTpaId || "", combTpaIsCarrier: !!a.combTpaIsCarrier, combHmoId: a.combHmoId || "", medCarrierId: a.medCarrierId || (migMed ? legacyCarrier : ""), medPolicyNumber: a.medPolicyNumber || (migMed ? legacyNum : ""), medPolicyStartDate: a.medPolicyStartDate || (migMed ? legacyStart : ""), medPolicyEndDate: a.medPolicyEndDate || (migMed ? legacyEnd : ""), medPremiumNoTax: String(a.medPremiumNoTax || ""), lifeCarrierId: a.lifeCarrierId || (migLife ? legacyCarrier : ""), lifePolicyNumber: a.lifePolicyNumber || (migLife ? legacyNum : ""), lifePolicyStartDate: a.lifePolicyStartDate || (migLife ? legacyStart : ""), lifePolicyEndDate: a.lifePolicyEndDate || (migLife ? legacyEnd : ""), lifePremiumNoTax: String(a.lifePremiumNoTax || ""), famCarrierId: a.famCarrierId || "", famPolicyNumber: a.famPolicyNumber || a.medFamilyPolicyNumber || a.lifeFamilyPolicyNumber || "", famPolicyStartDate: a.famPolicyStartDate || "", famPolicyEndDate: a.famPolicyEndDate || "", famPremiumNoTax: String(a.famPremiumNoTax || ""), famTpaId: a.famTpaId || "", famTpaIsCarrier: !!a.famTpaIsCarrier, famHmoId: a.famHmoId || "", renewalStatus: a.renewalStatus || "active", status: a.status || "healthy", pn1: p(0).name || "", pt1: p(0).title || "", pp1: p(0).phone || "", pe1: p(0).email || "", pu1: p(0).emailThreadUrl || "", pn2: p(1).name || "", pt2: p(1).title || "", pp2: p(1).phone || "", pe2: p(1).email || "", pu2: p(1).emailThreadUrl || "", pn3: p(2).name || "", pt3: p(2).title || "", pp3: p(2).phone || "", pe3: p(2).email || "", pu3: p(2).emailThreadUrl || "", tpaId: a.tpaId || "", tpaIsCarrier: !!a.tpaIsCarrier, hmoId: a.hmoId || "", memContact: a.memory?.preferredContact || "email", memStyle: a.memory?.communicationStyle || "formal", memIssues: a.memory?.openIssues || "", memNotes: a.memory?.historicalNotes || "", medTotal: String(a.payment?.medicalTotal || ""), lifeTotal: String(a.payment?.lifeTotal || ""), frequency: a.payment?.frequency || "quarterly", method: a.payment?.method || "wire" };
}
function unflat(f) { const principal = parseInt(f.adherentsPrincipal) || 0, family = parseInt(f.adherentsFamily) || 0; const pocs = [{ name: f.pn1, title: f.pt1, phone: f.pp1, email: f.pe1, emailThreadUrl: f.pu1 }, { name: f.pn2, title: f.pt2, phone: f.pp2, email: f.pe2, emailThreadUrl: f.pu2 }, { name: f.pn3, title: f.pt3, phone: f.pp3, email: f.pe3, emailThreadUrl: f.pu3 }].filter(p => p.name || p.email || p.phone); const pkCombined = !!f.pkCombined, pkMed = !pkCombined && !!f.pkMed, pkLife = !pkCombined && !!f.pkLife, pkFamilySep = !!f.pkFamilySep; const blocks = getPolicyBlocks({ ...f, pkCombined, pkMed, pkLife, pkFamilySep }); const { carrierId, policyNumber, policyStartDate, policyEndDate, renewalDate } = deriveLegacyPolicyFields(blocks); const showMed = pkCombined || pkMed, showLife = pkCombined || pkLife; return { name: f.name, industry: f.industry, adherents: { principal, family }, employees: principal + family, logoUrl: f.logoUrl || "", renewalDate, serviceStartDate: f.serviceStartDate || "", pkCombined, pkMed, pkLife, pkFamilySep, policyNumber, policyStartDate, policyEndDate, combCarrierId: f.combCarrierId || "", combPolicyNumber: f.combPolicyNumber || "", combPolicyStartDate: f.combPolicyStartDate || "", combPolicyEndDate: f.combPolicyEndDate || "", combPremiumNoTax: parseFloat(f.combPremiumNoTax) || 0, combTpaId: f.combTpaId || "", combTpaIsCarrier: !!f.combTpaIsCarrier, combHmoId: f.combHmoId || "", medCarrierId: f.medCarrierId || "", medPolicyNumber: f.medPolicyNumber || "", medPolicyStartDate: f.medPolicyStartDate || "", medPolicyEndDate: f.medPolicyEndDate || "", medPremiumNoTax: parseFloat(f.medPremiumNoTax) || 0, lifeCarrierId: f.lifeCarrierId || "", lifePolicyNumber: f.lifePolicyNumber || "", lifePolicyStartDate: f.lifePolicyStartDate || "", lifePolicyEndDate: f.lifePolicyEndDate || "", lifePremiumNoTax: parseFloat(f.lifePremiumNoTax) || 0, famCarrierId: f.famCarrierId || "", famPolicyNumber: f.famPolicyNumber || "", famPolicyStartDate: f.famPolicyStartDate || "", famPolicyEndDate: f.famPolicyEndDate || "", famPremiumNoTax: parseFloat(f.famPremiumNoTax) || 0, famTpaId: f.famTpaId || "", famTpaIsCarrier: !!f.famTpaIsCarrier, famHmoId: f.famHmoId || "", renewalStatus: f.renewalStatus || "active", status: f.status, pocs, poc: pocs[0] || {}, carrierId, tpaId: f.tpaId || "", tpaIsCarrier: !!f.tpaIsCarrier, hmoId: f.hmoId || "", memory: { preferredContact: f.memContact || "email", communicationStyle: f.memStyle || "formal", openIssues: f.memIssues || "", historicalNotes: f.memNotes || "" }, payment: { medicalTotal: showMed ? parseFloat(f.medTotal) || 0 : 0, lifeTotal: showLife ? parseFloat(f.lifeTotal) || 0 : 0, frequency: f.frequency || "quarterly", method: f.method || "wire" } }; }
function gmailCompose(email, name) { if (!email)
    return; const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=&body=`; window.open(url, "_blank", "noopener"); }
function gmailComposeWithBody(email, subject, body) { const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email || "")}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; window.open(url, "_blank", "noopener"); }
function cycleLabel(cycleKey, freq, serviceStartDate) { if (!cycleKey || !serviceStartDate)
    return ""; const start = new Date(serviceStartDate); const target = new Date(cycleKey); const monthsSince = (target.getFullYear() - start.getFullYear()) * 12 + (target.getMonth() - start.getMonth()); if (freq === "quarterly") {
    const q = Math.round(monthsSince / 3) + 1;
    return `Q${q}`;
} if (freq === "semi-annually") {
    const sa = Math.round(monthsSince / 6) + 1;
    return `SA${sa}`;
} if (freq === "annually") {
    const yr = Math.round(monthsSince / 12) + 1;
    return `Year ${yr}`;
} return ""; }
function buildInvoiceRequestEmail(acc, cycleKey, freq, amName) {
    const cLabel = cycleLabel(cycleKey, freq, acc.serviceStartDate) || "Payment";
    const subject = `${acc.name} - ${acc.policyNumber || "—"} - ${cLabel} Invoices Breakdown`;
    const amFirst = (amName || "").split(" ")[0] || "there";
    const body = `Hello ${amFirst},

Good day!

Kindly provide us with ${cLabel} invoices for our valued client: ${acc.name}.

Best regards,
Dr. Muhammed Khaled
Corporate Relations Executive — Wisely Insure
📧 mohamed.khaled@wiselyinsure.com
📱 01103950007`;
    return { subject, body };
}
function buildNotificationEmail(acc, cycleKey, freq, insurerName, recipientName) {
    const now = new Date();
    const monthYear = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const cLabel = cycleLabel(cycleKey, freq, acc.serviceStartDate) || "Payment";
    const subject = `Notification - ${acc.name} - Payment Cycle Details ${cLabel} Payment - ${monthYear}`;
    const pocFirst = (recipientName || acc.poc?.name || "").split(" ")[0] || "Sir/Madam";
    const dueDate = cycleKey ? new Date(cycleKey).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
    const insurerLabel = insurerName || "your insurer";
    const body = `Dear ${pocFirst},

This is a notification regarding an outstanding payment on your account with ${insurerLabel}.

Payment Cycle: ${cLabel}
Due Date: ${dueDate}
Account: ${acc.name}

Please note that the payment for this cycle is now 15 days past its due date. Kindly arrange settlement at your earliest convenience.

Should you have already processed this payment, please share the proof of payment so we can update our records accordingly.

For any questions, please don't hesitate to reach out.

Best regards,
Dr. Muhammed Khaled
Corporate Relations Executive — Wisely Insure
📧 mohamed.khaled@wiselyinsure.com
📱 01103950007`;
    return { subject, body };
}
function buildWarningEmail(acc, cycleKey, freq, insurerName) {
    const now = new Date();
    const monthYear = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const cLabel = cycleLabel(cycleKey, freq, acc.serviceStartDate) || "Payment";
    const subject = `Warning Email - ${acc.name} - Payment Cycle Details ${cLabel} Payment - ${monthYear}`;
    const pocFirst = (acc.poc?.name || "").split(" ")[0] || "Sir/Madam";
    const dueDate = cycleKey ? new Date(cycleKey).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
    const insurerLabel = insurerName || "your insurer";
    const body = `Dear ${pocFirst},

This is a reminder regarding an outstanding payment on your account with ${insurerLabel}.

Payment Cycle: ${cLabel}
Due Date: ${dueDate}
Account: ${acc.name}

The payment for this cycle is now significantly overdue. Kindly arrange settlement at your earliest convenience to avoid any disruption to your coverage.

Should you have already processed this payment, please share the proof of payment so we can update our records accordingly.

For any questions, please don't hesitate to reach out.

Best regards,
Dr. Muhammed Khaled
Corporate Relations Executive — Wisely Insure
📧 mohamed.khaled@wiselyinsure.com
📱 01103950007`;
    return { subject, body };
}
function buildWelcomeEmail(acc) {
    const now = new Date();
    const monthYear = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const subject = `${acc.name} | Wisely Insure Welcome Email | ${monthYear}`;
    const pocFirst = (acc.poc?.name || "").split(" ")[0] || "Sir/Madam";
    const body = `Dear Mr./Ms. ${pocFirst},

🎉 Welcome to Wisely Insure! 🎉

We're truly glad to have you onboard.

On behalf of the Client Relations team, I'd like to warmly welcome you as our valued client and partner. At Wisely Insure, we pride ourselves on delivering responsive, reliable, and high-quality service — and we're genuinely excited to have you with us.

You've joined us at your renewal phase, and I want to assure you that we'll make this process as smooth and rewarding as possible.

I'm pleased to let you know that I will be your primary point of contact. Please don't hesitate to reach out with any questions, comments, or feedback — I'm here to support you every step of the way.

━━━━━━━━━━━━━━━━━━━━━━━━
📋 YOUR DEDICATED CONTACTS
━━━━━━━━━━━━━━━━━━━━━━━━

Your Account Manager:
Dr. Muhammed Khaled
Corporate Relations Executive
📧 Email: mohamed.khaled@wiselyinsure.com
📱 Mobile: 01103950007

Unit Head:
Dr. Manar Fouad
Corporates and SMEs Unit Head
📱 Mobile: 01118748882
📧 Email: manar.fouad@wiselyinsure.com

━━━━━━━━━━━━━━━━━━━━━━━━
🏥 CLAIMS & SUPPORT
━━━━━━━━━━━━━━━━━━━━━━━━

Claims Submission:
  To: George@wiselyinsure.com
  CC: mohamed.khaled@wiselyinsure.com

Instant Approvals / Emergency Support (all weekdays):
  📱 WhatsApp & Emergency Line: 01111445319
  📧 care@wiselyinsure.com

━━━━━━━━━━━━━━━━━━━━━━━━

We look forward to a long and fruitful partnership. Welcome aboard! 🤝

Warm regards,
Dr. Muhammed Khaled
Corporate Relations Executive — Wisely Insure`;
    return { subject, body };
}
const BENEFIT_ROWS = ["Life Insurance", "Medical Ceiling", "In-Patient Benefits", "Network", "Accommodation", "Intensive Care Unit", "Out-Patient Benefits", "Doctor Visits", "Labs / Radiology / Physiotherapy", "Medications", "Refunds (Outside Network)", "Dental", "Optical", "Pre-existing & Chronic", "Maternity"];
function getUtilizationCycles(serviceStartDate, count = 20) {
    if (!serviceStartDate)
        return [];
    const dates = [];
    let d = new Date(serviceStartDate);
    const now = new Date();
    while (d <= now) {
        const nd = new Date(d);
        nd.setMonth(nd.getMonth() + 3);
        d = nd;
    }
    const lastCycle = new Date(d);
    lastCycle.setMonth(lastCycle.getMonth() - 3);
    return { lastCycle, nextCycle: d };
}
function buildUtilizationEmail(acc, poc) {
    const monthYear = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const subject = `${acc.name} - Policy No. ${acc.policyNumber || "N/A"} - Utilization Request - ${monthYear}`;
    const firstName = (poc?.name || "").split(" ")[0] || "there";
    const body = `Hello ${firstName},

Good day to you.

Please provide us with the active list and members consumptions for our valued client: ${acc.name}.

Thanks in advance.`;
    return { subject, body };
}
const c = { root: { fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", minHeight: "100vh", background: "#f0f4f8", color: "#0f1c2e", paddingBottom: "3rem" }, hdr: { background: "transparent", borderBottom: "none", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 74, position: "sticky", top: 0, zIndex: 50 }, logo: { fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: 17, color: "#5dd8c8" }, nb: a => ({ background: a ? "#162240" : "transparent", border: "none", color: a ? "#5dd8c8" : "#4a6080", padding: "6px 13px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }), main: { maxWidth: 1260, margin: "0 auto", padding: "1.25rem 1rem" }, sRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }, sc: col => ({ background: "#fff", border: `1.5px solid ${col}44`, borderRadius: 14, padding: "14px 18px" }), sn: col => ({ fontSize: 26, fontWeight: 700, color: col, fontFamily: "'Clash Display',sans-serif" }), sl: { fontSize: 11, color: "#7a9ab5", marginTop: 2, textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 600 }, card: { background: "#fff", border: "1px solid #dde8f0", borderRadius: 14, overflow: "hidden", marginBottom: 14 }, cHdr: { padding: "12px 16px", borderBottom: "1px solid #edf2f7", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fafcfe" }, cTitle: { fontSize: 14, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" }, grid: { display: "grid", gridTemplateColumns: "270px 1fr", gap: 14 }, sidebar: { background: "#fff", border: "1px solid #dde8f0", borderRadius: 14, overflow: "hidden", alignSelf: "start" }, sbHdr: { padding: "12px 14px", borderBottom: "1px solid #edf2f7", display: "flex", alignItems: "center", justifyContent: "space-between" }, sbTit: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: 1.2 }, aBtn: { background: "#e8faf8", border: "1px solid #5dd8c844", color: "#0fa890", borderRadius: 8, padding: "4px 12px", fontSize: 12, cursor: "pointer", fontWeight: 700 }, aiRow: a => ({ padding: "10px 14px", cursor: "pointer", borderLeft: `3px solid ${a ? "#5dd8c8" : "transparent"}`, background: a ? "#f0faf9" : "transparent", display: "flex", alignItems: "center", gap: 9, borderBottom: "1px solid #f0f4f8" }), ava: n => ({ width: 33, height: 33, borderRadius: "50%", background: avc(n), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }), panel: { background: "#fff", border: "1px solid #dde8f0", borderRadius: 14, overflow: "hidden" }, pH: { padding: "14px 18px", borderBottom: "1px solid #edf2f7", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fafcfe" }, tabs: { display: "flex", borderBottom: "1px solid #edf2f7", background: "#fafcfe", overflowX: "auto" }, tab: a => ({ padding: "10px 15px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: a ? "#0fa890" : "#7a9ab5", background: "transparent", border: "none", borderBottom: `2px solid ${a ? "#5dd8c8" : "transparent"}`, whiteSpace: "nowrap" }), ni: { width: "100%", background: "#f7fbff", border: "1.5px solid #dde8f0", borderRadius: 10, padding: 11, color: "#0f1c2e", fontSize: 13, resize: "vertical", minHeight: 72, boxSizing: "border-box" }, ti: { flex: 1, background: "#f7fbff", border: "1.5px solid #dde8f0", borderRadius: 10, padding: "8px 12px", color: "#0f1c2e", fontSize: 13 }, sv: { background: "#0fa890", border: "none", color: "#fff", borderRadius: 10, padding: "8px 18px", fontSize: 13, cursor: "pointer", fontWeight: 700 }, del: { background: "none", border: "none", color: "#c0cdd8", cursor: "pointer", fontSize: 14, padding: "2px 6px" }, bdg: st => ({ display: "inline-block", background: SC[st]?.bg || "#f0f4f8", color: SC[st]?.text || "#7a9ab5", fontSize: 11, padding: "2px 10px", borderRadius: 20, fontWeight: 700 }), na: { display: "flex", alignItems: "center", gap: 6 }, narr: { background: "#f0f4f8", border: "1px solid #dde8f0", color: "#0fa890", width: 27, height: 27, borderRadius: 8, cursor: "pointer", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }, nl: { fontSize: 12, color: "#7a9ab5", minWidth: 120, textAlign: "center", fontWeight: 600 }, ic: { background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 10, padding: "10px 13px" }, iL: { fontSize: 10, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }, iV: { fontSize: 14, fontWeight: 700, marginTop: 3, color: "#0f1c2e", fontFamily: "'Clash Display',sans-serif" }, modal: { position: "fixed", inset: 0, background: "rgba(10,22,40,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }, mBox: { background: "#fff", border: "1px solid #dde8f0", borderRadius: 16, padding: 24, width: 500, maxHeight: "90vh", overflowY: "auto" }, fl: { fontSize: 11, color: "#7a9ab5", marginBottom: 4, display: "block", fontWeight: 700, textTransform: "uppercase", letterSpacing: .5 }, fi: { width: "100%", background: "#f7fbff", border: "1.5px solid #dde8f0", borderRadius: 10, padding: "8px 12px", color: "#0f1c2e", fontSize: 13, marginBottom: 10, boxSizing: "border-box" }, cBtn: { background: "transparent", border: "1.5px solid #dde8f0", color: "#7a9ab5", borderRadius: 10, padding: "7px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600 }, srch: { background: "#f7fbff", border: "1.5px solid #edf2f7", borderRadius: 10, padding: "7px 12px", color: "#0f1c2e", fontSize: 13, width: "100%", boxSizing: "border-box", marginBottom: 8 }, sync: ok => ({ fontSize: 11, fontWeight: 600, color: ok === true ? "#0fa890" : ok === false ? "#e0392e" : "#d4880a", background: ok === true ? "#e8faf8" : ok === false ? "#fff0ef" : "#fff8e6", padding: "3px 10px", borderRadius: 20, border: `1px solid ${ok === true ? "#5dd8c844" : ok === false ? "#e0392e44" : "#f6d86044"}` }), gcBtn: { background: "#e8f0fe", border: "1px solid #4285f444", color: "#4285f4", borderRadius: 6, padding: "2px 7px", fontSize: 10, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }, tTag: t => ({ display: "inline-block", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20, textTransform: "uppercase", background: t === "carrier" ? "#e8f0fe" : t === "tpa" ? "#e8faf5" : "#fce8ff", color: t === "carrier" ? "#4285f4" : t === "tpa" ? "#0fa890" : "#9333ea" }), tAct: (col, bg) => ({ background: bg, border: `1px solid ${col}33`, color: col, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }) };
const WNav = memo(({ off, set, label }) => React.createElement("div", { style: c.na },
    React.createElement("button", { style: c.narr, onClick: () => set(o => o - 1) }, "\u2039"),
    React.createElement("span", { style: c.nl }, label),
    React.createElement("button", { style: c.narr, onClick: () => set(o => o + 1) }, "\u203A")));
const NoteIn = memo(({ val, ch, save }) => React.createElement("div", { style: { marginBottom: 10 } },
    React.createElement("textarea", { style: c.ni, placeholder: "Add a note... (Ctrl+Enter)", value: val, onChange: e => ch(e.target.value), onKeyDown: e => e.key === "Enter" && e.ctrlKey && save() }),
    React.createElement("button", { style: c.sv, onClick: save }, "Save note")));
const TaskIn = memo(({ val, tval, chv, cht, add }) => React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 8 } },
    React.createElement("input", { style: c.ti, placeholder: "Add a task... (Enter)", value: val, onChange: e => chv(e.target.value), onKeyDown: e => e.key === "Enter" && add() }),
    React.createElement("select", { style: { ...c.ti, flex: "0 0 110px", cursor: "pointer" }, value: tval, onChange: e => cht(e.target.value) },
        React.createElement("option", { value: "" }, "No time"),
        TIME_SLOTS.map(s => React.createElement("option", { key: s.value, value: s.value }, s.label))),
    React.createElement("button", { style: c.sv, onClick: add }, "Add")));
function InsLogo({ ins, sm }) { const [err, setErr] = useState(false); if (!ins)
    return null; const dim = sm ? 26 : 38; if (ins.logo && !err)
    return React.createElement("img", { src: ins.logo, alt: ins.name, style: { width: dim, height: dim, objectFit: "contain", borderRadius: sm ? 5 : 7, background: "#f7fbff", border: "1px solid #edf2f7", padding: 2, flexShrink: 0 }, onError: () => setErr(true) }); return React.createElement("div", { style: { width: dim, height: dim, borderRadius: sm ? 5 : 7, background: avc(ins.name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: sm ? 8 : 10, fontWeight: 700, color: "#fff", flexShrink: 0 } }, ini(ins.name)); }
function AccAva({ a, size = 33 }) { const [err, setErr] = useState(false); if (a.logoUrl && !err)
    return React.createElement("img", { src: a.logoUrl, alt: a.name, style: { width: size, height: size, objectFit: "contain", borderRadius: size > 35 ? 10 : 8, background: "#f7fbff", border: "1px solid #edf2f7", padding: 3, flexShrink: 0 }, onError: () => setErr(true) }); return React.createElement("div", { style: { ...c.ava(a.name), width: size, height: size, fontSize: size > 35 ? 13 : 11 } }, ini(a.name)); }
function HealthScore({ score }) { const col = hscColor(score); return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } },
    React.createElement("div", { style: { width: 32, height: 32, borderRadius: "50%", background: `conic-gradient(${col} ${score}%,#edf2f7 0)`, display: "flex", alignItems: "center", justifyContent: "center" } },
        React.createElement("div", { style: { width: 22, height: 22, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: col } }, score))); }
function WelcomeEmailModal({ acc, onClose }) {
    const generated = buildWelcomeEmail(acc);
    const [subject, setSubject] = useState(generated.subject);
    const [body, setBody] = useState(generated.body);
    const [step, setStep] = useState("preview");
    const pocEmail = acc.poc?.email || "";
    function handleSend() { setStep("sending"); setTimeout(() => { gmailComposeWithBody(pocEmail, subject, body); setStep("done"); }, 700); }
    return React.createElement("div", { className: "modal-bg-anim", style: c.modal },
        React.createElement("div", { className: "modal-box-anim", style: { ...c.mBox, width: 560, maxHeight: "90vh", overflowY: "auto" } },
            step === "preview" && React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } },
                    React.createElement("div", { style: { width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#0fa890,#4285f4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 } },
                        React.createElement(Ic, { name: "envelope" }),
                        "\uFE0F"),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: 16, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Send Welcome Email"),
                        React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } },
                            "To: ",
                            acc.name)),
                    React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
                React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", marginBottom: 10, fontStyle: "italic" } }, "Edit anything below before it opens in Gmail \u2014 nothing is sent until you click Send there."),
                React.createElement("label", { style: c.fl }, "Subject"),
                React.createElement("input", { style: { ...c.fi, fontWeight: 600 }, value: subject, onChange: e => setSubject(e.target.value) }),
                React.createElement("label", { style: c.fl }, "Body"),
                React.createElement("textarea", { style: { ...c.fi, minHeight: 340, resize: "vertical", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "monospace" }, value: body, onChange: e => setBody(e.target.value) }),
                !pocEmail && React.createElement("div", { style: { background: "#fff8e6", border: "1px solid #f6d86088", borderRadius: 9, padding: "9px 12px", marginBottom: 12, fontSize: 12, color: "#92680a" } },
                    React.createElement(Ic, { name: "warning" }),
                    "\uFE0F No email set for this account's point of contact. Gmail will open with this subject/body but no recipient \u2014 add one manually there, or edit it in Account settings first."),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" } },
                    React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                    React.createElement("button", { style: { ...c.sv, background: "linear-gradient(135deg,#0fa890,#4285f4)", border: "none" }, onClick: handleSend },
                        React.createElement(Ic, { name: "rocket" }),
                        " Open in Gmail"))),
            step === "sending" && React.createElement("div", { style: { padding: "3rem 1rem", textAlign: "center" } },
                React.createElement("div", { style: { width: 54, height: 54, margin: "0 auto 18px", borderRadius: "50%", border: "4px solid #e8faf8", borderTopColor: "#0fa890", animation: "spinSlow .8s linear infinite" } }),
                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#0f1c2e", fontFamily: "'Clash Display',sans-serif" } }, "Opening Gmail...")),
            step === "done" && React.createElement("div", { className: "success-anim", style: { padding: "3rem 1rem", textAlign: "center" } },
                React.createElement("svg", { width: "64", height: "64", viewBox: "0 0 64 64", style: { margin: "0 auto 16px", display: "block" } },
                    React.createElement("circle", { cx: "32", cy: "32", r: "30", fill: "#e8faf8", stroke: "#0fa890", strokeWidth: "2" }),
                    React.createElement("path", { d: "M20 33 L28 41 L44 23", fill: "none", stroke: "#0fa890", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round", strokeDasharray: "48", strokeDashoffset: "48", style: { animation: "checkDraw .5s ease .15s forwards" } })),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: "#0f1c2e", fontFamily: "'Clash Display',sans-serif" } }, "Gmail Opened!"),
                React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginTop: 4 } }, "Welcome email draft is ready to send"),
                React.createElement("button", { style: { ...c.sv, marginTop: 16 }, onClick: onClose }, "Done"))));
}
function FirstPaymentPromptModal({ acc, onYes, onNo, onClose }) {
    return React.createElement("div", { className: "modal-bg-anim", style: c.modal },
        React.createElement("div", { className: "modal-box-anim", style: { ...c.mBox, width: 420 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 4 } },
                React.createElement("div", { style: { width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#0fa890,#4285f4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 } }, React.createElement(Ic, { name: "card" })),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "First Payment"),
                    React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } }, acc.name)),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
            React.createElement("div", { style: { fontSize: 13, color: "#4a6080", margin: "14px 0 18px", lineHeight: 1.5 } }, "Has the first payment for this account already been received?"),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" } },
                React.createElement("button", { style: c.cBtn, onClick: onNo }, "No \u2014 leave as-is"),
                React.createElement("button", { style: { ...c.sv, background: "linear-gradient(135deg,#0fa890,#4285f4)", border: "none" }, onClick: onYes }, "Yes \u2014 record it now"))));
}
const TIER_PALETTE = ["#9333ea", "#4285f4", "#d4880a", "#0fa890", "#e0392e", "#7a9ab5", "#0891b2", "#b45309"];
function colorForTier(label, knownOrder) { const idx = knownOrder.indexOf(label); return TIER_PALETTE[idx >= 0 ? idx % TIER_PALETTE.length : 0]; }
function normalizeTierLabel(raw) {
    if (!raw)
        return "";
    let s = raw.toString().trim();
    s = s.replace(/^network\s*tier\s*/i, "").replace(/^tier\s*/i, "").trim();
    return s || raw.toString().trim();
}
async function decryptOfficeFile(fileBuf, password) {
    function readCFB(buf) { const dv = new DataView(buf); const SECTOR_SIZE = 1 << dv.getUint16(30, true); const MINI_SECTOR_SIZE = 1 << dv.getUint16(32, true); const dirStart = dv.getUint32(48, true); const miniCutoff = dv.getUint32(56, true); const miniFatStart = dv.getUint32(60, true); const numMiniFatSectors = dv.getUint32(64, true); function secOff(s) { return 512 + s * SECTOR_SIZE; } const fatSecs = []; for (let i = 0; i < 109; i++) {
        const v = dv.getUint32(76 + i * 4, true);
        if (v !== 0xFFFFFFFF)
            fatSecs.push(v);
    } const FAT = []; for (const s of fatSecs) {
        const o = secOff(s);
        for (let i = 0; i < SECTOR_SIZE / 4; i++)
            FAT.push(dv.getUint32(o + i * 4, true));
    } function readFullChain(start) { const chunks = []; let sec = start; while (sec !== 0xFFFFFFFE && sec !== undefined) {
        chunks.push(new Uint8Array(buf, secOff(sec), SECTOR_SIZE));
        sec = FAT[sec];
    } const out = new Uint8Array(chunks.reduce((s, c) => s + c.length, 0)); let p = 0; for (const c of chunks) {
        out.set(c, p);
        p += c.length;
    } return out; } const dirBytes = readFullChain(dirStart); const dirDv = new DataView(dirBytes.buffer, dirBytes.byteOffset, dirBytes.byteLength); const entries = []; for (let i = 0; i * 128 < dirBytes.length; i++) {
        const base = i * 128, nameLen = dirDv.getUint16(base + 64, true);
        if (!nameLen)
            continue;
        let name = "";
        for (let j = 0; j < nameLen - 2; j += 2)
            name += String.fromCharCode(dirDv.getUint16(base + j, true));
        const type = dirBytes[base + 66], startSec = dirDv.getUint32(base + 116, true);
        const size = Number(dirDv.getBigUint64(base + 120, true));
        entries.push({ name, type, startSec, size });
    } const root = entries.find(e => e.type === 5); const miniData = root ? readFullChain(root.startSec).slice(0, root.size) : new Uint8Array(0); let miniFAT = []; if (numMiniFatSectors > 0) {
        const mfb = readFullChain(miniFatStart);
        const mfDv = new DataView(mfb.buffer, mfb.byteOffset, mfb.byteLength);
        for (let i = 0; i < mfb.length / 4; i++)
            miniFAT.push(mfDv.getUint32(i * 4, true));
    } function readMiniChain(start, size) { const out = new Uint8Array(size); let sec = start, pos = 0; while (sec !== 0xFFFFFFFE && pos < size) {
        const o = sec * MINI_SECTOR_SIZE;
        out.set(miniData.slice(o, o + Math.min(MINI_SECTOR_SIZE, size - pos)), pos);
        pos += MINI_SECTOR_SIZE;
        sec = miniFAT[sec];
    } return out; } function getStream(name) { const e = entries.find(x => x.name === name); if (!e)
        return null; if (e.size < miniCutoff) {
        return readMiniChain(e.startSec, e.size);
    } return readFullChain(e.startSec).slice(0, e.size); } return { getStream }; }
    const sub = crypto.subtle;
    function concat(...arrs) { const out = new Uint8Array(arrs.reduce((s, a) => s + a.length, 0)); let p = 0; for (const a of arrs) {
        out.set(a, p);
        p += a.length;
    } return out; }
    function u32le(n) { const b = new Uint8Array(4); new DataView(b.buffer).setUint32(0, n, true); return b; }
    function b64(s) { return Uint8Array.from(atob(s), c => c.charCodeAt(0)); }
    function utf16le(s) { const o = new Uint8Array(s.length * 2); for (let i = 0; i < s.length; i++) {
        o[i * 2] = s.charCodeAt(i) & 0xFF;
        o[i * 2 + 1] = s.charCodeAt(i) >> 8 & 0xFF;
    } return o; }
    async function h512(...bufs) { return new Uint8Array(await sub.digest('SHA-512', concat(...bufs))); }
    async function aesRaw(ct, key, iv) {
        const BLOCK = 16;
        const n = Math.ceil(ct.length / BLOCK);
        const out = new Uint8Array(n * BLOCK);
        const dk = await sub.importKey('raw', key, { name: 'AES-CBC' }, false, ['decrypt']);
        const ek = await sub.importKey('raw', key, { name: 'AES-CBC' }, false, ['encrypt']);
        for (let i = 0; i < n; i++) {
            const block = ct.slice(i * BLOCK, (i + 1) * BLOCK);
            const prevCT = i === 0 ? iv : ct.slice((i - 1) * BLOCK, i * BLOCK);
            const pkcs7 = new Uint8Array(BLOCK).fill(0x10);
            const padFix = new Uint8Array(await sub.encrypt({ name: 'AES-CBC', iv: block }, ek, pkcs7)).slice(0, BLOCK);
            const dec = new Uint8Array(await sub.decrypt({ name: 'AES-CBC', iv: prevCT }, dk, concat(block, padFix)));
            out.set(dec.slice(0, BLOCK), i * BLOCK);
        }
        return out;
    }
    const blkKV = new Uint8Array([0x14, 0x6E, 0x0B, 0xE7, 0xAB, 0xAC, 0xD0, 0xD6]);
    const blkVI = new Uint8Array([0xFE, 0xA7, 0xD2, 0x76, 0x3B, 0x4B, 0x9E, 0x79]);
    const blkVH = new Uint8Array([0xD7, 0xAA, 0x0F, 0x6D, 0x30, 0x61, 0x34, 0x4E]);
    const cfb = readCFB(fileBuf);
    const ei = cfb.getStream('EncryptionInfo');
    if (!ei || ei[0] !== 4 || ei[2] !== 4)
        return { ok: false, err: 'Not Agile-encrypted OOXML' };
    const xml = new TextDecoder().decode(ei.slice(8));
    function xa(tag, attr) { const m = xml.match(new RegExp('<' + tag + '[^>]*\\b' + attr + '="([^"]*)"', 'i')); return m ? m[1] : ''; }
    const kdSalt = b64(xa('keyData', 'saltValue'));
    const kdBlock = parseInt(xa('keyData', 'blockSize'));
    const spin = parseInt(xa('p:encryptedKey', 'spinCount')) || 100000;
    const pSalt = b64(xa('p:encryptedKey', 'saltValue'));
    const keyBits = parseInt(xa('p:encryptedKey', 'keyBits')) || 256;
    const encVI = b64(xa('p:encryptedKey', 'encryptedVerifierHashInput'));
    const encVH = b64(xa('p:encryptedKey', 'encryptedVerifierHashValue'));
    const encKV = b64(xa('p:encryptedKey', 'encryptedKeyValue'));
    let h = await h512(pSalt, utf16le(password));
    for (let i = 0; i < spin; i++)
        h = await h512(u32le(i), h);
    const k1 = (await h512(h, blkVI)).slice(0, keyBits / 8);
    const k2 = (await h512(h, blkVH)).slice(0, keyBits / 8);
    const vInput = await aesRaw(encVI, k1, pSalt);
    const vActual = await h512(vInput);
    const vExpected = await aesRaw(encVH, k2, pSalt);
    for (let i = 0; i < 32; i++) {
        if (vActual[i] !== vExpected[i])
            return { ok: false, err: 'wrong_password' };
    }
    const k3 = (await h512(h, blkKV)).slice(0, keyBits / 8);
    const secretKey = await aesRaw(encKV, k3, pSalt);
    const ep = cfb.getStream('EncryptedPackage');
    const totalSize = Number(new DataView(ep.buffer, ep.byteOffset, 8).getBigUint64(0, true));
    const segData = ep.slice(8);
    const SEG = 4096;
    const out = new Uint8Array(totalSize);
    let pos = 0;
    for (let i = 0; pos < totalSize; i++) {
        const raw = segData.slice(i * SEG, Math.min((i + 1) * SEG, segData.length));
        if (!raw.length)
            break;
        const iv = (await h512(kdSalt, u32le(i))).slice(0, kdBlock);
        const padded = raw.length % 16 === 0 ? raw : concat(raw, new Uint8Array(16 - raw.length % 16));
        const dec = await aesRaw(padded, secretKey, iv);
        const toCopy = Math.min(dec.length, totalSize - pos);
        out.set(dec.slice(0, toCopy), pos);
        pos += toCopy;
    }
    return { ok: true, data: out };
}
function findAXASheet(wb, excludeNames = []) { for (const sn of wb.SheetNames) {
    if (excludeNames.some(x => sn.toLowerCase().includes(x.toLowerCase())))
        continue;
    const ws = wb.Sheets[sn];
    if (!ws['!ref'])
        continue;
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    for (let i = 0; i < Math.min(10, raw.length); i++) {
        const hdrs = (raw[i] || []).map(h => (h || '').toString().trim());
        const hasProvider = hdrs.some(h => h.toLowerCase() === 'provider');
        const hasNetworkName = hdrs.some(h => h.toLowerCase().includes('network name'));
        if (hasProvider && hasNetworkName)
            return { sheetName: sn, headerRowIdx: i, hdrs, raw };
    }
} return null; }
function parseAXARows({ hdrs, raw, headerRowIdx }, forcedTierLabel) { const lc = h => (h || '').toString().trim().toLowerCase(); function findCol(...preds) { for (const pred of preds) {
    const idx = hdrs.findIndex(pred);
    if (idx >= 0)
        return idx;
} return -1; } const colName = findCol(h => lc(h) === 'provider'); const colType = findCol(h => lc(h) === 'type'); const colTier = findCol(h => lc(h).includes('network name')); const colCard = findCol(h => lc(h) === 'card'); const colGov = findCol(h => lc(h).includes('governorate')); const colCity = findCol(h => lc(h) === 'city'); const colAddr = findCol(h => lc(h).includes('address')); const colPhone = findCol(h => lc(h).includes('phone')); const colFax = findCol(h => lc(h).includes('fax')); const colEmail = findCol(h => lc(h).includes('email')); const colServicesEn = findCol(h => lc(h).includes('services provided'), h => lc(h).includes('services')); const colSpecEn = findCol(h => lc(h) === 'speciality' || lc(h) === 'specialty'); const colSpecAr = findCol(h => h.includes('التخصص')); const colServicesAr = findCol(h => h.includes('الخدمات')); function g(row, idx) { return idx >= 0 && idx < row.length ? (row[idx] || '').toString().trim() : ''; } const tiersData = {}, tierOrder = []; let skipped = 0, total = 0; for (let i = headerRowIdx + 1; i < raw.length; i++) {
    const row = raw[i];
    if (!row || row.every(v => !v))
        continue;
    const name = g(row, colName);
    if (!name) {
        skipped++;
        continue;
    }
    const tierLabel = forcedTierLabel || normalizeTierLabel(g(row, colTier)) || 'Unassigned';
    if (!tierOrder.includes(tierLabel))
        tierOrder.push(tierLabel);
    if (!tiersData[tierLabel])
        tiersData[tierLabel] = [];
    const specEn = g(row, colSpecEn), specAr = g(row, colSpecAr);
    tiersData[tierLabel].push({ tier: tierLabel, nameEn: name, nameAr: '', typeEn: g(row, colType), typeAr: '', govEn: g(row, colGov), govAr: '', cityEn: g(row, colCity), cityAr: '', addr: g(row, colAddr), phone: g(row, colPhone).replace(/[\r\n]+/g, ', ').trim(), fax: g(row, colFax), email: g(row, colEmail), spec: [specEn, specAr].filter(Boolean).join(' / '), specAr, services: g(row, colServicesEn), servicesAr: g(row, colServicesAr), card: g(row, colCard).replace(/[\r\n]+/g, ', ').replace(/,\s*-\s*,/g, ',').trim() });
    total++;
} return { tiersData, tierOrder, total, skipped }; }
async function loadWorkbookMaybeEncrypted(buf, pwd) { let xlsBuf = buf; const sig = new Uint8Array(buf, 0, 8); const isCFB = sig[0] === 0xD0 && sig[1] === 0xCF && sig[2] === 0x11 && sig[3] === 0xE0; if (isCFB) {
    if (!pwd) {
        try {
            XLSX.read(buf, { type: 'array', codepage: 1256 });
        }
        catch (e) {
            if (e.message && (e.message.includes('password') || e.message.includes('Password') || e.message.includes('protected')))
                return { needsPassword: true };
        }
    }
    else {
        const result = await decryptOfficeFile(buf, pwd);
        if (!result.ok) {
            if (result.err === 'wrong_password')
                return { wrongPassword: true };
            throw new Error(result.err);
        }
        xlsBuf = result.data.buffer.slice(result.data.byteOffset, result.data.byteOffset + result.data.byteLength);
    }
} return { wb: XLSX.read(xlsBuf, { type: 'array', codepage: 1256 }) }; }
function bkCellStr(v) { return v === null || v === undefined ? '' : v.toString().trim(); }
function bkNum(v) { if (v === null || v === undefined || v === '')
    return 0; const n = typeof v === 'number' ? v : parseFloat(bkCellStr(v).replace(/[,\s]/g, '')); return isNaN(n) ? 0 : n; }
function findGIGBreakdownSheet(wb) { for (const sn of wb.SheetNames) {
    const ws = wb.Sheets[sn];
    if (!ws['!ref'])
        continue;
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    for (let i = 0; i < Math.min(15, raw.length); i++) {
        const hdrs = (raw[i] || []).map(bkCellStr).map(h => h.toLowerCase());
        if (hdrs.includes('action') && hdrs.includes('debit') && hdrs.includes('credit'))
            return { sheetName: sn, headerRowIdx: i, raw };
    }
} return null; }
function parseGIGBreakdown(found) {
    const { raw } = found;
    let additions = 0, deletions = 0, finalTotal = null, netContribution = null;
    const fees = {};
    let colAction = 0, colDebit = 10, colCredit = 11;
    for (const row of raw) {
        const first = bkCellStr(row[0]);
        if (first.toLowerCase() === 'action') {
            const hdrs = row.map(h => bkCellStr(h).toLowerCase());
            colAction = hdrs.indexOf('action');
            colDebit = hdrs.indexOf('debit');
            colCredit = hdrs.indexOf('credit');
            continue;
        }
        const action = bkCellStr(row[colAction]);
        if (/^add$/i.test(action))
            additions += bkNum(row[colDebit]);
        else if (/^(cancel|delete)$/i.test(action))
            deletions += Math.abs(bkNum(row[colCredit]));
        if (/^total net contribution$/i.test(first))
            netContribution = bkNum(row[1]);
        if (/^total gross contribution$/i.test(first))
            finalTotal = bkNum(row[1]);
        if (/^(issuance fees|fra fees|stamp fees)/i.test(first))
            fees[first] = bkNum(row[1]);
    }
    return { carrier: 'GIG', additions, deletions, finalTotal, netContribution, fees };
}
function findAXABreakdownSheet(wb) { const sn = wb.SheetNames.find(n => /^debit1$/i.test(n)); if (!sn)
    return null; const ws = wb.Sheets[sn]; if (!ws['!ref'])
    return null; const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' }); const hdrs = (raw[0] || []).map(h => bkCellStr(h).toLowerCase()); if (!(hdrs.includes('endorsementtype') && hdrs.includes('total_med_life_invoicepremium')))
    return null; return { sheetName: sn, raw, hdrs }; }
function parseAXABreakdown(found) {
    const { raw, hdrs } = found;
    const colType = hdrs.indexOf('endorsementtype');
    const colAmt = hdrs.indexOf('total_med_life_invoicepremium');
    let additions = 0, deletions = 0;
    for (let i = 1; i < raw.length; i++) {
        const row = raw[i];
        const type = bkCellStr(row[colType]).toUpperCase();
        const amt = bkNum(row[colAmt]);
        if (!type && !amt)
            continue;
        if (/delet|cancel|termin/.test(type))
            deletions += Math.abs(amt);
        else
            additions += amt;
    }
    const finalTotal = Math.round((additions - deletions) * 100) / 100;
    return { carrier: 'AXA', additions, deletions, finalTotal };
}
function findMetLifeStatementSheet(wb) { for (const sn of wb.SheetNames) {
    const ws = wb.Sheets[sn];
    if (!ws['!ref'])
        continue;
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    if (raw.some(row => row.some(cell => /total due for sub-?office/i.test(bkCellStr(cell)))))
        return { sheetName: sn, raw };
} return null; }
function parseMetLifeBreakdown(found) {
    const { raw } = found;
    let additions = 0, deletions = 0, finalTotal = null;
    for (const row of raw) {
        const label = bkCellStr(row[1] || row[0]);
        const val = bkNum(row[row.length - 1]);
        if (/^adjustments\s*:?$/i.test(label)) {
            if (val >= 0)
                additions += val;
            else
                deletions += Math.abs(val);
        }
        if (/^total due for sub-?office/i.test(label))
            finalTotal = val;
    }
    return { carrier: 'MetLife', additions, deletions, finalTotal };
}
function findMemberListSheet(wb) { for (const sn of wb.SheetNames) {
    const ws = wb.Sheets[sn];
    if (!ws['!ref'])
        continue;
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    for (let i = 0; i < Math.min(10, raw.length); i++) {
        const hdrs = (raw[i] || []).map(bkCellStr);
        const saCol = hdrs.findIndex(h => /sa\s*premuim|sa\s*premium/i.test(h));
        const premCol = hdrs.findIndex(h => /premuim|premium/i.test(h) && !/sa\s*premuim|sa\s*premium/i.test(h));
        const splitCol = hdrs.findIndex(h => /^s\d+$/i.test(h.trim()) || /split\s*\d+/i.test(h) || /installment/i.test(h));
        const annualCol = saCol >= 0 ? saCol : premCol;
        if (splitCol >= 0 || annualCol >= 0)
            return { sheetName: sn, raw, headerRowIdx: i, useCol: splitCol >= 0 ? splitCol : annualCol, annualCol, isCycleSplit: splitCol >= 0 };
    }
} return null; }
function parseGenericMemberList(found) { const { raw, useCol, annualCol, isCycleSplit } = found; let finalTotal = null, annualTotal = null; for (const row of raw) {
    if (/^total$/i.test(bkCellStr(row[0])) || /^total$/i.test(bkCellStr(row[1]))) {
        finalTotal = bkNum(row[useCol]);
        if (annualCol >= 0 && annualCol !== useCol)
            annualTotal = bkNum(row[annualCol]);
    }
} return { carrier: 'Generic member list (e.g. Sarwa Life)', additions: 0, deletions: 0, finalTotal, annualTotal, isCycleSplit }; }
function findAllianzBreakdownSheet(wb) { for (const sn of wb.SheetNames) {
    const ws = wb.Sheets[sn];
    if (!ws['!ref'])
        continue;
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    const hdrs = (raw[0] || []).map(h => bkCellStr(h).toLowerCase().trim());
    if (hdrs.includes('invoice_number') && hdrs.includes('contract_id') && hdrs.includes('total premium'))
        return { sheetName: sn, raw, hdrs };
} return null; }
function parseAllianzBreakdown(found) { const { raw, hdrs } = found; const colAmt = hdrs.indexOf('total premium'); let additions = 0, deletions = 0; for (let i = 1; i < raw.length; i++) {
    const amt = bkNum(raw[i][colAmt]);
    if (!amt)
        continue;
    if (amt < 0)
        deletions += Math.abs(amt);
    else
        additions += amt;
} const finalTotal = Math.round((additions - deletions) * 100) / 100; return { carrier: 'Allianz', additions, deletions, finalTotal }; }
function findLibanoSuisseBreakdownSheet(wb) { for (const sn of wb.SheetNames) {
    const ws = wb.Sheets[sn];
    if (!ws['!ref'])
        continue;
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    for (let i = 0; i < Math.min(10, raw.length); i++) {
        const hdrs = (raw[i] || []).map(h => bkCellStr(h).toLowerCase().trim());
        if (hdrs.includes('endo#') && hdrs.includes('due amt'))
            return { sheetName: sn, raw, headerRowIdx: i, hdrs };
    }
} return null; }
function parseLibanoSuisseBreakdown(found) { const { raw, headerRowIdx, hdrs } = found; const colAmt = hdrs.indexOf('due amt'); let additions = 0, deletions = 0; for (let i = headerRowIdx + 1; i < raw.length; i++) {
    const amt = bkNum(raw[i][colAmt]);
    if (!amt)
        continue;
    if (amt < 0)
        deletions += Math.abs(amt);
    else
        additions += amt;
} const finalTotal = Math.round((additions - deletions) * 100) / 100; return { carrier: 'Libano Suisse Takaful', additions, deletions, finalTotal }; }
function findKAFBreakdownSheet(wb) { for (const sn of wb.SheetNames) {
    const ws = wb.Sheets[sn];
    if (!ws['!ref'])
        continue;
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    const hdrs = (raw[0] || []).map(h => bkCellStr(h).toLowerCase().trim());
    if (hdrs.some(h => h.includes('medical category')) && hdrs.some(h => h.includes('life category')) && hdrs.some(h => h.includes('frequency premium')))
        return { sheetName: sn, raw, hdrs };
} return null; }
function parseKAFBreakdown(found) { const { raw, hdrs } = found; const colFreq = hdrs.findIndex(h => h.includes('frequency premium') && !h.includes('net')); let finalTotal = 0; for (let i = 1; i < raw.length; i++) {
    const row = raw[i];
    const name = bkCellStr(row[0]);
    if (!name || /^total|^net premium|^issuing fees/i.test(name))
        continue;
    finalTotal += bkNum(row[colFreq]);
} return { carrier: 'KAF Insurance', additions: 0, deletions: 0, finalTotal: Math.round(finalTotal * 100) / 100 }; }
async function parseBreakdownWorkbook(buf, pwd) { const load = await loadWorkbookMaybeEncrypted(buf, pwd); if (load.needsPassword)
    return { needsPassword: true }; if (load.wrongPassword)
    return { wrongPassword: true }; const wb = load.wb; const gig = findGIGBreakdownSheet(wb); if (gig)
    return { ...parseGIGBreakdown(gig), sheetName: gig.sheetName }; const axa = findAXABreakdownSheet(wb); if (axa)
    return { ...parseAXABreakdown(axa), sheetName: axa.sheetName }; const metlife = findMetLifeStatementSheet(wb); if (metlife)
    return { ...parseMetLifeBreakdown(metlife), sheetName: metlife.sheetName }; const allianz = findAllianzBreakdownSheet(wb); if (allianz)
    return { ...parseAllianzBreakdown(allianz), sheetName: allianz.sheetName }; const lst = findLibanoSuisseBreakdownSheet(wb); if (lst)
    return { ...parseLibanoSuisseBreakdown(lst), sheetName: lst.sheetName }; const kaf = findKAFBreakdownSheet(wb); if (kaf)
    return { ...parseKAFBreakdown(kaf), sheetName: kaf.sheetName }; const generic = findMemberListSheet(wb); if (generic)
    return { ...parseGenericMemberList(generic), sheetName: generic.sheetName }; return { error: `Could not recognize this breakdown file's format (checked GIG, AXA, MetLife, Allianz, Libano Suisse Takaful, KAF Insurance, and generic member-list layouts). Sheets in file: ${wb.SheetNames.join(", ")}` }; }
function ContactPickerModal({ title, subtitle, pocs, onPick, onClose }) {
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 420 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, title),
                    subtitle && React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } }, subtitle)),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
            pocs.length === 0 && React.createElement("div", { style: { fontSize: 12, color: "#a0b8cc", fontStyle: "italic", padding: "10px 0 4px" } }, "No contacts on file yet \u2014 add one from the Account/Insurer page first."),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, pocs.map((p, i) => React.createElement("button", { key: i, disabled: !p.email, onClick: () => onPick(p), style: { textAlign: "left", background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 10, padding: "10px 13px", cursor: p.email ? "pointer" : "not-allowed", opacity: p.email ? 1 : .55 } },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13, color: "#0f1c2e" } }, p.name || "(no name)"),
                React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5" } },
                    p.title || "",
                    p.title && (p.email ? " · " : ""),
                    p.email || "no email on file"))))));
}
function NetworkUploadModal({ ins, onSave, onClose }) {
    const isAXA = /axa/i.test(ins.name);
    const isSehaOne = /sehaone/i.test(ins.name);
    const [file, setFile] = useState(null);
    const [fileBuf, setFileBuf] = useState(null);
    const [parsing, setParsing] = useState(false);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);
    const [needsPassword, setNeedsPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const fileRef = useRef(null);
    const blankSlot = { file: null, buf: null, parsing: false, preview: null, error: null, needsPassword: false, password: "" };
    const [axaMain, setAxaMain] = useState(blankSlot);
    const [axaOH, setAxaOH] = useState(blankSlot);
    const axaMainRef = useRef(null);
    const axaOHRef = useRef(null);
    const sehaMainBlank = { file: null, buf: null, parsing: false, preview: null, error: null };
    const [sehaMain, setSehaMain] = useState(sehaMainBlank);
    const [sehaCash, setSehaCash] = useState(sehaMainBlank);
    const sehaMainRef = useRef(null);
    const sehaCashRef = useRef(null);
    async function parseSehaOne(which, buf) { const setSlot = which === "main" ? setSehaMain : setSehaCash; setSlot(x => ({ ...x, parsing: true, preview: null, error: null })); try {
        const res = await loadWorkbookMaybeEncrypted(buf, null);
        if (res.needsPassword) {
            setSlot(x => ({ ...x, parsing: false, error: "This file is password-protected. Please use an unprotected copy for SehaOne network import." }));
            return;
        }
        if (res.wrongPassword) {
            setSlot(x => ({ ...x, parsing: false, error: "Incorrect password." }));
            return;
        }
        const wb = res.wb;
        const sn = wb.SheetNames.find(n => wb.Sheets[n]?.["!ref"]) || wb.SheetNames[0];
        const raw = XLSX.utils.sheet_to_json(wb.Sheets[sn], { header: 1, defval: "" });
        let headerRowIdx = 0;
        for (let i = 0; i < Math.min(12, raw.length); i++) {
            const h = (raw[i] || []).map(v => (v || "").toString().trim().toLowerCase());
            if (h.some(x => x.includes("provider name") || x.includes("اسم مقدم الخدمة"))) {
                headerRowIdx = i;
                break;
            }
        }
        const hdrs = (raw[headerRowIdx] || []).map(v => (v || "").toString().trim());
        const norm = x => (x || "").toString().trim().toLowerCase();
        const find = (...names) => hdrs.findIndex(h => names.some(n => norm(h) === norm(n) || norm(h).includes(norm(n))));
        const cNameAr = find("اسم مقدم الخدمة"), cNameEn = find("Provider Name"), cType = find("نوع مقدم الخدمة"), cSpec = find("التخصص"), cAddr = find("العنوان"), cCity = find("الحي/المدينة"), cGov = find("المحافظة"), cPhone = find("phone #1", "phone");
        const get = (r, i) => i >= 0 ? (r[i] ?? "").toString().trim() : "";
        const tiersData = {};
        const tierOrder = [];
        if (which === "main") {
            for (const t of ["S", "E", "H", "A"]) {
                const ci = find("Tier " + t);
                if (ci < 0)
                    continue;
                tiersData[t] = [];
                tierOrder.push(t);
            }
            for (let i = headerRowIdx + 1; i < raw.length; i++) {
                const r = raw[i] || [];
                const nameAr = get(r, cNameAr), nameEn = get(r, cNameEn);
                if (!nameAr && !nameEn)
                    continue;
                const base = { nameAr, nameEn, typeAr: get(r, cType), spec: get(r, cSpec), addr: get(r, cAddr), cityAr: get(r, cCity), govAr: get(r, cGov), phone: get(r, cPhone) };
                for (const t of tierOrder) {
                    const ci = find("Tier " + t);
                    if (get(r, ci))
                        tiersData[t].push({ ...base, tier: t });
                }
            }
        }
        else {
            tiersData["SehaCash Network"] = [];
            tierOrder.push("SehaCash Network");
            for (let i = headerRowIdx + 1; i < raw.length; i++) {
                const r = raw[i] || [];
                const nameAr = get(r, cNameAr);
                if (!nameAr)
                    continue;
                tiersData["SehaCash Network"].push({ nameAr, nameEn: get(r, cNameEn), typeAr: get(r, cType), spec: get(r, cSpec), addr: get(r, cAddr), cityAr: get(r, cCity), govAr: get(r, cGov), phone: get(r, cPhone), tier: "SehaCash Network" });
            }
        }
        const total = Object.values(tiersData).reduce((n, a) => n + a.length, 0);
        if (!total) {
            setSlot(x => ({ ...x, parsing: false, error: `0 providers found in "${sn}".` }));
            return;
        }
        setSlot(x => ({ ...x, parsing: false, preview: { tiersData, tierOrder, total, sheetName: sn } }));
    }
    catch (err) {
        setSlot(x => ({ ...x, parsing: false, error: "Error: " + err.message }));
    } }
    async function handleSehaFile(e, which) { const f = e.target.files[0]; if (!f)
        return; const setSlot = which === "main" ? setSehaMain : setSehaCash; setSlot({ ...sehaMainBlank, file: f.name }); const buf = await f.arrayBuffer(); setSlot(x => ({ ...x, buf })); await parseSehaOne(which, buf); }
    async function axaParse(which, buf, pwd) { const setSlot = which === "main" ? setAxaMain : setAxaOH; setSlot(s => ({ ...s, parsing: true, preview: null, error: null })); try {
        const res = await loadWorkbookMaybeEncrypted(buf, pwd);
        if (res.needsPassword) {
            setSlot(s => ({ ...s, parsing: false, needsPassword: true }));
            return;
        }
        if (res.wrongPassword) {
            setSlot(s => ({ ...s, parsing: false, error: "Incorrect password. Please try again." }));
            return;
        }
        const found = findAXASheet(res.wb, ["new addition", "deletion"]);
        if (!found) {
            setSlot(s => ({ ...s, parsing: false, error: `Could not find an AXA-format sheet (needs "Provider" and "Network Name" columns). Sheets in file: ${res.wb.SheetNames.join(", ")}` }));
            return;
        }
        const forced = which === "oh" ? "OneHealth Network" : null;
        const parsed = parseAXARows(found, forced);
        if (parsed.total === 0) {
            setSlot(s => ({ ...s, parsing: false, error: `0 providers found in sheet "${found.sheetName}".` }));
            return;
        }
        setSlot(s => ({ ...s, parsing: false, preview: { ...parsed, sheetName: found.sheetName } }));
    }
    catch (err) {
        setSlot(s => ({ ...s, parsing: false, error: "Error: " + err.message }));
    } }
    async function handleAxaFile(e, which) { const f = e.target.files[0]; if (!f)
        return; const setSlot = which === "main" ? setAxaMain : setAxaOH; setSlot(s => ({ ...blankSlot, file: f.name })); const buf = await f.arrayBuffer(); setSlot(s => ({ ...s, buf })); await axaParse(which, buf, null); }
    async function handleAxaPasswordSubmit(which) { const slot = which === "main" ? axaMain : axaOH; if (!slot.buf || !slot.password.trim())
        return; await axaParse(which, slot.buf, slot.password.trim()); }
    async function parseBuffer(buf, pwd = null) {
        setParsing(true);
        setPreview(null);
        setError(null);
        setDebugInfo(null);
        try {
            let xlsBuf = buf;
            const sig = new Uint8Array(buf, 0, 8);
            const isCFB = sig[0] === 0xD0 && sig[1] === 0xCF && sig[2] === 0x11 && sig[3] === 0xE0;
            if (isCFB) {
                if (!pwd) {
                    try {
                        XLSX.read(buf, { type: 'array', codepage: 1256 });
                    }
                    catch (e) {
                        if (e.message && (e.message.includes('password') || e.message.includes('Password') || e.message.includes('protected'))) {
                            setParsing(false);
                            setNeedsPassword(true);
                            return;
                        }
                    }
                }
                else {
                    const result = await decryptOfficeFile(buf, pwd);
                    if (!result.ok) {
                        if (result.err === 'wrong_password') {
                            setParsing(false);
                            setError('Incorrect password. Please try again.');
                            return;
                        }
                        throw new Error(result.err);
                    }
                    xlsBuf = result.data.buffer.slice(result.data.byteOffset, result.data.byteOffset + result.data.byteLength);
                }
            }
            const wb = XLSX.read(xlsBuf, { type: 'array', codepage: 1256 });
            let bestSheetName = wb.SheetNames[0], bestScore = -1;
            for (const sn of wb.SheetNames) {
                const ws = wb.Sheets[sn];
                const ref = ws['!ref'];
                if (!ref)
                    continue;
                const range = XLSX.utils.decode_range(ref);
                const score = (range.e.r - range.s.r) * Math.min(range.e.c - range.s.c, 20);
                if (score > bestScore) {
                    bestScore = score;
                    bestSheetName = sn;
                }
            }
            const ws = wb.Sheets[bestSheetName];
            const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
            if (raw.length < 2) {
                setError('Sheet appears empty.');
                setParsing(false);
                return;
            }
            const KNOWN = ["network", "شبكة", "كود", "provider", "مقدم", "name", "اسم", "أسم", "govern", "محافظة", "city", "مدين", "region", "منطقة", "address", "عنوان", "phone", "هاتف", "تليفون", "telephone", "specialty", "تخصص", "type", "نوع", "card", "كارت", "#"];
            function scoreRow(row) { return row.reduce((s, cell) => { const v = (cell || '').toString().toLowerCase(); return s + KNOWN.filter(k => v.includes(k)).length; }, 0); }
            let headerRowIdx = 0, bestHdrScore = -1;
            for (let i = 0; i < Math.min(12, raw.length); i++) {
                const sc = scoreRow(raw[i]);
                if (sc > bestHdrScore) {
                    bestHdrScore = sc;
                    headerRowIdx = i;
                }
            }
            const hdrs = raw[headerRowIdx].map(h => (h || '').toString().trim());
            function col(...keywords) { for (const kw of keywords) {
                const idx = hdrs.findIndex(h => h.toLowerCase().includes(kw.toLowerCase()) || h.includes(kw));
                if (idx >= 0)
                    return idx;
            } return -1; }
            let colTier = col("Network Code", "كود الشبكة", "Network Tier", "Tier", "شبكة طب", "كارت", "Card", "نوع الكارت");
            const colGovAr = col("المحافظة", "محافظة"), colGovEn = col("Governerat", "Governorat", "Governate");
            const colCityAr = col("المدينة", "مدينة"), colCityEn = col("City", "Region/City", "Region", "Area");
            const colTypeAr = col("نوع مقدم", "نوع ال"), colTypeEn = col("Provider Type", "Type");
            const colNameAr = col("أسم مقدم", "اسم مقدم"), colNameEn = col("Provider Name");
            const colSpec = col("Speciality", "Specialty", "التخصص", "تخصص", "Sub-Speciality");
            const colAddrAr = col("العنوان", "عنوان"), colAddrEn = col("Address", "addr");
            const colPhone = col("Telephone 1", "Phone Number 1", "Phone", "هاتف", "رقم  الهاتف", "رقم الهاتف", "تليفون", "التليفون1", "tel", "Hotline");
            const colStatus = col("Status", "الحالة", "حالة");
            const C = { tier: colTier, govAr: colGovAr >= 0 ? colGovAr : colGovEn < 0 ? 1 : -1, govEn: colGovEn, citAr: colCityAr >= 0 ? colCityAr : colCityEn < 0 ? 2 : -1, citEn: colCityEn, typAr: colTypeAr >= 0 ? colTypeAr : colTypeEn < 0 ? 3 : -1, typEn: colTypeEn, namAr: colNameAr >= 0 ? colNameAr : colNameEn >= 0 ? colNameEn : 4, namEn: colNameEn, spec: colSpec >= 0 ? colSpec : 5, addr: colAddrAr >= 0 ? colAddrAr : colAddrEn >= 0 ? colAddrEn : 6, phone: colPhone >= 0 ? colPhone : 7, stat: colStatus };
            function g(row, idx) { return idx >= 0 && idx < row.length ? (row[idx] || '').toString().trim() : ''; }
            let usesFileNameAsTier = false, derivedTierName = '';
            if (C.tier < 0) {
                usesFileNameAsTier = true;
                derivedTierName = file.replace(/\.(xlsx|xls)$/i, '').replace(/[_-]/g, ' ').replace(/\b(20\d{2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/gi, '').replace(new RegExp(ins.name, 'gi'), '').replace(/\s+/g, ' ').trim() || 'Network';
            }
            const tiersData = {}, tierOrder = [];
            let skipped = 0;
            for (let i = headerRowIdx + 1; i < raw.length; i++) {
                const row = raw[i];
                if (row.every(v => !v))
                    continue;
                let tierLabel = usesFileNameAsTier ? derivedTierName : normalizeTierLabel(g(row, C.tier)) || 'Unassigned';
                if (!tierOrder.includes(tierLabel))
                    tierOrder.push(tierLabel);
                if (!tiersData[tierLabel])
                    tiersData[tierLabel] = [];
                const nameAr = g(row, C.namAr), nameEn = C.namEn >= 0 ? g(row, C.namEn) : '';
                if (!nameAr && !nameEn) {
                    skipped++;
                    continue;
                }
                tiersData[tierLabel].push({ tier: tierLabel, nameAr, nameEn, govAr: g(row, C.govAr), govEn: g(row, C.govEn), cityAr: g(row, C.citAr), cityEn: g(row, C.citEn), typeAr: g(row, C.typAr), typeEn: g(row, C.typEn), spec: g(row, C.spec), addr: g(row, C.addr), phone: g(row, C.phone), status: g(row, C.stat) });
            }
            const total = Object.values(tiersData).reduce((s, a) => s + a.length, 0);
            if (total === 0) {
                setError(`0 providers found.\nSheet: "${bestSheetName}" · Header row: ${headerRowIdx}\nColumns: ${hdrs.filter(Boolean).slice(0, 10).join(' | ')}\nName col: ${C.namAr}`);
                setParsing(false);
                return;
            }
            setDebugInfo({ sheetName: bestSheetName, headerRowIdx, hdrs: hdrs.filter(Boolean).slice(0, 14), tierMode: usesFileNameAsTier ? `Single tier from filename: "${derivedTierName}"` : `Tier column detected at index ${C.tier}`, tiersFound: tierOrder });
            setPreview({ tiersData, tierOrder, total, skipped, headerRowIdx, sheetName: bestSheetName });
        }
        catch (err) {
            setError('Error: ' + err.message);
        }
        setParsing(false);
    }
    async function handleFile(e) { const f = e.target.files[0]; if (!f)
        return; setFile(f.name); setNeedsPassword(false); setPassword(''); setPreview(null); setError(null); const buf = await f.arrayBuffer(); setFileBuf(buf); await parseBuffer(buf, null); }
    async function handlePasswordSubmit() { if (!fileBuf || !password.trim())
        return; await parseBuffer(fileBuf, password.trim()); }
    function handleSave() { if (isSehaOne) {
        if (!sehaMain.preview)
            return;
        const tiersData = { ...sehaMain.preview.tiersData };
        let tierOrder = [...sehaMain.preview.tierOrder];
        let total = sehaMain.preview.total, skipped = 0;
        const fileNames = [sehaMain.file];
        if (sehaCash.preview) {
            Object.assign(tiersData, sehaCash.preview.tiersData);
            sehaCash.preview.tierOrder.forEach(t => { if (!tierOrder.includes(t))
                tierOrder.push(t); });
            total += sehaCash.preview.total;
            fileNames.push(sehaCash.file);
        }
        onSave({ ...ins, network: { tiersData, tierOrder, total, skipped, groups: [{ name: "SehaOne Network", tiers: ["S", "E", "H", "A"] }, { name: "SehaCash Network", tiers: ["SehaCash Network"] }], uploadedAt: new Date().toISOString(), fileName: fileNames.join(" + ") } });
        onClose();
        return;
    } if (isAXA) {
        if (!axaMain.preview)
            return;
        const tiersData = { ...axaMain.preview.tiersData };
        let tierOrder = [...axaMain.preview.tierOrder];
        let total = axaMain.preview.total, skipped = axaMain.preview.skipped;
        const fileNames = [axaMain.file];
        if (axaOH.preview && axaOH.preview.total > 0) {
            Object.assign(tiersData, axaOH.preview.tiersData);
            axaOH.preview.tierOrder.forEach(t => { if (!tierOrder.includes(t))
                tierOrder.push(t); });
            total += axaOH.preview.total;
            skipped += axaOH.preview.skipped;
            fileNames.push(axaOH.file);
        }
        onSave({ ...ins, network: { tiersData, tierOrder, total, skipped, uploadedAt: new Date().toISOString(), fileName: fileNames.join(" + ") } });
        onClose();
        return;
    } if (!preview)
        return; onSave({ ...ins, network: { tiersData: preview.tiersData, tierOrder: preview.tierOrder, total: preview.total, skipped: preview.skipped, uploadedAt: new Date().toISOString(), fileName: file } }); onClose(); }
    function renderAxaSlot(which, label, desc, required) {
        const slot = which === "main" ? axaMain : axaOH;
        const ref = which === "main" ? axaMainRef : axaOHRef;
        const tierColorSrc = slot.preview?.tierOrder || [];
        return React.createElement("div", { style: { background: "#f0f6ff", border: "1.5px dashed #4285f444", borderRadius: 12, padding: "14px", marginBottom: 14 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#4285f4", marginBottom: 2 } },
                label,
                !required && React.createElement("span", { style: { color: "#a8bccf", fontWeight: 600 } }, " (optional)")),
            React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", marginBottom: 10 } }, desc),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("button", { style: { ...c.sv, background: "#4285f4", padding: "8px 18px", fontSize: 12 }, onClick: () => ref.current?.click(), disabled: slot.parsing }, slot.parsing ? "Parsing..." : slot.file ? "Replace File" : "Choose Excel (.xlsx / .xls)"),
                slot.file && React.createElement("div", { style: { fontSize: 11, color: "#4285f4", fontWeight: 600, marginTop: 8 } },
                    React.createElement(Ic, { name: "document" }),
                    " ",
                    slot.file),
                React.createElement("input", { ref: ref, type: "file", accept: ".xlsx,.xls", style: { display: "none" }, onChange: e => handleAxaFile(e, which) }),
                slot.parsing && React.createElement("div", { style: { marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 } },
                    React.createElement("div", { style: { width: 13, height: 13, borderRadius: "50%", border: "3px solid #e8f0fe", borderTopColor: "#4285f4", animation: "spinSlow .8s linear infinite" } }),
                    React.createElement("span", { style: { fontSize: 11, color: "#4285f4" } }, "Finding the AXA sheet & reading providers..."))),
            slot.needsPassword && React.createElement("div", { style: { marginTop: 10, textAlign: "left" } },
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#d4880a", marginBottom: 6 } },
                    React.createElement(Ic, { name: "lock" }),
                    " Password-protected \u2014 enter password to decrypt"),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("input", { style: { ...c.fi, marginBottom: 0, flex: 1 }, type: "password", value: slot.password, onChange: e => { const setSlot = which === "main" ? setAxaMain : setAxaOH; setSlot(s => ({ ...s, password: e.target.value })); }, onKeyDown: e => e.key === "Enter" && handleAxaPasswordSubmit(which), placeholder: "Enter file password...", autoFocus: true }),
                    React.createElement("button", { style: { ...c.sv, background: "#d4880a", padding: "7px 14px", fontSize: 11, whiteSpace: "nowrap" }, onClick: () => handleAxaPasswordSubmit(which), disabled: !slot.password.trim() || slot.parsing }, slot.parsing ? "Decrypting..." : "Decrypt & Parse"))),
            slot.error && React.createElement("div", { style: { marginTop: 10, background: "#fff0ef", border: "1px solid #e0392e33", borderRadius: 8, padding: "9px 12px", fontSize: 11, color: "#e0392e", lineHeight: 1.6, whiteSpace: "pre-wrap", textAlign: "left" } }, slot.error),
            slot.preview && React.createElement("div", { style: { marginTop: 10 } },
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#0fa890", marginBottom: 8 } },
                    "\u2713 ",
                    slot.preview.total.toLocaleString(),
                    " providers found in \"",
                    slot.preview.sheetName,
                    "\"",
                    slot.preview.skipped > 0 ? ` · ${slot.preview.skipped} skipped` : ""),
                React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, slot.preview.tierOrder.map(t => { const color = colorForTier(t, tierColorSrc); return React.createElement("div", { key: t, style: { background: `${color}15`, border: `1px solid ${color}44`, borderRadius: 7, padding: "4px 9px", fontSize: 10, fontWeight: 700, color } },
                    t,
                    ": ",
                    slot.preview.tiersData[t]?.length.toLocaleString()); }))));
    }
    if (isSehaOne) {
        const combinedTotal = (sehaMain.preview?.total || 0) + (sehaCash.preview?.total || 0);
        const renderSehaSlot = (which, label, desc, required) => {
            const slot = which === "main" ? sehaMain : sehaCash;
            const ref = which === "main" ? sehaMainRef : sehaCashRef;
            return React.createElement("div", { style: { background: "#f0f6ff", border: "1.5px dashed #4285f444", borderRadius: 12, padding: "14px", marginBottom: 14 } },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#4285f4", marginBottom: 2 } },
                    label,
                    !required && React.createElement("span", { style: { color: "#a8bccf", fontWeight: 600 } }, " (optional)")),
                React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", marginBottom: 10 } }, desc),
                React.createElement("button", { style: { ...c.sv, background: "#4285f4", padding: "8px 18px", fontSize: 12 }, onClick: () => ref.current?.click(), disabled: slot.parsing }, slot.parsing ? "Parsing..." : slot.file ? "Replace File" : "Choose Excel (.xlsx / .xls)"),
                slot.file && React.createElement("div", { style: { fontSize: 11, color: "#4285f4", fontWeight: 600, marginTop: 8 } },
                    React.createElement(Ic, { name: "document" }),
                    " ",
                    slot.file),
                React.createElement("input", { ref: ref, type: "file", accept: ".xlsx,.xls", style: { display: "none" }, onChange: e => handleSehaFile(e, which) }),
                slot.error && React.createElement("div", { style: { marginTop: 10, background: "#fff0ef", border: "1px solid #e0392e33", borderRadius: 8, padding: "9px 12px", fontSize: 11, color: "#e0392e", whiteSpace: "pre-wrap" } }, slot.error),
                slot.preview && React.createElement("div", { style: { marginTop: 10, fontSize: 11, fontWeight: 700, color: "#0fa890" } },
                    "\u2713 ",
                    slot.preview.total.toLocaleString(),
                    " providers found"));
        };
        return React.createElement("div", { style: c.modal },
            React.createElement("div", { style: { ...c.mBox, width: 600, maxHeight: "90vh", overflowY: "auto" } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #edf2f7" } },
                    React.createElement("div", { style: { width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#0fa890,#4285f4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 } }, React.createElement(Ic, { name: "hospital" })),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Upload SehaOne Medical Networks"),
                        React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } },
                            ins.name,
                            " \u2014 SehaOne Network + SehaCash Network")),
                    React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
                renderSehaSlot("main", "SehaOne Network", "Main provider network. Tier columns S / E / H / A are automatically separated into four network tiers.", true),
                renderSehaSlot("cash", "SehaCash Network", "Cash network providers. This is stored as a separate network section.", false),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 } },
                    React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                    React.createElement("button", { style: { ...c.sv, background: "linear-gradient(135deg,#0fa890,#4285f4)" }, onClick: handleSave, disabled: !sehaMain.preview },
                        "\u2713 Save Networks (",
                        combinedTotal.toLocaleString(),
                        " providers)"))));
    }
    if (isAXA) {
        const combinedTotal = (axaMain.preview?.total || 0) + (axaOH.preview?.total && axaOH.preview.total > 0 ? axaOH.preview.total : 0);
        return React.createElement("div", { style: c.modal },
            React.createElement("div", { style: { ...c.mBox, width: 600, maxHeight: "90vh", overflowY: "auto" } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #edf2f7" } },
                    React.createElement("div", { style: { width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#0fa890,#4285f4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 } }, React.createElement(Ic, { name: "hospital" })),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Upload AXA Medical Network"),
                        React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } },
                            ins.name,
                            " \u2014 main network (Crystal/Diamond/Elite) + OneHealth Network")),
                    React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
                renderAxaSlot("main", "AXA Network File", "The main AXA providers export (auto-detects the current network sheet, skipping New Additions/Deletion changelogs). Tiers are grouped by Network Name (Crystal/Diamond/Elite).", true),
                renderAxaSlot("oh", "OneHealth Network File", "AXA's OneHealth clinics directory — saved as its own separate section named \"OneHealth Network\", regardless of what the sheet itself calls it internally.", false),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 } },
                    React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                    React.createElement("button", { style: { ...c.sv, background: "linear-gradient(135deg,#0fa890,#4285f4)" }, onClick: handleSave, disabled: !axaMain.preview },
                        "\u2713 Save Network (",
                        combinedTotal.toLocaleString(),
                        " providers)"))));
    }
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 580, maxHeight: "90vh", overflowY: "auto" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #edf2f7" } },
                React.createElement("div", { style: { width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#0fa890,#4285f4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 } }, React.createElement(Ic, { name: "hospital" })),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Upload Medical Network"),
                    React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } },
                        ins.name,
                        " \u2014 tier names auto-detected from the sheet")),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
            React.createElement("div", { style: { background: "#f0f6ff", border: "1.5px dashed #4285f444", borderRadius: 12, padding: "16px", marginBottom: 14, textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#4285f4", marginBottom: 5 } }, "Upload Network Excel"),
                React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginBottom: 12 } }, "Supports any TPA format \u2014 tier/card column auto-detected. Password-protected files supported."),
                React.createElement("button", { style: { ...c.sv, background: "#4285f4", padding: "9px 22px", fontSize: 13 }, onClick: () => fileRef.current?.click(), disabled: parsing }, parsing ? "Parsing..." : file ? "Replace File" : "Choose Excel (.xlsx / .xls)"),
                file && React.createElement("div", { style: { fontSize: 11, color: "#4285f4", fontWeight: 600, marginTop: 8 } },
                    React.createElement(Ic, { name: "document" }),
                    " ",
                    file),
                React.createElement("input", { ref: fileRef, type: "file", accept: ".xlsx,.xls", style: { display: "none" }, onChange: handleFile }),
                parsing && React.createElement("div", { style: { marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 } },
                    React.createElement("div", { style: { width: 14, height: 14, borderRadius: "50%", border: "3px solid #e8f0fe", borderTopColor: "#4285f4", animation: "spinSlow .8s linear infinite" } }),
                    React.createElement("span", { style: { fontSize: 11, color: "#4285f4" } }, "Detecting sheet, decrypting & reading providers..."))),
            needsPassword && React.createElement("div", { style: { background: "#fff8e6", border: "1.5px solid #d4880a44", borderRadius: 12, padding: "14px 16px", marginBottom: 14 } },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#d4880a", marginBottom: 4 } },
                    React.createElement(Ic, { name: "lock" }),
                    " This file is password-protected"),
                React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginBottom: 10 } }, "Enter the password to decrypt and read the network data."),
                React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
                    React.createElement("div", { style: { flex: 1, position: "relative" } },
                        React.createElement("input", { style: { ...c.fi, marginBottom: 0, paddingRight: 36 }, type: showPass ? "text" : "password", value: password, onChange: e => setPassword(e.target.value), onKeyDown: e => e.key === 'Enter' && handlePasswordSubmit(), placeholder: "Enter file password...", autoFocus: true }),
                        React.createElement("button", { onClick: () => setShowPass(s => !s), style: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#7a9ab5" } }, showPass ? "🙈" : "👁")),
                    React.createElement("button", { style: { ...c.sv, background: "#d4880a", padding: "8px 16px", fontSize: 12, whiteSpace: "nowrap" }, onClick: handlePasswordSubmit, disabled: !password.trim() || parsing }, parsing ? "Decrypting..." : "Decrypt & Parse"))),
            error && React.createElement("div", { style: { background: "#fff0ef", border: "1px solid #e0392e33", borderRadius: 9, padding: "10px 14px", marginBottom: 12, fontSize: 11, color: "#e0392e", lineHeight: 1.7, whiteSpace: "pre-wrap" } }, error),
            preview && React.createElement(React.Fragment, null,
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#0fa890", textTransform: "uppercase", letterSpacing: .7, marginBottom: 4 } },
                    "\u2713 ",
                    preview.total.toLocaleString(),
                    " Providers Found",
                    preview.skipped > 0 ? ` · ${preview.skipped} skipped` : ""),
                React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", marginBottom: 10 } },
                    "Sheet: \"",
                    preview.sheetName,
                    "\" \u00B7 ",
                    preview.tierOrder.length,
                    " tier",
                    preview.tierOrder.length !== 1 ? "s" : "",
                    " detected"),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 14 } }, preview.tierOrder.map(tierLabel => {
                    const count = preview.tiersData[tierLabel]?.length || 0;
                    const color = colorForTier(tierLabel, preview.tierOrder);
                    return React.createElement("div", { key: tierLabel, style: { background: `${color}11`, border: `1.5px solid ${color}33`, borderRadius: 10, padding: "10px 13px" } },
                        React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: color, marginBottom: 2 } }, tierLabel),
                        React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: color, fontFamily: "'Clash Display',sans-serif" } }, count.toLocaleString()),
                        React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5" } }, "providers"));
                })),
                (() => {
                    const topTier = preview.tierOrder[0];
                    const sample = (preview.tiersData[topTier] || []).slice(0, 3);
                    if (!sample.length)
                        return null;
                    const color = colorForTier(topTier, preview.tierOrder);
                    return React.createElement("div", { style: { background: "#f7fbff", border: "1px solid #dde8f0", borderRadius: 10, marginBottom: 14, overflow: "hidden" } },
                        React.createElement("div", { style: { padding: "8px 12px", background: `${color}22`, fontSize: 10, fontWeight: 700, color: color, textTransform: "uppercase", letterSpacing: .7 } },
                            "Sample \u2014 ",
                            topTier),
                        sample.map((p, i) => React.createElement("div", { key: i, style: { padding: "8px 12px", borderBottom: i < sample.length - 1 ? "1px solid #edf2f7" : "none" } },
                            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#0f1c2e" } }, p.nameEn || p.nameAr),
                            p.nameAr && p.nameAr !== p.nameEn && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5" } }, p.nameAr),
                            React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: 2 } }, [p.typeEn || p.typeAr, p.cityEn || p.cityAr, p.govEn || p.govAr].filter(Boolean).join(' · ')))));
                })(),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" } },
                    React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                    React.createElement("button", { style: { ...c.sv, background: "linear-gradient(135deg,#0fa890,#4285f4)" }, onClick: handleSave },
                        "\u2713 Save Network (",
                        preview.total.toLocaleString(),
                        " providers)"))),
            !preview && !error && !needsPassword && React.createElement("div", { style: { display: "flex", justifyContent: "flex-end" } },
                React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"))));
}
function NetworkViewModal({ ins, onClose, onUpdate }) {
    const network = ins.network;
    const [tier, setTier] = useState("all");
    const [search, setSearch] = useState("");
    const [govFilter, setGovFilter] = useState("all");
    const [cityFilter, setCityFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    if (!network)
        return null;
    const tiersData = network.tiersData || network.tiers || {};
    const tierOrder = network.tierOrder || Object.keys(tiersData);
    const allProviders = Object.entries(tiersData).flatMap(([t, ps]) => ps.map(p => ({ ...p, tier: t })));
    function pName(p) { return p.nameAr || p.nameEn || p.name || ""; }
    function pNameEn(p) { return p.nameEn || ""; }
    function pGov(p) { return p.govAr || p.govEn || p.governorate || ""; }
    function pCity(p) { return p.cityAr || p.cityEn || p.city || ""; }
    function pType(p) { return p.typeAr || p.typeEn || p.type || ""; }
    function pSpec(p) { return p.spec || p.specAr || p.specEn || p.specialty || ""; }
    function pAddr(p) { return p.addr || p.addrAr || p.addrEn || p.address || ""; }
    const govs = [...new Set(allProviders.map(p => pGov(p)).filter(Boolean))].sort();
    const citiesForGov = govFilter === "all" ? [...new Set(allProviders.map(p => pCity(p)).filter(Boolean))].sort() : [...new Set(allProviders.filter(p => pGov(p) === govFilter).map(p => pCity(p)).filter(Boolean))].sort();
    const types = [...new Set(allProviders.map(p => pType(p)).filter(Boolean))].sort();
    let shown = allProviders;
    if (tier !== "all")
        shown = shown.filter(p => p.tier === tier);
    if (govFilter !== "all")
        shown = shown.filter(p => pGov(p) === govFilter);
    if (cityFilter !== "all")
        shown = shown.filter(p => pCity(p) === cityFilter);
    if (typeFilter !== "all")
        shown = shown.filter(p => pType(p) === typeFilter);
    if (search) {
        const q = search.toLowerCase();
        shown = shown.filter(p => [p.nameAr, p.nameEn, p.name, p.cityAr, p.cityEn, p.govAr, p.govEn, p.typeAr, p.typeEn, p.spec, p.addr, p.phone].some(v => (v || "").toLowerCase().includes(q)));
    }
    const hasFilters = tier !== "all" || govFilter !== "all" || cityFilter !== "all" || typeFilter !== "all" || search;
    const gridCols = Math.min(tierOrder.length, 4) || 1;
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 820, maxHeight: "94vh", display: "flex", flexDirection: "column" } },
            React.createElement("div", { style: { padding: "18px 20px 14px", borderBottom: "1px solid #edf2f7", flexShrink: 0 } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 } },
                    React.createElement(InsLogo, { ins: ins }),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } },
                            ins.name,
                            " \u2014 Medical Network Directory"),
                        React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5" } },
                            allProviders.length.toLocaleString(),
                            " providers \u00B7 ",
                            network.fileName,
                            " \u00B7 Uploaded ",
                            network.uploadedAt ? new Date(network.uploadedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "")),
                    React.createElement("button", { style: { background: "#f3eaff", border: "1px solid #9333ea33", borderRadius: 8, padding: "6px 13px", fontSize: 11, fontWeight: 700, color: "#9333ea", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }, onClick: () => { onClose(); onUpdate && onUpdate(ins); } }, "\u21BB Update Network"),
                    React.createElement("button", { style: { background: "none", border: "none", fontSize: 22, color: "#c0cdd8", cursor: "pointer", lineHeight: 1 }, onClick: onClose }, "\u00D7")),
                network.groups?.length ? network.groups.map(group => React.createElement("div", { key: group.name, style: { marginBottom: 10 } },
                    React.createElement("div", { style: { fontSize: 9, fontWeight: 800, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: .8, marginBottom: 5 } }, group.name),
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: `repeat(${Math.min(group.tiers.length, 4)},1fr)`, gap: 7 } }, group.tiers.filter(t => tierOrder.includes(t)).map(tierLabel => {
                        const count = tiersData[tierLabel]?.length || 0;
                        const active = tier === tierLabel;
                        const color = colorForTier(tierLabel, tierOrder);
                        return React.createElement("div", { key: tierLabel, onClick: () => { setTier(active ? "all" : tierLabel); setCityFilter("all"); }, style: { background: active ? `${color}22` : "#f7fbff", border: `1.5px solid ${active ? color : color + "33"}`, borderRadius: 9, padding: "8px 11px", cursor: "pointer", transition: "all .12s" }, onMouseEnter: e => e.currentTarget.style.borderColor = color, onMouseLeave: e => e.currentTarget.style.borderColor = active ? color : color + "33" },
                            React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: color, textTransform: "uppercase", letterSpacing: .5, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, tierLabel),
                            React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color: color, fontFamily: "'Clash Display',sans-serif" } }, count.toLocaleString()),
                            active && React.createElement("div", { style: { fontSize: 8, color: color, fontWeight: 700, marginTop: 1 } }, "\u25CF ACTIVE"));
                    })))) : React.createElement("div", { style: { display: "grid", gridTemplateColumns: `repeat(${gridCols},1fr)`, gap: 7, marginBottom: 12 } }, tierOrder.map(tierLabel => { const count = tiersData[tierLabel]?.length || 0; const active = tier === tierLabel; const color = colorForTier(tierLabel, tierOrder); return React.createElement("div", { key: tierLabel, onClick: () => { setTier(active ? "all" : tierLabel); setCityFilter("all"); }, style: { background: active ? `${color}22` : "#f7fbff", border: `1.5px solid ${active ? color : color + "33"}`, borderRadius: 9, padding: "8px 11px", cursor: "pointer" } },
                    React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color } }, tierLabel),
                    React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color } }, count.toLocaleString())); })),
                React.createElement("div", { style: { display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" } },
                    React.createElement("input", { style: { ...c.srch, marginBottom: 0, flex: "2 1 160px" }, placeholder: "\uD83D\uDD0D Search name, specialty, address (Arabic or English)...", value: search, onChange: e => setSearch(e.target.value) }),
                    React.createElement("select", { style: { ...c.fi, marginBottom: 0, flex: "1 1 130px" }, value: govFilter, onChange: e => { setGovFilter(e.target.value); setCityFilter("all"); } },
                        React.createElement("option", { value: "all" }, "All Governorates"),
                        govs.map(g => React.createElement("option", { key: g, value: g }, g))),
                    React.createElement("select", { style: { ...c.fi, marginBottom: 0, flex: "1 1 120px" }, value: cityFilter, onChange: e => setCityFilter(e.target.value), disabled: govFilter === "all" && citiesForGov.length > 50 },
                        React.createElement("option", { value: "all" }, govFilter === "all" ? "Select Gov first" : "All Cities"),
                        citiesForGov.map(c2 => React.createElement("option", { key: c2, value: c2 }, c2))),
                    React.createElement("select", { style: { ...c.fi, marginBottom: 0, flex: "1 1 120px" }, value: typeFilter, onChange: e => setTypeFilter(e.target.value) },
                        React.createElement("option", { value: "all" }, "All Types"),
                        types.map(t => React.createElement("option", { key: t, value: t }, t))),
                    hasFilters && React.createElement("button", { onClick: () => { setTier("all"); setGovFilter("all"); setCityFilter("all"); setTypeFilter("all"); setSearch(""); }, style: { ...c.cBtn, whiteSpace: "nowrap", flexShrink: 0 } }, "\u00D7 Clear all")),
                React.createElement("div", { style: { marginTop: 8, fontSize: 11, color: "#7a9ab5", fontWeight: 600 } },
                    shown.length.toLocaleString(),
                    " providers shown",
                    shown.length > 300 ? " (showing first 300)" : "")),
            React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "0 20px 20px" } },
                shown.length === 0 && React.createElement("div", { style: { padding: "3rem", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, "No providers match your filters."),
                React.createElement("div", { style: { paddingTop: 10, border: shown.length > 0 ? "1px solid #edf2f7" : "none", borderRadius: 10, overflow: "hidden" } },
                    shown.slice(0, 300).map((p, i) => {
                        const tierColor = colorForTier(p.tier, tierOrder);
                        const nameMain = pName(p);
                        const nameSecondary = pNameEn(p) && pNameEn(p) !== nameMain ? pNameEn(p) : "";
                        const govCity = [pGov(p), pCity(p)].filter(Boolean);
                        const typeSpec = [pType(p), pSpec(p)].filter(Boolean);
                        const addr = pAddr(p);
                        return React.createElement("div", { key: i, style: { display: "grid", gridTemplateColumns: "70px 1fr auto", gap: 10, padding: "11px 14px", borderBottom: "1px solid #f0f4f8", background: i % 2 === 0 ? "#fff" : "#fafcfe" } },
                            React.createElement("div", { style: { display: "flex", alignItems: "flex-start", paddingTop: 2 } },
                                React.createElement("div", { style: { background: `${tierColor}22`, color: tierColor, border: `1px solid ${tierColor}44`, borderRadius: 7, padding: "3px 4px", fontSize: 9, fontWeight: 800, textAlign: "center", width: "100%", letterSpacing: .3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.tier)),
                            React.createElement("div", { style: { minWidth: 0 } },
                                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#0f1c2e", marginBottom: 1 } }, nameMain),
                                nameSecondary && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginBottom: 2 } }, nameSecondary),
                                React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: nameSecondary ? 0 : 2 } }, typeSpec.map((v, vi) => React.createElement("span", { key: vi, style: { fontSize: 10, background: vi === 0 ? "#e8f0fe" : "#e8faf8", color: vi === 0 ? "#4285f4" : "#0fa890", borderRadius: 20, padding: "1px 8px", fontWeight: 600 } }, v))),
                                govCity.length > 0 && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: 2 } },
                                    React.createElement(Ic, { name: "pin" }),
                                    " ",
                                    govCity.join(" · ")),
                                addr && React.createElement("div", { style: { fontSize: 10, color: "#b0bec5", marginTop: 1 } }, addr)),
                            React.createElement("div", { style: { flexShrink: 0, textAlign: "right", display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" } },
                                p.phone && React.createElement("div", { style: { fontSize: 11, color: "#4285f4", fontWeight: 700, whiteSpace: "nowrap" } },
                                    React.createElement(Ic, { name: "phone" }),
                                    " ",
                                    p.phone),
                                p.status && React.createElement("div", { style: { fontSize: 9, background: p.status.includes("Active") || p.status.includes("نشط") ? "#e8faf8" : "#f0f4f8", color: p.status.includes("Active") || p.status.includes("نشط") ? "#0fa890" : "#7a9ab5", borderRadius: 20, padding: "1px 8px", fontWeight: 700 } }, p.status)));
                    }),
                    shown.length > 300 && React.createElement("div", { style: { padding: "12px", textAlign: "center", fontSize: 11, color: "#7a9ab5", background: "#f7fbff", borderRadius: "0 0 10px 10px", border: "1px solid #edf2f7" } },
                        "Showing 300 of ",
                        shown.length.toLocaleString(),
                        " \u2014 use filters or search to narrow results."))),
            React.createElement("div", { style: { padding: "12px 20px", borderTop: "1px solid #edf2f7", display: "flex", justifyContent: "flex-end", flexShrink: 0 } },
                React.createElement("button", { style: c.sv, onClick: onClose }, "Close"))));
}
function PlanBenefitCard({ plan, compact }) {
    const [open, setOpen] = useState(!compact);
    const hasBenefits = BENEFIT_ROWS.some(r => plan.rows?.[r]);
    const hasExcl = !!plan.rows?.["Exclusions"];
    return React.createElement("div", { style: { background: "#f7fbff", border: "1px solid #dde8f0", borderRadius: 12, marginBottom: compact ? 8 : 12, overflow: "hidden" } },
        React.createElement("div", { style: { padding: "10px 14px", background: "linear-gradient(90deg,#e8f0fe,#e8faf8)", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: compact ? "pointer" : "default" }, onClick: () => compact && setOpen(o => !o) },
            React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif", color: "#0f1c2e" } }, plan.planName),
                plan.insurer && React.createElement("div", { style: { fontSize: 11, color: "#4285f4", fontWeight: 600 } }, plan.insurer),
                React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap", marginTop: 3 } },
                    plan.employeeCategory && React.createElement("div", { style: { fontSize: 10, background: "#9333ea22", color: "#9333ea", borderRadius: 20, padding: "1px 8px", fontWeight: 700, display: "inline-block" } }, plan.employeeCategory),
                    plan.networkTier && React.createElement("div", { style: { fontSize: 10, background: `${colorForTier(plan.networkTier, [plan.networkTier])}22`, color: colorForTier(plan.networkTier, [plan.networkTier]), borderRadius: 20, padding: "1px 8px", fontWeight: 700, display: "inline-block" } },
                        React.createElement(Ic, { name: "map" }),
                        " ",
                        plan.networkTier))),
            compact && React.createElement("span", { style: { fontSize: 12, color: "#7a9ab5" } }, open ? "▲" : "▼")),
        (open || !compact) && React.createElement("div", { style: { padding: "10px 14px" } },
            hasBenefits && React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: hasExcl ? 10 : 0 } },
                React.createElement("tbody", null, BENEFIT_ROWS.filter(row => plan.rows?.[row]).map(row => React.createElement("tr", { key: row, style: { borderBottom: "1px solid #f0f4f8" } },
                    React.createElement("td", { style: { padding: "5px 8px 5px 0", fontWeight: 700, color: "#7a9ab5", whiteSpace: "nowrap", minWidth: 160, fontSize: 11 } }, row),
                    React.createElement("td", { style: { padding: "5px 0", color: "#0f1c2e", fontSize: 12 } }, plan.rows[row]))))),
            hasExcl && React.createElement("div", { style: { background: "#fff0ef", border: "1px solid #e0392e22", borderRadius: 8, padding: "8px 12px" } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#e0392e", textTransform: "uppercase", letterSpacing: .7, marginBottom: 4 } },
                    React.createElement(Ic, { name: "block" }),
                    " Exclusions"),
                React.createElement("div", { style: { fontSize: 11, color: "#4a6080", lineHeight: 1.6 } }, plan.rows["Exclusions"])),
            !hasBenefits && !hasExcl && React.createElement("div", { style: { fontSize: 12, color: "#c0cdd8", textAlign: "center", padding: "10px 0" } }, "No benefit details yet."),
            plan.updatedAt && React.createElement("div", { style: { fontSize: 10, color: "#c0cdd8", marginTop: 6 } },
                "Updated ",
                new Date(plan.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }))));
}
function InsurerPlanModal({ ins, onSave, onClose }) {
    const plans = ins.plans || [];
    const [screen, setScreen] = useState("list");
    const [editIdx, setEditIdx] = useState(null);
    const [form, setForm] = useState({ planName: "", rows: {} });
    const chRow = (k, v) => setForm(f => ({ ...f, rows: { ...f.rows, [k]: v } }));
    function openNew() { setForm({ planName: "", rows: {} }); setEditIdx(null); setScreen("edit"); }
    function openEdit(i) { setForm({ planName: plans[i].planName || "", rows: { ...plans[i].rows } }); setEditIdx(i); setScreen("edit"); }
    function savePlan() { if (!form.planName.trim())
        return; const np = [...plans]; const entry = { planName: form.planName, insurer: ins.name, networkTier: form.networkTier || null, rows: { ...form.rows }, updatedAt: new Date().toISOString() }; if (editIdx !== null)
        np[editIdx] = entry;
    else
        np.push(entry); onSave({ ...ins, plans: np }); setScreen("list"); }
    function deletePlan(i) { if (!window.confirm("Delete this plan?"))
        return; onSave({ ...ins, plans: plans.filter((_, idx) => idx !== i) }); }
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 540, maxHeight: "90vh", overflowY: "auto" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } },
                screen === "edit" && React.createElement("button", { style: { ...c.cBtn, padding: "4px 10px", fontSize: 11 }, onClick: () => setScreen("list") }, "\u2190 Back"),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, screen === "list" ? "Benefit Plans" : "Plan Details"),
                    React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } }, ins.name)),
                screen === "list" && React.createElement("button", { style: c.aBtn, onClick: openNew }, "+ New Plan"),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 18, color: "#c0cdd8", cursor: "pointer", lineHeight: 1 }, onClick: onClose }, "\u00D7")),
            screen === "list" && React.createElement(React.Fragment, null,
                plans.length === 0 && React.createElement("div", { style: { padding: "2.5rem", textAlign: "center", color: "#c0cdd8", fontSize: 13, background: "#f7fbff", borderRadius: 10, border: "1px dashed #dde8f0" } },
                    "No plans yet for ",
                    ins.name,
                    ".",
                    React.createElement("br", null),
                    "Click \"+ New Plan\" to add one."),
                plans.map((plan, i) => React.createElement("div", { key: i, style: { background: "#f7fbff", border: "1px solid #dde8f0", borderRadius: 10, marginBottom: 9, overflow: "hidden" } },
                    React.createElement("div", { style: { padding: "9px 13px", background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "space-between" } },
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, plan.planName),
                        React.createElement("div", { style: { display: "flex", gap: 6 } },
                            React.createElement("button", { style: { ...c.tAct("#4285f4", "#e8f0fe"), fontSize: 10, padding: "3px 8px" }, onClick: () => openEdit(i) },
                                React.createElement(Ic, { name: "edit" }),
                                " Edit"),
                            React.createElement("button", { style: { ...c.tAct("#e0392e", "#fff0ef"), fontSize: 10, padding: "3px 8px" }, onClick: () => deletePlan(i) }, "Delete"))),
                    React.createElement("div", { style: { padding: "8px 13px", fontSize: 11, color: "#7a9ab5" } },
                        BENEFIT_ROWS.filter(r => plan.rows?.[r]).slice(0, 3).map(r => React.createElement("span", { key: r, style: { marginRight: 10 } },
                            React.createElement("strong", null,
                                r,
                                ":"),
                            " ",
                            plan.rows[r])),
                        BENEFIT_ROWS.filter(r => plan.rows?.[r]).length > 3 && React.createElement("span", null,
                            "+ ",
                            BENEFIT_ROWS.filter(r => plan.rows?.[r]).length - 3,
                            " more"))))),
            screen === "edit" && React.createElement(React.Fragment, null,
                React.createElement("div", { style: { marginBottom: 12 } },
                    React.createElement("label", { style: c.fl }, "Plan Name"),
                    React.createElement("input", { style: c.fi, value: form.planName, onChange: e => setForm(f => ({ ...f, planName: e.target.value })), placeholder: "e.g. Diamond, Plan 1, VIP...", autoFocus: true })),
                ins.network && React.createElement("div", { style: { marginBottom: 12 } },
                    React.createElement("label", { style: c.fl }, "Network Tier"),
                    React.createElement("select", { style: c.fi, value: form.networkTier || "", onChange: e => setForm(f => ({ ...f, networkTier: e.target.value })) },
                        React.createElement("option", { value: "" }, "\u2014 No specific tier \u2014"),
                        (ins.network.tierOrder || Object.keys(ins.network.tiersData || ins.network.tiers || {})).map(tierLabel => { const data = ins.network.tiersData || ins.network.tiers || {}; const cnt = (data[tierLabel] || []).length; return cnt > 0 ? React.createElement("option", { key: tierLabel, value: tierLabel },
                            tierLabel,
                            " (",
                            cnt,
                            " providers)") : null; }))),
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#0fa890", marginBottom: 10, textTransform: "uppercase", letterSpacing: .7 } }, "Benefits Table"),
                BENEFIT_ROWS.map(row => React.createElement("div", { key: row, style: { marginBottom: 8 } },
                    React.createElement("label", { style: c.fl }, row),
                    React.createElement("input", { style: c.fi, value: form.rows[row] || "", onChange: e => chRow(row, e.target.value), placeholder: "e.g. Fully Covered / EGP 5,000..." }))),
                React.createElement("div", { style: { marginBottom: 8 } },
                    React.createElement("label", { style: c.fl }, "Exclusions"),
                    React.createElement("textarea", { style: { ...c.fi, minHeight: 64, resize: "vertical" }, value: form.rows["Exclusions"] || "", onChange: e => chRow("Exclusions", e.target.value), placeholder: "List key exclusions..." })),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 } },
                    React.createElement("button", { style: c.cBtn, onClick: () => setScreen("list") }, "Cancel"),
                    React.createElement("button", { style: c.sv, onClick: savePlan }, "Save Plan")))));
}
function AddBenefitsModal({ acc, allIns, onSave, onClose }) {
    const assignedIds = new Set([acc.carrierId, acc.tpaIsCarrier ? acc.carrierId : acc.tpaId, acc.hmoId].filter(Boolean));
    const eligibleIns = allIns.filter(i => assignedIds.has(i.id));
    const allPlans = eligibleIns.flatMap(ins => (ins.plans || []).map(p => ({ ...p, insurer: ins.name, insId: ins.id })));
    const accPlans = acc.benefits?.plans || [];
    const [screen, setScreen] = useState("pick");
    const [editTailoredIdx, setEditTailoredIdx] = useState(null);
    const emptyTailored = { planName: "Tailored Plan", employeeCategory: "", networkTier: "", rows: {} };
    const [tailored, setTailored] = useState(emptyTailored);
    const chRow = (k, v) => setTailored(f => ({ ...f, rows: { ...f.rows, [k]: v } }));
    const MAX = 5;
    function isSelected(insId, planName) { return accPlans.some(p => p.insId === insId && p.planName === planName); }
    function togglePlan(plan) { const already = accPlans.findIndex(p => p.insId === plan.insId && p.planName === plan.planName); let next; if (already >= 0) {
        next = accPlans.filter((_, i) => i !== already);
    }
    else {
        if (accPlans.length >= MAX) {
            alert(`Maximum ${MAX} plans per account.`);
            return;
        }
        next = [...accPlans, { ...plan, addedAt: new Date().toISOString() }];
    } onSave({ ...(acc.benefits || {}), plans: next }); }
    function saveTailored() {
        if (!tailored.planName.trim())
            return;
        let next;
        if (editTailoredIdx !== null) {
            next = accPlans.map((p, i) => i === editTailoredIdx ? { ...p, ...tailored, insurer: "Tailored", updatedAt: new Date().toISOString() } : p);
        }
        else {
            if (accPlans.length >= MAX) {
                alert(`Maximum ${MAX} plans per account.`);
                return;
            }
            next = [...accPlans, { ...tailored, insurer: "Tailored", insId: "tailored_" + Date.now(), addedAt: new Date().toISOString() }];
        }
        onSave({ ...(acc.benefits || {}), plans: next });
        setScreen("pick");
        setEditTailoredIdx(null);
        setTailored(emptyTailored);
    }
    function openEditTailored(i) { const p = accPlans[i]; setTailored({ planName: p.planName || "", employeeCategory: p.employeeCategory || "", networkTier: p.networkTier || "", rows: { ...p.rows } }); setEditTailoredIdx(i); setScreen("tailored"); }
    function removeAccPlan(i) { onSave({ ...(acc.benefits || {}), plans: accPlans.filter((_, idx) => idx !== i) }); }
    const byIns = {};
    allPlans.forEach(p => { if (!byIns[p.insurer])
        byIns[p.insurer] = []; byIns[p.insurer].push(p); });
    const noAssignment = assignedIds.size === 0;
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 560, maxHeight: "90vh", overflowY: "auto" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } },
                screen === "tailored" && React.createElement("button", { style: { ...c.cBtn, padding: "4px 10px", fontSize: 11 }, onClick: () => { setScreen("pick"); setEditTailoredIdx(null); setTailored(emptyTailored); } }, "\u2190 Back"),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, screen === "tailored" ? editTailoredIdx !== null ? "Edit Tailored Plan" : "New Tailored Plan" : `Benefits — ${acc.name}`),
                    React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } },
                        accPlans.length,
                        "/",
                        MAX,
                        " plans \u00B7 ",
                        eligibleIns.length > 0 ? eligibleIns.map(i => i.name).join(", ") : "No insurer assigned")),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 18, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
            screen === "pick" && React.createElement(React.Fragment, null,
                noAssignment && React.createElement("div", { style: { background: "#fff8e6", border: "1.5px solid #d4880a44", borderRadius: 10, padding: "12px 14px", marginBottom: 14, fontSize: 12, color: "#92680a" } },
                    React.createElement(Ic, { name: "warning" }),
                    " No insurer is assigned to this account yet. Set a Risk Carrier or TPA in the account's Insurance Setup to see available plans. You can still add a Tailored Plan below."),
                accPlans.length > 0 && React.createElement("div", { style: { marginBottom: 14, background: "#e8faf8", border: "1px solid #0fa89033", borderRadius: 10, padding: "10px 13px" } },
                    React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#0fa890", textTransform: "uppercase", letterSpacing: .7, marginBottom: 8 } },
                        "Active Plans (",
                        accPlans.length,
                        "/",
                        MAX,
                        ")"),
                    React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, accPlans.map((p, i) => React.createElement("div", { key: i, style: { background: "#fff", border: "1.5px solid #0fa89044", borderRadius: 20, padding: "3px 10px 3px 12px", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600 } },
                        React.createElement("span", null, p.planName),
                        React.createElement("span", { style: { fontSize: 10, color: "#7a9ab5" } }, p.insurer),
                        p.insurer === "Tailored" && React.createElement("button", { onClick: () => openEditTailored(i), style: { background: "none", border: "none", color: "#9333ea", cursor: "pointer", fontSize: 11, fontWeight: 700, padding: "0 2px", lineHeight: 1 }, title: "Edit tailored plan" }, React.createElement(Ic, { name: "edit" })),
                        React.createElement("button", { onClick: () => removeAccPlan(i), style: { background: "none", border: "none", color: "#c0cdd8", cursor: "pointer", fontSize: 14, lineHeight: 1, padding: 0 } }, "\u00D7"))))),
                React.createElement("div", { style: { background: "linear-gradient(135deg,#f8f0ff,#e8f0fe)", border: "1.5px solid #9333ea44", borderRadius: 12, padding: "12px 15px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" } },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#9333ea", fontFamily: "'Clash Display',sans-serif" } },
                            React.createElement(Ic, { name: "palette" }),
                            " Tailored Plan"),
                        React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: 2 } }, "Build a custom plan with manual benefit entries")),
                    React.createElement("button", { style: { ...c.sv, background: "#9333ea", padding: "6px 14px", fontSize: 12 }, onClick: () => { setEditTailoredIdx(null); setTailored(emptyTailored); setScreen("tailored"); }, disabled: accPlans.length >= MAX }, accPlans.length >= MAX ? "Limit reached" : "+ Create")),
                !noAssignment && Object.keys(byIns).length === 0 && React.createElement("div", { style: { padding: "2rem", textAlign: "center", color: "#c0cdd8", fontSize: 13 } },
                    eligibleIns.map(i => i.name).join(", "),
                    " ",
                    eligibleIns.length === 1 ? "has" : "have",
                    " no plans yet.",
                    React.createElement("br", null),
                    "Go to ",
                    React.createElement("strong", null, "Insurers"),
                    " \u2192 find ",
                    eligibleIns.map(i => i.name).join(" / "),
                    " \u2192 click ",
                    React.createElement("strong", null, "Add Plan"),
                    "."),
                Object.entries(byIns).map(([insName, plans]) => React.createElement("div", { key: insName, style: { marginBottom: 14 } },
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#4285f4", textTransform: "uppercase", letterSpacing: .7, marginBottom: 7 } },
                        insName,
                        React.createElement("span", { style: { fontSize: 9, fontWeight: 400, color: "#a0b8cc", marginLeft: 6, textTransform: "none" } }, "assigned insurer")),
                    plans.map((plan, pi) => {
                        const sel = isSelected(plan.insId, plan.planName);
                        return React.createElement("div", { key: pi, onClick: () => accPlans.length < MAX || sel ? togglePlan(plan) : alert(`Maximum ${MAX} plans.`), style: { background: sel ? "#e8faf8" : "#f7fbff", border: `1.5px solid ${sel ? "#0fa890" : "#dde8f0"}`, borderRadius: 10, padding: "10px 13px", marginBottom: 7, cursor: "pointer", transition: "all .15s" }, onMouseEnter: e => { e.currentTarget.style.borderColor = sel ? "#0fa890" : "#4285f4"; }, onMouseLeave: e => { e.currentTarget.style.borderColor = sel ? "#0fa890" : "#dde8f0"; } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
                                React.createElement("div", null,
                                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: sel ? "#0fa890" : "#0f1c2e" } }, plan.planName),
                                    React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: 2, display: "flex", gap: 8, flexWrap: "wrap" } },
                                        BENEFIT_ROWS.filter(r => plan.rows?.[r]).slice(0, 2).map(r => React.createElement("span", { key: r },
                                            React.createElement("strong", { style: { color: "#c0cdd8" } },
                                                r,
                                                ":"),
                                            " ",
                                            (plan.rows[r] || "").slice(0, 30))),
                                        plan.networkTier && React.createElement("span", { style: { background: `${colorForTier(plan.networkTier, [plan.networkTier])}22`, color: colorForTier(plan.networkTier, [plan.networkTier]), borderRadius: 20, padding: "1px 7px", fontWeight: 700, fontSize: 10 } },
                                            React.createElement(Ic, { name: "map" }),
                                            " ",
                                            plan.networkTier))),
                                React.createElement("div", { style: { width: 22, height: 22, borderRadius: "50%", border: `2px solid ${sel ? "#0fa890" : "#dde8f0"}`, background: sel ? "#0fa890" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, sel && React.createElement("span", { style: { color: "#fff", fontSize: 13, lineHeight: 1 } }, "\u2713"))));
                    }))),
                React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 10 } },
                    React.createElement("button", { style: c.sv, onClick: onClose }, "Done"))),
            screen === "tailored" && React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 } },
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Plan Name"),
                        React.createElement("input", { style: c.fi, value: tailored.planName, onChange: e => setTailored(f => ({ ...f, planName: e.target.value })), placeholder: "e.g. Tailored \u2014 Executives" })),
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Employee Category"),
                        React.createElement("input", { style: c.fi, value: tailored.employeeCategory, onChange: e => setTailored(f => ({ ...f, employeeCategory: e.target.value })), placeholder: "e.g. Managers, All Staff..." }))),
                React.createElement("div", { style: { marginBottom: 12 } },
                    React.createElement("label", { style: c.fl },
                        "Network Tier ",
                        React.createElement("span", { style: { fontWeight: 400, color: "#c0cdd8" } }, "(type the tier name, e.g. \"Gold\", \"4N\")")),
                    React.createElement("input", { style: c.fi, value: tailored.networkTier || "", onChange: e => setTailored(f => ({ ...f, networkTier: e.target.value })), placeholder: "e.g. Gold, 4N, Premium..." })),
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#0fa890", marginBottom: 10, textTransform: "uppercase", letterSpacing: .7 } }, "Benefits"),
                BENEFIT_ROWS.map(row => React.createElement("div", { key: row, style: { marginBottom: 7 } },
                    React.createElement("label", { style: c.fl }, row),
                    React.createElement("input", { style: c.fi, value: tailored.rows[row] || "", onChange: e => chRow(row, e.target.value), placeholder: "e.g. Fully Covered / EGP 5,000..." }))),
                React.createElement("div", { style: { marginBottom: 8 } },
                    React.createElement("label", { style: c.fl }, "Exclusions"),
                    React.createElement("textarea", { style: { ...c.fi, minHeight: 60, resize: "vertical" }, value: tailored.rows["Exclusions"] || "", onChange: e => chRow("Exclusions", e.target.value), placeholder: "List key exclusions..." })),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 } },
                    React.createElement("button", { style: c.cBtn, onClick: () => { setScreen("pick"); setEditTailoredIdx(null); setTailored(emptyTailored); } }, "Cancel"),
                    React.createElement("button", { style: { ...c.sv, background: "#9333ea" }, onClick: saveTailored }, editTailoredIdx !== null ? "Update Plan" : "Save Tailored Plan")))));
}
const EXCLUSIONS_HEADER_HINTS = ["Exclusions", "EXCLUSIONS", "General Exclusions", "What is not covered", "Not covered", "الاستثناءات", "الإستثناءات", "الاستثنائات", "إستثناءات", "مستثنيات", "المستثنيات", "غير مغطى", "غير مغطاة", "لا تشمل الوثيقة", "لا تغطي الوثيقة", "حالات عدم الشمول", "الأخطار المستثناة"];
function reconstructPdfPageText(items, yTolerance = 2.5) { const withPos = items.filter(it => it.str !== '').map(it => ({ str: it.str, x: it.transform[4], y: it.transform[5], width: it.width || 0, dir: it.dir || 'ltr' })); const lines = []; for (const it of withPos) {
    let line = lines.find(l => Math.abs(l.y - it.y) <= yTolerance);
    if (!line) {
        line = { y: it.y, items: [] };
        lines.push(line);
    }
    line.items.push(it);
} lines.sort((a, b) => b.y - a.y); return lines.map(line => { const real = line.items.filter(it => it.width > 0); const zeroWidth = line.items.filter(it => it.width === 0); const rtlCount = real.filter(it => it.dir === 'rtl').length; const isRTL = rtlCount > real.length / 2; real.sort((a, b) => isRTL ? b.x - a.x : a.x - b.x); for (const zw of zeroWidth) {
    let bestIdx = 0, bestDist = Infinity;
    for (let i = 0; i < real.length; i++) {
        const d = Math.abs(real[i].x - zw.x);
        if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
        }
    }
    real.splice(bestIdx + 1, 0, zw);
} return real.map(it => it.str).join(''); }).join('\n'); }
async function extractPdfTextLocally(arrayBuffer) { if (!window.pdfjsLib)
    return { fullText: '', avgCharsPerPage: 0, numPages: 0 }; const doc = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise; let fullText = ''; for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    fullText += reconstructPdfPageText(content.items) + '\n\n';
} const density = fullText.trim().replace(/\s+/g, ' ').length / doc.numPages; return { fullText, avgCharsPerPage: density, numPages: doc.numPages }; }
function cleanForDisplay(s) { return s.replace(/\u0640/g, '').replace(/[ \t]+/g, ' '); }
function canonicalizeForMatch(s) { return s.replace(/\u0640/g, '').replace(/\s+/g, '').replace(/لا|ال/g, '\u0001'); }
function findHeadingLocally(fullText, hints) {
    const canonHaystackAr = canonicalizeForMatch(fullText);
    const haystackEn = fullText.replace(/\s+/g, '').toLowerCase();
    let bestIdx = -1, bestHint = null, bestIsLatin = false;
    for (const hint of hints) {
        const isLatin = /[A-Za-z]/.test(hint);
        const idx = isLatin ? haystackEn.indexOf(hint.replace(/\s+/g, '').toLowerCase()) : canonHaystackAr.indexOf(canonicalizeForMatch(hint));
        if (idx >= 0 && idx > bestIdx) {
            bestIdx = idx;
            bestHint = hint;
            bestIsLatin = isLatin;
        }
    }
    if (bestIdx === -1)
        return { found: false };
    let strippedCount = 0, origIdx = 0;
    for (let i = 0; i < fullText.length; i++) {
        if (fullText[i] === '\u0640' || /\s/.test(fullText[i]))
            continue;
        if (strippedCount === bestIdx) {
            origIdx = i;
            break;
        }
        strippedCount++;
    }
    return { found: true, hint: bestHint, origIdx };
}
const TOB_HEADER_HINTS = ["Table of Benefits", "Schedule of Benefits", "Benefits Table", "جدول المزايا", "جدول مواصفات الوثيقة", "التغطية التأمينية", "برنامج التأمين"];
const NEXT_SECTION_HINTS = ["المطالبات", "Claims", "Termination", "إنهاء الوثيقة", "سداد الأقساط", "الأحكام الخاصة", "المادة الرابعة عشر", "المادة الخامسة عشر"];
function extractSectionText(fullText, startIdx, maxLen = 6000) { let endIdx = fullText.length; for (const nh of NEXT_SECTION_HINTS) {
    const nIdx = fullText.indexOf(nh, startIdx + 30);
    if (nIdx > 0 && nIdx < endIdx)
        endIdx = nIdx;
} endIdx = Math.min(endIdx, startIdx + maxLen); return cleanForDisplay(fullText.slice(startIdx, endIdx)).trim(); }
function textQualityOk(text) { const nonWs = text.replace(/\s+/g, ''); if (nonWs.length < 20)
    return false; let recognized = 0; for (const ch of nonWs) {
    const cp = ch.codePointAt(0);
    const isArabic = cp >= 0x0600 && cp <= 0x06FF;
    const isLatin = cp >= 0x0041 && cp <= 0x007A;
    const isDigit = cp >= 0x0030 && cp <= 0x0039;
    const isCommonPunct = ".,;:!?()-/\"'%$&@#*+=_[]{}|\\<>°".includes(ch) || cp === 0x060C || cp === 0x061B || cp === 0x061F;
    if (isArabic || isLatin || isDigit || isCommonPunct)
        recognized++;
} return recognized / nonWs.length >= 0.85; }
function ContractUploadModal({ acc, onSaveExclusions, onSaveBenefits, onClose }) {
    const [files, setFiles] = useState([]);
    const [extracting, setExtracting] = useState(false);
    const [result, setResult] = useState(null);
    const [found, setFound] = useState(true);
    const [note, setNote] = useState("");
    const [tobPlans, setTobPlans] = useState(null);
    const [tobFound, setTobFound] = useState(true);
    const [tobNote, setTobNote] = useState("");
    const [apiKey, setApiKeyState] = useState(() => getClaudeKey());
    const [keyInput, setKeyInput] = useState("");
    const [usedLocal, setUsedLocal] = useState(false);
    const [localStatus, setLocalStatus] = useState("");
    const [tobRawText, setTobRawText] = useState("");
    const [structuring, setStructuring] = useState(false);
    const fileRef = useRef(null);
    const existingCount = acc.benefits?.plans?.length || 0;
    const roomLeft = Math.max(0, 5 - existingCount);
    function saveKey() { const k = keyInput.trim(); if (!k)
        return; setClaudeKey(k); setApiKeyState(k); setKeyInput(""); }
    const MAX_RAW_MB_PER_FILE = 20;
    const MAX_RAW_MB_TOTAL = 28;
    function updatePlanField(idx, field, val) { setTobPlans(ps => ps.map((p, i) => i === idx ? { ...p, [field]: val } : p)); }
    function updatePlanRow(idx, row, val) { setTobPlans(ps => ps.map((p, i) => i === idx ? { ...p, rows: { ...p.rows, [row]: val } } : p)); }
    function removePlan(idx) { setTobPlans(ps => ps.filter((_, i) => i !== idx)); }
    async function structureTOBWithAI() {
        if (!tobRawText)
            return;
        setStructuring(true);
        try {
            const prompt = `Here is the Table of Benefits / benefits schedule text extracted from an insurance contract. It's organized in columns by tier/category (e.g. "الفئة الأولى/الثانية/الثالثة", "Class 1/2/3", "Elite/Gold/Silver"). Treat EACH column as a separate plan/tier.

For each tier found (max 5), map its benefit lines onto this EXACT fixed set of row names (use these exact strings as JSON keys, in English, regardless of source language):
${JSON.stringify(BENEFIT_ROWS)}

Mapping guidance (source is often Arabic — map by meaning):
- "Life Insurance" ← وفاة/تأمين على الحياة/GLI
- "Medical Ceiling" ← الحد الأقصى السنوي/إجمالي مبلغ التأمين
- "In-Patient Benefits" ← العلاج الداخلي/الإقامة بالمستشفى
- "Network" ← الشبكة الطبية/شبكة مقدمي الخدمة
- "Accommodation" ← نوع الغرفة/الإقامة اليومية
- "Intensive Care Unit" ← الرعاية المركزة
- "Out-Patient Benefits" ← العلاج بالعيادات الخارجية
- "Doctor Visits" ← الكشف الطبي/زيارات الأطباء
- "Labs / Radiology / Physiotherapy" ← التحاليل الطبية والأشعة/العلاج الطبيعي
- "Medications" ← الأدوية الموصوفة
- "Refunds (Outside Network)" ← نسبة الاسترداد خارج الشبكة
- "Dental" ← علاج الأسنان
- "Optical" ← البصريات/النظارات
- "Pre-existing & Chronic" ← الأمراض المزمنة والسابقة على التعاقد
- "Maternity" ← الحمل والولادة

Leave a row empty ("") if not present for that tier — don't guess numbers.

TEXT:
"""
${tobRawText.slice(0, 8000)}
"""

Return ONLY a JSON object, no markdown, no preamble:
{"plans":[{"planName":"...","employeeCategory":"","networkTier":"","rows":{"Life Insurance":"...", "...": "..."}}]}`;
            const data = await callClaudeAPI([{ type: "text", text: prompt }], 4000);
            const txt = (data.content || []).map(b => b.text || "").join("");
            const clean = txt.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(clean);
            setTobPlans((parsed.plans || []).map(p => ({ planName: p.planName || "Extracted Plan", employeeCategory: p.employeeCategory || "", networkTier: p.networkTier || "", rows: BENEFIT_ROWS.reduce((acc, row) => ({ ...acc, [row]: p.rows?.[row] || "" }), {}) })));
            setTobNote("Structured from the locally-extracted text via AI.");
        }
        catch (err) {
            if (err?.code === "NO_KEY") {
                setApiKeyState("");
                setTobNote("Add your Anthropic API key above to structure this into rows.");
            }
            else
                setTobNote("Structuring failed: " + (err?.message || "unknown error") + ". The raw text is still available above.");
        }
        setStructuring(false);
    }
    async function handleFiles(e) {
        const list = Array.from(e.target.files || []);
        if (!list.length)
            return;
        setFiles(list.map(f => f.name));
        setResult(null);
        setNote("");
        setTobPlans(null);
        setTobNote("");
        setTobRawText("");
        setUsedLocal(false);
        setLocalStatus("");
        const oversized = list.filter(f => f.size > MAX_RAW_MB_PER_FILE * 1024 * 1024);
        const totalMB = list.reduce((s, f) => s + f.size, 0) / (1024 * 1024);
        if (oversized.length || totalMB > MAX_RAW_MB_TOTAL) {
            setFound(false);
            setResult("");
            const names = oversized.map(f => `${f.name} (${(f.size / 1024 / 1024).toFixed(1)}MB)`).join(", ");
            setNote((oversized.length ? `${names} ${oversized.length > 1 ? "are" : "is"} too large — each file needs to be under ${MAX_RAW_MB_PER_FILE}MB.` : `These files total ${totalMB.toFixed(1)}MB — combined, uploads need to stay under ${MAX_RAW_MB_TOTAL}MB.`) + " Large scanned PDFs (photographed pages, high-res stamps) blow past this fast. Try: compressing the PDF, uploading only the pages with the Exclusions article, or splitting it into smaller files and uploading them one at a time.");
            return;
        }
        setExtracting(true);
        setLocalStatus("Checking for a text layer...");
        try {
            const buffers = await Promise.all(list.map(f => f.arrayBuffer()));
            const localResults = await Promise.all(buffers.map(buf => extractPdfTextLocally(buf)));
            const totalChars = localResults.reduce((s, r) => s + r.fullText.trim().replace(/\s+/g, ' ').length, 0);
            const totalPages = localResults.reduce((s, r) => s + r.numPages, 0) || 1;
            const avgDensity = totalChars / totalPages;
            const LOCAL_VIABLE_THRESHOLD = 250;
            if (avgDensity >= LOCAL_VIABLE_THRESHOLD) {
                const combinedText = localResults.map(r => r.fullText).join('\n\n===FILE BREAK===\n\n');
                const exclMatch = findHeadingLocally(combinedText, EXCLUSIONS_HEADER_HINTS);
                if (exclMatch.found) {
                    const exclText = extractSectionText(combinedText, exclMatch.origIdx);
                    if (textQualityOk(exclText)) {
                        const tobMatch = findHeadingLocally(combinedText, TOB_HEADER_HINTS);
                        setFound(true);
                        setResult(exclText);
                        setNote(`Extracted locally from the PDF's text layer — free, no AI used. (Matched "${exclMatch.hint}")`);
                        setUsedLocal(true);
                        if (tobMatch.found) {
                            const tobText = extractSectionText(combinedText, tobMatch.origIdx);
                            if (textQualityOk(tobText)) {
                                setTobRawText(tobText);
                                setTobFound(true);
                                setTobNote(`Benefits section found locally as raw text (matched "${tobMatch.hint}"). Click "Structure into Benefits Tab" below to organize it into rows — that one step uses AI, everything else here was free.`);
                            }
                            else {
                                setTobFound(false);
                                setTobNote("Found a benefits section locally, but the extracted text looked garbled (a font-encoding issue in this PDF) — use the account's normal contract upload with an API key for a reliable read of the benefits table.");
                            }
                        }
                        else {
                            setTobFound(false);
                            setTobNote("No benefits table heading found locally in this document — it may be in a separate file, or try uploading the Policy Schedule alongside the General Terms.");
                        }
                        setExtracting(false);
                        return;
                    }
                    setLocalStatus(`Text layer found and a heading matched, but the extracted text looks garbled (a font-encoding issue in this specific PDF) — falling back to the Anthropic API for a reliable read.`);
                }
                else {
                    setLocalStatus(`Text layer found, but couldn't confidently locate the Exclusions heading locally — falling back to the Anthropic API for a reliable read.`);
                }
            }
            else {
                setLocalStatus("This looks like a scanned document (no usable text layer) — needs the Anthropic API to read it.");
            }
        }
        catch (localErr) {
            setLocalStatus("Local text-layer check failed — falling back to the Anthropic API.");
        }
        try {
            const docs = await Promise.all(list.map(f => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res({ type: "document", source: { type: "base64", media_type: "application/pdf", data: r.result.split(",")[1] } }); r.onerror = () => rej(new Error("Read failed: " + f.name)); r.readAsDataURL(f); })));
            const prompt = `You are reading one or more insurance policy PDFs (general terms, policy schedule, benefits/rate schedule, and/or endorsements — they may belong together as one contract). Some pages may be scanned images, rotated, stamped, or handwritten with no digital text layer — read them visually page by page like a human would.

You have TWO tasks. Search every page of every document for BOTH of these sections — they are usually in different places in the document.

═══ TASK 1: EXCLUSIONS ═══
Find the clause listing what the policy does NOT cover. Look for a header matching any of these (carriers phrase it differently per language/numbering — treat all as the same section, and recognize close variants/misspellings too):
${EXCLUSIONS_HEADER_HINTS.map(h => "- " + h).join("\n")}
It is very often a numbered article inside "General Conditions / الأحكام العامة" or "Special Conditions / الأحكام الخاصة", commonly phrased "المادة ال...: الاستثناءات" (e.g. "المادة الثالثة عشر: الاستثناءات"), or simply "Exclusions" in English. It may span multiple pages with many numbered sub-items — capture ALL of them.
If there is no dedicated exclusions article anywhere (e.g. only a benefits table with no standalone exclusions clause), set "found" to false rather than inventing one.

═══ TASK 2: TABLE OF BENEFITS (TOB) / جدول المزايا ═══
Find the benefits/coverage schedule — the table listing what IS covered and at what limit (e.g. "جدول مواصفات الوثيقة", "جدول المزايا", "التغطية التأمينية", "Schedule of Benefits", "Benefits Table", "برنامج التأمين"). This table is usually organized in columns by tier/category (e.g. "الفئة الأولى/الثانية/الثالثة", "Class 1/2/3", "Elite/Gold/Silver", "Employee/Dependent"). Treat EACH column as a separate plan/tier, and extract every cell.

For each column/tier found (max 5), map its benefit lines onto this EXACT fixed set of row names (use these exact strings as JSON keys, in English, regardless of the source language — do not invent new row names, do not rename them):
${JSON.stringify(BENEFIT_ROWS)}

Mapping guidance (source docs are often Arabic — map by meaning, not literal words):
- "Life Insurance" ← وفاة/تأمين على الحياة/GLI/تغطية الوفاة
- "Medical Ceiling" ← الحد الأقصى السنوي/إجمالي مبلغ التأمين/الحد الأقصى للتغطية التأمينية
- "In-Patient Benefits" ← العلاج الداخلي/الإقامة بالمستشفى/تكلفة العلاج داخل المستشفى
- "Network" ← الشبكة الطبية/شبكة مقدمي الخدمة/اسم الشبكة (e.g. "Elite/Gold/كليوباترا")
- "Accommodation" ← نوع الغرفة/الإقامة اليومية (e.g. "غرفة مفردة")
- "Intensive Care Unit" ← الرعاية المركزة/العناية المركزة
- "Out-Patient Benefits" ← العلاج بالعيادات الخارجية/الحد الأقصى للعلاج الخارجي
- "Doctor Visits" ← الكشف الطبي/زيارات الأطباء/تكلفة الكشف
- "Labs / Radiology / Physiotherapy" ← التحاليل الطبية والأشعة/العلاج الطبيعي
- "Medications" ← الأدوية الموصوفة
- "Refunds (Outside Network)" ← نسبة الاسترداد خارج الشبكة/التعويض خارج الشبكة
- "Dental" ← علاج الأسنان
- "Optical" ← البصريات/النظارات
- "Pre-existing & Chronic" ← الأمراض المزمنة والسابقة على التعاقد
- "Maternity" ← الحمل والولادة

For "planName" use the tier/category label as written (e.g. "الفئة الأولى", "Elite", "Class 1"). For "employeeCategory" use "Employee"/"Dependent"/"" if the table separates them, else "". For "networkTier" put the network/hospital-tier name if distinct from planName, else "". Combine multiple sub-values under one row with "; " if several line items map to the same row. Leave a row's value empty ("") if genuinely not present for that tier — do not guess numbers. If no benefits table exists at all in the document(s), set "tobFound" to false and leave "plans" as an empty array.

Return ONLY a JSON object, no markdown, no preamble, no code fences:
{"found":true|false,"exclusions":"full exclusions text, translated to English if source is Arabic, numbered list preserved with line breaks","sourceNote":"e.g. 'Article 13, page 9-10' or 'Not found'","tobFound":true|false,"tobNote":"e.g. '3 tiers found, page 2' or 'Not found — no benefits table in this document'","plans":[{"planName":"...","employeeCategory":"...","networkTier":"...","rows":{"Life Insurance":"...", "...": "..."}}]}`;
            const data = await callClaudeAPI([...docs, { type: "text", text: prompt }], 8000);
            const txt = (data.content || []).map(b => b.text || "").join("");
            const clean = txt.replace(/```json|```/g, "").trim();
            let parsed;
            try {
                parsed = JSON.parse(clean);
            }
            catch {
                throw new Error("Got a response but couldn't parse it as JSON — the model may have replied in an unexpected format. Try again.");
            }
            setFound(parsed.found !== false);
            setResult(parsed.exclusions || "");
            setNote((localStatus ? localStatus + " " : "") + (parsed.sourceNote || ""));
            setTobFound(parsed.tobFound !== false);
            setTobNote(parsed.tobNote || "");
            setTobPlans((parsed.plans || []).map(p => ({ planName: p.planName || "Extracted Plan", employeeCategory: p.employeeCategory || "", networkTier: p.networkTier || "", rows: BENEFIT_ROWS.reduce((acc, row) => ({ ...acc, [row]: p.rows?.[row] || "" }), {}) })));
        }
        catch (err) {
            setFound(false);
            setResult("");
            setTobFound(false);
            setTobPlans(null);
            if (err?.code === "NO_KEY") {
                setApiKeyState("");
                setNote("Add your Anthropic API key above to enable extraction, then re-upload.");
            }
            else if (err?.code === "INVALID_KEY") {
                setApiKeyState("");
                setNote(err.message);
            }
            else {
                setNote(err?.message || "Extraction failed for an unknown reason. You can paste exclusions manually below, or try re-uploading.");
            }
        }
        setExtracting(false);
    }
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: tobPlans && tobPlans.length ? 680 : 520, maxHeight: "90vh", overflowY: "auto" } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 4, fontFamily: "'Clash Display',sans-serif" } },
                React.createElement(Ic, { name: "document" }),
                " Upload Contract"),
            React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginBottom: 16 } },
                acc.name,
                " \u2014 extracts Exclusions + Table of Benefits \u00B7 scanned pages OK \u00B7 Arabic or English"),
            !apiKey && React.createElement("div", { style: { background: "#f0f6ff", border: "1px solid #c7dcff", borderRadius: 10, padding: "10px 12px", marginBottom: 14, fontSize: 11, color: "#4a6080" } },
                "\u2139\uFE0F Most contracts with a real text layer extract for free automatically. An Anthropic API key is only needed as a fallback for scanned documents or ones local search can't confidently parse \u2014 you'll be prompted for one then. Get one anytime at ",
                React.createElement("a", { href: "https://console.anthropic.com/settings/keys", target: "_blank", rel: "noopener", style: { color: "#4285f4" } }, "console.anthropic.com/settings/keys"),
                ".",
                React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 8 } },
                    React.createElement("input", { type: "password", value: keyInput, onChange: e => setKeyInput(e.target.value), placeholder: "sk-ant-... (optional, add now or when prompted)", style: { ...c.fi, flex: 1, fontSize: 12, marginBottom: 0 } }),
                    React.createElement("button", { style: { ...c.sv, fontSize: 12, padding: "6px 12px" }, onClick: saveKey, disabled: !keyInput.trim() }, "Save"))),
            React.createElement("div", { style: { background: "#f0f6ff", border: "1.5px dashed #4285f444", borderRadius: 10, padding: "14px", marginBottom: 14, textAlign: "center" } },
                React.createElement("button", { style: { ...c.sv, background: "#4285f4", fontSize: 13, padding: "9px 20px" }, onClick: () => fileRef.current?.click(), disabled: extracting }, extracting ? "Reading contract..." : "Upload PDF Contract(s)"),
                files.length > 0 && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: 8 } }, files.map(n => React.createElement("div", { key: n },
                    React.createElement(Ic, { name: "document" }),
                    " ",
                    n))),
                React.createElement("input", { ref: fileRef, type: "file", accept: ".pdf", multiple: true, style: { display: "none" }, onChange: handleFiles }),
                React.createElement("div", { style: { fontSize: 10, color: "#a8bccf", marginTop: 6 } }, "Tip: upload the General Terms + Policy Schedule together if they're separate files"),
                extracting && React.createElement("div", { style: { marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 } },
                    React.createElement("div", { style: { width: 16, height: 16, borderRadius: "50%", border: "3px solid #e8f0fe", borderTopColor: "#4285f4", animation: "spinSlow .8s linear infinite" } }),
                    React.createElement("span", { style: { fontSize: 11, color: "#4285f4" } }, localStatus || "Scanning for Exclusions + Table of Benefits..."))),
            result !== null && React.createElement("div", { style: { marginBottom: 20 } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } },
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#0f1c2e", textTransform: "uppercase", letterSpacing: .5 } }, "Exclusions"),
                    usedLocal && React.createElement("span", { style: { fontSize: 9, fontWeight: 700, color: "#0fa890", background: "#e8faf8", padding: "2px 8px", borderRadius: 10 } }, "\u2713 FREE \u2014 EXTRACTED LOCALLY")),
                !found && React.createElement("div", { style: { fontSize: 11, color: "#c77800", background: "#fff8ec", border: "1px solid #ffe0a3", borderRadius: 8, padding: "6px 10px", marginBottom: 8 } },
                    React.createElement(Ic, { name: "warning" }),
                    " No dedicated exclusions article was found \u2014 check the note below, or edit/paste manually."),
                note && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginBottom: 8, fontStyle: "italic" } }, note),
                React.createElement("textarea", { style: { ...c.fi, minHeight: 120, resize: "vertical", fontSize: 12, whiteSpace: "pre-wrap" }, value: result, onChange: e => setResult(e.target.value) }),
                React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: 6, marginBottom: 6 } }, "You can edit before saving."),
                React.createElement("div", { style: { display: "flex", justifyContent: "flex-end" } },
                    React.createElement("button", { style: c.sv, onClick: () => onSaveExclusions(result) }, "Save to Exclusions Tab"))),
            tobRawText && tobPlans === null && React.createElement("div", { style: { marginBottom: 20 } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } },
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#0f1c2e", textTransform: "uppercase", letterSpacing: .5 } }, "Table of Benefits \u2014 Raw Text (Free)")),
                tobNote && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginBottom: 8, fontStyle: "italic" } }, tobNote),
                React.createElement("textarea", { readOnly: true, style: { ...c.fi, minHeight: 140, resize: "vertical", fontSize: 11, whiteSpace: "pre-wrap", background: "#f7fbff", color: "#4a6080" }, value: tobRawText }),
                React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 8 } },
                    React.createElement("button", { style: { ...c.sv, background: "#9333ea" }, onClick: structureTOBWithAI, disabled: structuring }, structuring ? "Structuring..." : "✨ Structure into Benefits Tab (uses AI)"))),
            tobPlans !== null && React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#0f1c2e", marginBottom: 8, textTransform: "uppercase", letterSpacing: .5 } }, "Table of Benefits"),
                !tobFound && React.createElement("div", { style: { fontSize: 11, color: "#c77800", background: "#fff8ec", border: "1px solid #ffe0a3", borderRadius: 8, padding: "6px 10px", marginBottom: 8 } },
                    React.createElement(Ic, { name: "warning" }),
                    " No benefits table was found in the uploaded document(s)."),
                tobNote && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginBottom: 8, fontStyle: "italic" } }, tobNote),
                tobPlans.length > 0 && React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginBottom: 10 } },
                        tobPlans.length,
                        " tier(s) extracted \u00B7 ",
                        roomLeft,
                        " of 5 slot(s) free on this account's Benefits tab \u2014 extras beyond that won't be saved."),
                    React.createElement("div", { style: { display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 } }, tobPlans.map((p, idx) => React.createElement("div", { key: idx, style: { minWidth: 230, flex: "0 0 auto", background: "#f7fbff", border: "1.5px solid #dde8f0", borderRadius: 10, padding: "10px 12px", position: "relative" } },
                        React.createElement("button", { onClick: () => removePlan(idx), title: "Remove this tier", style: { position: "absolute", top: 6, right: 8, background: "none", border: "none", color: "#c0cdd8", cursor: "pointer", fontSize: 14, lineHeight: 1 } }, "\u00D7"),
                        React.createElement("input", { style: { ...c.fi, fontSize: 12, fontWeight: 700, marginBottom: 6 }, value: p.planName, onChange: e => updatePlanField(idx, "planName", e.target.value), placeholder: "Plan / Tier name" }),
                        React.createElement("input", { style: { ...c.fi, fontSize: 11, marginBottom: 6 }, value: p.employeeCategory, onChange: e => updatePlanField(idx, "employeeCategory", e.target.value), placeholder: "Employee category (optional)" }),
                        React.createElement("input", { style: { ...c.fi, fontSize: 11, marginBottom: 8 }, value: p.networkTier, onChange: e => updatePlanField(idx, "networkTier", e.target.value), placeholder: "Network tier (optional)" }),
                        BENEFIT_ROWS.map(row => React.createElement("div", { key: row, style: { marginBottom: 5 } },
                            React.createElement("label", { style: { ...c.fl, fontSize: 9 } }, row),
                            React.createElement("input", { style: { ...c.fi, fontSize: 10, padding: "4px 7px" }, value: p.rows[row], onChange: e => updatePlanRow(idx, row, e.target.value) })))))),
                    React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 10 } },
                        React.createElement("button", { style: { ...c.sv, background: "#0fa890" }, onClick: () => onSaveBenefits(tobPlans), disabled: roomLeft === 0 }, roomLeft === 0 ? "Benefits tab full (5/5)" : `Save ${Math.min(tobPlans.length, roomLeft)} Plan(s) to Benefits Tab`)))),
            React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 16 } },
                React.createElement("button", { style: c.cBtn, onClick: onClose }, "Close"))));
}
function InsEditModal({ ins, onSave, onClose }) {
    const initPocs = () => { const existing = ins.pocs || []; const legacy = ins.poc?.name ? [ins.poc] : []; const base = [...existing, ...legacy].slice(0, 3); while (base.length < 3)
        base.push({ name: "", title: "", phone: "", email: "" }); return base; };
    const [f, setF] = useState({ name: ins.name || "", logo: ins.logo || "", url: ins.url || "", portalUrl: ins.portalUrl || "", types: ins.types || [] });
    const [pocs, setPocs] = useState(initPocs());
    const ch = (k, v) => setF(p => ({ ...p, [k]: v }));
    const togType = v => ch("types", f.types.includes(v) ? f.types.filter(x => x !== v) : [...f.types, v]);
    const chPoc = (i, k, v) => setPocs(ps => ps.map((p, idx) => idx === i ? { ...p, [k]: v } : p));
    const activePocs = pocs.filter(p => p.name || p.email || p.phone);
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 500 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 14, fontFamily: "'Clash Display',sans-serif" } }, "Edit Insurer"),
            [["Name", "name", "text"], ["Logo URL", "logo", "url"], ["Website", "url", "url"], ["Portal Link", "portalUrl", "url"]].map(([lb, k, t]) => React.createElement("div", { key: k },
                React.createElement("label", { style: c.fl }, lb),
                React.createElement("input", { style: c.fi, type: t, value: f[k] || "", onChange: e => ch(k, e.target.value) }))),
            React.createElement("label", { style: c.fl }, "Type(s)"),
            React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 12 } }, [["carrier", "Risk Carrier"], ["tpa", "TPA"], ["hmo", "HMO"]].map(([v, lb]) => React.createElement("label", { key: v, style: { display: "flex", alignItems: "center", gap: 5, fontSize: 13, cursor: "pointer" } },
                React.createElement("input", { type: "checkbox", checked: f.types.includes(v), onChange: () => togType(v), style: { accentColor: "#0fa890" } }),
                lb))),
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#4285f4", margin: "10px 0 8px", textTransform: "uppercase", letterSpacing: .7, borderTop: "1px solid #edf2f7", paddingTop: 10 } }, "Points of Contact (up to 3)"),
            pocs.map((poc, i) => React.createElement("div", { key: i, style: { background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 10, padding: "10px 12px", marginBottom: 10 } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#4285f4", textTransform: "uppercase", letterSpacing: .5, marginBottom: 8 } },
                    "Contact ",
                    i + 1,
                    i === 0 ? " (Primary)" : ""),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, [["Name", "name", "text"], ["Title", "title", "text"], ["Phone", "phone", "text"], ["Email", "email", "email"]].map(([lb, k, t]) => React.createElement("div", { key: k },
                    React.createElement("label", { style: c.fl }, lb),
                    React.createElement("input", { style: { ...c.fi, marginBottom: 4 }, type: t, value: poc[k] || "", onChange: e => chPoc(i, k, e.target.value) })))))),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 10 } },
                React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                React.createElement("button", { style: c.sv, onClick: () => onSave({ ...ins, ...f, pocs: pocs, poc: pocs[0] || {} }) }, "Save"))));
}
function isValidWhatsAppGroupUrl(url) {
    return /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+\/?$/.test((url || "").trim());
}
function HospitalModal({ hospital, allIns, onSave, onClose }) {
    const [f, setF] = useState(() => ({ id: hospital.id, name: hospital.name || "", logoUrl: hospital.logoUrl || "", url: hospital.url || "", whatsappGroupUrl: hospital.whatsappGroupUrl || "", salesAgents: (hospital.salesAgents || []).map(sa => ({ ...sa, tpaIds: sa.tpaIds || [] })) }));
    const tpas = allIns.filter(i => i.types.includes("tpa"));
    const ch = (k, v) => setF(p => ({ ...p, [k]: v }));
    function addAgent() { if (f.salesAgents.length >= 7)
        return; setF(p => ({ ...p, salesAgents: [...p.salesAgents, { id: "sa_" + Date.now(), name: "", phone: "", email: "", tpaIds: [] }] })); }
    function updateAgent(idx, key, val) { setF(p => ({ ...p, salesAgents: p.salesAgents.map((sa, i) => i === idx ? { ...sa, [key]: val } : sa) })); }
    function toggleAgentTpa(idx, tpaId) { setF(p => ({ ...p, salesAgents: p.salesAgents.map((sa, i) => { if (i !== idx)
            return sa; const has = sa.tpaIds.includes(tpaId); return { ...sa, tpaIds: has ? sa.tpaIds.filter(x => x !== tpaId) : [...sa.tpaIds, tpaId] }; }) })); }
    function removeAgent(idx) { setF(p => ({ ...p, salesAgents: p.salesAgents.filter((_, i) => i !== idx) })); }
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 620, maxHeight: "90vh", overflowY: "auto" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 } },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, hospital.name ? "Edit Hospital" : "Add Hospital"),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
            React.createElement("label", { style: c.fl }, "Hospital Name"),
            React.createElement("input", { style: c.fi, value: f.name, onChange: e => ch("name", e.target.value) }),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Logo URL"),
                    React.createElement("input", { style: c.fi, value: f.logoUrl, onChange: e => ch("logoUrl", e.target.value) })),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Website"),
                    React.createElement("input", { style: c.fi, value: f.url, onChange: e => ch("url", e.target.value) }))),
            "}",
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", margin: "14px 0 8px", borderTop: "1px solid #edf2f7", paddingTop: 12 } },
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: .8 } },
                    "Sales Agents (",
                    f.salesAgents.length,
                    "/7)"),
                React.createElement("button", { style: { ...c.aBtn, fontSize: 11 }, onClick: addAgent, disabled: f.salesAgents.length >= 7 }, "+ Add Agent")),
            f.salesAgents.length === 0 && React.createElement("div", { style: { fontSize: 12, color: "#c0cdd8", textAlign: "center", padding: "1rem" } }, "No sales agents yet."),
            f.salesAgents.map((sa, idx) => React.createElement("div", { key: sa.id, style: { background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 10, padding: "10px 12px", marginBottom: 8 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } },
                    React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#4285f4", textTransform: "uppercase" } },
                        "Agent ",
                        idx + 1),
                    React.createElement("button", { onClick: () => removeAgent(idx), style: { background: "none", border: "none", color: "#e0392e", cursor: "pointer", fontSize: 12 } }, "Remove")),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 } },
                    React.createElement("input", { style: { ...c.fi, marginBottom: 0 }, placeholder: "Name", value: sa.name, onChange: e => updateAgent(idx, "name", e.target.value) }),
                    React.createElement("input", { style: { ...c.fi, marginBottom: 0 }, placeholder: "Phone", value: sa.phone, onChange: e => updateAgent(idx, "phone", e.target.value) }),
                    React.createElement("input", { style: { ...c.fi, marginBottom: 0 }, placeholder: "Email", value: sa.email, onChange: e => updateAgent(idx, "email", e.target.value) })),
                React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", fontWeight: 700, marginBottom: 4 } }, "Assigned TPAs (tap to toggle, multiple allowed)"),
                React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } }, tpas.map(t => {
                    const checked = sa.tpaIds.includes(t.id);
                    return React.createElement("button", { key: t.id, type: "button", onClick: () => toggleAgentTpa(idx, t.id), style: { display: "flex", alignItems: "center", gap: 4, background: checked ? "#e8f0fe" : "#fff", border: `1px solid ${checked ? "#4285f444" : "#dde8f0"}`, borderRadius: 20, padding: "3px 9px", fontSize: 11, cursor: "pointer", color: checked ? "#4285f4" : "#7a9ab5", fontWeight: checked ? 700 : 500 } },
                        checked ? "✓ " : "",
                        t.name);
                })))),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 14 } },
                React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                React.createElement("button", { style: c.sv, disabled: !!f.whatsappGroupUrl && !/^https?:\/\//i.test(f.whatsappGroupUrl), onClick: () => onSave(f) }, "Save"))));
}
function MeetingCreateModal({ unifiedPocs, defaultDate, onCreate, onClose }) {
    const [name, setName] = useState("");
    const [topic, setTopic] = useState("");
    const [date, setDate] = useState(defaultDate || toDay());
    const [time, setTime] = useState("");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const filtered = unifiedPocs.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.source.toLowerCase().includes(search.toLowerCase()));
    function toggle(key) { setSelected(s => s.includes(key) ? s.filter(x => x !== key) : [...s, key]); }
    function submit() { if (!name.trim())
        return; onCreate({ name: name.trim(), topic: topic.trim(), date, time, participantKeys: selected }); }
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 520, maxHeight: "90vh", overflowY: "auto" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 } },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } },
                    React.createElement(Ic, { name: "calendar" }),
                    " Add Meeting"),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
            React.createElement("label", { style: c.fl }, "Meeting Name"),
            React.createElement("input", { style: c.fi, value: name, onChange: e => setName(e.target.value), placeholder: "e.g. AXA Renewal Discussion" }),
            React.createElement("label", { style: c.fl }, "Topic"),
            React.createElement("input", { style: c.fi, value: topic, onChange: e => setTopic(e.target.value), placeholder: "What's this meeting about?" }),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Date"),
                    React.createElement("input", { type: "date", style: c.fi, value: date, onChange: e => setDate(e.target.value) })),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Time"),
                    React.createElement("input", { type: "time", style: c.fi, value: time, onChange: e => setTime(e.target.value) }))),
            React.createElement("label", { style: c.fl },
                "Participants (",
                selected.length,
                " selected)"),
            React.createElement("input", { style: { ...c.fi, marginBottom: 8 }, placeholder: "Search contacts (accounts, insurers, hospitals)...", value: search, onChange: e => setSearch(e.target.value) }),
            React.createElement("div", { style: { maxHeight: 220, overflowY: "auto", border: "1px solid #edf2f7", borderRadius: 10, padding: 6 } },
                filtered.length === 0 && React.createElement("div", { style: { padding: "1rem", textAlign: "center", color: "#c0cdd8", fontSize: 12 } }, "No contacts found."),
                filtered.map(p => {
                    const checked = selected.includes(p.key);
                    return React.createElement("div", { key: p.key, onClick: () => toggle(p.key), style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 8, cursor: "pointer", background: checked ? "#e8f0fe" : "transparent" } },
                        React.createElement("input", { type: "checkbox", checked: checked, readOnly: true, style: { accentColor: "#4285f4" } }),
                        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                            React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: "#0f1c2e" } }, p.name),
                            React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5" } },
                                p.source,
                                p.email ? " · " + p.email : "")));
                })),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 14 } },
                React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                React.createElement("button", { style: c.sv, onClick: submit, disabled: !name.trim() }, "Create Meeting"))));
}
const AR_INDIC_DIGITS = { "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9" };
const AR_BRAND_FIXES = [[/ليبانو\s*سويس\s*تكافل/g, "Libano Suisse Takaful"], [/ليبانو\s*سويس/g, "Libano Suisse Takaful"], [/وايزلي\s*انشور/g, "Wisely Insure"], [/وايزلي\s*إنشور/g, "Wisely Insure"], [/وايزلى\s*انشور/g, "Wisely Insure"], [/كاف\s*انشورانس/g, "KAF Insurance"], [/كاف\s*للتأمين/g, "KAF Insurance"], [/جلوب\s*ميد/g, "GlobeMed"], [/جلوبميد/g, "GlobeMed"], [/نكست\s*كير/g, "NextCare"], [/نيكست\s*كير/g, "NextCare"], [/ميد\s*مارك/g, "Medmark"], [/مدمارك/g, "Medmark"], [/ميت\s*لايف/g, "MetLife"], [/ميتلايف/g, "MetLife"], [/جي\s*آي\s*جي/g, "GIG"], [/جي\s*اي\s*جي/g, "GIG"], [/سا?روا\s*لايف/g, "Sarwa Life"], [/سيروا\s*لايف/g, "Sarwa Life"], [/سروة\s*لايف/g, "Sarwa Life"], [/إيه\s*إكس\s*إيه/g, "AXA"], [/اي\s*اكس\s*اي/g, "AXA"], [/الاينز/g, "Allianz"], [/اليانز/g, "Allianz"], [/بوبا/g, "Bupa"], [/ميدنت/g, "MedNet"], [/ميد\s*نت/g, "MedNet"], [/كلونكر/g, "ClonKR"]];
const AR_TERM_FIXES = [[/إكسبشن|اكسبشن/g, "exception"], [/إندورسمنت|اندورسمنت|اندورسمنتس/g, "endorsement"], [/بريميوم|بريميم/g, "premium"], [/كلايم|كليم/g, "claim"], [/إنفويس|انفويس/g, "invoice"], [/كفريدج|كفرج|كفرِج/g, "coverage"], [/نيتورك|نتورك/g, "network"], [/ريإمبرسمنت|ريامبرسمنت|ري إمبرسمنت/g, "reimbursement"], [/بريكداون|بريك داون/g, "breakdown"], [/توب\s*أب|توب\s*اب/g, "top-up"], [/أد\s*أون|اد\s*اون/g, "add-on"], [/ويتنج\s*بيريود|ويتينج\s*بيريود/g, "waiting period"], [/بري\s*إكزيستنج|بري\s*اكزيستنج|بري\s*اكزستنج/g, "pre-existing"], [/إكسكلوجن|اكسكلوجن|اكسكليوجن/g, "exclusion"], [/كوباي|كو\s*باي|كوبيه/g, "copay"], [/بوردرو/g, "bordereau"], [/إنستولمنت|انستولمنت|انستالمنت/g, "installment"], [/جريس\s*بيريود/g, "grace period"], [/كانسيليشن|كانسلليشن|كانسليشن/g, "cancellation"], [/ديدكتبل|ديداكتبل|ديدكتيبل/g, "deductible"], [/أندررايتنج|اندر\s*رايتنج|اندررايتنج/g, "underwriting"], [/كوتيشن/g, "quotation"], [/بروبوزال/g, "proposal"], [/كونتراكت/g, "contract"], [/سيرتيفيكيت|سرتيفيكيت/g, "certificate"], [/ساب\s*ليمت|ساب\s*ليميت/g, "sub-limit"], [/بينفت|بينيفت/g, "benefit"], [/بورتال/g, "portal"], [/رينيوال|رنيوال/g, "renewal"], [/يتيلايزايشن|يتيلايزاشن/g, "utlization"], [/برودكشن/g, "production"]];
function cleanArabicTranscript(text) {
    if (!text)
        return text;
    let t = text;
    t = t.replace(/[٠-٩۰-۹]/g, d => AR_INDIC_DIGITS[d] || d);
    t = t.replace(/ـ+/g, "");
    for (const [pat, rep] of AR_BRAND_FIXES)
        t = t.replace(pat, rep);
    for (const [pat, rep] of AR_TERM_FIXES)
        t = t.replace(pat, rep);
    t = t.replace(/([\u0600-\u06FF])([A-Za-z])/g, "$1 $2").replace(/([A-Za-z])([\u0600-\u06FF])/g, "$1 $2");
    t = t.split(" ").filter((w, i, arr) => i === 0 || w !== arr[i - 1]).join(" ");
    t = t.replace(/[ \t]+/g, " ").replace(/([.!?،,])\1+/g, "$1").trim();
    return t;
}
function cleanEnglishTranscript(text) {
    if (!text)
        return text;
    let t = text;
    t = t.replace(/\s+/g, " ").trim();
    const fixes = [[/\brenew all\b/gi, "renewal"], [/\bre newal\b/gi, "renewal"], [/\brenewal{2,}\b/gi, "renewal"], [/\bpre existing\b/gi, "pre-existing"], [/\bpreexisting\b/gi, "pre-existing"], [/\bwaitingperiod\b/gi, "waiting period"], [/\bgraceperiod\b/gi, "grace period"], [/\btop up\b/gi, "top-up"], [/\badd on\b/gi, "add-on"], [/\bsub limit\b/gi, "sub-limit"], [/\bhealth insurance\b/gi, "medical insurance"], [/\bglobe med\b/gi, "GlobeMed"], [/\bnext care\b/gi, "NextCare"], [/\bmed net\b/gi, "MedNet"], [/\bmed life\b/gi, "MetLife"], [/\bwiseley\b/gi, "Wisely"], [/\bwisely insure\b/gi, "Wisely Insure"]];
    for (const [pattern, replacement] of fixes) {
        t = t.replace(pattern, replacement);
    }
    t = t.replace(/\b([A-Za-z][A-Za-z'-]*)\s+\1\b/gi, "$1");
    return t.trim();
}
function StartBriefingPanel({ meeting, onApply }) {
    const [phase, setPhase] = useState("idle");
    const [elapsed, setElapsed] = useState(0);
    const [liveText, setLiveText] = useState("");
    const [editableText, setEditableText] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [lang, setLang] = useState("en-US");
    const [audioUrl, setAudioUrl] = useState(null);
    const [copied, setCopied] = useState(false);
    const [micLevel, setMicLevel] = useState(0);
    const [lowMic, setLowMic] = useState(false);
    const recognitionRef = useRef(null);
    const finalTranscriptRef = useRef("");
    const interimTranscriptRef = useRef("");
    const activeRef = useRef(false);
    const sessionRef = useRef(0);
    const restartTimerRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);
    const mimeTypeRef = useRef("audio/webm");
    const audioCtxRef = useRef(null);
    const analyserRef = useRef(null);
    const meterSourceRef = useRef(null);
    const meterRafRef = useRef(null);
    const lastSpeechAtRef = useRef(0);
    const supported = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    useEffect(() => () => cleanupAll(), []);
    function cleanupRecognition() { activeRef.current = false; sessionRef.current++; if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
        restartTimerRef.current = null;
    } if (recognitionRef.current) {
        try {
            recognitionRef.current.onend = null;
            recognitionRef.current.onerror = null;
            recognitionRef.current.onresult = null;
            recognitionRef.current.stop();
        }
        catch (e) { }
        recognitionRef.current = null;
    } }
    function cleanupMeter() { if (meterRafRef.current)
        cancelAnimationFrame(meterRafRef.current); meterRafRef.current = null; try {
        meterSourceRef.current?.disconnect();
    }
    catch (e) { } try {
        analyserRef.current?.disconnect?.();
    }
    catch (e) { } meterSourceRef.current = null; analyserRef.current = null; if (audioCtxRef.current) {
        try {
            audioCtxRef.current.close();
        }
        catch (e) { }
    } audioCtxRef.current = null; }
    function cleanupAll() { cleanupRecognition(); if (timerRef.current)
        clearInterval(timerRef.current); timerRef.current = null; cleanupMeter(); if (streamRef.current)
        streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    const CLONKR_VOCABULARY = ["renewal", "renewals", "renew", "renewed", "renewing", "premium", "premiums", "endorsement", "endorsements", "claim", "claims", "coverage", "network", "reimbursement", "reimbursements", "invoice", "invoices", "proposal", "proposals", "quotation", "quotations", "contract", "contracts", "policy", "policies", "benefit", "benefits", "deductible", "copay", "exclusion", "exclusions", "pre-existing", "waiting period", "grace period", "installment", "installments", "underwriting", "top-up", "add-on", "sub-limit", "portal", "TPA", "HMO", "SLA", "ceiling", "sub-celing", "side-fund", "side-poll", "existing", "insurer", "insurers", "medical", "life", "employee", "employees", "member", "members", "utilization", "utilization report", "approval", "approvals", "authorization", "authorizations", "account", "accounts", "client", "clients"];
    function scoreClonkrAlternative(text) {
        if (!text)
            return 0;
        const lower = text.toLowerCase();
        let score = 0;
        for (const term of CLONKR_VOCABULARY) {
            if (lower.includes(term.toLowerCase())) {
                score += 2;
            }
        }
        if (/\brenew(al|als|ed|ing)?\b/i.test(text))
            score += 5;
        if (/\bpremium(s)?\b/i.test(text))
            score += 4;
        if (/\bendorsement(s)?\b/i.test(text))
            score += 4;
        if (/\bclaim(s)?\b/i.test(text))
            score += 4;
        if (/\bcoverage\b/i.test(text))
            score += 4;
        if (/\breimbursement(s)?\b/i.test(text))
            score += 4;
        if (/\bpolicy|policies\b/i.test(text))
            score += 3;
        return score;
    }
    function bestAlternative(result) {
        let best = "";
        let bestScore = -Infinity;
        for (let i = 0; i < result.length; i++) {
            const alt = result[i];
            const text = (alt?.transcript || "").replace(/\s+/g, " ").trim();
            if (!text)
                continue;
            const confidence = Number.isFinite(alt?.confidence) ? alt.confidence : 0;
            const vocabularyScore = scoreClonkrAlternative(text);
            const score = confidence * 10 + vocabularyScore;
            if (score > bestScore) {
                best = text;
                bestScore = score;
            }
        }
        return best;
    }
    function updateDisplayedTranscript() { const finalText = finalTranscriptRef.current.trim(); const interim = interimTranscriptRef.current.trim(); const combined = [finalText, interim].filter(Boolean).join(finalText && interim ? " " : ""); setLiveText(combined); setEditableText(finalText); }
    function makeRecognition(mySession) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR)
            return null;
        const rec = new SR();
        rec.continuous = true;
        rec.interimResults = true;
        rec.maxAlternatives = 10;
        rec.lang = lang;
        rec.onresult = e => {
            if (mySession !== sessionRef.current)
                return;
            let interimParts = [];
            for (let i = e.resultIndex; i < e.results.length; i++) {
                const result = e.results[i];
                const text = bestAlternative(result);
                if (!text)
                    continue;
                if (result.isFinal) {
                    const current = finalTranscriptRef.current.trim();
                    let normalized = text.replace(/\s+/g, " ").trim();
                    if (rec.lang === "ar-EG") {
                        normalized = cleanArabicTranscript(normalized);
                    }
                    else if (rec.lang === "en-US") {
                        normalized = cleanEnglishTranscript(normalized);
                    }
                    if (normalized && !current.endsWith(normalized)) {
                        finalTranscriptRef.current = (current ? current + " " : "") + normalized;
                    }
                    interimTranscriptRef.current = "";
                }
                else {
                    interimParts.push(text);
                }
            }
            interimTranscriptRef.current = interimParts.join(" ").trim();
            updateDisplayedTranscript();
            if (interimTranscriptRef.current || finalTranscriptRef.current)
                lastSpeechAtRef.current = Date.now();
        };
        rec.onerror = e => {
            if (mySession !== sessionRef.current)
                return;
            const err = e?.error || "unknown";
            if (err === "no-speech" || err === "aborted")
                return;
            if (err === "not-allowed" || err === "service-not-allowed") {
                activeRef.current = false;
                setPhase("error");
                setErrorMsg("Microphone/speech recognition permission was denied. Allow microphone access for this site, then start again.");
                return;
            }
            if (err === "audio-capture") {
                activeRef.current = false;
                setPhase("error");
                setErrorMsg("The browser lost access to the microphone. Check that no other application has exclusive control of the mic, then try again.");
                return;
            }
            if (err === "network") {
                setErrorMsg("Speech recognition briefly lost its connection — keeping the transcript and reconnecting…");
            }
        };
        rec.onend = () => {
            if (mySession !== sessionRef.current || !activeRef.current)
                return;
            if (restartTimerRef.current)
                clearTimeout(restartTimerRef.current);
            restartTimerRef.current = setTimeout(() => {
                restartTimerRef.current = null;
                if (!activeRef.current || mySession !== sessionRef.current)
                    return;
                const nextSession = sessionRef.current;
                const next = makeRecognition(nextSession);
                if (!next)
                    return;
                recognitionRef.current = next;
                try {
                    next.start();
                    setErrorMsg("");
                }
                catch (e) {
                    restartTimerRef.current = setTimeout(() => { restartTimerRef.current = null; if (!activeRef.current || nextSession !== sessionRef.current)
                        return; const retry = makeRecognition(nextSession); if (!retry)
                        return; recognitionRef.current = retry; try {
                        retry.start();
                    }
                    catch (err) { } }, 350);
                }
            }, 180);
        };
        return rec;
    }
    function startMicMeter(stream) { try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC)
            return;
        const ctx = new AC();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = .75;
        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);
        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
        meterSourceRef.current = source;
        const data = new Uint8Array(analyser.fftSize);
        const tick = () => { if (!analyserRef.current)
            return; analyser.getByteTimeDomainData(data); let sum = 0; for (let i = 0; i < data.length; i++) {
            const v = (data[i] - 128) / 128;
            sum += v * v;
        } const rms = Math.sqrt(sum / data.length); const level = Math.max(0, Math.min(100, Math.round(rms * 520))); setMicLevel(level); const speaking = level >= 5; if (speaking)
            lastSpeechAtRef.current = Date.now(); setLowMic(Date.now() - lastSpeechAtRef.current > 2500 && level < 8); meterRafRef.current = requestAnimationFrame(tick); };
        tick();
    }
    catch (e) { } }
    async function startBriefing() {
        if (!supported) {
            setPhase("error");
            setErrorMsg("Live transcription is not available in this browser. Please use the latest Chrome or Edge.");
            return;
        }
        cleanupRecognition();
        cleanupMeter();
        if (timerRef.current)
            clearInterval(timerRef.current);
        if (streamRef.current)
            streamRef.current.getTracks().forEach(t => t.stop());
        setErrorMsg("");
        setCopied(false);
        setLiveText("");
        setEditableText("");
        finalTranscriptRef.current = "";
        interimTranscriptRef.current = "";
        lastSpeechAtRef.current = Date.now();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: { ideal: 1 }, echoCancellation: { ideal: true }, noiseSuppression: { ideal: true }, autoGainControl: { ideal: true }, sampleRate: { ideal: 48000 }, sampleSize: { ideal: 16 } } });
            streamRef.current = stream;
            const track = stream.getAudioTracks?.()[0];
            if (track) {
                try {
                    const settings = track.getSettings();
                    console.info("[ClonKR Mic] active microphone settings:", settings);
                }
                catch (e) { }
            }
            const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find(t => window.MediaRecorder?.isTypeSupported?.(t)) || "";
            mimeTypeRef.current = mimeType || "audio/webm";
            const mr = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
            chunksRef.current = [];
            mr.ondataavailable = e => { if (e.data && e.data.size > 0)
                chunksRef.current.push(e.data); };
            mr.start(1000);
            mediaRecorderRef.current = mr;
            startMicMeter(stream);
            activeRef.current = true;
            sessionRef.current++;
            const mySession = sessionRef.current;
            const rec = makeRecognition(mySession);
            if (!rec)
                throw new Error("Speech recognition could not be initialized in this browser.");
            recognitionRef.current = rec;
            try {
                rec.start();
            }
            catch (e) {
                throw new Error("Could not start live speech recognition. Please try again.");
            }
            setElapsed(0);
            setAudioUrl(null);
            setPhase("recording");
            timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
        }
        catch (err) {
            cleanupAll();
            setPhase("error");
            setErrorMsg(err.name === "NotAllowedError" ? "Microphone access was denied — allow microphone access for this site and start again." : "Could not start recording: " + (err.message || "unknown error"));
        }
    }
    async function stopBriefing() {
        activeRef.current = false;
        sessionRef.current++;
        if (restartTimerRef.current)
            clearTimeout(restartTimerRef.current);
        restartTimerRef.current = null;
        if (timerRef.current)
            clearInterval(timerRef.current);
        timerRef.current = null;
        if (recognitionRef.current) {
            try {
                recognitionRef.current.onend = null;
                recognitionRef.current.stop();
            }
            catch (e) { }
            recognitionRef.current = null;
        }
        await new Promise(r => setTimeout(r, 180));
        const mr = mediaRecorderRef.current;
        if (mr && mr.state !== "inactive") {
            const blob = await new Promise(resolve => { mr.onstop = () => resolve(new Blob(chunksRef.current, { type: mimeTypeRef.current })); mr.stop(); });
            if (blob.size >= 1000)
                setAudioUrl(URL.createObjectURL(blob));
        }
        if (streamRef.current)
            streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
        cleanupMeter();
        const finalText = finalTranscriptRef.current.trim();
        setEditableText(finalText);
        setLiveText(finalText);
        setPhase("done");
    }
    function fmtElapsed(s) { const m = Math.floor(s / 60), sec = s % 60; return `${m}:${sec.toString().padStart(2, "0")}`; }
    function copyTranscript() { const text = editableText.trim(); if (!text)
        return; navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }
    function saveToNotebook() { const text = editableText.trim(); if (!text)
        return; onApply(text); setPhase("idle"); }
    function clearTranscript() { setEditableText(""); setLiveText(""); finalTranscriptRef.current = ""; interimTranscriptRef.current = ""; }
    function tidyArabicText() { const cleaned = cleanArabicTranscript(editableText); setEditableText(cleaned); finalTranscriptRef.current = cleaned; }
    if (phase === "idle")
        return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" } },
            React.createElement("button", { onClick: startBriefing, style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, color: "#e0392e", background: "#fff0ef", border: "1px solid #e0392e44", borderRadius: 20, padding: "3px 10px", cursor: "pointer" } },
                React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "#e0392e", display: "inline-block" } }),
                " Start Briefing"),
            React.createElement("select", { value: lang, onChange: e => setLang(e.target.value), style: { fontSize: 10, fontWeight: 600, color: "#7a9ab5", background: "#f7fbff", border: "1px solid #dde8f0", borderRadius: 20, padding: "3px 8px" } },
                React.createElement("option", { value: "en-US" }, "English only"),
                React.createElement("option", { value: "ar-EG" }, "Arabic only (Egypt)")),
            React.createElement("span", { style: { fontSize: 9, color: "#a8bccf" } }, "Pure single-language transcript \u2022 no Arabic/English mixing \u2022 raw audio backup"));
    return React.createElement("div", { style: { background: "#fff7f6", border: "1px solid #e0392e33", borderRadius: 10, padding: 12, marginBottom: 12 } },
        phase === "recording" && React.createElement(React.Fragment, null,
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" } },
                React.createElement("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#e0392e", display: "inline-block", animation: "recPulse 1.4s infinite" } }),
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#e0392e" } },
                    "Recording \u2014 ",
                    fmtElapsed(elapsed)),
                React.createElement("span", { style: { fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 12, border: "1px solid #e0392e44", background: "#e0392e", color: "#fff", marginLeft: 4 } }, lang === "en-US" ? "EN" : "AR"),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: lowMic ? "#e0392e" : "#7a9ab5" } },
                    React.createElement("span", { style: { display: "inline-block", width: 44, height: 6, borderRadius: 5, background: "#edf2f7", overflow: "hidden" } },
                        React.createElement("span", { style: { display: "block", height: "100%", width: `${Math.max(4, micLevel)}%`, background: lowMic ? "#e0392e" : "#0fa890", borderRadius: 5, transition: "width .08s" } })),
                    lowMic ? "Mic level low" : "Mic active"),
                React.createElement("button", { onClick: stopBriefing, style: { marginLeft: "auto", background: "#e0392e", color: "#fff", border: "none", borderRadius: 8, padding: "5px 13px", fontSize: 11, fontWeight: 700, cursor: "pointer" } }, "\u25A0 Stop")),
            React.createElement("div", { style: { fontSize: 10, color: "#a0685f", fontStyle: "italic", marginBottom: 6 } },
                "Recording in ",
                React.createElement("b", null, lang === "en-US" ? "English only" : "Arabic only (Egypt)"),
                " \u2014 the language is locked for this whole recording so the transcript stays pure, with no mixed Arabic/English. Stop and start a new recording to switch languages. Keep the microphone 30\u2013100 cm from the speaker and avoid loud music/background conversations."),
            React.createElement("div", { dir: lang === "ar-EG" ? "rtl" : "ltr", style: { fontSize: 12, color: "#5a3a35", maxHeight: 180, overflowY: "auto", background: "#fff", border: "1px solid #f0d8d5", borderRadius: 7, padding: "8px 10px", lineHeight: 1.7, whiteSpace: "pre-wrap" } }, liveText || "Listening… start speaking.")),
        phase === "done" && React.createElement(React.Fragment, null,
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8, flexWrap: "wrap" } },
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#0fa890" } }, "\u2713 Recording stopped \u2014 transcript ready"),
                React.createElement("div", { style: { fontSize: 9, color: "#a8bccf" } },
                    lang === "en-US" ? "English" : "Arabic (Egypt)",
                    " \u2022 raw audio preserved")),
            React.createElement("textarea", { dir: "auto", value: editableText, onChange: e => { setEditableText(e.target.value); finalTranscriptRef.current = e.target.value; }, placeholder: "No transcript was captured. You can type/correct the transcript here before copying.", style: { width: "100%", minHeight: 220, resize: "vertical", background: "#fff", border: "1px solid #f0d8d5", borderRadius: 7, padding: "10px 11px", fontSize: 12, lineHeight: 1.7, color: "#0f1c2e", outline: "none" } }),
            React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", margin: "7px 0 10px" } }, "Review and correct names, numbers and technical terms before briefing. The raw audio is retained as a backup."),
            React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
                React.createElement("button", { onClick: copyTranscript, disabled: !editableText.trim(), style: { background: "#0fa890", color: "#fff", border: "none", borderRadius: 8, padding: "6px 15px", fontSize: 11, fontWeight: 700, cursor: "pointer", opacity: editableText.trim() ? 1 : .55 } }, copied ? "✓ Copied" : "📋 Copy Transcript"),
                React.createElement("button", { onClick: saveToNotebook, disabled: !editableText.trim(), style: { background: "#fffbdd", color: "#8a7a20", border: "1px solid #e8dfa0", borderRadius: 8, padding: "6px 15px", fontSize: 11, fontWeight: 700, cursor: "pointer", opacity: editableText.trim() ? 1 : .55 } },
                    React.createElement(Ic, { name: "notebook" }),
                    " Save Transcript to Notebook"),
                (lang === "ar-EG" || /[\u0600-\u06FF]/.test(editableText)) && React.createElement("button", { onClick: tidyArabicText, disabled: !editableText.trim(), title: "Fixes Arabic-Indic digits, stray repeated words, and brand names mis-heard phonetically (e.g. \u0645\u064A\u062A \u0644\u0627\u064A\u0641 \u2192 MetLife)", style: { background: "#f0f6ff", color: "#4285f4", border: "1px solid #4285f444", borderRadius: 8, padding: "6px 15px", fontSize: 11, fontWeight: 700, cursor: "pointer", opacity: editableText.trim() ? 1 : .55 } },
                    React.createElement(Ic, { name: "clean" }),
                    " Clean Up Arabic Text"),
                React.createElement("button", { onClick: clearTranscript, style: { background: "none", border: "1px solid #dde8f0", color: "#7a9ab5", borderRadius: 8, padding: "6px 15px", fontSize: 11, fontWeight: 700, cursor: "pointer" } }, "Clear Text"),
                audioUrl && React.createElement("a", { href: audioUrl, download: `meeting-${meeting.id}.webm`, style: { fontSize: 10, color: "#7a9ab5", alignSelf: "center", textDecoration: "underline" } }, "Download raw audio"))),
        phase === "error" && React.createElement(React.Fragment, null,
            React.createElement("div", { style: { fontSize: 12, color: "#e0392e", marginBottom: 8 } },
                React.createElement(Ic, { name: "warning" }),
                " ",
                errorMsg),
            finalTranscriptRef.current.trim() && React.createElement("textarea", { dir: "auto", value: editableText || finalTranscriptRef.current, onChange: e => { setEditableText(e.target.value); finalTranscriptRef.current = e.target.value; }, style: { width: "100%", minHeight: 140, background: "#fff", border: "1px solid #f0d8d5", borderRadius: 7, padding: "9px 11px", fontSize: 12, lineHeight: 1.6, marginBottom: 8 } }),
            audioUrl && React.createElement("a", { href: audioUrl, download: `meeting-${meeting.id}.webm`, style: { fontSize: 11, color: "#7a9ab5", textDecoration: "underline", display: "block", marginBottom: 8 } }, "Download raw audio (nothing was lost)"),
            React.createElement("button", { onClick: () => setPhase("idle"), style: { background: "none", border: "1px solid #dde8f0", color: "#7a9ab5", borderRadius: 8, padding: "6px 15px", fontSize: 11, fontWeight: 700, cursor: "pointer" } }, "Close")));
}
function MeetingModal({ meeting, unifiedPocs, onUpdate, onFinish, onReopen, onDelete, onClose, onOpenContact }) {
    const [topicInput, setTopicInput] = useState("");
    const [actionInput, setActionInput] = useState("");
    const [actionAssignee, setActionAssignee] = useState("");
    const [notes, setNotes] = useState(meeting.generalNotes || "");
    const [notebookOpen, setNotebookOpen] = useState(false);
    const [notebookText, setNotebookText] = useState(meeting.notebookText || "");
    const participants = (meeting.participantKeys || []).map(k => unifiedPocs.find(p => p.key === k)).filter(Boolean);
    const isCompleted = meeting.status === "completed";
    const displayStatus = getMeetingDisplayStatus(meeting);
    function addTopic() { if (!topicInput.trim())
        return; onUpdate(meeting.id, m => ({ topicsDiscussed: [...(m.topicsDiscussed || []), { id: Date.now(), text: topicInput.trim(), ts: new Date().toISOString() }] })); setTopicInput(""); }
    function removeTopic(id) { onUpdate(meeting.id, m => ({ topicsDiscussed: (m.topicsDiscussed || []).filter(t => t.id !== id) })); }
    function addAction() { if (!actionInput.trim())
        return; onUpdate(meeting.id, m => ({ actionItems: [...(m.actionItems || []), { id: Date.now(), text: actionInput.trim(), assignee: actionAssignee, done: false }] })); setActionInput(""); setActionAssignee(""); }
    function toggleAction(id) { onUpdate(meeting.id, m => ({ actionItems: (m.actionItems || []).map(a => a.id === id ? { ...a, done: !a.done } : a) })); }
    function removeAction(id) { onUpdate(meeting.id, m => ({ actionItems: (m.actionItems || []).filter(a => a.id !== id) })); }
    function saveNotesBlur() { onUpdate(meeting.id, { generalNotes: notes }); }
    function saveNotebookBlur() { onUpdate(meeting.id, { notebookText }); }
    function applyRawTranscript(transcript) {
        const now = new Date();
        const stamp = `— Raw transcript (${now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} ${now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}) —\n`;
        const merged = (notebookText ? notebookText + "\n\n" : "") + stamp + transcript;
        setNotebookText(merged);
        onUpdate(meeting.id, { notebookText: merged });
        setNotebookOpen(true);
    }
    function emailMinutes() { const now = new Date(); const isAfternoon = now.getHours() > 12 || now.getHours() === 12 && now.getMinutes() >= 30; const lines = []; lines.push("Hello Dears,"); lines.push(isAfternoon ? "Good day." : "Good morning."); lines.push("Thank you for taking the time to meet with us. It was a pleasure connecting with you, and we highly appreciated the productive discussion."); lines.push(""); lines.push("Please find below a summary of the key points discussed during the meeting:"); const topics = meeting.topicsDiscussed || []; if (topics.length === 0)
        lines.push("—"); topics.forEach((t, i) => lines.push(`${i + 1}. ${t.text}`)); lines.push(""); lines.push("Action Item:"); const actions = meeting.actionItems || []; if (actions.length === 0)
        lines.push("—"); actions.forEach((a, i) => lines.push(`${i + 1}. ${a.text}${a.assignee ? ` (${a.assignee})` : ""}`)); lines.push(""); lines.push("Other Agreed Points:"); const noteLines = (meeting.generalNotes || "").split("\n").map(l => l.trim()).filter(Boolean); if (noteLines.length === 0)
        lines.push("—"); noteLines.forEach(l => lines.push(`• ${l}`)); lines.push(""); lines.push("Thank you once again for your time and cooperation. We look forward to moving ahead with the agreed plan and completing the required actions as soon as possible."); const body = lines.join("\n"); const to = participants.map(p => p.email).filter(Boolean).join(","); gmailComposeWithBody(to, `Minutes of Meeting: ${meeting.name} — ${meeting.date ? fmtShort(meeting.date) : ""}`, body); }
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" } },
            notebookOpen && React.createElement("div", { style: { width: 320, maxHeight: "90vh", overflowY: "auto", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,.18)", border: "1px solid #f0e6a8", position: "relative", padding: "20px 16px 20px 44px", backgroundColor: "#fffbdd", backgroundImage: "repeating-linear-gradient(#fffbdd 0px,#fffbdd 27px,#e8dfa0 28px)", backgroundSize: "100% 28px" } },
                React.createElement("div", { style: { position: "absolute", left: 28, top: 0, bottom: 0, width: 1, background: "#e8a0a0" } }),
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } },
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#8a7a20", fontFamily: "'Clash Display',sans-serif" } },
                        React.createElement(Ic, { name: "notebook" }),
                        " Notebook"),
                    React.createElement("button", { onClick: () => setNotebookOpen(false), style: { background: "none", border: "none", fontSize: 16, color: "#8a7a20", cursor: "pointer" } }, "\u00D7")),
                React.createElement("div", { style: { fontSize: 10, color: "#a89840", marginBottom: 8, fontStyle: "italic", lineHeight: 1.4 } }, "Scratchpad only \u2014 not included in the Minutes of Meeting. Copy what you need into Topics / Action Items / Notes."),
                React.createElement("textarea", { value: notebookText, onChange: e => setNotebookText(e.target.value), onBlur: saveNotebookBlur, placeholder: "Write freely here while the meeting happens...", style: { width: "100%", minHeight: 420, border: "none", background: "transparent", resize: "vertical", outline: "none", fontSize: 13, lineHeight: "28px", color: "#4a4010", fontFamily: "'Plus Jakarta Sans',sans-serif" } })),
            React.createElement("div", { style: { ...c.mBox, width: 600, maxHeight: "90vh", overflowY: "auto" } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 } },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 16, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, meeting.name),
                        React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } },
                            meeting.topic,
                            meeting.date ? ` · ${fmtShort(meeting.date)}` : "",
                            meeting.time ? ` ${meeting.time}` : "")),
                    React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, margin: "8px 0 14px", flexWrap: "wrap" } },
                    React.createElement("span", { style: { display: "inline-block", background: displayStatus === "completed" ? "#e8faf5" : displayStatus === "upcoming" ? "#e8f0fe" : "#fff8e6", color: displayStatus === "completed" ? "#0fa890" : displayStatus === "upcoming" ? "#4285f4" : "#d4880a", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 } }, displayStatus === "completed" ? "✓ COMPLETED" : displayStatus === "upcoming" ? "◷ UPCOMING" : "● IN PROGRESS"),
                    !notebookOpen && React.createElement("button", { onClick: () => setNotebookOpen(true), style: { fontSize: 10, fontWeight: 700, color: "#8a7a20", background: "#fffbdd", border: "1px solid #e8dfa0", borderRadius: 20, padding: "3px 10px", cursor: "pointer" } },
                        React.createElement(Ic, { name: "notebook" }),
                        " Open Notebook"),
                    participants.length > 0 && React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" } }, participants.map(p => p.contactId ? React.createElement("button", { key: p.key, onClick: () => onOpenContact && onOpenContact(p.contactId), title: "Open contact card", style: { fontSize: 10.5, fontWeight: 600, color: "#7a4a1e", background: "#fff3e0", border: "1px solid #e8c088", borderRadius: 20, padding: "2px 9px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 } },
                        React.createElement(Ic, { name: "contact" }),
                        " ",
                        p.name) : React.createElement("span", { key: p.key, style: { fontSize: 10.5, color: "#7a9ab5" } }, p.name)))),
                React.createElement(StartBriefingPanel, { meeting: meeting, onApply: applyRawTranscript }),
                !isCompleted && React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 10, padding: 12, marginBottom: 12 } },
                        React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", marginBottom: 8, textTransform: "uppercase" } }, "Topics Discussed"),
                        (meeting.topicsDiscussed || []).map(t => React.createElement("div", { key: t.id, style: { display: "flex", alignItems: "center", gap: 6, padding: "5px 0", borderBottom: "1px solid #edf2f7" } },
                            React.createElement("span", { style: { flex: 1, fontSize: 12 } }, t.text),
                            React.createElement("button", { onClick: () => removeTopic(t.id), style: { background: "none", border: "none", color: "#e0392e", cursor: "pointer", fontSize: 12 } }, "\u2715"))),
                        React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 8 } },
                            React.createElement("input", { style: { ...c.fi, marginBottom: 0, flex: 1 }, placeholder: "Add a discussion point...", value: topicInput, onChange: e => setTopicInput(e.target.value), onKeyDown: e => e.key === "Enter" && addTopic() }),
                            React.createElement("button", { style: c.sv, onClick: addTopic }, "Add"))),
                    React.createElement("div", { style: { background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 10, padding: 12, marginBottom: 12 } },
                        React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", marginBottom: 8, textTransform: "uppercase" } }, "Action Items"),
                        (meeting.actionItems || []).map(a => React.createElement("div", { key: a.id, style: { display: "flex", alignItems: "center", gap: 6, padding: "5px 0", borderBottom: "1px solid #edf2f7" } },
                            React.createElement("input", { type: "checkbox", checked: a.done, onChange: () => toggleAction(a.id), style: { accentColor: "#0fa890" } }),
                            React.createElement("span", { style: { flex: 1, fontSize: 12, textDecoration: a.done ? "line-through" : "none", color: a.done ? "#7a9ab5" : "#0f1c2e" } },
                                a.text,
                                a.assignee ? React.createElement("span", { style: { color: "#4285f4", fontWeight: 600 } },
                                    " \u2014 ",
                                    a.assignee) : ""),
                            React.createElement("button", { onClick: () => removeAction(a.id), style: { background: "none", border: "none", color: "#e0392e", cursor: "pointer", fontSize: 12 } }, "\u2715"))),
                        React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 8 } },
                            React.createElement("input", { style: { ...c.fi, marginBottom: 0, flex: 1 }, placeholder: "Add an action item...", value: actionInput, onChange: e => setActionInput(e.target.value), onKeyDown: e => e.key === "Enter" && addAction() }),
                            React.createElement("select", { style: { ...c.fi, marginBottom: 0, width: 130 }, value: actionAssignee, onChange: e => setActionAssignee(e.target.value) },
                                React.createElement("option", { value: "" }, "Assignee..."),
                                participants.map(p => React.createElement("option", { key: p.key, value: p.name }, p.name))),
                            React.createElement("button", { style: c.sv, onClick: addAction }, "Add"))),
                    React.createElement("div", { style: { marginBottom: 14 } },
                        React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", marginBottom: 6, textTransform: "uppercase" } }, "General Notes"),
                        React.createElement("textarea", { style: { ...c.fi, minHeight: 80, resize: "vertical" }, value: notes, onChange: e => setNotes(e.target.value), onBlur: saveNotesBlur, placeholder: "Anything else worth capturing..." }))),
                isCompleted && React.createElement("div", { style: { marginBottom: 14 } },
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", marginBottom: 6, textTransform: "uppercase" } }, "Topics Discussed"),
                    (meeting.topicsDiscussed || []).length === 0 ? React.createElement("div", { style: { fontSize: 12, color: "#c0cdd8" } }, "None recorded.") : React.createElement("ol", { style: { margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.8 } }, meeting.topicsDiscussed.map(t => React.createElement("li", { key: t.id }, t.text))),
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", margin: "12px 0 6px", textTransform: "uppercase" } }, "Action Items"),
                    (meeting.actionItems || []).length === 0 ? React.createElement("div", { style: { fontSize: 12, color: "#c0cdd8" } }, "None recorded.") : React.createElement("div", null, meeting.actionItems.map(a => React.createElement("div", { key: a.id, style: { fontSize: 12, padding: "3px 0" } },
                        a.done ? "✓" : "○",
                        " ",
                        a.text,
                        a.assignee ? ` — ${a.assignee}` : ""))),
                    meeting.generalNotes && React.createElement(React.Fragment, null,
                        React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", margin: "12px 0 6px", textTransform: "uppercase" } }, "Notes"),
                        React.createElement("div", { style: { fontSize: 12, whiteSpace: "pre-wrap", color: "#4a6080" } }, meeting.generalNotes))),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "space-between", marginTop: 14, flexWrap: "wrap" } },
                    React.createElement("button", { onClick: () => onDelete(meeting.id), style: { fontSize: 11, color: "#e0392e", background: "#fff0ef", border: "none", borderRadius: 20, padding: "6px 12px", cursor: "pointer" } }, "Delete"),
                    React.createElement("div", { style: { display: "flex", gap: 8 } },
                        React.createElement("button", { style: { ...c.sv, background: "#4285f4" }, onClick: emailMinutes },
                            React.createElement(Ic, { name: "envelope" }),
                            " Email Minutes of Meeting"),
                        !isCompleted ? React.createElement("button", { style: { ...c.sv, background: "linear-gradient(135deg,#0fa890,#4285f4)" }, onClick: () => { onUpdate(meeting.id, { generalNotes: notes }); onFinish(meeting.id); } }, "\u2713 Finish Meeting") : React.createElement("button", { style: c.cBtn, onClick: () => onReopen(meeting.id) }, "Reopen"))))));
}
const CONTACT_FIELDS = [["name", "Full Name", "text"], ["phone", "Phone Number", "tel"], ["email", "Email", "email"], ["company", "Company", "text"], ["jobTitle", "Job Title", "text"], ["department", "Department", "text"]];
function ContactModal({ contact, onSave, onClose, onDelete }) {
    const [d, setD] = useState(() => ({ name: "", phone: "", email: "", company: "", jobTitle: "", department: "", note: "", ...(contact || {}) }));
    const isEdit = !!contact?.id;
    function ch(k, v) { setD(f => ({ ...f, [k]: v })); }
    function submit() { if (!d.name.trim())
        return; onSave(d); }
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 440, maxHeight: "90vh", overflowY: "auto", background: "#fbf6ea", backgroundImage: "repeating-linear-gradient(#fbf6ea 0px,#fbf6ea 30px,#e9dfc4 31px)", backgroundSize: "100% 31px", border: "1px solid #d8cca0", boxShadow: "0 14px 40px rgba(60,45,20,.22)" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 } },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 800, fontFamily: "'Clash Display',serif", color: "#5a4420", letterSpacing: ".02em" } },
                    React.createElement(Ic, { name: "contact" }),
                    " ",
                    isEdit ? "Edit Contact" : "New Contact Card"),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#a89460", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
            CONTACT_FIELDS.map(([k, label, type]) => React.createElement("div", { key: k },
                React.createElement("label", { style: { display: "block", fontSize: 9.5, fontWeight: 800, color: "#8a7440", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2, marginTop: 8, fontFamily: "'Courier New',monospace" } }, label),
                React.createElement("input", { type: type, value: d[k] || "", onChange: e => ch(k, e.target.value), style: { width: "100%", boxSizing: "border-box", background: "transparent", border: "none", borderBottom: "1px solid #c9b988", outline: "none", fontSize: 13, color: "#3a2e14", padding: "3px 2px", fontFamily: "'Plus Jakarta Sans',sans-serif" }, placeholder: label }))),
            React.createElement("label", { style: { display: "block", fontSize: 9.5, fontWeight: 800, color: "#8a7440", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2, marginTop: 8, fontFamily: "'Courier New',monospace" } }, "Note"),
            React.createElement("textarea", { value: d.note || "", onChange: e => ch("note", e.target.value), placeholder: "Anything worth remembering...", style: { width: "100%", boxSizing: "border-box", minHeight: 70, resize: "vertical", background: "transparent", border: "1px solid #c9b98866", borderRadius: 4, outline: "none", fontSize: 12.5, color: "#3a2e14", padding: "6px 8px", fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: "31px" } }),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "space-between", marginTop: 16 } },
                isEdit ? React.createElement("button", { onClick: () => onDelete(d.id), style: { fontSize: 11, color: "#a03020", background: "#f8e8dc", border: "1px solid #d8b090", borderRadius: 20, padding: "6px 12px", cursor: "pointer" } }, "Delete") : React.createElement("span", null),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("button", { onClick: onClose, style: { fontSize: 11, fontWeight: 700, color: "#8a7440", background: "transparent", border: "1px solid #c9b988", borderRadius: 20, padding: "6px 14px", cursor: "pointer" } }, "Cancel"),
                    React.createElement("button", { onClick: submit, disabled: !d.name.trim(), style: { fontSize: 11, fontWeight: 700, color: "#fff", background: "#8a6a2e", border: "none", borderRadius: 20, padding: "6px 16px", cursor: "pointer", opacity: d.name.trim() ? 1 : .5 } }, isEdit ? "Save Card" : "Add Card")))));
}
function ContactRolodexCard({ contact, onEdit, onClose }) {
    const initial = (contact.name || "?").trim().charAt(0).toUpperCase();
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { width: 380, maxWidth: "92vw", maxHeight: "88vh", display: "flex", flexDirection: "column", borderRadius: "6px 6px 14px 14px", overflow: "hidden", boxShadow: "0 20px 60px rgba(40,28,10,.35)", border: "1px solid #cbb98a", animation: "cardFlipIn .32s cubic-bezier(.2,.8,.2,1)" } },
            React.createElement("div", { style: { background: "linear-gradient(135deg,#5a4420,#2f2410)", color: "#f3e6c4", padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 } },
                React.createElement("div", { style: { width: 38, height: 38, borderRadius: "50%", background: "#f3e6c4", color: "#5a4420", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, fontFamily: "'Clash Display',serif", flexShrink: 0 } }, initial),
                React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 800, fontFamily: "'Clash Display',serif" } }, contact.name),
                    (contact.jobTitle || contact.company) && React.createElement("div", { style: { fontSize: 11, opacity: .85 } }, [contact.jobTitle, contact.company].filter(Boolean).join(" · "))),
                React.createElement("button", { onClick: onClose, style: { background: "none", border: "none", fontSize: 18, color: "#f3e6c4cc", cursor: "pointer" } }, "\u00D7")),
            React.createElement("div", { style: { background: "#fbf6ea", backgroundImage: "repeating-linear-gradient(#fbf6ea 0px,#fbf6ea 27px,#e9dfc4 28px)", backgroundSize: "100% 28px", padding: "14px 18px 18px", fontFamily: "'Plus Jakarta Sans',sans-serif", overflowY: "auto", minHeight: 0, flex: 1 } },
                [["Phone", contact.phone, "phone"], ["Email", contact.email, "envelope"], ["Department", contact.department, "tag"]].filter(([, v]) => v).map(([label, val, ic]) => React.createElement("div", { key: label, style: { display: "flex", gap: 8, alignItems: "baseline", padding: "4px 0" } },
                    React.createElement("span", { style: { width: 20 } },
                        React.createElement(Ic, { name: ic, size: 13 })),
                    React.createElement("span", { style: { fontSize: 9.5, fontWeight: 800, color: "#8a7440", textTransform: "uppercase", letterSpacing: ".06em", width: 82, fontFamily: "'Courier New',monospace", flexShrink: 0 } }, label),
                    React.createElement("span", { style: { fontSize: 12.5, color: "#3a2e14", wordBreak: "break-all" } }, val))),
                contact.note && React.createElement("div", { style: { marginTop: 8, paddingTop: 8, borderTop: "1px dashed #c9b988" } },
                    React.createElement("div", { style: { fontSize: 9.5, fontWeight: 800, color: "#8a7440", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 3, fontFamily: "'Courier New',monospace" } }, "Note"),
                    React.createElement("div", { style: { fontSize: 12, color: "#4a3a1e", whiteSpace: "pre-wrap", lineHeight: "27px" } }, contact.note)),
                React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 10 } },
                    React.createElement("button", { onClick: () => onEdit(contact), style: { fontSize: 11, fontWeight: 700, color: "#fff", background: "#8a6a2e", border: "none", borderRadius: 20, padding: "5px 14px", cursor: "pointer" } },
                        React.createElement(Ic, { name: "edit" }),
                        " Edit")))));
}
function ContactsRolodexView({ contacts, onAdd, onOpen }) {
    const [search, setSearch] = useState("");
    const [letter, setLetter] = useState(null);
    const sorted = useMemo(() => contacts.slice().sort((a, b) => (a.name || "").localeCompare(b.name || "")), [contacts]);
    const letters = useMemo(() => { const s = new Set(); sorted.forEach(c => { const l = (c.name || "?").trim().charAt(0).toUpperCase(); s.add(/[A-Z]/.test(l) ? l : "#"); }); return Array.from(s).sort(); }, [sorted]);
    const filtered = sorted.filter(c => { if (letter) {
        const l = (c.name || "?").trim().charAt(0).toUpperCase();
        if ((/[A-Z]/.test(l) ? l : "#") !== letter)
            return false;
    } if (!search)
        return true; const q = search.toLowerCase(); return [c.name, c.company, c.jobTitle, c.department, c.email, c.phone].some(v => (v || "").toLowerCase().includes(q)); });
    return React.createElement("div", { style: { background: "#fbf6ea", backgroundImage: "repeating-linear-gradient(#fbf6ea 0px,#fbf6ea 30px,#e9dfc4 31px)", backgroundSize: "100% 31px", border: "1px solid #d8cca0", borderRadius: 14, padding: "16px 20px 20px", boxShadow: "inset 0 1px 0 #fff8, 0 2px 10px rgba(90,68,32,.08)" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" } },
            React.createElement("div", { style: { fontSize: 16, fontWeight: 800, fontFamily: "'Clash Display',serif", color: "#5a4420", letterSpacing: ".02em" } },
                React.createElement(Ic, { name: "contact" }),
                " Contacts"),
            React.createElement("div", { style: { fontSize: 10, color: "#a89460", fontFamily: "'Courier New',monospace" } },
                contacts.length,
                " card",
                contacts.length !== 1 ? "s" : "",
                " on file"),
            React.createElement("input", { value: search, onChange: e => setSearch(e.target.value), placeholder: "Search the rolodex...", style: { marginLeft: "auto", fontSize: 12, color: "#3a2e14", background: "#fffdf6", border: "1px solid #c9b988", borderRadius: 20, padding: "6px 14px", outline: "none", minWidth: 180, fontFamily: "'Plus Jakarta Sans',sans-serif" } }),
            React.createElement("button", { onClick: onAdd, style: { fontSize: 11, fontWeight: 700, color: "#fff", background: "#8a6a2e", border: "none", borderRadius: 20, padding: "7px 15px", cursor: "pointer" } }, "+ New Card")),
        React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14, paddingBottom: 10, borderBottom: "1px dashed #c9b988" } },
            React.createElement("button", { onClick: () => setLetter(null), style: { fontSize: 10, fontWeight: 800, padding: "3px 9px", borderRadius: 5, border: "1px solid #c9b988", background: letter === null ? "#8a6a2e" : "transparent", color: letter === null ? "#fff" : "#8a7440", cursor: "pointer", fontFamily: "'Courier New',monospace" } }, "ALL"),
            letters.map(l => React.createElement("button", { key: l, onClick: () => setLetter(l === letter ? null : l), style: { fontSize: 10, fontWeight: 800, width: 22, height: 22, borderRadius: 5, border: "1px solid #c9b988", background: letter === l ? "#8a6a2e" : "transparent", color: letter === l ? "#fff" : "#8a7440", cursor: "pointer", fontFamily: "'Courier New',monospace" } }, l))),
        filtered.length === 0 ? React.createElement("div", { style: { padding: "2.5rem 1rem", textAlign: "center", color: "#a89460", fontSize: 13, fontFamily: "'Courier New',monospace" } }, contacts.length === 0 ? "No cards yet — click + New Card to file your first contact." : "No cards match.") : React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 12 } }, filtered.map(ct => {
            const initial = (ct.name || "?").trim().charAt(0).toUpperCase();
            return React.createElement("div", { key: ct.id, onClick: () => onOpen(ct), style: { background: "#fffdf6", border: "1px solid #d8cca0", borderRadius: "4px 10px 10px 4px", borderLeft: "5px solid #8a6a2e", padding: "10px 12px", cursor: "pointer", display: "flex", gap: 10, alignItems: "center", transition: "transform .14s cubic-bezier(.34,1.56,.64,1),box-shadow .14s ease" }, onMouseEnter: e => { e.currentTarget.style.transform = "translateX(3px)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(90,68,32,.16)"; }, onMouseLeave: e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; } },
                React.createElement("div", { style: { width: 32, height: 32, borderRadius: "50%", background: "#5a4420", color: "#f3e6c4", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, fontFamily: "'Clash Display',serif", flexShrink: 0 } }, initial),
                React.createElement("div", { style: { minWidth: 0, flex: 1 } },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#3a2e14", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ct.name),
                    React.createElement("div", { style: { fontSize: 10.5, color: "#8a7440", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, [ct.jobTitle, ct.company].filter(Boolean).join(" · ") || ct.phone || ct.email || "—")));
        })));
}
const AccModal = memo(({ title, d, ch, allIns, onSave, onClose }) => {
    const carriers = allIns.filter(i => i.types.includes("carrier"));
    const tpas = allIns.filter(i => i.types.includes("tpa") && !i.types.includes("carrier"));
    const tpaCar = allIns.filter(i => i.types.includes("carrier") && i.types.includes("tpa"));
    const hmos = allIns.filter(i => i.types.includes("hmo"));
    const showMed = d.pkCombined || d.pkMed, showLife = d.pkCombined || d.pkLife;
    const med = showMed ? parseFloat(d.medTotal) || 0 : 0, life = showLife ? parseFloat(d.lifeTotal) || 0 : 0;
    const principal = parseInt(d.adherentsPrincipal) || 0, family = parseInt(d.adherentsFamily) || 0, adhTotal = principal + family, total = med + life;
    const ci = getCycleInfo(d.frequency || "quarterly"), cycle = total > 0 ? total / ci.divisor : 0, perAdh = adhTotal > 0 ? total / adhTotal : 0;
    const toggleCombined = chk => { ch("pkCombined", chk); if (chk) {
        ch("pkMed", false);
        ch("pkLife", false);
    } };
    const toggleMed = chk => { ch("pkMed", chk); if (chk)
        ch("pkCombined", false); };
    const toggleLife = chk => { ch("pkLife", chk); if (chk)
        ch("pkCombined", false); };
    const noTaxLbl = { ...c.fl, fontSize: 9, color: "#a0b8cc" }, noTaxIn = { ...c.fi, fontSize: 12, padding: "6px 10px", background: "#fafcfe" };
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: c.mBox },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 14, fontFamily: "'Clash Display',sans-serif" } }, title),
            React.createElement("label", { style: c.fl }, "Company logo URL"),
            React.createElement("input", { style: c.fi, type: "url", value: d.logoUrl || "", onChange: e => ch("logoUrl", e.target.value), placeholder: "https://.../logo.png" }),
            [["Company name", "name", "text"], ["Industry", "industry", "text"], ["Service start date", "serviceStartDate", "date"]].map(([lb, k, t]) => React.createElement("div", { key: k },
                React.createElement("label", { style: c.fl }, lb),
                React.createElement("input", { style: c.fi, type: t, value: d[k] || "", onChange: e => ch(k, e.target.value) }))),
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#d4880a", margin: "10px 0 8px", textTransform: "uppercase", letterSpacing: .7 } }, "Adherents"),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Principal"),
                    React.createElement("input", { style: c.fi, type: "number", value: d.adherentsPrincipal || "", onChange: e => ch("adherentsPrincipal", e.target.value), placeholder: "0" })),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Family (spouse/child/parent)"),
                    React.createElement("input", { style: c.fi, type: "number", value: d.adherentsFamily || "", onChange: e => ch("adherentsFamily", e.target.value), placeholder: "0" }))),
            adhTotal > 0 && React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", marginTop: -6, marginBottom: 10 } },
                adhTotal,
                " total adherent",
                adhTotal !== 1 ? "s" : ""),
            React.createElement("div", null,
                React.createElement("label", { style: c.fl }, "Status"),
                React.createElement("select", { style: c.fi, value: d.status || "healthy", onChange: e => ch("status", e.target.value) },
                    React.createElement("option", { value: "healthy" }, "Healthy"),
                    React.createElement("option", { value: "attention" }, "Needs Attention"),
                    React.createElement("option", { value: "risk" }, "At Risk"))),
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#4285f4", margin: "12px 0 8px", textTransform: "uppercase", letterSpacing: .8, borderTop: "1px solid #edf2f7", paddingTop: 12 } }, "Insurance Setup"),
            React.createElement("div", null,
                React.createElement("label", { style: c.fl }, "Renewal status"),
                React.createElement("select", { style: c.fi, value: d.renewalStatus || "active", onChange: e => ch("renewalStatus", e.target.value) },
                    React.createElement("option", { value: "active" }, "Active"),
                    React.createElement("option", { value: "in_progress" }, "In Progress"),
                    React.createElement("option", { value: "secured" }, "Secured"),
                    React.createElement("option", { value: "terminated" }, "Terminated"),
                    React.createElement("option", { value: "lost" }, "Lost"))),
            React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: .5, marginBottom: 6 } }, "Policy type \u2014 check all that apply"),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 } },
                React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: d.pkMed || d.pkLife ? "#c0cdd8" : "#0f1c2e", cursor: d.pkMed || d.pkLife ? "not-allowed" : "pointer", background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 8, padding: "7px 10px" } },
                    React.createElement("input", { type: "checkbox", checked: !!d.pkCombined, disabled: d.pkMed || d.pkLife, onChange: e => toggleCombined(e.target.checked), style: { accentColor: "#0fa890", width: 14, height: 14 } }),
                    "Medical & Life"),
                React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: d.pkCombined ? "#c0cdd8" : "#0f1c2e", cursor: d.pkCombined ? "not-allowed" : "pointer", background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 8, padding: "7px 10px" } },
                    React.createElement("input", { type: "checkbox", checked: !!d.pkFamilySep, onChange: e => ch("pkFamilySep", e.target.checked), style: { accentColor: "#0fa890", width: 14, height: 14 } }),
                    "Family Separated Policy"),
                React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: d.pkCombined ? "#c0cdd8" : "#0f1c2e", cursor: d.pkCombined ? "not-allowed" : "pointer", background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 8, padding: "7px 10px" } },
                    React.createElement("input", { type: "checkbox", checked: !!d.pkMed, disabled: d.pkCombined, onChange: e => toggleMed(e.target.checked), style: { accentColor: "#0fa890", width: 14, height: 14 } }),
                    "Medical"),
                React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: d.pkCombined ? "#c0cdd8" : "#0f1c2e", cursor: d.pkCombined ? "not-allowed" : "pointer", background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 8, padding: "7px 10px" } },
                    React.createElement("input", { type: "checkbox", checked: !!d.pkLife, disabled: d.pkCombined, onChange: e => toggleLife(e.target.checked), style: { accentColor: "#0fa890", width: 14, height: 14 } }),
                    "Life")),
            d.pkCombined && React.createElement("div", { style: { background: "#f0fbf6", border: "1px solid #0fa89033", borderRadius: 10, padding: "10px 12px", marginBottom: 10 } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#0fa890", textTransform: "uppercase", letterSpacing: .5, marginBottom: 8 } }, "Medical & Life (combined policy)"),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Risk Carrier"),
                    React.createElement("select", { style: c.fi, value: d.combCarrierId || "", onChange: e => ch("combCarrierId", e.target.value) },
                        React.createElement("option", { value: "" }, "-- Select carrier --"),
                        carriers.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)))),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } },
                    React.createElement("input", { type: "checkbox", id: "ctic", checked: !!d.combTpaIsCarrier, onChange: e => { ch("combTpaIsCarrier", e.target.checked); if (e.target.checked)
                            ch("combTpaId", ""); }, style: { accentColor: "#0fa890", width: 14, height: 14, cursor: "pointer" } }),
                    React.createElement("label", { htmlFor: "ctic", style: { fontSize: 12, color: "#7a9ab5", cursor: "pointer" } }, "Risk Carrier is also the TPA")),
                !d.combTpaIsCarrier && React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "TPA"),
                    React.createElement("select", { style: c.fi, value: d.combTpaId || "", onChange: e => ch("combTpaId", e.target.value) },
                        React.createElement("option", { value: "" }, "-- Select TPA --"),
                        tpas.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)),
                        tpaCar.length > 0 && React.createElement("optgroup", { label: "Carriers acting as TPA" }, tpaCar.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name))))),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "HMO"),
                    React.createElement("select", { style: c.fi, value: d.combHmoId || "", onChange: e => ch("combHmoId", e.target.value) },
                        React.createElement("option", { value: "" }, "-- None --"),
                        hmos.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)))),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Policy number"),
                    React.createElement("input", { style: c.fi, type: "text", value: d.combPolicyNumber || "", onChange: e => ch("combPolicyNumber", e.target.value), placeholder: "POL-2026-00123" })),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Policy start"),
                        React.createElement("input", { style: c.fi, type: "date", value: d.combPolicyStartDate || "", onChange: e => ch("combPolicyStartDate", e.target.value) })),
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Policy end"),
                        React.createElement("input", { style: c.fi, type: "date", value: d.combPolicyEndDate || "", onChange: e => ch("combPolicyEndDate", e.target.value) }))),
                d.combPolicyEndDate && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: -4, marginBottom: 8 } },
                    "Renewal date (auto): ",
                    React.createElement("b", { style: { color: "#0f1c2e" } }, fmtShort(addDaysISO(d.combPolicyEndDate, 1)))),
                React.createElement("div", null,
                    React.createElement("label", { style: noTaxLbl }, "Premium without taxes (EGP)"),
                    React.createElement("input", { style: noTaxIn, type: "number", value: d.combPremiumNoTax || "", onChange: e => ch("combPremiumNoTax", e.target.value), placeholder: "0" }))),
            d.pkMed && React.createElement("div", { style: { background: "#f0f6ff", border: "1px solid #4285f433", borderRadius: 10, padding: "10px 12px", marginBottom: 10 } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#4285f4", textTransform: "uppercase", letterSpacing: .5, marginBottom: 8 } }, "Medical"),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Risk Carrier"),
                    React.createElement("select", { style: c.fi, value: d.medCarrierId || "", onChange: e => ch("medCarrierId", e.target.value) },
                        React.createElement("option", { value: "" }, "-- Select carrier --"),
                        carriers.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)))),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } },
                    React.createElement("input", { type: "checkbox", id: "tic", checked: !!d.tpaIsCarrier, onChange: e => { ch("tpaIsCarrier", e.target.checked); if (e.target.checked)
                            ch("tpaId", ""); }, style: { accentColor: "#0fa890", width: 14, height: 14, cursor: "pointer" } }),
                    React.createElement("label", { htmlFor: "tic", style: { fontSize: 12, color: "#7a9ab5", cursor: "pointer" } }, "Risk Carrier is also the TPA")),
                !d.tpaIsCarrier && React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "TPA"),
                    React.createElement("select", { style: c.fi, value: d.tpaId || "", onChange: e => ch("tpaId", e.target.value) },
                        React.createElement("option", { value: "" }, "-- Select TPA --"),
                        tpas.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)),
                        tpaCar.length > 0 && React.createElement("optgroup", { label: "Carriers acting as TPA" }, tpaCar.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name))))),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "HMO"),
                    React.createElement("select", { style: c.fi, value: d.hmoId || "", onChange: e => ch("hmoId", e.target.value) },
                        React.createElement("option", { value: "" }, "-- None --"),
                        hmos.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)))),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Policy number"),
                    React.createElement("input", { style: c.fi, type: "text", value: d.medPolicyNumber || "", onChange: e => ch("medPolicyNumber", e.target.value), placeholder: "POL-2026-00123" })),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Policy start"),
                        React.createElement("input", { style: c.fi, type: "date", value: d.medPolicyStartDate || "", onChange: e => ch("medPolicyStartDate", e.target.value) })),
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Policy end"),
                        React.createElement("input", { style: c.fi, type: "date", value: d.medPolicyEndDate || "", onChange: e => ch("medPolicyEndDate", e.target.value) }))),
                d.medPolicyEndDate && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: -4, marginBottom: 8 } },
                    "Renewal date (auto): ",
                    React.createElement("b", { style: { color: "#0f1c2e" } }, fmtShort(addDaysISO(d.medPolicyEndDate, 1)))),
                React.createElement("div", null,
                    React.createElement("label", { style: noTaxLbl }, "Premium without taxes (EGP)"),
                    React.createElement("input", { style: noTaxIn, type: "number", value: d.medPremiumNoTax || "", onChange: e => ch("medPremiumNoTax", e.target.value), placeholder: "0" }))),
            d.pkLife && React.createElement("div", { style: { background: "#f9f5ff", border: "1px solid #9333ea33", borderRadius: 10, padding: "10px 12px", marginBottom: 10 } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#9333ea", textTransform: "uppercase", letterSpacing: .5, marginBottom: 8 } }, "Life"),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Risk Carrier"),
                    React.createElement("select", { style: c.fi, value: d.lifeCarrierId || "", onChange: e => ch("lifeCarrierId", e.target.value) },
                        React.createElement("option", { value: "" }, "-- Select carrier --"),
                        carriers.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)))),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Policy number"),
                    React.createElement("input", { style: c.fi, type: "text", value: d.lifePolicyNumber || "", onChange: e => ch("lifePolicyNumber", e.target.value), placeholder: "POL-2026-00456" })),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Policy start"),
                        React.createElement("input", { style: c.fi, type: "date", value: d.lifePolicyStartDate || "", onChange: e => ch("lifePolicyStartDate", e.target.value) })),
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Policy end"),
                        React.createElement("input", { style: c.fi, type: "date", value: d.lifePolicyEndDate || "", onChange: e => ch("lifePolicyEndDate", e.target.value) }))),
                d.lifePolicyEndDate && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: -4, marginBottom: 8 } },
                    "Renewal date (auto): ",
                    React.createElement("b", { style: { color: "#0f1c2e" } }, fmtShort(addDaysISO(d.lifePolicyEndDate, 1)))),
                React.createElement("div", null,
                    React.createElement("label", { style: noTaxLbl }, "Premium without taxes (EGP)"),
                    React.createElement("input", { style: noTaxIn, type: "number", value: d.lifePremiumNoTax || "", onChange: e => ch("lifePremiumNoTax", e.target.value), placeholder: "0" }))),
            d.pkFamilySep && React.createElement("div", { style: { background: "#fff8ef", border: "1px solid #d4880a33", borderRadius: 10, padding: "10px 12px", marginBottom: 10 } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#d4880a", textTransform: "uppercase", letterSpacing: .5, marginBottom: 8 } }, "Family Separated Policy"),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Risk Carrier"),
                    React.createElement("select", { style: c.fi, value: d.famCarrierId || "", onChange: e => ch("famCarrierId", e.target.value) },
                        React.createElement("option", { value: "" }, "-- Select carrier --"),
                        carriers.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)))),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } },
                    React.createElement("input", { type: "checkbox", id: "ftic", checked: !!d.famTpaIsCarrier, onChange: e => { ch("famTpaIsCarrier", e.target.checked); if (e.target.checked)
                            ch("famTpaId", ""); }, style: { accentColor: "#0fa890", width: 14, height: 14, cursor: "pointer" } }),
                    React.createElement("label", { htmlFor: "ftic", style: { fontSize: 12, color: "#7a9ab5", cursor: "pointer" } }, "Risk Carrier is also the TPA")),
                !d.famTpaIsCarrier && React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "TPA"),
                    React.createElement("select", { style: c.fi, value: d.famTpaId || "", onChange: e => ch("famTpaId", e.target.value) },
                        React.createElement("option", { value: "" }, "-- Select TPA --"),
                        tpas.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)),
                        tpaCar.length > 0 && React.createElement("optgroup", { label: "Carriers acting as TPA" }, tpaCar.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name))))),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "HMO"),
                    React.createElement("select", { style: c.fi, value: d.famHmoId || "", onChange: e => ch("famHmoId", e.target.value) },
                        React.createElement("option", { value: "" }, "-- None --"),
                        hmos.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)))),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Policy number"),
                    React.createElement("input", { style: c.fi, type: "text", value: d.famPolicyNumber || "", onChange: e => ch("famPolicyNumber", e.target.value), placeholder: "POL-2026-00789-FAM" })),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Policy start"),
                        React.createElement("input", { style: c.fi, type: "date", value: d.famPolicyStartDate || "", onChange: e => ch("famPolicyStartDate", e.target.value) })),
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Policy end"),
                        React.createElement("input", { style: c.fi, type: "date", value: d.famPolicyEndDate || "", onChange: e => ch("famPolicyEndDate", e.target.value) }))),
                d.famPolicyEndDate && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: -4, marginBottom: 8 } },
                    "Renewal date (auto): ",
                    React.createElement("b", { style: { color: "#0f1c2e" } }, fmtShort(addDaysISO(d.famPolicyEndDate, 1)))),
                React.createElement("div", null,
                    React.createElement("label", { style: noTaxLbl }, "Premium without taxes (EGP)"),
                    React.createElement("input", { style: noTaxIn, type: "number", value: d.famPremiumNoTax || "", onChange: e => ch("famPremiumNoTax", e.target.value), placeholder: "0" }))),
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#0fa890", margin: "12px 0 8px", textTransform: "uppercase", letterSpacing: .8, borderTop: "1px solid #edf2f7", paddingTop: 12 } }, "Payment Details"),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: showMed && showLife ? "1fr 1fr" : "1fr", gap: 10 } },
                showMed && React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Medical premium with taxes (EGP)"),
                    React.createElement("input", { style: c.fi, type: "number", value: d.medTotal || "", onChange: e => ch("medTotal", e.target.value), placeholder: "0" })),
                showLife && React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Life premium with taxes (EGP)"),
                    React.createElement("input", { style: c.fi, type: "number", value: d.lifeTotal || "", onChange: e => ch("lifeTotal", e.target.value), placeholder: "0" }))),
            total > 0 && React.createElement("div", { style: { background: "#e8faf8", border: "1px solid #5dd8c844", borderRadius: 10, padding: "10px 14px", marginBottom: 10 } },
                React.createElement("div", { style: { display: "flex", gap: 14, flexWrap: "wrap" } },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", fontWeight: 700, textTransform: "uppercase" } }, "Annual total (auto-summed)"),
                        React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: "#0fa890", fontFamily: "'Clash Display',sans-serif" } }, fmtCurrency(total))),
                    perAdh > 0 && React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", fontWeight: 700, textTransform: "uppercase" } }, "Per adherent"),
                        React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: "#0fa890", fontFamily: "'Clash Display',sans-serif" } }, fmtCurrency(perAdh))),
                    cycle > 0 && React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", fontWeight: 700, textTransform: "uppercase" } },
                            "Per ",
                            ci.label,
                            " cycle"),
                        React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: "#4285f4", fontFamily: "'Clash Display',sans-serif" } }, fmtCurrency(cycle))))),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Frequency"),
                    React.createElement("select", { style: c.fi, value: d.frequency || "quarterly", onChange: e => ch("frequency", e.target.value) },
                        React.createElement("option", { value: "quarterly" }, "Quarterly"),
                        React.createElement("option", { value: "semi-annually" }, "Semi-Annually"),
                        React.createElement("option", { value: "annually" }, "Annually"))),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Payment method"),
                    React.createElement("select", { style: c.fi, value: d.method || "wire", onChange: e => ch("method", e.target.value) },
                        React.createElement("option", { value: "wire" }, "Wire Transfer"),
                        React.createElement("option", { value: "cheque" }, "Cheque")))),
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#9333ea", margin: "12px 0 8px", textTransform: "uppercase", letterSpacing: .8, borderTop: "1px solid #edf2f7", paddingTop: 12 } }, "Account Memory"),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Preferred contact"),
                    React.createElement("select", { style: c.fi, value: d.memContact || "email", onChange: e => ch("memContact", e.target.value) },
                        React.createElement("option", { value: "email" }, "Email"),
                        React.createElement("option", { value: "phone" }, "Phone"),
                        React.createElement("option", { value: "whatsapp" }, "WhatsApp"))),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Communication style"),
                    React.createElement("select", { style: c.fi, value: d.memStyle || "formal", onChange: e => ch("memStyle", e.target.value) },
                        React.createElement("option", { value: "formal" }, "Formal"),
                        React.createElement("option", { value: "semi-formal" }, "Semi-formal"),
                        React.createElement("option", { value: "casual" }, "Casual")))),
            React.createElement("div", null,
                React.createElement("label", { style: c.fl }, "Open issues"),
                React.createElement("textarea", { style: { ...c.fi, minHeight: 50, resize: "vertical" }, value: d.memIssues || "", onChange: e => ch("memIssues", e.target.value), placeholder: "Pending claims, outstanding items..." })),
            React.createElement("div", null,
                React.createElement("label", { style: c.fl }, "Historical notes"),
                React.createElement("textarea", { style: { ...c.fi, minHeight: 50, resize: "vertical" }, value: d.memNotes || "", onChange: e => ch("memNotes", e.target.value), placeholder: "Key history, preferences..." })),
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", margin: "12px 0 8px", textTransform: "uppercase", letterSpacing: .8, borderTop: "1px solid #edf2f7", paddingTop: 12 } }, "Points of Contact (up to 3)"),
            [1, 2, 3].map(i => React.createElement("div", { key: i, style: { background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 10, padding: "10px 12px", marginBottom: 10 } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#4285f4", textTransform: "uppercase", letterSpacing: .5, marginBottom: 8 } },
                    "Contact ",
                    i,
                    i === 1 ? " (Primary)" : ""),
                [["Name", "pn" + i, "text"], ["Title", "pt" + i, "text"], ["Phone", "pp" + i, "text"], ["Email", "pe" + i, "email"], ["Email thread link", "pu" + i, "url"]].map(([lb, k, t]) => React.createElement("div", { key: k },
                    React.createElement("label", { style: c.fl }, lb),
                    React.createElement("input", { style: { ...c.fi, marginBottom: 4 }, type: t, value: d[k] || "", onChange: e => ch(k, e.target.value), placeholder: k.startsWith("pu") ? "https://mail.google.com/..." : "" }))))),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 10 } },
                React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                React.createElement("button", { style: c.sv, onClick: onSave }, "Save"))));
});
const CalModal = memo(({ day, accounts, ct, ch, onSave, onClose }) => React.createElement("div", { style: c.modal },
    React.createElement("div", { style: { ...c.mBox, width: 420 } },
        React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 4, fontFamily: "'Clash Display',sans-serif" } }, "Add Task"),
        React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginBottom: 16 } }, fmtD(day)),
        React.createElement("label", { style: c.fl }, "Task"),
        React.createElement("input", { style: c.fi, placeholder: "e.g. Call HR...", value: ct.text || "", onChange: e => ch("text", e.target.value), onKeyDown: e => e.key === "Enter" && onSave(), autoFocus: true }),
        React.createElement("label", { style: c.fl }, "Time (optional)"),
        React.createElement("select", { style: c.fi, value: ct.time || "", onChange: e => ch("time", e.target.value) },
            React.createElement("option", { value: "" }, "No time"),
            TIME_SLOTS.map(s => React.createElement("option", { key: s.value, value: s.value }, s.label))),
        React.createElement("label", { style: c.fl }, "Account"),
        React.createElement("select", { style: c.fi, value: ct.accId || "", onChange: e => ch("accId", e.target.value) },
            React.createElement("option", { value: "" }, "-- Select --"),
            accounts.map(a => React.createElement("option", { key: a.id, value: a.id }, a.name))),
        React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 } },
            React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
            React.createElement("button", { style: { ...c.sv, opacity: !ct.text?.trim() || !ct.accId ? 0.5 : 1 }, onClick: onSave, disabled: !ct.text?.trim() || !ct.accId }, "Add")))));
const TaskActModal = memo(({ mode, task, accounts, accId, onClose, onSubmit }) => { const [val, setVal] = useState(""), [sel, setSel] = useState(String(accId || "")), [time, setTime] = useState(""); if (mode === "update")
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 420 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 4, fontFamily: "'Clash Display',sans-serif" } }, "Update Task"),
            React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginBottom: 14 } }, task.text),
            React.createElement("textarea", { style: c.ni, placeholder: "What's the update?", value: val, onChange: e => setVal(e.target.value), autoFocus: true }),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 10 } },
                React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                React.createElement("button", { style: c.sv, onClick: () => val.trim() && onSubmit(val) }, "Save")))); return React.createElement("div", { style: c.modal },
    React.createElement("div", { style: { ...c.mBox, width: 420 } },
        React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 4, fontFamily: "'Clash Display',sans-serif" } }, "Add Related Task"),
        React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginBottom: 14 } },
            "Related to: ",
            task.text),
        React.createElement("label", { style: c.fl }, "New task"),
        React.createElement("input", { style: c.fi, placeholder: "Describe...", value: val, onChange: e => setVal(e.target.value), autoFocus: true }),
        React.createElement("label", { style: c.fl }, "Time"),
        React.createElement("select", { style: c.fi, value: time, onChange: e => setTime(e.target.value) },
            React.createElement("option", { value: "" }, "No time"),
            TIME_SLOTS.map(s => React.createElement("option", { key: s.value, value: s.value }, s.label))),
        React.createElement("label", { style: c.fl }, "Account"),
        React.createElement("select", { style: c.fi, value: sel, onChange: e => setSel(e.target.value) }, accounts.map(a => React.createElement("option", { key: a.id, value: a.id }, a.name))),
        React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 10 } },
            React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
            React.createElement("button", { style: c.sv, onClick: () => val.trim() && onSubmit(val, parseInt(sel), time) }, "Add")))); });
const DESC_OPTIONS = ["Alteration", "Reconciliation", "Other"];
function DescPicker({ value, onChange, placeholder }) {
    const isOther = value === "Other" || !DESC_OPTIONS.slice(0, -1).includes(value) && value !== "";
    const selectVal = isOther ? "Other" : value;
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4 } },
        React.createElement("select", { style: c.fi, value: selectVal, onChange: e => { if (e.target.value === "Other")
                onChange("Other");
            else
                onChange(e.target.value); } },
            React.createElement("option", { value: "" }, "\u2014 Select description \u2014"),
            DESC_OPTIONS.map(o => React.createElement("option", { key: o, value: o }, o))),
        selectVal === "Other" && React.createElement("input", { style: c.fi, value: value === "Other" ? "" : value, onChange: e => onChange(e.target.value || "Other"), placeholder: "Describe the reason...", autoFocus: true }));
}
function InvoiceBreakdownModal({ acc, cycleKey, cycleAmt, cycleMed, cycleLife, ci, onConfirm, onClose }) {
    const [outstanding, setOutstanding] = useState([]);
    const [credits, setCredits] = useState([]);
    const [pops, setPops] = useState([]);
    const [extracting, setExtracting] = useState(false);
    const [oDesc, setODesc] = useState("");
    const [oAmt, setOAmt] = useState("");
    const [cDesc, setCDesc] = useState("");
    const [cAmt, setCmtAmt] = useState("");
    const [addO, setAddO] = useState(false);
    const [addC, setAddC] = useState(false);
    const [step, setStep] = useState("form");
    const popRef = useRef(null);
    const MAX_POPS = 3;
    const [breakdownFileName, setBreakdownFileName] = useState(null);
    const [breakdownBuf, setBreakdownBuf] = useState(null);
    const [breakdownParsing, setBreakdownParsing] = useState(false);
    const [breakdownError, setBreakdownError] = useState(null);
    const [breakdownInfo, setBreakdownInfo] = useState(null);
    const [breakdownApplied, setBreakdownApplied] = useState(false);
    const [breakdownNeedsPassword, setBreakdownNeedsPassword] = useState(false);
    const [breakdownPassword, setBreakdownPassword] = useState("");
    const [showBreakdownPass, setShowBreakdownPass] = useState(false);
    const breakdownRef = useRef(null);
    const totalOut = outstanding.reduce((s, x) => s + x.amount, 0);
    const totalCred = credits.reduce((s, x) => s + x.amount, 0);
    const finalAmt = cycleAmt + totalOut - totalCred;
    function resolveDesc(raw) { return raw === "Other" || raw === "" ? "Other" : raw; }
    async function runBreakdownParse(buf, pwd) {
        try {
            let result = await parseBreakdownWorkbook(buf, pwd);
            if (result.needsPassword) {
                const auto = acc.policyNumber ? await parseBreakdownWorkbook(buf, String(acc.policyNumber).trim()) : null;
                if (auto && !auto.needsPassword && !auto.wrongPassword && !auto.error) {
                    result = auto;
                }
                else {
                    setBreakdownParsing(false);
                    setBreakdownNeedsPassword(true);
                    return;
                }
            }
            if (result.wrongPassword) {
                setBreakdownParsing(false);
                setBreakdownError("Incorrect password. Please try again.");
                return;
            }
            if (result.error) {
                setBreakdownParsing(false);
                setBreakdownError(result.error);
                return;
            }
            setBreakdownParsing(false);
            setBreakdownNeedsPassword(false);
            setBreakdownInfo(result);
        }
        catch (err) {
            setBreakdownParsing(false);
            setBreakdownError("Error: " + err.message);
        }
    }
    async function handleBreakdownFile(e) { const f = e.target.files[0]; if (!f)
        return; setBreakdownFileName(f.name); setBreakdownError(null); setBreakdownNeedsPassword(false); setBreakdownInfo(null); setBreakdownApplied(false); setBreakdownParsing(true); const buf = await f.arrayBuffer(); setBreakdownBuf(buf); await runBreakdownParse(buf, null); if (breakdownRef.current)
        breakdownRef.current.value = ""; }
    async function handleBreakdownPasswordSubmit() { if (!breakdownBuf || !breakdownPassword.trim())
        return; setBreakdownParsing(true); await runBreakdownParse(breakdownBuf, breakdownPassword.trim()); }
    function applyBreakdown() { if (!breakdownInfo)
        return; const { carrier, additions, deletions, finalTotal } = breakdownInfo; const newOut = [...outstanding], newCred = [...credits]; if (additions > 0.01)
        newOut.push({ desc: `Breakdown Additions — ${carrier}`, amount: Math.round(additions * 100) / 100 }); if (deletions > 0.01)
        newCred.push({ desc: `Breakdown Deletions — ${carrier}`, amount: Math.round(deletions * 100) / 100 }); if (finalTotal !== null && finalTotal !== undefined) {
        const projected = cycleAmt + newOut.reduce((s, x) => s + x.amount, 0) - newCred.reduce((s, x) => s + x.amount, 0);
        const residual = Math.round((finalTotal - projected) * 100) / 100;
        if (Math.abs(residual) > 0.5) {
            if (residual > 0)
                newOut.push({ desc: `Breakdown Fees / Reconciliation — ${carrier}`, amount: residual });
            else
                newCred.push({ desc: `Breakdown Fees / Reconciliation — ${carrier}`, amount: Math.abs(residual) });
        }
    } setOutstanding(newOut); setCredits(newCred); setBreakdownApplied(true); }
    function addOutstanding() { const v = parseFloat(oAmt); if (!v || v <= 0)
        return; const desc = oDesc && oDesc !== "Other" ? oDesc : "Outstanding"; setOutstanding(p => [...p, { desc, amount: v }]); setOAmt(""); setODesc(""); setAddO(false); }
    function addCredit() { const v = parseFloat(cAmt); if (!v || v <= 0)
        return; const desc = cDesc && cDesc !== "Other" ? cDesc : "Credit"; setCredits(p => [...p, { desc, amount: v }]); setCmtAmt(""); setCDesc(""); setAddC(false); }
    async function handlePOP(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length)
            return;
        const toAdd = files.slice(0, MAX_POPS - pops.length);
        if (!toAdd.length)
            return;
        setExtracting(true);
        for (const file of toAdd) {
            const b64 = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result.split(",")[1]); r.onerror = () => rej(); r.readAsDataURL(file); });
            if (pops.length === 0 && toAdd.indexOf(file) === 0) {
                try {
                    const isImg = file.type.startsWith("image/");
                    const data = await callClaudeAPI([isImg ? { type: "image", source: { type: "base64", media_type: file.type, data: b64 } } : { type: "document", source: { type: "base64", media_type: "application/pdf", data: b64 } }, { type: "text", text: 'Extract the total payment amount from this proof of payment. Return ONLY JSON: {"amount":12345.67} — numbers only, no currency symbol, no preamble.' }], 200);
                    const txt = (data.content || []).map(b => b.text || "").join("").replace(/```json|```/g, "").trim();
                    const parsed = JSON.parse(txt);
                    if (parsed.amount && parsed.amount > 0) {
                        const diff = parsed.amount - cycleAmt;
                        if (Math.abs(diff) > 1) {
                            if (diff > 0)
                                setOutstanding(p => [...p, { desc: "POP Amount Difference", amount: diff }]);
                            else
                                setCredits(p => [...p, { desc: "POP Amount Difference", amount: Math.abs(diff) }]);
                        }
                    }
                }
                catch { }
            }
            setPops(p => [...p, { b64, name: file.name }]);
        }
        setExtracting(false);
        if (popRef.current)
            popRef.current.value = "";
    }
    const dateLabel = cycleKey ? new Date(cycleKey).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
    function handleConfirmClick() { if (pops.length > 0)
        setStep("popReminder");
    else
        onConfirm({ finalAmt, outstanding, credits, pops, popB64: pops[0]?.b64 || null, popName: pops[0]?.name || null, cycleKey }); }
    if (step === "popReminder") {
        return React.createElement("div", { style: c.modal },
            React.createElement("div", { style: { ...c.mBox, width: 460, textAlign: "center", padding: "2.2rem 1.8rem" } },
                React.createElement("div", { style: { width: 64, height: 64, margin: "0 auto 18px", borderRadius: "50%", background: "linear-gradient(135deg,#e8faf8,#e8f0fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 } }, React.createElement(Ic, { name: "checkCircle" })),
                React.createElement("div", { style: { fontSize: 17, fontWeight: 700, fontFamily: "'Clash Display',sans-serif", color: "#0f1c2e", marginBottom: 6 } },
                    "Payment Confirmed! ",
                    React.createElement(Ic, { name: "celebrate" })),
                React.createElement("div", { style: { fontSize: 13, color: "#4a6080", lineHeight: 1.7, marginBottom: 20 } }, "Don't forget to share the POP with the Insurer to confirm the Payment :)"),
                pops.length > 0 && React.createElement("div", { style: { background: "#f0f6ff", border: "1px solid #4285f422", borderRadius: 10, padding: "10px 14px", marginBottom: 16, textAlign: "left" } },
                    React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#4285f4", textTransform: "uppercase", letterSpacing: .7, marginBottom: 6 } },
                        React.createElement(Ic, { name: "paperclip" }),
                        " Attached POP Files"),
                    pops.map((p, i) => React.createElement("div", { key: i, style: { fontSize: 12, color: "#4285f4", fontWeight: 600, marginBottom: 3 } },
                        "\u2022 ",
                        p.name))),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
                    React.createElement("button", { style: { ...c.sv, background: "linear-gradient(135deg,#0fa890,#4285f4)", border: "none", padding: "10px 28px", fontSize: 13 }, onClick: () => onConfirm({ finalAmt, outstanding, credits, pops, popB64: pops[0]?.b64 || null, popName: pops[0]?.name || null, cycleKey }) }, "Got it \u2713"),
                    React.createElement("div", { style: { display: "flex", gap: 8 } },
                        React.createElement("button", { onClick: () => window.open("https://drive.google.com/drive/folders/1e4mlDUvMYfuUspf0QJAyEf9mh6a0lCRb", "_blank", "noopener"), style: { flex: 1, background: "#f0f6ff", border: "1px solid #4285f433", borderRadius: 9, padding: "9px 12px", fontSize: 11, fontWeight: 700, color: "#4285f4", cursor: "pointer" } },
                            React.createElement(Ic, { name: "folder" }),
                            " Open Drive"),
                        React.createElement("button", { onClick: () => window.open("https://docs.google.com/spreadsheets/d/1judfMLHUp5n4Jfn1ztSMZ5UBa-ZT_CF1L2z6PncWioI/edit?gid=2120157451#gid=2120157451", "_blank", "noopener"), style: { flex: 1, background: "#f0fff8", border: "1px solid #0fa89033", borderRadius: 9, padding: "9px 12px", fontSize: 11, fontWeight: 700, color: "#0fa890", cursor: "pointer" } },
                            React.createElement(Ic, { name: "chart" }),
                            " Open Invoices Sheet")))));
    }
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 540, maxHeight: "92vh", overflowY: "auto" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #edf2f7" } },
                React.createElement("div", { style: { width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg,#0fa890,#4285f4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 } }, React.createElement(Ic, { name: "receipt" })),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Invoice Breakdown"),
                    React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } },
                        acc.name,
                        " \u2014 ",
                        ci.label,
                        " Payment \u00B7 ",
                        dateLabel)),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: onClose }, "\u00D7")),
            React.createElement("div", { style: { background: "#f9f5ff", border: "1.5px dashed #9333ea44", borderRadius: 12, padding: "12px 15px", marginBottom: 12 } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 } },
                    React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#9333ea", textTransform: "uppercase", letterSpacing: .7 } },
                        React.createElement(Ic, { name: "inbox" }),
                        " Insert Breakdown"),
                    React.createElement("button", { style: { ...c.sv, background: "#9333ea", fontSize: 11, padding: "5px 13px" }, onClick: () => breakdownRef.current?.click(), disabled: breakdownParsing }, breakdownParsing ? "Reading..." : breakdownFileName ? "Replace File" : "Upload Breakdown")),
                React.createElement("input", { ref: breakdownRef, type: "file", accept: ".xlsx,.xls,.xlsm", style: { display: "none" }, onChange: handleBreakdownFile }),
                !breakdownFileName && React.createElement("div", { style: { fontSize: 11, color: "#a0b8cc", fontStyle: "italic" } }, "Upload the carrier's breakdown sheet (GIG / AXA / MetLife / Sarwa Life...) to auto-calculate additions & deletions and match this cycle's invoice total."),
                breakdownFileName && React.createElement("div", { style: { fontSize: 12, color: "#9333ea", fontWeight: 600 } },
                    React.createElement(Ic, { name: "document" }),
                    " ",
                    breakdownFileName),
                breakdownNeedsPassword && React.createElement("div", { style: { marginTop: 8, display: "flex", gap: 7, alignItems: "flex-end" } },
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("label", { style: c.fl }, "File Password"),
                        React.createElement("div", { style: { position: "relative" } },
                            React.createElement("input", { style: { ...c.fi, marginBottom: 0, paddingRight: 36 }, type: showBreakdownPass ? "text" : "password", value: breakdownPassword, onChange: e => setBreakdownPassword(e.target.value), placeholder: "Enter password", onKeyDown: e => e.key === "Enter" && handleBreakdownPasswordSubmit() }),
                            React.createElement("button", { type: "button", onClick: () => setShowBreakdownPass(s => !s), style: { position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", fontSize: 12, color: "#9333ea", cursor: "pointer" } }, showBreakdownPass ? "Hide" : "Show"))),
                    React.createElement("button", { style: c.sv, onClick: handleBreakdownPasswordSubmit, disabled: breakdownParsing }, breakdownParsing ? "..." : "Unlock")),
                breakdownError && React.createElement("div", { style: { fontSize: 11, color: "#e0392e", marginTop: 6 } },
                    React.createElement(Ic, { name: "warning" }),
                    " ",
                    breakdownError),
                breakdownInfo && !breakdownApplied && React.createElement("div", { style: { marginTop: 8, background: "#fff", border: "1px solid #9333ea33", borderRadius: 9, padding: "9px 12px" } },
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#9333ea", marginBottom: 5 } },
                        breakdownInfo.carrier,
                        " format detected \u2014 sheet \"",
                        breakdownInfo.sheetName,
                        "\""),
                    React.createElement("div", { style: { fontSize: 11, color: "#4a6080", marginBottom: 2 } },
                        "Additions: ",
                        React.createElement("b", { style: { color: "#d4880a" } },
                            "+",
                            fmtCurrency(breakdownInfo.additions)),
                        " \u00B7 Deletions: ",
                        React.createElement("b", { style: { color: "#0a8a6a" } },
                            "\u2212",
                            fmtCurrency(breakdownInfo.deletions))),
                    breakdownInfo.finalTotal != null && React.createElement("div", { style: { fontSize: 11, color: "#4a6080", marginBottom: 2 } },
                        breakdownInfo.isCycleSplit ? "This cycle's amount" : "Carrier's stated total",
                        ": ",
                        React.createElement("b", null, fmtCurrency(breakdownInfo.finalTotal))),
                    breakdownInfo.annualTotal != null && React.createElement("div", { style: { fontSize: 10, color: "#a0b8cc", marginBottom: 7 } },
                        "(Annual total for cross-check only, not invoiced: ",
                        fmtCurrency(breakdownInfo.annualTotal),
                        ")"),
                    React.createElement("button", { style: { ...c.sv, background: "#9333ea", fontSize: 11, padding: "6px 14px" }, onClick: applyBreakdown }, "\u2713 Apply to Invoice")),
                breakdownApplied && React.createElement("div", { style: { marginTop: 8, fontSize: 11, color: "#0a8a6a", fontWeight: 700 } }, "\u2713 Breakdown applied \u2014 additions, deletions & reconciliation added below.")),
            React.createElement("div", { style: { background: "#f7fbff", border: "1px solid #dde8f0", borderRadius: 12, padding: "13px 15px", marginBottom: 12 } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: .7, marginBottom: 10 } },
                    "Base Premium (",
                    ci.label,
                    ")"),
                React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 } },
                    cycleMed > 0 && React.createElement("div", { style: { flex: 1, background: "#fff", border: "1.5px solid #4285f433", borderRadius: 9, padding: "8px 12px" } },
                        React.createElement("div", { style: { fontSize: 9, color: "#4285f4", fontWeight: 700, textTransform: "uppercase" } }, "Medical"),
                        React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: "#4285f4", fontFamily: "'Clash Display',sans-serif" } }, fmtCurrency(cycleMed))),
                    cycleLife > 0 && React.createElement("div", { style: { flex: 1, background: "#fff", border: "1.5px solid #9333ea33", borderRadius: 9, padding: "8px 12px" } },
                        React.createElement("div", { style: { fontSize: 9, color: "#9333ea", fontWeight: 700, textTransform: "uppercase" } }, "Life"),
                        React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: "#9333ea", fontFamily: "'Clash Display',sans-serif" } }, fmtCurrency(cycleLife))),
                    React.createElement("div", { style: { flex: 1, background: "#fff", border: "1.5px solid #0fa89033", borderRadius: 9, padding: "8px 12px" } },
                        React.createElement("div", { style: { fontSize: 9, color: "#0fa890", fontWeight: 700, textTransform: "uppercase" } }, "Total Base"),
                        React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: "#0fa890", fontFamily: "'Clash Display',sans-serif" } }, fmtCurrency(cycleAmt))))),
            React.createElement("div", { style: { background: "#fffbf0", border: "1px solid #d4880a33", borderRadius: 12, padding: "12px 15px", marginBottom: 10 } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: outstanding.length > 0 ? 10 : 0 } },
                    React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#d4880a", textTransform: "uppercase", letterSpacing: .7 } }, "\u2B06 Outstanding Amounts"),
                    React.createElement("button", { style: { ...c.aBtn, fontSize: 10, padding: "3px 9px", borderColor: "#d4880a44", color: "#d4880a", background: "#fff" }, onClick: () => { setAddO(true); setAddC(false); } }, "+ Add")),
                outstanding.map((o, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "1px solid #d4880a33", borderRadius: 8, padding: "7px 11px", marginBottom: 6 } },
                    React.createElement("span", { style: { fontSize: 12, color: "#0f1c2e" } }, o.desc),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                        React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#d4880a" } },
                            "+",
                            fmtCurrency(o.amount)),
                        React.createElement("button", { onClick: () => setOutstanding(p => p.filter((_, j) => j !== i)), style: { background: "none", border: "none", color: "#c0cdd8", cursor: "pointer", fontSize: 15, lineHeight: 1, padding: 0 } }, "\u00D7")))),
                addO && React.createElement("div", { style: { marginTop: 8, display: "flex", flexDirection: "column", gap: 7 } },
                    React.createElement("div", { style: { display: "flex", gap: 7, flexWrap: "wrap", alignItems: "flex-end" } },
                        React.createElement("div", { style: { flex: 2, minWidth: 140 } },
                            React.createElement("label", { style: c.fl }, "Description"),
                            React.createElement(DescPicker, { value: oDesc, onChange: setODesc })),
                        React.createElement("div", { style: { flex: 1, minWidth: 90 } },
                            React.createElement("label", { style: c.fl }, "Amount (EGP)"),
                            React.createElement("input", { style: c.fi, type: "number", value: oAmt, onChange: e => setOAmt(e.target.value), placeholder: "0.00", onKeyDown: e => e.key === "Enter" && addOutstanding() }))),
                    React.createElement("div", { style: { display: "flex", gap: 5, justifyContent: "flex-end" } },
                        React.createElement("button", { style: c.sv, onClick: addOutstanding }, "Add"),
                        React.createElement("button", { style: c.cBtn, onClick: () => { setAddO(false); setODesc(""); setOAmt(""); } }, "\u2715"))),
                outstanding.length === 0 && !addO && React.createElement("div", { style: { fontSize: 11, color: "#d4880a88", fontStyle: "italic" } }, "No outstanding amounts \u2014 click + Add to include alterations or reconciliations.")),
            React.createElement("div", { style: { background: "#f0fff8", border: "1px solid #0fa89033", borderRadius: 12, padding: "12px 15px", marginBottom: 10 } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: credits.length > 0 ? 10 : 0 } },
                    React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#0a8a6a", textTransform: "uppercase", letterSpacing: .7 } }, "\u2B07 Credit Notes"),
                    React.createElement("button", { style: { ...c.aBtn, fontSize: 10, padding: "3px 9px", borderColor: "#0fa89044", color: "#0a8a6a", background: "#fff" }, onClick: () => { setAddC(true); setAddO(false); } }, "+ Add")),
                credits.map((cr, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "1px solid #0fa89033", borderRadius: 8, padding: "7px 11px", marginBottom: 6 } },
                    React.createElement("span", { style: { fontSize: 12, color: "#0f1c2e" } }, cr.desc),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                        React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#0a8a6a" } },
                            "\u2212",
                            fmtCurrency(cr.amount)),
                        React.createElement("button", { onClick: () => setCredits(p => p.filter((_, j) => j !== i)), style: { background: "none", border: "none", color: "#c0cdd8", cursor: "pointer", fontSize: 15, lineHeight: 1, padding: 0 } }, "\u00D7")))),
                addC && React.createElement("div", { style: { marginTop: 8, display: "flex", flexDirection: "column", gap: 7 } },
                    React.createElement("div", { style: { display: "flex", gap: 7, flexWrap: "wrap", alignItems: "flex-end" } },
                        React.createElement("div", { style: { flex: 2, minWidth: 140 } },
                            React.createElement("label", { style: c.fl }, "Description"),
                            React.createElement(DescPicker, { value: cDesc, onChange: setCDesc })),
                        React.createElement("div", { style: { flex: 1, minWidth: 90 } },
                            React.createElement("label", { style: c.fl }, "Amount (EGP)"),
                            React.createElement("input", { style: c.fi, type: "number", value: cAmt, onChange: e => setCmtAmt(e.target.value), placeholder: "0.00", onKeyDown: e => e.key === "Enter" && addCredit() }))),
                    React.createElement("div", { style: { display: "flex", gap: 5, justifyContent: "flex-end" } },
                        React.createElement("button", { style: c.sv, onClick: addCredit }, "Add"),
                        React.createElement("button", { style: c.cBtn, onClick: () => { setAddC(false); setCDesc(""); setCmtAmt(""); } }, "\u2715"))),
                credits.length === 0 && !addC && React.createElement("div", { style: { fontSize: 11, color: "#0fa89088", fontStyle: "italic" } }, "No credit notes \u2014 click + Add to apply discounts or reconciliations.")),
            React.createElement("div", { style: { background: "#f0f6ff", border: "1.5px dashed #4285f444", borderRadius: 12, padding: "12px 15px", marginBottom: 14 } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 } },
                    React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#4285f4", textTransform: "uppercase", letterSpacing: .7 } },
                        React.createElement(Ic, { name: "paperclip" }),
                        " Upload POP / ACH ",
                        React.createElement("span", { style: { fontWeight: 400, textTransform: "none", fontSize: 9, color: "#a0b8cc" } },
                            "(",
                            pops.length,
                            "/",
                            MAX_POPS,
                            " files)")),
                    pops.length < MAX_POPS && React.createElement("button", { style: { ...c.sv, background: "#4285f4", fontSize: 11, padding: "5px 13px" }, onClick: () => popRef.current?.click(), disabled: extracting }, extracting ? "Reading..." : "+ Add File")),
                React.createElement("input", { ref: popRef, type: "file", accept: ".pdf,.png,.jpg,.jpeg", multiple: true, style: { display: "none" }, onChange: handlePOP }),
                pops.length === 0 && !extracting && React.createElement("div", { style: { fontSize: 11, color: "#a0b8cc", fontStyle: "italic" } }, "No POP attached yet \u2014 add up to 3 files (PDF, PNG, JPG)."),
                pops.map((pop, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, background: "#e8f0fe", border: "1px solid #4285f433", borderRadius: 8, padding: "6px 10px", marginBottom: 5 } },
                    React.createElement("span", { style: { fontSize: 12, color: "#4285f4", fontWeight: 600, flex: 1 } },
                        React.createElement(Ic, { name: "document" }),
                        " ",
                        pop.name),
                    React.createElement("button", { onClick: () => setPops(p => p.filter((_, j) => j !== i)), style: { background: "none", border: "none", color: "#c0cdd8", cursor: "pointer", fontSize: 15, lineHeight: 1, padding: 0 } }, "\u00D7"))),
                extracting && React.createElement("div", { style: { marginTop: 7, display: "flex", alignItems: "center", gap: 7 } },
                    React.createElement("div", { style: { width: 13, height: 13, borderRadius: "50%", border: "3px solid #e8f0fe", borderTopColor: "#4285f4", animation: "spinSlow .8s linear infinite" } }),
                    React.createElement("span", { style: { fontSize: 11, color: "#4285f4" } }, "Extracting amount from document...")),
                pops.length >= MAX_POPS && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: 5 } },
                    "\u2713 Maximum ",
                    MAX_POPS,
                    " POP files attached.")),
            React.createElement("div", { style: { background: "linear-gradient(135deg,#0f1c2e,#1a3050)", borderRadius: 14, padding: "16px 18px", marginBottom: 16 } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#5dd8c8", textTransform: "uppercase", letterSpacing: .8, marginBottom: 8 } }, "Invoice Total"),
                React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 } },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", marginBottom: 3 } },
                            "Base: ",
                            fmtCurrency(cycleAmt),
                            totalOut > 0 ? ` + ${fmtCurrency(totalOut)} outstanding` : "",
                            totalCred > 0 ? ` − ${fmtCurrency(totalCred)} credit` : ""),
                        React.createElement("div", { style: { fontSize: 28, fontWeight: 700, color: "#fff", fontFamily: "'Clash Display',sans-serif", letterSpacing: -.5 } }, fmtCurrency(finalAmt))),
                    (totalOut > 0 || totalCred > 0) && React.createElement("div", { style: { textAlign: "right" } },
                        totalOut > 0 && React.createElement("div", { style: { fontSize: 12, color: "#ffd080", fontWeight: 600 } },
                            "+",
                            fmtCurrency(totalOut),
                            " outstanding"),
                        totalCred > 0 && React.createElement("div", { style: { fontSize: 12, color: "#5dd8c8", fontWeight: 600 } },
                            "\u2212",
                            fmtCurrency(totalCred),
                            " credit")))),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" } },
                React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                React.createElement("button", { style: { ...c.sv, background: "linear-gradient(135deg,#0fa890,#4285f4)", border: "none", padding: "9px 22px", fontSize: 13 }, onClick: handleConfirmClick }, "\u2713 Confirm Payment"))));
}
function PopThumb({ popB64, popName, pops: popsArr }) {
    const [bigIdx, setBigIdx] = useState(null);
    const items = popsArr && popsArr.length > 0 ? popsArr : popB64 ? [{ b64: popB64, name: popName }] : [];
    if (!items.length)
        return null;
    return React.createElement("div", { style: { display: "inline-flex", gap: 5, flexWrap: "wrap", marginTop: 4 } }, items.map((pop, i) => {
        const isPdf = (pop.name || "").toLowerCase().endsWith(".pdf");
        return React.createElement("span", { key: i },
            React.createElement("div", { onClick: () => setBigIdx(i), title: "Click to view POP", style: { cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, background: "#e8f0fe", border: "1px solid #4285f433", borderRadius: 6, padding: "2px 8px" } },
                isPdf ? React.createElement("span", { style: { fontSize: 10, color: "#4285f4", fontWeight: 700 } },
                    React.createElement(Ic, { name: "document" }),
                    " ",
                    (pop.name || "").slice(0, 18),
                    (pop.name || "").length > 18 ? "..." : "") : React.createElement("img", { src: `data:image/jpeg;base64,${pop.b64}`, alt: "POP", style: { width: 24, height: 18, objectFit: "cover", borderRadius: 3, border: "1px solid #4285f422" } }),
                React.createElement("span", { style: { fontSize: 9, color: "#4285f4", fontWeight: 700 } },
                    "POP",
                    items.length > 1 ? ` ${i + 1}` : "")),
            bigIdx === i && React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.75)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }, onClick: () => setBigIdx(null) },
                React.createElement("div", { style: { background: "#fff", borderRadius: 14, padding: 18, maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto", position: "relative" }, onClick: e => e.stopPropagation() },
                    React.createElement("button", { onClick: () => setBigIdx(null), style: { position: "absolute", top: 10, right: 12, background: "none", border: "none", fontSize: 22, color: "#7a9ab5", cursor: "pointer" } }, "\u00D7"),
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#0f1c2e" } },
                        pop.name,
                        items.length > 1 ? ` (${i + 1} of ${items.length})` : ""),
                    items.length > 1 && React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 12 } },
                        React.createElement("button", { onClick: () => setBigIdx(Math.max(0, i - 1)), disabled: i === 0, style: { ...c.cBtn, padding: "4px 10px", fontSize: 11 } }, "\u2190 Prev"),
                        React.createElement("button", { onClick: () => setBigIdx(Math.min(items.length - 1, i + 1)), disabled: i === items.length - 1, style: { ...c.cBtn, padding: "4px 10px", fontSize: 11 } }, "Next \u2192")),
                    isPdf ? React.createElement("iframe", { src: `data:application/pdf;base64,${pop.b64}`, title: pop.name, style: { width: "75vw", height: "70vh", border: "none", borderRadius: 8, display: "block" } }) : React.createElement("img", { src: `data:image/jpeg;base64,${pop.b64}`, alt: "POP", style: { maxWidth: "80vw", maxHeight: "72vh", borderRadius: 8, display: "block" } }))));
    }));
}
function PaymentCard({ a, onMarkPaid, allIns }) {
    const p = a.payment || {}, med = p.medicalTotal || 0, life = p.lifeTotal || 0, total = med + life, emp = adherentsTotal(a);
    const freq = p.frequency || "quarterly", ci = getCycleInfo(freq);
    const cycleAmt = total > 0 ? total / ci.divisor : 0, cycleMed = med > 0 ? med / ci.divisor : 0, cycleLife = life > 0 ? life / ci.divisor : 0, perEmp = emp > 0 ? total / emp : 0;
    const paidCycles = p.paidCycles || [];
    const schedule = getPaymentSchedule(a.serviceStartDate, freq);
    const [justPaid, setJustPaid] = useState(null);
    const [invoiceModal, setInvoiceModal] = useState(null);
    const [invoicePocPicker, setInvoicePocPicker] = useState(null);
    const [notifyPocPicker, setNotifyPocPicker] = useState(null);
    function getPaidRecord(cycleKey) { const found = paidCycles.find(x => (typeof x === "string" ? x : x.cycleKey) === cycleKey); return found ? typeof found === "string" ? { cycleKey: found, finalAmt: cycleAmt } : found : null; }
    function isCyclePaid(cycleKey) { return !!getPaidRecord(cycleKey); }
    function handlePaidClick(cycleKey) { setInvoiceModal({ cycleKey, cycleAmt, cycleMed, cycleLife, ci }); }
    function handleConfirm(record) { setJustPaid(record.cycleKey); setTimeout(() => { onMarkPaid(record); setTimeout(() => setJustPaid(null), 50); }, 550); setInvoiceModal(null); }
    if (!total && !freq)
        return null;
    return React.createElement(React.Fragment, null,
        React.createElement("div", { style: { background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 12, padding: 15, margin: "0 18px 13px" } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#0fa890", textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 } }, "Payment Details"),
            React.createElement("div", { style: { display: "flex", gap: 9, marginBottom: 9, flexWrap: "wrap" } },
                med > 0 && React.createElement("div", { style: { flex: 1, minWidth: 90, background: "#fff", border: "1.5px solid #4285f433", borderRadius: 10, padding: "9px 12px" } },
                    React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#4285f4", textTransform: "uppercase", marginBottom: 3 } }, "Medical / year"),
                    React.createElement("div", { style: { fontSize: 17, fontWeight: 700, color: "#4285f4", fontFamily: "'Clash Display',sans-serif" } }, fmtCurrency(med))),
                life > 0 && React.createElement("div", { style: { flex: 1, minWidth: 90, background: "#fff", border: "1.5px solid #9333ea33", borderRadius: 10, padding: "9px 12px" } },
                    React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#9333ea", textTransform: "uppercase", marginBottom: 3 } }, "Life / year"),
                    React.createElement("div", { style: { fontSize: 17, fontWeight: 700, color: "#9333ea", fontFamily: "'Clash Display',sans-serif" } }, fmtCurrency(life))),
                total > 0 && React.createElement("div", { style: { flex: 1, minWidth: 90, background: "#fff", border: "1.5px solid #0fa89033", borderRadius: 10, padding: "9px 12px" } },
                    React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#0fa890", textTransform: "uppercase", marginBottom: 3 } }, "Total / year"),
                    React.createElement("div", { style: { fontSize: 17, fontWeight: 700, color: "#0fa890", fontFamily: "'Clash Display',sans-serif" } }, fmtCurrency(total)))),
            cycleAmt > 0 && React.createElement("div", { style: { background: "linear-gradient(135deg,#e8f0fe,#e8faf8)", border: "1.5px solid #4285f433", borderRadius: 10, padding: "10px 14px", marginBottom: 9 } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#4285f4", textTransform: "uppercase", letterSpacing: .5, marginBottom: 6 } },
                    ci.label,
                    " Payment Instalment"),
                React.createElement("div", { style: { display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-end" } },
                    cycleMed > 0 && React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", textTransform: "uppercase", fontWeight: 700 } }, "Medical"),
                        React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: "#4285f4" } }, fmtCurrency(cycleMed))),
                    cycleLife > 0 && React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", textTransform: "uppercase", fontWeight: 700 } }, "Life"),
                        React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: "#9333ea" } }, fmtCurrency(cycleLife))),
                    React.createElement("div", { style: { borderLeft: "1px solid #b2f0df", paddingLeft: 14 } },
                        React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", textTransform: "uppercase", fontWeight: 700 } },
                            "Total / ",
                            ci.label.toLowerCase()),
                        React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: "#0fa890", fontFamily: "'Clash Display',sans-serif" } }, fmtCurrency(cycleAmt))),
                    perEmp > 0 && React.createElement("div", { style: { borderLeft: "1px solid #b2f0df", paddingLeft: 14 } },
                        React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", textTransform: "uppercase", fontWeight: 700 } }, "Per adherent"),
                        React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: "#0f1c2e" } }, fmtCurrency(perEmp)))),
                React.createElement("div", { style: { marginTop: 7, fontSize: 11, color: "#7a9ab5", background: "rgba(255,255,255,0.6)", borderRadius: 7, padding: "5px 9px" } },
                    freq === "quarterly" && `4 payments of ${fmtCurrency(cycleAmt)} each — every 3 months`,
                    freq === "semi-annually" && `2 payments of ${fmtCurrency(cycleAmt)} each — every 6 months`,
                    freq === "annually" && `1 annual payment of ${fmtCurrency(cycleAmt)}`)),
            React.createElement("div", { style: { display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 9 } },
                React.createElement("div", { style: c.ic },
                    React.createElement("div", { style: c.iL }, "Frequency"),
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, marginTop: 2 } }, ci.label)),
                React.createElement("div", { style: c.ic },
                    React.createElement("div", { style: c.iL }, "Method"),
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, marginTop: 2 } }, { wire: "Wire Transfer", cheque: "Cheque" }[p.method] || p.method || "—")),
                a.serviceStartDate && React.createElement("div", { style: c.ic },
                    React.createElement("div", { style: c.iL }, "Service Start"),
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, marginTop: 2 } }, fmtShort(a.serviceStartDate))),
                ci.divisor > 1 && cycleAmt > 0 && React.createElement("div", { style: c.ic },
                    React.createElement("div", { style: c.iL }, "Cycles/Year"),
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, marginTop: 2, color: "#4285f4" } },
                        ci.divisor,
                        " x ",
                        fmtCurrency(cycleAmt)))),
            schedule.length > 0 && React.createElement("div", { style: { background: "#fff", border: "1px solid #edf2f7", borderRadius: 10, padding: "12px 14px" } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#0fa890", textTransform: "uppercase", letterSpacing: .5, marginBottom: 9 } }, "Payment Schedule"),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, schedule.map(({ date, cycleKey, isPast }, i) => {
                    const diff = daysUntil(date);
                    const isPaid = isCyclePaid(cycleKey);
                    const record = getPaidRecord(cycleKey);
                    const isOverdue = !isPaid && diff < 0;
                    const isUrgent = !isPaid && diff >= 0 && diff <= 15;
                    const isAnimating = justPaid === cycleKey;
                    let bg = "#f7fbff", border = "#edf2f7", txtCol = "#0f1c2e";
                    if (isPaid) {
                        bg = "#e8faf8";
                        border = "#0fa89044";
                    }
                    else if (isOverdue) {
                        bg = "#5a0a0a";
                        border = "#7a0d0d";
                        txtCol = "#fff";
                    }
                    else if (isUrgent) {
                        bg = "#fff0ef";
                        border = "#e0392e44";
                    }
                    return React.createElement("div", { key: cycleKey, style: { background: bg, border: `1.5px solid ${border}`, borderRadius: 9, padding: "9px 12px", transition: "all .2s" } },
                        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                                isPaid ? React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", style: { flexShrink: 0 } },
                                    React.createElement("circle", { cx: "12", cy: "12", r: "11", fill: "#0fa890" }),
                                    React.createElement("path", { d: "M7 12.5 L10.5 16 L17 8.5", fill: "none", stroke: "#fff", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" })) : isAnimating ? React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", style: { flexShrink: 0 } },
                                    React.createElement("circle", { cx: "12", cy: "12", r: "11", fill: "#0fa890", className: "success-anim" }),
                                    React.createElement("path", { d: "M7 12.5 L10.5 16 L17 8.5", fill: "none", stroke: "#fff", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round", strokeDasharray: "16", strokeDashoffset: "16", style: { animation: "checkDraw .35s ease .1s forwards" } })) : React.createElement("div", { style: { width: 20, height: 20, borderRadius: "50%", border: `2px solid ${isOverdue ? "#ffb3b0" : "#dde8f0"}`, flexShrink: 0 } }),
                                React.createElement("div", null,
                                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: isPaid ? "#0fa890" : txtCol } }, date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })),
                                    React.createElement("div", { style: { fontSize: 10, color: isPaid ? "#0fa890" : isOverdue ? "#ffb3b0" : "#7a9ab5", fontWeight: 600 } }, isPaid ? "Paid" : isOverdue ? `${Math.abs(diff)}d overdue` : diff === 0 ? "Due today" : diff > 0 ? `Due in ${diff}d` : ""))),
                            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                                React.createElement("div", { style: { textAlign: "right" } },
                                    React.createElement("span", { style: { fontWeight: 700, color: isPaid ? "#0fa890" : txtCol, fontSize: 13 } }, isPaid && record?.finalAmt ? fmtCurrency(record.finalAmt) : fmtCurrency(cycleAmt)),
                                    isPaid && record?.finalAmt && Math.abs(record.finalAmt - cycleAmt) > 1 && React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5" } },
                                        "base ",
                                        fmtCurrency(cycleAmt))),
                                !isPaid && React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" } },
                                    React.createElement("button", { onClick: () => handlePaidClick(cycleKey), style: { background: isOverdue ? "#fff" : "#0fa890", color: isOverdue ? "#5a0a0a" : "#fff", border: "none", borderRadius: 8, padding: "5px 13px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } }, "\u2713 Paid"),
                                    diff >= 0 && diff <= 15 && React.createElement("button", { onClick: () => setInvoicePocPicker({ cycleKey }), style: { background: "#e8f0fe", color: "#4285f4", border: "1px solid #4285f444", borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } },
                                        React.createElement(Ic, { name: "envelope" }),
                                        " Issue Invoice Email"),
                                    diff < -15 && React.createElement("button", { onClick: () => setNotifyPocPicker({ cycleKey }), style: { background: isOverdue ? "rgba(255,255,255,0.15)" : "#fff8ec", color: isOverdue ? "#fff" : "#d4880a", border: `1px solid ${isOverdue ? "rgba(255,255,255,0.3)" : "#d4880a44"}`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } }, "\uD83D\uDD14 Notification Email"),
                                    diff < -30 && React.createElement("button", { onClick: () => { const insurerName = (allIns || []).find(i => i.id === a.carrierId)?.name; const { subject, body } = buildWarningEmail(a, cycleKey, freq, insurerName); gmailComposeWithBody(a.poc?.email, subject, body); }, style: { background: isOverdue ? "rgba(255,255,255,0.15)" : "#fff0ef", color: isOverdue ? "#fff" : "#e0392e", border: `1px solid ${isOverdue ? "rgba(255,255,255,0.3)" : "#e0392e44"}`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } },
                                        React.createElement(Ic, { name: "warning" }),
                                        " Send Warning Email")))),
                        isPaid && record?.popB64 && React.createElement("div", { style: { marginTop: 6, paddingTop: 6, borderTop: "1px solid #0fa89022" } },
                            React.createElement(PopThumb, { popB64: record.popB64, popName: record.popName, pops: record.pops }),
                            (record.outstanding?.length > 0 || record.credits?.length > 0) && React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", marginTop: 3 } },
                                record.outstanding?.map((o, i) => React.createElement("span", { key: i, style: { marginRight: 8, color: "#d4880a" } },
                                    "+",
                                    fmtCurrency(o.amount),
                                    " ",
                                    o.desc)),
                                record.credits?.map((cr, i) => React.createElement("span", { key: i, style: { marginRight: 8, color: "#0a8a6a" } },
                                    "\u2212",
                                    fmtCurrency(cr.amount),
                                    " ",
                                    cr.desc)))));
                })))),
        invoiceModal && React.createElement(InvoiceBreakdownModal, { acc: a, cycleKey: invoiceModal.cycleKey, cycleAmt: invoiceModal.cycleAmt, cycleMed: invoiceModal.cycleMed, cycleLife: invoiceModal.cycleLife, ci: invoiceModal.ci, onConfirm: handleConfirm, onClose: () => setInvoiceModal(null) }),
        invoicePocPicker && (() => { const carrier = a.carrierId ? (allIns || []).find(i => i.id === a.carrierId) : null; const amPocs = (carrier?.pocs && carrier.pocs.length ? carrier.pocs : carrier?.poc?.name ? [carrier.poc] : []).filter(p => p && (p.name || p.email)); return React.createElement(ContactPickerModal, { title: "Issue Invoice Email", subtitle: `Select the Account Manager at ${carrier?.name || "the insurer"}`, pocs: amPocs, onClose: () => setInvoicePocPicker(null), onPick: am => { const { subject, body } = buildInvoiceRequestEmail(a, invoicePocPicker.cycleKey, freq, am.name); gmailComposeWithBody(am.email, subject, body); setInvoicePocPicker(null); } }); })(),
        notifyPocPicker && (() => { const insurerName = (allIns || []).find(i => i.id === a.carrierId)?.name; const hrPocs = getPocs(a); return React.createElement(ContactPickerModal, { title: "Notification Email", subtitle: `Select who to notify at ${a.name}`, pocs: hrPocs, onClose: () => setNotifyPocPicker(null), onPick: hr => { const { subject, body } = buildNotificationEmail(a, notifyPocPicker.cycleKey, freq, insurerName, hr.name); gmailComposeWithBody(hr.email, subject, body); setNotifyPocPicker(null); } }); })());
}
function AccountTimeline({ acc }) {
    const items = [];
    (acc.activity || []).forEach(a => items.push({ ts: a.ts, icon: "📝", color: "#7a9ab5", text: a.msg }));
    Object.entries(acc.tasks || {}).forEach(([day, tasks]) => tasks.forEach(t => items.push({ ts: day + "T09:00:00", icon: t.ended ? "✅" : "📋", color: t.ended ? "#0fa890" : "#d4880a", text: t.text, sub: t.ended ? "Completed" : "Open task" })));
    (acc.renewalUpdates || []).forEach(u => items.push({ ts: u.ts, icon: "🔄", color: "#9333ea", text: u.text }));
    items.sort((a, b) => new Date(b.ts) - new Date(a.ts));
    if (items.length === 0)
        return React.createElement("div", { style: { padding: "1.5rem", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, "No timeline events yet.");
    return React.createElement("div", { style: { padding: "13px 17px" } }, items.slice(0, 30).map((item, i) => React.createElement("div", { key: i, style: { display: "flex", gap: 11, marginBottom: 11, alignItems: "flex-start" } },
        React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" } },
            React.createElement("div", { style: { width: 28, height: 28, borderRadius: "50%", background: item.color + "18", border: `2px solid ${item.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 } }, item.icon),
            i < Math.min(items.length, 30) - 1 && React.createElement("div", { style: { width: 2, flex: 1, background: "#edf2f7", marginTop: 3, minHeight: 8 } })),
        React.createElement("div", { style: { flex: 1, paddingTop: 3 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: "#0f1c2e" } }, item.text),
            item.sub && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: 1 } }, item.sub),
            React.createElement("div", { style: { fontSize: 10, color: "#c0cdd8", marginTop: 2 } }, new Date(item.ts).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }))))));
}
function DayDetailModal({ day, accounts, dayNote, onSaveNote, onAddTask, onEndTask, onDeleteTask, onReschedule, onClose }) {
    const [newTaskText, setNewTaskText] = useState("");
    const [newTaskTime, setNewTaskTime] = useState("");
    const [newTaskAcc, setNewTaskAcc] = useState(accounts[0]?.id?.toString() || "");
    const [noteText, setNoteText] = useState(dayNote || "");
    const [rescheduling, setRescheduling] = useState(null);
    const [resDate, setResDate] = useState(day);
    const [resTime, setResTime] = useState("");
    const dayTasks = accounts.flatMap(a => (a.tasks[day] || []).map(t => ({ ...t, accName: a.name, accId: a.id }))).sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99"));
    function submitTask() { if (!newTaskText.trim() || !newTaskAcc)
        return; onAddTask(day, newTaskText, newTaskTime, parseInt(newTaskAcc)); setNewTaskText(""); setNewTaskTime(""); }
    function startReschedule(t) { setRescheduling({ tid: t.id, accId: t.accId }); setResDate(day); setResTime(t.time || ""); }
    function confirmReschedule() { onReschedule(rescheduling.tid, day, rescheduling.accId, resDate, resTime); setRescheduling(null); }
    function closeAndSave() { onSaveNote(day, noteText); onClose(); }
    return React.createElement("div", { style: c.modal },
        React.createElement("div", { style: { ...c.mBox, width: 560, maxHeight: "90vh", overflowY: "auto" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, fmtD(day)),
                    React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } },
                        dayTasks.length,
                        " task",
                        dayTasks.length !== 1 ? "s" : "")),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, color: "#c0cdd8", cursor: "pointer" }, onClick: closeAndSave }, "\u00D7")),
            React.createElement("div", { style: { background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 10, padding: 12, marginBottom: 16 } },
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", marginBottom: 8, textTransform: "uppercase" } }, "+ Add Task for this day"),
                React.createElement("input", { style: { ...c.fi, marginBottom: 6 }, placeholder: "Task description...", value: newTaskText, onChange: e => setNewTaskText(e.target.value), onKeyDown: e => e.key === "Enter" && submitTask() }),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("select", { style: { ...c.fi, flex: 1, marginBottom: 0 }, value: newTaskAcc, onChange: e => setNewTaskAcc(e.target.value) }, accounts.map(a => React.createElement("option", { key: a.id, value: a.id }, a.name))),
                    React.createElement("select", { style: { ...c.fi, width: 130, marginBottom: 0 }, value: newTaskTime, onChange: e => setNewTaskTime(e.target.value) },
                        React.createElement("option", { value: "" }, "No time"),
                        TIME_SLOTS.map(s => React.createElement("option", { key: s.value, value: s.value }, s.label))),
                    React.createElement("button", { style: c.sv, onClick: submitTask }, "Add"))),
            React.createElement("div", { style: { marginBottom: 16 } },
                dayTasks.length === 0 && React.createElement("div", { style: { padding: "1rem", textAlign: "center", color: "#c0cdd8", fontSize: 12 } }, "No tasks yet for this day."),
                dayTasks.map(t => React.createElement("div", { key: t.id, style: { padding: "10px 12px", borderRadius: 9, background: t.ended ? "#e8faf8" : "#f7fbff", border: `1px solid ${t.ended ? "#0fa89033" : "#edf2f7"}`, marginBottom: 7 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 8 } },
                        React.createElement("input", { type: "checkbox", checked: !!t.ended, onChange: () => onEndTask(t.id, day, t.accId), style: { marginTop: 3, accentColor: "#0fa890", cursor: "pointer" } }),
                        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                            React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" } },
                                t.time && React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#4285f4" } }, t.time),
                                React.createElement("span", { style: { fontSize: 13, fontWeight: 600, textDecoration: t.ended ? "line-through" : "none", color: t.ended ? "#7a9ab5" : "#0f1c2e" } }, t.text)),
                            React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", marginTop: 2 } },
                                t.accName,
                                t.rescheduledFrom ? ` · rescheduled from ${fmtShort(t.rescheduledFrom)}` : ""),
                            (t.updates || []).length > 0 && React.createElement("div", { style: { marginTop: 4, fontSize: 10, color: "#7a9ab5" } }, t.updates.map((u, i) => React.createElement("div", { key: i },
                                React.createElement("span", { style: { color: "#c0cdd8" } },
                                    new Date(u.ts).toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
                                    ":"),
                                " ",
                                u.text)))),
                        React.createElement("div", { style: { display: "flex", gap: 5, flexShrink: 0 } },
                            React.createElement("button", { onClick: () => startReschedule(t), style: { fontSize: 10, fontWeight: 700, color: "#9333ea", background: "#f5e8fe", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer" } }, "Reschedule"),
                            React.createElement("button", { onClick: () => onDeleteTask(t.id, day, t.accId), style: { fontSize: 12, color: "#e0392e", background: "none", border: "none", cursor: "pointer" } }, "\u2715"))),
                    rescheduling?.tid === t.id && React.createElement("div", { style: { marginTop: 8, paddingTop: 8, borderTop: "1px solid #edf2f7", display: "flex", gap: 6, alignItems: "center" } },
                        React.createElement("input", { type: "date", style: { ...c.fi, marginBottom: 0, flex: 1 }, value: resDate, onChange: e => setResDate(e.target.value) }),
                        React.createElement("select", { style: { ...c.fi, marginBottom: 0, width: 120 }, value: resTime, onChange: e => setResTime(e.target.value) },
                            React.createElement("option", { value: "" }, "No time"),
                            TIME_SLOTS.map(s => React.createElement("option", { key: s.value, value: s.value }, s.label))),
                        React.createElement("button", { style: { ...c.sv, padding: "6px 12px", fontSize: 11 }, onClick: confirmReschedule }, "\u2713 Move"),
                        React.createElement("button", { style: c.cBtn, onClick: () => setRescheduling(null) }, "Cancel"))))),
            React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", marginBottom: 6, textTransform: "uppercase" } }, "Notes (not tasks)"),
                React.createElement("textarea", { style: { ...c.fi, minHeight: 90, resize: "vertical" }, placeholder: "Anything worth jotting down for this day that isn't a task...", value: noteText, onChange: e => setNoteText(e.target.value) })),
            React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 14 } },
                React.createElement("button", { style: c.cBtn, onClick: closeAndSave }, "Close"))));
}
function GoogleCalendarSetupModal({ googleConnected, googleBusy, onConnect, onRefresh, onDisconnect, onClose }) {
    const cfg = getGoogleConfig();
    const [clientId, setClientId] = useState(cfg.clientId);
    const [apiKey, setApiKey] = useState(cfg.apiKey);
    const [dirty, setDirty] = useState(false);
    const [showKey, setShowKey] = useState(false);
    const copy = v => { try {
        navigator.clipboard?.writeText(v);
        alert("Copied to clipboard.");
    }
    catch { } };
    function save() {
        try {
            if (googleConnected)
                onDisconnect();
            saveGoogleConfig({ clientId: clientId.trim(), apiKey: apiKey.trim() });
            resetGoogleRuntime();
            setDirty(false);
            onClose();
            alert("Google Calendar web credentials saved. Reconnect Google Calendar to apply the new client.");
        }
        catch (err) {
            alert(err?.message || "Could not save Google Calendar credentials.");
        }
    }
    return React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(15,24,33,.38)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(5px)" }, onMouseDown: onClose },
        React.createElement("div", { style: { ...c.mBox, width: 560, padding: 0, overflow: "hidden" }, onMouseDown: e => e.stopPropagation() },
            React.createElement("div", { style: { padding: "16px 18px", background: "linear-gradient(180deg,#fafbfc,#eef0f2)", borderBottom: "1px solid #dde1e5", display: "flex", alignItems: "center", gap: 10 } },
                React.createElement("div", { style: { fontSize: 18 } },
                    React.createElement(Ic, { name: "gear" })),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: "#30383e", fontFamily: "'Clash Display',sans-serif" } }, "Google Calendar Setup"),
                    React.createElement("div", { style: { fontSize: 10, color: "#7a8288", marginTop: 2 } }, "Web application OAuth for ClonKR PWA")),
                React.createElement("button", { onClick: onClose, style: { background: "transparent", border: "none", fontSize: 20, color: "#7a8288", cursor: "pointer" } }, "\u00D7")),
            React.createElement("div", { style: { padding: 18 } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14, padding: "10px 12px", background: googleConnected ? "#e8faf8" : "#f5f6f7", border: `1px solid ${googleConnected ? "#0fa89044" : "#d9dde2"}`, borderRadius: 12 } },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 11, fontWeight: 800, color: googleConnected ? "#0b7e6e" : "#68707a" } }, googleConnected ? "● Google Calendar Connected" : "○ Google Calendar Not Connected"),
                        React.createElement("div", { style: { fontSize: 9, color: "#7a8288", marginTop: 2 } }, googleConnected ? "Events are synchronized into ClonKR." : "Connect to load your primary Google Calendar.")),
                    React.createElement("div", { style: { display: "flex", gap: 6 } }, !googleConnected ? React.createElement("button", { onClick: onConnect, disabled: googleBusy, style: { ...c.aBtn, background: "#4285f4", color: "#fff", borderColor: "#4285f4" } }, googleBusy ? "Connecting…" : "Connect Google") : React.createElement(React.Fragment, null,
                        React.createElement("button", { onClick: onRefresh, disabled: googleBusy, style: { ...c.aBtn, background: "#e8faf8", color: "#0b7e6e", borderColor: "#0fa89044" } }, "\u21BB Sync"),
                        React.createElement("button", { onClick: onDisconnect, style: { ...c.aBtn, background: "#fff", color: "#68707a", borderColor: "#d9dde2" } }, "Disconnect")))),
                React.createElement("div", { style: { fontSize: 10, fontWeight: 800, color: "#687177", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 } }, "Web Application OAuth Client ID"),
                React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 6 } },
                    React.createElement("input", { value: clientId, onChange: e => { setClientId(e.target.value); setDirty(true); }, placeholder: "1234567890-....apps.googleusercontent.com", style: { ...c.ti, flex: 1, fontFamily: "ui-monospace,monospace", fontSize: 10 } }),
                    React.createElement("button", { onClick: () => copy(clientId), style: c.aBtn, disabled: !clientId }, "Copy")),
                React.createElement("div", { style: { fontSize: 9, color: "#68707a", lineHeight: 1.55, marginBottom: 14 } },
                    "Use a Google Cloud OAuth client of type ",
                    React.createElement("b", null, "Web application"),
                    ". Add the exact HTTPS origin where ClonKR is hosted under ",
                    React.createElement("b", null, "Authorized JavaScript origins"),
                    ". Do not enter a client secret in the PWA."),
                React.createElement("div", { style: { fontSize: 10, fontWeight: 800, color: "#687177", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 } },
                    "Google Calendar API Key ",
                    React.createElement("span", { style: { fontSize: 8, fontWeight: 500, textTransform: "none", letterSpacing: 0 } }, "(optional)")),
                React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 8 } },
                    React.createElement("input", { value: apiKey, onChange: e => { setApiKey(e.target.value); setDirty(true); }, type: showKey ? "text" : "password", style: { ...c.ti, flex: 1, fontFamily: "ui-monospace,monospace", fontSize: 10 } }),
                    React.createElement("button", { onClick: () => setShowKey(v => !v), style: c.aBtn }, showKey ? "Hide" : "Show"),
                    React.createElement("button", { onClick: () => copy(apiKey), style: c.aBtn, disabled: !apiKey }, "Copy")),
                React.createElement("div", { style: { fontSize: 9, color: "#8c969d", lineHeight: 1.55, marginBottom: 14 } }, "Keep any API key restricted to the website origins that use it. Calendar access itself is authorized with the Google OAuth access token."),
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, borderTop: "1px solid #edf2f7", paddingTop: 12 } },
                    React.createElement("div", { style: { fontSize: 9, color: "#9aa3a9" } }, dirty ? "Unsaved changes" : "Credentials ready"),
                    React.createElement("div", { style: { display: "flex", gap: 7 } },
                        React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                        React.createElement("button", { style: c.sv, onClick: save }, "Save Credentials"))))));
}
function CalendarView({ accounts, calDay, setCalDay, onAddTask, googleEvents, googleConnected, onGoogleConnect, onGoogleRefresh, onGoogleDisconnect, onGoogleSetup, googleBusy }) {
    const today = toDay();
    const [calYear, setCalYear] = useState(new Date().getFullYear());
    const [calMonth, setCalMonth] = useState(new Date().getMonth());
    const cells = monthGrid(calYear, calMonth);
    useEffect(() => { if (googleConnected)
        onGoogleRefresh(calYear, calMonth); }, [googleConnected, calYear, calMonth]);
    const tasksByDay = {};
    accounts.forEach(a => Object.entries(a.tasks || {}).forEach(([day, tasks]) => { if (!tasksByDay[day])
        tasksByDay[day] = []; tasks.forEach(t => tasksByDay[day].push({ ...t, accName: a.name, accId: a.id })); }));
    function prevMonth() { if (calMonth === 0) {
        setCalMonth(11);
        setCalYear(y => y - 1);
    }
    else
        setCalMonth(m => m - 1); }
    function nextMonth() { if (calMonth === 11) {
        setCalMonth(0);
        setCalYear(y => y + 1);
    }
    else
        setCalMonth(m => m + 1); }
    const selectedTasks = (tasksByDay[calDay] || []).sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99"));
    return React.createElement("div", null,
        React.createElement("div", { style: c.card },
            React.createElement("div", { style: c.cHdr },
                React.createElement("span", { style: { ...c.cTitle, color: "#0fa890" } },
                    React.createElement(Ic, { name: "calendar" }),
                    " ",
                    MNAMES[calMonth],
                    " ",
                    calYear),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 9 } },
                    React.createElement("button", { style: c.aBtn, onClick: () => onAddTask(calDay) }, "+ Add Task"),
                    !googleConnected ? React.createElement("button", { style: { ...c.aBtn, background: "#fff", borderColor: "#4285f444", color: "#4285f4" }, onClick: onGoogleConnect }, "\u2197 Connect Google") : React.createElement(React.Fragment, null,
                        React.createElement("button", { style: { ...c.aBtn, background: "#e8faf8", borderColor: "#0fa89044", color: "#0fa890" }, onClick: () => onGoogleRefresh(calYear, calMonth), disabled: googleBusy },
                            "\u21BB ",
                            googleBusy ? "Syncing…" : "Sync Google"),
                        React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: "#0fa890", background: "#e8faf8", padding: "5px 8px", borderRadius: 8 } }, "\u25CF Connected")),
                    React.createElement("button", { title: "Google Calendar setup", onClick: onGoogleSetup, style: { width: 32, height: 32, borderRadius: 9, border: "1px solid #d9dde2", background: "#fff", color: "#68707a", fontSize: 18, lineHeight: 1, cursor: "pointer" } }, "\u22EF"),
                    React.createElement("button", { onClick: () => { setCalYear(new Date().getFullYear()); setCalMonth(new Date().getMonth()); setCalDay(today); }, style: { ...c.aBtn, background: "#f0f4f8", color: "#7a9ab5", border: "1px solid #dde8f0" } }, "Today"),
                    React.createElement("div", { style: c.na },
                        React.createElement("button", { style: c.narr, onClick: prevMonth }, "\u2039"),
                        React.createElement("button", { style: c.narr, onClick: nextMonth }, "\u203A")))),
            React.createElement("div", { style: { padding: "0 12px 12px" } },
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 4 } }, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => React.createElement("div", { key: d, style: { padding: "10px 4px", textAlign: "center", fontSize: 10, fontWeight: 700, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: .8 } }, d))),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 } }, cells.map(({ date, cur }) => {
                    const dayTasks = tasksByDay[date] || [];
                    const openTasks = dayTasks.filter(t => !t.ended);
                    const doneTasks = dayTasks.filter(t => t.ended);
                    const isToday = date === today, isSel = date === calDay;
                    const [, , dd] = date.split("-");
                    return React.createElement("div", { key: date, onClick: () => setCalDay(date), style: { minHeight: 76, borderRadius: 9, padding: "5px 6px", cursor: "pointer", background: isSel ? "#e8faf8" : isToday ? "#f0fdf8" : cur ? "#fff" : "#f7f9fb", border: isSel ? "2px solid #0fa890" : isToday ? "1.5px solid #5dd8c8" : "1px solid #edf2f7", position: "relative", transition: "all .12s" } },
                        React.createElement("div", { style: { fontSize: 13, fontWeight: isSel || isToday ? 700 : 400, color: isSel ? "#0fa890" : isToday ? "#0a1628" : cur ? "#0f1c2e" : "#c0cdd8", marginBottom: 3 } }, parseInt(dd)),
                        openTasks.slice(0, 2).map((t, i) => React.createElement("div", { key: t.id, className: "pill", style: { background: "#e8f0fe", color: "#4285f4", borderLeft: "2px solid #4285f4", fontSize: 9, padding: "1px 4px", marginBottom: 1 } },
                            t.text.slice(0, 12),
                            t.text.length > 12 ? "…" : "")),
                        doneTasks.slice(0, 1).map((t, i) => React.createElement("div", { key: t.id, className: "pill", style: { background: "#e8faf8", color: "#0fa890", borderLeft: "2px solid #0fa890", fontSize: 9, padding: "1px 4px", marginBottom: 1 } },
                            "\u2713 ",
                            t.text.slice(0, 10),
                            t.text.length > 10 ? "…" : "")),
                        (googleEvents[date] || []).slice(0, 2).map(ev => React.createElement("a", { key: ev.id, href: ev.htmlLink || "#", target: "_blank", rel: "noopener noreferrer", className: "pill", style: { display: "block", textDecoration: "none", background: "#f1f3f5", color: "#68707a", borderLeft: "2px solid #8c939b", fontSize: 9, padding: "1px 4px", marginBottom: 1 } },
                            "G \u00B7 ",
                            (ev.summary || "Google event").slice(0, 10),
                            (ev.summary || "").length > 10 ? "…" : "")),
                        openTasks.length > 2 && React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", fontWeight: 600 } },
                            "+",
                            openTasks.length - 2,
                            " more"),
                        openTasks.length > 0 && React.createElement("div", { style: { position: "absolute", top: 4, right: 5, width: 6, height: 6, borderRadius: "50%", background: "#0fa890" } }));
                })))),
        React.createElement("div", { style: c.card },
            React.createElement("div", { style: c.cHdr },
                React.createElement("span", { style: { ...c.cTitle, color: "#0fa890" } },
                    fmtD(calDay),
                    " \u2014 Full Day View"),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                    React.createElement("span", { style: { fontSize: 11, color: "#7a9ab5", fontWeight: 600 } },
                        selectedTasks.length,
                        " task",
                        selectedTasks.length !== 1 ? "s" : ""),
                    React.createElement("button", { style: c.aBtn, onClick: () => onAddTask(calDay) }, "+ Add Task"))),
            React.createElement("div", { style: { overflowY: "auto", maxHeight: 520 } },
                Array.from({ length: 10 }, (_, i) => i + 9).map(hr => {
                    const hrTasks = selectedTasks.filter(t => t.time && parseInt(t.time.split(":")[0]) === hr);
                    const nowH = new Date().getHours(), isNow = calDay === toDay() && hr === nowH;
                    return React.createElement("div", { key: hr, style: { display: "grid", gridTemplateColumns: "64px 1fr", borderBottom: "1px solid #f0f4f8", minHeight: 56, background: isNow ? "#f0fdf8" : "#fff" } },
                        React.createElement("div", { style: { padding: "8px 10px 0 12px", borderRight: "1px solid #edf2f7", fontSize: 11, fontWeight: 700, color: isNow ? "#0fa890" : "#c0cdd8", textAlign: "right", paddingTop: 10 } },
                            fhr(hr),
                            isNow && React.createElement("div", { style: { width: "100%", height: 2, background: "#0fa890", marginTop: 4, borderRadius: 1 } })),
                        React.createElement("div", { style: { padding: "6px 12px", minHeight: 56 } },
                            hrTasks.length === 0 ? null : hrTasks.map(t => React.createElement("div", { key: t.id, style: { display: "flex", alignItems: "flex-start", gap: 8, padding: "5px 10px", borderRadius: 8, background: t.ended ? "#e8faf8" : "#e8f0fe", border: `1.5px solid ${t.ended ? "#0fa89044" : "#4285f444"}`, marginBottom: 4 } },
                                React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: t.ended ? "#0fa890" : "#4285f4", flexShrink: 0, marginTop: 2 } }),
                                React.createElement("div", { style: { flex: 1 } },
                                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" } },
                                        React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: t.ended ? "#0fa890" : "#4285f4" } }, t.time),
                                        React.createElement("span", { style: { fontSize: 12, fontWeight: 600, textDecoration: t.ended ? "line-through" : "none", color: t.ended ? "#7a9ab5" : "#0f1c2e" } }, t.text),
                                        t.ended && React.createElement("span", { style: { fontSize: 9, background: "#0fa89022", color: "#0fa890", borderRadius: 20, padding: "1px 6px", fontWeight: 700 } }, "Done")),
                                    React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", marginTop: 1 } }, t.accName),
                                    (t.updates || []).length > 0 && React.createElement("div", { style: { marginTop: 3, fontSize: 10, color: "#7a9ab5" } }, t.updates.map((u, i) => React.createElement("span", { key: i, style: { marginRight: 8 } },
                                        React.createElement("span", { style: { color: "#c0cdd8" } },
                                            new Date(u.ts).toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
                                            ":"),
                                        " ",
                                        u.text)))),
                                React.createElement("a", { href: gcalUrl(t, calDay, t.accName), target: "_blank", rel: "noopener noreferrer", style: c.gcBtn }, React.createElement(Ic, { name: "calendar" })))),
                            (googleEvents[calDay] || []).filter(ev => ev.clonkrStartHour === hr).map(ev => React.createElement("a", { key: `g_${ev.id}`, href: ev.htmlLink || "#", target: "_blank", rel: "noopener noreferrer", style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 8, background: "#f3f4f5", border: "1.5px solid #c9ced3", marginBottom: 4, textDecoration: "none", color: "#58616a" } },
                                React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: "linear-gradient(145deg,#f6f7f8,#8f969c)", flexShrink: 0 } }),
                                React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                                    React.createElement("div", { style: { fontSize: 11, fontWeight: 800, color: "#4f5962" } },
                                        ev.clonkrStartTime,
                                        " \u00B7 ",
                                        ev.summary || "Untitled event"),
                                    React.createElement("div", { style: { fontSize: 9, color: "#8a9298" } }, "Google Calendar")),
                                React.createElement("span", { style: { fontSize: 10, color: "#8a9298" } }, "\u2197")))));
                }),
                (selectedTasks.filter(t => !t.time).length > 0 || (googleEvents[calDay] || []).some(ev => ev.clonkrAllDay)) && React.createElement("div", { style: { display: "grid", gridTemplateColumns: "64px 1fr", borderBottom: "1px solid #f0f4f8", background: "#fafcfe" } },
                    React.createElement("div", { style: { padding: "10px 10px 10px 12px", borderRight: "1px solid #edf2f7", fontSize: 11, fontWeight: 700, color: "#7a9ab5", textAlign: "right" } },
                        "No",
                        React.createElement("br", null),
                        "time"),
                    React.createElement("div", { style: { padding: "8px 12px" } },
                        selectedTasks.filter(t => !t.time).map(t => React.createElement("div", { key: t.id, style: { display: "flex", alignItems: "flex-start", gap: 8, padding: "5px 10px", borderRadius: 8, background: t.ended ? "#e8faf8" : "#fff8e6", border: `1.5px solid ${t.ended ? "#0fa89044" : "#d4880a44"}`, marginBottom: 4 } },
                            React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: t.ended ? "#0fa890" : "#d4880a", flexShrink: 0, marginTop: 2 } }),
                            React.createElement("div", { style: { flex: 1 } },
                                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" } },
                                    React.createElement("span", { style: { fontSize: 12, fontWeight: 600, textDecoration: t.ended ? "line-through" : "none", color: t.ended ? "#7a9ab5" : "#0f1c2e" } }, t.text),
                                    t.ended && React.createElement("span", { style: { fontSize: 9, background: "#0fa89022", color: "#0fa890", borderRadius: 20, padding: "1px 6px", fontWeight: 700 } }, "Done")),
                                React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", marginTop: 1 } }, t.accName)),
                            React.createElement("a", { href: gcalUrl(t, calDay, t.accName), target: "_blank", rel: "noopener noreferrer", style: c.gcBtn }, React.createElement(Ic, { name: "calendar" })))),
                        (googleEvents[calDay] || []).filter(ev => ev.clonkrAllDay).map(ev => React.createElement("a", { key: `ga_${ev.id}`, href: ev.htmlLink || "#", target: "_blank", rel: "noopener noreferrer", style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 8, background: "#f3f4f5", border: "1.5px solid #c9ced3", marginBottom: 4, textDecoration: "none", color: "#58616a" } },
                            React.createElement("span", { style: { fontSize: 10, fontWeight: 800, color: "#68707a" } }, "ALL DAY"),
                            React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(145deg,#f6f7f8,#8f969c)" } }),
                            React.createElement("span", { style: { fontSize: 11, fontWeight: 700, flex: 1 } }, ev.summary || "Untitled event"),
                            React.createElement("span", { style: { fontSize: 10, color: "#9aa1a7" } }, "\u2197"))))),
                (googleEvents[calDay] || []).length > 0 && React.createElement("div", { style: { padding: "12px", background: "linear-gradient(180deg,#f6f7f8,#eef0f2)", borderTop: "1px solid #dfe3e6" } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 } },
                        React.createElement("div", { style: { fontSize: 10, fontWeight: 800, color: "#616a72", textTransform: "uppercase", letterSpacing: .9 } }, "Google Calendar"),
                        React.createElement("span", { style: { fontSize: 9, color: "#8a9298" } },
                            googleEvents[calDay].length,
                            " event",
                            googleEvents[calDay].length !== 1 ? "s" : "")),
                    googleEvents[calDay].slice().sort((a, b) => (a.clonkrStartTime || "99:99").localeCompare(b.clonkrStartTime || "99:99")).map(ev => React.createElement("a", { key: ev.id, href: ev.htmlLink || "#", target: "_blank", rel: "noopener noreferrer", style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 9, color: "#4b5563", textDecoration: "none", background: "#fff", border: "1px solid #dfe3e6", marginBottom: 5 } },
                        React.createElement("span", { style: { fontSize: 10, fontWeight: 800, color: "#68707a", minWidth: 50 } }, ev.clonkrAllDay ? "ALL DAY" : ev.clonkrStartTime ? `${ev.clonkrStartTime}${ev.clonkrEndTime ? `–${ev.clonkrEndTime}` : ""}` : ""),
                        React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(145deg,#f6f7f8,#8f969c)", flexShrink: 0 } }),
                        React.createElement("span", { style: { fontSize: 11, fontWeight: 700, flex: 1 } }, ev.summary || "Untitled event"),
                        React.createElement("span", { style: { fontSize: 10, color: "#9aa1a7" } }, "\u2197")))),
                selectedTasks.length === 0 && React.createElement("div", { style: { padding: "2.5rem", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, "No ClonKr tasks on this day. Click \"+ Add Task\" to add one."))));
}
function PaymentTableRow({ r, onSelectAcc, onMarkPaid, allIns }) {
    const [justPaid, setJustPaid] = useState(false);
    const [invoiceModal, setInvoiceModal] = useState(false);
    const [invoicePocPicker, setInvoicePocPicker] = useState(false);
    const [notifyPocPicker, setNotifyPocPicker] = useState(false);
    const overdue = r.days < 0, urgent = !overdue && r.days <= 15, warn = !overdue && r.days > 15 && r.days <= 30;
    const rowBg = overdue ? "#5a0a0a" : urgent ? "#fff5f5" : warn ? "#fffbf0" : "#fff";
    const txtCol = overdue ? "#fff" : "#0f1c2e";
    const dayCol = overdue ? "#ffd4d2" : urgent ? "#e0392e" : warn ? "#d4880a" : "#0fa890";
    const ci = r.ci;
    const cycleMed = r.med > 0 ? r.med / ci.divisor : 0;
    const cycleLife = r.life > 0 ? r.life / ci.divisor : 0;
    function handleConfirm(record) { setJustPaid(true); setTimeout(() => onMarkPaid(r.acc.id, record), 550); setInvoiceModal(false); }
    return React.createElement(React.Fragment, null,
        React.createElement("tr", { style: { background: rowBg, borderBottom: "1px solid #f0f4f8", transition: "background .1s" } },
            React.createElement("td", { onClick: () => onSelectAcc(r.acc.id), style: { padding: "12px 14px", whiteSpace: "nowrap", cursor: "pointer" } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                    React.createElement(AccAva, { a: r.acc, size: 30 }),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontWeight: 700, fontFamily: "'Clash Display',sans-serif", fontSize: 13, color: txtCol } }, r.acc.name),
                        React.createElement("div", { style: { fontSize: 10, color: overdue ? "#ffb3b0" : "#7a9ab5" } }, r.acc.industry)))),
            React.createElement("td", { style: { padding: "12px 14px", fontWeight: 700, color: txtCol } }, fmtCurrency(r.total)),
            React.createElement("td", { style: { padding: "12px 14px", color: overdue ? "#a8c8ff" : "#4285f4", fontWeight: 600 } }, r.med > 0 ? fmtCurrency(r.med) : "—"),
            React.createElement("td", { style: { padding: "12px 14px", color: overdue ? "#d8b3ff" : "#9333ea", fontWeight: 600 } }, r.life > 0 ? fmtCurrency(r.life) : "—"),
            React.createElement("td", { style: { padding: "12px 14px" } },
                React.createElement("div", { style: { fontWeight: 700, color: overdue ? "#7dffe8" : "#0fa890", fontSize: 15, fontFamily: "'Clash Display',sans-serif" } }, fmtCurrency(r.cycleAmt)),
                React.createElement("div", { style: { fontSize: 10, color: overdue ? "#ffb3b0" : "#7a9ab5" } },
                    "per ",
                    ci.label.toLowerCase())),
            React.createElement("td", { style: { padding: "12px 14px" } },
                React.createElement("span", { style: { background: overdue ? "rgba(255,255,255,0.15)" : "#e8f0fe", color: overdue ? "#fff" : "#4285f4", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 } }, ci.label)),
            React.createElement("td", { style: { padding: "12px 14px" } },
                React.createElement("span", { style: { background: overdue ? "rgba(255,255,255,0.15)" : "#f0f4f8", color: overdue ? "#fff" : "#4a6080", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600 } }, r.method === "wire" ? "Wire Transfer" : "Cheque")),
            React.createElement("td", { style: { padding: "12px 14px", whiteSpace: "nowrap", fontWeight: 600, color: txtCol } }, r.nextDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })),
            React.createElement("td", { style: { padding: "12px 14px" } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                    overdue && React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "inline-block", flexShrink: 0 } }),
                    urgent && React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "#e0392e", display: "inline-block", flexShrink: 0, boxShadow: "0 0 0 2px #fff0ef" } }),
                    warn && React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "#d4880a", display: "inline-block", flexShrink: 0 } }),
                    React.createElement("span", { style: { fontWeight: 700, color: dayCol, fontFamily: "'Clash Display',sans-serif", fontSize: 15 } }, overdue ? `${Math.abs(r.days)}d overdue` : `${r.days}d`))),
            React.createElement("td", { style: { padding: "12px 14px" } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" } }, justPaid ? React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } },
                    React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", style: { flexShrink: 0 } },
                        React.createElement("circle", { cx: "12", cy: "12", r: "11", fill: "#0fa890", className: "success-anim" }),
                        React.createElement("path", { d: "M7 12.5 L10.5 16 L17 8.5", fill: "none", stroke: "#fff", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round", strokeDasharray: "16", strokeDashoffset: "16", style: { animation: "checkDraw .35s ease .1s forwards" } })),
                    React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: overdue ? "#7dffe8" : "#0fa890" } }, "Paid")) : React.createElement(React.Fragment, null,
                    React.createElement("button", { onClick: () => setInvoiceModal(true), style: { background: overdue ? "#fff" : "#0fa890", color: overdue ? "#5a0a0a" : "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } },
                        React.createElement(Ic, { name: "receipt" }),
                        " Invoice"),
                    r.days >= 0 && r.days <= 15 && React.createElement("button", { onClick: () => setInvoicePocPicker(true), style: { background: "#e8f0fe", color: "#4285f4", border: "1px solid #4285f444", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } },
                        React.createElement(Ic, { name: "envelope" }),
                        " Issue Invoice Email"),
                    r.days < -15 && React.createElement("button", { onClick: () => setNotifyPocPicker(true), style: { background: overdue ? "rgba(255,255,255,0.15)" : "#fff8ec", color: overdue ? "#fff" : "#d4880a", border: `1px solid ${overdue ? "rgba(255,255,255,0.3)" : "#d4880a44"}`, borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } }, "\uD83D\uDD14 Notification Email"),
                    r.days < -30 && React.createElement("button", { onClick: () => { const insurerName = (allIns || []).find(i => i.id === r.acc.carrierId)?.name; const { subject, body } = buildWarningEmail(r.acc, r.cycleKey, r.freq, insurerName); gmailComposeWithBody(r.acc.poc?.email, subject, body); }, style: { background: "#fff0ef", color: "#e0392e", border: "1px solid #e0392e44", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } },
                        React.createElement(Ic, { name: "warning" }),
                        " Send Warning Email"))))),
        invoiceModal && React.createElement(InvoiceBreakdownModal, { acc: r.acc, cycleKey: r.cycleKey, cycleAmt: r.cycleAmt, cycleMed: cycleMed, cycleLife: cycleLife, ci: ci, onConfirm: handleConfirm, onClose: () => setInvoiceModal(false) }),
        invoicePocPicker && (() => { const carrier = r.acc.carrierId ? (allIns || []).find(i => i.id === r.acc.carrierId) : null; const amPocs = (carrier?.pocs && carrier.pocs.length ? carrier.pocs : carrier?.poc?.name ? [carrier.poc] : []).filter(p => p && (p.name || p.email)); return React.createElement(ContactPickerModal, { title: "Issue Invoice Email", subtitle: `Select the Account Manager at ${carrier?.name || "the insurer"}`, pocs: amPocs, onClose: () => setInvoicePocPicker(false), onPick: am => { const { subject, body } = buildInvoiceRequestEmail(r.acc, r.cycleKey, r.freq, am.name); gmailComposeWithBody(am.email, subject, body); setInvoicePocPicker(false); } }); })(),
        notifyPocPicker && (() => { const insurerName = (allIns || []).find(i => i.id === r.acc.carrierId)?.name; const hrPocs = getPocs(r.acc); return React.createElement(ContactPickerModal, { title: "Notification Email", subtitle: `Select who to notify at ${r.acc.name}`, pocs: hrPocs, onClose: () => setNotifyPocPicker(false), onPick: hr => { const { subject, body } = buildNotificationEmail(r.acc, r.cycleKey, r.freq, insurerName, hr.name); gmailComposeWithBody(hr.email, subject, body); setNotifyPocPicker(false); } }); })());
}
function PaymentsView({ accounts, onSelectAcc, onMarkPaid, allIns }) {
    const rows = [];
    accounts.forEach(a => {
        if (a.renewalStatus === "terminated")
            return;
        const p = a.payment || {};
        const total = (p.medicalTotal || 0) + (p.lifeTotal || 0);
        if (!total || !a.serviceStartDate)
            return;
        const ci = getCycleInfo(p.frequency || "quarterly");
        const cycleAmt = total / ci.divisor;
        const paidCycles = p.paidCycles || [];
        const isPaidKey = k => paidCycles.some(x => (typeof x === "string" ? x : x.cycleKey) === k);
        const schedule = getPaymentSchedule(a.serviceStartDate, p.frequency || "quarterly");
        const unpaid = schedule.filter(s => !isPaidKey(s.cycleKey)).sort((x, y) => x.date - y.date);
        if (unpaid.length === 0)
            return;
        const target = unpaid[0];
        const days = daysUntil(target.date);
        rows.push({ acc: a, total, cycleAmt, freq: p.frequency || "quarterly", method: p.method || "wire", nextDate: target.date, cycleKey: target.cycleKey, days, ci, med: p.medicalTotal || 0, life: p.lifeTotal || 0 });
    });
    rows.sort((a, b) => a.days - b.days);
    if (rows.length === 0)
        return React.createElement("div", { style: { ...c.card, padding: "3rem", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, "No outstanding payments. Add accounts with a service start date and payment details.");
    const [payFilter, setPayFilter] = useState(null);
    const filteredRows = payFilter === "overdue" ? rows.filter(r => r.days < 0) : payFilter === "urgent" ? rows.filter(r => r.days >= 0 && r.days <= 15) : payFilter === "soon" ? rows.filter(r => r.days > 15 && r.days <= 30) : rows;
    return React.createElement("div", null,
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 } }, [{ l: "Outstanding Payments", v: rows.length, col: "#4285f4", key: null }, { l: "Overdue", v: rows.filter(r => r.days < 0).length, col: "#7a0d0d", key: "overdue" }, { l: "Due within 15 days", v: rows.filter(r => r.days >= 0 && r.days <= 15).length, col: "#e0392e", key: "urgent" }, { l: "Due within 30 days", v: rows.filter(r => r.days > 15 && r.days <= 30).length, col: "#d4880a", key: "soon" }].map(({ l, v, col, key }) => React.createElement("div", { key: l, onClick: () => setPayFilter(payFilter === key ? null : key), style: { ...c.sc(col), cursor: "pointer", transition: "all .15s", userSelect: "none", outline: payFilter === key ? `2.5px solid ${col}` : "none", outlineOffset: 2 }, onMouseEnter: e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${col}33`; }, onMouseLeave: e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; } },
            React.createElement("div", { style: c.sn(col) }, v),
            React.createElement("div", { style: c.sl }, l.toUpperCase()),
            payFilter === key && React.createElement("div", { style: { fontSize: 9, color: col, fontWeight: 700, marginTop: 4 } }, "\u25CF FILTERED")))),
        React.createElement("div", { style: c.card },
            React.createElement("div", { style: c.cHdr },
                React.createElement("span", { style: { ...c.cTitle, color: "#0fa890" } },
                    React.createElement(Ic, { name: "card" }),
                    " ",
                    payFilter ? "Filtered Payments" : "All Account Payments"),
                React.createElement("div", { style: { display: "flex", gap: 7, alignItems: "center" } },
                    payFilter && React.createElement("button", { onClick: () => setPayFilter(null), style: { fontSize: 10, fontWeight: 700, color: "#7a9ab5", background: "#f0f4f8", border: "none", borderRadius: 20, padding: "3px 10px", cursor: "pointer" } }, "\u00D7 Clear filter"),
                    React.createElement("span", { style: { fontSize: 11, color: "#7a9ab5", fontWeight: 600 } }, "Sorted by next due date \u00B7 Overdue in deep red"))),
            React.createElement("div", { style: { overflowX: "auto" } },
                React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 } },
                    React.createElement("thead", null,
                        React.createElement("tr", { style: { background: "#f7fbff", borderBottom: "2px solid #edf2f7" } }, ["Account", "Annual Premium", "Medical", "Life", "Per Cycle", "Frequency", "Method", "Payment Due", "Days", "Action"].map(h => React.createElement("th", { key: h, style: { padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: .7, whiteSpace: "nowrap" } }, h)))),
                    React.createElement("tbody", null, filteredRows.map((r, i) => React.createElement(PaymentTableRow, { key: r.acc.id, r: r, onSelectAcc: onSelectAcc, onMarkPaid: onMarkPaid, allIns: allIns })))))));
}
function UtilizationPocModal({ acc, allIns, onClose, onSaveCarrierPoc }) {
    const carrier = acc.carrierId ? allIns.find(i => i.id === acc.carrierId) : null;
    const existingPocs = (carrier?.pocs || []).filter(p => p.name || p.email || p.phone);
    const legacyPoc = (!carrier?.pocs || carrier.pocs.length === 0) && carrier?.poc?.email ? [carrier.poc] : [];
    const allPocs = [...existingPocs, ...legacyPoc];
    const [mode, setMode] = useState(allPocs.length === 0 ? "add" : "pick");
    const [newPoc, setNewPoc] = useState({ name: "", title: "", phone: "", email: "" });
    const [saving, setSaving] = useState(false);
    if (!carrier) {
        return React.createElement("div", { className: "modal-bg-anim", style: c.modal },
            React.createElement("div", { className: "modal-box-anim", style: { ...c.mBox, width: 440, textAlign: "center", padding: "2.5rem 2rem" } },
                React.createElement("div", { style: { fontSize: 32, marginBottom: 10 } },
                    React.createElement(Ic, { name: "warning" }),
                    "\uFE0F"),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif", marginBottom: 6 } }, "No Risk Carrier Set"),
                React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginBottom: 18 } },
                    acc.name,
                    " doesn't have a Risk Carrier assigned yet. Set one in the account's Insurance Setup first."),
                React.createElement("button", { style: c.cBtn, onClick: onClose }, "Close")));
    }
    function sendEmail(poc) { const { subject, body } = buildUtilizationEmail(acc, poc); gmailComposeWithBody(poc.email, subject, body); onClose(); }
    function handleAddAndSend() { if (!newPoc.name.trim() || !newPoc.email.trim()) {
        alert("Please provide at least a name and email.");
        return;
    } setSaving(true); setTimeout(() => { onSaveCarrierPoc(carrier.id, newPoc); sendEmail(newPoc); }, 650); }
    return React.createElement("div", { className: "modal-bg-anim", style: c.modal },
        React.createElement("div", { className: "modal-box-anim", style: { ...c.mBox, width: 460 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 4 } },
                React.createElement("div", { style: { width: 38, height: 38, borderRadius: "50%", background: "#fff8e6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 } }, React.createElement(Ic, { name: "chart" })),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Request Utilization"),
                    React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } },
                        acc.name,
                        " via ",
                        carrier.name))),
            React.createElement("div", { style: { height: 1, background: "#edf2f7", margin: "14px 0" } }),
            mode === "pick" && React.createElement("div", { className: "field-anim" },
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#d4880a", margin: "4px 0 10px", textTransform: "uppercase", letterSpacing: .7 } }, "Select a Point of Contact"),
                allPocs.map((poc, i) => React.createElement("div", { key: i, onClick: () => sendEmail(poc), style: { background: "#f7fbff", border: "1.5px solid #edf2f7", borderRadius: 11, padding: "12px 14px", marginBottom: 9, cursor: "pointer", display: "flex", alignItems: "center", gap: 11, transition: "all .15s" }, onMouseEnter: e => { e.currentTarget.style.borderColor = "#d4880a88"; e.currentTarget.style.background = "#fff8e6"; }, onMouseLeave: e => { e.currentTarget.style.borderColor = "#edf2f7"; e.currentTarget.style.background = "#f7fbff"; } },
                    React.createElement("div", { style: { ...c.ava(poc.name || "?"), width: 38, height: 38, fontSize: 13 } }, ini(poc.name || "?")),
                    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700 } },
                            poc.name || "Unnamed contact",
                            poc.title && React.createElement("span", { style: { fontWeight: 400, color: "#7a9ab5", marginLeft: 6, fontSize: 11 } }, poc.title)),
                        React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5" } }, poc.email)),
                    React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#d4880a" } }, "Send \u2192"))),
                React.createElement("button", { onClick: () => setMode("add"), style: { background: "none", border: "1.5px dashed #dde8f0", borderRadius: 10, padding: "9px 14px", fontSize: 12, color: "#7a9ab5", cursor: "pointer", width: "100%", fontWeight: 600, marginTop: 4 } }, "+ Add another contact"),
                React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 14 } },
                    React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"))),
            mode === "add" && !saving && React.createElement("div", { className: "field-anim" },
                allPocs.length === 0 && React.createElement("div", { style: { background: "#fff8e6", border: "1px solid #f6d86088", borderRadius: 10, padding: "10px 13px", marginBottom: 14, fontSize: 12, color: "#92680a" } },
                    "No point of contact found for ",
                    carrier.name,
                    ". Add one below to send the request."),
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#d4880a", margin: "4px 0 10px", textTransform: "uppercase", letterSpacing: .7 } },
                    "New Point of Contact \u2014 ",
                    carrier.name),
                [["Name", "name", "text"], ["Title", "title", "text"], ["Phone", "phone", "text"], ["Email", "email", "email"]].map(([lb, k, t]) => React.createElement("div", { key: k },
                    React.createElement("label", { style: c.fl }, lb),
                    React.createElement("input", { style: c.fi, type: t, value: newPoc[k], onChange: e => setNewPoc(p => ({ ...p, [k]: e.target.value })), autoFocus: k === "name" }))),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 10 } },
                    allPocs.length > 0 && React.createElement("button", { style: c.cBtn, onClick: () => setMode("pick") }, "Back"),
                    React.createElement("button", { style: { ...c.sv, background: "#d4880a" }, onClick: handleAddAndSend }, "Save & Send Email"))),
            saving && React.createElement("div", { style: { padding: "2.5rem 1rem", textAlign: "center" } },
                React.createElement("div", { style: { width: 48, height: 48, margin: "0 auto 16px", borderRadius: "50%", border: "4px solid #fff3d6", borderTopColor: "#d4880a", animation: "spinSlow .8s linear infinite" } }),
                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Saving contact..."),
                React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginTop: 4 } },
                    "Adding ",
                    newPoc.name,
                    " to ",
                    carrier.name))));
}
function SecureRenewalAnimatedModal({ acc, block, allIns, onClose, onConfirm }) {
    const [step, setStep] = useState("form");
    const showMedPay = block.key === "combined" || block.key === "medical";
    const showLifePay = block.key === "combined" || block.key === "life";
    const showTpaHmo = block.key !== "life";
    const [f, setF] = useState({ policyNumber: block.policyNumber || "", policyStartDate: block.startDate || "", policyEndDate: block.endDate || "", premiumNoTax: String(block.premiumNoTax || ""), medTotal: String(acc.payment?.medicalTotal || ""), lifeTotal: String(acc.payment?.lifeTotal || ""), carrierId: block.carrierId || "", tpaId: block.tpaId || "", tpaIsCarrier: !!block.tpaIsCarrier, hmoId: block.hmoId || "", adherentsPrincipal: String(getAdherents(acc).principal || ""), adherentsFamily: String(getAdherents(acc).family || "") });
    const ch = (k, v) => setF(p => ({ ...p, [k]: v }));
    const carriers = allIns.filter(i => i.types.includes("carrier"));
    const tpas = allIns.filter(i => i.types.includes("tpa") && !i.types.includes("carrier"));
    const tpaCar = allIns.filter(i => i.types.includes("carrier") && i.types.includes("tpa"));
    const hmos = allIns.filter(i => i.types.includes("hmo"));
    function handleConfirm() { setStep("saving"); setTimeout(() => { setStep("done"); setTimeout(() => { onConfirm({ carrierId: f.carrierId, tpaId: f.tpaId, tpaIsCarrier: f.tpaIsCarrier, hmoId: f.hmoId, policyNumber: f.policyNumber, startDate: f.policyStartDate, endDate: f.policyEndDate, premiumNoTax: parseFloat(f.premiumNoTax) || 0 }, { ...(showMedPay ? { medicalTotal: parseFloat(f.medTotal) || 0 } : {}), ...(showLifePay ? { lifeTotal: parseFloat(f.lifeTotal) || 0 } : {}) }, { principal: parseInt(f.adherentsPrincipal) || 0, family: parseInt(f.adherentsFamily) || 0 }); }, 900); }, 700); }
    return React.createElement("div", { className: "modal-bg-anim", style: c.modal },
        React.createElement("div", { className: "modal-box-anim", style: { ...c.mBox, width: 520, position: "relative", overflowX: "hidden", overflowY: "auto" } },
            step === "form" && React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 4 } },
                    React.createElement("div", { style: { width: 38, height: 38, borderRadius: "50%", background: "#e8faf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 } }, React.createElement(Ic, { name: "celebrate" })),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 16, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Renewal Secured"),
                        React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } },
                            acc.name,
                            " \u2014 ",
                            React.createElement("span", { style: { color: "#0fa890", fontWeight: 700 } }, block.label)))),
                React.createElement("div", { style: { height: 1, background: "#edf2f7", margin: "14px 0" } }),
                React.createElement("div", { className: "field-anim", style: { animationDelay: ".02s" } },
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#0fa890", margin: "4px 0 8px", textTransform: "uppercase", letterSpacing: .7 } },
                        "Policy Details (",
                        block.label,
                        ")"),
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                        React.createElement("div", null,
                            React.createElement("label", { style: c.fl }, "Policy number"),
                            React.createElement("input", { style: c.fi, value: f.policyNumber, onChange: e => ch("policyNumber", e.target.value), placeholder: "POL-2026-00123" })),
                        React.createElement("div", null,
                            React.createElement("label", { style: c.fl }, "Policy start date"),
                            React.createElement("input", { style: c.fi, type: "date", value: f.policyStartDate, onChange: e => ch("policyStartDate", e.target.value) })),
                        React.createElement("div", null,
                            React.createElement("label", { style: c.fl }, "Policy end date"),
                            React.createElement("input", { style: c.fi, type: "date", value: f.policyEndDate, onChange: e => ch("policyEndDate", e.target.value) }))),
                    f.policyEndDate && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: 6 } },
                        "New renewal date (auto): ",
                        React.createElement("b", { style: { color: "#0f1c2e" } }, fmtShort(addDaysISO(f.policyEndDate, 1))))),
                React.createElement("div", { className: "field-anim", style: { animationDelay: ".07s" } },
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#4285f4", margin: "10px 0 8px", textTransform: "uppercase", letterSpacing: .7 } }, "Insurance Setup"),
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Risk Carrier"),
                        React.createElement("select", { style: c.fi, value: f.carrierId, onChange: e => ch("carrierId", e.target.value) },
                            React.createElement("option", { value: "" }, "-- Select carrier --"),
                            carriers.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)))),
                    showTpaHmo && React.createElement(React.Fragment, null,
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } },
                            React.createElement("input", { type: "checkbox", id: "srtic", checked: f.tpaIsCarrier, onChange: e => { ch("tpaIsCarrier", e.target.checked); if (e.target.checked)
                                    ch("tpaId", ""); }, style: { accentColor: "#0fa890", width: 14, height: 14, cursor: "pointer" } }),
                            React.createElement("label", { htmlFor: "srtic", style: { fontSize: 12, color: "#7a9ab5", cursor: "pointer" } }, "Risk Carrier is also the TPA")),
                        !f.tpaIsCarrier && React.createElement("div", null,
                            React.createElement("label", { style: c.fl }, "TPA"),
                            React.createElement("select", { style: c.fi, value: f.tpaId, onChange: e => ch("tpaId", e.target.value) },
                                React.createElement("option", { value: "" }, "-- Select TPA --"),
                                tpas.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)),
                                tpaCar.length > 0 && React.createElement("optgroup", { label: "Carriers acting as TPA" }, tpaCar.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name))))),
                        React.createElement("div", null,
                            React.createElement("label", { style: c.fl }, "HMO"),
                            React.createElement("select", { style: c.fi, value: f.hmoId, onChange: e => ch("hmoId", e.target.value) },
                                React.createElement("option", { value: "" }, "-- None --"),
                                hmos.map(i => React.createElement("option", { key: i.id, value: i.id }, i.name)))))),
                React.createElement("div", { className: "field-anim", style: { animationDelay: ".12s" } },
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#9333ea", margin: "10px 0 8px", textTransform: "uppercase", letterSpacing: .7 } }, "Premiums"),
                    React.createElement("div", null,
                        React.createElement("label", { style: c.fl }, "Premium without taxes (EGP)"),
                        React.createElement("input", { style: c.fi, type: "number", value: f.premiumNoTax, onChange: e => ch("premiumNoTax", e.target.value), placeholder: "0" })),
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: showMedPay && showLifePay ? "1fr 1fr" : "1fr", gap: 10 } },
                        showMedPay && React.createElement("div", null,
                            React.createElement("label", { style: c.fl }, "Medical premium with taxes (EGP)"),
                            React.createElement("input", { style: c.fi, type: "number", value: f.medTotal, onChange: e => ch("medTotal", e.target.value), placeholder: "0" })),
                        showLifePay && React.createElement("div", null,
                            React.createElement("label", { style: c.fl }, "Life premium with taxes (EGP)"),
                            React.createElement("input", { style: c.fi, type: "number", value: f.lifeTotal, onChange: e => ch("lifeTotal", e.target.value), placeholder: "0" })))),
                React.createElement("div", { className: "field-anim", style: { animationDelay: ".16s" } },
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#d4880a", margin: "10px 0 8px", textTransform: "uppercase", letterSpacing: .7 } }, "Updated Adherents"),
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                        React.createElement("div", null,
                            React.createElement("label", { style: c.fl }, "Principal"),
                            React.createElement("input", { style: c.fi, type: "number", value: f.adherentsPrincipal, onChange: e => ch("adherentsPrincipal", e.target.value), placeholder: "0" })),
                        React.createElement("div", null,
                            React.createElement("label", { style: c.fl }, "Family (spouse/child/parent)"),
                            React.createElement("input", { style: c.fi, type: "number", value: f.adherentsFamily, onChange: e => ch("adherentsFamily", e.target.value), placeholder: "0" }))),
                    React.createElement("div", { style: { fontSize: 10, color: "#a8bccf", marginTop: 2 } },
                        "Current on file: ",
                        adherentsTotal(acc),
                        " adherent(s) (",
                        getAdherents(acc).principal,
                        " principal + ",
                        getAdherents(acc).family,
                        " family). Enter the new totals after this renewal.")),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 14 } },
                    React.createElement("button", { style: c.cBtn, onClick: onClose }, "Cancel"),
                    React.createElement("button", { style: { ...c.sv, background: "#0fa890" }, onClick: handleConfirm }, "\u2713 Confirm & Secure"))),
            step === "saving" && React.createElement("div", { style: { padding: "3rem 1rem", textAlign: "center" } },
                React.createElement("div", { style: { width: 54, height: 54, margin: "0 auto 18px", borderRadius: "50%", border: "4px solid #e8faf8", borderTopColor: "#0fa890", animation: "spinSlow .8s linear infinite" } }),
                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#0f1c2e", fontFamily: "'Clash Display',sans-serif" } }, "Updating policy..."),
                React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginTop: 4 } },
                    "Saving ",
                    acc.name,
                    "'s ",
                    block.label,
                    " renewal details")),
            step === "done" && React.createElement("div", { className: "success-anim", style: { padding: "3rem 1rem", textAlign: "center" } },
                React.createElement("svg", { width: "64", height: "64", viewBox: "0 0 64 64", style: { margin: "0 auto 16px", display: "block" } },
                    React.createElement("circle", { cx: "32", cy: "32", r: "30", fill: "#e8faf8", stroke: "#0fa890", strokeWidth: "2" }),
                    React.createElement("path", { d: "M20 33 L28 41 L44 23", fill: "none", stroke: "#0fa890", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round", strokeDasharray: "48", strokeDashoffset: "48", style: { animation: "checkDraw .5s ease .15s forwards" } })),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: "#0f1c2e", fontFamily: "'Clash Display',sans-serif" } }, "Renewal Secured!"),
                React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginTop: 4 } },
                    acc.name,
                    "'s ",
                    block.label,
                    " policy has been updated"))));
}
const CL_STATUS_META = { not_started: { label: "Not Started", color: "#7a9ab5", bg: "#f0f4f8" }, in_progress: { label: "In Progress", color: "#4285f4", bg: "#e8f0fe" }, blocked: { label: "Waiting / Blocked", color: "#d4880a", bg: "#fff8e6" }, completed: { label: "Completed", color: "#0fa890", bg: "#e8faf8" } };
function ChecklistTaskRow({ acc, chk, task, expanded, onToggleExpand, onUpdate, onOpenOnboarding }) {
    const st = getTaskState(chk, task.id);
    const due = effectiveDueDate(acc, chk, task);
    const overdue = due && st.status !== "completed" && new Date(due) < new Date();
    const [draft, setDraft] = useState({ description: st.description || "", nextAction: st.nextAction || "", dueDate: st.dueDate || "" });
    useEffect(() => { if (expanded)
        setDraft({ description: st.description || "", nextAction: st.nextAction || "", dueDate: st.dueDate || "" }); }, [expanded]);
    if (task.isOnboardingLink) {
        const ob = computeOnboardingProgress(chk);
        return React.createElement("div", { onClick: onOpenOnboarding, title: "Open detailed onboarding checklist", style: { padding: "10px 14px", borderBottom: "1px solid #f0f4f8", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "background .12s ease" }, onMouseEnter: e => e.currentTarget.style.background = "#f7fbff", onMouseLeave: e => e.currentTarget.style.background = "transparent" },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 9 } },
                React.createElement("span", { style: { fontSize: 15, color: "#4285f4" } }, "\u2610"),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#4285f4" } }, task.label),
                    React.createElement("div", { style: { fontSize: 10, color: "#a0b8cc" } }, "Open onboarding checklist \u2197"))),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                React.createElement("div", { style: { width: 60, height: 5, background: "#edf2f7", borderRadius: 4, overflow: "hidden" } },
                    React.createElement("div", { style: { height: "100%", width: `${ob.pct}%`, background: "#4285f4" } })),
                React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#4285f4" } },
                    ob.pct,
                    "%")));
    }
    const meta = CL_STATUS_META[st.status] || CL_STATUS_META.not_started;
    return React.createElement("div", { style: { borderBottom: "1px solid #f0f4f8" } },
        React.createElement("div", { style: { padding: "10px 14px", display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }, onClick: onToggleExpand },
            React.createElement("button", { onClick: e => { e.stopPropagation(); onUpdate(task.id, { status: st.status === "completed" ? "not_started" : "completed", completedAt: st.status === "completed" ? null : new Date().toISOString() }); }, "aria-label": st.status === "completed" ? "Mark not completed" : "Mark completed", style: { background: "none", border: "none", cursor: "pointer", fontSize: 17, color: st.status === "completed" ? "#0fa890" : "#c0cdd8", padding: 0, lineHeight: 1, flexShrink: 0 } }, st.status === "completed" ? "✓" : "☐"),
            React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: st.status === "completed" ? "#a0b8cc" : "#0f1c2e", textDecoration: st.status === "completed" ? "line-through" : "none" } }, task.label),
                st.nextAction && React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5", marginTop: 2 } },
                    "Next: ",
                    st.nextAction)),
            due && React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: overdue ? "#e0392e" : "#a0b8cc", whiteSpace: "nowrap" } },
                overdue ? "⚠ OVERDUE — " : "",
                fmtShort(due)),
            React.createElement("span", { style: { display: "inline-block", background: meta.bg, color: meta.color, fontSize: 10, padding: "2px 9px", borderRadius: 20, fontWeight: 700, whiteSpace: "nowrap" } }, meta.label),
            React.createElement("span", { style: { fontSize: 10, color: "#c0cdd8" } }, expanded ? "▴" : "▾")),
        expanded && React.createElement("div", { style: { padding: "4px 14px 14px 41px", background: "#fafcfe" } },
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 } },
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl }, "Status"),
                    React.createElement("select", { style: c.fi, value: st.status, onChange: e => onUpdate(task.id, { status: e.target.value, completedAt: e.target.value === "completed" ? new Date().toISOString() : st.completedAt }) },
                        React.createElement("option", { value: "not_started" }, "Not Started"),
                        React.createElement("option", { value: "in_progress" }, "In Progress"),
                        React.createElement("option", { value: "blocked" }, "Waiting / Blocked"),
                        React.createElement("option", { value: "completed" }, "Completed"))),
                React.createElement("div", null,
                    React.createElement("label", { style: c.fl },
                        "Due date",
                        task.dueOffsetDays ? ` (suggested ${fmtShort(milestoneDate(acc, task))})` : ""),
                    React.createElement("input", { style: c.fi, type: "date", value: draft.dueDate, onChange: e => setDraft(d => ({ ...d, dueDate: e.target.value })), onBlur: () => onUpdate(task.id, { dueDate: draft.dueDate }) }))),
            React.createElement("label", { style: c.fl }, "Description"),
            React.createElement("textarea", { style: c.ni, value: draft.description, onChange: e => setDraft(d => ({ ...d, description: e.target.value })), onBlur: () => onUpdate(task.id, { description: draft.description }), placeholder: "Notes on this task..." }),
            React.createElement("label", { style: { ...c.fl, marginTop: 8 } }, "Next Action"),
            React.createElement("input", { style: c.fi, type: "text", value: draft.nextAction, onChange: e => setDraft(d => ({ ...d, nextAction: e.target.value })), onBlur: () => onUpdate(task.id, { nextAction: draft.nextAction }), placeholder: "e.g. Follow up with GIG" })));
}
function OnboardingModal({ acc, chk, onToggle, onClose }) {
    const prog = computeOnboardingProgress(chk);
    return React.createElement("div", { className: "modal-bg-anim", style: c.modal, onClick: onClose },
        React.createElement("div", { className: "modal-box-anim", style: { ...c.mBox, width: 560, maxHeight: "85vh" }, onClick: e => e.stopPropagation() },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#4285f4", textTransform: "uppercase", letterSpacing: .8 } }, "Onboarding Checklist"),
                    React.createElement("div", { style: { fontSize: 17, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, acc.name)),
                React.createElement("button", { onClick: onClose, "aria-label": "Close", style: { background: "none", border: "none", fontSize: 22, color: "#c0cdd8", cursor: "pointer", lineHeight: 1 } }, "\u00D7")),
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#0fa890", marginBottom: 4 } },
                prog.pct,
                "% Complete"),
            React.createElement("div", { style: { height: 8, background: "#edf2f7", borderRadius: 4, marginBottom: 16, overflow: "hidden" } },
                React.createElement("div", { style: { height: "100%", width: `${prog.pct}%`, background: "#0fa890", transition: "width .3s ease" } })),
            ONBOARDING_SECTIONS.map(sec => React.createElement("div", { key: sec.key, style: { marginBottom: 14 } },
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: .6, marginBottom: 6 } }, sec.label),
                sec.tasks.map(t => {
                    const done = !!(chk.onboarding && chk.onboarding[t.id]);
                    return React.createElement("div", { key: t.id, role: "checkbox", "aria-checked": done, tabIndex: 0, onClick: () => onToggle(t.id), onKeyDown: e => { if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onToggle(t.id);
                        } }, style: { display: "flex", alignItems: "center", gap: 9, padding: "7px 6px", cursor: "pointer", borderRadius: 7, outlineOffset: 2 }, onMouseEnter: e => e.currentTarget.style.background = "#f7fbff", onMouseLeave: e => e.currentTarget.style.background = "transparent" },
                        React.createElement("span", { style: { fontSize: 15, color: done ? "#0fa890" : "#c0cdd8" } }, done ? "✓" : "☐"),
                        React.createElement("span", { style: { fontSize: 13, color: done ? "#a0b8cc" : "#0f1c2e", textDecoration: done ? "line-through" : "none" } }, t.label));
                })))));
}
function ChecklistView({ accounts, checklists, selAccId, onSelectAcc, onUpdateTask, onToggleOnboarding, onSaveNote }) {
    const [search, setSearch] = useState("");
    const [expandedTask, setExpandedTask] = useState(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showNote, setShowNote] = useState(false);
    const [noteDraft, setNoteDraft] = useState("");
    const filtered = accounts.filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()));
    const acc = accounts.find(a => a.id === selAccId) || null;
    const chk = acc ? getChecklist(checklists, acc.id) : null;
    useEffect(() => { setExpandedTask(null); setShowOnboarding(false); setShowNote(false); }, [selAccId]);
    return React.createElement("div", { className: "checklist-v1", style: { display: "grid", gridTemplateColumns: "280px 1fr", gap: 16, alignItems: "start" } },
        React.createElement("div", { className: "checklist-sidebar", style: c.sidebar },
            React.createElement("div", { style: c.sbHdr },
                React.createElement("span", { style: c.sbTit }, "Accounts")),
            React.createElement("div", { style: { padding: "10px 12px 4px" } },
                React.createElement("input", { style: c.srch, placeholder: "Search accounts...", value: search, onChange: e => setSearch(e.target.value), "aria-label": "Search accounts" })),
            React.createElement("div", { style: { maxHeight: 660, overflowY: "auto" } },
                filtered.length === 0 && React.createElement("div", { style: { padding: "2rem 1rem", textAlign: "center", color: "#c0cdd8", fontSize: 12 } }, accounts.length === 0 ? React.createElement(React.Fragment, null,
                    "No accounts available",
                    React.createElement("div", { style: { fontSize: 11, marginTop: 6 } }, "Add an account to begin tracking its renewal checklist.")) : "No matching accounts."),
                filtered.map(a => {
                    const ck = getChecklist(checklists, a.id);
                    const prog = computeRenewalProgress(ck);
                    const health = computeRenewalHealth(a, ck);
                    const hm = HEALTH_META[health];
                    const active = a.id === selAccId;
                    return React.createElement("button", { key: a.id, onClick: () => onSelectAcc(a.id), style: { ...c.aiRow(active), flexDirection: "column", alignItems: "stretch", gap: 5, padding: "11px 14px", width: "100%", textAlign: "left", font: "inherit" } },
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                            React.createElement(AccAva, { a: a, size: 26 }),
                            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#0f1c2e", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, a.name)),
                        React.createElement("div", { style: { fontSize: 10, color: "#a0b8cc" } }, a.renewalDate ? `Renewal: ${fmtShort(a.renewalDate)}` : "Renewal date not available"),
                        React.createElement("div", { style: { height: 5, background: "#edf2f7", borderRadius: 4, overflow: "hidden" } },
                            React.createElement("div", { style: { height: "100%", width: `${prog.pct}%`, background: "#0fa890", borderRadius: 4, transition: "width .3s ease" } })),
                        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                            React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: "#7a9ab5" } },
                                prog.pct,
                                "%"),
                            React.createElement("span", { style: { fontSize: 9, fontWeight: 700, color: hm.color } },
                                "\u25CF ",
                                hm.label)));
                }))),
        React.createElement("div", { className: "checklist-workspace" },
            !acc && React.createElement("div", { className: "checklist-empty-panel", style: c.panel },
                React.createElement("div", { style: { padding: "3rem", textAlign: "center", color: "#c0cdd8", fontSize: 13 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: "#7a9ab5", marginBottom: 6 } }, "Select an account"),
                    "Choose an account from the left panel to view its checklist.")),
            acc && (() => {
                const overall = computeOverallProgress(chk), renProg = computeRenewalProgress(chk), obProg = computeOnboardingProgress(chk);
                const health = computeRenewalHealth(acc, chk), hm = HEALTH_META[health];
                const stage = computeCurrentStage(acc);
                const days = acc.renewalDate ? Math.ceil((new Date(acc.renewalDate) - new Date()) / 86400000) : null;
                return React.createElement("div", { key: acc.id, className: "checklist-fade-in" },
                    React.createElement("div", { className: "checklist-account-panel", style: c.panel },
                        React.createElement("div", { style: { padding: 18 } },
                            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 } },
                                React.createElement("div", null,
                                    React.createElement("div", { style: { fontSize: 19, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, acc.name.toUpperCase()),
                                    React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginTop: 2 } },
                                        acc.renewalDate ? `Renewal Date: ${fmtShort(acc.renewalDate)}` : "Renewal date not available",
                                        days != null && (days >= 0 ? ` · ${days} days remaining` : ` · ${Math.abs(days)} days overdue`)),
                                    stage && React.createElement("div", { style: { fontSize: 11, color: "#4285f4", fontWeight: 700, marginTop: 4 } },
                                        "Current Stage: ",
                                        RENEWAL_STAGES.find(s => s.key === stage)?.label)),
                                React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } },
                                    React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: hm.color, background: hm.bg, borderRadius: 20, padding: "5px 12px", whiteSpace: "nowrap" } },
                                        "\u25CF ",
                                        hm.label),
                                    React.createElement("button", { onClick: () => { setNoteDraft(chk.quickNote || ""); setShowNote(o => !o); }, style: c.cBtn }, "+ Quick Note"),
                                    React.createElement("button", { onClick: () => exportChecklistToExcel(acc, chk), style: c.sv }, "\u2B07 Export Excel"))),
                            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 16 } }, [["Overall Progress", overall, "#0fa890"], ["Renewal Progress", renProg, "#4285f4"], ["Onboarding Progress", obProg, "#9333ea"]].map(([lbl, p, col]) => React.createElement("div", { key: lbl, style: c.ic },
                                React.createElement("div", { style: c.iL }, lbl),
                                React.createElement("div", { style: c.iV },
                                    p.pct,
                                    "%"),
                                React.createElement("div", { style: { height: 6, background: "#edf2f7", borderRadius: 4, marginTop: 6, overflow: "hidden" } },
                                    React.createElement("div", { style: { height: "100%", width: `${p.pct}%`, background: col, transition: "width .3s ease" } })),
                                React.createElement("div", { style: { fontSize: 10, color: "#a0b8cc", marginTop: 4 } },
                                    p.done,
                                    "/",
                                    p.total,
                                    " completed")))),
                            showNote && React.createElement("div", { style: { marginTop: 14, background: "#fffbdd", border: "1px solid #e8dfa0", borderRadius: 10, padding: 12 } },
                                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#8a7a20", marginBottom: 6, textTransform: "uppercase", letterSpacing: .5 } }, "Quick Note"),
                                React.createElement("textarea", { style: { ...c.ni, minHeight: 60 }, value: noteDraft, onChange: e => setNoteDraft(e.target.value), placeholder: "AXA sent revised proposal. Client requested lower deductible..." }),
                                React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 8 } },
                                    React.createElement("button", { style: c.sv, onClick: () => { onSaveNote(acc.id, noteDraft); setShowNote(false); } }, "Save Note"),
                                    React.createElement("button", { style: c.cBtn, onClick: () => setShowNote(false) }, "Cancel"))),
                            !showNote && chk.quickNote && React.createElement("div", { onClick: () => { setNoteDraft(chk.quickNote); setShowNote(true); }, style: { marginTop: 14, background: "#fffbdd", border: "1px solid #e8dfa0", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#5c5220", cursor: "pointer", whiteSpace: "pre-wrap" } },
                                React.createElement(Ic, { name: "edit" }),
                                " ",
                                chk.quickNote))),
                    React.createElement("div", { className: "checklist-workflow-panel", style: c.panel },
                        React.createElement("div", { style: c.pH },
                            React.createElement("span", { style: c.cTitle }, "Renewal Workflow")),
                        RENEWAL_STAGES.map(stg => React.createElement("div", { key: stg.key },
                            React.createElement("div", { style: { padding: "9px 14px", background: stg.key === stage ? "#e8f0fe" : "#fafcfe", borderBottom: "1px solid #edf2f7", borderTop: "1px solid #edf2f7" } },
                                React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: stg.key === stage ? "#4285f4" : "#7a9ab5", textTransform: "uppercase", letterSpacing: .6 } }, stg.label),
                                React.createElement("span", { style: { fontSize: 10, color: "#a0b8cc", marginLeft: 8 } }, stg.subtitle),
                                stg.key === stage && React.createElement("span", { style: { fontSize: 9, fontWeight: 700, color: "#4285f4", marginLeft: 8, background: "#fff", border: "1px solid #4285f444", borderRadius: 20, padding: "1px 8px" } }, "CURRENT")),
                            stg.tasks.map(task => React.createElement(ChecklistTaskRow, { key: task.id, acc: acc, chk: chk, task: task, expanded: expandedTask === task.id, onToggleExpand: () => setExpandedTask(e => e === task.id ? null : task.id), onUpdate: (taskId, patch) => onUpdateTask(acc.id, taskId, patch), onOpenOnboarding: () => setShowOnboarding(true) }))))));
            })()),
        showOnboarding && acc && React.createElement(OnboardingModal, { acc: acc, chk: chk, onToggle: taskId => onToggleOnboarding(acc.id, taskId), onClose: () => setShowOnboarding(false) }));
}
function RenewalsView({ accounts, allIns, onSelectAcc, onSecure, onTerminate }) {
    const rows = accounts.flatMap(a => getPolicyBlocks(a).map(b => ({ acc: a, block: b, status: getBlockStatus(a, b.key) }))).filter(r => r.status !== "secured" && r.status !== "terminated" && r.block.renewalDate).map(r => ({ ...r, diff: Math.ceil((new Date(r.block.renewalDate) - new Date()) / 86400000) })).sort((a, b) => a.diff - b.diff);
    const [renFilter, setRenFilter] = useState(null);
    const filteredRows = renFilter === "overdue" ? rows.filter(r => r.diff < 0) : renFilter === "urgent" ? rows.filter(r => r.diff >= 0 && r.diff <= 15) : renFilter === "upcoming" ? rows.filter(r => r.diff > 15 && r.diff <= 45) : rows;
    function rowStyle(diff) { if (diff < 0)
        return { bg: "#5a0a0a", bgLight: "#fde2e1", color: "#fff", border: "#7a0d0d", label: "OVERDUE", textColor: "#7a0d0d" }; if (diff <= 15)
        return { bg: "#fff0ef", bgLight: "#fff0ef", color: "#e0392e", border: "#e0392e66", label: "URGENT", textColor: "#e0392e" }; if (diff <= 30)
        return { bg: "#fff8e6", bgLight: "#fff8e6", color: "#d4880a", border: "#d4880a44", label: "SOON", textColor: "#d4880a" }; if (diff <= 45)
        return { bg: "#fefce8", bgLight: "#fefce8", color: "#7a6500", border: "#7a650033", label: "", textColor: "#7a6500" }; return { bg: "#fff", bgLight: "#fff", color: "#0fa890", border: "#edf2f7", label: "", textColor: "#0fa890" }; }
    const kpiCards = [{ l: "Active Renewals", v: rows.length, col: "#4285f4", key: null }, { l: "Overdue", v: rows.filter(r => r.diff < 0).length, col: "#7a0d0d", key: "overdue" }, { l: "Urgent (≤15d)", v: rows.filter(r => r.diff >= 0 && r.diff <= 15).length, col: "#e0392e", key: "urgent" }, { l: "Upcoming (≤45d)", v: rows.filter(r => r.diff > 15 && r.diff <= 45).length, col: "#d4880a", key: "upcoming" }];
    return React.createElement("div", null,
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 } }, kpiCards.map(({ l, v, col, key }) => React.createElement("div", { key: l, onClick: () => setRenFilter(renFilter === key ? null : key), style: { ...c.sc(col), cursor: "pointer", transition: "all .15s", userSelect: "none", outline: renFilter === key ? `2.5px solid ${col}` : "none", outlineOffset: 2 }, onMouseEnter: e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${col}33`; }, onMouseLeave: e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; } },
            React.createElement("div", { style: c.sn(col) }, v),
            React.createElement("div", { style: c.sl }, l.toUpperCase()),
            renFilter === key && React.createElement("div", { style: { fontSize: 9, color: col, fontWeight: 700, marginTop: 4 } }, "\u25CF FILTERED")))),
        React.createElement("div", { style: c.card },
            React.createElement("div", { style: c.cHdr },
                React.createElement("span", { style: { ...c.cTitle, color: "#0fa890" } },
                    React.createElement(Ic, { name: "refresh" }),
                    " ",
                    renFilter ? "Filtered Renewals" : "All Renewals"),
                React.createElement("div", { style: { display: "flex", gap: 7, alignItems: "center" } },
                    renFilter && React.createElement("button", { onClick: () => setRenFilter(null), style: { fontSize: 10, fontWeight: 700, color: "#7a9ab5", background: "#f0f4f8", border: "none", borderRadius: 20, padding: "3px 10px", cursor: "pointer" } }, "\u00D7 Clear filter"),
                    React.createElement("span", { style: { fontSize: 11, color: "#7a9ab5", fontWeight: 600 } }, "Sorted by closest renewal date"))),
            filteredRows.length === 0 ? React.createElement("div", { style: { padding: "3rem", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, "No renewals in this category.") : React.createElement("div", null, filteredRows.map(({ acc: a, block, diff }) => {
                const st = rowStyle(diff);
                const carrier = block.carrierId ? allIns.find(i => i.id === block.carrierId) : null;
                return React.createElement("div", { key: a.id + "_" + block.key, style: { padding: "14px 18px", borderBottom: "1px solid #f0f4f8", background: diff < 0 ? st.bg : st.bgLight, color: diff < 0 ? "#fff" : "#0f1c2e" } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } },
                        React.createElement("div", { onClick: () => onSelectAcc(a.id), style: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flex: 1, minWidth: 200 } },
                            React.createElement(AccAva, { a: a, size: 36 }),
                            React.createElement("div", null,
                                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, fontFamily: "'Clash Display',sans-serif", color: diff < 0 ? "#fff" : "#0f1c2e" } },
                                    a.name,
                                    " ",
                                    React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: diff < 0 ? "#ffd4d2" : "#0fa890", background: diff < 0 ? "#ffffff22" : "#0fa89014", borderRadius: 6, padding: "1px 7px", marginLeft: 4 } }, block.label)),
                                React.createElement("div", { style: { fontSize: 11, color: diff < 0 ? "#ffb3b0" : "#7a9ab5" } },
                                    a.industry,
                                    carrier ? " · " + carrier.name : "",
                                    block.policyNumber ? " · Policy " + block.policyNumber : ""))),
                        React.createElement("div", { style: { textAlign: "right" } },
                            React.createElement("div", { style: { fontSize: 11, color: diff < 0 ? "#ffb3b0" : "#7a9ab5", fontWeight: 600 } }, "Renews"),
                            React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: diff < 0 ? "#fff" : "#0f1c2e" } }, fmtShort(block.renewalDate))),
                        React.createElement("div", { style: { textAlign: "center", minWidth: 90 } },
                            React.createElement("div", { style: { fontSize: 20, fontWeight: 700, fontFamily: "'Clash Display',sans-serif", color: diff < 0 ? "#ffd4d2" : st.textColor } }, diff < 0 ? `${Math.abs(diff)}d overdue` : `${diff}d`),
                            st.label && React.createElement("div", { style: { fontSize: 9, fontWeight: 700, letterSpacing: .8, color: diff < 0 ? "#ffd4d2" : st.textColor } }, diff < 0 ? "PAST DUE" : st.label)),
                        React.createElement("div", { style: { display: "flex", gap: 7 } },
                            React.createElement("button", { onClick: () => onSecure(a, block), style: { background: "#0fa890", color: "#fff", border: "none", borderRadius: 9, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } }, "\u2713 Secured"),
                            React.createElement("button", { onClick: () => { if (window.confirm(`Mark "${a.name}" — ${block.label} as Terminated?`))
                                    onTerminate(a, block); }, style: { background: "#7a0d0d", color: "#fff", border: "none", borderRadius: 9, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } }, "\u2715 Terminated"))));
            }))));
}
function TasksView({ accounts, onSelectAcc, onEndTask, onUpdateTask }) {
    const [filter, setFilter] = useState("open");
    const [search, setSearch] = useState("");
    const today = toDay();
    const allTasks = accounts.flatMap(a => Object.entries(a.tasks || {}).flatMap(([day, tasks]) => tasks.map(t => ({ ...t, day, accName: a.name, accId: a.id }))));
    const open = allTasks.filter(t => !t.done && !t.ended);
    const done = allTasks.filter(t => t.done || t.ended);
    const withUpdates = allTasks.filter(t => (t.updates || []).length > 0);
    let shown = filter === "open" ? open : filter === "done" ? done : withUpdates;
    if (search)
        shown = shown.filter(t => t.text.toLowerCase().includes(search.toLowerCase()) || t.accName.toLowerCase().includes(search.toLowerCase()));
    shown = [...shown].sort((a, b) => new Date(a.day) - new Date(b.day));
    return React.createElement("div", null,
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 14 } }, [{ l: "Has Updates", v: withUpdates.length, col: "#9333ea", action: () => setFilter("updates") }, { l: "Completed", v: done.length, col: "#0fa890", action: () => setFilter("done") }].map(({ l, v, col, action }) => React.createElement("div", { key: l, onClick: action, style: { ...c.sc(col), cursor: "pointer", transition: "all .15s", userSelect: "none" }, onMouseEnter: e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${col}33`; e.currentTarget.style.borderColor = col; }, onMouseLeave: e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = `${col}44`; } },
            React.createElement("div", { style: c.sn(col) }, v),
            React.createElement("div", { style: c.sl }, l.toUpperCase())))),
        React.createElement("div", { style: c.card },
            React.createElement("div", { style: c.cHdr },
                React.createElement("span", { style: { ...c.cTitle, color: "#0fa890" } },
                    React.createElement(Ic, { name: "checkCircle" }),
                    " All Tasks"),
                React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" } },
                    React.createElement("input", { value: search, onChange: e => setSearch(e.target.value), placeholder: "Search tasks...", style: { ...c.srch, marginBottom: 0, width: 170, padding: "5px 10px" } }),
                    [["open", "Open"], ["done", "Done"], ["updates", "Has Updates"]].map(([v, l]) => React.createElement("button", { key: v, onClick: () => setFilter(v), style: { background: filter === v ? "#0a1628" : "#f0f4f8", color: filter === v ? "#5dd8c8" : "#7a9ab5", border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" } }, l)))),
            shown.length === 0 ? React.createElement("div", { style: { padding: "3rem", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, "No tasks found.") : React.createElement("div", null, shown.map((t, i) => {
                const isOverdue = !t.ended && t.day < today;
                const isDueToday = !t.ended && t.day === today;
                const rowBg = isOverdue ? "#fff8f8" : isDueToday ? "#fffbf0" : "#fff";
                return React.createElement("div", { key: t.id + t.day, style: { padding: "12px 16px", borderBottom: "1px solid #f0f4f8", background: i % 2 === 0 ? rowBg : "#fafcfe", transition: "background .1s" }, onMouseEnter: e => e.currentTarget.style.background = "#f0faf9", onMouseLeave: e => e.currentTarget.style.background = i % 2 === 0 ? rowBg : "#fafcfe" },
                    React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 } },
                        React.createElement("div", { style: { marginTop: 3, width: 13, height: 13, borderRadius: "50%", border: `2px solid ${t.ended ? "#0fa890" : isDueToday ? "#d4880a" : isOverdue ? "#e0392e" : "#5dd8c8"}`, background: t.ended ? "#0fa890" : "transparent", flexShrink: 0 } }),
                        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 3 } },
                                React.createElement("span", { style: { fontSize: 13, fontWeight: 600, textDecoration: t.ended ? "line-through" : "none", color: t.ended ? "#c0cdd8" : "#0f1c2e" } }, t.text),
                                t.ended && React.createElement("span", { style: { fontSize: 10, background: "#e8faf8", color: "#0fa890", borderRadius: 20, padding: "1px 7px", fontWeight: 700 } }, "Done"),
                                isOverdue && React.createElement("span", { style: { fontSize: 10, background: "#fff0ef", color: "#e0392e", borderRadius: 20, padding: "1px 7px", fontWeight: 700 } }, "Overdue"),
                                isDueToday && React.createElement("span", { style: { fontSize: 10, background: "#fff8e6", color: "#d4880a", borderRadius: 20, padding: "1px 7px", fontWeight: 700 } }, "Today"),
                                t.time && React.createElement("span", { style: { fontSize: 10, background: "#e8faf8", color: "#0fa890", borderRadius: 20, padding: "1px 7px", fontWeight: 700 } }, t.time)),
                            React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" } },
                                React.createElement("span", { onClick: () => onSelectAcc(t.accId), style: { fontSize: 11, color: "#4285f4", fontWeight: 600, cursor: "pointer", textDecoration: "underline" } }, t.accName),
                                React.createElement("span", { style: { fontSize: 11, color: "#c0cdd8" } }, new Date(t.day + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }))),
                            (t.updates || []).length > 0 && React.createElement("div", { style: { marginTop: 6, background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 8, padding: "7px 10px" } },
                                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: .5, marginBottom: 4 } },
                                    "Updates (",
                                    t.updates.length,
                                    ")"),
                                t.updates.map((u, ui) => React.createElement("div", { key: ui, style: { fontSize: 12, padding: "3px 0", borderBottom: ui < t.updates.length - 1 ? "1px solid #f0f4f8" : "none", display: "flex", gap: 8 } },
                                    React.createElement("span", { style: { color: "#c0cdd8", whiteSpace: "nowrap", fontWeight: 600, fontSize: 11 } }, new Date(u.ts).toLocaleDateString("en-GB", { day: "numeric", month: "short" })),
                                    React.createElement("span", { style: { color: "#0f1c2e" } }, u.text))))),
                        React.createElement("div", { style: { display: "flex", gap: 5, flexShrink: 0, flexDirection: "column", alignItems: "flex-end" } },
                            !t.ended && React.createElement("button", { onClick: () => onUpdateTask(t), style: { ...c.tAct("#d4880a", "#fff8e6"), fontSize: 10, padding: "3px 8px" } },
                                React.createElement(Ic, { name: "edit" }),
                                " Update"),
                            !t.ended && React.createElement("button", { onClick: () => onEndTask(t), style: { ...c.tAct("#e0392e", "#fff0ef"), fontSize: 10, padding: "3px 8px" } }, "\u23F9 End"),
                            React.createElement("a", { href: gcalUrl(t, t.day, t.accName), target: "_blank", rel: "noopener noreferrer", style: c.gcBtn }, React.createElement(Ic, { name: "calendar" })))));
            }))));
}
function PushStatusButton({ onRequestPush, perm }) {
    if (!perm || perm === "unsupported")
        return null;
    const cfg = { granted: { label: "🔔 Enabled", bg: "#e8faf8", color: "#0fa890", title: "Windows notifications are active" }, default: { label: "🔔 Enable push", bg: "#fff8e6", color: "#d4880a", title: "Click to enable Windows notifications" }, denied: { label: "🔕 Blocked", bg: "#fff0ef", color: "#e0392e", title: "Notifications blocked — click for fix" } }[perm] || { label: "🔔 Enable", bg: "#f0f4f8", color: "#7a9ab5", title: "" };
    return React.createElement("button", { onClick: onRequestPush, title: cfg.title, style: { background: cfg.bg, border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: cfg.color, cursor: "pointer", fontWeight: 700 } }, cfg.label);
}
function PremiumTile({ acc }) {
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const med = acc.payment?.medicalTotal || 0, life = acc.payment?.lifeTotal || 0, total = med + life;
    const blocks = getPolicyBlocks(acc);
    const showMed = acc.pkCombined || acc.pkMed, showLife = acc.pkCombined || acc.pkLife;
    const hasAnything = total > 0 || blocks.some(b => b.premiumNoTax > 0);
    if (!hasAnything)
        return null;
    return React.createElement("div", { style: { ...c.ic, position: "relative", cursor: "pointer", userSelect: "none", border: `1px solid ${hover || open ? "#0fa89066" : "#edf2f7"}`, boxShadow: hover || open ? "0 4px 14px rgba(15,168,144,.18)" : "none", transform: hover || open ? "translateY(-1px)" : "none", transition: "all .15s ease" }, onClick: () => setOpen(o => !o), onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), title: "Click to see the Medical/Life premium breakdown" },
        React.createElement("div", { style: c.iL },
            "Premium ",
            React.createElement("span", { style: { fontSize: 9, color: hover || open ? "#0fa890" : "#a0b8cc", transition: "color .15s ease" } }, open ? "▴" : "▾")),
        React.createElement("div", { style: { fontSize: 12, fontWeight: 700, marginTop: 2, color: "#0fa890" } }, total > 0 ? fmtCurrency(total) : "—"),
        open && React.createElement(React.Fragment, null,
            React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 299 }, onClick: e => { e.stopPropagation(); setOpen(false); } }),
            React.createElement("div", { style: { position: "absolute", top: "100%", left: 0, marginTop: 6, width: 270, background: "#fff", border: "1px solid #dde8f0", borderRadius: 12, boxShadow: "0 8px 32px rgba(10,22,40,.18)", zIndex: 300, padding: 13, cursor: "default", userSelect: "text" }, onClick: e => e.stopPropagation() },
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#0f1c2e", marginBottom: 9, fontFamily: "'Clash Display',sans-serif" } }, "Premium Breakdown"),
                blocks.length > 0 && React.createElement("div", { style: { marginBottom: 8 } },
                    React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#a0b8cc", textTransform: "uppercase", letterSpacing: .5, marginBottom: 4 } }, "Without taxes (per policy)"),
                    blocks.map(b => React.createElement("div", { key: b.key, style: { display: "flex", justifyContent: "space-between", padding: "3px 0" } },
                        React.createElement("span", { style: { fontSize: 11, color: "#4a6080" } }, b.label),
                        React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#0f1c2e" } }, b.premiumNoTax > 0 ? fmtCurrency(b.premiumNoTax) : "—"))),
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0 0", marginTop: 2, borderTop: "1px dashed #edf2f7" } },
                        React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#4a6080" } }, "Total (without taxes)"),
                        React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#0f1c2e" } }, fmtCurrency(blocks.reduce((s, b) => s + (b.premiumNoTax || 0), 0))))),
                React.createElement("div", { style: { paddingTop: 6, borderTop: "1px solid #f0f4f8" } },
                    React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#a0b8cc", textTransform: "uppercase", letterSpacing: .5, marginBottom: 4 } }, "With taxes (payment)"),
                    showMed && React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "3px 0" } },
                        React.createElement("span", { style: { fontSize: 11, color: "#4285f4" } }, "Medical"),
                        React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "#4285f4" } }, fmtCurrency(med))),
                    showLife && React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "3px 0" } },
                        React.createElement("span", { style: { fontSize: 11, color: "#9333ea" } }, "Life"),
                        React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "#9333ea" } }, fmtCurrency(life)))),
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 7, paddingTop: 7, borderTop: "1px solid #edf2f7" } },
                    React.createElement("span", { style: { fontSize: 11, fontWeight: 700 } }, "Total (with taxes)"),
                    React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#0fa890" } }, fmtCurrency(total))))));
}
const NAV_ITEMS = [["overview", "Overview"], ["renewals", "Renewals"], ["checklist", "Checklist"], ["payments", "Payments"], ["accounts", "Accounts"], ["insurers", "Insurers"], ["hospitals", "Hospitals"]];
const LOGO_MENU_ITEMS = [["calendar", "Calendar", "📅"], ["tasks", "Tasks", "✓"], ["meetings", "Meetings", "👥"], ["contacts", "Contacts", "📇"]];
let notifAudioCtx = null;
let notifAudioUnlocked = false;
function ensureNotifAudioUnlocked() { try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC)
        return false;
    if (!notifAudioCtx)
        notifAudioCtx = new AC();
    if (notifAudioCtx.state === 'suspended')
        notifAudioCtx.resume();
    notifAudioUnlocked = true;
    return true;
}
catch {
    return false;
} }
function playInsuranceNotificationSound(priority = 'medium') {
    try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC)
            return;
        if (!notifAudioCtx)
            notifAudioCtx = new AC();
        if (notifAudioCtx.state === 'suspended') {
            notifAudioCtx.resume().catch(() => { });
            if (!notifAudioUnlocked)
                return;
        }
        notifAudioUnlocked = true;
        const ctx = notifAudioCtx, now = ctx.currentTime;
        const master = ctx.createGain();
        const compressor = ctx.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(-18, now);
        compressor.knee.setValueAtTime(16, now);
        compressor.ratio.setValueAtTime(4, now);
        compressor.attack.setValueAtTime(0.003, now);
        compressor.release.setValueAtTime(0.18, now);
        master.gain.setValueAtTime(0.72, now);
        master.connect(compressor);
        compressor.connect(ctx.destination);
        const notes = priority === 'high' ? [{ f: 587, d: 0.00, v: 0.22 }, { f: 784, d: 0.11, v: 0.24 }, { f: 988, d: 0.23, v: 0.18 }] : priority === 'low' ? [{ f: 659, d: 0.00, v: 0.14 }, { f: 784, d: 0.10, v: 0.12 }] : [{ f: 622, d: 0.00, v: 0.18 }, { f: 831, d: 0.10, v: 0.16 }];
        notes.forEach(({ f, d, v }) => { const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'sine'; osc.frequency.setValueAtTime(f, now + d); gain.gain.setValueAtTime(0.0001, now + d); gain.gain.exponentialRampToValueAtTime(v, now + d + 0.012); gain.gain.exponentialRampToValueAtTime(0.0001, now + d + 0.24); osc.connect(gain); gain.connect(master); osc.start(now + d); osc.stop(now + d + 0.26); });
        const sub = ctx.createOscillator();
        const subGain = ctx.createGain();
        sub.type = 'triangle';
        sub.frequency.setValueAtTime(priority === 'high' ? 196 : 174, now);
        subGain.gain.setValueAtTime(0.0001, now);
        subGain.gain.exponentialRampToValueAtTime(priority === 'high' ? 0.045 : 0.028, now + 0.015);
        subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
        sub.connect(subGain);
        subGain.connect(master);
        sub.start(now);
        sub.stop(now + 0.34);
    }
    catch { }
}
(function setupNotifAudioUnlock() { const unlock = () => { ensureNotifAudioUnlocked(); window.removeEventListener('pointerdown', unlock, true); window.removeEventListener('keydown', unlock, true); }; window.addEventListener('pointerdown', unlock, true); window.addEventListener('keydown', unlock, true); })();
function LogoMenu({ view, onSelect, children }) {
    const [open, setOpen] = useState(false);
    const closeTimer = useRef(null);
    function openNow() { if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
    } setOpen(true); }
    function closeSoon() { closeTimer.current = setTimeout(() => setOpen(false), 150); }
    useEffect(() => () => { if (closeTimer.current)
        clearTimeout(closeTimer.current); }, []);
    return React.createElement("div", { className: `logo-menu-anchor ${open ? "is-open" : ""}`, onMouseEnter: openNow, onMouseLeave: closeSoon, onTouchStart: openNow },
        children,
        React.createElement("span", { className: "logo-menu-caret", "aria-hidden": "true" }, "\u25BE"),
        open && React.createElement(React.Fragment, null,
            React.createElement("div", { className: "logo-menu-bridge" }),
            React.createElement("div", { className: "logo-menu", onMouseEnter: openNow, onMouseLeave: closeSoon }, LOGO_MENU_ITEMS.map(([v, label, icon]) => React.createElement("button", { key: v, className: `logo-menu-item ${v === view ? "active" : ""}`, onClick: () => { onSelect(v); setOpen(false); } },
                React.createElement("span", { className: "lmi-icon", "aria-hidden": "true" }, icon),
                React.createElement("span", null, label))))));
}
function SectionSwitcher({ view, setView, clearAccSel }) {
    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);
    const [pressed, setPressed] = useState(false);
    const wheelAccum = useRef(0);
    const wheelLock = useRef(false);
    const soundCtxRef = useRef(null);
    const idx = Math.max(0, NAV_ITEMS.findIndex(([v]) => v === view));
    const go = v => { setView(v); if (v !== "accounts")
        clearAccSel(); setOpen(false); };
    const playSwitchFeedback = useCallback(() => { try {
        if (navigator.vibrate)
            navigator.vibrate([8, 10, 8]);
    }
    catch { } try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) {
            const ctx = soundCtxRef.current || (soundCtxRef.current = new AC());
            if (ctx.state === 'suspended')
                ctx.resume();
            const now = ctx.currentTime;
            const gain = ctx.createGain();
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(740, now);
            osc.frequency.exponentialRampToValueAtTime(1120, now + 0.055);
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.045, now + 0.008);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.095);
        }
    }
    catch { } }, []);
    const step = useCallback(dir => { const n = (idx + dir + NAV_ITEMS.length) % NAV_ITEMS.length; go(NAV_ITEMS[n][0]); playSwitchFeedback(); setPressed(true); window.clearTimeout(step._t); step._t = window.setTimeout(() => setPressed(false), 180); }, [idx, playSwitchFeedback]);
    const itemAt = offset => NAV_ITEMS[(idx + offset + NAV_ITEMS.length) % NAV_ITEMS.length];
    const current = itemAt(0), prev = itemAt(-1), next = itemAt(1);
    const handleWheel = e => { const dx = e.deltaX; const dy = e.deltaY; if (Math.abs(dx) < Math.abs(dy) * 0.9)
        return; if (Math.abs(dx) < 16)
        return; e.preventDefault(); wheelAccum.current += dx; if (wheelLock.current)
        return; const threshold = 85; if (Math.abs(wheelAccum.current) < threshold)
        return; const dir = wheelAccum.current > 0 ? 1 : -1; wheelAccum.current = 0; wheelLock.current = true; step(dir); window.setTimeout(() => { wheelLock.current = false; }, 320); };
    return React.createElement("div", { className: "dynamic-island-wrap", onMouseEnter: () => setHover(true), onMouseLeave: () => { setHover(false); setOpen(false); wheelAccum.current = 0; }, onWheel: handleWheel, onTouchStart: () => setHover(true), onTouchEnd: () => setHover(false), style: { position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minWidth: hover ? 360 : 138, height: 52, transition: "min-width .38s cubic-bezier(.2,.8,.2,1)" } },
        React.createElement("div", { className: `dynamic-island ${hover || open ? "is-expanded" : ""} ${pressed ? "is-pressed" : ""}` },
            React.createElement("button", { className: "island-arrow", onClick: () => step(-1), "aria-label": "Previous section" }, "\u2039"),
            React.createElement("button", { className: "island-current", onClick: () => { playSwitchFeedback(); setOpen(o => !o); }, "aria-label": `Select ${current?.[1] || "section"}` },
                hover && React.createElement("span", { className: "island-neighbor" }, prev?.[1]),
                React.createElement("span", { className: "island-focus" },
                    React.createElement("span", { className: "island-dot" }),
                    current?.[1] || "Overview"),
                hover && React.createElement("span", { className: "island-neighbor" }, next?.[1]),
                React.createElement("span", { className: `island-chevron ${open ? "up" : ""}` }, "\u2304")),
            React.createElement("button", { className: "island-arrow", onClick: () => step(1), "aria-label": "Next section" }, "\u203A")),
        open && React.createElement(React.Fragment, null,
            React.createElement("div", { className: "island-dismiss", onClick: () => setOpen(false) }),
            React.createElement("div", { className: "island-menu" }, NAV_ITEMS.map(([v, l]) => React.createElement("button", { key: v, className: `island-menu-item ${v === view ? "active" : ""}`, onClick: () => { go(v); playSwitchFeedback(); } },
                React.createElement("span", null, l),
                v === view && React.createElement("span", { className: "island-check" }, "\u2713"))))));
}
function NotificationPanel({ notifs, perm, accounts, allIns, onDismiss, onDismissAll, onNavigate, onRequestPush, onRequestUtilization }) {
    if (notifs.length === 0)
        return React.createElement("div", { style: { position: "absolute", top: "100%", right: 0, marginTop: 6, width: 360, background: "#fff", border: "1px solid #dde8f0", borderRadius: 14, boxShadow: "0 8px 32px rgba(10,22,40,.15)", zIndex: 300, overflow: "hidden" } },
            React.createElement("div", { style: { padding: "14px 16px", borderBottom: "1px solid #edf2f7", display: "flex", alignItems: "center", justifyContent: "space-between" } },
                React.createElement("span", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Notifications")),
            React.createElement("div", { style: { padding: "2rem", textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 28, marginBottom: 8 } }, "\uD83D\uDD14"),
                React.createElement("div", { style: { fontSize: 13, color: "#c0cdd8" } }, "No notifications right now.")));
    const icons = { task: "📋", renewal: "🔄", payment: "💳", utilization: "📊" };
    const labels = { task: "Task", renewal: "Renewal", payment: "Payment", utilization: "Utilization" };
    return React.createElement("div", { style: { position: "absolute", top: "100%", right: 0, marginTop: 6, width: 380, background: "#fff", border: "1px solid #dde8f0", borderRadius: 14, boxShadow: "0 8px 32px rgba(10,22,40,.18)", zIndex: 300, overflow: "hidden", maxHeight: "80vh", display: "flex", flexDirection: "column" } },
        React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid #edf2f7", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fafcfe", flexShrink: 0 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                React.createElement("span", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Notifications"),
                React.createElement("span", { style: { background: "#e0392e", color: "#fff", borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "1px 8px" } }, notifs.length)),
            React.createElement("div", { style: { display: "flex", gap: 6 } },
                React.createElement(PushStatusButton, { onRequestPush: onRequestPush, perm: perm }),
                React.createElement("button", { onClick: onDismissAll, style: { background: "#fff0ef", border: "none", borderRadius: 8, padding: "3px 9px", fontSize: 11, color: "#e0392e", fontWeight: 700, cursor: "pointer" } }, "Clear all"))),
        React.createElement("div", { style: { overflowY: "auto", flex: 1 } }, notifs.map(n => React.createElement("div", { key: n.id, style: { padding: "12px 14px", borderBottom: "1px solid #f0f4f8", background: n.bg, borderLeft: `4px solid ${n.color}` } },
            React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 } },
                React.createElement("span", { style: { fontSize: 20, flexShrink: 0, marginTop: 1 } }, n.icon),
                React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" } },
                        React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "#0f1c2e" } }, n.title),
                        React.createElement("span", { style: { fontSize: 9, fontWeight: 700, padding: "1px 7px", borderRadius: 20, background: n.color + "22", color: n.color, textTransform: "uppercase" } }, n.priority),
                        React.createElement("span", { style: { fontSize: 9, fontWeight: 700, padding: "1px 7px", borderRadius: 20, background: "#f0f4f8", color: "#7a9ab5", textTransform: "uppercase" } }, labels[n.type])),
                    React.createElement("div", { style: { fontSize: 12, color: "#4a6080", lineHeight: 1.5, marginBottom: 6 } }, n.body),
                    React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
                        n.isUtilization ? React.createElement("button", { onClick: () => { const acc = (accounts || []).find(a => a.id === n.accountId); if (!acc)
                                return; onRequestUtilization(acc); }, style: { background: n.color, color: "#fff", border: "none", borderRadius: 7, padding: "3px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" } },
                            React.createElement(Ic, { name: "chart" }),
                            " Request Utilization") : React.createElement("button", { onClick: () => { onNavigate(n); }, style: { background: n.color, color: "#fff", border: "none", borderRadius: 7, padding: "3px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" } }, n.action),
                        React.createElement("button", { onClick: () => onDismiss(n.id), style: { background: "rgba(255,255,255,0.7)", border: `1px solid ${n.color}44`, color: n.color, borderRadius: 7, padding: "3px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer" } }, "Dismiss"))),
                React.createElement("button", { onClick: () => onDismiss(n.id), style: { background: "none", border: "none", color: "#c0cdd8", cursor: "pointer", fontSize: 16, lineHeight: 1, flexShrink: 0 } }, "\u00D7"))))));
}
function Dashboard() {
    const [sehaNetworkReady, setSehaNetworkReady] = useState(false);
    const [data, setData] = useState(() => { try {
        const s = localStorage.getItem(LK);
        const p = s ? JSON.parse(s) : null;
        const base = { accounts: [], nextId: 2, customInsurers: [], insurerPocs: {}, hospitals: [], meetings: [], dayNotes: {}, checklists: {}, contacts: [] };
        return p ? { ...base, ...p } : base;
    }
    catch {
        return { accounts: [], nextId: 2, customInsurers: [], insurerPocs: {}, hospitals: [], meetings: [], dayNotes: {}, checklists: {}, contacts: [] };
    } });
    const [syncOk, setSyncOk] = useState(null);
    const [syncMsg, setSyncMsg] = useState("Connecting...");
    useEffect(() => { let alive = true; (async () => { try {
        const r = await fetch("/ClonKrIPhone/data/sehaone-network.json", { cache: "force-cache" });
        if (!r.ok)
            throw new Error("Network data unavailable");
        const net = await r.json();
        const item = BI_DEFAULT.find(x => x.id === "sehaone");
        if (item)
            item.network = net;
    }
    catch (e) {
        console.warn("[ClonKR] SehaOne network data load failed", e);
    }
    finally {
        if (alive)
            setSehaNetworkReady(true);
    } })(); return () => { alive = false; }; }, []);
    const importFileRef = useRef(null);
    const [view, setView] = useState("overview");
    const [selAcc, setSelAcc] = useState(null);
    const [calOff, setCalOff] = useState(0);
    const [nOff, setNOff] = useState(0);
    const [dOff, setDOff] = useState(0);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [form, setForm] = useState(flatA(eAcc()));
    const [note, setNote] = useState("");
    const [task, setTask] = useState("");
    const [ttime, setTtime] = useState("");
    const [tab, setTab] = useState("notes");
    const [calDay, setCalDay] = useState(toDay());
    const [search, setSearch] = useState("");
    const [insSearch, setInsSearch] = useState("");
    const [insFilter, setInsFilter] = useState("all");
    const [showRen, setShowRen] = useState(false);
    const [showCalAdd, setShowCalAdd] = useState(false);
    const [dayModal, setDayModal] = useState(null);
    const [hospSearch, setHospSearch] = useState("");
    const [hospEditModal, setHospEditModal] = useState(null);
    const [meetingModal, setMeetingModal] = useState(null);
    const [newMeetingModal, setNewMeetingModal] = useState(false);
    const [contactModal, setContactModal] = useState(null);
    const [contactView, setContactView] = useState(null);
    const [calTask, setCalTask] = useState({ text: "", time: "", accId: "" });
    const [googleEventsByDay, setGoogleEventsByDay] = useState({});
    const [googleConnected, setGoogleConnected] = useState(false);
    const [googleCalendarBusy, setGoogleCalendarBusy] = useState(false);
    const [googleCalendarError, setGoogleCalendarError] = useState("");
    const [showGoogleSetup, setShowGoogleSetup] = useState(false);
    const [caseManagementView, setCaseManagementView] = useState(null);
    useEffect(() => { gcalToken = ""; setGoogleConnected(false); return () => { }; }, []);
    useEffect(() => {
        if (!IS_ELECTRON || !caseManagementView || !window.clonkr?.caseManagement?.setBounds)
            return;
        const el = document.getElementById("clonkr-case-management-panel");
        if (!el)
            return;
        const sendBounds = () => { const r = el.getBoundingClientRect(); window.clonkr.caseManagement.setBounds({ x: r.left, y: r.top, width: r.width, height: r.height }); };
        sendBounds();
        const ro = new ResizeObserver(sendBounds);
        ro.observe(el);
        window.addEventListener("resize", sendBounds);
        return () => { ro.disconnect(); window.removeEventListener("resize", sendBounds); };
    }, [caseManagementView]);
    const closeCaseManagement = async () => { try {
        await window.clonkr?.caseManagement?.close?.();
    }
    catch { } setCaseManagementView(null); };
    const openEmbeddedCaseManagement = async () => { alert("Case Management is available in the ClonKR desktop app. It is intentionally disabled in the iPhone PWA."); };
    const [showSub, setShowSub] = useState(false);
    const [subForm, setSubForm] = useState({ name: "", employees: "", poc: "", pocEmail: "", pocPhone: "" });
    const [insEditModal, setInsEditModal] = useState(null);
    const [insurerPlanModal, setInsurerPlanModal] = useState(null);
    const [addBenefitsModal, setAddBenefitsModal] = useState(null);
    const [contractUploadModal, setContractUploadModal] = useState(null);
    const [networkUploadModal, setNetworkUploadModal] = useState(null);
    const [networkViewModal, setNetworkViewModal] = useState(null);
    const [renInput, setRenInput] = useState({});
    const [welcomeModal, setWelcomeModal] = useState(null);
    const [isNewAccFlow, setIsNewAccFlow] = useState(false);
    const [firstPaymentPrompt, setFirstPaymentPrompt] = useState(null);
    const [activeListModal, setActiveListModal] = useState(null);
    const [alSearch, setAlSearch] = useState("");
    const [driveFloater, setDriveFloater] = useState(false);
    const [secureAnimModal, setSecureAnimModal] = useState(null);
    const [firstPaymentModal, setFirstPaymentModal] = useState(null);
    const [utilModal, setUtilModal] = useState(null);
    const [taskAct, setTaskAct] = useState(null);
    const [copied, setCopied] = useState(null);
    const syncTimer = useRef(null);
    const mounted = useRef(true);
    const loadedOkRef = useRef(false);
    useEffect(() => () => { mounted.current = false; clearTimeout(syncTimer.current); }, []);
    const [notifs, setNotifs] = useState([]);
    const [notifOpen, setNotifOpen] = useState(false);
    const [pushPerm, setPushPerm] = useState(() => {
        if (localStorage.getItem("am_notif_granted") === "1")
            return "granted";
        if (!window.Notification)
            return "unsupported";
        return Notification.permission;
    });
    useEffect(() => {
        if (pushPerm === "granted" || pushPerm === "unsupported")
            return;
        const t = setInterval(() => {
            if (!window.Notification) {
                clearInterval(t);
                return;
            }
            const p = Notification.permission;
            if (p === "granted") {
                localStorage.setItem("am_notif_granted", "1");
                setPushPerm("granted");
                clearInterval(t);
            }
            else if (p === "denied") {
                setPushPerm("denied");
                clearInterval(t);
            }
        }, 300);
        return () => clearInterval(t);
    }, []);
    const [dismissedIds, setDismissedIds] = useState(() => { try {
        return JSON.parse(localStorage.getItem("am_dismissed") || "[]");
    }
    catch {
        return [];
    } });
    const notifTimer = useRef(null);
    const NOTIF_KEY = "am_dismissed";
    function dismissNotif(id) { setDismissedIds(prev => { const next = [...prev, id]; localStorage.setItem(NOTIF_KEY, JSON.stringify(next.slice(-200))); return next; }); setNotifs(prev => prev.filter(n => n.id !== id)); }
    function dismissAll() { setDismissedIds(prev => { const ids = [...prev, ...notifs.map(n => n.id)]; localStorage.setItem(NOTIF_KEY, JSON.stringify(ids.slice(-200))); return ids; }); setNotifs([]); }
    function buildNotifications(accounts) {
        const now = new Date();
        const today = toDay();
        const dismissed = JSON.parse(localStorage.getItem(NOTIF_KEY) || "[]");
        const seen = new Set(dismissed);
        const result = [];
        accounts.forEach(acc => {
            Object.entries(acc.tasks || {}).forEach(([day, tasks]) => {
                if (day !== today)
                    return;
                tasks.forEach(t => {
                    if (t.done || t.ended)
                        return;
                    const hasUpdateToday = (t.updates || []).some(u => u.ts && u.ts.startsWith(today));
                    if (hasUpdateToday)
                        return;
                    const bucket = Math.floor(now.getHours() / 2);
                    const id = `task_${t.id}_${today}_b${bucket}`;
                    if (seen.has(id))
                        return;
                    result.push({ id, type: "task", priority: "medium", title: "Task needs an update", body: `"${t.text.slice(0, 50)}" has no update today`, account: acc.name, accountId: acc.id, icon: "📋", color: "#d4880a", bg: "#fff8e6", border: "#f6d86088", action: "Go to Tasks", view: "tasks", ts: now.toISOString() });
                });
            });
            getPolicyBlocks(acc).forEach(block => { const bstatus = getBlockStatus(acc, block.key); if (bstatus === "secured" || bstatus === "terminated" || !block.renewalDate)
                return; const diff = Math.ceil((new Date(block.renewalDate) - now) / 86400000); const thresholds = [{ d: 45, label: "45 days", priority: "low", color: "#7a9ab5", bg: "#f0f4f8", border: "#dde8f088" }, { d: 30, label: "30 days", priority: "medium", color: "#d4880a", bg: "#fff8e6", border: "#f6d86088" }, { d: 15, label: "15 days", priority: "high", color: "#e0392e", bg: "#fff0ef", border: "#e0392e88" }]; thresholds.forEach(({ d, label, priority, color, bg, border }) => { if (diff <= d && diff > 0) {
                const id = `renewal_${acc.id}_${block.key}_${d}d_${block.renewalDate}`;
                if (seen.has(id))
                    return;
                result.push({ id, type: "renewal", priority, title: `${block.label} renewal in ${diff} days`, body: `${acc.name} — ${block.label} renews on ${fmtShort(block.renewalDate)}`, account: acc.name, accountId: acc.id, icon: "🔄", color, bg, border, action: "View Account", view: "accounts", ts: now.toISOString() });
            } }); });
            const p = acc.payment || {};
            const total = (p.medicalTotal || 0) + (p.lifeTotal || 0);
            if (total > 0 && acc.serviceStartDate && acc.renewalStatus !== "terminated") {
                const paidCycles = p.paidCycles || [];
                const schedule = getPaymentSchedule(acc.serviceStartDate, p.frequency || "quarterly");
                const unpaid = schedule.filter(s => !paidCycles.some(x => (typeof x === "string" ? x : x.cycleKey) === s.cycleKey)).sort((x, y) => x.date - y.date);
                const target = unpaid[0];
                if (target) {
                    const diff = daysUntil(target.date);
                    const ci = getCycleInfo(p.frequency || "quarterly");
                    const cycleAmt = total / ci.divisor;
                    const thresholds = [{ d: 30, priority: "medium", color: "#d4880a", bg: "#fff8e6", border: "#f6d86088" }, { d: 15, priority: "high", color: "#e0392e", bg: "#fff0ef", border: "#e0392e88" }, { d: 0, priority: "high", color: "#7a0d0d", bg: "#fde2e1", border: "#7a0d0d88" }];
                    thresholds.forEach(({ d, priority, color, bg, border }) => { const matches = d === 0 ? diff < 0 : diff <= d && diff >= 0; if (!matches)
                        return; const id = `payment_${acc.id}_${d}d_${target.cycleKey}`; if (seen.has(id))
                        return; result.push({ id, type: "payment", priority, title: diff < 0 ? `Payment ${Math.abs(diff)} days overdue` : `Payment due in ${diff} days`, body: `${acc.name} — ${fmtCurrency(cycleAmt)} (${ci.label}) ${diff < 0 ? "was due" : "due"} ${target.date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`, account: acc.name, accountId: acc.id, icon: "💳", color, bg, border, action: "View Payments", view: "payments", ts: now.toISOString() }); });
                }
            }
            if (acc.serviceStartDate && acc.renewalStatus !== "terminated") {
                const cycles = getUtilizationCycles(acc.serviceStartDate);
                if (cycles.lastCycle) {
                    const daysSinceCycle = Math.floor((now - cycles.lastCycle) / 86400000);
                    if (daysSinceCycle >= 0 && daysSinceCycle <= 7) {
                        const id = `utilization_${acc.id}_${cycles.lastCycle.toISOString().slice(0, 10)}`;
                        if (!seen.has(id)) {
                            result.push({ id, type: "utilization", priority: "medium", title: "Quarterly Utilization Due", body: `Time to request consumption data for ${acc.name}`, account: acc.name, accountId: acc.id, icon: "📊", color: "#d4880a", bg: "#fff8e6", border: "#d4880a88", action: "Request Utilization", view: "accounts", isUtilization: true, ts: now.toISOString() });
                        }
                    }
                }
            }
        });
        const order = { high: 0, medium: 1, low: 2 };
        result.sort((a, b) => (order[a.priority] || 1) - (order[b.priority] || 1));
        return result;
    }
    useEffect(() => {
        function runCheck() {
            if (!mounted.current)
                return;
            const n = buildNotifications(data.accounts);
            setNotifs(n);
            if (window.Notification && Notification.permission === "granted") {
                const pushed = new Set(JSON.parse(localStorage.getItem("am_pushed") || "[]"));
                const newPushed = [...pushed];
                n.forEach(x => {
                    if (pushed.has(x.id))
                        return;
                    newPushed.push(x.id);
                    playInsuranceNotificationSound(x.priority);
                    let title = "";
                    if (x.type === "task")
                        title = "📋 Task Alert — " + x.account;
                    if (x.type === "renewal")
                        title = "🔄 Renewal Alert — " + x.account;
                    if (x.type === "payment")
                        title = "💳 Payment Alert — " + x.account;
                    const opts = { body: x.body, tag: x.id,
                        renotify: false,
                        requireInteraction: x.priority === "high",
                        silent: x.priority === "low",
                        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%230a1628'/%3E%3Ctext x='32' y='44' font-size='36' text-anchor='middle' fill='%235dd8c8'%3E%E2%9C%A6%3C/text%3E%3C/svg%3E", badge: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%230a1628'/%3E%3Ctext x='32' y='44' font-size='36' text-anchor='middle' fill='%235dd8c8'%3E%E2%9C%A6%3C/text%3E%3C/svg%3E" };
                    try {
                        const notif = new Notification(title, opts);
                        notif.onclick = () => { window.focus(); notif.close(); };
                        if (x.priority !== "high")
                            setTimeout(() => notif.close(), 8000);
                    }
                    catch (e) {
                        console.warn("Notification failed:", e);
                    }
                });
                localStorage.setItem("am_pushed", JSON.stringify(newPushed.slice(-200)));
            }
        }
        runCheck();
        const t1 = setInterval(runCheck, 2 * 60 * 1000);
        return () => clearInterval(t1);
    }, [data.accounts, dismissedIds]);
    function requestPushPermission() {
        if (!window.Notification) {
            alert("Your browser does not support desktop notifications.");
            return;
        }
        if (Notification.permission === "granted") {
            localStorage.setItem("am_notif_granted", "1");
            setPushPerm("granted");
            return;
        }
        if (Notification.permission === "denied") {
            alert("Notifications are blocked.\n\nTo fix this:\n1. Click the lock/info icon in your browser address bar\n2. Find Notifications → set to Allow\n3. Refresh the page");
            return;
        }
        Notification.requestPermission().then(perm => {
            setPushPerm(perm);
            if (perm === "granted") {
                localStorage.setItem("am_notif_granted", "1");
                playInsuranceNotificationSound("medium");
                const n = new Notification("AM Command — Notifications Active", { body: "You will now receive Windows alerts for tasks, renewals and payments.", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%230a1628'/%3E%3Ctext x='32' y='44' font-size='36' text-anchor='middle' fill='%235dd8c8'%3E%E2%9C%A6%3C/text%3E%3C/svg%3E", requireInteraction: false, silent: false, tag: "am-welcome" });
                setTimeout(() => n.close(), 6000);
            }
        });
    }
    useEffect(() => { if (window.Notification && Notification.permission === "default" && localStorage.getItem("am_notif_granted") !== "1") {
        const t = setTimeout(() => { Notification.requestPermission().then(p => { if (p === "granted")
            localStorage.setItem("am_notif_granted", "1"); setPushPerm(p); }); }, 3000);
        return () => clearTimeout(t);
    } }, []);
    const allIns = useMemo(() => { const pocData = data.insurerPocs || {}; const builtins = BI_DEFAULT.map(i => { const saved = pocData[i.id] || {}; const poc = saved.poc || { name: "", title: "", phone: "", email: "" }; const pocs = saved.pocs || []; const plans = saved.plans || []; const network = i.id === "sehaone" ? saved.network?.format === "sehaone-dual-v1" ? saved.network : i.network || null : saved.network ?? i.network ?? null; const portalUrl = saved.portalUrl ?? i.portalUrl ?? ""; const url = saved.url ?? i.url ?? null; const logo = saved.logo ?? i.logo ?? ""; const types = saved.types ?? i.types; return { ...i, poc, pocs, plans, network, portalUrl, url, logo, types }; }); return [...builtins, ...(data.customInsurers || [])]; }, [data.customInsurers, data.insurerPocs]);
    const unifiedPocs = useMemo(() => getUnifiedPocs(data, allIns), [data, allIns]);
    const insById = {};
    allIns.forEach(i => insById[i.id] = i);
    useEffect(() => {
        (async () => {
            try {
                const res = await sbGet("am_data", "?id=eq.main&select=payload");
                if (!mounted.current)
                    return;
                if (res.disabled) {
                    loadedOkRef.current = true;
                    setSyncOk(false);
                    setSyncMsg("Local only — Supabase not configured");
                    return;
                }
                if (res.rows && res.rows.length > 0 && res.rows[0]?.payload) {
                    const p = { accounts: [], nextId: 2, customInsurers: [], insurerPocs: {}, hospitals: [], meetings: [], dayNotes: {}, ...res.rows[0].payload };
                    setData(p);
                    cacheLocally(p);
                    loadedOkRef.current = true;
                    setSyncOk(true);
                    setSyncMsg("Synced");
                    return;
                }
                const startFresh = window.confirm("No existing data was found on the server for this account.\n\nIf you expect to see existing accounts/meetings/payments, DO NOT continue — this is more likely a connection problem than an empty database. Click Cancel and reload instead.\n\nOnly click OK if this is genuinely a brand-new setup with no prior data.");
                if (startFresh) {
                    await sbUpsert("am_data", { id: "main", payload: data, updated_at: new Date().toISOString() });
                    loadedOkRef.current = true;
                    setSyncOk(true);
                    setSyncMsg("Synced");
                }
                else {
                    setSyncOk(false);
                    setSyncMsg("Not synced — reload to retry");
                }
            }
            catch (err) {
                if (mounted.current) {
                    setSyncOk(false);
                    setSyncMsg("Offline — not synced, changes are local only until reconnected");
                }
                console.error("[am_data] initial load failed — refusing to touch remote data:", err);
            }
        })();
    }, []);
    const push = useCallback(nd => {
        if (!loadedOkRef.current) {
            setSyncOk(false);
            setSyncMsg("Not synced — waiting for a successful load before saving");
            return;
        }
        setSyncOk(null);
        setSyncMsg("Saving...");
        clearTimeout(syncTimer.current);
        syncTimer.current = setTimeout(async () => { try {
            await sbUpsert("am_data", { id: "main", payload: nd, updated_at: new Date().toISOString() });
            if (mounted.current) {
                setSyncOk(true);
                setSyncMsg("Synced");
            }
        }
        catch {
            if (mounted.current) {
                setSyncOk(false);
                setSyncMsg("Sync failed");
            }
        } }, 700);
    }, []);
    function cacheLocally(n) { try {
        localStorage.setItem(LK, JSON.stringify(n));
    }
    catch (err) {
        console.warn("localStorage quota hit — caching a lighter copy without POP attachments.", err);
        try {
            const light = { ...n, accounts: n.accounts.map(a => ({ ...a, payment: a.payment ? { ...a.payment, paidCycles: (a.payment.paidCycles || []).map(pc => typeof pc === "string" ? pc : { ...pc, pops: undefined, popB64: undefined }) } : a.payment })) };
            localStorage.setItem(LK, JSON.stringify(light));
        }
        catch (err2) {
            console.warn("localStorage cache skipped entirely — still saving to Supabase normally.", err2);
        }
    } }
    const save = useCallback(fn => { setData(d => { const n = { ...d, ...fn(d) }; cacheLocally(n); push(n); return n; }); }, [push]);
    const log = useCallback((id, msg) => { save(d => ({ accounts: d.accounts.map(a => a.id === id ? { ...a, activity: [{ id: Date.now(), msg, ts: new Date().toISOString() }, ...(a.activity || [])].slice(0, 60) } : a) })); }, [save]);
    const chForm = useCallback((k, v) => setForm(f => ({ ...f, [k]: v })), []);
    const chCal = useCallback((k, v) => setCalTask(f => ({ ...f, [k]: v })), []);
    const acc = selAcc ? data.accounts.find(a => a.id === selAcc) : null;
    const nonTerminatedAccounts = data.accounts.filter(a => a.renewalStatus !== "terminated");
    const nwk = wkf(nOff), dky = dkf(dOff);
    const fAccs = data.accounts.filter(a => { const matchSearch = !search || [a.name, ...getPocs(a).map(p => p.name || ""), a.industry || ""].some(x => x.toLowerCase().includes(search.toLowerCase())); const matchStatus = !accStatusFilter || accStatusFilter === "risk" && a.status === "risk"; return matchSearch && matchStatus; });
    const ren = data.accounts.filter(a => { if (!a.renewalDate)
        return false; const d = (new Date(a.renewalDate) - new Date()) / 86400000; return d >= 0 && d <= 90; }).sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate));
    const totalOpen = data.accounts.flatMap(a => Object.values(a.tasks || {}).flat()).filter(t => !t.done && !t.ended).length;
    const atRisk = data.accounts.filter(a => a.status === "risk").length;
    const [accStatusFilter, setAccStatusFilter] = useState(null);
    const filteredIns = allIns.filter(i => { const mt = insFilter === "all" || insFilter === "carrier" && i.types.includes("carrier") || insFilter === "tpa" && i.types.includes("tpa") || insFilter === "hmo" && i.types.includes("hmo"); return mt && (!insSearch || i.name.toLowerCase().includes(insSearch.toLowerCase())); });
    function addAcc() {
        if (!form.name.trim())
            return;
        const id = data.nextId;
        const newAcc = { ...unflat(form), id, subsidiaries: [], notes: {}, tasks: {}, activity: [{ id: Date.now(), msg: "Account created", ts: new Date().toISOString() }], renewalUpdates: [], benefits: { plans: [] } };
        save(d => ({ accounts: [...d.accounts, newAcc], nextId: d.nextId + 1 }));
        setForm(flatA(eAcc()));
        setShowAdd(false);
        setIsNewAccFlow(true);
        setWelcomeModal(newAcc);
    }
    function saveBenefits(accId, benefits) { save(d => ({ accounts: d.accounts.map(a => a.id === accId ? { ...a, benefits } : a) })); log(accId, "Insurance benefits updated"); }
    function updAcc() {
        if (!acc)
            return;
        const updated = unflat(form);
        updated.payment = { ...updated.payment, paidCycles: acc.payment?.paidCycles || [] };
        save(d => ({ accounts: d.accounts.map(a => a.id === acc.id ? { ...acc, ...updated } : a) }));
        log(acc.id, "Account updated");
        setShowEdit(false);
    }
    function delAcc(id) { if (!window.confirm("Delete this account?"))
        return; save(d => ({ accounts: d.accounts.filter(a => a.id !== id) })); setSelAcc(null); }
    function addSub() { if (!subForm.name.trim() || !acc)
        return; const sub = { id: Date.now(), ...subForm, employees: parseInt(subForm.employees) || 0 }; save(d => ({ accounts: d.accounts.map(a => a.id === acc.id ? { ...a, subsidiaries: [...(a.subsidiaries || []), sub] } : a) })); log(acc.id, `Sub: "${subForm.name}"`); setSubForm({ name: "", employees: "", poc: "", pocEmail: "", pocPhone: "" }); setShowSub(false); }
    function delSub(sid) { save(d => ({ accounts: d.accounts.map(a => a.id === acc.id ? { ...a, subsidiaries: (a.subsidiaries || []).filter(s => s.id !== sid) } : a) })); }
    const saveNote = useCallback(() => { if (!note.trim() || !acc)
        return; save(d => ({ accounts: d.accounts.map(a => a.id === acc.id ? { ...a, notes: { ...a.notes, [nwk]: [...(a.notes[nwk] || []), { id: Date.now(), text: note, ts: new Date().toISOString() }] } } : a) })); log(acc.id, `Note: "${note.slice(0, 40)}"`); setNote(""); }, [note, acc, nwk, save, log]);
    function delNote(nid) { save(d => ({ accounts: d.accounts.map(a => a.id === acc.id ? { ...a, notes: { ...a.notes, [nwk]: (a.notes[nwk] || []).filter(n => n.id !== nid) } } : a) })); }
    const addTask = useCallback(() => { if (!task.trim() || !acc)
        return; save(d => ({ accounts: d.accounts.map(a => a.id === acc.id ? { ...a, tasks: { ...a.tasks, [dky]: [...(a.tasks[dky] || []), { id: Date.now(), text: task, time: ttime, done: false, ended: false, updates: [] }] } } : a) })); log(acc.id, `Task: "${task.slice(0, 40)}"`); setTask(""); setTtime(""); }, [task, ttime, acc, dky, save, log]);
    function endTask(tid, dy, aid) { const ta = aid || acc?.id, tdy = dy || dky; save(d => ({ accounts: d.accounts.map(a => a.id === ta ? { ...a, tasks: { ...a.tasks, [tdy]: (a.tasks[tdy] || []).map(t => t.id === tid ? { ...t, done: true, ended: true } : t) } } : a) })); log(ta, "Task ended"); }
    function togTask(tid, dy, aid) { const ta = aid || acc?.id, tdy = dy || dky; save(d => ({ accounts: d.accounts.map(a => a.id === ta ? { ...a, tasks: { ...a.tasks, [tdy]: (a.tasks[tdy] || []).map(t => t.id === tid ? { ...t, done: !t.done } : t) } } : a) })); }
    function delTask(tid, dy, aid) { const ta = aid || acc?.id, tdy = dy || dky; save(d => ({ accounts: d.accounts.map(a => a.id === ta ? { ...a, tasks: { ...a.tasks, [tdy]: (a.tasks[tdy] || []).filter(t => t.id !== tid) } } : a) })); }
    function handleUpdate(txt) {
        const { task: t, accId: ta, dayK: tdy } = taskAct;
        save(d => ({ accounts: d.accounts.map(a => {
                if (a.id !== ta)
                    return a;
                const newUpdate = { text: txt, ts: new Date().toISOString() };
                return { ...a, tasks: { ...a.tasks, [tdy]: (a.tasks[tdy] || []).map(tk => tk.id === t.id ? { ...tk, updates: [...(tk.updates || []), newUpdate] } : tk) } };
            }) }));
        log(ta, `Update: "${txt.slice(0, 40)}"`);
        setTaskAct(null);
    }
    function rescheduleTask(tid, fromDy, accId, newDy, newTime) { if (!newDy)
        return; save(d => ({ accounts: d.accounts.map(a => { if (a.id !== accId)
            return a; const task = (a.tasks[fromDy] || []).find(tk => tk.id === tid); if (!task)
            return a; const rescheduled = { ...task, time: newTime || task.time || "", rescheduledFrom: fromDy }; const remaining = (a.tasks[fromDy] || []).filter(tk => tk.id !== tid); const target = [...(a.tasks[newDy] || []), rescheduled]; return { ...a, tasks: { ...a.tasks, [fromDy]: remaining, [newDy]: target } }; }) })); log(accId, `Task rescheduled to ${fmtShort(newDy)}${newTime ? " " + newTime : ""}`); }
    function saveDayNote(day, text) { save(d => ({ dayNotes: { ...(d.dayNotes || {}), [day]: text } })); }
    function handleRelated(txt, aId, tm) { save(d => ({ accounts: d.accounts.map(a => a.id === aId ? { ...a, tasks: { ...a.tasks, [toDay()]: [...(a.tasks[toDay()] || []), { id: Date.now(), text: txt, time: tm, done: false, ended: false, updates: [] }] } } : a) })); log(aId, `Related: "${txt.slice(0, 40)}"`); setTaskAct(null); }
    const addCalTask = useCallback(async () => { if (!calTask.text?.trim() || !calTask.accId)
        return; const aId = parseInt(calTask.accId); const taskObj = { id: Date.now(), text: calTask.text, time: calTask.time || "", done: false, ended: false, updates: [] }; save(d => ({ accounts: d.accounts.map(a => a.id === aId ? { ...a, tasks: { ...a.tasks, [calDay]: [...(a.tasks[calDay] || []), taskObj] } } : a) })); log(aId, `Cal task: "${calTask.text.slice(0, 40)}"`); if (gcalToken) {
        try {
            const acc = (data.accounts || []).find(a => a.id === aId);
            const ev = await gcalCreateTask(taskObj, calDay, acc?.name || "Account");
            save(d => ({ accounts: d.accounts.map(a => a.id === aId ? { ...a, tasks: { ...a.tasks, [calDay]: (a.tasks[calDay] || []).map(t => t.id === taskObj.id ? { ...t, googleEventId: ev.id } : t) } } : a) }));
        }
        catch (err) {
            setGoogleCalendarError("Task saved in ClonKr, but Google Calendar sync failed: " + err.message);
        }
    } setCalTask({ text: "", time: "", accId: "" }); setShowCalAdd(false); }, [calTask, calDay, save, log, data.accounts]);
    async function connectGoogleCalendar() { setGoogleCalendarError(""); try {
        setGoogleCalendarBusy(true);
        await googleConnect();
        setGoogleConnected(true);
        await refreshGoogleCalendar(new Date().getFullYear(), new Date().getMonth());
        await refreshGoogleWeek(days);
    }
    catch (err) {
        setGoogleCalendarError(err.message || "Could not connect to Google Calendar.");
        alert(err.message || "Could not connect to Google Calendar.");
    }
    finally {
        setGoogleCalendarBusy(false);
    } }
    function disconnectGoogleCalendar() { googleDisconnect(); setGoogleConnected(false); setGoogleEventsByDay({}); setGoogleCalendarBusy(false); setGoogleCalendarError(""); }
    async function refreshGoogleCalendar(year = new Date().getFullYear(), month = new Date().getMonth()) { if (!gcalToken)
        return; setGoogleCalendarError(""); try {
        setGoogleCalendarBusy(true);
        const res = await gcalListEvents(year, month);
        const byDay = {};
        (res.items || []).forEach(raw => { const ev = normalizeGoogleEvent(raw); if (!ev)
            return; const d = ev.clonkrStartDay; (byDay[d] || (byDay[d] = [])).push(ev); });
        Object.values(byDay).forEach(list => list.sort((a, b) => (a.clonkrStartTime || "99:99").localeCompare(b.clonkrStartTime || "99:99")));
        setGoogleEventsByDay(byDay);
    }
    catch (err) {
        setGoogleCalendarError(err.message || "Google Calendar sync failed.");
    }
    finally {
        setGoogleCalendarBusy(false);
    } }
    async function refreshGoogleWeek(daysToFetch) { if (!gcalToken)
        return; try {
        setGoogleCalendarBusy(true);
        const months = [...new Set((daysToFetch || []).map(d => { const [y, m] = d.split('-').map(Number); return `${y}-${m - 1}`; }))];
        const results = await Promise.all(months.map(k => { const [y, m] = k.split('-').map(Number); return gcalListEvents(y, m); }));
        const byDay = {};
        results.forEach(res => (res.items || []).forEach(raw => { const ev = normalizeGoogleEvent(raw); if (!ev)
            return; const d = ev.clonkrStartDay; (byDay[d] || (byDay[d] = [])).push(ev); }));
        Object.values(byDay).forEach(list => list.sort((a, b) => (a.clonkrStartTime || "99:99").localeCompare(b.clonkrStartTime || "99:99")));
        setGoogleEventsByDay(byDay);
    }
    catch (err) {
        setGoogleCalendarError(err.message || "Google Calendar sync failed.");
    }
    finally {
        setGoogleCalendarBusy(false);
    } }
    function addTaskForDay(day, text, time, accId) { if (!text?.trim() || !accId)
        return; save(d => ({ accounts: d.accounts.map(a => a.id === accId ? { ...a, tasks: { ...a.tasks, [day]: [...(a.tasks[day] || []), { id: Date.now(), text: text.trim(), time: time || "", done: false, ended: false, updates: [] }] } } : a) })); log(accId, `Task: "${text.trim().slice(0, 40)}"`); }
    function addRenUpdate(accId) { const txt = (renInput[accId] || "").trim(); if (!txt)
        return; save(d => ({ accounts: d.accounts.map(a => a.id === accId ? { ...a, renewalUpdates: [...(a.renewalUpdates || []), { id: Date.now(), text: txt, ts: new Date().toISOString() }] } : a) })); setRenInput(r => ({ ...r, [accId]: "" })); }
    function quickSecure(acc, block) { setSecureAnimModal({ acc, block }); }
    function confirmSecureRenewal(acc, block, blockUpdate, paymentPatch, adherentsPatch) {
        const patch = blockUpdateToAccPatch(block.key, blockUpdate);
        const newBlockStatus = { ...(acc.blockStatus || {}), [block.key]: "secured" };
        const mergedForBlocks = { ...acc, ...patch };
        const blocks = getPolicyBlocks(mergedForBlocks);
        const mergedAccForStatus = { ...acc, blockStatus: newBlockStatus };
        const pending = blocks.filter(b => { const st = getBlockStatus(mergedAccForStatus, b.key); return st !== "secured" && st !== "terminated"; });
        const legacy = deriveLegacyPolicyFields(blocks, pending.length ? pending : blocks);
        const allDone = blocks.length > 0 && blocks.every(b => { const st = getBlockStatus(mergedAccForStatus, b.key); return st === "secured" || st === "terminated"; });
        const newPayment = { ...acc.payment, ...paymentPatch };
        const newServiceStart = allDone ? blockUpdate.startDate || acc.serviceStartDate : acc.serviceStartDate;
        const finalUpdates = { ...patch, blockStatus: newBlockStatus, carrierId: legacy.carrierId, policyNumber: legacy.policyNumber, policyStartDate: legacy.policyStartDate, policyEndDate: legacy.policyEndDate, renewalDate: legacy.renewalDate, adherents: adherentsPatch || getAdherents(acc), serviceStartDate: newServiceStart, payment: allDone ? { ...newPayment, paidCycles: [] } : newPayment, renewalStatus: allDone ? "secured" : "active", status: "healthy" };
        save(d => ({ accounts: d.accounts.map(a => a.id === acc.id ? { ...a, ...finalUpdates, renewalUpdates: [...(a.renewalUpdates || []), { id: Date.now(), text: `Renewal secured — ${block.label} policy updated${allDone ? ", billing cycle reset for new term" : ""}`, ts: new Date().toISOString() }] } : a) }));
        log(acc.id, `Renewal secured — ${block.label}` + (allDone ? " — billing cycle reset" : ""));
        setSecureAnimModal(null);
        if (allDone) {
            const freq = newPayment.frequency || "quarterly";
            const med = newPayment.medicalTotal || 0, life = newPayment.lifeTotal || 0;
            const total = med + life;
            if (total > 0 && newServiceStart) {
                const ci = getCycleInfo(freq);
                const schedule = getPaymentSchedule(newServiceStart, freq);
                const firstCycle = schedule[0];
                if (firstCycle) {
                    setFirstPaymentModal({ acc: { ...acc, ...finalUpdates }, cycleKey: firstCycle.cycleKey, cycleAmt: total / ci.divisor, cycleMed: med / ci.divisor, cycleLife: life / ci.divisor, ci });
                }
            }
        }
    }
    function terminateAccount(acc, block) {
        if (!block) {
            save(d => ({ accounts: d.accounts.map(a => a.id === acc.id ? { ...a, renewalStatus: "terminated", status: "risk", renewalUpdates: [...(a.renewalUpdates || []), { id: Date.now(), text: "Account marked as Terminated", ts: new Date().toISOString() }] } : a) }));
            log(acc.id, "Account terminated");
            return;
        }
        const newBlockStatus = { ...(acc.blockStatus || {}), [block.key]: "terminated" };
        const blocks = getPolicyBlocks(acc);
        const pending = blocks.filter(b => { const st = newBlockStatus[b.key] || "active"; return st !== "secured" && st !== "terminated"; });
        const legacy = deriveLegacyPolicyFields(blocks, pending.length ? pending : blocks);
        const allDone = blocks.length > 0 && blocks.every(b => { const st = newBlockStatus[b.key] || "active"; return st === "secured" || st === "terminated"; });
        save(d => ({ accounts: d.accounts.map(a => a.id === acc.id ? { ...a, blockStatus: newBlockStatus, policyEndDate: legacy.policyEndDate, renewalDate: legacy.renewalDate, renewalStatus: allDone ? "terminated" : a.renewalStatus, status: allDone ? "risk" : a.status, renewalUpdates: [...(a.renewalUpdates || []), { id: Date.now(), text: `${block.label} policy marked as Terminated`, ts: new Date().toISOString() }] } : a) }));
        log(acc.id, `Policy terminated — ${block.label}`);
    }
    function updateChecklistTask(accId, taskId, patch) { save(d => { const cur = d.checklists?.[accId] || { tasks: {}, onboarding: {}, quickNote: "" }; const curTask = cur.tasks?.[taskId] || { status: "not_started" }; return { checklists: { ...d.checklists, [accId]: { ...cur, tasks: { ...cur.tasks, [taskId]: { ...curTask, ...patch } } } } }; }); }
    function toggleOnboardingTask(accId, taskId) { save(d => { const cur = d.checklists?.[accId] || { tasks: {}, onboarding: {}, quickNote: "" }; const wasDone = !!cur.onboarding?.[taskId]; return { checklists: { ...d.checklists, [accId]: { ...cur, onboarding: { ...cur.onboarding, [taskId]: !wasDone } } } }; }); }
    function saveQuickNote(accId, text) { save(d => { const cur = d.checklists?.[accId] || { tasks: {}, onboarding: {}, quickNote: "" }; return { checklists: { ...d.checklists, [accId]: { ...cur, quickNote: text } } }; }); }
    function markCyclePaid(accId, record) {
        const cycleKey = typeof record === "string" ? record : record.cycleKey;
        const entry = typeof record === "string" ? { cycleKey: record, confirmedAt: new Date().toISOString() } : { ...record, confirmedAt: record.confirmedAt || new Date().toISOString() };
        save(d => ({ accounts: d.accounts.map(a => { if (a.id !== accId)
                return a; const paid = a.payment?.paidCycles || []; const alreadyPaid = paid.some(x => (typeof x === "string" ? x : x.cycleKey) === cycleKey); if (alreadyPaid)
                return a; return { ...a, payment: { ...a.payment, paidCycles: [...paid, entry] } }; }) }));
        log(accId, `Payment confirmed — ${cycleKey}${entry.finalAmt ? ` · EGP ${entry.finalAmt.toLocaleString()}` : ""}${entry.popName ? ` · POP: ${entry.popName}` : ""}`);
        setDriveFloater(true);
    }
    function openFirstPaymentForNewAccount(newAcc) { setFirstPaymentPrompt(null); const med = newAcc.payment?.medicalTotal || 0, life = newAcc.payment?.lifeTotal || 0, total = med + life; const freq = newAcc.payment?.frequency || "quarterly"; if (total > 0 && newAcc.serviceStartDate) {
        const ci = getCycleInfo(freq);
        const schedule = getPaymentSchedule(newAcc.serviceStartDate, freq);
        const firstCycle = schedule[0];
        if (firstCycle) {
            setFirstPaymentModal({ acc: newAcc, cycleKey: firstCycle.cycleKey, cycleAmt: total / ci.divisor, cycleMed: med / ci.divisor, cycleLife: life / ci.divisor, ci });
            return;
        }
    } alert("Can't open the invoice yet — this account needs a Service Start Date and a Medical/Life premium total set first (Account → Edit). You can log the first payment later from the Payments tab."); }
    function saveInsurer(updated) { if (updated.builtin) {
        save(d => ({ insurerPocs: { ...(d.insurerPocs || {}), [updated.id]: { ...(d.insurerPocs?.[updated.id] || {}), poc: updated.poc || {}, pocs: updated.pocs || [], types: updated.types || [], url: updated.url || null, logo: updated.logo || "", portalUrl: updated.portalUrl || "" } } }));
    }
    else {
        save(d => ({ customInsurers: (d.customInsurers || []).map(i => i.id === updated.id ? updated : i) }));
    } setInsEditModal(null); }
    function saveInsurerPlan(updated) { if (updated.builtin) {
        save(d => ({ insurerPocs: { ...(d.insurerPocs || {}), [updated.id]: { ...(d.insurerPocs?.[updated.id] || {}), poc: updated.poc || {}, pocs: updated.pocs || [], plans: updated.plans || [], network: updated.network || null } } }));
    }
    else {
        save(d => ({ customInsurers: (d.customInsurers || []).map(i => i.id === updated.id ? updated : i) }));
    } setInsurerPlanModal(null); }
    function saveInsurerNetwork(updated) { if (updated.builtin) {
        save(d => ({ insurerPocs: { ...(d.insurerPocs || {}), [updated.id]: { ...(d.insurerPocs?.[updated.id] || {}), poc: updated.poc || {}, pocs: updated.pocs || [], plans: updated.plans || [], network: updated.network || null } } }));
    }
    else {
        save(d => ({ customInsurers: (d.customInsurers || []).map(i => i.id === updated.id ? updated : i) }));
    } setNetworkUploadModal(null); }
    function saveExclusions(accId, excl) { save(d => ({ accounts: d.accounts.map(a => a.id === accId ? { ...a, exclusions: excl } : a) })); log(accId, "Exclusions updated from contract upload"); }
    function saveExtractedPlans(accId, newPlans) { if (!newPlans || !newPlans.length)
        return; save(d => ({ accounts: d.accounts.map(a => { if (a.id !== accId)
            return a; const existing = a.benefits?.plans || []; const room = Math.max(0, 5 - existing.length); const toAdd = newPlans.slice(0, room).map(p => ({ ...p, addedAt: new Date().toISOString() })); return { ...a, benefits: { ...(a.benefits || {}), plans: [...existing, ...toAdd] } }; }) })); log(accId, `${Math.min(newPlans.length, 5)} plan(s) added to Benefits from contract upload`); }
    function saveActiveList(accId, result) { save(d => ({ accounts: d.accounts.map(a => a.id === accId ? { ...a, activeList: { contractId: result.contractId, members: result.members, format: result.format, uploadedAt: new Date().toISOString() }, adherents: { principal: result.principal, family: result.family } } : a) })); log(accId, `Active List uploaded — ${result.members.length} members (${result.principal} principal, ${result.family} family) — Adherents updated`); setActiveListModal(null); }
    function addCustomIns(ins) { save(d => ({ customInsurers: [...(d.customInsurers || []), { id: "c_" + Date.now(), ...ins, builtin: false }] })); }
    function delCustomIns(id) { if (!window.confirm("Delete insurer?"))
        return; save(d => ({ customInsurers: (d.customInsurers || []).filter(i => i.id !== id) })); }
    function saveHospital(h) { save(d => { const list = d.hospitals || []; const exists = list.some(x => x.id === h.id); return { hospitals: exists ? list.map(x => x.id === h.id ? h : x) : [...list, { ...h, id: h.id || "h_" + Date.now() }] }; }); setHospEditModal(null); }
    function deleteHospital(id) { if (!window.confirm("Delete this hospital?"))
        return; save(d => ({ hospitals: (d.hospitals || []).filter(h => h.id !== id) })); }
    function openCaseManagement(h) { openEmbeddedCaseManagement(h); }
    function saveContact(ct) { save(d => { const list = d.contacts || []; const exists = list.some(x => x.id === ct.id); return { contacts: exists ? list.map(x => x.id === ct.id ? ct : x) : [...list, { ...ct, id: ct.id || "ct_" + Date.now() }] }; }); setContactModal(null); }
    function deleteContact(id) { if (!window.confirm("Delete this contact?"))
        return; save(d => ({ contacts: (d.contacts || []).filter(c => c.id !== id) })); setContactModal(null); setContactView(null); }
    async function createMeeting(m) { const meeting = { id: "mt_" + Date.now(), name: m.name, topic: m.topic, participantKeys: m.participantKeys || [], date: m.date, time: m.time || "", status: "active", topicsDiscussed: [], actionItems: [], generalNotes: "", createdAt: new Date().toISOString(), completedAt: null }; let finalMeeting = meeting; if (gcalToken) {
        try {
            const ev = await gcalCreateMeeting(meeting);
            finalMeeting = { ...meeting, googleEventId: ev.id };
        }
        catch (err) {
            setGoogleCalendarError("Meeting saved in ClonKr, but Google Calendar sync failed: " + err.message);
        }
    } save(d => ({ meetings: [...(d.meetings || []), finalMeeting] })); setNewMeetingModal(false); setMeetingModal(finalMeeting); }
    function updateMeeting(id, patch) { save(d => { const next = (d.meetings || []).map(m => m.id === id ? { ...m, ...(typeof patch === "function" ? patch(m) : patch) } : m); const updated = next.find(m => m.id === id); if (updated && meetingModal?.id === id)
        setMeetingModal(updated); return { meetings: next }; }); }
    function deleteMeeting(id) { if (!window.confirm("Delete this meeting?"))
        return; save(d => ({ meetings: (d.meetings || []).filter(m => m.id !== id) })); setMeetingModal(null); }
    function finishMeeting(id) { updateMeeting(id, { status: "completed", completedAt: new Date().toISOString() }); }
    function reopenMeeting(id) { updateMeeting(id, { status: "active", completedAt: null }); }
    function handleGTask(txt, aName) { const full = `[AM] ${txt} - ${aName}`; navigator.clipboard.writeText(full).then(() => { setCopied(full); setTimeout(() => setCopied(null), 2000); window.open("https://tasks.google.com/tasks/", "_blank"); }).catch(() => window.open("https://tasks.google.com/tasks/", "_blank")); }
    function exportAllData() { const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `clonkr_backup_${new Date().toISOString().slice(0, 10)}.json`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }
    function importAllData(file) { if (!window.confirm(`This will REPLACE all current data (${data.accounts.length} accounts) with the contents of "${file.name}". This can't be undone. Continue?`))
        return; const r = new FileReader(); r.onload = () => { try {
        const parsed = JSON.parse(r.result);
        if (!parsed || !Array.isArray(parsed.accounts))
            throw new Error("Not a valid ClonKR backup file (no accounts array found).");
        save(() => parsed);
        alert(`Imported ${parsed.accounts.length} accounts.`);
    }
    catch (err) {
        alert("Import failed: " + (err?.message || "invalid file"));
    } }; r.readAsText(file); }
    const today = toDay(), nowH = new Date().getHours(), days = wdays(calOff);
    const hourTasks = (dy, hr) => data.accounts.flatMap(a => (a.tasks[dy] || []).map(t => ({ ...t, accName: a.name, accId: a.id }))).filter(t => t.time && parseInt(t.time.split(":")[0]) === hr);
    const untimedTasks = dy => data.accounts.flatMap(a => (a.tasks[dy] || []).map(t => ({ ...t, accName: a.name, accId: a.id }))).filter(t => !t.time);
    const selDayTasks = data.accounts.flatMap(a => (a.tasks[calDay] || []).map(t => ({ ...t, accName: a.name, accId: a.id })));
    const s0 = sunOf(calOff), e0 = new Date(s0);
    e0.setDate(e0.getDate() + 6);
    const rl = `${s0.toLocaleDateString("en-GB", { day: "numeric", month: "short" })} - ${e0.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
    const calLabel = calOff === 0 ? "This week" : calOff === -1 ? "Last week" : rl;
    useEffect(() => { if (googleConnected)
        refreshGoogleWeek(days); }, [googleConnected, calOff]);
    function InsTags({ a }) {
        const carrier = a.carrierId ? insById[a.carrierId] : null, tpa = a.tpaIsCarrier ? carrier : a.tpaId ? insById[a.tpaId] : null, hmo = a.hmoId ? insById[a.hmoId] : null;
        if (!carrier && !tpa && !hmo)
            return null;
        return React.createElement("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", marginTop: 5 } },
            carrier && React.createElement("span", { style: { fontSize: 10, background: "#e8f0fe", color: "#4285f4", borderRadius: 20, padding: "1px 8px", fontWeight: 600 } }, carrier.name),
            tpa && !a.tpaIsCarrier && React.createElement("span", { style: { fontSize: 10, background: "#e8faf5", color: "#0fa890", borderRadius: 20, padding: "1px 8px", fontWeight: 600 } }, tpa.name),
            a.tpaIsCarrier && React.createElement("span", { style: { fontSize: 10, background: "#e8faf5", color: "#0fa890", borderRadius: 20, padding: "1px 8px", fontWeight: 600 } }, "TPA=Carrier"),
            hmo && React.createElement("span", { style: { fontSize: 10, background: "#fce8ff", color: "#9333ea", borderRadius: 20, padding: "1px 8px", fontWeight: 600 } }, hmo.name));
    }
    function TaskRow({ t, dy, aid, aName, showAcc }) {
        const key = `[AM] ${t.text} - ${aName}`;
        return React.createElement("div", { style: { borderBottom: "1px solid #f0f4f8" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, padding: "8px 0", flexWrap: "wrap", opacity: t.ended ? 0.55 : 1 } },
                React.createElement("input", { type: "checkbox", checked: !!(t.done || t.ended), onChange: () => togTask(t.id, dy, aid), style: { accentColor: "#0fa890", width: 15, height: 15, cursor: "pointer", flexShrink: 0 } }),
                t.ended && React.createElement("span", { style: { fontSize: 10, background: "#e8faf8", color: "#0fa890", borderRadius: 20, padding: "1px 8px", fontWeight: 700 } }, "Done"),
                t.time && !t.ended && React.createElement("span", { style: { fontSize: 11, color: "#0fa890", fontWeight: 700, background: "#e8faf8", padding: "1px 7px", borderRadius: 20, whiteSpace: "nowrap" } }, t.time),
                React.createElement("span", { style: { fontSize: 13, flex: 1, minWidth: 60, textDecoration: t.ended ? "line-through" : "none", color: t.ended ? "#c0cdd8" : "#0f1c2e", fontWeight: 500 } }, t.text),
                showAcc && React.createElement("span", { onClick: () => { setSelAcc(aid); setView("accounts"); setTab("tasks"); }, style: { fontSize: 11, color: "#0fa890", background: "#e8faf8", padding: "2px 8px", borderRadius: 20, cursor: "pointer", fontWeight: 700, whiteSpace: "nowrap" } }, aName),
                !t.ended && React.createElement(React.Fragment, null,
                    React.createElement("button", { style: c.tAct("#e0392e", "#fff0ef"), onClick: () => endTask(t.id, dy, aid) }, "End"),
                    React.createElement("button", { style: c.tAct("#d4880a", "#fff8e6"), onClick: () => setTaskAct({ mode: "update", task: t, accId: aid, dayK: dy || dky }) }, "Update"),
                    React.createElement("button", { style: c.tAct("#4285f4", "#e8f0fe"), onClick: () => setTaskAct({ mode: "related", task: t, accId: aid, dayK: dy || dky }) }, "Related")),
                React.createElement("a", { href: gcalUrl(t, dy || dky, aName), target: "_blank", rel: "noopener noreferrer", style: c.gcBtn }, "Cal"),
                React.createElement("button", { style: { ...c.tAct("#1e8e3e", "#e6f4ea"), fontWeight: 700 }, onClick: () => handleGTask(t.text, aName) }, copied === key ? "Copied" : "GT"),
                React.createElement("button", { style: c.del, onClick: () => delTask(t.id, dy, aid) }, "x")),
            (t.updates || []).length > 0 && React.createElement("div", { style: { paddingLeft: 22, paddingBottom: 5 } }, t.updates.map((u, i) => React.createElement("div", { key: i, style: { fontSize: 11, color: "#7a9ab5", padding: "2px 0", display: "flex", gap: 6 } },
                React.createElement("span", { style: { color: "#c0cdd8", whiteSpace: "nowrap" } }, new Date(u.ts).toLocaleDateString("en-GB", { day: "numeric", month: "short" })),
                React.createElement("span", null, u.text)))));
    }
    return React.createElement("div", { style: c.root },
        React.createElement("div", { style: c.hdr, className: "clonkr-topbar" },
            React.createElement("div", { className: "vinyl-field", "aria-hidden": "true" },
                React.createElement("div", { className: "vinyl vinyl-a" },
                    React.createElement("span", null),
                    React.createElement("i", null)),
                React.createElement("div", { className: "vinyl vinyl-b" },
                    React.createElement("span", null),
                    React.createElement("i", null)),
                React.createElement("div", { className: "vinyl vinyl-c" },
                    React.createElement("span", null),
                    React.createElement("i", null)),
                React.createElement("div", { className: "vinyl vinyl-d" },
                    React.createElement("span", null),
                    React.createElement("i", null))),
            React.createElement(LogoMenu, { view: view, onSelect: v => { setView(v); if (v !== "accounts") {
                    setSelAcc(null);
                    setAccStatusFilter(null);
                } } },
                React.createElement("img", { src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdAAAAGQCAYAAAAeBTFsAABlAElEQVR42u2de3hU1bn/v3syAWJEiIwRJICAEYxmjlZFKz/konIRjJDKpQ3UIzZgFaFAVVpFK2hLsUCJaEWsYiE9EjwDWo4BL0HMwXJTexJNCWi4BYNDICjGAElmfn9kr7Azmcns+1577/f7PHm4JJmZvfda67O+73rXu4SG2q/DaEMb8osxLmcQ4mlDfjEGdvse26suRL/MzsjwZ8IosfcCgNRho0AikYxTsKiQ+lkbKispNXS840xhAAKA0Gv56/rnTpu9f/78+Z6FCxeG3PjsvfF+QA48pT83zoQPLfczkUgk7ar2pSGVbkNM2Q2eegH/8JGTrn/2Hmr+2hpiWUmpZe9NIhEgovdJ6h9tw1Pr/aH7K9OBkpwz8ySRjHAi1Cft9XwIfuRACd4mDhTU4UhOnUC4rW2zcUPr+EHmwaUAJRiomwWbfd/oOWlTsKjQtoOgGWFYJa9tFWiNej56vW7PHhcTQN02Q+Rl0LCiQ8oZVNuCqNnQJoehXpQ1q+84QI6LFE2K10DNHEyp0Vo/qFrxDPR6Tye0HzYBcFNf4G18oXGIpJsDpcZEkwOSue2Eh7ZCIXUSSQeAkkgkmvCRaCJCIoCSLBoMaK8eya39RY92T/2HAEozSJtfF7kSklP64o7tNS2+eHfzeob2CcbqRYUUCBqW3Uc7d1ozkuncmECkpS8WrD0GAPh0d1Od7M9LTgEAPttVZ9hnuG5AErqnNZUTT7k4BQBwcRcvLu/TAQAwYXJXrscOq7apuRagSjp1wdpjmD19v24NFUCbjZWpZ+/2zX+/eWAKPWVOJwZ2BgNlolujgrXHcLDiDL7afxxHKwVD4ShHn+2qw2e72L+qWn0/cvyTAnflmhtpIksONLbYTFCvhtr0Z+zGqmbGGAngnr3bGw5dNlOOlBnvbcaMlgZ/ZW3hgy1HsClwJsZPFDe32ZSLU/CjGy9s5WzM/rxmttOCtcfwt79WWg5KI4BbMOKYZc+RJmkWAVTJza45WcN1A5YLYekAJgWukoFkx/YaPPPEV4oGgjHZHZoHzciOxmt4T+uM1ioAW3E/5836EmteqVLQZquw5pWWzua6AUm4xt8Zi5ZfYfjnHTN0T4v2u2xluqEAkHt/SCRHOtCjlYLDZo3xO/PR2uhHrX30wbeKZ9FNrqRp0GQDJhu0eJ41qv1sep4QoeQzSH/PzEIhekwwm9pmHWpO1hgaEuyeXNzq/2ZP349Pd39vCLwJniQ7yNAsXKeEXZQoVnhWL+kZFnea1BbKlv6808NZajIuo8GTac0rVZg+ZTfBU4U+2HKEOi0BlESy1rnq8Rq8VPzh7R63BU+mTYEzGDN0j26fkWXPukF22kJC211ai7ax2ExWrSubFdp0GsR4TKqS+znkwJPps1116J5cHHMJQxG008KSPAXnyilLXARQkuE6eaLB9e7QjTC0631TAs/I31vxMjAuZxB1ehkTBTu1DxoDWsuwEK7Ra4EkApnT39Nu8GSaMQ3YkF+s+P6ye8z2eJMDVX7vYn2PQq8GAVTtGZHxlCjsp7tL4h5kcl/PiNk3byG8grXHNMNTClElk2i3rEEb0R/YfYvWltl9beveEmQ1AHR71YWGPNTNmzu48oYerDhDrcpA6V0DlNSkDfnFulUNY5o9fb+qSBSP+8d57g967GGmyYtKgPbL7GzIQyXRoGAXeClxoU50SgVrj2HGNGNeWw1E3RLC1XObn9Y2SZNJdfIaNRg0dQL3bYT+av9xAJcb9vp6DC5WVzHirbM6NfNX7nXp7TxjvT4PZeuc+By1tl+lRUfIIEkASo7LeZ3O6A7nFDn1Pii5Lr3WPPWE6MVdaHOA9FkStPiVYVm4tMeJnB1BvG1ZXanLLHhKIWr0WZtOhCf1Wxc6UJIzGrfc2a+SsCF1QutlNjyZfjL887jFFiKPJ6Q+TXIdQN1YB9fNjtYtHd0Jh1xbBU/p++tRsYhEIgfqElFIW552bK/BxoITMYuJG302ZrCoEKnDRsWFp5p1KSPXsuQml+lZs1aLpk/ZHfP0GLcUWb9uQBJ1eAIoyUyZnWBhttP6yfDP2/y+nLMxo52fKlex4CkFpxwQRvsZq13r9Cm78dkuPvYpbwqciXmg9JWXHwXQhTo7iXvRaSwkbuCpNcHks111WPNKlaHbMuTuAzX73sWbWE2fsls8X5YfxXpOffq7A57d08KGvj5VFyIH6giVlZTqtiacUP8vGLnP1En3PBbEdmyvweEDZ3Gw4gxOnmhAzcma5hB75HNiYTYjw8ZGa/GCg9zBE2g6HD6a6sPpAKgUqB6TPTUAdcI6PwHUcU7O/MSNtirASEsOtpX1aCYoDh84q7t7ZrD8YMsRVRBhQI0XNh47oQtuHshfBZ2Ctcew/I/8rSkuW5lOhRVMG3uM/x0CqI6ivV6tdd2AJF1caGPitTG/Z0R2ZbQwG0vkYRo58gx3x1ctXnAQH22tNjwbvGlNtg6fl5zCpq03cAdPo6sMqdGsx3oQPOGekoUEUAudhN0UK9tWr4E8lls0c2vC+USeJm0KADOmFbcALEvmMdvFMvHouoxUZLvYsb2GS3jKcZ49e7d3xTNj/YPkIoBSfJw/Wb2vL5Yriwx3jsnugNtGONN98LbvOV42M6/wJJEcC1DK6OJP06fsts1n3RQ4g00BKizutgmVUnjyuJZMIkWTom0szHWS++RHdizQwGNo0SnipVBCNHgGiwppEi6RW0LVBNAoECXxIbuWTFRz0DLvsjp5bvGCg9y1B6nzTB02isYPctqOkiFJRNItEiSSXNm9hNvhA2dx80Br8gT+9tdKruFplmY91qP57yyx6mDFGdkF6nv2bo/DB846IkpC+So2BaibT1OgIvrq1Tf9EgDOyJ41e9AieDYlqT365OVxoRLv2dw80PwJiRGwI3CSAyW1ITuHQZ3YRtg1uX3g+u93r+E2POmrrgQQ//l0Twu32KqltyILyduxzRw+ctL1YzDVwrWxEgX7hplOnmhw3PNw4jUp1dHaQZbBU05hgrYOC1D6WlpkdB1cvRyx2u8TQEncq6lmqD1Vc7LGcQCKdk1ug6eV0vOkIqNPPbJ7FaImJ08yBKBf7T9Od9YgOSX13Ynno7r5zNe24GmWW7FT7oXWKkRG39N4IWW5Tp4AytmDJZ2XndcRKdmKnCfPcnMipOzJfI+LCaBS8OkBP8r8Mk+05kaTAjvA045jgtH5BVozlGmc5UNeIxyjk7Yj8CZpgobT1tzcsoZYVlKK706n2foarhuQxN3pM1TZh2SJA5WW6KMQLN9yYgUftynDn2nrKjQ8wlNvGZmgF7mFhWRzgDJoEjz5V6Kwn54TyTKNye7geHgarWv8nU1/T72W6Egt5aVYuj1VVlLq6qxPkjXwXLnmRtNcrlPXlK08B1ROJSaSQgcq98bLlZsz2MZkG3vt43IGIcOfSZ2AZCk8eXQzhw+c1TRumSVaq3UhQHltjLzJzA3SvFczcaOsPpHFLOdpxATOiPFF7ec0couY0evf0e4jm3TTxNsigNLNlycrwzMkPl2QnTXlF91MC9tKxxc1k0M9oWdUMRgzEojUjtO0TmqwAyXFF4Vn3C071yeOBs9Fy6+wzefVE3qbAsY40FuH+riFFhkk5fLSLdBXdEiuu2Xn+sRSzXqsR9yjwXjTpsAZFIxo2ubVVqEC6VawT3d/j5qTNThaKZiStBSZH8Lb1kGCKAGURCK5DJ5M7CBsXg/EjgZ2ghYBlATaIK1VtC3HellxEHY0NSXjVTnq3hqdoU8yX4asgbp1HZCyYkl2LvDPCzwBZ5Z1vG1ED0ddT9WhowRQI17UreuAdj/jj0TOk2ScnHZ/6z0UcXNsCFcaTo10hrFAx2a9TcXwlReEMLuDODHMpZfGZHeIO+M/WHEGy/+o76EHdjwhh8EzWFRI5zyaMB7pIR4qCnVKotOgDAHohvxiwxph97Rwi4FRT2i5ucwV6+DSyYZZmYlWuqiPtla7+mxS6T0jeBqnn9+v7+k7PIxTnXypBFAjXnRcziDMmKYfRM2qwWk3eF7cRd3jm/VYD1zep4Ns2CxecFB3p2ZEwlXTHkxlAO2eFsZnu/T7DHZbu9M6AWVbMGL1nXjfj6UrLz8KoItjBloKjztT3BdSUANPt1TUUBpivm5AEo7WDsKjT16uqEPbdUsDKb6mT9nN5edqTLzWMfc4WvatHcYnqkqkAaC8QGjkyDOqHqYTQ7HMtQWLClX9vhXHKLXl/OT8nxKNyxmk+Hfcnvi1KXBG8xmzbfU1tSVAnXQgxX0PXGHL8Yn2p2oAqNbat3qE6K4bkIRxOYMUr02a/eDNnmg4Ya2KF3CpDYM7Ccizp+9XXQSfBtn47pOqkzlXqkYPtesaSsXqRvLeSZ06iLDn/N3pNMd2AL2djl33L/5k+Oc4WjsIJH3ltL2fJJkONB4w4kFDj6ICVoRxeF4/jbynShMTpIO73OvM8Gei6uDn3Ds/XicgdlpHGjN0D42IBrh7EgFUsey6tuTkY9siS+VZeZ1uPnSdV322qw6LFxzk4rM46VSb7snqdySozXcgmSPDbAAvDkPqANy+XiPd76jkXlTsPQEnbSkwczJmNy3/4xFFW5x41qzHeuCr/ce52M/cPblYVYi82pcG2m3pQoDq4TD0rCvqBHia7erZPdt3sDsAfWu8RquXTMXk5Ysl6RkBhtnT99seoNcNSBK3X13ePJH2VVdie1XTgffSY+c+3f09AODzklOGgnbM0D3YtPUG141bThbX+0A/2lqtCwSc3AiVZjtr3bKgl/TOTFSb9W3Xgw+6p4UVD8ZKB3s9ZfVacIY/E9W+NPTL7IxxOYMwYXLX5q9Fy6/AouVXYNPWGww9UemzXXXc7rvl+dm5EqB6rGG4ucQaT9oUOOPYa7P7FoNlK405wPuzXXWYN+vLNgdVJQOr0klst8uvMQSi8T6HkZMS1peMhqgRyWsEURMBqufN5sUx8exElOiDLUe4vf9GHwfnxApVEyZ3NQyia16pivn8nRzZmfWYsVtPzICo2RMPAqjO4BvY7XtdXkfpgO82sZNjlHReuVAsWHvMkDR8Iw4WlgNfJw0C0vVwIyHqxm0YZpSu3BQ406bDJ+DZQ14jBpim18nEdQP2aA7DbgqcAdbQgwKiZzarSdaaPX0//vbXylb/b1bI3MotTk4dWCZM7mrI8WyAuuQXrbI6tL5sZbrhk4c1r1Th4i5e29aa/rY6SA7UyBc3OiRnppwW+vtsV12rL7P0oxsvpNmQQc5pyi+6GdJWeNkfauaExIhISaSW//GI5ctUbjl8gzuAxrvxejkNMxpYvA3LvDoXu2aROsnV8qRFy68wZODnYaA3W2YcoQg0RYSU3ls9gac25EvngRrsQPVyGmoamFLZoUB7tHCtHbNIY+0xdBIErZzRr1xzoyEQdeN6qFFry7xBlKROtilIOnv6/uYOzAaHvumXtIJKz97t24TKju01OHzgbKv/P1hxBidPNABoXRA8coP/Z7vqsGxlOh2SqwNgnLgmacbAFq/S18o1N2I6duu+BWn6lN2mOTNeJnt/+2ulKUscSgpYUJKQAwAa7yFOmNzVkFnr+UHBugzdT3d/jwmT5f/8dQOSDOuERr623pI6owx/puKj6mKJp1NQeBncVq65EWMq9+jaNjYFzqBgxDFXTR5/fn8aPttljvtWW/KPZI08dAvsLzsla0m33egFT7tKS9UbFnmJl4dgRHWdWJNipyajmJVQ1DzJpFNxCKCsQzlVPDgedn/ttHbIBv5oiQtaDiDQcu6ikeXbzHC7cqrr6H2NkSeMOH09buRI86pxmVXyj9ZQdQJovJmj2pllhj/T1JkbbzK6gfqqm/Zy2mlbCK0bWyMj9nEaOcibfYxXvPcblzPItIQioClUbuTWIYKnjgCVM4tVG2pz84ns0ntmRJjVDpnDSpye0WeEmjFoXHn5UfkuzuTQu95ra9KqVmwMaWuckDsRt2Jwl9OXJkzuamq0wsitQ3pUK6JCCjJDuJTxRa5OD13j78xFVCBygNYTZD363cz1M9AbokYkCfI83phdkYmnrUORfeeH2noCKA3u9pHdiyZQBSJnQlRu0osS18NzdMXoYvOtIhUR681WOPZo73FBciIBlIYTc2R0oo8dEmGsnkzJCTM6qU2YBdHPdtW5qkoRb7VrzWjP0foOVSIyCaBOTCSKLK5ghtoqEMFDeNTKNkAlDa2FKG9ViozeF21mQhHtC3U5QJ2YSMTb3kvew6M8twGrnKCWbTt6TRj0HJzjhRqtkFF7U83aG0rwJICSO9A4WDpBcsK3WtoJLzWBI6+hrcFbS9axnter5yCt5xmXWpcljC4XaXRJw/9+9xoiFAHUngXP9ZbRWzR4TtaSO1N3QjuRXgOve+2ifS69ILrmlSou1kOvG5CkaL1brVM1KpS7bGU6jZsEUP1mk7zJijVQvUBltngP4dsxOrBju/pKWLGgohdEnXZqS1tgNWJvqNUHVcidSHxbHfQAEOBiebTcZCUztluH+mi6YrB4PSWD961MRkUHjMz4bcudaHG+ekBUr20eZuYZtPWs5JRKNBuebPzVO8rBKjIFiwrjvnYnX+ppAOEFCyCE5/byBqamJrgNqF4tDY6HQYrU2oXqfYSV1gGBFHtiwaNbO1o7SHVCkFuP+Zvyi25Y80oVd86TQdBXXYmOX29r8b3EYDk8NS0/s0/8Yn8PrQfO9hvS4mcO+HPCAFC155+DARQKwsJT0u+HC5CwYXMqxr0aDAlA2MnP3ev2wcIs6ZFItSG/GONyBsV1ofMu/lJzZ9ZrUKFCGm3LiKPo9HC9aiDq5ozRRcuv0NTnlMAz8hSjaJBsX/4hAKC/DtfGXkuU0L/p38K8C/H3eXN6HgewL1AR3vm/R87tWPHJN+8JE3AKaCrzF143PuHh4kB4xYrGkGsAatQxU7y5Iy1SOujpkRAwsNv3sjvzj2680NIJy5jsDli0/ArXwVCpNm29gcvtH0oget2AJNNL3PGoZSvTVfU5pROPDH8mgkWF6Pj1NrQv/1AXSKpUGMAlAC7J7iMMzO7THksH9zy253jCu1+cqH8n953Kd4WJ62sAIByGZ1aPZORV1joKpJ5Ylt8IOW0/qNnnHyopbzZhclccrR1kSQh1yi+6qV6PdVqymdyB97oBSVG/pPeF/dvMexRvcB+T3cEweNrpmD7W55Qk8l03IEkxPINFhahbOw++rU9HOkMrJIgQbQTQACAEoOsNlzT+/N7+njfOzelZ9sbYHqtmpiX/WBAQyqusDYXn9nLUOqnQUPt12CwHCoDb2bYRg0vk/dR67VpCZAVrj+HT3d8bEtq9bkASuqeFcduIHujZu70mtz19ym5VUQo59ybWvsCCtcd0cetjsjtEnTgYvR/RDEVru0avd6ptC1a7Yjn9XGnItndJPg/AlOtKG0VIJrD/DFSE//HxnpO/yaus/SICvraWN1aIwCgZseZjhZS6gLKSUtUhHr1mxxMmozmsyvbqfbr7e9ScrMHRSqHVc5FeY/e0MFIuTsElF33efOKIEYPnyjU3onvAnpMsuzkmpRMUNgn7vOQUfn5/muHr2yvX3IiCEef3lB6sOIOTJxqa2ysQfSllTHYHjBxp3Rgz67EeWP7HIzG/J7eWLgvT9rcHOKWu1CuBaQiAJ7uPcFd2ny4jb6m4+MVJG488CuCcEyAa1YEaqcULDsZsXE51oFLNm6U+wcctSRpqHKHWe8MOh5YOzEone20NjrGiOkZGe4yWks9u9nVafV8jXWis6EQs1a2dZxfHKVeNaFoyFAIV4X9M2njknnB4foMgLAzbGaKmA1RuiINHx8lc2MVdvLi8TwfVM3BppZZEoQkU9eH4a5VuymhVWs3G6ntTsPaYqs9g9EBvZPhYKUCN+hw8QnZDfjE2b25aDx058kzc7HnpZ+q/Ptep3ToMoB5Au0BFeN2kjUd+Gp7byyMsOdToWoCq6Rhjhu7hKowrhaO0KLvW9TyS82S39UwCqH2crANdZyzVA0h8bnf9lMeLq9YGpqYmZL8atCVENQE0MgM1XkNjjVGvpA05UASAvumXtCjkQHsTnTngGf2Zpe3dzglB0a7LV13J9SHWTgZoWUkprnz/yVZFDRwstpVlf7ulh/8jHMY5QWh2qO4CaIY/U9bAFfkzasK40cKoRjpFO69PuRGgJJId+5mDQ7axFEZTAtGZdksP9wXwdRgQ7Fi1yKtHA5CjyIGYFVVg+6bMgqKb4KnlGqy4djdPWEjuU93aeXbLsNUboufEL9vKq8VxaBnsVq65EVjD742hgdwax0uiCIEb7oWL1jujqR5Au00Hk0oAVIfD8AgCbFmhyAuSY92lnQYUAgHdLzc5T4fAMyQ6yWihVyGK42T/3w7AD0WHTj01f/78hIcf/n24aZeL/WTJNhYSuQ8SieBpAfFSuqE+tV+L/zt92WAAQLUvDUBTUXqp5JziolDFvy44MSevsnbPjBkJHjsXmncdQM3Yd0dgI9CTSJF9wAp4sqPIDvhz9OqHLAEo/PSU7Kkdjh8KpnZM6N2xnZAKoCOaiiV0BNC1Z0dvGAAOn24Qenb0fnP4dMOx/z1y7n9XfPLNOwBgd3gCLgzh0mBu/sDhxklFvGu24p7wsifUjWNOsKgQPpPgGUrphpPXTkO1L635mWTo/zbhniMnbsmdNluVFXUCPF3pQEnmDX52dqC8wUaPz6N037bd2huv1xEsKoRv69OmuE0dnWasdsccaOjPy5+/us+Xf92PpqLxoXEpkvrgAwaEIawHwuOb/r1rlwAAG2rqwtmvBtnaqe1FSUQkwwY1ciR8uiErAebGbGsz4Ll3/Cpk+DNVOU21k7NOvtTG7N8GG+fPnx9euHBhhJs8JP653tHPlgBKclxVHT2uy8h7oua1pQVLCGDGKFhUqLgaU7zJSN3aeWhvsOtMmrxIdYg2shgOTYItBCitgzjXncbqTLw+cye2Q63XxMs94fXZKIVnvOswOmmoeuhTsj5zPIdJ47Z6eXjqGDQ7ttfAzePzyvBn0mDg4EmAnSadRsJz7/hVutQupv7CEUCpc9nDSer5bOiZ8fNs3TwBDRYVcvV5rnz/SUPhqbRinNp+2labqjp0lABKQw8NhDThoUmSXSIMscTTSTLBokLDTlZRCk/q48bKMUlETti0H29BnzoDyaxnS8sp6mVU1m310KdaPGerj9e7IDmRHKhT3JBTBkFa0HfmoE79yB2qWzvPkNc9229Imy7bivbVyZdKDhQxNrRKHwgN6vZ1EiQArQtbWwJPO/Ujqz+nXQ90N+J4slBKNyRNXkRjBacAFeR0Ijt0fmpQ9nRmbnhusULzVC/YvL5s9L3uXZJvyOvuu32BEaX4SDoBtFFOWIDgyScgeB+A421ON+H8WQ+A79FU4NpyRyUXrE5xZjxNkIxYJ2avaZT7PNtvCE2ueAboa/nr+o0fP6XVN3aWlrX4d9LFZ3FJ6i0xX2j9+jX4tjqITr5URHs9I3U8+HHzZ5P+3WwdD36MD7d9BQAYP34KTuzcjp2HK+LeO6YTO7ejy00DFb8XACR/e0b275p6P6q+w5DKPbgk9ZZWz0bJc1P5XL3r16/5blzWmN907pj8MJrOLzQ989zqc1utrOvr5MFfem1Guc8D/hxynzwDNHfa7K9yp83W9UX1fj07iu4BHzr0Vcn0zh2TH7IKnla7KCOTSyg3AuQ+3Q7Q+fPne+bOmYVOnZfj21NNfwLAk1H2AUt/jon9e8nS5W3+nJGSvhf7/Ga9d+TnYPdtwQI038cFC+J/HqWfW/pe7P2suOa2nof0M8ZqO1K19fmlPxvr5ySv7+2c4jt36KuS2d27+paK8BTcCAHaFmW8jHKf0RKHSHxJoFtAcpJO1VQndk7x1R/6qmRW966+PwNoQNNxS64EKMkE97k+1xD3qRagBrfp5uPMXstf1z932uz98+fP97Q+jcUdokpEJCfB0yvCc6YIz8a24CnHRdH+TVJbbcDItU8tn1Vuu6W9/gRQEonBs0GE53IAjWUlpR5ojLLYqZA+gd98teds7ZPVvZX7+1RMngBKIngmivB8mMFTbNuCm0Gid11cnu6lmZ/H7EnU6csGU6e2iehAbZIT4FkvwjOPwbOspNTV6/t6uwreXAoPn8eo8G2sfdNUdIMcKImkJzy90eAJQDB6kKFBjGRU+LatNkftjgBKIukFz4ZDX5XMiIQnDTjWiqdwr1Gfw6jzR+0Uvv22OugJz+3lqan5vWfGjATPzLRkzTkHdhOFcEl2hCcL287o3tX3fDR4ugVUWhyxUSFBniYtRn2Wjl9vM+R1q31pSOWkXcW7d518qT8Ivz0UQtM+awC1AIDwuvEJ2LULWHIoJMQ4rIQASiIRPB0JB1J8tTfo1BU71Q2u2vPPzMDU1IsAeD58tzaUV1lbC+AbYeL6OvYz4bm9EoQlh0JwKEipkALJTvBkYduHunf1rXAzPPVyGgRhdfeNt+IJZlyzr7qy2XknBsvhqalqdQkAgnuOJ+z84kT927nvVL4D4ISENY6DKA08JIInyTbgMtJ9y339urXzDHGg1UOfavPkIivud++SfC3XWhWoCL88aeORPwKocyJEKYRLsgM8Wdj2QYInySjJhXJisNyQ9+dl/ZNBs7/yXw9LvgCgW3Yf4ak3xva4ddLGI1nhMGoFwVkQJYCS7ATPFwieBDirAdO/deiSm+tTG5Zn4NR4qowQ0S/DAOrHXn/Z0DeA1YJw5J7w7NkeYdkyxwCUtrGQ7ADPX9odnnaqOUr1UWPLV13puGuqWzsP/dfnGhGWFgC089RU1Wf3EX4y4/pLfyYsWxYKTE1NIICSSObAc1b3rr4XzYSn3gChZB3nyKjtK20VUDBKwaJChObfbMh6bhTOhH+WccEUABg3wjmlCimES+IRntIKQ3+GzcO27ExOu0DUCbB366RFzjWXlZTiyvefhM+gUHQMJyrccEljJoALhInrf4BDEooIoCQe4cmybfOsgKcRA69bHajdQBaviIAJbs1Q1a2dp3WdUy1AAaALgE4AfnBK+6YQLolHeFK2bcSAruTneVrDtAqeWo4D0+tZ8NaOTArXRhNzmicBfOek/kkAJfECz0SJ83wBQIMaeDot+UUpCGit1bh7btcEIpYkxIF+AKv35xBRCJfECzwjy/MlqHGeBBDn3QNejvEyKoHIKAWLCuHb+jTaW/9RQgCEQEV4LwAhvG68R5i4vpEASiLpB8+HrVrzJNGEwGrpXZyhbu08+PhZrxUACKfPhfMBhGfNfccxfZtCuCQr4cmybR+yEzxpn6Q7ZeT6YZS6sqramIlbU+QqjKZo0re571RuAYC8ytpGp7QJAijJSng2iEUSXJcw5CQAu2FCYcb1RZ4xqsR5l5WUNrnOrU/zdusaAeD5PQ1/A1ATXjc+AVTKj0TSBZ4PmF0kQQ9pDSmywZgKLNhHZiQQNa2xKi8mb9HWFLnu0wOgbu5HXy8BgFlz36Fi8iSSBniyNc8Hunf1/QUuXPMkaNpPZiQQKQ27cpQk1Jb79AYqwi8AOBReNz7BKclDTBTCJVkBz1+K8FS1VcUMRYbTeBUP4dMMfyY3k4J494L3cHPd2nmyfiY0/2Yew7Wt4AmgZNLGI4+HZ89OECauDzltTCMHSjIbntJTVVRtVdEyuMod6Hk6l9EowDjRCRt1TWYl5bQv/zBqO5UeM9ae/8fAjjRrmLPt7CPhub0aNtTk04HaJJJKeEoThl6EuC+M2p81ALWyNq/cPZ08gb6spNT0QgTS4vKJwfKoWbocqx5A4ut7Q0/kvlP57JZBfRJHFFfUO7E/UQiXZBY8p0sShqLCk7aHmO9Cef0MPLljKyoQtS//sPnLjvAMVIQDue9UPhteNz7BqfAEKIRLMgeeud27+l4CFUmwXFaDScn78wJRu1Ugshqemw4m/XPSxvLJ4fB8jyAsDDn5gmkgIxkFT7bmmdu9q+9lgqfzXKxbsolD82+mBx5fDQC8mw4m/V92oPwOAMcBJAM4K37PkaIQLslIeE4neDoTnnStpCjw3JYdKB8O4PjMtGQPmgrHNzj5wimESzISnoaGbc0qMs5LMXNeJPc+OOG+9S7JpwcuA56BivB7kzaW3w2gbmZasievsjbkhosnB0rSHZ6BgtVTRXiGjIanXd2I3NeyqwOShnjt7OL0LvLuMLFCCYFJG4/c5TZ4AhRSI+kHT2/nFF9DoGD11KzRw/8Kh4VtrXJTdl5rtLsDtWL7io0UAuBhW1XCYQhCU08Pu+kmEEBJesAzoXOKrzFQsPrhrNHD80D7PEk2AjxTJOjr1s7j6VQTruB5tt8QYfGWfb9cGNixUizRF3IbPAEK4ZL0cZ6NH73/9hwRno1a4ElJGyRe4ErwjKrw3vGrPEmTF4WfWhP4R3huL8+Tn/d3nfMkgJL0gGdi5xRfw0fvvz3vlh/fsAQ61La1Y7jPCQUg5Hx+o65Rzf3T45631dYoeai1zvYbAs/CHc337c/Ln+8oLDnkSufJRFm4JC3wrN+5/b3Z11979R9EeJpa25akn+RMXHib3CjJBo71s7H+n9xnS3Ae8Oe0uledfKkht98bAihJDTy9EnguhQWF4Y1wX2oBwWrLksyLOij9HSXJWMGiQvjosbQAZwbdDgIoSTd4Nuzc/t4sCTxtnW2rh7OiPaLOeb5uL91H4CSAkgyE56GvSh7u3tX3Z1CFIZLDVFZSiv4uDd8SOAmgJOPgySoMzeje1ZdnBDydflYliX+5NXlo7/hVisF5+MhJ17cXysIlyYbnzu3vPdS9q+956JBtG0tGgNMtGbJ0HJx2uTF5iMFTiYJFhdRYCKAkGfD0dk7x1X/0/tsPX3/t1StgcMKQEQBwg5slx65dboTC2X5DVLWd7VUXUoMBhXBJ8eHZsHP7ew9ef+3VrMKQYWueBAFt90WP+2dmgX7envfF/3rZlY5bzbPol9kZh6obXN83yYGS4sHzV9dfe/UL0FhhiGQfWLtxIlNWUgpPTZUrn7maer8Z/kx08qUSQGnIIMWCZ6Bg9WPXX3v1MkRZ86T1tpaDL90P5S5X75/VIrdXHqJDwwmgJO0SWHm+QMHqx7NGD18EqjBEkjmBUOJejPhZLSCnY8sIogRQklbnmSCe5/nbrNHDn4kHTytCfbw6PTWVcezgWOV8RjVhX57CxG4O3xJECaAkfeDJwrbzskYPf5ZHePKqDH8mNuQXK6rNyn6Pd4g6+Tmza6PC8QRRAihJD3j+Nmv08D+A49q2PCa5dE8uxubNHRQP3HY+LJtEECURQAme5+H5a4nz1LxVxQnFC+RcQ/fkYozJ7oCVa260/UTAraKTVwiiBFCSFnj+Jmv08OegY8KQ3eEgB3Bq4UkyZsLjxome0WpYOo5uAgGUFAeev4eDs22NGiQv7r4DI0eeaf53wdpj6J5cTI3LogmPGtH6ZxxA1FTFhOi31UG6P9REXA3PeZHw5C07lGeHULrvETz59A5syG+C5sIFa7DCRsVsqJ4pSS5E69bOa/X/VEiBAOp2eP6Bd+dp9FmdSicM06fsxvQpu1tAdMY0IPPK57DgqZsxLmdQ8+tNn7K7Ga5WTDziXVfqsFGu7w+0/in/PkVOuMiBEkAJnhHwdFNyi1J3O2boHgBoteZ5tHYQADRn4mb4MzF9ym5sCpzBuJxBioCs58TDqJNt5N43qs7kLPm2Pt3i3z/U1hNAqVm4Dp6P2cF58uZup0/Zje5p4ZgJQ6X7HsHHOz/E9Cm7sWT+RmwKnGkGa1uvuSlwptVr8godp8GQ4K5c0lBut17dCaDUJFwHTyrPp8Kpfbzzw7jZtqX7HsGmwBmsXrdfFjw/3vlhzJ9zQrUl7h1VdSUNDgrFTm8BKIQL0HFmboBnoliej+CpUju218DftVbWzzYBMT48AWDBUzeje3JxK4jyDCpe6tiySYaW9+j49TZq3CrUuyQf8C+iG0EO1BXOsz5QsPpRgqd63TwwBSXHkmVBMZ4K1h5rDtuOyxmEMdkduNz6YpfwJoVhrXOhv5r1sOvHEQKos+HZIMLzj3rC0w2D1pL5G1v8+5abhsSE5Ib8YmwKnJHlZCdM7trCca5ccyNWvAyuIMqcndOfM2XganOhr+Wvq3f7ZJwA6mx4PqI3PM0YvOMN3GZkd/bp3wU5t/6uBehYklAkPJ98egf++91r4k44nnniq6gQHpczSDNE9b4fdoAnlUJsqbP9hmDv+FU422+IkW8jAGhsX/6hBxuXjAAQXnDNXtdClEJ5zobn4ljwtHshc6WfX831Mjiy/Z1A01aWQ0e34pabhuBopYBDR7di/pNTMGFyV1nvP2bonpjZvNOn7MbRSgGbtt6gGnZ6PVMnFLqPdw1OqfUaSumGfbcvaHGtdWvnGemwQ6L5Otpu6eGMcBinhabRJUwAJTkJno3QoTC80oHcSc5gyfyNWL1ufwuI7theg6qDn6M+nB4XnNHUFkRJ5rVHJwD0bL8hSJocPaHHYIg2Akh4bnf9w48XV63YMqiPd0RxRQMBlGR3eP5a78LwbteG/GK8ufID5H/0O91ek4VyCaLWwbX/+lxHgtMkiIbEsWV/u6WHrz5VU93YOcXnOhdK21icAU+2VcUQeDr93EoGyB5dE1HTfjgA4MrLj6JP/y4AmtYoK/aeQM6tv1ME0cwrnwPQlIAk1ciRZzByJPDk0zswfQpBlKSAWlHCtW0pafIioyDqEV3olTOuvzSnc4rv9Zlpyd68ylpXuVBKInKG86wPFKyeayQ8nZyROS5nEH40+FocOVYvwq0po3bz5g7YvLkD5k14FvsOdkfJsWRFZfdK9z3SDMyVa25sfm32urfcNERW9i6JxFynd84GxZNZOU5Vi4b16vwIAO/yI3NCbnsmFN6zPzwbRHj+CQaEbY1IUOFVbOvK3IVjNbnZir0nWrxG5pXPNcPUSjlxjVrLvbBTCHfv+FWanpuB19sIIGHOtrOjVnzyzWa3uVByoPaH5xy18JSzHYR1WicOupHXPnfhWOw72B3zJjyrGp5vrvygFYBXvfYLZF75HHZsr7H0et10UEA82amMn1Z4sme/d/wqwz7j/+vR7kEAWL7kTletgRJA7QnPRAk8l6iFp5LOpxVUSkPARu71DBYVIlhUGPW6Vq65ETXthys+IWVDfjF2vvVR1DXSmwemoHTfI8i97xVFEOX5NBM6acU+8JT2YwP2iCYACGX3EcbMTEu+Tpi4vnHGjIQEAiiJZ+dZrwWeUjdihiNR8z5KfkfpYD77dzux9KVPMW/Cs1HP62RJPUqc6ObNHZoTkBhQpYUYmBN97aUvNTtlXpy7nd2sHerg6glPpqTJi4yAaBiAcMsNFz8NwPP8oGzXjMe0Bmo/eDYEClbPzho9fCnEfZ5lJaWC3Qc0PQZ0ufdgyfyN6NO/CwZ2+x5LX/oUAHDT3be2OrtzyfyNitZDmWu9bUQPvPXyS7pse3FaBjQv12PwHknNqh76lKEHnjcsHQdPTZXeEA21W3o4PRzGwVk9koW8ylrHJxW5xmo7FZ4AhOPfBF29tnXJpZc2f8nRFTiAf2/ZgltmPIjbx9+K0+cEvLnyA+wu3I731xfj9DkBV/l74ZZh/dt8nWBRIeY8eQp3ZTedi3hXdnds2vA18v/+Nt7/9PFWcGU/p/TanKTj3wRx/Jug5dfVUPI+vCcOuhKeALA3+Wr4yv6h50s2AvBefelFDZk//e7dHavGep5+s8zx66EUwrUHPBMj4NkASYUhSgxRptRho/BFdafmf+986yPcM/02LCp4HDfdfSt2vvWR7NeKrI+7cs2NrQrPZ175XPPWGLeLEpna1tl+QwyHJ3sOOicVJQAIZ/cRpgK4FBPWh9zAFwrh2sd5/ipr9PBlMLk8n1O1Ib8Y32//B76o7hQ1fCtXbOvLvoPdWxREYAD9/tD/4J7pt6l+faPlpm1KUn03fSYuTN3F1WcKpXSDd84GU99T51B2AwBvoCK8aNLGI78JTE31Zr8adPSWFnKgBE/DB2arFCwqxJoHH8W8Cc8iWFTY4nvjcgZh8+cXaIInAydbJ410ogBawNOoe6LH6/IOTzdk/e67fYHp76lzUpFHdKE/B9Bl3F+DjU6f6BNA+YVnop2dp9UD8ob8Ymx5cysuHHgXbrr7Vsz+3c5WEP3R4Gs1v8+Vlx9FsKgQK9fciJSz77aCqFnOUy1c7BJS1fszJg66gKvrO9tviGXPIWnyIoRSuunFk0YAl626M+0BQUA4MDXV0Xk2lETELzzrAwWrZ2WNHv5nuLgwfFlJqeKEExaenfLiYlzl74Wr/L3gaZeAf2/Zgv8YfUfzz7FkIun/taWcW3+H3YXb8X8lJ/HPrXvxTdVx7Nu+B6Hu6QjjO/x0xj3Y99luvP7a6agJQ0YlzrgliUzp/Wur7fCWRNTuV28Y3i/aJN+PJyG89RU9XkoAgGt9QubCf377yhvDfGee/ue35EBJpsHTGwHPRr3gycJgdguF6fV5Lxx4V4t/K03WYPVy+/Tvgj79u6Bi74lWDmnuwrGmF4enpBzl9yUxWM6V+7SyXzDplFQkoOmkltQ3xvZ4UlhyKBReN96xnKFEFP7g2RAoWD0za/Tw5QAay0pKPQAEPQZJNyWMSF1oWUkpAnOWodeVvubvB7vcgj79u8QNsQaLCrG96sLmn2MVhxYVPE4N1sYyYB+kehezcAc390WnpKKw+HXm1wUn/iOvsvbLGTMSPCtWNDpuXyg5UH7gmagFnnLr2jp1GwFLGGIalzMIFw68C2sefBSfvLQG0347HlNeXIwR9wzFhQPvQuqJj2W95tKXPm0B2XE5g3BJv6tV18tVcj1uiQy4WQZUBdIknZKKBBGgF9xyw8UvAhCeH5QtONGwkQPlB571UnhCQcIQnbLRJAbQKS8ujupElQJs6UufxnSaS+ZvxPHyL8iJnncccccTnqoqhebfzMXnMKJcn5pJUORn0On+NADwztl29j9XfPLN61sG9fGOKK5w1LYWcqDWw5OteT6sBp5SZ+l2MUjGcqJKtPSlT3HT3be2gibT3IVjTXGiNoGnbHdBrrWl++Sh30b7DNVDn9LjpRMAhJYObr8UQI/hH1U0zkxLdhRzCKDWw7NBhGceqEgCNxBdVPA4dr71UXMoNefW32HgyMEtfmbuwrFcOlATE8UYPOsBHI9wozGdjtUQ5QXipy8bzCU8gaYEOx2Silgo9+I3xvb4qyAgvHyiz1HMoW0s1sGTrXnOyBo9/HmCpzIFiwqR3Ds96vf+Y/QdKPmf93D83+Xoc8sAAMBV/l6yt6sw3T7+Vix8rADvry/GX955Emk9k5q/tyG/GFf5e3F5by659FIz6s2GWFs9eqx6XCgc7tqhfbsrxf9vNUge/ybY4k8ra+GGv/gUFxy0/jSWC+//I9d97JJLL8W/fTdprZnrAdBwVYqQ3jOl4/fX/+3I9sDU1MR1nzmj0Dw5UOvgWU/w1OYK2nKUU15cjKqKw4qAvObBR1sdb8YcpjSpxw5h23ihQY0ulTnP8Mf/3DOtV1//Pzp3TO4U7/PITWJzQ9UhM5OHtNxLnWrmegE03Nvf86cZ11/60+xXg/VbBvVJJAdKInjq2MGVnNSR3Dsd3ZIaEHhuVUxnWfI/76FbUkNMpyqF55Y3tzYXXojlRE+fE7DnpRfQ547h3Na2VeIuVLpA5hzCR49VT/6PG27926maas8PP3w3pUP7dpeLcPVY9NlkqfbAl5Y70Ebf5Uj0327as9Yc0UB3rfdMABAecbl39LdHGrY9/Hnw4My05MSd39Xb2omSAzUXnixh6EGCp3J3EiwqRN3aec3/Th02CiPuGdqmE5VTLGHpS59ixD1DW/zfhvziFk5zUcHjeHPlB7hw4F2a4WnXghY4v77pOXqs+ue9+vrfOFVT3b5zii9EvVuZDvhzVLcbK5Q6bJTWxCI2xiX9aUKXNwFcl1dZWz8zLdlLACXJdZ4NgYLVD2SNHv6CHeGptvPq0emDRYXosK6wVeIFg+jbU4a2CLOuefDRVlCMpg35xbja920L0LKtL3Me+FELOOd/9DtdnKdN9+OGGECPHque0Kuv/++naqoT0ZRARFLRBuym1GGjtIaePWI7uvTcnJ6bAdyYV1nbYGeIEkDNg2d9oGD1Q1mjh/9FCzzVwEiPmSv7faWvo/b3ItVhXSEuWpmH1GGjWr1W6rBRuPm+R7Hlza1Y8+CjzfCU4z77ZXZu9X8Du32PKS8uRuqwUbhw4F2t1kVdqObM2qPHqif36utfz6IpdryYjl9bG76VQshuUYiIQgtqIg+s4HzquTk93wJwdV5lbYNdi84TQI2HpzRsu4LBs6yk1FZhW7UzZvZ7WmbckVV5MvyZCBYVNn8xiE55cXHzl9w6t+xzSSEp/d3vt/9Dset0WBKM1HlO7NXX/18smsJTZMTO91tu1SleohYSiHpUQjRBHAe7nZvT810AN2S/Gmy0oxMlgBrvPBtEeLYI22oFkhnw0xuiapU6bBQuTN2FurXzmrNlt7y5FR2/3oYdry1usS6qRlNeXIzvt/+j1UC25sFHWxWgt9NApxM8IYHnmyyawhPY7HavpeufGf5MxYca8BCNSJq8qG7TwaR/ShylWohedm5Oz7dnpiX3Fp2orSBKew6NhWd9oGD1L7NGD38RlDCk2FX0LslH0uRFzf/HQHnAn9Ni0Hx7ylBkrdkq63XbCu9GJiO1lTDkgvKJYYnznCSGbVvB81RNtadzii9UfWz/1s4dk4fg/OlB3N4jqwvJW12+T2M7DgMQykpK6//fU29lvHzBP57I7iPcK33uCsV+r2rOtrM/W/HJNx+G5/byCksONSJGUQ6e5AXJ9fDkcaDL8Gfiuxd+ADCvGaLsz4yIn/22442KrqXk069Q9WYTLK9/YErzz7IqRsGiQlmugFXVcSBEGTwF0XmqWvPk9b5YfQqL3dtLWUkpfNWV3ieHdBIm/fbIf74xtkdDdh/hfnGcE6AsspkgRjq6LR3c/t1uF3SbKyw59DwAzJiRkLBiRWMjz/eCQrj6w5OteT5AzlObLlqZh/riH9oM0X43faasbFumEfcMhf9HfZtPZvnkpTVY8+CjLcK3SuDpQIUk8JQ6T0cUAbf6mfF2+oqa5QYx7Bzu5EsVwmEIkzYe+cVzu+t/K8JQzboo+53ER25MzHtjbI/nASStWNHYGF43nuvkIgKo/s6TbVXRlG3LeyeyGqJ1a+chNP9mnJk4qhXw2rqW1GGjsOXNpnBvtS+t2YVur7oQax58VNEAa8V9M3hdkQ18DJ4FStY8ScY8a44namFBQDi8bnzi48VVf5iz7exYAMfEMU/phMsjTtwas/sIM87N6fnRzLTkHwkT1zeGwxB4LUJPANUXnvV2g6ddnChzm0wH/DnwLNwRF56xMhyDRYX45KU1mPLiYmT4MzEuZ1Dz35082WljMA67AZ69S/Jt95l5b5NPft6/MbxufMKKT755q93Sw3duOph0EGL5PihbxxREF9sA4IY/Tejy8W9/3O33ggBPXmVtSEww4mo8pTVQfeE5XQ94OnRdrU3VrZ2H9uUf4my/Iagv/gGJgy5o/t7pywYDlw3Gjh8W49sHH22xbhlPW97cihFoGZYdcc9Q7HhtMaaIiUduOU9Vuic34lqla54/1QJPOpu2bZ2+bDCSHALOFuSbuL5xZlqyN6+y9rPsQPn1b4zt8Xx2H+FnksiGErPmFcfQ9r/7ceJvxlzR+/o3tgZnZ78aLAMA8VxRLpKMyIFqh6dXAs+X9HCebhx8pNm2F63Ma1FxqOPX29Dx620YckEmOp3eDV91pezXnfLiYmx5c2urNU5p4pFb7nmMPbmR8Fynh/PkNeyYGCy39P3ZsoETlVdZ2zBjRkICgJOTNh6573f/rH8WwLdQF9JNENtl4w2XNA7/04Quu1bdmfY4gAvFQ7nDYvEFSx0pAVS782wIFKyeFguebjhZQq9B1rNwB9qXf4iyklKkDhuFpMmLWnxdtDIPWWu2Kt43xyAqXUcdcc/50n9umrAYDU+lhTPM7B9lJaWWZ+A6XWLWrBCYmorf/7PqiV8XnPh/mw4m7RVdZRjKEoxYSLcRQPK9/T3PnJvT81+r7kybCSAp+9VgI4DwlkF9vFatkRJAtcGzXoTnyljOU69EE7nVSuyk3iX5rZKDPAt3oP/6XNXXGywqjDooS7eoMBfqcjF4eo4eq/6ZXs5T6YTEzEQsJZELkyYwjm1b2a8Gz20Z1MebV1n7eXag/MeBivBLOH9Sj2o3CqDvvf09y8/N6blr1Z1p9wG4YERxRUNeZW0ovG58gtklAQmg6uDplQNPPSVnwLdjXc3EYHlUiPq2Ph0XopGgLCspxY7XFiPthVXoXZKP76bPbP5i7/Hhc89xBVG9npnCCYcUnj8VT1VxfLat1TVw3aYRxRUNojM8NWnjkV/+uuDE0E0Hk46IbjQEZRWMmBsNiQC+5t7+nlfPzem5542xPZ4G0FeYuL5RdKXYMqiPVwwnGxriJYCqg2dDoGB1rlnwNHN2G29A1zvk5p2zQRNEpZ85w5+JKx7Ja4bzRSvzmr8O+HNw+rLBGPLII1y1p8hnpvb+KpgMhNwCz8j7aPX6p13voZb+nldZGwIghNeNT8irrP0oO1D+o0BFeKk4ZrLwrJJkIE8EgK/K7iM8eW5Oz9I3xvbIn3H9pbcBEEYUVzSI4eRwODzfE5ia6g1MTU0Qga7bWE0AVQZPtuZ5b9bo4S8DaCwrKXXMVhU52b9GhNzagmhbriHasWAZ/kxUPpTbYssL+//UYaOav1wq6XmeP3O685S2C1r/VD8B0aG/h4WJ6xvF8Gr1pI1H5s7ZdnYUgP8VISpA3b5RqSNNyu4j/Gzp4Pbvn5vTc8+qO9Men5mWPAhAsiAsDGW/GmzIfjXYKAI9HA5DCM/t5RXXT1XDlQCqDJ71ovNcLYWnU5KErFyf8c7ZgPblHyI0/+YW/y/NzlVyHQyikSFeMx0Ph/CUrnn+l52PJFMqHvZ/hlK6cenMzZosi+FVITA11bvik282t1t6+NbX94YeBVCD80lGSkv3eSJ+NwTgR/f29zzzpwldPgpk99v7xtgem1bdmfZ4YGrqLQB6AkgQBISFJYcaxPXT1nBdNz5hy6A+XhH6MTlJ+0CVwfMXzHkC8GT4MwXKsNVPnoU7EJp/M+rWzpMFTune0dOXDW7hLDP8mSh7KBdpL6xC2UO5tkneMOhzSuGZIzmSjCoMOSQyZKNJXjj71WDDjBkJCc8/3xgShMrnct/Bm2+M7fFEdh9hKs6HdZXW1GVrpBAhGgKQMObyujRASAOE0UAHnJvT8wyAwwCOByrC+06fC38JoKK0pKYqr7I2COCgIKAOWN8EcvGUw3AYng33p3o+fLc2JIKWAKoCnqsQseZJG8b1h+jpokJZm80P+HPQm/1Zko/vphe2KO3HINqUfena5xQJz7/bHZ5KgVJWUor+5R9SZIij8WrFisbGFSuA8NxeCcKSQwcmbTxy/4zrL31j6eD2TwL4f+KPNeB8iFepK/VIYMr6QAKADgCuBHBldh9hYPNL9++CP6FLGEAlgMpARbji9LnwZ6UlNbvyKmurBAFfAsGQCFNBEJqWQwig8uB5fzR4koyRksOw60rEQcG/CKcvK4Rv69P4bl1T4tGZiaOQMWxUMzyNHjw4nEyZBs+yL/bilpuv57I92bF8n1skLDnUGAaEDVNTE7Jf/ea9FZ/gvRnXXzpj6eD2swBcIf6Y2qPSEMXFhiO+mHtljrcHgB7ZfYQfA0KOCNa6PccT/vnFifq3c9+p/F9BwCciRGkNtA14eiXwfIXgaX3YKNrrnL5scHPykW/r09g7fhUuWpmHMxNHuf3+SuE5WYSnI9Y8KerjMIhKwrrhMIQVn3yzot3SwwNe3xuaD+CEBJ5Ka+vGeLvmBCSv+MXWOVmhh0bxvdj7Jd1wSeOwe/t7/ixum/m9ICC8ZVCfBAJobOfZEChYPYXgyc+A98lLa1pl6qYOG4X64h/w3fSZLQ4q1jvblueKUlHubyQ8840+kiwpqQO3k4v2Ngjf2uDkFcO1YkVjoyAgPDMt2QugJvedymfaLT3sF4swhETYCVCeaKQFrgLOJyg1AAhl9xF+88bYHn8eUVzRQACNDs/6QMHqyVmjh//NCfB0Sqe85xYP2pd/2AqiiYMuQOKgC8iZtIbnFAk8DXWevftczh2MAHuEb6X9k9pwU01dAMKWQX28AL6etPHIL9stPfyjQEV4OYDvdHakcsGaIAFqQ3YfYdaM6y+9nwAaHZ73Zo0e/rrV8KQ6ui11+rLBqB76FAC0gOgBfw7dnOjwXMtDwpCZbVi6d5E39xlrH2q0/cw06UZ4RHFFQ1gswgDg/yZtPPKrXxecuDFQEWZRwWagQfkh3lpdanjp4PYPE0DPw5OteU4V93kiWFRoqfPUq1M5aVbb8ettSJq8qMUh2+z62ur0WgcEng8dl8AzxBs8zW5/0vfiofYtSTOtwuJRaZ7A1FRvXmXtvkkbj+T+uuDEgEBF+DU0rZF6Rag1mgRSxoVrCKBoUZ7vvqzRw/8qPgghddgozfC009qG2U5B6ftJ1zQvWpnXAqJJkxdxP1Ew8P42p+kfPVZ9L0/wtBLYVPvWOZPuvMraUParwYaZacme8NxeCXmVtZ9O2nhkarulhzNf3xt6DEAFzicDsUQgo8O7lEQkSRialDV6+KvQMWxr5OHCRoDZ7E7DwmzRVLd2XnNRBemXNCTHICqnXq7VA4L0MGuD4Ok5eqz6vl59/X+jIgn2SR4iKQepsORQ48y0ZI8Y2q3Kfadycbulh/1ztp2dDmAPzicCCQa5UtbnalwNUDbQfPT+2z/JGj08HzZLGLICCnpBuy14Mkd5tt+Q5r+zYvDs/6QQtUNtW6XnZKqA58979fWvdlN5vrZ05ftPOj4K4eYcibzK2pAwcX1j+HyyUe2KT755ud3Sw7fM2XZ2bKAi/AHOF2Jg4V29ko5CAIRARbjQtQBl8Ny5/b2xt/z4hgKc30yrGzzlrM0ZBSC7TADaAgor51e3dl5zMXg1tXEdOuGRwvMXvfr61xi9VcUuqls7zxWF422wLm+4BDHZCE01dhMA1K/45Ju3Jm08cvuvC05c8/re0CMA9qJlFm3zlhQVQGVu9uzHe04+40qAsln6zu3v3X39tVevl0DTY1QjN6Khu6EDSSFKigrPe3v19f+VwrbnXRnPoVunJDaVlZTi8JGTXPUJSbH6hFM11UJeZW157juVf2q39PD1c7adnSxm71ZJYMqijQ0RQA3H6G8N4s8nvL43NDevsvbfrgOoZM3zZ9dfe/UGnN9TREUSOIW2HhB1ULhLmm17rxvXPNt6jrzv++Q5sUlJH8nwZ6Jnj4u57B/ZrwYbO6f4wixzF8APKz75Jn/SxiO57ZYevkaE6fOiM2UFGqRAFRC91J8XwNnX94Zyc9+pfCE8e7bHVbVwJVtVfiaueYa0Ok89T0ogtQ3RurXzECwqVLXmKfcZGZn4pSM8Ez751xf33TTwjr85Zc1Tj34ULCqEjxKHNE2OnaS8ytpQ3qtNB3oHpqZ6xqUkCcKSQydXfPJN/opPkA/AOzMt+cpMf8rIju2EAdl9hKvQdNxZe6DFeRY/ADgRqAj/fdLGI2sBfB6e28sjLFkWcg1AJVtV7hX3eYag85onyXiIJhn4+mwQV+JUjQJulNeVblXJvWngHatXvbysfecU31m3wTPWz/q2Pk2dhBTTlTI3OTMtOWH5RB+EJYca8ipry1BZWyZtRjPTktsD6CY6zjoAx/Mqa78FUAsAgampCcKSQ42AS05jkVQY+pmd4Mm5G3L0PVJzZJaenyPidaTO88GbBt7xijghPOuEZ6jHPatbOw/tbXCticFyQ9w3ST5M8yprG/KW1AKAMGNGgnDX//XyDJ9xfViYuL4RQHVeZS0AHI38xcDUVO+H79aGJDB2PkAl8Lwra/TwNTgfthWs7PzUafSDp54DuVoQGpgV3QxP0Xm+QglDrduBXc77jJYdTOOAdTBdsaIxvAIVIRRXQOJQBQBCaOwZeDZ2CANAXmVtOPvVYKsMd0cDdH/522zN886s0cNZtm0YFh/jJhee1LHMvz9aJkQGw/OBXn39BM8o4nXPp9WTZ4pgqXaoTclDKwAxahtTjgXo/vK3E9P7ZdUHClZPuKJHt/8C4CkrKQ1n+DMtzzymBk0QlwlPtuY5tVdf/2tUJKG1gkWF8LlgzyeJTzkSoBFHkr0u/neIB3haNeM1A94UljbEeTJ4kvOMIjsmDjXtBTWnn1B/NFaOA0oEPNeI/y048VqN7ERqQpJ6dFY6wo3gKVd2La5h1l5Qgic5UK3wpK0qGiFqRYF5gicSjh6rvp/Ctm23zf6055NEDpQveJIDIpBpceE6wvNVqm0b+5nwXnGoLUXbykIigPIAzxytztMO9WXNGtidAFEtEyITr18Kz19I4EnOM8ozCRYV2vqoMulWFrtM1slUOBSgEfBcCwvCtmY3LnKHjpoQRcKTCsPH0cX/etlR0Q2CEwHUanj+zCp4uk0U4tZ1IkXwVKhgUaHjjiqzw4SYJu0OA2iMwvCWwFOvxmUnMBFEo98PufelrKQ0XFZSyvZ5PijCkxKG4sgp9W7ZGi5PYKI+rVy2zMKNcJ6WwtNtkDDykHC7uwgFWcvhDH8mq2370E0D7/gLOc/4sku9WzMAR46QAKoVnj91Gjzt0CmMBqedizHIhSfOh22n3TTwjlUEz9btK9q9bO+gbStqMnHltC8t5fsIyg4HaAQ8/07O0z6Al9Ox1cLZRtBtAc9eff0ET5ltzGnu08h1XAKhic/RRvBka56TCJ72cZTSTh2vYzu840vhOZ3gqUztHVg0wYi+R/AkgMZyng0iPP/LTHjafa2vrc/P47U5NPQUCc+XnQ5PPbO17VqyL56aauKSCKDGw7M+Ap6AigpDbpTLXR+v8HR8tq2e+2/bO7Rkn1k1cXmcFBFAzYXnRAbPspJSoayk1KP0QartzAQYkk7wfEDiPKk8n8vdJw8TfjVjKI2HNgFoNHiC1jxNdaduGqwMGLCk8JzRq69/Je3zJPcpVaxMXLu4vG+rg65vn1xm4UaBZ5jBk+23M3Iw1QKWYFEhLnkiD6cz03Fh6i4AwPfBAc3fvzB1F74PDsBFK/McM0t2Aoh1voZI57mSEobUuU8n7/uMlYlrVn/S+j4/1FJz5g6gMeAJqfO0w4DdsXQ/gJSmv2O/5DspEf+2FvhOdbFK4K7kGoJFhUgdNkouPH9J8CT3yXP/1aILkhNd30a5CuFK4Dkhwnma9jnNaMzh22riDvxKOp9VIR+198qMZASj1msUwvMlgqc6BYsKXXGdVmfiaumHnXyp5EA5hecbEnjSmmcbkLDjDNaha69SeD5I8NQIFofUvI2npkzcUfTAyYHqAs/xEnjCCHjyvkCvFC6UCMQlPKm2LblPWeLhcG3ammJjgEbAc50Enh5qKCSbwpOybTW7MpcMwDVVlo5LtDXFxgCVlOe7RwJPw9Y8qaHQZMJAeD4kcZ60z1NG+4u2Fl5WUuqK5CESAVQP59kQBZ6Grnk6FaJqwl4EUU33MxKeL1LYVns/ZOdkuklU0o8AqgaeUufJpBs85cLBCestbO/pd9NnKhrAnDCZMCKjt6ykVEm2LYMnhW1VQFTaBt3qPt0UsiaA6gfPn0TAU7fPIjcz9bvpM3HJE3mqIcqDg2PwBJr2niqBqBMHYROiFJEVhhg8KWyrUW50n4D6RCKKILkMoJI1z59kjR5egPMhW4+erlAuPJuKHUA1RK12cFJ4Ns9mXQhRExUJzxdozVM/uXXtU+3ZoEoO2CbZHKD7y99ma54MnmxAahW2jRM+0+xOpfBk0uJEeYGnUyHKySAghefDEnhS2LaN5+ampRQe2zglTjoAoKdqqhPT+2XVBwpWZ0vgaboDLispRdoLq1rB02yICh+kGAZPJ0KUg0EgEp4raM1TX7l9HZC38DU5V04AKjrP+mcXPJGdNXr4eonjNH39tS14mg1RtQ1UDjz1gCid/RcVnnMl8KSwrY59warw7dl+Q+gBEDz5BOj+8rcT0/tl1S+YNmHcXXcMYmueYbXvq2VQjxa2tRKialyVEnhKIar2TEUK/yAMoFGE58xeff1Lac1TWfuR04ascl/VQ59C0uRFXNwrntZ/qbiCfBlWC1eSbTvuih7d1mf4Mz1a4Gn2gH7JE3kIPmPseqzR8ASA05npuEjFIEEdqNl5eo8eq57dq6//eVrzdBY8WN8+228IFwCz88ks5EANgmfW6OG6wFOrLlrZdEanYoga4ETbOo1Fd3g64NxRC+GZcPRY9axeff1/pjVP4yaGVmjv+FXn+8llg7m4F1RQgQAqhedYcc3TYySs7QhRJUlEBE/L4ZlHa57GyYrkobP9hrRwetW+NNfeCxJHAI2A55vi60fdquJmiMp1oARPS+DZGAFPWvM0SFYlDx3w57T4d4Y/k4tkonj3gpJ7HAzQNuDp4e2irYbo98EBroSn3CQwiwYK6ZrnryTwpLCtQbIieSjSffLYRwieLgOoBJ538w5PHiB6YeouV8JTz58zCJ4JIjyX05qn9Y7LCMXKuo10pW6aVJAsBKikPN/dWaOH/7cd4MmLE3ULPIHzqfFyZv8Z/kwzQSoN2z4qwpPCtpxMqPRU9dCn2mxzPO8J5XFrybfVQQKoDs6zwU7O0yiI6jEg8ApPM4sqMHjqOVi08dkZPNlWlecobOtMp3W235C4W9J4yMa1Uz3gTr5UAqhGeNYHClZnifBMUAJPnmL6ekBU64CvBZ6VD+U6qlFaBE/aqmKi+zQbFHJCtDzt+SY5GKAR8PxvpfCMN0gqaUB6uSMrw7lanafJIU8nwFiaMDRHAk8K25ogs/c7Kkkc4iGMS9tZHAxQyZqnanjqPRPUy7FYAVG9wrZGro/YvbRXxGeXJgzN6dXXv4zg6WxAKEkQojDueVNCk3KdASpZ87yrLXiaeeP1HtjNgCgrpFBWUkr7PM2VNGGIwZMShkwenM0ERDz3GQmK1GGjEErpxsV9UjoR531sdTVAJWHbu7JGDw/Ec552nr1ogaicqianM9MRLCrEVQ886jh4cjxzlYZt50qcJ615miizw7fx3Gc0SNSn9rP8PilNstJz/ZaKycuXrGLy7EiyQMHqMXLg6YSbf9HKPEUnuDCIdpAB3o6l+xW9rhnw1CvzldNnL00YmiueqkJhWwtkZvhW7tpn5M8kTV6E0PybLb1PdsrGJQfahr7a/JZXPAxbFjydJDVOVA0YnQJPTiWF568Jnu6RluIIPCQT0RqkzQG6v/ztxL4j7254fN7cMVf06BYQHasr4KkFonaCp1MiBjLhuYTWPA2CVcVBrpyV1pJ9PFQmoqpENgboqpeXJab3y6p/fN7cMRPvHh7I8GfaFp5aZ3JWQpQShnSFJ615GqS6ujNx+5qZ+xu1ApCHykQUxrUpQE/VVHtzp82uDxSsHv30/Lm2hqdegLUCogRPTfBkCUOPSOBJztNCmbn+qUdUhQcXSkUVbAZQNtAEClaPzho9fAMcELaNl8Yut7OZCVGCp2bnmSDC808ETxP62NX94/Y1M8O3eo0bVm9pkTvpoPVSDgAqZts2BApW3ykmDLlizVNJ4zMDogRPzfD0ioXh/0RrnvbrY1oV68QVNTp57TRL75vcSQdtO7FGXonzZFtV7hSdZyKv8JS6xu+mz9T0WleV7kf4thp898IArq5R63Up1ZmJo7ipBaoTPJ+jNU9+ZFZCzNl+Q5Ck4+ulDhuF0NanLb13dWvn6TopIOkMUEl5PsvgyWaoSvdt6bFtRPggBR2xn5uHYtRWmHgAdQg8H5PAk5yny3TAn4MMA6BsZUJPYrCcHiyn8kjK842y0nlS9Qv7iZN1l0h4LiZ48iczABRK6WbIGGJ1fVxPTRWtcfIKUNF5jswaPXwjOA7bkkgET5potSWjSvClDhtl+ZYW2hPKKUADBasniIXh2+kJT6rm73xZHDGQwnMewZNfmTX4G7ntxOo1yPblHyJYVKh4TKUx2GCAZo0evhDABQAa9HSeRoVkCcykKPD8I8HT3dJaeUiOqoc+Zek1dvx6m+JrpGUxgwF6oHLPEACfoSmhiAYgkp3gOZ/gyb/MWP80Y53S6qPOKJmIQ4Cm98uqei1/3UgApQRRkl3g+fb/vPubXn39z4jwbKRbw6fMqqQj5xhBPbTv9gXWDdaUTMQfQFe9vCwhd9rs4Gv56+6IhCiP4VLK1iV4vv0/7/4me8J/Ltpf/jZznmG6PXzKjPJ9emXfyhnrrK6RS8lEnAE0d9rsxq82v5WQO232N5EQNQJWegPZ6pNSDCHFbTXUMmPA8+ix6t9mT/jPRadqqr3p/bIoWkLSJftWybhkZY3c9uUfkgvlSF4A6Dvy7kbRiX4D4I77cia+D+Aa0Yl69Xoz9uD1PH+yrZJ3ZSWl8FVXAmgK8US+p/T7cqvwBIsKcckTxpbZqx76FFIXmlvYINUm8OzV1/8HWvPkV5F924z1z8jiCWrGFyU/n+HPRF2JdcUVepfkA/5FujwrpddOinCg7C+502Y3Q/S1/HW3A/gcOq+Jsgdl1gPL8GcidVhTibpY71ntS1NUws5oeLL3sPIUBo5muFJ4PknwtA9EzWpHkeFbBk+j39tqF6rneEzSAaBmQ5QHKQlRl5WUInyLea7QaohyBs/He/X1LyR42kNm9vFo4VszwG31Wmjd2nmmPyvaQtharcKzudNmN+4vfzshvV+WNJx7NXQO59opxFBWUoqrHnjU9Pe95Ik8BJ+B6UXeOZjkSOH5RK++/t8TPO0HTzMSXiLDt2a23aTJixCaf7OtXSg5Vh0dKFN6vyyWWHRMdKJfwKItLmaEY3iEp4udqBSeT/Xq63+WtqqQeBjUozmwveNXWXbt8cYFcosWARRokVhkCUTNXEfhFZ6xIKoklGJk2MWA1450ngsk8KStKjaT0S7JzBBqrHZuZSjXF+eYNXKMFgIUOB/OlUC0zCyIsvVJq/Z9GgnP05npirffSCGq5J4Yfe90fP3IhKFnJWFbgqfN5DT301YCpJV1cl2eJ8E3QIGmcO6pmmpLIGo353k6Mx3Hn5F3EPZFK/M0QdQiyJkBz6ckCUMUtiXFlNmZsG21d15dqFsnPNwAFAA6p/iYE61yOkS1wLOtPalSsQOzzYQo52oE4D11unYhhW2dITMSiCK3r1iZJZo0eZFldXL1yMi1OtfE0QBlTlRMLKo6VLzbkRA1A55Ay0pDBNGm7O5Tp2uf8XVNf5LgSZKjSFipXe7RE7pW1cnVq8g8rZkaCFDgfGJR35F3Vz296C+3A/i3GojqPdPR4/XMgmc0uRiiDJ4LfV3T59OaJ0mujDo8WyuArAjlemqqml0ouUiOAQqcTyxauHAhC+e2gGi8B8hDdm3k+1sJT5dCNCyB56II50lygIzOwNXr+DK9kxStCuWyGrlmhmIPHzlJAFXzS+n9stgWl6+jQVROmEDPRqvmtVgNXB7g6UKIMng+7eua/hsK25KUyqzjy6STbLnhXqtCuWae1EJOVwNApU40EqIZ/kzZELVSqcNGcQVPF0G0AUDiqdO1v/d1Tf8dwdN5MquUHq+yKpTbvvxDBIsKTbk3tF6qEaDMiYpbXBhE94pOtNEOnZwneEoHHTtDVDpTjxhIpWHbhb6u6Y8TPJ0pFt0xSlbWoJULDqtCuWacv8rUs8fFBFCtLyDZ4iKFaAI4zs7l0XlGdky7QlR6HRHXxLaq/F5c80wgeDpTZg7iZrlgNWulVoRy6bxQmwGUOVERokcjnGgDbx2BR3jGkhkQNaKzRRlspAlDzHmGCJ4kNZKTQMRDiNGqUK6Za6EEUJ0kCecyiJbrAVE9O4Kd4GkGRE2YqUrDtr+XJAzRVhWSapmdQKRFVoRy2VooyUYABZrCuRKI3iaBqOVronaEp9EQNbjOcHN5vlOna/8QseZJcrCM3sJitwSWk9dOM/099SrxRzIRoAyiEeHccli8JmpneJrhRA2G59O+rum/pYQhkh6K5uaMiKToWaEoddgoS0K5eh26TTIRoECLNdFKPcO5ahu53eGpBaIWicFzAW1VIempaBWI9HakSsHZ1s+zMeqAP8eSUK6ca6FwL2cAZRAVw7kMovv0hCiruiEXhnaHpxqIHn9mJlKHjTLbeTZI4PkUrXm6S07IANXzGEVp4RgrsnLlJBSZPEYQQOVKEs6tFNdEdYeo3tDhGZ5MlQ/lxr0ei+DZfKqKBJ605knSTUqOMDPrhJZ4oJVCtHroU6a7UD0cppUn3bgWoMyJRoRzdYGo0lmiHIjaAZ7s2tuCqAXwRAQ86VQVEjd9hSdZsR6qR0KRwQmHBNB4EBXDuUeMCOfKVVsQNROewgcpmmdzGf7MqNdjETwbCJ4kwPgqRGqOK5P+yYOSJi8y/T0pocjGAAVabHFhEN0PE7e4sBBENOcWD55tlKezfKCRQjQePA0YRKRrnnSeJ8nQKkRKk3Ckrok397R3/CpT348qFNkcoAyiYjj3iLgmuh8WbHGRQkeu89Q7hBHPJSqB9UUr86xe83yGnefZqTPBk2SM1J4BymPo0YoqRVe+/yQ1IjsDFGixJsqc6JcwIZwbORNl0JEbtmVA06Mzhm+r0f365MBT54GkFTw7p/gaBYHgSSLJkdlViqQHb8sd70icAZRBVAznHhad6JcAvGUlpY1GPrRIgMh1bFbMYDlftGdh22el8CTnSSIpk9lViuSGcilhSJ68Vr1x5xRf41eb30roO/Luw99WB28bPnTIBxn+zCvKSkob0RTW5UrUoKLC8wmCJ8ksHfDnIMNh15Q6bBTqvt5mePlDqa58/0nAv4HGPLs6UKa+I+9u/GrzWwm//u0fDu8sLbu9rKT0ywx/JtdHoRE8mwvDP3GqptrbieBJkigxWE43QaHMzsr11FRR9SEnAJRBdNXLyxJyp80+tLO07HYAX0HjmijF7g25Z1J4NheGFwieJJPkZEdkdlYuFZt3CEABIHfabLYmekhcE2UQbbSqo7kNwnHuWVR4kvMkRXM3Tpxcyh0P1I4bVlQpor2hDgEo0GKfqBSiCeDgKDS9JXyQYqePy+DZfCSZ+EwIniTTpHe2qhLQmZXQZ3aVItobql1enj4Mg2jnFN8hALfflzPxAwB92CDOkSOLK7bPtGPp/qjVjy6yHzzpSDKSZapP7ddiAGADP29hXa2f54A/B/1NTCjqvz4X8O+gBuYEgDKIrnp5mTd32uyDAG6TQJTL7Nxos0h8PKoFIK2ApQ57VgmeJC4lbdtq2zmv66kZ/kzUlQwxNSu3bu08S8oLOkEeHj9U7rTZDWI496AYzq2AQ8O5SgYNPc8plAnPRQRPEo+QcepG/7KSUiRNXkShXHKg2p2oGM6N6UR5DePYXAyef/R1Tf8NrXmSeNDpywYjyQYOUo/JASBWKZp/s2nv27skH/CTC3WEA42EaBQn6rp9okoTGVQOMFJ4zmP7PDun+AieJFnuyShV+9Jcdz/N3Nqi17mh5ED5dqIssag3gEax6AJJH4i2gieFbUkk9RMJrS7Z7PVQ39anAfOPQiQHaqITPSA60QNw+ZqozmLwXMzgCQrbkuw7GbT8s+r1ec1O7qG9oQ4EqJEQNSpsYaMkByk8H2NHklHYlkTiQ2aHcimhSL68dvqwknDuAZwP514ODVtc1J6hGS9MY5MZc2t4Unk+EskwqQnvmh3KlVtsnmQjByqFqLhPtEJ0ogdhcjhXOkPTY7bG3KrJMz8Gz+cYPAEQPEncycwzM+X2e7VSG941M5RLxeYdDFCgxT5R0yHqkPCGFJ6P7i9/2wuAwrYkLlWf2o87B2mFzKyVS8XmHQxQ5kStgGjk7FGPUC2blRoV9o3o9Ayef/J1TX/0VE2195LUWwieJJKK/m+mzK6VSwlFDgYog6gknHs7gENmQdSsAtM6d3opPB+hfZ4kkj3gyXTAn2Pae1FCkcMBCrQI534lOtG4EHVKo1B4Ha3gCVrzJOkoX3Wlae3e6D7MaxZ9hj/TVBfauySfGraTAcqcqBshqmBGzOC5xNc1/RFa8yTZSacvG+xYIKqRmQlFkS6UkoscCNAoEDUtnGsD1Uvg+ev95W/TmifJVopWxk/tCSxyIarXEo1RGfZm7g2VulA3llR0BUAZRMU10S/bgqienYNzNQBIZPA8VVOdQPAkmQk6I2Q0PI3o/2rHm1iOz8xQrtSF0sEdDgYo0LQmGgHRw0Y4UZvA03vqdO1SEZ5eACGCJ8mt0jvxT85raX3Ptgq9mJlQRGuh0eV14kWxxKLOKb4vh/Xsc1uvQTd+AKAndDyUW2mnMHkGJ4Xn3K82v0VrniRbg48U/b6YVaEoMVhON9wNDpSJhXP7jrzbUCdq1exXBjyX+bqmzz1VU+3tctNAgieJQOdAmeVCPTVVtKXFTQBlTlQM5+4XIXoEzk4sksJzzqma6gRyniQ7i5cyfjxPWsxaC6Uwbmt5nX6BknDufkk4twd0DOdyBs8/S+BJa54k01RWUor+Or9mfWo/0wYpqcOyk5s+4M9Bf5MKzZNc5ECZ2BaXviPv3n+oePdtTnKiYop8vQSeswmeJJJ6R8dDn+bRhbYnSLsToAyi4pool+FcDXvF6jP8mYkf7/iE4ElyPXzMhpdR76/0c5i1Fsq21QSLCnH4yEkCqJsuVrImuk+EaKVWiOqxSbqspFTt4NMgwnP5rbfdRfAkWS4zy8wZMQHgpca10s9glgvt+PU2AOrPUSaAOgCiYsWifWI4txJAQllJqWKI6jVbZZu8FXaaBgDe4o/3LL/1trt+RfAkOVFm7nXkCeJ2uFc9e1xMAHXjRUvCuc1ONMOfaWk4V2GnYWueeUPvyPrVqpeXUZEEkitEWymsdaG0H7SlvG69cEk4txzA7fflTHwfQBoUZOdaFOph5flW+bqmz6KtKiTeHKOeGaGRfazpxBfab2rW/W/luGqqmv/+bXWQHKibL14K0QOVe24HcBR8Z+eyrSp5vq7p0yhsS3KbzF57U+N4jSogL3fC8X1wADUUAqh5ED1VU52Q3i+rXFwT5RWiLGz7vMR5EjxJXEnPqIxe4UgrjzKz4n0rH8p13DURQDmWZE20XFwT5Q2i9WgK277g65o+k9Y8STyLt0xcLYk5ak9+0fq+Wq/XjGfwbZ3X9W2dACpxomI4d++h4t26QlTLjK2spLQBQOJn//fFCl/X9BmnaqoTxo+fQmueJMdLj4O0neDE1cht2csEUI4g2nfk3XtFJ/q1xU60IcOf6f14xycrbrzljocpbEtyE/jo8Gb14Wcza+S6WeTBo0BUrJ27F8Dw+3ImvgvgMmionatyNsrCtituve0ugifJNqr2pcHnABdndzdrdEZup6QGcqDUPFuL1c7NnTb7CzE7t5UTNTgxQbrmSfAkuWLAl4rck/Z7SS6UAGopRFe9vMyb3i/r39EgamCCQIMEnjMIniQ7yukDt10yUZMmL9L9NZv24pIIoHHE1kQlEK2CsWuibJ8nwZPkavGeBGOn8LLekxlamyaAqoKomJ1rFETZPs8XCZ4ktwOQ1j/5dqEkAqhiiPYdeXeZXCeqMMTD1jxf9HVNf4jgSbK7tABQrWOiDf7muFCa3BBAtThRvSHaQPAk0aB9Xmq2wag9R5MXGf259dxTyz5rJ18qAZS6uTqIivtE24SojJkaW/P8C8GT5DSpDeOqqXcrrf7jdCmttVtWUorUYaN0daF0oDYBVBNEc6fNLnstf92dsSAqoyOzNc+/+rqmP0jwJDlNGf5MhFK6meJa7Q5PIz87e+2kyYsUP49oz4dCuARQvSD6rwOVe+4AcAzKEovYmudffF3Tf0HwJDlV+25foMq1WlkA3g6wVbuNTunziJSdyysSQDmEaHq/LFZsQS5EGTxXkfMkuWGwl+sq9XA3WqEb7/ftDvYMfyaqhz6l+vfZFpbUYaOoEhEBVFeIynGiLGHoJTrPk+QWyd1GIV0zteokEzkQtXsIU+16aCilW4trpyQiAqguEP1q81ve9H5Zn4sQ/SYGRNma56u+rum/PFVT7SF4ktyiveNXGe4+9YBbPHA7Zf0vafIixRA9ee00asgEUP3Vd+TdzIl+LoZzIyHKwrYrfV3T7xedZ5jgSXKLMvyZMSF6tt8Q2uxvA4iqyY52uug0Fh2dKIPo/vK37+iddsP7AFIBnAPQTsy2fYDCtiSHKhzx1RwKbbHFxL8DwaJCdPx6G4CmsC1ldVoL0bq189A+zqkte8evQsb55yz9kwBK0h2ipfvL376td9oNhQDSqEgCyenq3DE5EYAgHVNigbHJyTS5mQy6dVxAtKykFL1L8pEYLIenpqr5e6GUbth3+wLpsxTEPxMkfyeAkvSD6Feb3/L2bXKiE1M6XXW/CE+B4Elyqk6drq3q3DH5CIAQDFgainSzvKispBTlpaea/z0uZ5Dq19qQX4yB3b43PVTKriFDBKmvurKtCEFYBGe46tDRere3+/8PGYHyttOOtEIAAAAASUVORK5CYII=", alt: "ClonKR", style: { height: 36, width: "auto", display: "block" } })),
            React.createElement(SectionSwitcher, { view: view, setView: setView, clearAccSel: () => { setSelAcc(null); setAccStatusFilter(null); } }),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                React.createElement("div", { style: { position: "relative" } },
                    React.createElement("button", { onClick: () => { setNotifOpen(o => !o); }, style: { background: notifOpen ? "#162240" : "transparent", border: "none", color: notifs.length > 0 ? "#f6d860" : "#4a6080", cursor: "pointer", padding: "5px 8px", borderRadius: 8, fontSize: 18, lineHeight: 1, display: "flex", alignItems: "center", gap: 4, position: "relative" } },
                        "\uD83D\uDD14",
                        notifs.length > 0 && React.createElement("span", { style: { position: "absolute", top: 1, right: 1, background: "#e0392e", color: "#fff", borderRadius: "50%", fontSize: 9, fontWeight: 700, minWidth: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 } }, notifs.length)),
                    notifOpen && React.createElement(React.Fragment, null,
                        React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 299 }, onClick: () => setNotifOpen(false) }),
                        React.createElement(NotificationPanel, { notifs: notifs, perm: pushPerm, accounts: data.accounts, allIns: allIns, onDismiss: dismissNotif, onDismissAll: () => { dismissAll(); setNotifOpen(false); }, onNavigate: n => { setView(n.view); if (n.accountId && n.view === "accounts")
                                setSelAcc(n.accountId); setNotifOpen(false); }, onRequestPush: requestPushPermission, onRequestUtilization: acc => { setUtilModal(acc); setNotifOpen(false); } }))),
                React.createElement("span", { style: c.sync(syncOk), title: syncMsg }, syncOk === null ? "..." : syncMsg),
                React.createElement("button", { title: "Download all data as a JSON backup file", onClick: exportAllData, style: { background: "none", border: "1px solid #dde8f0", borderRadius: 6, padding: "3px 8px", fontSize: 10, color: "#4a6080", cursor: "pointer" } }, "\u2B07 Export Data"),
                React.createElement("button", { title: "Restore data from a JSON backup file (replaces everything)", onClick: () => importFileRef.current?.click(), style: { background: "none", border: "1px solid #dde8f0", borderRadius: 6, padding: "3px 8px", fontSize: 10, color: "#4a6080", cursor: "pointer" } }, "\u2B06 Import Data"),
                React.createElement("input", { ref: importFileRef, type: "file", accept: ".json", style: { display: "none" }, onChange: e => { const f = e.target.files[0]; if (f)
                        importAllData(f); e.target.value = ""; } }),
                React.createElement("span", { style: { fontSize: 12, color: "#4a6080", fontWeight: 600 } }, new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })))),
        React.createElement("div", { style: c.main },
            React.createElement("div", { style: c.sRow }, [{ l: "Accounts", v: data.accounts.length, col: "#a78bfa", action: () => { setView("accounts"); setAccStatusFilter(null); setSelAcc(data.accounts[0]?.id || null); } }, { l: "Open Tasks", v: totalOpen, col: "#60a5fa", action: () => setView("tasks") }, { l: "Renewals 90d", v: ren.length, col: "#d4880a", action: () => setView("renewals") }, { l: "At Risk", v: atRisk, col: "#e0392e", action: () => { const first = data.accounts.find(a => a.status === "risk"); setView("accounts"); setAccStatusFilter("risk"); setSelAcc(first?.id || null); } }].map(({ l, v, col, action }) => React.createElement("div", { key: l, onClick: action, style: { ...c.sc(col), cursor: "pointer", transition: "all .15s", userSelect: "none" }, onMouseEnter: e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${col}33`; e.currentTarget.style.borderColor = col; }, onMouseLeave: e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = `${col}44`; } },
                React.createElement("div", { style: c.sn(col) }, v),
                React.createElement("div", { style: c.sl }, l.toUpperCase())))),
            view === "overview" && React.createElement("div", null,
                pushPerm !== "granted" && pushPerm !== "unsupported" && React.createElement("div", { style: { background: "linear-gradient(135deg,#0a1628,#162240)", border: "1px solid #223560", borderRadius: 14, padding: "14px 18px", marginBottom: 14, display: "flex", alignItems: "center", gap: 14 } },
                    React.createElement("span", { style: { fontSize: 28, flexShrink: 0 } }, "\uD83D\uDD14"),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontFamily: "'Clash Display',sans-serif", fontSize: 14, fontWeight: 700, color: "#5dd8c8", marginBottom: 3 } }, "Enable ClonKR Notifications"),
                        React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", lineHeight: 1.5 } }, pushPerm === "denied" ? "Notifications are blocked in your browser. Click the lock icon in the address bar → Notifications → Allow, then refresh." : "Get real-time ClonKR alerts for overdue tasks, upcoming renewals and payments.")),
                    pushPerm !== "denied" && React.createElement("button", { onClick: requestPushPermission, style: { background: "#5dd8c8", border: "none", color: "#0a1628", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" } }, "Enable Now")),
                notifs.filter(n => n.priority === "high").length > 0 && React.createElement("div", { style: { background: "#fff0ef", border: "1.5px solid #e0392e44", borderRadius: 14, padding: "10px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } },
                    React.createElement("span", { style: { fontSize: 16 } }, React.createElement(Ic, { name: "siren" })),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#e0392e", fontFamily: "'Clash Display',sans-serif" } },
                            "Urgent \u2014 ",
                            notifs.filter(n => n.priority === "high").length,
                            " alert",
                            notifs.filter(n => n.priority === "high").length > 1 ? "s" : "",
                            " need your attention"),
                        React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" } }, notifs.filter(n => n.priority === "high").map(n => React.createElement("span", { key: n.id, style: { fontSize: 11, color: "#e0392e", background: "#fff0ef", border: "1px solid #e0392e33", borderRadius: 20, padding: "1px 9px", fontWeight: 600 } },
                            n.icon,
                            " ",
                            n.account)))),
                    React.createElement("button", { onClick: () => setNotifOpen(true), style: { background: "#e0392e", color: "#fff", border: "none", borderRadius: 9, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } }, "View All")),
                ren.length > 0 && React.createElement("div", { style: { background: "#fffbeb", border: "1.5px solid #f6d860", borderRadius: 14, padding: "12px 18px", marginBottom: 14 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }, onClick: () => setShowRen(r => !r) },
                        React.createElement("span", { style: { fontSize: 13, color: "#92680a", fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } },
                            "Renewals within 90 days (",
                            ren.length,
                            ")"),
                        React.createElement("span", { style: { fontSize: 12, color: "#b08030", fontWeight: 600 } }, showRen ? "Hide" : "Show")),
                    showRen && React.createElement("div", { style: { marginTop: 12, display: "flex", flexDirection: "column", gap: 10 } }, ren.map(a => {
                        const diff = Math.ceil((new Date(a.renewalDate) - new Date()) / 86400000);
                        const col = diff <= 30 ? "#e0392e" : diff <= 60 ? "#d4880a" : "#7a6500", bg = diff <= 30 ? "#fff0ef" : diff <= 60 ? "#fff8e6" : "#fefce8";
                        return React.createElement("div", { key: a.id, style: { background: bg, border: `1px solid ${col}33`, borderRadius: 12, padding: "12px 14px" } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 } },
                                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }, onClick: () => { setSelAcc(a.id); setView("accounts"); } },
                                    React.createElement(AccAva, { a: a, size: 28 }),
                                    React.createElement("div", null,
                                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, a.name),
                                        React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5" } },
                                            "Renews ",
                                            fmtShort(a.renewalDate)))),
                                React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
                                    React.createElement("span", { style: { fontSize: 14, fontWeight: 700, color: col, fontFamily: "'Clash Display',sans-serif" } },
                                        diff,
                                        "d"),
                                    React.createElement("button", { style: { ...c.tAct("#0fa890", "#e8faf8"), fontSize: 11, padding: "4px 12px" }, onClick: () => setSecureAnimModal(a) }, "Secured"))),
                            (a.renewalUpdates || []).length > 0 && React.createElement("div", { style: { background: "rgba(255,255,255,0.6)", borderRadius: 8, padding: "6px 10px", marginBottom: 7 } }, (a.renewalUpdates || []).slice(-2).map(u => React.createElement("div", { key: u.id, style: { display: "flex", gap: 8, padding: "2px 0", fontSize: 11 } },
                                React.createElement("span", { style: { color: "#b08030", fontWeight: 600, whiteSpace: "nowrap" } }, new Date(u.ts).toLocaleDateString("en-GB", { day: "numeric", month: "short" })),
                                React.createElement("span", { style: { color: "#5a4010" } }, u.text)))),
                            React.createElement("div", { style: { display: "flex", gap: 8 } },
                                React.createElement("input", { style: { ...c.ti, fontSize: 12 }, placeholder: "Add renewal update...", value: renInput[a.id] || "", onChange: e => setRenInput(r => ({ ...r, [a.id]: e.target.value })), onKeyDown: e => e.key === "Enter" && addRenUpdate(a.id) }),
                                React.createElement("button", { style: { ...c.sv, padding: "6px 14px", fontSize: 12 }, onClick: () => addRenUpdate(a.id) }, "Add")));
                    }))),
                React.createElement("div", { style: c.card },
                    React.createElement("div", { style: c.cHdr },
                        React.createElement("span", { style: { ...c.cTitle, color: "#0fa890" } }, "Weekly Calendar"),
                        React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } },
                            React.createElement("button", { style: c.aBtn, onClick: () => setDayModal(calDay) }, "+ Add Task"),
                            React.createElement("button", { style: { ...c.aBtn, background: "#f5e8fe", borderColor: "#9333ea33", color: "#9333ea" }, onClick: () => setNewMeetingModal(true) }, "+ Add Meeting"),
                            googleConnected && React.createElement("span", { style: { fontSize: 9, fontWeight: 800, color: "#6f767d", background: "#f1f3f5", padding: "5px 8px", borderRadius: 8, border: "1px solid #d9dde2" } }, "\u25CF Google"),
                            React.createElement("button", { title: "Google Calendar setup", onClick: () => setShowGoogleSetup(true), style: { width: 32, height: 32, borderRadius: 9, border: "1px solid #d9dde2", background: "#fff", color: "#68707a", fontSize: 18, lineHeight: 1, cursor: "pointer" } }, "\u22EF"),
                            React.createElement(WNav, { off: calOff, set: setCalOff, label: calLabel }))),
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "54px repeat(7,1fr)", borderBottom: "1px solid #edf2f7" } },
                        React.createElement("div", { style: { borderRight: "1px solid #edf2f7" } }),
                        days.map((dy, i) => { const [yr, mo, dd] = dy.split("-").map(Number), dow = new Date(yr, mo - 1, dd).getDay(), it = dy === today, is = dy === calDay, oc = data.accounts.flatMap(a => a.tasks[dy] || []).filter(t => !t.done && !t.ended).length; return React.createElement("div", { key: dy, onClick: () => setCalDay(dy), onDoubleClick: () => setDayModal(dy), title: "Double-click to open this day", style: { padding: "8px 6px", textAlign: "center", cursor: "pointer", background: is ? "#e8faf8" : it ? "#f0fdf8" : "#fff", borderRight: i < 6 ? "1px solid #edf2f7" : "none" } },
                            React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: it ? "#0fa890" : "#7a9ab5", textTransform: "uppercase", letterSpacing: .8 } }, DN[dow]),
                            React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color: is ? "#0fa890" : it ? "#0a1628" : "#c0cdd8", fontFamily: "'Clash Display',sans-serif" } }, dd),
                            oc > 0 && React.createElement("div", { style: { fontSize: 9, color: "#0fa890", fontWeight: 700 } }, oc)); })),
                    React.createElement("div", { style: { overflowY: "auto", maxHeight: 340 } },
                        HRS.map(hr => React.createElement("div", { key: hr, style: { display: "grid", gridTemplateColumns: "54px repeat(7,1fr)", borderBottom: "1px solid #f0f4f8", minHeight: 44 } },
                            React.createElement("div", { style: { padding: "5px 8px 0 0", borderRight: "1px solid #edf2f7", fontSize: 10, color: "#7a9ab5", fontWeight: 600, textAlign: "right" } }, fhr(hr)),
                            days.map((dy, i) => {
                                const ts = hourTasks(dy, hr), ms = (data.meetings || []).filter(m => m.date === dy && m.time && parseInt(m.time.split(":")[0]) === hr), inow = dy === today && nowH === hr, is = dy === calDay;
                                return React.createElement("div", { key: dy, onClick: () => setCalDay(dy), onDoubleClick: () => setDayModal(dy), style: { padding: "2px 3px", borderRight: i < 6 ? "1px solid #f0f4f8" : "none", background: inow ? "#f0fdf8" : is ? "#fafffe" : "#fff", cursor: "pointer", position: "relative" } },
                                    inow && React.createElement("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#0fa890", opacity: .6 } }),
                                    ts.map(t => React.createElement("div", { key: t.id, className: "pill", style: { background: "#e8f0fe", color: "#4285f4", borderLeft: "2px solid #4285f4" } },
                                        t.time + " ",
                                        t.text.length > 9 ? t.text.slice(0, 9) + "..." : t.text,
                                        React.createElement("span", { className: "tt" },
                                            t.time && React.createElement("strong", null,
                                                t.time,
                                                " "),
                                            t.text,
                                            React.createElement("br", null),
                                            React.createElement("span", { style: { opacity: .6, fontSize: 10 } }, t.accName)))),
                                    (googleEventsByDay[dy] || []).filter(ev => ev.clonkrStartHour === hr).map(ev => React.createElement("a", { key: `g_${dy}_${ev.id}`, href: ev.htmlLink || "#", target: "_blank", rel: "noopener noreferrer", className: "pill", style: { display: "block", textDecoration: "none", background: "#f1f3f5", color: "#68707a", borderLeft: "2px solid #8c939b" } },
                                        React.createElement("strong", null,
                                            ev.clonkrStartTime,
                                            ev.clonkrEndTime ? `–${ev.clonkrEndTime}` : ""),
                                        " ",
                                        ev.summary || "Google event")),
                                    ms.map(m => React.createElement("div", { key: m.id, onClick: e => { e.stopPropagation(); setMeetingModal(m); }, className: "pill", style: { background: "#f5e8fe", color: "#9333ea", borderLeft: "2px solid #9333ea" } },
                                        React.createElement(Ic, { name: "calendar" }),
                                        " ",
                                        m.name.length > 9 ? m.name.slice(0, 9) + "..." : m.name,
                                        React.createElement("span", { className: "tt" },
                                            React.createElement("strong", null,
                                                m.time,
                                                " "),
                                            m.name,
                                            React.createElement("br", null),
                                            React.createElement("span", { style: { opacity: .6, fontSize: 10 } }, "Meeting")))));
                            }))),
                        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "54px repeat(7,1fr)", background: "#fafcfe", borderTop: "1px solid #edf2f7" } },
                            React.createElement("div", { style: { padding: "4px 8px 4px 0", borderRight: "1px solid #edf2f7", fontSize: 9, color: "#7a9ab5", fontWeight: 700, textAlign: "right", textTransform: "uppercase" } },
                                "No",
                                React.createElement("br", null),
                                "time"),
                            days.map((dy, i) => {
                                const ts = untimedTasks(dy), ms = (data.meetings || []).filter(m => m.date === dy && !m.time);
                                return React.createElement("div", { key: dy, onClick: () => setCalDay(dy), onDoubleClick: () => setDayModal(dy), style: { padding: "2px 3px", borderRight: i < 6 ? "1px solid #f0f4f8" : "none", cursor: "pointer", background: dy === calDay ? "#fafffe" : "#fff" } },
                                    ts.slice(0, 2).map(t => React.createElement("div", { key: t.id, className: "pill", style: { background: "#fff8e6", color: "#92680a", borderLeft: "2px solid #d4880a" } },
                                        t.text.length > 9 ? t.text.slice(0, 9) + "..." : t.text,
                                        React.createElement("span", { className: "tt" },
                                            t.text,
                                            React.createElement("br", null),
                                            React.createElement("span", { style: { opacity: .6, fontSize: 10 } }, t.accName)))),
                                    ms.slice(0, 2).map(m => React.createElement("div", { key: m.id, onClick: e => { e.stopPropagation(); setMeetingModal(m); }, className: "pill", style: { background: "#f5e8fe", color: "#9333ea", borderLeft: "2px solid #9333ea" } },
                                        React.createElement(Ic, { name: "calendar" }),
                                        " ",
                                        m.name.length > 9 ? m.name.slice(0, 9) + "..." : m.name,
                                        React.createElement("span", { className: "tt" },
                                            m.name,
                                            React.createElement("br", null),
                                            React.createElement("span", { style: { opacity: .6, fontSize: 10 } }, "Meeting")))),
                                    (googleEventsByDay[dy] || []).filter(ev => ev.clonkrAllDay).slice(0, 2).map(ev => React.createElement("a", { key: `ga_${dy}_${ev.id}`, href: ev.htmlLink || "#", target: "_blank", rel: "noopener noreferrer", className: "pill", style: { display: "block", textDecoration: "none", background: "#f1f3f5", color: "#68707a", borderLeft: "2px solid #8c939b" } },
                                        "G \u00B7 ",
                                        (ev.summary || "Google event").slice(0, 12),
                                        (ev.summary || "").length > 12 ? "…" : "")),
                                    ts.length > 2 && React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", fontWeight: 600 } },
                                        "+",
                                        ts.length - 2));
                            })))),
                googleConnected && React.createElement("div", { style: c.card },
                    React.createElement("div", { style: c.cHdr },
                        React.createElement("span", { style: { ...c.cTitle, color: "#68707a" } },
                            "Google Calendar \u00B7 ",
                            fmtD(calDay)),
                        React.createElement("span", { style: { fontSize: 11, color: "#8a9298", fontWeight: 700 } },
                            (googleEventsByDay[calDay] || []).length,
                            " event",
                            (googleEventsByDay[calDay] || []).length !== 1 ? "s" : "")),
                    React.createElement("div", { style: { padding: "8px 16px 14px" } }, (googleEventsByDay[calDay] || []).length === 0 ? React.createElement("div", { style: { padding: "1rem", textAlign: "center", color: "#a0a8ad", fontSize: 12 } }, "No Google events on this day.") : (googleEventsByDay[calDay] || []).slice().sort((a, b) => (a.clonkrStartTime || "99:99").localeCompare(b.clonkrStartTime || "99:99")).map(ev => React.createElement("a", { key: ev.id, href: ev.htmlLink || "#", target: "_blank", rel: "noopener noreferrer", style: { display: "flex", alignItems: "center", gap: 9, padding: "7px 9px", borderRadius: 8, background: "#f6f7f8", border: "1px solid #dfe3e6", marginBottom: 5, textDecoration: "none", color: "#4f5962" } },
                        React.createElement("span", { style: { fontSize: 10, fontWeight: 800, minWidth: 50, color: "#68707a" } }, ev.clonkrAllDay ? "ALL DAY" : ev.clonkrStartTime),
                        React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "linear-gradient(145deg,#f6f7f8,#8f969c)" } }),
                        React.createElement("span", { style: { fontSize: 11, fontWeight: 700, flex: 1 } }, ev.summary || "Untitled event"),
                        React.createElement("span", { style: { fontSize: 10, color: "#9aa1a7" } }, "\u2197"))))),
                React.createElement("div", { style: c.card },
                    React.createElement("div", { style: c.cHdr },
                        React.createElement("span", { style: c.cTitle }, fmtD(calDay)),
                        React.createElement("span", { style: { fontSize: 12, color: "#7a9ab5", fontWeight: 600 } },
                            selDayTasks.length,
                            " task",
                            selDayTasks.length !== 1 ? "s" : "")),
                    React.createElement("div", { style: { padding: "8px 16px 14px" } }, selDayTasks.length === 0 ? React.createElement("div", { style: { padding: "1.5rem", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, "No tasks on this day.") : [...selDayTasks].sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99")).map(t => React.createElement(TaskRow, { key: t.id, t: t, dy: calDay, aid: t.accId, aName: t.accName, showAcc: true })))),
                React.createElement("div", { style: c.card },
                    React.createElement("div", { style: c.cHdr },
                        React.createElement("span", { style: { ...c.cTitle, color: "#0fa890" } }, "Account Health")),
                    React.createElement("div", { style: { padding: "0 16px 8px" } }, data.accounts.length === 0 ? React.createElement("div", { style: { padding: "1.5rem", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, "No accounts yet.") : data.accounts.map(a => {
                        const op = Object.values(a.tasks || {}).flat().filter(t => !t.done && !t.ended).length;
                        const diff = a.renewalDate ? Math.ceil((new Date(a.renewalDate) - new Date()) / 86400000) : null;
                        const total = (a.payment?.medicalTotal || 0) + (a.payment?.lifeTotal || 0);
                        const hs = hscore(a);
                        return React.createElement("div", { key: a.id, onClick: () => { setSelAcc(a.id); setView("accounts"); }, style: { padding: "10px 0", borderBottom: "1px solid #f0f4f8", cursor: "pointer" } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                                React.createElement(AccAva, { a: a }),
                                React.createElement("div", { style: { flex: 1 } },
                                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, a.name),
                                    React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5" } },
                                        a.poc?.name || "",
                                        adherentsTotal(a) ? " - " + adherentsTotal(a) + " adherents" : "",
                                        total > 0 ? " - " + fmtCurrency(total) : "")),
                                React.createElement("div", { style: { textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 } },
                                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                                        React.createElement(HealthScore, { score: hs }),
                                        React.createElement("span", { style: c.bdg(a.status) }, SC[a.status]?.label)),
                                    React.createElement("span", { style: { fontSize: 11, color: "#7a9ab5" } },
                                        op > 0 ? `${op} open` : "",
                                        diff !== null && diff >= 0 && diff <= 90 ? ` - ${diff}d` : ""))),
                            React.createElement(InsTags, { a: a }));
                    })))),
            view === "calendar" && googleCalendarError && React.createElement("div", { style: { marginBottom: 10, padding: "8px 11px", background: "#fff7ed", border: "1px solid #f59e0b55", color: "#92400e", borderRadius: 9, fontSize: 11, fontWeight: 600 } },
                "Google Calendar: ",
                googleCalendarError),
            view === "calendar" && React.createElement(CalendarView, { accounts: nonTerminatedAccounts, calDay: calDay, setCalDay: setCalDay, onAddTask: day => { setCalTask({ text: "", time: "", accId: nonTerminatedAccounts[0]?.id?.toString() || "" }); setShowCalAdd(true); }, googleEvents: googleEventsByDay, googleConnected: googleConnected, onGoogleConnect: connectGoogleCalendar, onGoogleSetup: () => setShowGoogleSetup(true), googleBusy: googleCalendarBusy, onGoogleRefresh: refreshGoogleCalendar, onGoogleDisconnect: disconnectGoogleCalendar }),
            view === "renewals" && React.createElement(RenewalsView, { accounts: data.accounts, allIns: allIns, onSelectAcc: id => { setSelAcc(id); setView("accounts"); }, onSecure: quickSecure, onTerminate: terminateAccount }),
            view === "checklist" && React.createElement(ChecklistView, { accounts: nonTerminatedAccounts, checklists: data.checklists || {}, selAccId: selAcc, onSelectAcc: id => setSelAcc(id), onUpdateTask: updateChecklistTask, onToggleOnboarding: toggleOnboardingTask, onSaveNote: saveQuickNote }),
            view === "payments" && React.createElement(PaymentsView, { accounts: data.accounts, onSelectAcc: id => { setSelAcc(id); setView("accounts"); }, onMarkPaid: markCyclePaid, allIns: allIns }),
            view === "tasks" && React.createElement(TasksView, { accounts: data.accounts, onSelectAcc: id => { setSelAcc(id); setView("accounts"); }, onEndTask: t => endTask(t.id, t.day, t.accId), onUpdateTask: t => setTaskAct({ mode: "update", task: t, accId: t.accId, dayK: t.day }) }),
            view === "accounts" && React.createElement("div", { style: c.grid },
                React.createElement("div", { style: c.sidebar },
                    React.createElement("div", { style: c.sbHdr },
                        React.createElement("span", { style: c.sbTit }, "Accounts"),
                        React.createElement("button", { style: c.aBtn, onClick: () => { setForm(flatA(eAcc())); setShowAdd(true); } }, "+ Add")),
                    accStatusFilter && React.createElement("div", { style: { margin: "0 10px 6px", background: "#fff0ef", border: "1px solid #e0392e44", borderRadius: 9, padding: "7px 11px", display: "flex", alignItems: "center", justifyContent: "space-between" } },
                        React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#e0392e" } },
                            React.createElement(Ic, { name: "warning" }),
                            " Showing: At Risk (",
                            fAccs.length,
                            ")"),
                        React.createElement("button", { onClick: () => setAccStatusFilter(null), style: { background: "none", border: "none", color: "#c0cdd8", cursor: "pointer", fontSize: 15, lineHeight: 1, padding: 0 } }, "\u00D7")),
                    React.createElement("div", { style: { padding: "8px 10px" } },
                        React.createElement("input", { style: c.srch, placeholder: "Search...", value: search, onChange: e => setSearch(e.target.value) })),
                    fAccs.length === 0 && React.createElement("div", { style: { padding: "1rem", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, search || accStatusFilter ? "No results." : "No accounts yet."),
                    fAccs.map(a => {
                        const hs = hscore(a);
                        const isTerm = a.renewalStatus === "terminated";
                        return React.createElement("div", { key: a.id, style: { ...c.aiRow(selAcc === a.id), background: isTerm ? selAcc === a.id ? "#7a0d0d" : "#fde2e1" : c.aiRow(selAcc === a.id).background }, onClick: () => setSelAcc(a.id) },
                            React.createElement("div", { style: { width: 7, height: 7, borderRadius: "50%", background: isTerm ? "#7a0d0d" : SC[a.status]?.text, flexShrink: 0 } }),
                            React.createElement(AccAva, { a: a }),
                            React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'Clash Display',sans-serif", color: isTerm ? selAcc === a.id ? "#fff" : "#7a0d0d" : "inherit" } },
                                    a.name,
                                    isTerm && React.createElement("span", { style: { fontSize: 9, marginLeft: 5, background: "#7a0d0d", color: "#fff", borderRadius: 20, padding: "1px 6px", fontWeight: 700 } }, "TERMINATED")),
                                React.createElement("div", { style: { fontSize: 11, color: isTerm ? selAcc === a.id ? "#ffb3b0" : "#a04444" : "#7a9ab5" } }, a.industry || "")),
                            !isTerm && React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: hscColor(hs) } }, hs));
                    })),
                !acc ? React.createElement("div", { style: { ...c.panel, padding: "3rem", textAlign: "center", color: "#c0cdd8" } }, "Select an account.") : (() => {
                    const hs = hscore(acc);
                    const carrier = acc.carrierId ? insById[acc.carrierId] : null;
                    const tpa = acc.tpaIsCarrier ? carrier : acc.tpaId ? insById[acc.tpaId] : null;
                    const hmo = acc.hmoId ? insById[acc.hmoId] : null;
                    const diff = acc.renewalDate ? Math.max(0, Math.ceil((new Date(acc.renewalDate) - new Date()) / 86400000)) : null;
                    const isTerminated = acc.renewalStatus === "terminated";
                    return React.createElement("div", { style: c.panel },
                        isTerminated && React.createElement("div", { style: { background: "#5a0a0a", color: "#fff", padding: "8px 18px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 } },
                            React.createElement("span", null, React.createElement(Ic, { name: "block" })),
                            React.createElement("span", null, "This account is TERMINATED \u2014 excluded from Renewals and cannot have new tasks assigned")),
                        React.createElement("div", { style: { ...c.pH, background: isTerminated ? "#fde2e1" : c.pH.background } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
                                React.createElement(AccAva, { a: acc, size: 42 }),
                                React.createElement("div", null,
                                    React.createElement("div", { style: { fontSize: 15, fontWeight: 700, fontFamily: "'Clash Display',sans-serif", color: isTerminated ? "#7a0d0d" : "inherit" } },
                                        acc.name,
                                        isTerminated && React.createElement("span", { style: { fontSize: 10, marginLeft: 8, background: "#7a0d0d", color: "#fff", borderRadius: 20, padding: "2px 9px", fontWeight: 700 } }, "TERMINATED")),
                                    React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", display: "flex", gap: 7, alignItems: "center" } },
                                        React.createElement("span", null, acc.industry),
                                        React.createElement(HealthScore, { score: hs }),
                                        React.createElement("span", { style: { fontSize: 11, color: hscColor(hs), fontWeight: 700 } },
                                            hs,
                                            "/100")))),
                            React.createElement("div", { style: { display: "flex", gap: 8 } },
                                React.createElement("button", { style: { ...c.aBtn, background: "#e8f0fe", color: "#4285f4", borderColor: "#4285f444" }, onClick: () => { setIsNewAccFlow(false); setWelcomeModal(acc); } },
                                    React.createElement(Ic, { name: "envelope" }),
                                    " Welcome"),
                                React.createElement("button", { style: c.aBtn, onClick: () => { setForm(flatA(acc)); setShowEdit(true); } }, "Edit"),
                                React.createElement("button", { style: { ...c.aBtn, color: "#e0392e", borderColor: "#e0392e44", background: "#fff0ef" }, onClick: () => delAcc(acc.id) }, "Delete"))),
                        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, padding: "14px 18px" } }, [["Adherents", adherentsTotal(acc).toLocaleString()], ["Status", null], ["Renewal", acc.renewalDate ? fmtShort(acc.renewalDate) : "—"], ["Days left", diff !== null ? diff + "d" : "—"]].map(([l, v]) => React.createElement("div", { key: l, style: c.ic },
                            React.createElement("div", { style: c.iL }, l),
                            l === "Status" ? React.createElement("div", { style: { marginTop: 4 } },
                                React.createElement("span", { style: c.bdg(acc.status) }, SC[acc.status]?.label)) : React.createElement("div", { style: c.iV }, v)))),
                        (carrier || tpa || hmo || acc.policyNumber) && React.createElement("div", { style: { margin: "0 18px 14px", background: "#f0f6ff", border: "1px solid #c7dcff", borderRadius: 12, padding: 14 } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 } },
                                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#4285f4", textTransform: "uppercase", letterSpacing: .8 } }, "Insurance Setup"),
                                carrier && React.createElement("button", { onClick: () => setUtilModal(acc), style: { background: "#fff8e6", border: "1px solid #d4880a44", color: "#d4880a", borderRadius: 8, padding: "4px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer" } },
                                    React.createElement(Ic, { name: "chart" }),
                                    " Request Utilization")),
                            React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 } },
                                carrier && React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #c7dcff", borderRadius: 10, padding: "8px 12px" } },
                                    React.createElement(InsLogo, { ins: carrier }),
                                    React.createElement("div", null,
                                        React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#4285f4", textTransform: "uppercase" } }, "Risk Carrier"),
                                        React.createElement("div", { style: { fontSize: 12, fontWeight: 700 } }, carrier.name),
                                        carrier.url && React.createElement("a", { href: carrier.url, target: "_blank", rel: "noopener noreferrer", style: { fontSize: 10, color: "#4285f4", textDecoration: "none" } }, "Visit"))),
                                tpa && React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #b2f0df", borderRadius: 10, padding: "8px 12px" } },
                                    React.createElement(InsLogo, { ins: tpa }),
                                    React.createElement("div", null,
                                        React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#0fa890", textTransform: "uppercase" } },
                                            "TPA",
                                            acc.tpaIsCarrier ? " (=Carrier)" : ""),
                                        React.createElement("div", { style: { fontSize: 12, fontWeight: 700 } }, tpa.name),
                                        tpa.url && React.createElement("a", { href: tpa.url, target: "_blank", rel: "noopener noreferrer", style: { fontSize: 10, color: "#0fa890", textDecoration: "none" } }, "Visit"))),
                                hmo && React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e9c7ff", borderRadius: 10, padding: "8px 12px" } },
                                    React.createElement(InsLogo, { ins: hmo }),
                                    React.createElement("div", null,
                                        React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#9333ea", textTransform: "uppercase" } }, "HMO"),
                                        React.createElement("div", { style: { fontSize: 12, fontWeight: 700 } }, hmo.name)))),
                            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7 } },
                                acc.policyNumber && React.createElement("div", { style: c.ic },
                                    React.createElement("div", { style: c.iL }, "Policy No."),
                                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, marginTop: 2 } }, acc.policyNumber)),
                                acc.policyStartDate && React.createElement("div", { style: c.ic },
                                    React.createElement("div", { style: c.iL }, "Start"),
                                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, marginTop: 2 } }, fmtShort(acc.policyStartDate))),
                                acc.policyEndDate && React.createElement("div", { style: c.ic },
                                    React.createElement("div", { style: c.iL }, "End"),
                                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, marginTop: 2 } }, fmtShort(acc.policyEndDate))),
                                React.createElement(PremiumTile, { acc: acc }),
                                acc.renewalStatus && React.createElement("div", { style: c.ic },
                                    React.createElement("div", { style: c.iL }, "Renewal Status"),
                                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, marginTop: 2, textTransform: "capitalize", color: { active: "#0fa890", in_progress: "#d4880a", secured: "#4285f4", terminated: "#7a0d0d", lost: "#e0392e" }[acc.renewalStatus] || "#7a9ab5" } }, acc.renewalStatus.replace("_", " ")))),
                            (() => {
                                const accPlans = acc.benefits?.plans || [];
                                const hasExcl = !!acc.exclusions;
                                return React.createElement("div", { style: { marginTop: 10, paddingTop: 10, borderTop: "1px solid #c7dcff44" } },
                                    React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 } },
                                        React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#0fa890", textTransform: "uppercase", letterSpacing: .7 } },
                                            React.createElement(Ic, { name: "hospital" }),
                                            " Benefit Plans"),
                                        React.createElement("div", { style: { display: "flex", gap: 5 } },
                                            React.createElement("button", { onClick: () => { setTab("benefits"); setAddBenefitsModal(acc); }, style: { background: "#e8faf8", border: "1px solid #0fa89033", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "#0fa890", cursor: "pointer" } }, "+ Add"),
                                            React.createElement("button", { onClick: () => setTab("benefits"), style: { background: "#f0f4f8", border: "none", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "#7a9ab5", cursor: "pointer" } }, "View all"))),
                                    accPlans.length === 0 && !hasExcl ? React.createElement("div", { style: { fontSize: 11, color: "#c0cdd8", fontStyle: "italic" } }, "No plans added yet.") : React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } },
                                        accPlans.map((p, i) => React.createElement("div", { key: i, onClick: () => setTab("benefits"), style: { background: "#fff", border: "1.5px solid #0fa89033", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, color: "#0f1c2e", cursor: "pointer", display: "flex", gap: 5, alignItems: "center" } },
                                            p.planName,
                                            p.employeeCategory && React.createElement("span", { style: { fontSize: 9, color: "#9333ea", background: "#9333ea11", borderRadius: 20, padding: "1px 5px" } }, p.employeeCategory),
                                            p.networkTier && React.createElement("span", { style: { fontSize: 9, color: colorForTier(p.networkTier, [p.networkTier]), background: `${colorForTier(p.networkTier, [p.networkTier])}11`, borderRadius: 20, padding: "1px 5px" } },
                                                React.createElement(Ic, { name: "map" }),
                                                p.networkTier),
                                            p.insurer && p.insurer !== "Tailored" && React.createElement("span", { style: { fontSize: 9, color: "#7a9ab5" } }, p.insurer))),
                                        hasExcl && React.createElement("div", { onClick: () => setTab("benefits"), style: { background: "#fff0ef", border: "1px solid #e0392e22", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, color: "#e0392e", cursor: "pointer" } },
                                            React.createElement(Ic, { name: "block" }),
                                            " Exclusions")));
                            })()),
                        (acc.memory?.openIssues || acc.memory?.historicalNotes) && React.createElement("div", { style: { margin: "0 18px 14px", background: "#f8f0ff", border: "1px solid #e9c7ff", borderRadius: 12, padding: 13 } },
                            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#9333ea", textTransform: "uppercase", letterSpacing: .8, marginBottom: 7 } }, "Account Memory"),
                            React.createElement("div", { style: { display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 7 } },
                                acc.memory.preferredContact && React.createElement("span", { style: { fontSize: 11, background: "#fff", border: "1px solid #e9c7ff", borderRadius: 20, padding: "2px 9px", color: "#9333ea", fontWeight: 600 } }, acc.memory.preferredContact),
                                acc.memory.communicationStyle && React.createElement("span", { style: { fontSize: 11, background: "#fff", border: "1px solid #e9c7ff", borderRadius: 20, padding: "2px 9px", color: "#9333ea", fontWeight: 600 } }, acc.memory.communicationStyle)),
                            acc.memory.openIssues && React.createElement("div", { style: { fontSize: 12, color: "#6a1b9a", marginBottom: 4 } },
                                React.createElement("strong", null, "Open Issues: "),
                                acc.memory.openIssues),
                            acc.memory.historicalNotes && React.createElement("div", { style: { fontSize: 12, color: "#6a1b9a" } },
                                React.createElement("strong", null, "Notes: "),
                                acc.memory.historicalNotes)),
                        (() => {
                            const pc = acc.payment?.paidCycles || [];
                            if (!pc.length)
                                return null;
                            const lastPaid = [...pc].reverse().find(x => typeof x === "object" && x.cycleKey);
                            if (!lastPaid || !lastPaid.confirmedAt)
                                return null;
                            const hoursSince = (Date.now() - new Date(lastPaid.confirmedAt).getTime()) / 3600000;
                            if (hoursSince > 6)
                                return null;
                            return React.createElement("div", { style: { margin: "0 18px 10px", background: "linear-gradient(135deg,#e8faf8,#e8f0fe)", border: "1.5px solid #0fa89044", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } },
                                React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", style: { flexShrink: 0 } },
                                    React.createElement("circle", { cx: "12", cy: "12", r: "11", fill: "#0fa890" }),
                                    React.createElement("path", { d: "M7 12.5 L10.5 16 L17 8.5", fill: "none", stroke: "#fff", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" })),
                                React.createElement("div", { style: { flex: 1 } },
                                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#0fa890" } }, "Last Payment Confirmed"),
                                    React.createElement("div", { style: { fontSize: 11, color: "#4a6080" } },
                                        fmtCurrency(lastPaid.finalAmt || 0),
                                        " \u00B7 ",
                                        new Date(lastPaid.confirmedAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }))),
                                (lastPaid.pops?.length > 0 || lastPaid.popB64) && React.createElement(PopThumb, { popB64: lastPaid.popB64, popName: lastPaid.popName, pops: lastPaid.pops }));
                        })(),
                        React.createElement(PaymentCard, { a: acc, onMarkPaid: record => markCyclePaid(acc.id, record), allIns: allIns }),
                        getPocs(acc).map((poc, pi) => React.createElement("div", { key: pi, style: { margin: "0 18px 14px", background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 12, padding: 15 } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 11 } },
                                React.createElement("div", { style: { ...c.ava(poc.name), width: 42, height: 42, fontSize: 13 } }, ini(poc.name)),
                                React.createElement("div", { style: { flex: 1 } },
                                    React.createElement("div", { style: { fontSize: 14, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } },
                                        poc.name,
                                        pi === 0 && getPocs(acc).length > 1 && React.createElement("span", { style: { fontSize: 10, color: "#4285f4", fontWeight: 700, marginLeft: 6 } }, "PRIMARY")),
                                    React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5" } }, poc.title || "—")),
                                React.createElement("div", { style: { display: "flex", gap: 6 } },
                                    poc.email && React.createElement("button", { onClick: () => gmailCompose(poc.email, poc.name), style: { background: "#e8faf8", border: "1px solid #5dd8c844", color: "#0fa890", borderRadius: 8, padding: "5px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none" } },
                                        React.createElement(Ic, { name: "envelope" }),
                                        " Email"),
                                    poc.emailThreadUrl && React.createElement("a", { href: poc.emailThreadUrl, target: "_blank", rel: "noopener noreferrer", style: { background: "#0a1628", color: "#5dd8c8", borderRadius: 8, padding: "5px 11px", fontSize: 12, fontWeight: 700, textDecoration: "none" } }, "Inbox"))),
                            [["Phone", poc.phone, null], ["Email", poc.email, poc.email ? poc.email : null]].map(([l, v, isEmail]) => React.createElement("div", { key: l, style: { fontSize: 12, color: "#7a9ab5", padding: "6px 0", borderTop: "1px solid #edf2f7", display: "flex", gap: 8 } },
                                React.createElement("span", { style: { color: "#c0cdd8", minWidth: 42, fontWeight: 600 } }, l),
                                l === "Email" && v ? React.createElement("button", { onClick: () => gmailCompose(v), style: { color: "#0fa890", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12 } },
                                    React.createElement(Ic, { name: "envelope" }),
                                    " ",
                                    v) : l === "Phone" && v ? React.createElement("a", { href: `tel:${v}`, style: { color: "#0fa890", fontWeight: 600, textDecoration: "none" } }, v) : React.createElement("span", { style: { color: "#0f1c2e", fontWeight: 500 } }, v || "—"))))),
                        (acc.subsidiaries || []).length > 0 && React.createElement("div", { style: { margin: "0 18px 14px" } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 } },
                                React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: .8 } },
                                    "Subsidiaries (",
                                    acc.subsidiaries.length,
                                    ")"),
                                React.createElement("button", { style: c.aBtn, onClick: () => setShowSub(true) }, "+ Add")),
                            acc.subsidiaries.map(s => React.createElement("div", { key: s.id, style: { background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 10, padding: "9px 13px", marginBottom: 6, display: "flex", alignItems: "center", gap: 9 } },
                                React.createElement("div", { style: { ...c.ava(s.name), width: 28, height: 28, fontSize: 10 } }, ini(s.name)),
                                React.createElement("div", { style: { flex: 1 } },
                                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700 } }, s.name),
                                    React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5" } },
                                        s.employees > 0 ? `${s.employees} adherents` : "",
                                        s.poc ? ` - ${s.poc}` : "")),
                                s.pocEmail && React.createElement("button", { onClick: () => gmailCompose(s.pocEmail, s.name), style: { fontSize: 11, color: "#0fa890", fontWeight: 700, background: "#e8faf8", padding: "2px 8px", borderRadius: 20, border: "none", cursor: "pointer" } },
                                    React.createElement(Ic, { name: "envelope" }),
                                    " Email"),
                                React.createElement("button", { style: c.del, onClick: () => delSub(s.id) }, "x")))),
                        React.createElement("div", { style: c.tabs }, [["notes", "Weekly Notes"], ["tasks", "Daily Tasks"], ["benefits", "Benefits 🏥"], ["activelist", "Active List 👥"], ["timeline", "Timeline"], ["activity", "Activity"]].map(([t, l]) => React.createElement("button", { key: t, style: c.tab(tab === t), onClick: () => setTab(t) }, l))),
                        tab === "notes" && React.createElement("div", { style: { padding: 18 } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } },
                                React.createElement("span", { style: { fontSize: 13, fontWeight: 600 } }, "Week notes"),
                                React.createElement(WNav, { off: nOff, set: setNOff, label: nOff === 0 ? "This week" : nOff === -1 ? "Last week" : nOff < 0 ? `${Math.abs(nOff)}w ago` : `${nOff}w ahead` })),
                            React.createElement(NoteIn, { val: note, ch: setNote, save: saveNote }),
                            (acc.notes[nwk] || []).length === 0 ? React.createElement("div", { style: { padding: "1rem 0", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, "No notes this week.") : [...(acc.notes[nwk] || [])].reverse().map(n => React.createElement("div", { key: n.id, style: { background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 8, padding: 12, marginTop: 8, position: "relative" } },
                                React.createElement("button", { style: c.del, onClick: () => delNote(n.id) }, "x"),
                                React.createElement("div", { style: { fontSize: 13, lineHeight: 1.65, paddingRight: 20 } }, n.text),
                                React.createElement("div", { style: { fontSize: 11, color: "#c0cdd8", marginTop: 5 } }, new Date(n.ts).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" }))))),
                        tab === "tasks" && React.createElement("div", { style: { padding: 18 } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } },
                                React.createElement("span", { style: { fontSize: 13, fontWeight: 600 } }, fmtD(dky)),
                                React.createElement(WNav, { off: dOff, set: setDOff, label: dOff === 0 ? "Today" : dOff === 1 ? "Tomorrow" : dOff === -1 ? "Yesterday" : dOff < 0 ? `${Math.abs(dOff)}d ago` : `In ${dOff}d` })),
                            acc.renewalStatus === "terminated" ? React.createElement("div", { style: { background: "#fde2e1", border: "1px solid #7a0d0d33", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: "#7a0d0d", fontWeight: 600 } },
                                React.createElement(Ic, { name: "block" }),
                                " This account is terminated \u2014 new tasks cannot be added.") : React.createElement(TaskIn, { val: task, tval: ttime, chv: setTask, cht: setTtime, add: addTask }),
                            (acc.tasks[dky] || []).length === 0 ? React.createElement("div", { style: { padding: "1rem 0", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, "No tasks for this day.") : [...(acc.tasks[dky] || [])].sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99")).map(t => React.createElement(TaskRow, { key: t.id, t: t, dy: dky, aid: acc.id, aName: acc.name }))),
                        tab === "benefits" && (() => {
                            const accPlans = acc.benefits?.plans || [];
                            const exclusions = acc.exclusions || "";
                            return React.createElement("div", { style: { padding: 18 } },
                                React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 8, flexWrap: "wrap" } },
                                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Insurance Benefits"),
                                    React.createElement("div", { style: { display: "flex", gap: 7 } },
                                        React.createElement("button", { style: { ...c.aBtn, background: "linear-gradient(135deg,#e8f0fe,#e8faf8)", borderColor: "#0fa89033", color: "#0fa890", fontWeight: 700 }, onClick: () => setAddBenefitsModal(acc) }, "+ Add Benefits"),
                                        React.createElement("button", { style: { ...c.aBtn, background: "#f0f6ff", borderColor: "#4285f444", color: "#4285f4" }, onClick: () => setContractUploadModal(acc) },
                                            React.createElement(Ic, { name: "document" }),
                                            " Upload Contract"))),
                                accPlans.length === 0 && React.createElement("div", { style: { padding: "2rem", textAlign: "center", color: "#c0cdd8", fontSize: 13, background: "#f7fbff", borderRadius: 10, border: "1px dashed #dde8f0", marginBottom: 12 } },
                                    "No benefit plans yet. Click ",
                                    React.createElement("strong", null, "+ Add Benefits"),
                                    " to pick from insurer plans or create a tailored one."),
                                accPlans.map((plan, i) => React.createElement(PlanBenefitCard, { key: i, plan: plan, compact: true })),
                                React.createElement("div", { style: { marginTop: 16, background: "#fff8f8", border: "1px solid #e0392e22", borderRadius: 12, padding: "12px 15px" } },
                                    React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 } },
                                        React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#e0392e", textTransform: "uppercase", letterSpacing: .7 } },
                                            React.createElement(Ic, { name: "block" }),
                                            " Exclusions"),
                                        React.createElement("button", { style: { ...c.aBtn, fontSize: 10, padding: "3px 8px", color: "#4285f4", borderColor: "#4285f444", background: "#e8f0fe" }, onClick: () => setContractUploadModal(acc) }, "Extract from PDF")),
                                    exclusions ? React.createElement("div", { style: { fontSize: 12, color: "#4a6080", lineHeight: 1.7, whiteSpace: "pre-wrap" } }, exclusions) : React.createElement("div", { style: { fontSize: 12, color: "#c0cdd8", fontStyle: "italic" } }, "No exclusions recorded yet. Upload a contract PDF to auto-extract, or add manually via the Upload Contract button."),
                                    exclusions && React.createElement("button", { style: { marginTop: 8, ...c.cBtn, fontSize: 10, padding: "3px 9px" }, onClick: () => { const v = window.prompt("Edit exclusions:", exclusions); if (v !== null)
                                            saveExclusions(acc.id, v); } },
                                        React.createElement(Ic, { name: "edit" }),
                                        " Edit")));
                        })(),
                        tab === "activelist" && (() => {
                            const al = acc.activeList;
                            return React.createElement("div", { style: { padding: 18 } },
                                React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 8, flexWrap: "wrap" } },
                                    React.createElement("div", null,
                                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Active List"),
                                        al?.contractId && React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5", marginTop: 2 } },
                                            "Contract ID: ",
                                            React.createElement("strong", { style: { color: "#0fa890" } }, al.contractId))),
                                    React.createElement("button", { style: { ...c.aBtn, background: "linear-gradient(135deg,#e8f0fe,#e8faf8)", borderColor: "#0fa89033", color: "#0fa890", fontWeight: 700 }, onClick: () => setActiveListModal(acc) }, al ? "↻ Replace Active List" : "+ Upload Active List")),
                                !al && React.createElement("div", { style: { padding: "2rem", textAlign: "center", color: "#c0cdd8", fontSize: 13, background: "#f7fbff", borderRadius: 10, border: "1px dashed #dde8f0" } },
                                    "No active list uploaded yet. Click ",
                                    React.createElement("strong", null, "+ Upload Active List"),
                                    " to import the member roster \u2014 this will also set Adherents (Principal/Family) automatically."),
                                al && React.createElement(React.Fragment, null,
                                    React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" } },
                                        React.createElement("div", { style: { background: "#f0f6ff", border: "1px solid #4285f444", borderRadius: 9, padding: "9px 14px" } },
                                            React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", fontWeight: 700, textTransform: "uppercase" } }, "Principal"),
                                            React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#4285f4", fontFamily: "'Clash Display',sans-serif" } }, getAdherents(acc).principal)),
                                        React.createElement("div", { style: { background: "#fff8ec", border: "1px solid #d4880a44", borderRadius: 9, padding: "9px 14px" } },
                                            React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", fontWeight: 700, textTransform: "uppercase" } }, "Family"),
                                            React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#d4880a", fontFamily: "'Clash Display',sans-serif" } }, getAdherents(acc).family)),
                                        React.createElement("div", { style: { background: "#f7fbff", border: "1px solid #dde8f0", borderRadius: 9, padding: "9px 14px" } },
                                            React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", fontWeight: 700, textTransform: "uppercase" } }, "Total Members"),
                                            React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#0f1c2e", fontFamily: "'Clash Display',sans-serif" } }, (al.members || []).length)),
                                        React.createElement("div", { style: { background: "#f7fbff", border: "1px solid #dde8f0", borderRadius: 9, padding: "9px 14px" } },
                                            React.createElement("div", { style: { fontSize: 9, color: "#7a9ab5", fontWeight: 700, textTransform: "uppercase" } }, "Uploaded"),
                                            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#0f1c2e", marginTop: 2 } }, al.uploadedAt ? fmtShort(al.uploadedAt.slice(0, 10)) : "—"))),
                                    (() => {
                                        const q = alSearch.trim().toLowerCase();
                                        const filtered = !q ? al.members || [] : (al.members || []).filter(m => (m.name || "").toLowerCase().includes(q) || (m.medicalId || "").toLowerCase().includes(q) || (m.staffId || "").toLowerCase().includes(q));
                                        return React.createElement(React.Fragment, null,
                                            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } },
                                                React.createElement("input", { style: { ...c.srch, marginBottom: 0, maxWidth: 280 }, placeholder: "Search by name, medical ID, or staff number...", value: alSearch, onChange: e => setAlSearch(e.target.value) }),
                                                q && React.createElement("span", { style: { fontSize: 11, color: "#7a9ab5" } },
                                                    filtered.length,
                                                    " of ",
                                                    (al.members || []).length,
                                                    " match",
                                                    filtered.length === 1 ? "" : "es")),
                                            React.createElement("div", { style: { maxHeight: 400, overflowY: "auto", border: "1px solid #edf2f7", borderRadius: 10 } },
                                                React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 12 } },
                                                    React.createElement("thead", null,
                                                        React.createElement("tr", { style: { background: "#f7fbff", position: "sticky", top: 0 } }, ["Name", "Medical ID", "DOB", "Age", "Staff ID", "Sex", "Relation", ...(al.format === "metlife" ? ["Service Desk ID"] : [])].map(h => React.createElement("th", { key: h, style: { textAlign: "left", padding: "7px 10px", fontWeight: 700, color: "#7a9ab5", fontSize: 10, textTransform: "uppercase", borderBottom: "1px solid #edf2f7" } }, h)))),
                                                    React.createElement("tbody", null, filtered.map((m, i) => React.createElement("tr", { key: i, style: { borderBottom: "1px solid #f7fbff" } },
                                                        React.createElement("td", { style: { padding: "6px 10px" } }, m.name),
                                                        React.createElement("td", { style: { padding: "6px 10px" } }, m.medicalId),
                                                        React.createElement("td", { style: { padding: "6px 10px" } }, m.dob ? fmtShort(m.dob) : "—"),
                                                        React.createElement("td", { style: { padding: "6px 10px" } }, m.age || "—"),
                                                        React.createElement("td", { style: { padding: "6px 10px" } }, m.staffId || "—"),
                                                        React.createElement("td", { style: { padding: "6px 10px" } }, m.sex || "—"),
                                                        React.createElement("td", { style: { padding: "6px 10px" } },
                                                            React.createElement("span", { style: { background: m.bucket === "principal" ? "#e8f0fe" : "#fff8ec", color: m.bucket === "principal" ? "#4285f4" : "#d4880a", padding: "2px 9px", borderRadius: 10, fontWeight: 700, fontSize: 10 } }, m.relation)),
                                                        al.format === "metlife" && React.createElement("td", { style: { padding: "6px 10px" } }, m.serviceDeskId || "—"))))),
                                                filtered.length === 0 && React.createElement("div", { style: { padding: "1.5rem", textAlign: "center", color: "#c0cdd8", fontSize: 12 } },
                                                    "No members match \"",
                                                    alSearch,
                                                    "\".")));
                                    })()));
                        })(),
                        tab === "timeline" && React.createElement(AccountTimeline, { acc: acc }),
                        tab === "activity" && React.createElement("div", { style: { padding: 18 } },
                            React.createElement("div", { style: { fontSize: 13, fontWeight: 600, marginBottom: 12, color: "#7a9ab5" } }, "Activity log"),
                            (acc.activity || []).length === 0 ? React.createElement("div", { style: { padding: "1rem 0", textAlign: "center", color: "#c0cdd8", fontSize: 13 } }, "No activity yet.") : (acc.activity || []).map(a => React.createElement("div", { key: a.id, style: { display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid #f0f4f8", alignItems: "flex-start" } },
                                React.createElement("div", { style: { width: 7, height: 7, borderRadius: "50%", background: "#edf2f7", border: "1.5px solid #5dd8c8", marginTop: 5, flexShrink: 0 } }),
                                React.createElement("div", { style: { flex: 1 } },
                                    React.createElement("div", { style: { fontSize: 13, fontWeight: 500 } }, a.msg),
                                    React.createElement("div", { style: { fontSize: 11, color: "#c0cdd8", marginTop: 2 } }, new Date(a.ts).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })))))));
                })()),
            view === "insurers" && React.createElement("div", null,
                React.createElement("div", { style: { background: "#fff", border: "1px solid #dde8f0", borderRadius: 14, padding: "14px 18px", marginBottom: 14 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } },
                        React.createElement("input", { style: { ...c.srch, marginBottom: 0, maxWidth: 220 }, placeholder: "Search insurers...", value: insSearch, onChange: e => setInsSearch(e.target.value) }),
                        React.createElement("div", { style: { display: "flex", gap: 6 } }, [["all", "All"], ["carrier", "Risk Carriers"], ["tpa", "TPAs"], ["hmo", "HMOs"]].map(([v, l]) => React.createElement("button", { key: v, onClick: () => setInsFilter(v), style: { background: insFilter === v ? "#0a1628" : "#f0f4f8", color: insFilter === v ? "#5dd8c8" : "#7a9ab5", border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" } }, l))),
                        React.createElement("button", { style: { ...c.aBtn, marginLeft: "auto" }, onClick: () => setInsEditModal({ id: "c_new", name: "", types: [], logo: "", url: "", portalUrl: "", builtin: false, poc: { name: "", title: "", phone: "", email: "" } }) }, "+ Add Insurer"))),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 } }, [{ l: "Risk Carriers", v: allIns.filter(i => i.types.includes("carrier")).length, col: "#4285f4", fv: "carrier" }, { l: "TPAs", v: allIns.filter(i => i.types.includes("tpa")).length, col: "#0fa890", fv: "tpa" }, { l: "HMOs", v: allIns.filter(i => i.types.includes("hmo")).length, col: "#9333ea", fv: "hmo" }].map(({ l, v, col, fv }) => React.createElement("div", { key: l, onClick: () => setInsFilter(insFilter === fv ? "all" : fv), style: { ...c.sc(col), cursor: "pointer", transition: "all .15s", userSelect: "none", outline: insFilter === fv ? `2.5px solid ${col}` : "none", outlineOffset: 2 }, onMouseEnter: e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${col}33`; }, onMouseLeave: e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; } },
                    React.createElement("div", { style: c.sn(col) }, v),
                    React.createElement("div", { style: c.sl }, l.toUpperCase()),
                    insFilter === fv && React.createElement("div", { style: { fontSize: 9, color: col, fontWeight: 700, marginTop: 4 } }, "\u25CF FILTERED")))),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 } }, filteredIns.map(ins => {
                    const linked = data.accounts.filter(a => a.carrierId === ins.id || a.tpaId === ins.id || a.tpaIsCarrier && a.carrierId === ins.id || a.hmoId === ins.id);
                    const hasPoc = (ins.pocs || []).some(p => p.name || p.email || p.phone) || ins.poc?.name || ins.poc?.phone || ins.poc?.email;
                    return React.createElement("div", { key: ins.id, style: { background: "#fff", border: "1px solid #dde8f0", borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", gap: 10 } },
                        React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 } },
                            React.createElement(InsLogo, { ins: ins }),
                            React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif", marginBottom: 4 } }, ins.name),
                                React.createElement("div", { style: { display: "flex", gap: 3, flexWrap: "wrap" } },
                                    ins.types.map(t => React.createElement("span", { key: t, style: c.tTag(t) }, t === "carrier" ? "Risk Carrier" : t === "tpa" ? "TPA" : "HMO")),
                                    !ins.builtin && React.createElement("span", { style: { fontSize: 9, background: "#f3f0ff", color: "#a78bfa", borderRadius: 20, padding: "2px 7px", fontWeight: 700 } }, "Custom")))),
                        React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" } },
                            React.createElement("button", { onClick: () => setInsurerPlanModal(ins), style: { flex: "1 1 auto", background: "linear-gradient(135deg,#e8faf8,#e8f0fe)", border: "1px solid #0fa89033", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "#0fa890", cursor: "pointer", textAlign: "center", whiteSpace: "nowrap" } },
                                React.createElement(Ic, { name: "hospital" }),
                                " ",
                                (ins.plans || []).length > 0 ? `Plans (${ins.plans.length})` : "Add Plan"),
                            ins.types.includes("tpa") && React.createElement("button", { onClick: () => ins.network ? setNetworkViewModal(ins) : setNetworkUploadModal(ins), style: { flex: "1 1 auto", background: ins.network ? "linear-gradient(135deg,#f8f0ff,#e8f0fe)" : "#f7f0ff", border: `1px solid ${ins.network ? "#9333ea44" : "#9333ea22"}`, borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: ins.network ? "#9333ea" : "#9333ea99", cursor: "pointer", textAlign: "center", whiteSpace: "nowrap" } },
                                React.createElement(Ic, { name: "map" }),
                                " ",
                                ins.network ? `Network (${Object.values(ins.network.tiersData || ins.network.tiers || {}).reduce((s, a) => s + a.length, 0).toLocaleString()})` : "Add Network"),
                            React.createElement("button", { onClick: () => setInsEditModal(ins), style: { flex: "0 0 auto", background: "#e8f0fe", border: "1px solid #4285f422", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "#4285f4", cursor: "pointer", whiteSpace: "nowrap" } }, "Edit")),
                        ins.network && (() => {
                            const tData = ins.network.tiersData || ins.network.tiers || {};
                            const tOrder = ins.network.tierOrder || Object.keys(tData);
                            const totalProviders = Object.values(tData).reduce((s, a) => s + a.length, 0);
                            return React.createElement("div", { style: { background: "linear-gradient(90deg,#f8f0ff,#e8f0fe)", border: "1px solid #9333ea22", borderRadius: 9, padding: "8px 12px" } },
                                React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 } },
                                    React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#9333ea", textTransform: "uppercase", letterSpacing: .7, cursor: "pointer" }, onClick: () => setNetworkViewModal(ins) },
                                        "Medical Network \u2014 ",
                                        totalProviders.toLocaleString(),
                                        " Providers"),
                                    React.createElement("button", { onClick: () => setNetworkUploadModal(ins), style: { background: "#fff", border: "1px solid #9333ea33", borderRadius: 6, padding: "2px 9px", fontSize: 9, fontWeight: 700, color: "#9333ea", cursor: "pointer", whiteSpace: "nowrap" } }, "\u21BB Update Network")),
                                React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", cursor: "pointer" }, onClick: () => setNetworkViewModal(ins) }, tOrder.map(tierLabel => {
                                    const cnt = tData[tierLabel]?.length || 0;
                                    if (!cnt)
                                        return null;
                                    const color = colorForTier(tierLabel, tOrder);
                                    return React.createElement("div", { key: tierLabel, style: { background: `${color}22`, border: `1px solid ${color}44`, borderRadius: 20, padding: "2px 10px", fontSize: 10, fontWeight: 700, color: color } },
                                        tierLabel,
                                        ": ",
                                        cnt.toLocaleString());
                                })));
                        })(),
                        (ins.plans || []).length > 0 && React.createElement("div", { style: { background: "#e8faf8", border: "1px solid #0fa89022", borderRadius: 9, padding: "8px 12px" } },
                            React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#0fa890", textTransform: "uppercase", letterSpacing: .7, marginBottom: 6 } },
                                "Benefit Plans (",
                                ins.plans.length,
                                ")"),
                            React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } }, ins.plans.map((p, pi) => React.createElement("div", { key: pi, onClick: () => setInsurerPlanModal(ins), style: { background: "#fff", border: "1px solid #0fa89033", borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 600, color: "#0f1c2e", cursor: "pointer" } }, p.planName)))),
                        (() => {
                            const allPocs = (ins.pocs || []).filter(p => p.name || p.email || p.phone);
                            const legacyPoc = !ins.pocs && ins.poc?.name ? [ins.poc] : [];
                            const displayPocs = [...allPocs, ...legacyPoc];
                            return displayPocs.length > 0 ? React.createElement("div", { style: { background: "#f0f6ff", border: "1px solid #c7dcff", borderRadius: 9, padding: "9px 12px" } },
                                React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "#4285f4", textTransform: "uppercase", letterSpacing: .7, marginBottom: 7 } }, "Points of Contact"),
                                displayPocs.map((poc, i) => React.createElement("div", { key: i, style: { marginBottom: i < displayPocs.length - 1 ? 8 : 0, paddingBottom: i < displayPocs.length - 1 ? 8 : 0, borderBottom: i < displayPocs.length - 1 ? "1px solid #c7dcff33" : "none" } },
                                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#0f1c2e", marginBottom: 2 } },
                                        poc.name || "—",
                                        poc.title && React.createElement("span", { style: { fontWeight: 400, color: "#7a9ab5", marginLeft: 5, fontSize: 11 } }, poc.title)),
                                    React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } },
                                        poc.phone && React.createElement("a", { href: `tel:${poc.phone}`, style: { fontSize: 11, color: "#4285f4", fontWeight: 600, textDecoration: "none" } },
                                            React.createElement(Ic, { name: "phone" }),
                                            " ",
                                            poc.phone),
                                        poc.email && React.createElement("button", { onClick: () => gmailCompose(poc.email, poc.name), style: { fontSize: 11, color: "#0fa890", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 } },
                                            React.createElement(Ic, { name: "envelope" }),
                                            " ",
                                            poc.email))))) : React.createElement("div", { style: { background: "#f0f4f8", borderRadius: 9, padding: "7px 12px", textAlign: "center", fontSize: 11, color: "#c0cdd8", cursor: "pointer" }, onClick: () => setInsEditModal(ins) }, "+ Add points of contact");
                        })(),
                        ins.url && React.createElement("a", { href: ins.url, target: "_blank", rel: "noopener noreferrer", style: { fontSize: 11, color: "#4285f4", fontWeight: 700, textDecoration: "none", background: "#e8f0fe", padding: "4px 10px", borderRadius: 20, display: "inline-block", alignSelf: "flex-start" } }, "Website"),
                        ins.portalUrl && React.createElement("a", { href: ins.portalUrl, target: "_blank", rel: "noopener noreferrer", style: { fontSize: 11, color: "#0fa890", fontWeight: 700, textDecoration: "none", background: "#e8faf5", padding: "4px 10px", borderRadius: 20, display: "inline-block", alignSelf: "flex-start" } }, "Portal"),
                        linked.length > 0 && React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "#7a9ab5", textTransform: "uppercase", letterSpacing: .5, marginBottom: 5 } },
                                "Linked Accounts (",
                                linked.length,
                                ")"),
                            linked.map(a => React.createElement("div", { key: a.id, onClick: () => { setSelAcc(a.id); setView("accounts"); }, style: { display: "flex", alignItems: "center", gap: 8, background: "#f7fbff", borderRadius: 8, padding: "5px 10px", cursor: "pointer", border: "1px solid #edf2f7", marginBottom: 3 } },
                                React.createElement(AccAva, { a: a, size: 20 }),
                                React.createElement("span", { style: { fontSize: 12, fontWeight: 600, flex: 1 } }, a.name),
                                React.createElement("span", { style: { ...c.bdg(a.status), fontSize: 9, padding: "1px 6px" } }, SC[a.status]?.label)))),
                        !ins.builtin && React.createElement("button", { onClick: () => delCustomIns(ins.id), style: { fontSize: 10, color: "#e0392e", fontWeight: 700, background: "#fff0ef", border: "none", borderRadius: 20, padding: "3px 10px", cursor: "pointer", alignSelf: "flex-start" } }, "Delete"));
                }))),
            view === "hospitals" && React.createElement("div", null,
                React.createElement("div", { style: { background: "#fff", border: "1px solid #dde8f0", borderRadius: 14, padding: "14px 18px", marginBottom: 14 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } },
                        React.createElement("input", { style: { ...c.srch, marginBottom: 0, maxWidth: 220 }, placeholder: "Search hospitals...", value: hospSearch, onChange: e => setHospSearch(e.target.value) }),
                        React.createElement("button", { style: { ...c.aBtn, marginLeft: "auto" }, onClick: () => setHospEditModal({ id: null, name: "", logoUrl: "", url: "", whatsappGroupUrl: "", salesAgents: [] }) }, "+ Add Hospital"))),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 12 } },
                    (data.hospitals || []).filter(h => !hospSearch || h.name.toLowerCase().includes(hospSearch.toLowerCase())).map(h => React.createElement("div", { key: h.id, style: { background: "#fff", border: "1px solid #dde8f0", borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", gap: 10 } },
                        React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 } },
                            h.logoUrl ? React.createElement("img", { src: h.logoUrl, alt: "", style: { width: 40, height: 40, borderRadius: 9, objectFit: "cover", border: "1px solid #edf2f7" } }) : React.createElement("div", { style: { ...c.ava(h.name), width: 40, height: 40 } }, ini(h.name)),
                            React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif", display: "flex", alignItems: "center", gap: 6 } },
                                    h.name,
                                    isValidWhatsAppGroupUrl(h.whatsappGroupUrl) && React.createElement("span", { title: "Case Management group configured", style: { width: 7, height: 7, borderRadius: "50%", background: "#25d366", flexShrink: 0 } })),
                                React.createElement("div", { style: { fontSize: 11, color: "#7a9ab5" } },
                                    (h.salesAgents || []).length,
                                    " sales agent",
                                    (h.salesAgents || []).length !== 1 ? "s" : "")),
                            React.createElement("button", { onClick: () => setHospEditModal(h), style: { background: "#e8f0fe", border: "1px solid #4285f422", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "#4285f4", cursor: "pointer", whiteSpace: "nowrap" } }, "Edit")),
                        (h.salesAgents || []).length > 0 && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, h.salesAgents.map(sa => {
                            const tpaNames = (sa.tpaIds || []).map(id => allIns.find(i => i.id === id)?.name).filter(Boolean);
                            return React.createElement("div", { key: sa.id, style: { background: "#f7fbff", border: "1px solid #edf2f7", borderRadius: 9, padding: "7px 10px" } },
                                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                                    React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "#0f1c2e" } }, sa.name || "(unnamed)"),
                                    sa.email && React.createElement("button", { onClick: () => gmailCompose(sa.email, sa.name), style: { fontSize: 10, color: "#0fa890", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 } }, React.createElement(Ic, { name: "envelope" }))),
                                sa.phone && React.createElement("div", { style: { fontSize: 10, color: "#7a9ab5" } }, sa.phone),
                                tpaNames.length > 0 && React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 } }, tpaNames.map(n => React.createElement("span", { key: n, style: { fontSize: 9, fontWeight: 700, color: "#4285f4", background: "#e8f0fe", borderRadius: 20, padding: "2px 8px" } }, n))));
                        })),
                        React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" } }, h.url && React.createElement("a", { href: h.url, target: "_blank", rel: "noopener noreferrer", style: { fontSize: 11, color: "#4285f4", fontWeight: 700, textDecoration: "none", background: "#e8f0fe", padding: "4px 10px", borderRadius: 20, display: "inline-block" } }, "Website")),
                        React.createElement("button", { onClick: () => deleteHospital(h.id), style: { fontSize: 10, color: "#e0392e", fontWeight: 700, background: "#fff0ef", border: "none", borderRadius: 20, padding: "3px 10px", cursor: "pointer", alignSelf: "flex-start" } }, "Delete"))),
                    (data.hospitals || []).length === 0 && React.createElement("div", { style: { gridColumn: "1/-1", padding: "2rem", textAlign: "center", color: "#c0cdd8", fontSize: 13, background: "#f7fbff", borderRadius: 10, border: "1px dashed #dde8f0" } },
                        "No hospitals yet. Click ",
                        React.createElement("strong", null, "+ Add Hospital"),
                        " to get started."))),
            view === "meetings" && React.createElement("div", null,
                React.createElement("div", { style: { background: "#fff", border: "1px solid #dde8f0", borderRadius: 14, padding: "14px 18px", marginBottom: 14 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, "Meetings"),
                        React.createElement("button", { style: { ...c.aBtn, marginLeft: "auto" }, onClick: () => setNewMeetingModal(true) }, "+ Add Meeting"))),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 } },
                    (data.meetings || []).slice().sort((a, b) => (b.date || "").localeCompare(a.date || "")).map(m => {
                        const isCompleted = m.status === "completed";
                        const displayStatus = getMeetingDisplayStatus(m);
                        const pCount = (m.participantKeys || []).length;
                        const ctCount = (m.participantKeys || []).filter(k => unifiedPocs.find(p => p.key === k)?.contactId).length;
                        return React.createElement("div", { key: m.id, onClick: () => setMeetingModal(m), style: { background: "#fff", border: "1px solid #dde8f0", borderRadius: 14, padding: 14, cursor: "pointer" } },
                            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 } },
                                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: "'Clash Display',sans-serif" } }, m.name),
                                React.createElement("span", { style: { fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: displayStatus === "completed" ? "#e8faf5" : displayStatus === "upcoming" ? "#e8f0fe" : "#fff8e6", color: displayStatus === "completed" ? "#0fa890" : displayStatus === "upcoming" ? "#4285f4" : "#d4880a" } }, displayStatus === "completed" ? "DONE" : displayStatus === "upcoming" ? "UPCOMING" : "ACTIVE")),
                            m.topic && React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginBottom: 6 } }, m.topic),
                            React.createElement("div", { style: { fontSize: 11, color: "#a8bccf" } },
                                m.date ? fmtShort(m.date) : "No date",
                                m.time ? ` · ${m.time}` : "",
                                " \u00B7 ",
                                pCount,
                                " participant",
                                pCount !== 1 ? "s" : "",
                                ctCount > 0 ? ` · 📇 ${ctCount}` : ""));
                    }),
                    (data.meetings || []).length === 0 && React.createElement("div", { style: { gridColumn: "1/-1", padding: "2rem", textAlign: "center", color: "#c0cdd8", fontSize: 13, background: "#f7fbff", borderRadius: 10, border: "1px dashed #dde8f0" } },
                        "No meetings yet. Click ",
                        React.createElement("strong", null, "+ Add Meeting"),
                        " to get started."))),
            view === "contacts" && React.createElement(ContactsRolodexView, { contacts: data.contacts || [], onAdd: () => setContactModal({}), onOpen: ct => setContactView(ct) })),
        hospEditModal && React.createElement(HospitalModal, { hospital: hospEditModal, allIns: allIns, onSave: saveHospital, onClose: () => setHospEditModal(null) }),
        contactModal && React.createElement(ContactModal, { contact: contactModal.id ? contactModal : null, onSave: saveContact, onDelete: deleteContact, onClose: () => setContactModal(null) }),
        contactView && React.createElement(ContactRolodexCard, { contact: contactView, onEdit: ct => { setContactModal(ct); setContactView(null); }, onClose: () => setContactView(null) }),
        newMeetingModal && React.createElement(MeetingCreateModal, { unifiedPocs: unifiedPocs, defaultDate: toDay(), onCreate: createMeeting, onClose: () => setNewMeetingModal(false) }),
        meetingModal && React.createElement(MeetingModal, { meeting: meetingModal, unifiedPocs: unifiedPocs, onUpdate: updateMeeting, onFinish: finishMeeting, onReopen: reopenMeeting, onDelete: deleteMeeting, onClose: () => setMeetingModal(null), onOpenContact: id => { const ct = (data.contacts || []).find(x => x.id === id); if (ct)
                setContactView(ct); } }),
        welcomeModal && React.createElement(WelcomeEmailModal, { acc: welcomeModal, onClose: () => { setWelcomeModal(null); if (isNewAccFlow) {
                setIsNewAccFlow(false);
                setFirstPaymentPrompt(welcomeModal);
            } } }),
        firstPaymentPrompt && React.createElement(FirstPaymentPromptModal, { acc: firstPaymentPrompt, onNo: () => setFirstPaymentPrompt(null), onYes: () => openFirstPaymentForNewAccount(firstPaymentPrompt), onClose: () => setFirstPaymentPrompt(null) }),
        driveFloater && React.createElement("div", { style: { position: "fixed", bottom: 24, right: 24, zIndex: 8888, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, animation: "slideUpFade .35s ease" } },
            React.createElement("div", { style: { background: "#0f1c2e", color: "#7dd8c8", borderRadius: 12, padding: "8px 14px", fontSize: 11, fontWeight: 700, maxWidth: 280, textAlign: "right", boxShadow: "0 4px 24px rgba(0,0,0,.25)" } }, "Don't forget to share the POP with the Insurer to confirm the Payment :)"),
            React.createElement("div", { style: { display: "flex", gap: 7 } },
                React.createElement("button", { onClick: () => { window.open("https://drive.google.com/drive/folders/1e4mlDUvMYfuUspf0QJAyEf9mh6a0lCRb", "_blank", "noopener"); window.open("https://docs.google.com/spreadsheets/d/1judfMLHUp5n4Jfn1ztSMZ5UBa-ZT_CF1L2z6PncWioI/edit?gid=2120157451#gid=2120157451", "_blank", "noopener"); }, style: { background: "linear-gradient(135deg,#0fa890,#4285f4)", color: "#fff", border: "none", borderRadius: 10, padding: "11px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 18px rgba(15,168,144,.35)", whiteSpace: "nowrap" } },
                    React.createElement(Ic, { name: "folder" }),
                    " Update Drive & Invoices Sheet"),
                React.createElement("button", { onClick: () => setDriveFloater(false), style: { background: "#1a2a3a", color: "#7a9ab5", border: "none", borderRadius: 10, padding: "11px 13px", fontSize: 13, fontWeight: 700, cursor: "pointer" } }, "\u00D7"))),
        insurerPlanModal && React.createElement(InsurerPlanModal, { ins: insurerPlanModal, onSave: ins => { saveInsurerPlan(ins); setInsurerPlanModal(null); }, onClose: () => setInsurerPlanModal(null) }),
        addBenefitsModal && React.createElement(AddBenefitsModal, { acc: addBenefitsModal, allIns: allIns, onSave: b => saveBenefits(addBenefitsModal.id, b), onClose: () => setAddBenefitsModal(null) }),
        contractUploadModal && React.createElement(ContractUploadModal, { acc: contractUploadModal, onSaveExclusions: excl => saveExclusions(contractUploadModal.id, excl), onSaveBenefits: plans => saveExtractedPlans(contractUploadModal.id, plans), onClose: () => setContractUploadModal(null) }),
        activeListModal && React.createElement(ActiveListUploadModal, { acc: activeListModal, onSave: result => saveActiveList(activeListModal.id, result), onClose: () => setActiveListModal(null) }),
        networkUploadModal && React.createElement(NetworkUploadModal, { ins: networkUploadModal, onSave: saveInsurerNetwork, onClose: () => setNetworkUploadModal(null) }),
        networkViewModal && React.createElement(NetworkViewModal, { ins: networkViewModal, onClose: () => setNetworkViewModal(null), onUpdate: ins => setNetworkUploadModal(ins) }),
        showAdd && React.createElement(AccModal, { title: "Add new account", d: form, ch: chForm, allIns: allIns, onSave: addAcc, onClose: () => setShowAdd(false) }),
        showEdit && acc && React.createElement(AccModal, { title: `Edit - ${acc.name}`, d: form, ch: chForm, allIns: allIns, onSave: updAcc, onClose: () => setShowEdit(false) }),
        showCalAdd && React.createElement(CalModal, { day: calDay, accounts: nonTerminatedAccounts, ct: calTask, ch: chCal, onSave: addCalTask, onClose: () => setShowCalAdd(false) }),
        secureAnimModal && React.createElement(SecureRenewalAnimatedModal, { acc: secureAnimModal.acc, block: secureAnimModal.block, allIns: allIns, onClose: () => setSecureAnimModal(null), onConfirm: (blockUpdate, paymentPatch, adherentsPatch) => confirmSecureRenewal(secureAnimModal.acc, secureAnimModal.block, blockUpdate, paymentPatch, adherentsPatch) }),
        dayModal && React.createElement(DayDetailModal, { day: dayModal, accounts: nonTerminatedAccounts, dayNote: data.dayNotes?.[dayModal] || "", onSaveNote: saveDayNote, onAddTask: addTaskForDay, onEndTask: endTask, onDeleteTask: delTask, onReschedule: rescheduleTask, onClose: () => setDayModal(null) }),
        firstPaymentModal && React.createElement(InvoiceBreakdownModal, { acc: firstPaymentModal.acc, cycleKey: firstPaymentModal.cycleKey, cycleAmt: firstPaymentModal.cycleAmt, cycleMed: firstPaymentModal.cycleMed, cycleLife: firstPaymentModal.cycleLife, ci: firstPaymentModal.ci, onConfirm: record => { markCyclePaid(firstPaymentModal.acc.id, record); setFirstPaymentModal(null); }, onClose: () => setFirstPaymentModal(null) }),
        utilModal && React.createElement(UtilizationPocModal, { acc: utilModal, allIns: allIns, onClose: () => setUtilModal(null), onSaveCarrierPoc: (carrierId, poc) => { saveInsurer({ ...allIns.find(i => i.id === carrierId), pocs: [...(allIns.find(i => i.id === carrierId)?.pocs || []), poc].slice(0, 3) }); } }),
        showGoogleSetup && React.createElement(GoogleCalendarSetupModal, { googleConnected: googleConnected, googleBusy: googleCalendarBusy, onConnect: connectGoogleCalendar, onRefresh: () => refreshGoogleCalendar(new Date().getFullYear(), new Date().getMonth()), onDisconnect: disconnectGoogleCalendar, onClose: () => setShowGoogleSetup(false) }),
        taskAct && React.createElement(TaskActModal, { mode: taskAct.mode, task: taskAct.task, accounts: nonTerminatedAccounts, accId: taskAct.accId, onClose: () => setTaskAct(null), onSubmit: taskAct.mode === "update" ? handleUpdate : (txt, aId, tm) => { save(d => ({ accounts: d.accounts.map(a => a.id === aId ? { ...a, tasks: { ...a.tasks, [toDay()]: [...(a.tasks[toDay()] || []), { id: Date.now(), text: txt, time: tm, done: false, ended: false, updates: [] }] } } : a) })); log(aId, `Related: "${txt.slice(0, 40)}"`); setTaskAct(null); } }),
        insEditModal && React.createElement(InsEditModal, { ins: insEditModal, onSave: ins => { if (ins.id === "c_new") {
                addCustomIns({ ...ins });
                setInsEditModal(null);
            }
            else
                saveInsurer(ins); }, onClose: () => setInsEditModal(null) }),
        showSub && acc && React.createElement("div", { style: c.modal },
            React.createElement("div", { style: { ...c.mBox, width: 400 } },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 4, fontFamily: "'Clash Display',sans-serif" } }, "Add Subsidiary"),
                React.createElement("div", { style: { fontSize: 12, color: "#7a9ab5", marginBottom: 14 } },
                    "Under ",
                    acc.name),
                [["Name", "name", "text"], ["Adherents", "employees", "number"], ["POC name", "poc", "text"], ["POC email", "pocEmail", "email"], ["POC phone", "pocPhone", "text"]].map(([lb, k, t]) => React.createElement("div", { key: k },
                    React.createElement("label", { style: c.fl }, lb),
                    React.createElement("input", { style: c.fi, type: t, value: subForm[k] || "", onChange: e => setSubForm(f => ({ ...f, [k]: e.target.value })) }))),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 10 } },
                    React.createElement("button", { style: c.cBtn, onClick: () => setShowSub(false) }, "Cancel"),
                    React.createElement("button", { style: c.sv, onClick: addSub }, "Add")))));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(Dashboard, null));
