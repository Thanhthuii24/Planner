# Share And Deploy

App nay duoc thiet ke theo huong free-first:

- Khong can backend trong Phase 1.
- Khong can database tra phi.
- Khong can account.
- Chay bang HTML, CSS, JavaScript thuan.
- Du lieu luu rieng trong trinh duyet cua tung nguoi bang `localStorage`.

## Web Va Mobile

App la responsive web app, nen dung duoc tren:

- Laptop/desktop browser.
- Mobile browser.
- Man hinh tablet.

Khi deploy len HTTPS, app co them PWA basics:

- Web app manifest.
- Service worker cache app shell.
- Co the "Add to Home Screen" tren mobile.
- Nut "Chia se app" de gui link nhanh.

## Cach Chay Local

Co the mo truc tiep:

```text
index.html
```

Neu muon test PWA/service worker, can chay qua local server:

```bash
npx serve .
```

Lenh nay co the can internet neu may chua co `serve`, nen khong bat buoc cho Phase 1.

## Cach Deploy Mien Phi

Lua chon mien phi phu hop:

- GitHub Pages
- Netlify free
- Vercel free
- Cloudflare Pages free

Vi day la static app, ban chi can upload/deploy cac file:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `service-worker.js`
- `icon.svg`

## Luu Y Khi Chia Se

Moi nguoi se co planner rieng cua ho.

Vi Phase 1 dang dung `localStorage`:

- Ban be/nguoi than khong thay data cua ban.
- Moi thiet bi co data rieng.
- Neu xoa browser data thi mat data.
- Chua co sync giua mobile va laptop.

Phase sau neu muon sync mien phi co the can:

- Supabase free tier.
- Firebase free tier.
- Hoac tiep tuc local-first va them export/import JSON.
