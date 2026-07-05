// Aktualisiert members.json mit der aktuellen Mitgliederliste vom Lodestone.
// Läuft ohne Abhängigkeiten unter Node 20+ (global fetch).
// Aufruf: node scripts/update-members.mjs

import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const FC_ID = '9279948507173621416';
const BASE = `https://na.finalfantasyxiv.com/lodestone/freecompany/${FC_ID}/member/`;
const OUT = new URL('../members.json', import.meta.url).pathname;

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; ShibaraidersSite/1.0; +https://github.com)',
  'Accept-Language': 'en',
};

async function fetchPage(page) {
  const res = await fetch(`${BASE}?page=${page}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`Lodestone antwortete mit HTTP ${res.status} (Seite ${page})`);
  return res.text();
}

function parseMembers(html) {
  const members = [];
  // Jeder Eintrag: <li class="entry"> ... </li>
  const entryRe = /<li class="entry">([\s\S]*?)<\/li>\s*(?=<li class="entry">|<\/ul>|$)/g;
  let m;
  while ((m = entryRe.exec(html)) !== null) {
    const block = m[1];
    const id = block.match(/\/lodestone\/character\/(\d+)\//)?.[1];
    const name = block.match(/class="entry__name"[^>]*>([^<]+)</)?.[1]?.trim();
    const avatar = block.match(/<img src="(https:\/\/img2\.finalfantasyxiv\.com\/[^"]+)"/)?.[1] || '';
    if (!id || !name) continue;

    // Rang & Level: alle <span>-Texte im Info-Block einsammeln
    const infoBlock = block.match(/entry__freecompany__info([\s\S]*)$/)?.[1] || block;
    const spans = [...infoBlock.matchAll(/<span[^>]*>([^<]*)<\/span>/g)].map(s => s[1].trim()).filter(Boolean);
    const rank = spans.find(s => !/^\d+$/.test(s)) || '';
    const level = Number(spans.find(s => /^\d+$/.test(s))) || null;

    members.push({ id, name, rank, level, avatar });
  }
  return members;
}

function totalPages(html) {
  const m = html.match(/Page\s+\d+\s+of\s+(\d+)/i) || html.match(/(\d+)\s*ページ中/);
  return m ? Number(m[1]) : 1;
}

const first = await fetchPage(1);
let members = parseMembers(first);
const pages = totalPages(first);
for (let p = 2; p <= pages; p++) {
  await new Promise(r => setTimeout(r, 2000)); // Lodestone nicht hämmern
  members = members.concat(parseMembers(await fetchPage(p)));
}

if (members.length === 0) {
  console.error('Keine Mitglieder geparst — Lodestone-HTML hat sich evtl. geändert. members.json bleibt unverändert.');
  process.exit(1);
}

const out = {
  updated: new Date().toISOString(),
  source: BASE,
  members,
};

const next = JSON.stringify(out, null, 2) + '\n';
const prev = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
// Nur Zeitstempel-Änderung? Dann nicht schreiben (kein unnötiger Commit).
const strip = s => s.replace(/"updated": "[^"]*",?\n?/, '');
if (strip(prev) === strip(next)) {
  console.log(`Keine Änderungen (${members.length} Mitglieder).`);
} else {
  writeFileSync(OUT, next);
  console.log(`members.json aktualisiert: ${members.length} Mitglieder.`);
}
