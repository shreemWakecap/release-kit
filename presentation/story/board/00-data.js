/* Shared story map data for the board. status: live | code | test | plan | vision | stat | none. built = slide exists. short = in the 15 slide path. */
window.SM = {
  acts: [
    { key: 'why', name: 'The stakes', color: '#FF8300', stations: [
      { n: 1, t: 'Title', st: 'none', built: 1, short: 1 }, { n: 2, t: 'Safe to work now?', st: 'live', built: 1, short: 1 }, { n: 3, t: 'Claim badges', st: 'none', built: 1 },
      { n: 4, t: 'What a wrong call costs', st: 'stat', short: 1 }, { n: 5, t: 'Heat to cost chain', st: 'stat' } ] },
    { key: 'convert', name: 'The conversion', color: '#FFB366', stations: [
      { n: 6, t: 'Before: standalone', st: 'code' }, { n: 7, t: 'Six eras, 497 days', st: 'code', short: 1 }, { n: 8, t: 'Three products', st: 'live', built: 1, short: 1 },
      { n: 9, t: 'Rename day', st: 'code' }, { n: 10, t: 'Where it stands', st: 'code', short: 1 }, { n: 11, t: 'The build in numbers', st: 'code' } ] },
    { key: 'tech', name: 'The paths of readings', color: '#4FB3FF', stations: [
      { n: 12, t: 'Platform map', st: 'code', short: 1 }, { n: 13, t: 'Weather path', st: 'code', short: 1 }, { n: 14, t: 'Lightning path', st: 'code' },
      { n: 15, t: 'Gas path', st: 'code' }, { n: 16, t: 'Where numbers come from', st: 'code' }, { n: 17, t: 'Alerts leave the screen', st: 'code' } ] },
    { key: 'bank', name: 'The data bank', color: '#2BD576', stations: [
      { n: 18, t: 'Three ponds today', st: 'code', short: 1 }, { n: 19, t: 'Missing for prediction', st: 'code' }, { n: 20, t: 'The join keys', st: 'code' }, { n: 21, t: 'The pool', st: 'vision', short: 1 } ] },
    { key: 'future', name: 'What the bank enables', color: '#C58BFF', stations: [
      { n: 22, t: 'Predict the window', st: 'vision', short: 1 }, { n: 23, t: 'Suggested work plans', st: 'vision' }, { n: 24, t: 'Save-lives loop', st: 'vision' },
      { n: 25, t: 'Permits meet weather', st: 'vision', short: 1 }, { n: 26, t: 'Equipment meets weather', st: 'vision' }, { n: 27, t: 'Four data streams', st: 'vision' } ] },
    { key: 'numbers', name: 'Lives and cost', color: '#FFC24B', stations: [
      { n: 28, t: 'Your-site calculator', st: 'stat', short: 1 }, { n: 29, t: 'Relations, with numbers', st: 'stat' } ] },
    { key: 'next', name: 'Next and sources', color: '#F4F4F2', stations: [
      { n: 30, t: 'Roadmap, no dates', st: 'plan', short: 1 }, { n: 31, t: 'Close: lives first', st: 'none', short: 1 }, { n: 32, t: 'Sources', st: 'stat' }, { n: 33, t: 'What we do not claim', st: 'none' } ] },
  ],
  stCol: { live: '#2BD576', code: '#4FB3FF', test: '#FFC24B', plan: '#B9B9B4', vision: '#C58BFF', stat: '#FFFFFF', none: '#7C7C78' },
};
