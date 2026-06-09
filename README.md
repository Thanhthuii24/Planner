# Personal Planner

A free, local-first planner for web and mobile. It runs as a static app with no backend required.

## Run Locally

Open `index.html` directly in your browser.

For a more app-like/PWA test, run a local static server:

```bash
npx serve .
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:3000
```

## Share The App

Deploy the folder to any free static hosting service:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

After deployment, send the public URL to friends or family.

## Important Note

Data is stored in each user's browser with `localStorage`.

This means:

- Everyone has their own private planner data.
- Data does not sync between devices yet.
- Clearing browser data will remove planner data.
