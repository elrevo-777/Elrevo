# Elrevo — Elegant Revolution (Static frontend)

This repository contains a premium-looking static frontend for Elrevo built with HTML, CSS and JavaScript. It is intentionally simple so it can be integrated with any backend, e-commerce platform, or headless CMS.

Included pages:
- index.html (Home)
- about.html
- collections.html
- lookbook.html
- shop.html
- product.html (product detail template)
- blog.html
- contact.html
- careers.html
- terms.html

Assets:
- assets/css/styles.css
- assets/js/main.js
- assets/images/logo.svg

How to use:
1. Create the folder structure and files shown in this repo (see instructions below).
2. Serve locally using any static server:
   - Python 3: `python -m http.server 8000`
   - Node: `npx serve` or `npx http-server`
3. Replace placeholder images with your own assets (images use Unsplash links).
4. Integrate forms and cart with your backend or e-commerce provider (Shopify, Snipcart, Stripe + custom API, etc).

Quick customization notes:
- To change the logo size, edit `.brand img{height:36px}` in assets/css/styles.css.
- To inline the SVG instead of using <img>, update assets/js/main.js getLogoHTML to return the SVG markup.
- Use responsive images (`srcset`) or an image CDN to reduce bandwidth.
- Minify CSS/JS for production and add cache-busting filenames (e.g., main.abc123.css).

Deployment to GitHub Pages:
- Commit and push all files to the `main` branch of your repo.
- In repo settings -> Pages, select `main` branch / `/ (root)` and save.
- Your site will be available at https://<your-username>.github.io/<repo-name>/ (or via custom domain if configured).

If you want, I can:
- Push these files into your GitHub repo (provide owner/repo and confirm).
- Convert to a static site generator (Next.js/Eleventy/Vite).
- Add a simple cart integration (Snipcart/Stripe demo).
- Add responsive `srcset` attributes and lazy-loading for images.


End of file list.
