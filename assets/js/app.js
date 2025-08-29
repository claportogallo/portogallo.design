let MODE = 'home';
let LAST_SECTION = null;
const tabsBox = document.getElementById('tabs');
const tabs = document.querySelectorAll('.vtab');
const gallery = document.getElementById('gallery');
const homeBtn = document.getElementById('homeBtn');
const contactTab = document.getElementById('contactTab');

const overlay = document.getElementById('overlay');
const overlayScroll = document.getElementById('overlayScroll');
const closeOverlayBtn = document.getElementById('closeOverlay');
const projectSheet = document.getElementById('projectSheet');
const contactSheet = document.getElementById('contactSheet');
const sheetMedia = document.getElementById('sheetMedia');
const sheetTitle = document.getElementById('sheetTitle');
const sheetDesc  = document.getElementById('sheetDesc');
const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
const preloader = document.getElementById('preloader');

/* ====== PRELOADER HARDENED (punto C) ====== */
let PRELOADER_DONE = false;
function endPreloader(){
  if (PRELOADER_DONE) return;
  PRELOADER_DONE = true;
  if (!preloader) return;
  preloader.classList.add('hide');
  setTimeout(()=> preloader.style.display='none', 500);
}
// chiusura sicura dopo il load della pagina
window.addEventListener('load', () => {
  setTimeout(() => { endPreloader(); revealGridStagger(); }, 600);
});
// ulteriore rete di sicurezza: chiudi comunque dopo 3.5s
setTimeout(() => { endPreloader(); }, 3500);
/* ========================================== */

// Rivela le card visibili con uno "stagger"
function revealGridStagger(){
  const cards = Array.from(gallery.querySelectorAll('.card'))
    .filter(c => c.style.display !== 'none');
  cards.forEach((c,i) => {
    c.classList.remove('is-in');
    setTimeout(()=> { c.classList.add('is-in'); }, 40 + i*70);
  });
}

/* === A D D E D : overlay titolo/meta sulle card in hover ===
   - usa PROJECTS_KEYED per il titolo
   - legge luogo/data da data-meta sulla card (facoltativo) */
function injectCardOverlays(){
  if (!gallery) return;
  const cards = gallery.querySelectorAll('.card');
  cards.forEach(card => {
    if (card.querySelector('.mask')) return; // già creata
    const img = card.querySelector('img');
    const key = (img?.getAttribute('alt') || '').toLowerCase(); // "a","b",...
    const data = window.PROJECTS_KEYED ? window.PROJECTS_KEYED[key] : null;
    const title = data?.title || '';
    const meta = card.getAttribute('data-meta') || '';
    const mask = document.createElement('div');
    mask.className = 'mask';
    mask.innerHTML = `
      <div class="txt">
        <div class="title">${title}</div>
        ${meta ? `<div class="meta">${meta}</div>` : ``}
      </div>
    `;
    card.appendChild(mask);
  });
}

const bzTop = document.getElementById('bzTop');
const bzLeft = document.getElementById('bzLeft');
const bzRight = document.getElementById('bzRight');

// dot scrollbar (bound to overlayScroll)
const scrollDots = document.getElementById('scrollDots');
const DOTS = 24;
let currentDot = Math.floor(DOTS/2);
function buildDots(){
  scrollDots.innerHTML = '';
  for (let i=0;i<DOTS;i++){ const li=document.createElement('li'); if(i===currentDot) li.classList.add('active'); scrollDots.appendChild(li); }
}
function setDotByProgress(progress){
  const idx = Math.max(0, Math.min(DOTS-1, Math.round(progress*(DOTS-1))));
  if (idx === currentDot) return;
  scrollDots.children[currentDot].classList.remove('active');
  scrollDots.children[idx].classList.add('active');
  currentDot = idx;
}
buildDots();

function setMode(newMode){
  MODE = newMode;
  document.body.classList.remove('mode-home','mode-section','mode-project','mode-contact');
  if (MODE === 'home'){
    document.body.classList.add('mode-home');
    tabsBox.classList.remove('compact');
    tabs.forEach(t => t.classList.remove('active'));
    filterCards(null);
    hideOverlay();
    // refresh overlay testi/meta in home
    injectCardOverlays();
    // rientro a cascata
    setTimeout(revealGridStagger, 40);
  } else if (MODE === 'section'){
    document.body.classList.add('mode-section');
    tabsBox.classList.add('compact');
    projectSheet.classList.add('hidden');
    contactSheet.classList.add('hidden');
    hideOverlay();
  } else if (MODE === 'project'){
    document.body.classList.add('mode-project');
    // force all tabs compact (no active)
    tabs.forEach(x => x.classList.remove('active'));
    tabsBox.classList.add('compact');
    overlay.classList.remove('hidden'); overlay.setAttribute('aria-hidden','false');
    projectSheet.classList.remove('hidden'); contactSheet.classList.add('hidden');
    currentDot = Math.floor(DOTS/2); buildDots();
    overlayScroll.scrollTop = 0;
  } else if (MODE === 'contact'){
    document.body.classList.add('mode-contact');
    tabsBox.classList.add('compact');
    overlay.classList.remove('hidden'); overlay.setAttribute('aria-hidden','false');
    contactSheet.classList.remove('hidden'); projectSheet.classList.add('hidden');
    currentDot = Math.floor(DOTS/2); buildDots();
    overlayScroll.scrollTop = 0;
  }
}
function hideOverlay(){ overlay.classList.add('hidden'); overlay.setAttribute('aria-hidden','true'); }

function filterCards(cat){
  const cards = gallery.querySelectorAll('.card');
  cards.forEach(card => {
    if (!cat){ card.classList.remove('hide'); card.style.display=''; card.classList.add('show'); setTimeout(()=>card.classList.remove('show'),260); }
    else { const cats=(card.dataset.cats||'').split(' '); const visible=cats.includes(cat);
      if (visible){ card.classList.remove('hide'); card.style.display=''; card.classList.add('show'); setTimeout(()=>card.classList.remove('show'),260); }
      else { card.classList.add('hide'); setTimeout(()=>{ card.style.display='none'; },200); }
    }
  });
  // dopo ogni filtraggio: assicura overlay presenti e rivelazione a cascata
  injectCardOverlays();
  revealGridStagger();
}

function stepBack(){
  if (MODE === 'project'){ setMode('section'); return; }
  if (MODE === 'contact'){ if (LAST_SECTION){ setMode('section'); } else { setMode('home'); } return; }
  if (MODE === 'section'){ setMode('home'); return; }
}

// Tabs
tabs.forEach(t => t.addEventListener('click', () => {
  const cat = t.dataset.filter;
  if (MODE === 'project' || MODE === 'contact') hideOverlay();
  if (cat === 'about'){ openProject(PROJECTS['About me']); return; }
  tabs.forEach(x => x.classList.remove('active'));
  t.classList.add('active');
  LAST_SECTION = cat;
  setMode('section');
  filterCards(cat);
}));

// Contatti
contactTab.addEventListener('click', (e)=>{ e.preventDefault(); setMode('contact'); });

// Home/logo
homeBtn.addEventListener('click', e => {
  e.preventDefault();
  LAST_SECTION=null;
  setMode('home');
});

// Open project
function openProject(data){
  sheetTitle.textContent = data.title || 'Progetto';
  sheetDesc.textContent  = data.desc || '';
  sheetMedia.innerHTML = '';

  const imgs = Array.isArray(data.images) ? data.images : [];
  imgs.forEach(src => {
    const im = new Image();
    im.loading = 'eager';          // evita lazy e glitch su iOS
    im.decoding = 'async';
    im.src = src;
    im.addEventListener('load', () => {
      im.classList.add('is-ready'); // ora può mostrare bordo + opacità
    });
    sheetMedia.appendChild(im);
  });

  setMode('project');
}

// close
function closeProject(){ hideOverlay(); }
closeOverlayBtn.addEventListener('click', closeProject);
document.addEventListener('keydown', e=>{ if(e.key==='Escape') stepBack(); });

// backzones click
[bzTop, bzLeft, bzRight].forEach(el => el.addEventListener('click', stepBack));

// cards -> project
gallery.querySelectorAll('.card').forEach(card => {
  const img = card.querySelector('img');
  card.addEventListener('click', ()=>{
    const alt = img.getAttribute('alt');
    const key = alt.toLowerCase();
    const data = window.PROJECTS_KEYED[key] || {};
    openProject(data);
  });
});

// dot scrollbar on inner scroller
overlayScroll.addEventListener('scroll', () => {
  const max = overlayScroll.scrollHeight - overlayScroll.clientHeight;
  if (max <= 0) return;
  const progress = overlayScroll.scrollTop / max;
  setDotByProgress(progress);
});

setMode('home');

// preloader + rivelazione iniziale griglia
document.addEventListener('DOMContentLoaded', () => {
  // crea overlay titoli/meta sulle card dopo che il DOM è pronto
  injectCardOverlays();
  setTimeout(() => {
    endPreloader();
    revealGridStagger();
  }, 3000);
});

// Touch: mostra overlay per ~1s al tap senza aprire il progetto
(function(){
  if (!('ontouchstart' in window)) return;
  const cards = gallery ? gallery.querySelectorAll('.card') : [];
  cards.forEach(card => {
    let hoverTimer = null;
    card.addEventListener('touchstart', () => {
      if (MODE !== 'home' && MODE !== 'section') return;
      card.classList.add('touchshow');
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(()=> card.classList.remove('touchshow'), 1000);
    }, {passive:true});
  });
})();
