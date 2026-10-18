import fs from 'node:fs/promises';
import { geoOrthographic, geoPath, geoArea } from 'd3-geo';
import { episodes } from './episodes.mjs';

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const play = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z"/></svg>';
const mascot = '<svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="19" fill="#073b43"/><ellipse cx="28" cy="29" rx="26" ry="8" transform="rotate(-25 28 29)" fill="none" stroke="#56dcc5" stroke-width="3"/><circle cx="28" cy="25" r="9" fill="#f5f0df"/><circle cx="30" cy="23" r="4" fill="#073b43"/><path d="m22 12 10-2" stroke="#f27960" stroke-width="3" stroke-linecap="round"/></svg>';

async function waterArt() {
  const land = JSON.parse(await fs.readFile(new URL('../../video-engine/src/data/land.json', import.meta.url), 'utf8'));
  const projection = geoOrthographic().scale(95).translate([174, 128]).rotate([-12, -16, -8]).clipAngle(90);
  const path = geoPath(projection);
  const continents = land.features.map(feature => {
    if (geoArea(feature) > 2 * Math.PI) {
      const g = feature.geometry;
      const coordinates = g.type === 'Polygon' ? g.coordinates.map(r => [...r].reverse()) : g.coordinates.map(p => p.map(r => [...r].reverse()));
      feature = { ...feature, geometry: { ...g, coordinates } };
    }
    return path(feature) || '';
  }).join(' ');
  return `<svg viewBox="0 0 480 250" aria-hidden="true"><defs><radialGradient id="sea" cx="28%" cy="20%" r="85%"><stop stop-color="#45b9c8"/><stop offset=".55" stop-color="#188da6"/><stop offset="1" stop-color="#024657"/></radialGradient><radialGradient id="shade" cx="25%" cy="25%" r="86%"><stop offset=".4" stop-color="#073b43" stop-opacity="0"/><stop offset="1" stop-color="#01282f" stop-opacity=".55"/></radialGradient></defs><path d="M-30 197Q100 115 240 198T530 176" fill="none" stroke="#56dcc5" stroke-opacity=".16" stroke-width="1.5"/><ellipse cx="174" cy="238" rx="74" ry="7" fill="#001e28" opacity=".3"/><circle cx="174" cy="128" r="104" fill="#56dcc5" opacity=".08"/><circle cx="174" cy="128" r="95" fill="url(#sea)"/><path d="${continents}" fill="#9ed3b7" stroke="#71b6a0" stroke-width=".55"/><circle cx="174" cy="128" r="95" fill="url(#shade)"/><circle cx="174" cy="128" r="95" fill="none" stroke="#d5efdf" stroke-opacity=".3"/><g transform="translate(333 115) rotate(8)"><path d="m-24-2 6 89q18 13 36 0l6-89" fill="#f5f0df" fill-opacity=".05" stroke="#d5efdf" stroke-width="2.5"/><path d="m-21 37 3 49q18 10 36 0l3-49q-21 8-42 0" fill="#56dcc5" fill-opacity=".7"/><ellipse cy="-2" rx="24" ry="6" fill="none" stroke="#d5efdf" stroke-width="2.5"/><path d="M0-67c-5 9-13 16-13 24a13 13 0 0 0 26 0C13-51 5-58 0-67" fill="#56dcc5"/></g><circle cx="382" cy="66" r="4" fill="#f27960"/><path d="m75 49 7-3m-1 12 4-6" stroke="#56dcc5" stroke-width="2" stroke-linecap="round"/></svg>`;
}

function roadsterArt() {
  return `<svg viewBox="0 0 480 250" aria-hidden="true"><defs><linearGradient id="car-body" x2="0" y2="1"><stop stop-color="#fffdf3"/><stop offset="1" stop-color="#b8d4ce"/></linearGradient></defs><ellipse cx="278" cy="224" rx="126" ry="9" fill="#01282f" opacity=".25"/><path d="M-10 219H150Q226 219 227 145V-20" fill="none" stroke="#c3ddd5" stroke-opacity=".4" stroke-width="6"/><path d="M-10 235H150Q244 235 244 145V-20" fill="none" stroke="#c3ddd5" stroke-opacity=".2" stroke-width="3"/><path d="m172 215 15 14 4-21 16 12 1-24 20 8-7-22 22-1m-16-30h17m-17-38h17m-17-38h17m-17-38h17" fill="none" stroke="#c3ddd5" stroke-opacity=".3" stroke-width="2"/><g transform="translate(304 103) rotate(-24)"><path d="M-75 12-55-8-24-12-2-34h43l27 27 30 16-3 27H-79Z" fill="url(#car-body)"/><path d="m-15-12 18-18h35l18 21Z" fill="#12444d"/><path d="m14-30-2 20" stroke="#6caaa8" stroke-width="2"/><path d="m-72 16 35-3m81 1 44 3" stroke="#56dcc5" stroke-width="3"/><path d="m-64 37 144-1" stroke="#7da49e" stroke-width="4"/><circle cx="-47" cy="35" r="15" fill="#072b35"/><circle cx="-47" cy="35" r="7" fill="#86aaa5"/><circle cx="64" cy="35" r="15" fill="#072b35"/><circle cx="64" cy="35" r="7" fill="#86aaa5"/><path d="m-24 43-8 40m32-40-2 50m32-51 9 39" stroke="#d5efdf" stroke-width="9" stroke-linecap="round" opacity=".16"/><path d="m-24 43-6 27m30-27-1 36m31-37 6 27" stroke="#56dcc5" stroke-width="3" stroke-linecap="round" opacity=".65"/></g><path d="m348 42 5-12m17 22 12-2" stroke="#f27960" stroke-width="2" stroke-linecap="round"/><circle cx="91" cy="84" r="3" fill="#56dcc5" opacity=".5"/></svg>`;
}

export async function renderHome() {
  const css = await fs.readFile(new URL('./styles.css', import.meta.url), 'utf8');
  const art = { water: await waterArt(), roadster: roadsterArt() };
  const cards = episodes.map(ep => `<article class="story story-${ep.art}" id="${esc(ep.id)}">
    <div class="story-art">${art[ep.art]}<div class="story-topline"><span>STORY ${esc(ep.number)}</span><span>${esc(ep.topic)}</span></div></div>
    <div class="story-copy"><p class="story-format">${esc(ep.format)}</p><h2>${esc(ep.title).replaceAll('\n', '<br>')}</h2><p class="story-description">${esc(ep.description)}</p>
      <a class="story-action" href="${esc(ep.action.href)}"${ep.action.href.startsWith('https:') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(ep.action.label)}${ep.art === 'water' ? arrow : play}</a>
      <div class="story-foot">${ep.video ? `<a href="${esc(ep.video.href)}" target="_blank" rel="noopener noreferrer">${play}${esc(ep.video.label)}</a><span>Then make it rain.</span>` : `<span class="release-note" data-release="${esc(ep.publishAt)}">Scheduled · 18 Oct, 21:00 Berlin</span><span>Science in motion.</span>`}</div>
    </div></article>`).join('');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#f5f0df"><meta name="description" content="Small experiments. Big questions. Explore Oddly Clear stories, play Water Lab and watch original animated science Shorts."><meta property="og:title" content="Oddly Clear — Watch. Wonder. Play."><meta property="og:description" content="Pick a story. Play with the science."><meta property="og:type" content="website"><meta property="og:url" content="https://odlyclear.github.io/oddly-clear-lab/"><link rel="canonical" href="https://odlyclear.github.io/oddly-clear-lab/"><title>Oddly Clear — Watch. Wonder. Play.</title><style>${css}</style></head>
<body><a class="skip-link" href="#stories">Skip to stories</a><div class="page-shell">
<header class="masthead"><a class="brand" href="./" aria-label="Oddly Clear home">${mascot}<span>ODDLY CLEAR<small>SMALL EXPERIMENTS. BIG QUESTIONS.</small></span></a><a class="channel-link" href="https://www.youtube.com/@watchoddlyclearlab" target="_blank" rel="noopener noreferrer">${play}<span>YouTube</span>${arrow}</a></header>
<main><section class="intro" aria-labelledby="page-title"><p class="eyebrow"><span></span> A LITTLE CURIOSITY GOES A LONG WAY</p><h1 id="page-title">Watch. Wonder.<br><em>Play.</em><span class="title-spark" aria-hidden="true">✳</span></h1><p class="intro-copy">The video is just the beginning.<br> Pick a story. Play with the science.</p></section>
<section id="stories" aria-label="Explore the stories"><div class="section-label"><span>FOLLOW YOUR CURIOSITY</span><span>01 — ${String(episodes.length).padStart(2, '0')}</span></div><div class="story-grid">${cards}</div></section>
<aside class="closing"><span class="closing-orbit" aria-hidden="true">↗</span><p>One small question.<br><strong>A different way to see the world.</strong></p><a href="https://www.youtube.com/@watchoddlyclearlab" target="_blank" rel="noopener noreferrer">More on YouTube ${arrow}</a></aside></main>
<footer><span>ODDLY CLEAR / LAB</span><span>Made for curious minds.</span></footer></div>
<script>function updateReleases(){document.querySelectorAll('[data-release]').forEach(function(el){if(Date.now()>=Date.parse(el.dataset.release))el.textContent='58 seconds · Two mechanisms';});}updateReleases();setInterval(updateReleases,60000);</script></body></html>`;
}
