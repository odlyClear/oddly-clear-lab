# Oddly Clear: instructions for agents

Read [README.md](README.md), [the production method](docs/production-method.md) and [weekly planning](docs/weekly-planning.md) before changes. Everything produced for the channel, including UI, narration and documentation, is English-only. Preserve the approved teal/cream/mint/coral original SVG style, clear explanatory motion and large readable typography.

## This repository's scope

This is the public **interactive website** repository. It contains editable Water Lab source, selected shared SVG components, licensed fonts, map geometry and the approved 55-second film. The `video-engine/` directory here is an illustration subset, not the full Remotion engine. Raw voice takes, private claim-review records, the full video render/audio/QA tools and the fourteen week-one cards are in the owner's separate production workspace. Do not claim those materials exist in this checkout.

The public homepage is `/oddly-clear-lab/`, with selected public-release cards in `web/home/episodes.mjs`. Water Lab remains `/oddly-clear-lab/water/` with its original film. Roadster links to its external YouTube Short; it has no interactive lab here. The full production inventory and API release evidence remain in the separate private workspace. The static directory is not a live YouTube status/analytics source.

## Website changes

1. Edit `web/home/` for the directory and `web/water/` for Water Lab; shared illustration source is under `video-engine/src/`. Do not hand-edit generated `dist/`. Homepage artwork is original SVG, with the existing licensed/public-domain land geometry.
2. `scripts/build.mjs` builds the homepage and Water Lab. New experiments require an explicit new source entry/route, media mapping, build output and checks. Adding a directory card alone does not create an experiment. Keep `/water/` working. One repository serves all episode pages.
3. `scripts/check-dist.mjs` verifies the existing water output and approved film SHA-256. Keep that regression check; add new page checks rather than replacing the expected film hash with unrelated media.
4. Preserve relative URLs under the repository prefix. Keep runtime code/fonts local and embedded as appropriate. Load media on demand. Do not add keys, private documents, raw research or machine-specific paths.
5. Maintain touch and keyboard operation, model assumptions, reduced motion, pause/reset, URL settings and usable phone layouts. Model coefficients are illustrative, not engineering measurements. For simulations, verify the relevant conservation/boundary invariants.
6. Run `npm ci` when dependencies are absent or changed, then `npm test`, `npm run build` and `npm run check:dist`. Run appropriate browser interaction checks at phone and desktop sizes; distinguish Chrome emulation from actual device testing. Stop preview servers you started when done with them.
7. Main-branch pushes publish through GitHub Actions. For an authorized deployment, inspect the intended diff, push, verify the successful Actions run and check the actual public route and media. PRs check without deploying. Do not add a conversational approval gate when publication is already authorized.
8. Preserve existing approved media. New films and revisions need distinct filenames/versions and intentional references, not an overwrite to make a new episode appear at the old route.

## Video and later-week work

Follow the production/weekly guides and fill the templates under `templates/`. For a video-production task, use the owner's full production workspace when supplied; it has its own `AGENTS.md` and detailed script-adaptation map. A different topic needs its own composition, timeline, narration, assets, audio cache, output and QA. There is no generic video generator in this repository. Preserve source evidence and actual tests rather than inferring them from the delivered MP4.

End each task with changed files, checks actually performed, known limitations and the next unfinished step. Record deployed commit, Actions URL and public route in the handoff. `planned`, `rendered`, `reviewed`, `site deployed`, `YouTube published` and `measured` are separate states. Do not invent future topics, uploads, analytics or performed listening reviews.
