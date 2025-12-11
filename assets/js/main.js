// Enhanced JS: injects header/footer, favicons, manifest, JSON-LD for SEO, improved hero rotation and lazy-loading

document.addEventListener('DOMContentLoaded', function(){
  injectHeadMeta();
  injectHeader();
  injectFooter();
  initHero();
  initThumbs();
  initForms();
  enableLazyImages();
});

async function logoExists(path){
  try{ const res = await fetch(path, { method: 'HEAD' }); return res.ok; }catch(e){ return false; }
}

function injectHeadMeta(){
  // favicon using SVG logo (modern browsers)
  const head = document.head;
  const linkIcon = document.createElement('link');
  linkIcon.setAttribute('rel','icon');
  linkIcon.setAttribute('href','assets/images/logo.svg');
  head.appendChild(linkIcon);

  const metaTheme = document.createElement('meta');
  metaTheme.setAttribute('name','theme-color');
  metaTheme.setAttribute('content','#d4af37');
  head.appendChild(metaTheme);

  // manifest
  const manifestLink = document.createElement('link');
  manifestLink.setAttribute('rel','manifest');
  manifestLink.setAttribute('href','/assets/manifest.json');
  head.appendChild(manifestLink);

  // JSON-LD Organization (use your custom domain once configured)
  const ld = {
    "@context":"https://schema.org",
    "@type":"Organization",
    "name":"Elrevo",
    "url":"https://elrevo.com/",
    "logo":"https://elrevo.com/assets/images/logo.svg"
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(ld);
  head.appendChild(script);
}

async function getLogoHTML(){
  const logoPath = 'assets/images/logo.svg';
  if(await logoExists(logoPath)){
    return `<a href="index.html" class="brand"><img src="${logoPath}" alt="Elrevo"></a>`;
  }
  return `<a href="index.html" class="brand" style="text-decoration:none;color:inherit;">Elrevo</a>`;
}

async function injectHeader(){
  const header = document.getElementById('site-header');
  const logoHTML = await getLogoHTML();

  header.innerHTML = `
    <div class="header-inner">
      ${logoHTML}
      <nav class="nav" aria-label="Main navigation">
        <a href="collections.html">Collections</a>
        <a href="lookbook.html">Lookbook</a>
        <a href="shop.html">Shop</a>
        <a href="blog.html">Journal</a>
        <a href="contact.html">Contact</a>
      </nav>
      <div class="header-actions">
        <a href="shop.html" title="Cart" aria-label="Cart">Cart</a>
      </div>
    </div>
  `;
}

async function injectFooter(){
  const footer = document.getElementById('site-footer');
  const logoPath = 'assets/images/logo.svg';
  let logoMarkup = `<div style="font-weight:700;margin-bottom:.6rem;color:var(--text)">Elrevo</div>`;

  if(await logoExists(logoPath)){
    logoMarkup = `<div style="margin-bottom:.6rem"><img src="${logoPath}" alt="Elrevo" style="height:32px"></div>`;
  }

  footer.innerHTML = `
    <div class="site-footer">
      <div class="footer-inner">
        <div>
          ${logoMarkup}
          <p style="max-width:30ch;color:var(--muted)">Elegant Revolution in Fashion — crafted pieces, mindful production.</p>
        </div>
        <div>
          <div style="font-weight:700;margin-bottom:.6rem">Explore</div>
          <a href="collections.html">Collections</a><br>
          <a href="shop.html">Shop</a><br>
          <a href="lookbook.html">Lookbook</a>
        </div>
        <div>
          <div style="font-weight:700;margin-bottom:.6rem">Company</div>
          <a href="about.html">About</a><br>
          <a href="careers.html">Careers</a><br>
          <a href="terms.html">Terms</a>
        </div>
      </div>
    </div>
  `;
}

/* Improved hero rotation with reduced motion respect */
function initHero(){
  const hero = document.getElementById('hero');
  if(!hero) return;
  const slides = Array.from(hero.querySelectorAll('.hero-slide'));
  let idx = 0;
  slides.forEach((s,i) => { s.style.opacity = i===0 ? 1 : 0; s.style.transition = 'opacity 900ms'; });
  if(slides.length < 2) return;
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduce) return;
  setInterval(()=>{ slides[idx].style.opacity = 0; idx = (idx+1) % slides.length; slides[idx].style.opacity = 1; },5000);
}

/* Thumbs switch main product photo */
function initThumbs(){
  const thumbs = document.querySelectorAll('.thumbs img');
  const main = document.getElementById('main-photo');
  if(!thumbs.length || !main) return;
  thumbs.forEach(t=>{ t.addEventListener('click',()=>{ main.src = t.src; main.classList.add('fade'); setTimeout(()=>main.classList.remove('fade'),300); }); });
}

/* Basic client-side form feedback */
function initForms(){
  const contactForm = document.getElementById('contact-form');
  if(contactForm){ contactForm.addEventListener('submit', (e)=>{ e.preventDefault(); alert('Thanks — message sent (demo only). Integrate with server to enable real submissions.'); contactForm.reset(); }); }

  const addToCart = document.getElementById('add-to-cart');
  if(addToCart){ addToCart.addEventListener('submit',(e)=>{ e.preventDefault(); const fd = new FormData(addToCart); if(!fd.get('size') || !fd.get('color')){ alert('Please choose size and color'); return; } alert('Added to cart (demo). Integrate with cart backend for full checkout.'); }); }
}

/* Lazy-load images with loading="lazy" where possible */
function enableLazyImages(){
  document.querySelectorAll('img').forEach(img => { if(!img.hasAttribute('loading')) img.setAttribute('loading','lazy'); });
}
