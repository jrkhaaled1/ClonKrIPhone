# ClonKR iPhone PWA — GitHub Pages

This package is ready to upload directly to the root of the `ClonKrIphone` GitHub repository.

## GitHub Pages URL

`https://jrkhaaled1.github.io/ClonKrIphone/`

## Files

Keep `index.html`, `manifest.json`, `sw.js`, the splash HTML, and `icons/` directly in the repository root. Do not place them inside another folder.

## Google Calendar

Use a Google Cloud OAuth client of type **Web application**. In ClonKR open Google Calendar Setup and paste the Web application Client ID. Do not enter a client secret in the PWA.

For **Authorized JavaScript origins**, use the origin only:

`https://jrkhaaled1.github.io`

The `/ClonKrIphone/` path is not included in the origin. Enable the Google Calendar API.

## Deploy

In GitHub: Settings → Pages → Deploy from a branch → `main` → `/ (root)`.

## iPhone

Open `https://jrkhaaled1.github.io/ClonKrIphone/` in Safari → Share → Add to Home Screen → enable **Open as Web App** → Add.
