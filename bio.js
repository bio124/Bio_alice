/*!
 * Streamer-Bio – Ein-Zeilen-Embed
 * Einbindung: <script src="https://DEINNAME.github.io/bio/bio.js" defer></script>
 *
 * Optional: Ziel-Container per data-target="#mein-container" auf dem Script-Tag.
 * Ohne data-target wird die Bio direkt hinter dem Script-Tag eingefügt.
 */
(function () {
  'use strict';

  /* ==========================================================
   *  HIER ANPASSEN
   * ========================================================== */
  var CONFIG = {
    name: '___',

    // Profilbild (optional, leer lassen für Initialen)
    avatar: 'images/profilepicture.png',

    // Absätze der Beschreibung
    description: [
      'I`m kind and a little shy, so I dont open up right awaybut with me, there`s always something to talk about, laugh about, or just sit in silence.', 
      'I love the coziness of home, heartfelt conversations, and that special warmth that develops between people when they don`t have to pretend.'
      
    ],

    // Bilder: Pfade relativ zur bio.js ODER komplette URLs
    images: [
      { src: 'images/bild1.jpg', alt: 'Beschreibung Bild 1' },
      { src: 'images/bild2.jpg', alt: 'Beschreibung Bild 2' },
      { src: 'images/bild3.jpg', alt: 'Beschreibung Bild 3' }
    ],

    // Chatregeln
    rulesTitle: 'Chatrules',
    rules: [
      { title: 'Don`t record video from your screen'},
      { title: 'No spaming' },
      { title: 'Don`t ask for anything for free'},
      { title: 'Be kind and respectful to everyone'},
    ],

     // Wishlist (zwei Punkte, je mit Bild). url ist optional: ohne url ist die Karte nicht klickbar.
    wishlistTitle: 'Wishlist',
    wishlist: [
      { title: 'dream home', text: 'I want to move to my cozy dream home next to the sea.', image: 'images/home.png', url: '' },
      { title: 'making you happy', text: 'I want you to have a wonderful time beeing in my Chatroom.', image: 'images/happy.svg', url: '' }
    ],

    // Farben & Look
    theme: {
      accent: '#ff6fae',
      background: '#fff0f7',
      card: '#ffffff',
      text: '#5a2a45',
      muted: '#9a6b83',
      radius: '24px'
    },

    // Eiffelturm im Hintergrund: true = an, false = aus
    eiffelTower: true
  };
  /* ========================================================== */

  var script = document.currentScript;
  var scriptBase = script && script.src ? script.src : location.href;

  function resolve(src) {
    try { return new URL(src, scriptBase).href; } catch (e) { return src; }
  }

  // Kleiner DOM-Helper (nutzt textContent, kein innerHTML -> sicher)
  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') el.className = attrs[k];
        else if (k === 'text') el.textContent = attrs[k];
        else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]);
        else el.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) el.appendChild(c); });
    return el;
  }

  var t = CONFIG.theme;
  var css = '\n' +
    ':host{display:block;all:initial;display:block;}\n' +
    '*{box-sizing:border-box;}\n' +
    '.bio{--accent:' + t.accent + ';--bg:' + t.background + ';--card:' + t.card + ';--text:' + t.text + ';--muted:' + t.muted + ';--r:' + t.radius + ';' +
      'font-family:ui-rounded,"SF Pro Rounded","Nunito","Quicksand","Segoe UI",system-ui,-apple-system,Roboto,Helvetica,Arial,sans-serif;color:var(--text);' +
      'background:linear-gradient(160deg,#fff0f7 0%,#ffe3f1 50%,#f3e6ff 100%);border:2px solid #ffd0e6;box-shadow:0 10px 40px rgba(255,111,174,.18);' +
      'max-width:760px;margin:0 auto;padding:32px 20px 40px;border-radius:var(--r);line-height:1.6;position:relative;overflow:hidden;isolation:isolate;}\n' +
    '.bio > *{position:relative;z-index:1;}\n' +
    '.bio > .eiffel{position:absolute;left:0;top:0;width:100%;height:100%;z-index:0;color:var(--accent);opacity:.14;pointer-events:none;}\n' +
    '.head{display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;margin-bottom:24px;}\n' +
    '.avatar{width:112px;height:112px;border-radius:50%;object-fit:cover;border:4px solid #fff;box-shadow:0 0 0 4px var(--accent),0 0 0 10px rgba(255,111,174,.18);}\n' +
    '.initials{width:112px;height:112px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700;color:var(--accent);background:var(--card);border:4px solid #fff;box-shadow:0 0 0 4px var(--accent),0 0 0 10px rgba(255,111,174,.18);}\n' +
    'h1{margin:16px 0 0;font-size:30px;line-height:1.2;font-weight:800;background:linear-gradient(90deg,#ff6fae,#c77dff);-webkit-background-clip:text;background-clip:text;color:transparent;}\n' +
    'h1::before{content:"✿ ";}\n' +
    'h1::after{content:" ✿";}\n' +
    '.tag{margin:0;color:var(--muted);font-size:15px;}\n' +
    'h2{font-size:18px;margin:0 0 14px;display:flex;align-items:center;gap:10px;}\n' +
    'h2::before{content:"♥";color:var(--accent);font-size:16px;}\n' +
    'h2::after{content:"✦";color:#c77dff;font-size:13px;}\n' +
    'section{margin-top:32px;}\n' +
    '.desc p{margin:0 0 12px;}\n' +
    '.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;}\n' +
    '.thumb{padding:0;border:4px solid #fff;background:var(--card);border-radius:20px;overflow:hidden;aspect-ratio:4/3;display:block;box-shadow:0 4px 14px rgba(255,111,174,.2);transition:transform .2s,box-shadow .2s;}\n' +
    '.thumb:hover{transform:translateY(-3px) rotate(-1deg);box-shadow:0 10px 24px rgba(255,111,174,.4);}\n' +
    '.thumb img{width:100%;height:100%;object-fit:cover;display:block;}\n' +
    'details{background:var(--card);border:2px solid #ffd0e6;border-radius:20px;margin-bottom:12px;overflow:hidden;box-shadow:0 4px 14px rgba(255,111,174,.12);}\n' +
    'details[open]{border-color:var(--accent);}\n' +
    'summary{cursor:pointer;list-style:none;padding:14px 16px;font-weight:600;display:flex;align-items:center;gap:12px;}\n' +
    'summary::-webkit-details-marker{display:none;}\n' +
    'summary:focus-visible{outline:2px solid var(--accent);outline-offset:-2px;}\n' +
    '.num{flex:none;width:26px;height:26px;border-radius:50%;background:var(--accent);color:#fff;font-size:13px;display:flex;align-items:center;justify-content:center;}\n' +
    '.chev{margin-left:auto;transition:transform .2s;color:var(--muted);}\n' +
    'details[open] .chev{transform:rotate(90deg);}\n' +
    '.rule-text{padding:0 16px 16px 54px;margin:0;color:var(--muted);}\n' +
    '.rule-static{background:var(--card);border:2px solid #ffd0e6;border-radius:20px;margin-bottom:12px;box-shadow:0 4px 14px rgba(255,111,174,.12);padding:14px 16px;font-weight:600;display:flex;align-items:center;gap:12px;}\n' +
    '.wishes{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}\n' +
    '.wish{display:block;background:var(--card);border:2px solid #ffd0e6;border-radius:20px;overflow:hidden;color:inherit;text-decoration:none;box-shadow:0 4px 14px rgba(255,111,174,.12);transition:transform .2s,box-shadow .2s;}\n' +
    'a.wish:hover,a.wish:focus-visible{transform:translateY(-3px);box-shadow:0 10px 24px rgba(255,111,174,.35);border-color:var(--accent);outline:none;}\n' +
    '.wish img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;}\n' +
    '.wish-body{padding:12px 14px 16px;}\n' +
    '.wish-title{margin:0 0 4px;font-weight:700;display:flex;align-items:center;gap:6px;}\n' +
    '.wish-title::before{content:"♥";color:var(--accent);font-size:14px;}\n' +
    '.wish-text{margin:0;color:var(--muted);font-size:14px;}\n' +
    '@media (max-width:480px){.gallery{grid-template-columns:repeat(2,1fr);}.rule-text{padding-left:16px;}.wishes{gap:10px;}.wish-body{padding:10px 10px 14px;}}\n' +
    '@media (prefers-reduced-motion:reduce){*{transition:none!important;}}\n';

  // Eiffelturm als SVG-Silhouette (komplett im Code, keine Bilddatei nötig)
  function eiffelTower() {
    var NS = 'http://www.w3.org/2000/svg';
    function s(tag, attrs) {
      var el = document.createElementNS(NS, tag);
      Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
      return el;
    }
    var svg = s('svg', {
      class: 'eiffel', viewBox: '0 0 200 400', preserveAspectRatio: 'xMidYMax meet',
      fill: 'currentColor', 'aria-hidden': 'true', focusable: 'false'
    });

    // Silhouette mit ausgeschnittenem Bogen zwischen den Beinen
    svg.appendChild(s('path', {
      'fill-rule': 'evenodd',
      d: 'M100,10 Q96,60 91,95 Q86,150 78,190 Q66,240 58,290 Q40,340 25,390 L175,390 ' +
         'Q160,340 142,290 Q134,240 122,190 Q114,150 109,95 Q104,60 100,10 Z ' +
         'M50,390 Q52,324 100,318 Q148,324 150,390 Z'
    }));

    // Plattformen und Spitze
    svg.appendChild(s('rect', { x: 86, y: 92, width: 28, height: 4 }));
    svg.appendChild(s('rect', { x: 72, y: 187, width: 56, height: 5 }));
    svg.appendChild(s('rect', { x: 52, y: 287, width: 96, height: 6 }));
    svg.appendChild(s('line', { x1: 100, y1: 0, x2: 100, y2: 14, stroke: 'currentColor', 'stroke-width': 1.4 }));

    // Fachwerk-Streben (helle Linien über der Silhouette)
    var braces = [
      'M93,98 L107,145 M107,98 L93,145',
      'M88,150 L112,188 M112,150 L88,188',
      'M80,196 L120,240 M120,196 L80,240',
      'M74,246 L126,286 M126,246 L74,286'
    ];
    braces.forEach(function (d) {
      svg.appendChild(s('path', { d: d, fill: 'none', stroke: '#fff', 'stroke-width': 1.2, 'stroke-opacity': 0.7 }));
    });
    return svg;
  }

  function build() {
    var host = h('div', { 'data-streamer-bio': '' });
    var root = host.attachShadow({ mode: 'open' });
    root.appendChild(h('style', { text: css }));

    var wrap = h('div', { class: 'bio' });

    // Eiffelturm-Hintergrund (an/aus über CONFIG.eiffelTower)
    if (CONFIG.eiffelTower) wrap.appendChild(eiffelTower());

    // Kopfbereich
    var avatarEl = CONFIG.avatar
      ? h('img', { class: 'avatar', src: resolve(CONFIG.avatar), alt: CONFIG.name })
      : h('div', { class: 'initials', text: CONFIG.name.slice(0, 2).toUpperCase() });
    wrap.appendChild(h('header', { class: 'head' }, [
      avatarEl,
      h('h1', { text: CONFIG.name }),
      CONFIG.tagline ? h('p', { class: 'tag', text: CONFIG.tagline }) : null
    ]));

    // Beschreibung
    if (CONFIG.description && CONFIG.description.length) {
      wrap.appendChild(h('section', { class: 'desc' },
        [h('h2', { text: 'About me' })].concat(
          CONFIG.description.map(function (p) { return h('p', { text: p }); })
        )));
    }

    // Galerie
    var images = (CONFIG.images || []).map(function (i) {
      return { src: resolve(i.src), alt: i.alt || '' };
    });
    if (images.length) {
      var gallery = h('div', { class: 'gallery' }, images.map(function (img) {
        return h('div', { class: 'thumb' },
          [h('img', { src: img.src, alt: img.alt, loading: 'lazy' })]);
      }));
      wrap.appendChild(h('section', null, [gallery]));
    }

    // Chatregeln
    if (CONFIG.rules && CONFIG.rules.length) {
      var rules = CONFIG.rules.map(function (r, i) {
        // Regel ohne Text: einfache Karte ohne Aufklappen
        if (!r.text) {
          return h('div', { class: 'rule-static' }, [
            h('span', { class: 'num', text: String(i + 1) }),
            h('span', { text: r.title })
          ]);
        }
        return h('details', null, [
          h('summary', null, [
            h('span', { class: 'num', text: String(i + 1) }),
            h('span', { text: r.title }),
            h('span', { class: 'chev', text: '›', 'aria-hidden': 'true' })
          ]),
          h('p', { class: 'rule-text', text: r.text })
        ]);
      });
      wrap.appendChild(h('section', null, [h('h2', { text: CONFIG.rulesTitle || 'Chatregeln' })].concat(rules)));
    }

    // Wishlist
    if (CONFIG.wishlist && CONFIG.wishlist.length) {
      var wishes = CONFIG.wishlist.map(function (w) {
        var inner = [
          h('img', { src: resolve(w.image), alt: w.title, loading: 'lazy' }),
          h('div', { class: 'wish-body' }, [
            h('p', { class: 'wish-title', text: w.title }),
            w.text ? h('p', { class: 'wish-text', text: w.text }) : null
          ])
        ];
        // Nur http(s)-Links zulassen
        if (w.url && /^https?:\/\//i.test(w.url)) {
          return h('a', { class: 'wish', href: w.url, target: '_blank', rel: 'noopener noreferrer' }, inner);
        }
        return h('div', { class: 'wish' }, inner);
      });
      wrap.appendChild(h('section', null, [
        h('h2', { text: CONFIG.wishlistTitle || 'Wishlist' }),
        h('div', { class: 'wishes' }, wishes)
      ]));
    }

    root.appendChild(wrap);
    return host;
  }

  function mount() {
    var host = build();
    var targetSel = script && script.getAttribute('data-target');
    var target = targetSel ? document.querySelector(targetSel) : null;
    if (target) target.appendChild(host);
    else if (script && script.parentNode) script.parentNode.insertBefore(host, script.nextSibling);
    else document.body.appendChild(host);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
