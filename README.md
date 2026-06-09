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

### Open It On The Web With GitHub Pages

1. Push this project to a GitHub repository.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
4. Click `Save`.
5. Open the GitHub Pages URL, usually:

```text
https://your-username.github.io/your-repo-name/
```

## Important Note

Data is stored in each user's browser with `localStorage`.

This means:

- Everyone has their own private planner data.
- Data does not sync between devices yet.
- Clearing browser data will remove planner data.
