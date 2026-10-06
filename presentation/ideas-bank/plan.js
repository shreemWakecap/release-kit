/* Ideas bank plan: every slide we built (bright dots) plus every planned idea that was never built (blueprint cards, until a builder writes them into `new-slides/`). */
Deck.plan([
  /* ---- The stakes */
  { id: 'title', section: 'why', t: 'The big idea', title: 'From a weather station to one data bank', st: 'none' },
  { id: 'question', section: 'why', t: 'Safe now?', title: 'Is it safe to work right now?', st: 'live' },
  { id: 'badges', section: 'why', t: 'Claim badges', title: 'Every claim wears a badge', st: 'none' },
  { id: 'map', section: 'why', t: 'This map', title: 'The story map', st: 'none' },
  { id: 'stakes', section: 'why', t: 'Cost of a decision', title: 'The cost of every decision', st: 'live' },
  { id: 'stakes-lives', section: 'why', t: 'Lives and hours', title: 'What a wrong call costs: lives and hours', st: 'stat' },
  { id: 'chain', section: 'why', t: 'Heat to cost chain', title: 'From heat to cost: the chain', st: 'stat' },
  /* ---- The conversion */
  { id: 'before', section: 'convert', t: 'Before: standalone', title: 'Before: a weather station on its own', st: 'code' },
  { id: 'timeline', section: 'convert', t: 'Six eras, 497 days', title: 'Six eras, 497 days', st: 'code' },
  { id: 'conversion', section: 'convert', t: 'How it grew', title: 'One app grew into three', st: 'code' },
  { id: 'shipped', section: 'convert', t: 'Three products', title: 'One portal area, three products', st: 'live' },
  { id: 'renameday', section: 'convert', t: 'Rename day', title: 'Rename day: one name, 260 files', st: 'code' },
  { id: 'status', section: 'convert', t: 'Where it stands', title: 'Where it stands', st: 'code' },
  { id: 'build', section: 'convert', t: 'The build in numbers', title: 'The build in numbers', st: 'code' },
  /* ---- The paths of readings */
  { id: 'flow', section: 'tech', t: 'Sensor to screen', title: 'Two paths in. One page.', st: 'code' },
  { id: 'flow-detailed', section: 'tech', t: 'Detailed paths', title: 'The path of every reading, today (first detailed version)', st: 'code' },
  { id: 'platform', section: 'tech', t: 'The system around it', title: 'The system around Connected Environment', st: 'code' },
  { id: 'flow-weather', section: 'tech', t: 'Weather path', title: 'Weather: from a sensor head to a pixel', st: 'code' },
  { id: 'flow-lightning', section: 'tech', t: 'Lightning path', title: 'Lightning: silence is never clear', st: 'code' },
  { id: 'flow-gas', section: 'tech', t: 'Gas path', title: 'Gas: asked every 45 seconds', st: 'code' },
  { id: 'provenance', section: 'tech', t: 'Where numbers come from', title: 'Where each number comes from', st: 'code' },
  { id: 'alerts', section: 'tech', t: 'Alerts leave the screen', title: 'Alerts leave the screen', st: 'code' },
  /* ---- The data bank */
  { id: 'stores', section: 'bank', t: 'What is stored where', title: 'What is stored where', st: 'code' },
  { id: 'gaps', section: 'bank', t: 'What prediction needs', title: 'What prediction would still need', st: 'code' },
  { id: 'keys', section: 'bank', t: 'The join keys', title: 'The join keys that already exist', st: 'code' },
  { id: 'pool', section: 'bank', t: 'The data bank', title: 'From three stores to one pool', st: 'vision' },
  /* ---- What it can do */
  { id: 'predict', section: 'future', t: 'Predict and plan', title: 'Plan the day early', st: 'vision' },
  { id: 'plan', section: 'future', t: 'Plan', title: 'Plan: suggested work plans', st: 'vision' },
  { id: 'lives', section: 'future', t: 'Save lives', title: 'Save lives: the closed loop', st: 'vision' },
  { id: 'permits', section: 'future', t: 'Work permits', title: 'Permits check the weather', st: 'vision' },
  { id: 'equipment', section: 'future', t: 'Equipment', title: 'Equipment meets the weather', st: 'vision' },
  { id: 'streams', section: 'future', t: 'Four data streams', title: 'One system, four data streams', st: 'vision' },
  { id: 'connect', section: 'future', t: 'Other products', title: 'Connect to other WakeCap products', st: 'vision' },
  /* ---- The numbers */
  { id: 'calc', section: 'numbers', t: 'Your site, published rates', title: 'Your site, published rates', st: 'stat' },
  { id: 'relations', section: 'numbers', t: 'The relations', title: 'The relations, with numbers', st: 'stat' },
  /* ---- What next */
  { id: 'roadmap', section: 'next', t: 'Our roadmap', title: 'Our roadmap', st: 'plan' },
  { id: 'close', section: 'next', t: 'Wrap up', title: 'One data bank. One answer. Lives first.', st: 'none' },
  /* ---- Extras */
  { id: 'sources', section: 'appendix', t: 'Every number, its source', title: 'Every number, its source', st: 'stat' },
  { id: 'limits', section: 'appendix', t: 'What we don’t claim', title: 'What we do not claim', st: 'none' },
]);
