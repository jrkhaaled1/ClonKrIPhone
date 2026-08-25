# ClonKR iPhone PWA

The PWA keeps the ClonKR branding and animated startup splash. The Electron-only WhatsApp Case Management feature is disabled in this build.

## Google Calendar
Create a Google Cloud OAuth client of type **Web application**. In ClonKR open Google Calendar Setup and paste the Web application Client ID. Do not enter a client secret in the PWA.

Add the exact HTTPS origin used by the PWA to the OAuth client's **Authorized JavaScript origins** and enable the Google Calendar API.

## Hosting
Serve this folder from HTTPS. Opening `index.html` with `file://` will not provide a working PWA/service worker and Google OAuth should not be configured for a file origin.

## iPhone
Open the HTTPS URL in Safari → Share → Add to Home Screen → enable Open as Web App → Add.
