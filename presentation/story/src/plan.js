/* The story plan: 7 slides, in order. Internal show of our own product: no outside statistics.
   Slides without a module render as blueprint placeholders until built. */
Deck.plan([
  /* ---- the stakes */
  { id: 'title', section: 'why', t: 'The big idea', title: 'From a weather station to one data bank', st: 'none', short: 1 },
  { id: 'question', section: 'why', t: 'Safe now?', title: 'Is it safe to work right now?', st: 'live', short: 1 },
  { id: 'stakes', section: 'why', t: 'Cost of a decision', title: 'The cost of every decision', st: 'live', short: 1, brief: 'A limit is a decision.', shows: ['Stop too late: people at risk', 'Stop too early: hours lost', 'Real numbers from our product'], needs: ['live screens'] },
  /* ---- the conversion */
  /* ---- data flow and the data bank */
  { id: 'flow', section: 'tech', t: 'Sensor to screen', title: 'Two paths in. One page.', st: 'code', short: 1 },
  { id: 'connect', section: 'future', t: 'Other products', title: 'Connect to other WakeCap products', st: 'vision', short: 1 },
  /* ---- what the bank enables (vision) */
  /* ---- next */
  { id: 'roadmap', section: 'next', t: 'Our roadmap', title: 'Our roadmap', st: 'plan' },
  { id: 'close', section: 'next', t: 'Wrap up', title: 'One data bank. One answer. Lives first.', st: 'none', short: 1, brief: 'Then questions.', shows: ['One data bank', 'One answer', 'Lives first'], needs: [] },
]);
