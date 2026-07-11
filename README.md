# Trichy Photographer — Premium Wedding Photography Website

A luxury, cinematic, fully responsive multi-page website built with **plain HTML, CSS & vanilla JavaScript** (no frameworks). Ready to deploy on **GitHub Pages**.

**Theme:** Black `#000000` + Gold `#D4AF37` · **Fonts:** Playfair Display · Great Vibes · Poppins

---

## 📁 Folder Structure

```
Trichyphotograhper/
├── index.html          # Home
├── about.html          # About
├── services.html       # Services
├── portfolio.html      # Portfolio (filter + lightbox)
├── contact.html        # Contact (form + map)
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # All interactions
└── images/
    └── logo.png        # Brand logo (gold on black)
```

## ✨ Features

- Transparent header that turns black on scroll (sticky) + mobile hamburger menu
- Full-screen cinematic hero with CTA buttons
- Scroll fade-in animations, hover glow, image zoom effects
- Services cards with icons & photos
- Masonry portfolio with category filter + full-screen lightbox (keyboard + swipe nav)
- Auto-playing testimonials slider
- Contact form that sends enquiries straight to **WhatsApp** (+91 78451 17177)
- Floating WhatsApp button + embedded Google Map
- Fully responsive (desktop / tablet / mobile)

## 🚀 Deploy to GitHub Pages

1. Create a new GitHub repository and push these files.
   ```bash
   git init
   git add .
   git commit -m "Trichy Photographer website"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment**.
3. Set **Source: Deploy from a branch**, **Branch: `main`**, **Folder: `/ (root)`**, then **Save**.
4. Your site goes live at `https://<username>.github.io/<repo>/`.

## 🛠 Customisation

- **Phone / WhatsApp:** search & replace `917845117177` across all files.
- **Social links:** update the Instagram/Facebook URLs in the footer.
- **Colours & fonts:** edit the `:root` variables at the top of `css/style.css`.
- **Photos:** portfolio/hero images use free Unsplash URLs — replace the `src`/`data-full`
  values (and `background-image`) with your own images in the `images/` folder for real client work.

---

© Trichy Photographer · Capturing Timeless Memories
