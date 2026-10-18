# Video production method for future agents

This guide explains how Oddly Clear creates episodes across weeks. This public repository supplies interactive companions and delivered media; the full video-production engine and private evidence live in the owner's production workspace. If that workspace is supplied, read its `AGENTS.md`, `project.md` and detailed `docs/production-playbook.md`. The steps below do not imply that missing tools or future films already exist here.

## Current reference

The first full film is **Why Can a Water Planet Run Dry?**, 55 seconds, 1080×1920, 30 fps, ten scenes and 100 English narration words. The owner approved its original illustration direction. English Puck is the current voice direction. Preserve teal/cream/mint/coral, dimensional SVG illustration, purposeful transitions, large typography and legible captions. New topics need their own explanatory pictures, not relabeled water scenes.

Week one has fourteen briefs in the full workspace, one full film and thirteen films still to produce. Water Lab is deployed; this is independent of YouTube publication. No YouTube uploads or launch dates are recorded here.

## Repeat for every episode

1. **Brief:** Fill [the episode template](../templates/episode-brief.md). Specify one question, opening line/frame, four causal beats, target duration and one visual payoff. Follow the assigned target; most existing briefs are 40–60 seconds. Later-week 50–60 seconds is a starting target, not a requirement to pad a shorter explanation.
2. **Claims:** Map each material factual/numerical claim to a reviewed primary or authoritative source and supporting section. Record dates, depth of review, simplifications and unresolved questions. Label invented examples and toy-model coefficients. Check derivations. Competitor popularity is not scientific evidence.
3. **Script:** Write original English narration and separate display labels. An initial 80–125-word budget is only a starting point. Time the actual read and preserve useful pauses. Do not lock detailed animation to estimated speech alone.
4. **Storyboard:** Record scene purposes/actions, frame ranges or an explicitly declared seconds schema, caption cues, claim references and intentional transition overlaps. The current water implementation has overlapping transitions and seconds-based cues. A JSON storyboard is not automatically executable.
5. **Voice:** Use the established clear, curious, conversational Puck direction. Verify model/voice availability before new generation. Read credentials at runtime; never print or commit them. Cache exact text/model/voice/style takes by revision. Retain raw and fitted WAVs, cue timings and configuration. Do not inherit water-specific cue reuse or emphasis words for a different topic.
6. **Music/SFX:** Retain separate original stems. Adapt duration, event timing and deterministic seeds. Keep speech intelligible; record any time fitting and review it rather than silently cutting words. Observe actual API quota/backoff behavior rather than assuming the water run's limits apply forever.
7. **Animation:** In the full Remotion engine, add a distinct composition and versioned output/cache paths. Use frame/fps-driven motion, local fonts and original reusable/topic-specific SVG art. Inspect the hook, explanatory frame, payoff, first/final frames and transitions at phone size.
8. **Tool adaptation:** Existing full-workspace water audio/render/finishing/transcription scripts are topic-specific. New episodes need explicit adapters or verified generic arguments that preserve water defaults. Adapt storyboard/schema, composition ID, duration, sample frames, text-audit contract, source/cache/output paths, caption/transcript targets and audio event times. No universal `--episode` command exists here.
9. **QA:** Verify full decode, expected dimensions/fps/frame count/duration, audio codec/levels, captions/actual words, loaded fonts, safe text bounds and unintended black intervals. Inspect every scene and representative transitions. Play the complete final MP4 in a browser. Independent transcription does not replace a listening pass. Label physical-device and human reviews as performed or pending.
10. **Delivery:** Fill [the delivery report](../templates/delivery-report.md). Supply MP4, poster, transcript/SRT, exact storyboard, claims/sources and technical/audio/playback evidence. Record versions, commands, hashes, costs/time if measured and remaining issues. Preserve approved exports; corrections get a new revision.
11. **Companion:** Build a topic-specific interaction with clear assumptions, English UI, touch/keyboard controls, reduced motion and a phone layout. Add a distinct route and asset mapping to this repository. Keep water's route/hash regression intact. Test actual interactions, not only screenshots.
12. **Release and learn:** Publish only within the owner's authorized task. For website publication, verify the Actions result and public page/media. For YouTube, record the actual upload URL/time separately. Compare available analytics at similar ages; do not invent audience outcomes or guarantee virality.

## Technical reference and limits

The full water engine uses pinned Remotion/React/TypeScript, local Chrome, FFmpeg/FFprobe and Python audio/QA utilities. The engine's lockfile and delivery manifests, not the illustration subset here, record its working runtime. Source frame state is deterministic within a fixed runtime; cross-environment byte-identical video output is not promised.

The current full-engine layout target is 1080×1920 at 30 fps; its tested text rectangle is x=48..1032, y=120..1770. Existing audio QA accepts −18 to −14 LUFS integrated and true peak below −0.5 dBTP. These are project checks, not guarantees about every platform/player overlay. Preserve actual measurements and review the export.

This website's checked commands are:

```sh
npm ci
npm test
npm run build
npm run check:dist
npm run preview
```

They build/check the interactive website, **not new videos**. `scripts/build.mjs` currently builds Water Lab only. Generalized multi-episode rendering/build adapters and YouTube scheduling are separate future work.

## New-agent handoff

Every task should state episode ID/slug/title, current stage, source/brief paths, target, output revision, exact next deliverable, unresolved claim/defect, reusable assets, relevant tested commands and publication scope. Close by updating the episode/week report and naming the next concrete unfinished step. Read [AGENTS.md](../AGENTS.md) and [weekly planning](weekly-planning.md).
