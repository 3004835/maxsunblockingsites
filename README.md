# Max's Unblocking Sites 2026/2027

## Files
- `index.html` — page structure
- `styles.css` — responsive red/black/white styling
- `app.js` — client-side demo email gate and resource cards
- `login.json` — demo allowlist
- `assets/logo.png` and `assets/header.png` — add your downloaded images here

## Setup
1. Put your downloaded `logo.png` and `header.png` into the `assets` folder.
2. Edit `login.json` and replace `student@example.edu` with a test address.
3. Upload the folder contents to your web server.

## Important security note
This is a front-end demo. Any visitor can request `login.json` and read the allowlist, and JavaScript access checks can be bypassed. Do not put real student email addresses or sensitive data in this file. For actual student access control, implement verification on the server (or use an authentication provider) and keep the allowlist private. Serve the site over HTTPS.


## GitHub Pages / Cloudflare Pages
- Upload/commit `index.html`, `styles.css`, `app.js`, `login.json`, and the `assets/` folder at the published site root.
- For a GitHub Pages project site, make sure all these files are in the folder GitHub Pages publishes (often the repository root or `/docs`, depending on repository settings).
- The JavaScript resolves `login.json` relative to the current page URL, so it works with project-site subpaths.
- After deployment, open `https://YOUR-SITE-PATH/login.json` directly to confirm it returns JSON.

## Important
This is a static demo only. `login.json` is public, and browser-only checks can be bypassed. Do not put real student information in a public allowlist. A static site cannot securely authenticate students without a trusted authentication service or server-side component.
