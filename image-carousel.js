/**
 * <image-carousel> — automatische Bild-Galerie mit sanftem Slide.
 *
 * Findet die Bilder selbst: probiert im angegebenen Ordner der Reihe nach
 * 01, 02, 03 … (als .jpg/.jpeg/.png/.webp) und nimmt alles auf, was existiert.
 * Neues Bild hinzufuegen = einfach die naechste Nummer in den Ordner legen,
 * kein Code noetig. Einzelne Luecken (bis zu 2) werden toleriert.
 *
 * - Wechselt automatisch in Intervallen (sanfter horizontaler Slide, Endlos).
 * - Bei Maus-Hover erscheinen Pfeile links/rechts; der Auto-Wechsel pausiert.
 * - Punkte am unteren Rand zeigen die Position und sind klickbar.
 * - Genau ein Bild => statische Anzeige ohne Pfeile/Auto-Wechsel.
 *
 * Attribute:
 *   folder    Ordner mit den Bildern.            (default 'assets/gallery')
 *   radius    Eckenradius in px.                 (default 16)
 *   interval  Auto-Wechsel-Intervall in ms.      (default 5000)
 *   max       Hoechste geprobte Nummer.          (default 30)
 *
 * Groesse kommt wie ueblich per CSS aufs Element (width/height inline).
 */
(() => {
  const EXTS = ['jpg', 'jpeg', 'png', 'webp'];
  const MISS_STOP = 3; // nach so vielen fehlenden Nummern in Folge abbrechen
  const SLIDE_MS = 1100; // Dauer des Slide-Uebergangs — MUSS zur CSS-Transition passen

  const pad = (n) => (n < 10 ? '0' + n : '' + n);

  // Existenz per HEAD + no-store pruefen: winzig (kein Body), und vor allem
  // wird ein fehlendes Bild NICHT negativ gecacht — ein spaeter zugefuegtes
  // Foto erscheint so ohne Hard-Reload. Das angezeigte <img> nutzt danach die
  // schlichte URL und wird normal gecacht.
  function probe(url) {
    return fetch(url, { method: 'HEAD', cache: 'no-store' })
      .then((r) => r.ok)
      .catch(() => false);
  }

  // Ordner nach NN.ext absuchen. Serielle Probe: klein (wenige Bilder) und die
  // Reihenfolge bleibt stabil. Bricht nach MISS_STOP leeren Nummern ab.
  async function discover(folder, max) {
    const found = [];
    let misses = 0;
    for (let n = 1; n <= max && misses < MISS_STOP; n++) {
      let hit = null;
      for (const e of EXTS) {
        const u = folder + '/' + pad(n) + '.' + e;
        if (await probe(u)) { hit = u; break; }
      }
      if (hit) { found.push(hit); misses = 0; } else { misses++; }
    }
    return found;
  }

  const css = (radius) =>
    // width/height:100% => das Element fuellt den vom Framework gesetzten
    // Wrapper-<div> (z. B. height:380px). Ohne das waechst es aufs
    // Bild-Seitenverhaeltnis und ueberlaeuft den Wrapper.
    ':host{display:block;position:relative;overflow:hidden;width:100%;height:100%;' +
    '  border-radius:' + radius + 'px;background:#1B1E26}' +
    '.track{display:flex;height:100%;width:100%;will-change:transform}' +
    // Langsames, ruhiges Gleiten.
    '.track.anim{transition:transform ' + (SLIDE_MS / 1000) + 's cubic-bezier(.4,0,.2,1)}' +
    '.slide{flex:0 0 100%;height:100%;position:relative}' +
    '.slide img{width:100%;height:100%;object-fit:cover;display:block;user-select:none;-webkit-user-drag:none}' +
    // Bedien-Ebene ueber den Bildern. WICHTIG: liegt NEBEN dem .track, nicht
    // darin — sonst wuerde das transform des .track (Slide) die Pfeile/Punkte
    // mitverschieben und aus dem Bild schieben. Selbst durchlaessig, nur die
    // Buttons fangen Klicks.
    '.overlay{position:absolute;inset:0;z-index:2;pointer-events:none}' +
    // Pfeile — nur bei Hover sichtbar (und per Fokus fuer Tastatur).
    '.nav{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;' +
    '  display:flex;align-items:center;justify-content:center;border:0;cursor:pointer;' +
    '  border-radius:50%;background:rgba(20,22,28,.55);color:#fff;backdrop-filter:blur(6px);' +
    '  opacity:0;transition:opacity .25s,background .2s;pointer-events:auto}' +
    '.nav:hover{background:rgba(20,22,28,.8)}' +
    '.nav.prev{left:14px}.nav.next{right:14px}' +
    '.nav svg{width:22px;height:22px}' +
    ':host(:hover) .nav,.nav:focus-visible{opacity:1}' +
    '.nav:focus-visible{outline:2px solid #F2B33D;outline-offset:2px}' +
    // Punkte
    '.dots{position:absolute;left:0;right:0;bottom:12px;display:flex;gap:7px;' +
    '  justify-content:center;pointer-events:auto}' +
    '.dot{width:8px;height:8px;border-radius:50%;border:0;padding:0;cursor:pointer;' +
    '  background:rgba(255,255,255,.4);transition:background .2s,transform .2s}' +
    '.dot.active{background:#F2B33D;transform:scale(1.25)}' +
    '.dot:focus-visible{outline:2px solid #F2B33D;outline-offset:2px}' +
    // sanfte Abdunklung unten fuer Punkt-Lesbarkeit
    '.scrim{position:absolute;left:0;right:0;bottom:0;height:64px;pointer-events:none;' +
    '  background:linear-gradient(to top,rgba(0,0,0,.35),transparent)}';

  const ARROW =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';

  class ImageCarousel extends HTMLElement {
    constructor() {
      super();
      this._root = this.attachShadow({ mode: 'open' });
      this._urls = [];
      this._index = 1;      // zeigt auf das erste echte Bild (Klon-Schema)
      this._animating = false;
      this._timer = null;
      this._built = false;
    }

    connectedCallback() {
      const radius = this.getAttribute('radius') || '16';
      this._interval = Math.max(1500, parseInt(this.getAttribute('interval'), 10) || 5000);
      this._max = Math.max(1, parseInt(this.getAttribute('max'), 10) || 30);
      const folder = this.getAttribute('folder') || 'assets/gallery';
      this._root.innerHTML = '<style>' + css(radius) + '</style><div class="track"></div>';
      this._track = this._root.querySelector('.track');
      // Auto-Wechsel bei Hover / verstecktem Tab pausieren.
      this.addEventListener('mouseenter', () => this._stop());
      this.addEventListener('mouseleave', () => this._start());
      this._visFn = () => (document.hidden ? this._stop() : this._start());
      document.addEventListener('visibilitychange', this._visFn);

      discover(folder, this._max).then((urls) => {
        this._urls = urls;
        this._build();
      });
    }

    disconnectedCallback() {
      this._stop();
      clearTimeout(this._settle);
      if (this._visFn) document.removeEventListener('visibilitychange', this._visFn);
    }

    _build() {
      const n = this._urls.length;
      if (this._built) return;
      this._built = true;
      if (n === 0) return;

      if (n === 1) {
        // Genau ein Bild: statisch, keine Steuerung — wie die alte Hero-Grafik.
        this._track.innerHTML = '<div class="slide"><img alt="" src="' + this._urls[0] + '"></div>';
        return;
      }

      // Endlos-Slide: Klon des letzten Bildes vorne, Klon des ersten hinten.
      // So laesst sich in beide Richtungen nahtlos durchlaufen.
      const order = [this._urls[n - 1], ...this._urls, this._urls[0]];
      this._track.innerHTML =
        order.map((u) => '<div class="slide"><img alt="" src="' + u + '"></div>').join('');

      // Bedienelemente in eine eigene Overlay-Ebene NEBEN den .track haengen,
      // damit sie vom Slide-transform nicht mitbewegt werden.
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.innerHTML =
        '<div class="scrim"></div>' +
        '<button class="nav prev" aria-label="Vorheriges Bild">' + ARROW + '</button>' +
        '<button class="nav next" aria-label="Naechstes Bild">' +
        ARROW.replace('M15 18l-6-6 6-6', 'M9 18l6-6-6-6') + '</button>' +
        '<div class="dots">' +
        this._urls.map((_, i) => '<button class="dot" data-i="' + i + '" ' +
          'aria-label="Bild ' + (i + 1) + '"></button>').join('') +
        '</div>';
      this._root.appendChild(overlay);

      this._index = 1;
      this._place(false);

      overlay.querySelector('.next').addEventListener('click', () => { this._go(1); this._restart(); });
      overlay.querySelector('.prev').addEventListener('click', () => { this._go(-1); this._restart(); });
      overlay.querySelectorAll('.dot').forEach((d) => {
        d.addEventListener('click', () => { this._toReal(parseInt(d.dataset.i, 10)); this._restart(); });
      });
      this._updateDots();
      this._start();
    }

    _place(animate) {
      if (animate) {
        this._track.classList.add('anim');
      } else {
        // Sprung ohne Transition: Klasse entfernen UND einen Reflow erzwingen,
        // sonst animiert der Browser den Ruecksprung sichtbar (Flackern durch
        // alle Bilder). void offsetWidth erzwingt das Neu-Layout dazwischen.
        this._track.classList.remove('anim');
        void this._track.offsetWidth;
      }
      this._track.style.transform = 'translateX(' + (-this._index * 100) + '%)';
    }

    _go(delta) {
      if (this._animating) return;
      const n = this._urls.length;
      if (n < 2) return;
      this._animating = true;
      this._index += delta;
      this._place(true);
      this._updateDots();
      this._scheduleSettle();
    }

    _toReal(realIdx) {
      // Punkt-Klick: direkt zum echten Bild (Index im Klon-Schema = real+1).
      if (this._animating) return;
      const target = realIdx + 1;
      if (target === this._index) return;
      this._animating = true;
      this._index = target;
      this._place(true);
      this._updateDots();
      this._scheduleSettle();
    }

    // Nach dem Slide aufraeumen — ZEITGESTEUERT statt per transitionend.
    // transitionend feuert nicht zuverlaessig (Hintergrund-Tab, verschluckte
    // Events) und liess das Karussell dann auf einem Klon haengen. Der Timer
    // greift immer, also bleibt nichts stehen und der Ruecksprung ist sauber.
    _scheduleSettle() {
      clearTimeout(this._settle);
      this._settle = setTimeout(() => this._onEnd(), SLIDE_MS + 60);
    }

    _onEnd() {
      const n = this._urls.length;
      // Auf einem Klon gelandet? Ohne Animation auf das echte Pendant springen.
      if (this._index === 0) { this._index = n; this._place(false); }
      else if (this._index === n + 1) { this._index = 1; this._place(false); }
      this._animating = false;
      this._updateDots();
    }

    _updateDots() {
      const n = this._urls.length;
      const real = ((this._index - 1) % n + n) % n;
      this._root.querySelectorAll('.dot').forEach((d, i) =>
        d.classList.toggle('active', i === real));
    }

    _start() {
      if (this._timer || this._urls.length < 2) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (document.hidden) return;
      this._timer = setInterval(() => this._go(1), this._interval);
    }

    _stop() {
      if (this._timer) { clearInterval(this._timer); this._timer = null; }
    }

    _restart() { this._stop(); this._start(); }
  }

  if (!customElements.get('image-carousel')) {
    customElements.define('image-carousel', ImageCarousel);
  }
})();
