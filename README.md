<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <title>Shibaraiders «SHIBA» — Alpha [Light]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    html,body{margin:0;padding:0;background:#1B1E26;}
    body{font-family:'Outfit',system-ui,sans-serif;color:#ECE9E2;-webkit-font-smoothing:antialiased;}
    a{color:inherit;}
    ::selection{background:#F2B33D;color:#1B1E26;}
    image-slot{display:block;width:100%;height:100%;}
  </style>
</helmet>

<div style="min-height:100vh;display:flex;flex-direction:column;background:#1B1E26;">

  <!-- ===== Header ===== -->
  <header style="position:sticky;top:0;z-index:50;background:rgba(27,30,38,.88);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.07);">
    <div style="max-width:1120px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;gap:16px;">
      <div onClick="{{ goHome }}" style="display:flex;align-items:center;gap:10px;cursor:pointer;">
        <img src="assets/crest.png" alt="Shibaraiders Wappen" style="width:36px;height:36px;border-radius:9px;display:block;">
        <div style="display:flex;flex-direction:column;line-height:1.05;">
          <span style="font-weight:700;font-size:16px;letter-spacing:.2px;">Shibaraiders</span>
          <span style="font-size:11px;color:#9AA0AE;font-weight:500;">«SHIBA» · Alpha [Light]</span>
        </div>
      </div>
      <nav style="margin-left:auto;display:flex;align-items:center;gap:4px;">
        <sc-for list="{{ nav }}" as="item" hint-placeholder-count="6">
          <button onClick="{{ item.onClick }}" style="{{ item.style }}" style-hover="color:#FFC556;">{{ item.label }}</button>
        </sc-for>
        <button onClick="{{ goJoin }}" style="margin-left:8px;background:#F2B33D;color:#1B1E26;border:none;border-radius:8px;padding:9px 16px;font:600 13.5px 'Outfit',sans-serif;cursor:pointer;" style-hover="background:#FFC556;">{{ t.navJoin }}</button>
        <div style="margin-left:10px;display:flex;border:1px solid rgba(255,255,255,.14);border-radius:8px;overflow:hidden;">
          <button onClick="{{ setDe }}" style="{{ langDeStyle }}">DE</button>
          <button onClick="{{ setEn }}" style="{{ langEnStyle }}">EN</button>
        </div>
      </nav>
    </div>
  </header>

  <main style="flex:1;">

    <!-- ===== Home ===== -->
    <sc-if value="{{ isHome }}" hint-placeholder-val="{{ true }}">
      <div data-screen-label="Home">
        <section style="max-width:1120px;margin:0 auto;padding:72px 24px 40px;display:flex;gap:56px;align-items:center;flex-wrap:wrap;">
          <div style="flex:1 1 480px;min-width:320px;">
            <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(242,179,61,.1);border:1px solid rgba(242,179,61,.3);color:#F2B33D;border-radius:999px;padding:6px 14px;font-size:12.5px;font-weight:600;letter-spacing:.4px;">{{ t.heroTag }}</div>
            <h1 style="margin:20px 0 0;font-size:56px;line-height:1.02;font-weight:800;letter-spacing:-1px;">Shibaraiders</h1>
            <p style="margin:14px 0 0;font-size:20px;color:#F2B33D;font-weight:600;">{{ t.slogan }}</p>
            <p style="margin:18px 0 0;font-size:16.5px;line-height:1.65;color:#B7BCC7;max-width:520px;">{{ t.heroText }}</p>
            <div style="display:flex;gap:12px;margin-top:30px;flex-wrap:wrap;">
              <a href="https://forms.gle/11biPUJ9rbXVqehk8" target="_blank" style="background:#F2B33D;color:#1B1E26;text-decoration:none;border-radius:10px;padding:14px 26px;font-weight:700;font-size:15.5px;" style-hover="background:#FFC556;">{{ t.ctaJoin }}</a>
              <a href="https://discord.gg/bGZE5mnKxV" target="_blank" style="background:#5865F2;color:#fff;text-decoration:none;border-radius:10px;padding:14px 26px;font-weight:600;font-size:15.5px;" style-hover="background:#6B77FF;">{{ t.ctaDiscord }}</a>
            </div>
          </div>
          <div style="flex:0 0 auto;">
            <img src="assets/crest.png" alt="Shibaraiders Wappen" style="width:300px;height:300px;display:block;filter:drop-shadow(0 24px 40px rgba(0,0,0,.5));">
          </div>
        </section>

        <section style="max-width:1120px;margin:0 auto;padding:8px 24px 48px;">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;">
            <sc-for list="{{ facts }}" as="f" hint-placeholder-count="4">
              <div style="background:#252935;border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:16px 18px;">
                <div style="font-size:11.5px;color:#9AA0AE;font-weight:600;letter-spacing:.6px;text-transform:uppercase;">{{ f.k }}</div>
                <div style="margin-top:5px;font-size:16px;font-weight:600;">{{ f.v }}</div>
              </div>
            </sc-for>
          </div>
        </section>

        <section style="max-width:1120px;margin:0 auto;padding:0 24px 80px;">
          <x-import component-from-global-scope="image-slot" from="./image-slot.js" id="fc-group" shape="rounded" radius="18" placeholder="{{ t.groupPh }}" style="width:100%;height:380px;display:block;" hint-size="100%,380px"></x-import>
        </section>
      </div>
    </sc-if>

    <!-- ===== About ===== -->
    <sc-if value="{{ isAbout }}" hint-placeholder-val="{{ false }}">
      <div data-screen-label="Über uns" style="max-width:1120px;margin:0 auto;padding:64px 24px 80px;">
        <h1 style="margin:0;font-size:40px;font-weight:800;letter-spacing:-.5px;">{{ t.aboutTitle }}</h1>
        <div style="display:flex;gap:40px;margin-top:28px;flex-wrap:wrap;">
          <div style="flex:1 1 460px;min-width:300px;">
            <p style="margin:0;font-size:17px;line-height:1.7;color:#C9CDD6;">{{ t.aboutP1 }}</p>
            <p style="margin:16px 0 0;font-size:17px;line-height:1.7;color:#C9CDD6;">{{ t.aboutP2 }}</p>
            <h2 style="margin:40px 0 10px;font-size:22px;font-weight:700;color:#F2B33D;">{{ t.techTitle }}</h2>
            <p style="margin:0;font-size:16px;line-height:1.7;color:#C9CDD6;">{{ t.techText }}</p>
            <h2 style="margin:40px 0 10px;font-size:22px;font-weight:700;color:#F2B33D;">{{ t.houseTitle }}</h2>
            <p style="margin:0;font-size:16px;line-height:1.7;color:#C9CDD6;">{{ t.houseText }}</p>
          </div>
          <div style="flex:1 1 380px;min-width:300px;display:flex;flex-direction:column;gap:16px;">
            <div style="background:#252935;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:22px 24px;display:flex;flex-direction:column;gap:12px;">
              <sc-for list="{{ fcData }}" as="d" hint-placeholder-count="5">
                <div style="display:flex;justify-content:space-between;gap:16px;font-size:14.5px;border-bottom:1px solid rgba(255,255,255,.05);padding-bottom:10px;">
                  <span style="color:#9AA0AE;">{{ d.k }}</span>
                  <span style="font-weight:600;text-align:right;">{{ d.v }}</span>
                </div>
              </sc-for>
              <a href="https://na.finalfantasyxiv.com/lodestone/freecompany/9279948507173621416/" target="_blank" style="color:#F2B33D;font-size:14px;font-weight:600;text-decoration:none;" style-hover="color:#FFC556;">{{ t.lodestoneLink }} →</a>
            </div>
            <x-import component-from-global-scope="image-slot" from="./image-slot.js" id="fc-house" shape="rounded" radius="14" placeholder="{{ t.housePh }}" style="width:100%;height:240px;display:block;" hint-size="100%,240px"></x-import>
          </div>
        </div>
      </div>
    </sc-if>

    <!-- ===== Activities ===== -->
    <sc-if value="{{ isAct }}" hint-placeholder-val="{{ false }}">
      <div data-screen-label="Aktivitäten" style="max-width:1120px;margin:0 auto;padding:64px 24px 80px;">
        <h1 style="margin:0;font-size:40px;font-weight:800;letter-spacing:-.5px;">{{ t.actTitle }}</h1>
        <p style="margin:14px 0 0;font-size:17px;line-height:1.65;color:#B7BCC7;max-width:640px;">{{ t.actIntro }}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-top:36px;">
          <sc-for list="{{ acts }}" as="a" hint-placeholder-count="4">
            <div style="background:#252935;border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:26px;" style-hover="border-color:rgba(242,179,61,.4);">
              <div style="width:44px;height:44px;border-radius:12px;background:rgba(242,179,61,.12);color:#F2B33D;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;letter-spacing:.5px;">{{ a.tag }}</div>
              <h3 style="margin:16px 0 8px;font-size:19px;font-weight:700;">{{ a.title }}</h3>
              <p style="margin:0;font-size:14.5px;line-height:1.65;color:#B7BCC7;">{{ a.text }}</p>
            </div>
          </sc-for>
        </div>
      </div>
    </sc-if>

    <!-- ===== Rules ===== -->
    <sc-if value="{{ isRules }}" hint-placeholder-val="{{ false }}">
      <div data-screen-label="Regeln" style="max-width:820px;margin:0 auto;padding:64px 24px 80px;">
        <h1 style="margin:0;font-size:40px;font-weight:800;letter-spacing:-.5px;">{{ t.rulesTitle }}</h1>
        <p style="margin:14px 0 0;font-size:17px;line-height:1.65;color:#B7BCC7;">{{ t.rulesIntro }}</p>
        <div style="display:flex;flex-direction:column;gap:14px;margin-top:36px;">
          <sc-for list="{{ rules }}" as="r" hint-placeholder-count="6">
            <div style="display:flex;gap:20px;background:#252935;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:22px 24px;">
              <div style="flex:none;width:36px;height:36px;border-radius:10px;background:#F2B33D;color:#1B1E26;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;">{{ r.n }}</div>
              <div>
                <h3 style="margin:2px 0 6px;font-size:17px;font-weight:700;">{{ r.title }}</h3>
                <p style="margin:0;font-size:14.5px;line-height:1.6;color:#B7BCC7;">{{ r.text }}</p>
              </div>
            </div>
          </sc-for>
        </div>
      </div>
    </sc-if>

    <!-- ===== Members ===== -->
    <sc-if value="{{ isMembers }}" hint-placeholder-val="{{ false }}">
      <div data-screen-label="Mitglieder" style="max-width:1120px;margin:0 auto;padding:64px 24px 80px;">
        <h1 style="margin:0;font-size:40px;font-weight:800;letter-spacing:-.5px;">{{ t.membersTitle }}</h1>
        <p style="margin:14px 0 0;font-size:17px;line-height:1.65;color:#B7BCC7;max-width:640px;">{{ t.membersIntro }}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px;margin-top:36px;">
          <sc-for list="{{ members }}" as="m" hint-placeholder-count="4">
            <div style="background:#252935;border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;">
              <x-import component-from-global-scope="image-slot" from="./image-slot.js" id="{{ m.slot }}" src="{{ m.src }}" shape="circle" placeholder="Portrait" style="width:110px;height:110px;display:block;" hint-size="110px,110px"></x-import>
              <div>
                <div style="font-weight:700;font-size:17px;">{{ m.name }}</div>
                <div style="margin-top:5px;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;">
                  <span style="font-size:12.5px;color:#1B1E26;background:#F2B33D;border-radius:999px;padding:3px 10px;font-weight:700;">{{ m.rank }}</span>
                  <span style="font-size:12px;color:#9AA0AE;font-weight:600;">Lv {{ m.lvl }}</span>
                </div>
                <div style="margin-top:6px;font-size:12.5px;color:#9AA0AE;">{{ m.role }}</div>
              </div>
            </div>
          </sc-for>
        </div>
        <h2 style="margin:56px 0 8px;font-size:24px;font-weight:700;color:#F2B33D;">{{ t.ranksTitle }}</h2>
        <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#B7BCC7;max-width:640px;">{{ t.ranksIntro }}</p>
        <div style="display:flex;flex-direction:column;gap:10px;max-width:720px;">
          <sc-for list="{{ ranks }}" as="rk" hint-placeholder-count="5">
            <div style="display:flex;align-items:center;gap:16px;background:#252935;border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:14px 18px;">
              <span style="flex:none;min-width:118px;font-size:13.5px;font-weight:700;color:#F2B33D;">{{ rk.name }}</span>
              <span style="font-size:14px;line-height:1.5;color:#C9CDD6;">{{ rk.desc }}</span>
            </div>
          </sc-for>
        </div>
      </div>
    </sc-if>

    <!-- ===== Join ===== -->
    <sc-if value="{{ isJoin }}" hint-placeholder-val="{{ false }}">
      <div data-screen-label="Beitreten" style="max-width:820px;margin:0 auto;padding:64px 24px 80px;">
        <h1 style="margin:0;font-size:40px;font-weight:800;letter-spacing:-.5px;">{{ t.joinTitle }}</h1>
        <p style="margin:14px 0 0;font-size:17px;line-height:1.65;color:#B7BCC7;">{{ t.joinIntro }}</p>
        <div style="display:flex;flex-direction:column;gap:14px;margin-top:36px;">
          <sc-for list="{{ steps }}" as="s" hint-placeholder-count="3">
            <div style="display:flex;gap:20px;background:#252935;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:24px;">
              <div style="flex:none;width:36px;height:36px;border-radius:50%;background:rgba(242,179,61,.12);border:1.5px solid #F2B33D;color:#F2B33D;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;">{{ s.n }}</div>
              <div style="flex:1;">
                <h3 style="margin:4px 0 6px;font-size:17px;font-weight:700;">{{ s.title }}</h3>
                <p style="margin:0;font-size:14.5px;line-height:1.6;color:#B7BCC7;">{{ s.text }}</p>
                <sc-if value="{{ s.href }}" hint-placeholder-val="{{ false }}">
                  <a href="{{ s.href }}" target="_blank" style="{{ s.btnStyle }}" style-hover="filter:brightness(1.12);">{{ s.cta }}</a>
                </sc-if>
              </div>
            </div>
          </sc-for>
        </div>
        <div style="margin-top:28px;background:rgba(242,179,61,.07);border:1px solid rgba(242,179,61,.25);border-radius:14px;padding:20px 24px;font-size:14.5px;line-height:1.6;color:#C9CDD6;">{{ t.joinNote }}</div>
      </div>
    </sc-if>

  </main>

  <!-- ===== Footer ===== -->
  <footer style="border-top:1px solid rgba(255,255,255,.07);background:#171A21;">
    <div style="max-width:1120px;margin:0 auto;padding:36px 24px;display:flex;gap:24px;flex-wrap:wrap;align-items:center;">
      <div style="display:flex;align-items:center;gap:10px;">
        <img src="assets/crest.png" alt="" style="width:28px;height:28px;border-radius:7px;">
        <span style="font-weight:700;font-size:14px;">Shibaraiders «SHIBA»</span>
      </div>
      <nav style="display:flex;gap:20px;margin-left:auto;font-size:13.5px;">
        <a href="https://discord.gg/bGZE5mnKxV" target="_blank" style="color:#9AA0AE;text-decoration:none;" style-hover="color:#F2B33D;">Discord</a>
        <a href="https://na.finalfantasyxiv.com/lodestone/freecompany/9279948507173621416/" target="_blank" style="color:#9AA0AE;text-decoration:none;" style-hover="color:#F2B33D;">Lodestone</a>
        <a href="https://forms.gle/11biPUJ9rbXVqehk8" target="_blank" style="color:#9AA0AE;text-decoration:none;" style-hover="color:#F2B33D;">{{ t.navJoin }}</a>
      </nav>
    </div>
    <div style="max-width:1120px;margin:0 auto;padding:0 24px 28px;font-size:12px;line-height:1.6;color:#6B7180;">{{ t.disclaimer }}</div>
  </footer>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props="{&quot;defaultLang&quot;:{&quot;editor&quot;:&quot;enum&quot;,&quot;default&quot;:&quot;auto&quot;,&quot;options&quot;:[&quot;auto&quot;,&quot;de&quot;,&quot;en&quot;],&quot;tsType&quot;:&quot;'auto'|'de'|'en'&quot;,&quot;section&quot;:&quot;Sprache&quot;},&quot;recruitmentOpen&quot;:{&quot;editor&quot;:&quot;boolean&quot;,&quot;default&quot;:true,&quot;tsType&quot;:&quot;boolean&quot;,&quot;section&quot;:&quot;Rekrutierung&quot;}}">
class Component extends DCLogic {
  state = { lang: null, page: 'home', liveMembers: null };

  componentDidMount() {
    fetch('members.json', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d && Array.isArray(d.members) && d.members.length) this.setState({ liveMembers: d.members }); })
      .catch(() => {});
  }

  resolveLang() {
    if (this.state.lang) return this.state.lang;
    const pref = this.props.defaultLang ?? 'auto';
    if (pref === 'de' || pref === 'en') return pref;
    try {
      const stored = localStorage.getItem('shiba_lang');
      if (stored === 'de' || stored === 'en') return stored;
      return (navigator.language || 'en').toLowerCase().startsWith('de') ? 'de' : 'en';
    } catch (e) { return 'en'; }
  }

  renderVals() {
    const lang = this.resolveLang();
    const open = this.props.recruitmentOpen ?? true;

    const DE = {
      navHome: 'Start', navAbout: 'Über uns', navAct: 'Aktivitäten', navRules: 'Regeln', navMembers: 'Mitglieder', navJoin: 'Beitreten',
      heroTag: 'Freie Gesellschaft · Alpha [Light] · Immortal Flames (Verbündet)',
      slogan: '„Pfote für Pfote bis zum Sieg."',
      heroText: 'Wir sind eine entspannte, deutsch-englischsprachige Freie Gesellschaft auf Alpha. Ob Neuling, Wiederkehrer oder Veteran — bei uns zählt die Gemeinschaft, nicht der Parse.',
      ctaJoin: open ? 'Jetzt beitreten' : 'Anfrage stellen',
      ctaDiscord: 'Discord beitreten',
      groupPh: 'FC-Gruppenbild hier ablegen',
      aboutTitle: 'Wer wir sind',
      aboutP1: 'Die Shibaraiders sind eine Gemeinschaft aus Casual-Spielern, Sammlern, Levelern und Gelegenheits-Raidern. Uns verbindet die Freude am Spiel — und eine gewisse Schwäche für Shibas.',
      aboutP2: 'Wir spielen auf Deutsch und Englisch, helfen einander bei Quests, Dungeons und allem dazwischen, und niemand muss etwas leisten, um dazuzugehören.',
      techTitle: 'Mehr als nur eine FC',
      techText: 'Wir sind eine einzigartige Community mit selbst entwickelter Technologie — eigene Discord-Bots und Tools, gebaut von Mitgliedern für Mitglieder. Für die Vertrauten des Rudels gibt es außerdem einen eigenen Minecraft-Server.',
      houseTitle: 'Unser Zuhause',
      houseText: 'Unser FC-Haus steht im Empyreum, 15. Bezirk, Grundstück 15 — in den verschneiten Höhen von Ishgard. Komm auf einen Tee vorbei.',
      housePh: 'Screenshot vom FC-Haus hier ablegen',
      lodestoneLink: 'Auf dem Lodestone ansehen',
      actTitle: 'Was wir machen',
      actIntro: 'Kein Pflichtprogramm, kein Raid-Kalender-Stress. Wir machen, worauf die Meute Lust hat.',
      rulesTitle: 'Unsere Regeln',
      rulesIntro: 'Wenige Regeln, aber die ernst gemeint. Kurz gesagt: Sei kein Wolf im Shiba-Pelz.',
      membersTitle: 'Unser Rudel',
      membersIntro: 'Bei Fragen, Problemen oder Beitrittswünschen — diese Leute helfen dir weiter, ingame oder im Discord.',
      ranksTitle: 'Rangordnung',
      ranksIntro: 'Vom Neuankömmling bis zur Rudelspitze — so sind unsere Ränge aufgebaut.',
      joinTitle: 'Werde ein Shibaraider',
      joinIntro: open
        ? 'Wir rekrutieren aktiv! Der Weg ins Rudel ist kurz — drei Schritte, keine Bewerbungsmappe.'
        : 'Aktuell nehmen wir nur auf Anfrage auf. Melde dich am besten zuerst im Discord.',
      joinNote: 'Voraussetzungen: ein Charakter auf Alpha [Light] (oder Umzugsbereitschaft), Freundlichkeit und ein Mindestmaß an Shiba-Toleranz. Level und Erfahrung sind egal.',
      stepFormT: 'Formular ausfüllen', stepFormX: 'Erzähl uns kurz, wer du bist und was du gern spielst. Dauert keine zwei Minuten.',
      stepFormC: 'Zum Beitrittsformular',
      stepDiscT: 'Discord beitreten', stepDiscX: 'Unser Discord ist das Herz der FC — hier läuft Orga, Geplauder und Meme-Austausch.',
      stepDiscC: 'Discord öffnen',
      stepInvT: 'Ingame-Invite erhalten', stepInvX: 'Ein Officer meldet sich bei dir und lädt dich ins Spiel ein. Willkommen im Rudel!',
      disclaimer: 'Inoffizielle Community-Seite der Freien Gesellschaft Shibaraiders. FINAL FANTASY XIV © SQUARE ENIX CO., LTD. Diese Seite steht in keiner Verbindung zu Square Enix.',
    };

    const EN = {
      navHome: 'Home', navAbout: 'About', navAct: 'What we do', navRules: 'Rules', navMembers: 'Members', navJoin: 'Join us',
      heroTag: 'Free Company · Alpha [Light] · Immortal Flames (Allied)',
      slogan: '“Paw by paw to victory.”',
      heroText: 'We are a relaxed German/English-speaking Free Company on Alpha. Sprout, returner or veteran — what matters here is community, not your parse.',
      ctaJoin: open ? 'Join now' : 'Send a request',
      ctaDiscord: 'Join our Discord',
      groupPh: 'Drop an FC group photo here',
      aboutTitle: 'Who we are',
      aboutP1: 'The Shibaraiders are a pack of casual players, collectors, levelers and occasional raiders. What unites us is the joy of the game — and a certain weakness for shibas.',
      aboutP2: 'We play in German and English, help each other with quests, dungeons and everything in between, and nobody has to prove anything to belong.',
      techTitle: 'More than just an FC',
      techText: 'We are a unique community with self-built technology — our own Discord bots and tools, made by members for members. Trusted members of the pack also get access to our own Minecraft server.',
      houseTitle: 'Our home',
      houseText: 'Our FC house sits in Empyreum, Ward 15, Plot 15 — up in the snowy heights of Ishgard. Drop by for a cup of tea.',
      housePh: 'Drop a screenshot of the FC house here',
      lodestoneLink: 'View on the Lodestone',
      actTitle: 'What we do',
      actIntro: 'No mandatory schedule, no raid-calendar stress. We do whatever the pack feels like.',
      rulesTitle: 'Our rules',
      rulesIntro: 'Few rules, but we mean them. In short: don\u2019t be a wolf in shiba\u2019s clothing.',
      membersTitle: 'Our pack',
      membersIntro: 'Questions, problems or join requests — these people will help you, in game or on Discord.',
      ranksTitle: 'Rank ladder',
      ranksIntro: 'From newcomer to the top of the pack — this is how our ranks work.',
      joinTitle: 'Become a Shibaraider',
      joinIntro: open
        ? 'We are actively recruiting! Joining the pack is quick — three steps, no application folder.'
        : 'We currently accept members by request only. Best to say hi on Discord first.',
      joinNote: 'Requirements: a character on Alpha [Light] (or willingness to transfer), friendliness, and a basic tolerance for shibas. Level and experience don\u2019t matter.',
      stepFormT: 'Fill in the form', stepFormX: 'Tell us briefly who you are and what you like to play. Takes less than two minutes.',
      stepFormC: 'Open the join form',
      stepDiscT: 'Join our Discord', stepDiscX: 'Our Discord is the heart of the FC — organisation, chatter and meme exchange all happen here.',
      stepDiscC: 'Open Discord',
      stepInvT: 'Get your in-game invite', stepInvX: 'An officer will get in touch and invite you in game. Welcome to the pack!',
      disclaimer: 'Unofficial community site of the Shibaraiders Free Company. FINAL FANTASY XIV © SQUARE ENIX CO., LTD. This site is not affiliated with Square Enix.',
    };

    const t = lang === 'de' ? DE : EN;
    const page = this.state.page;

    const setPage = (p) => () => { this.setState({ page: p }); window.scrollTo(0, 0); };
    const setLang = (l) => () => {
      try { localStorage.setItem('shiba_lang', l); } catch (e) {}
      this.setState({ lang: l });
    };

    const navBase = { background: 'none', border: 'none', cursor: 'pointer', padding: '9px 12px', borderRadius: '8px', fontFamily: "'Outfit',sans-serif", fontSize: '13.5px', fontWeight: 500 };
    const navStyle = (p) => page === p
      ? { ...navBase, color: '#F2B33D', background: 'rgba(242,179,61,.1)', fontWeight: 600 }
      : { ...navBase, color: '#B7BCC7' };

    const nav = [
      { key: 'home', label: t.navHome },
      { key: 'about', label: t.navAbout },
      { key: 'activities', label: t.navAct },
      { key: 'rules', label: t.navRules },
      { key: 'members', label: t.navMembers },
    ].map(n => ({ ...n, onClick: setPage(n.key), style: navStyle(n.key) }));

    const langBase = { border: 'none', cursor: 'pointer', padding: '7px 11px', fontFamily: "'Outfit',sans-serif", fontSize: '12px', fontWeight: 700 };
    const langStyle = (l) => lang === l
      ? { ...langBase, background: '#F2B33D', color: '#1B1E26' }
      : { ...langBase, background: 'transparent', color: '#9AA0AE' };

    const facts = lang === 'de' ? [
      { k: 'Welt', v: 'Alpha [Light]' },
      { k: 'Staatliche Gesellschaft', v: 'Immortal Flames (Verbündet)' },
      { k: 'FC-Haus', v: 'Empyreum · Bez. 15 · Nr. 15' },
      { k: 'Rang', v: '30 (Maximum)' },
    ] : [
      { k: 'World', v: 'Alpha [Light]' },
      { k: 'Grand Company', v: 'Immortal Flames (Allied)' },
      { k: 'FC House', v: 'Empyreum · Ward 15 · Plot 15' },
      { k: 'Rank', v: '30 (max)' },
    ];

    const fcData = lang === 'de' ? [
      { k: 'Name', v: 'Shibaraiders «SHIBA»' },
      { k: 'Welt', v: 'Alpha [Light]' },
      { k: 'Gesellschaft', v: 'Immortal Flames' },
      { k: 'Haus', v: 'Empyreum, Bez. 15, Nr. 15' },
      { k: 'Sprachen', v: 'Deutsch · Englisch' },
    ] : [
      { k: 'Name', v: 'Shibaraiders «SHIBA»' },
      { k: 'World', v: 'Alpha [Light]' },
      { k: 'Grand Company', v: 'Immortal Flames' },
      { k: 'House', v: 'Empyreum, Ward 15, Plot 15' },
      { k: 'Languages', v: 'German · English' },
    ];

    const acts = lang === 'de' ? [
      { tag: 'CS', title: 'Casual & Social', text: 'Mount-Farms, Schatzkarten, Glamour-Jagd und gemütliches Abhängen im FC-Haus. Der Alltag im Rudel.' },
      { tag: 'RD', title: 'Raids & Extremes', text: 'Lockere Learning-Runs für Extremes und Raids — Fehler sind erlaubt, Loot wird gefeiert.' },
      { tag: 'LV', title: 'Leveling & Mentoring', text: 'Hilfe für Neulinge und Wiederkehrer: gemeinsame Roulettes, Job-Beratung und Antworten auf jede Frage.' },
      { tag: 'EV', title: 'Events & Feste', text: 'FC-Events, Screenshot-Abende und Housing-Partys im Empyreum — meist mit fragwürdigem Glamour-Dresscode.' },
    ] : [
      { tag: 'CS', title: 'Casual & Social', text: 'Mount farms, treasure maps, glamour hunts and cosy hangouts at the FC house. Everyday pack life.' },
      { tag: 'RD', title: 'Raids & Extremes', text: 'Relaxed learning runs for extremes and raids — mistakes are allowed, loot gets celebrated.' },
      { tag: 'LV', title: 'Leveling & Mentoring', text: 'Help for sprouts and returners: shared roulettes, job advice and answers to every question.' },
      { tag: 'EV', title: 'Events & Parties', text: 'FC events, screenshot nights and housing parties in Empyreum — usually with a questionable glamour dress code.' },
    ];

    const rules = (lang === 'de' ? [
      ['Respekt', 'Wir behandeln einander freundlich. Beleidigungen, Diskriminierung und Belästigung führen zum sofortigen Ausschluss.'],
      ['Kein Drama', 'Konflikte klärt ihr privat oder mit einem Officer — nicht im FC-Chat und nicht im Discord.'],
      ['Hilfsbereitschaft', 'Fragen sind immer willkommen. Wer helfen kann, hilft — so wie dir geholfen wurde.'],
      ['Discord', 'Unser Discord ist der zentrale Treffpunkt. Nutzt die passenden Channels und haltet euch an die Server-Regeln.'],
      ['Aktivität', 'Es gibt keine Spielpflicht. Bei längerer Abwesenheit (2+ Monate) freuen wir uns über eine kurze Nachricht.'],
      ['Spaß', 'Es ist ein Spiel. Wenn etwas keinen Spaß macht, sag es — wir finden eine Lösung.'],
    ] : [
      ['Respect', 'We treat each other kindly. Insults, discrimination and harassment lead to immediate removal.'],
      ['No drama', 'Settle conflicts privately or with an officer — not in FC chat and not on Discord.'],
      ['Help each other', 'Questions are always welcome. If you can help, do — the way you were helped.'],
      ['Discord', 'Our Discord is the central meeting place. Use the right channels and follow the server rules.'],
      ['Activity', 'There is no obligation to play. For longer breaks (2+ months) a short heads-up is appreciated.'],
      ['Fun', 'It\u2019s a game. If something stops being fun, say so — we\u2019ll find a solution.'],
    ]).map((r, i) => ({ n: i + 1, title: r[0], text: r[1] }));

    const btnCommon = { display: 'inline-block', marginTop: '14px', textDecoration: 'none', borderRadius: '9px', padding: '11px 20px', fontSize: '14px' };
    const btnGold = { ...btnCommon, background: '#F2B33D', color: '#1B1E26', fontWeight: 700 };
    const btnBlurple = { ...btnCommon, background: '#5865F2', color: '#fff', fontWeight: 600 };

    const steps = [
      { n: 1, title: t.stepFormT, text: t.stepFormX, href: 'https://forms.gle/11biPUJ9rbXVqehk8', cta: t.stepFormC, btnStyle: btnGold },
      { n: 2, title: t.stepDiscT, text: t.stepDiscX, href: 'https://discord.gg/bGZE5mnKxV', cta: t.stepDiscC, btnStyle: btnBlurple },
      { n: 3, title: t.stepInvT, text: t.stepInvX, href: '', cta: '', btnStyle: '' },
    ];

    const RANK_ORDER = ['Kaiser Shiba', 'Princess', 'NekoPaw', 'Mascot', 'Gokiburi'];
    const roleByRank = (rank) => {
      const map = lang === 'de' ? {
        'Kaiser Shiba': 'Owner — führt das Rudel an',
        'Princess': 'Stellvertretung',
        'NekoPaw': 'Helper',
        'Mascot': 'Mitglied',
        'Gokiburi': 'Anfangsrolle — Probezeit',
      } : {
        'Kaiser Shiba': 'Owner — leads the pack',
        'Princess': 'Second-in-command',
        'NekoPaw': 'Helper',
        'Mascot': 'Member',
        'Gokiburi': 'Starting rank — trial period',
      };
      return map[rank] || (lang === 'de' ? 'Mitglied' : 'Member');
    };
    const LOCAL_AVATARS = { '51140687': 'assets/akeno.png' };

    const fallbackMembers = [
      { id: '51140687', name: 'Akeno Kusuri-ya', rank: 'Kaiser Shiba', level: 100, avatar: '' },
      { id: '11359811', name: 'Maomao Choi', rank: 'Princess', level: 100, avatar: '' },
      { id: '45171724', name: 'Yavi Wohtu', rank: 'Princess', level: 27, avatar: '' },
      { id: '58116762', name: 'Akeno Saeki', rank: 'NekoPaw', level: 25, avatar: '' },
    ];

    const raw = this.state.liveMembers || fallbackMembers;
    const members = raw.slice()
      .sort((a, b) => {
        const ra = RANK_ORDER.indexOf(a.rank); const rb = RANK_ORDER.indexOf(b.rank);
        return (ra === -1 ? 99 : ra) - (rb === -1 ? 99 : rb) || String(a.name).localeCompare(String(b.name));
      })
      .map(m => ({
        slot: 'av-' + (m.id || String(m.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')),
        name: m.name,
        rank: m.rank,
        lvl: String(m.level || '?'),
        src: LOCAL_AVATARS[m.id] || m.avatar || undefined,
        role: roleByRank(m.rank),
      }));

    const ranks = lang === 'de' ? [
      { name: 'Kaiser Shiba', desc: 'Owner — führt das Rudel an.' },
      { name: 'Princess', desc: 'Direkt unter dem Owner — die rechte Pfote der Leitung.' },
      { name: 'NekoPaw', desc: 'Helper — unterstützt bei Orga, Events und Mitgliederfragen.' },
      { name: 'Mascot', desc: 'Mitglied — vollwertiges Rudelmitglied.' },
      { name: 'Gokiburi', desc: 'Anfangsrolle — die Probezeit für Neuankömmlinge.' },
    ] : [
      { name: 'Kaiser Shiba', desc: 'Owner — leads the pack.' },
      { name: 'Princess', desc: 'Right below the owner — the leadership\u2019s right paw.' },
      { name: 'NekoPaw', desc: 'Helper — supports organisation, events and member questions.' },
      { name: 'Mascot', desc: 'Member — a full member of the pack.' },
      { name: 'Gokiburi', desc: 'Starting rank — the trial period for newcomers.' },
    ];

    return {
      t, nav, facts, fcData, acts, rules, steps, members, ranks,
      isHome: page === 'home', isAbout: page === 'about', isAct: page === 'activities',
      isRules: page === 'rules', isMembers: page === 'members', isJoin: page === 'join',
      goHome: setPage('home'), goJoin: setPage('join'),
      setDe: setLang('de'), setEn: setLang('en'),
      langDeStyle: langStyle('de'), langEnStyle: langStyle('en'),
    };
  }
}
</script>
</body>
</html>
