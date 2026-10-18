// Public release directory only. Keep unpublished scripts and Factory data out of this file.
export const episodes = [
  {
    id: 'water', number: '01', topic: 'EARTH SCIENCE',
    title: 'A water planet.\nSo why run dry?',
    description: 'Less rain. More people. Can you keep a tiny city’s taps flowing?',
    action: { label: 'Play Water Lab', href: './water/' },
    video: { label: 'Watch the Short', href: 'https://www.youtube.com/shorts/DS54swqTy3g' },
    format: 'AN INTERACTIVE EXPERIMENT', art: 'water',
  },
  {
    id: 'roadster', number: '02', topic: 'ENGINEERING',
    title: 'Up the wall.\nInto the air.',
    description: 'A car grips the ceiling, then takes off. Two very different tricks.',
    action: { label: 'Watch the Short', href: 'https://www.youtube.com/shorts/BILgn6OueB0' },
    format: 'A 58-SECOND EXPLANATION', art: 'roadster',
    publishAt: '2026-10-18T19:00:00.000Z',
  },
];
