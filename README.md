# Oddly Clear · Lab

**Small experiments. Big questions.**

Interactive science companions for the Oddly Clear channel. One repository, one page per episode. All content is English.

## Start here, agents

Read [AGENTS.md](AGENTS.md), [the episode production method](docs/production-method.md) and [rolling weekly planning](docs/weekly-planning.md). Reusable [episode briefs](templates/episode-brief.md), [weekly plans](templates/weekly-plan.md) and [delivery reports](templates/delivery-report.md) keep handoffs independent of chat history. This public checkout is the website and selected artwork/media, not the complete private video engine. Future agents must distinguish a documented process from films or generic render tools that have not yet been implemented.

## First experiment: Water Lab

Keep a tiny city's water flowing for 30 model days. Change rainfall and demand, try conservation or desalination, tap the cloud, and watch the existing 55-second film. The page supports phone layouts, touch sliders, keyboard controls, reduced motion, pause/reset and shareable settings.

Live experiment: **https://odlyclear.github.io/oddly-clear-lab/water/**

The water model uses arbitrary scenario units. It is an explanatory toy, not a forecast for a real city. Assumptions and primary science references are shown on the page.

## Run locally

Use Node.js 24 or newer:

```sh
npm ci
npm test
npm run build
npm run check:dist
npm run preview
```

Open the Local URL printed by the preview server, normally http://127.0.0.1:4178/water/.

## Edit and publish

- Interface, styles and model: `web/water/`.
- Shared original SVG components: `video-engine/src/visual-kit/`.
- Fonts and license notices: `video-engine/public/fonts/`.
- Episode video and poster: `media/`.
- Static output: `dist/` (generated and ignored).

Pushes to `main` run tests, build the HTML, verify the static output and publish it with GitHub Actions to GitHub Pages. Pull requests run checks without deploying. Repository Pages settings must use **GitHub Actions** as the source. Future experiments receive their own route, rather than a separate repository. Paths are relative so hosting under a repository prefix works.

No API key, remote font, CDN, account or backend is needed to run the experiment. The video is loaded only when requested. The public repository contains only the site sources and selected media; research notes, supplied documents, API credentials and local project files are excluded.

## Credits

The illustrations and film belong to this project. Font licenses (SIL OFL) are included and embedded in the generated HTML. Natural Earth land geometry is public domain; provenance is recorded in `video-engine/asset-manifest.json`. Third-party package licenses remain with their respective authors. No additional license grant is made for the project's original artwork, film or code.

GitHub Pages workflow follows the [official custom workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
