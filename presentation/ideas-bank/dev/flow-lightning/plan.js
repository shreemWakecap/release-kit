Deck.plan([
  { id: 'flow-lightning', section: 'tech', t: 'Lightning path', title: 'Lightning: silence is never clear', st: 'code', brief: 'A backup that never reads silence as safe.', shows: ['The warning unit decides; WakeCap is the backup', 'Two queues, each with a dead-letter queue', 'Stale after four missed heartbeats, swept every 5 s', 'Only green is safe'], needs: ['C3'] },
]);
