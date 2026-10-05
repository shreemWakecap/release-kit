/* Ideas bank plan: every slide we built (bright dots) plus every planned idea that was never built (blueprint cards, until a builder writes them into `new-slides/`). */
Deck.plan([
  /* ---- The stakes */
  { id: 'title', section: 'why', t: 'The big idea', title: 'From a weather station to one data bank', st: 'none' },
  { id: 'question', section: 'why', t: 'Safe now?', title: 'Is it safe to work right now?', st: 'live' },
  { id: 'badges', section: 'why', t: 'Claim badges', title: 'Every claim wears a badge', st: 'none' },
  { id: 'map', section: 'why', t: 'This map', title: 'The story map', st: 'none' },
  { id: 'stakes', section: 'why', t: 'Cost of a decision', title: 'The cost of every decision', st: 'live' },
  { id: 'stakes-lives', section: 'why', t: 'What a wrong call costs', title: 'What a wrong call costs: lives and hours', st: 'stat', brief: 'Real numbers on heat, lightning and gas, each with publisher and year.', shows: ['Heat stress: workers exposed, deaths, hours lost', 'Lightning: deaths and injuries a year', 'Gas and confined spaces: deaths and the limits', 'Counters count up. Every number shows publisher and year.'], needs: ['web numbers S1 to S4'] },
  { id: 'chain', section: 'why', t: 'Heat to cost chain', title: 'From heat to cost: the chain', st: 'stat', brief: 'How hot hours become lost hours, injuries and money. Every link carries a published coefficient.', shows: ['Hot hours reduce work capacity (published curve)', 'Lost hours become cost', 'Heat raises injury risk; injuries become deaths and cost', 'What prevention returns per dollar'], needs: ['relations model'] },
  /* ---- The conversion */
  { id: 'before', section: 'convert', t: 'Before: standalone', title: 'Before: a weather station on its own', st: 'code' },
  { id: 'timeline', section: 'convert', t: 'Six eras, 497 days', title: 'Six eras, 497 days', st: 'code', brief: 'An animated timeline from the first backend commit to build 1.0.7.', shows: ['Eras: standalone, extraction, answer-first, rename, products land, 1.0', 'Commits per era: backend 447, front end 348', 'Rename to 1.0 in 37 days', 'Each milestone lights up in order'], needs: ['C1'] },
  { id: 'conversion', section: 'convert', t: 'How it grew', title: 'One app grew into three', st: 'code' },
  { id: 'shipped', section: 'convert', t: 'Three products', title: 'One portal area, three products', st: 'live' },
  { id: 'renameday', section: 'convert', t: 'Rename day', title: 'Rename day: one name, 260 files', st: 'code', brief: 'The day the app became Connected Environment, before and after.', shows: ['24 Aug: the app is renamed connected-environment', '260 files move under one product folder', '27 Aug: the backend follows with 345 files', 'A tree that morphs from before to after'], needs: ['C1'] },
  { id: 'status', section: 'convert', t: 'Where it stands', title: 'Where it stands', st: 'code' },
  { id: 'build', section: 'convert', t: 'The build in numbers', title: 'The build in numbers', st: 'code', brief: 'What was built, counted from the code.', shows: ['3 products, 6 front end feature folders', '28 controllers, 67 endpoints, 7 background services', '43 migrations, 31 tables, 33 MCP tools', 'Odometer counters with the command behind each'], needs: ['C1', 'C5'] },
  /* ---- The paths of readings */
  { id: 'flow', section: 'tech', t: 'Sensor to screen', title: 'Two paths in. One page.', st: 'code' },
  { id: 'flow-detailed', section: 'tech', t: 'Detailed paths', title: 'The path of every reading, today (first detailed version)', st: 'code' },
  { id: 'platform', section: 'tech', t: 'The platform around it', title: 'The platform around Connected Environment', st: 'code', brief: 'The services CE already talks to, and the ones it could.', shows: ['Mesh ingest, domain services, micro-apps', 'Observation Manager and notification rules', 'Location, zones and the safety service', 'Permits and equipment live in separate services'], needs: ['C6 ecosystem'] },
  { id: 'flow-weather', section: 'tech', t: 'Weather path', title: 'Weather: from a sensor head to a pixel', st: 'code' },
  { id: 'flow-lightning', section: 'tech', t: 'Lightning path', title: 'Lightning: silence is never clear', st: 'code', brief: 'A backup that never reads silence as safe.', shows: ['The warning unit decides; WakeCap is the backup', 'Two queues, each with a dead-letter queue', 'Stale after four missed heartbeats, swept every 5 s', 'Only green is safe'], needs: ['C3'] },
  { id: 'flow-gas', section: 'tech', t: 'Gas path', title: 'Gas: asked every 45 seconds', st: 'code', brief: 'No mesh, no Modbus: the vendor cloud, polled.', shows: ['One call returns the whole fleet', 'A reading over the High alarm opens an alert', 'Four critical alert types', 'Acknowledge and close stay in WakeCap'], needs: ['C4'] },
  { id: 'provenance', section: 'tech', t: 'Where numbers come from', title: 'Where each number comes from', st: 'code' },
  { id: 'alerts', section: 'tech', t: 'Alerts leave the screen', title: 'Alerts leave the screen', st: 'code' },
  /* ---- The data bank */
  { id: 'stores', section: 'bank', t: 'What is stored where', title: 'What is stored where', st: 'code', brief: 'Three ponds today, with their real sizes.', shows: ['Sensors DB: 1.5 million weather readings (internal doc, Aug 2026)', 'CE Postgres: 31 tables, up from 10 in 70 days', 'Observation DB: events and recipients', 'No foreign keys across them'], needs: ['C5'] },
  { id: 'gaps', section: 'bank', t: 'Missing for prediction', title: 'What prediction would still need', st: 'code', brief: 'The honest gaps, read from the code.', shows: ['No forecast or trend code today', 'Verdicts stored as episodes since 20 Sep 2026', 'Gas history is stored; the screens say not yet', 'Weather observations carry no zone'], needs: ['C5', 'C6'] },
  { id: 'keys', section: 'bank', t: 'The join keys', title: 'The join keys that already exist', st: 'code' },
  { id: 'pool', section: 'bank', t: 'The data bank', title: 'From three stores to one pool', st: 'vision' },
  /* ---- What it can do */
  { id: 'predict', section: 'future', t: 'Predict and plan', title: 'Plan the day early', st: 'vision' },
  { id: 'plan', section: 'future', t: 'Suggested work plans', title: 'Plan: suggested work plans', st: 'vision', brief: 'Tasks placed into the cool windows; a person approves.', shows: ['Heavy tasks in cool windows', 'Work and rest cycles from the policy', 'A person approves every plan', 'Published evidence for shifted hours'], needs: ['web numbers S1, S7'] },
  { id: 'lives', section: 'future', t: 'Save-lives loop', title: 'Save lives: the closed loop', st: 'vision', brief: 'Sense, predict, decide, notify, act.', shows: ['The loop, step by step', 'Existing today: Observation Manager and recipient rules', 'Lead times from published systems', 'A person stays in charge'], needs: ['web numbers S7', 'C6'] },
  { id: 'permits', section: 'future', t: 'Work permits', title: 'Permits check the weather', st: 'vision' },
  { id: 'equipment', section: 'future', t: 'Equipment meets weather', title: 'Equipment meets the weather', st: 'vision', brief: 'Stand-down rules from wind, lightning and heat.', shows: ['Crane wind stand-down', 'Lightning stand-down', 'Heat and operator fatigue', 'Equipment telemetry already exists: GPS and violations'], needs: ['web numbers S5', 'C6'] },
  { id: 'streams', section: 'future', t: 'Four data streams', title: 'One platform, four data streams', st: 'vision', brief: 'Environment, workforce, permits and equipment, joined.', shows: ['What each stream adds', 'Questions only a join can answer', 'Insights that cross streams'], needs: ['C5', 'C6'] },
  { id: 'connect', section: 'future', t: 'Other products', title: 'Connect to other WakeCap products', st: 'vision' },
  /* ---- The numbers */
  { id: 'calc', section: 'numbers', t: 'Your-site calculator', title: 'Your site, published rates', st: 'stat', brief: 'An interactive calculator driven by published rates. An illustration, never a WakeCap result.', shows: ['Sliders: workers, hours, hot days', 'Published rates drive the result', 'Switch SAR or USD', 'Every coefficient shows its source'], needs: ['relations model'] },
  { id: 'relations', section: 'numbers', t: 'Relations, with numbers', title: 'The relations, with numbers', st: 'stat', brief: 'The chain from hot hours to lives and money, with sourced coefficients.', shows: ['Cause to effect, link by link', 'Returns on prevention', 'What is known and what is not'], needs: ['relations model'] },
  /* ---- What next */
  { id: 'roadmap', section: 'next', t: 'Our roadmap', title: 'Our roadmap', st: 'plan' },
  { id: 'close', section: 'next', t: 'Wrap up', title: 'One data bank. One answer. Lives first.', st: 'none' },
  /* ---- Extras */
  { id: 'sources', section: 'appendix', t: 'Sources', title: 'Every number, its source', st: 'stat', brief: 'The table of every published number, its publisher, year and verification result.', shows: ['Publisher, title, year, link', 'Verified, partial or unverified', 'Which slide uses it'], needs: ['all web numbers'] },
  { id: 'limits', section: 'appendix', t: 'What we don’t claim', title: 'What we do not claim', st: 'none' },
]);
