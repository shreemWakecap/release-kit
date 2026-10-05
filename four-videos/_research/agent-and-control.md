# Agent and control: research summary (2026-10-04)

Full evidence, with file:line, is in `agent-and-control.json` (33 tools, 16 agent blocks, 12 control paths, 30 claims, must_not_claim, open_questions). Labels: [code], [doc], [live] (public production endpoints probed unauthenticated) and [live-bundle] (strings in the served 1.0.5 front-end file, not a rendered screen).

## The honest one-liner for the umbrella video
"The platform is being built so an AI assistant can read what is happening on site and suggest actions, with people always approving. That is where we are heading; it is not running on your site today." Label it DIRECTION.

## What exists in code (Weather Station scope only)
- MCP server inside the backend, stateless, same sign-in as the portal. 33 tools: 26 read, 4 propose-only, 3 observer bookkeeping. No Lightning or Gas tools. The August deck's "16 tools" is stale.
- Every tool is permission-gated and fail-closed; the tool list is filtered per caller.
- Agent summary: deterministic verdict, advisory work decision (a fixed mapping of the verdict), criteria identifier that covers heat-index criteria only. Optional Claude wording with a deterministic fallback on any failure.
- Five agent-monitoring reads (readings window, capabilities, operating context, maintenance state, service health); three return honest stubs (maintenance is always "not tracked").
- Observer control plane: own tables; agent drafts and keeps a cursor; only a person with a separate review scope acknowledges, snoozes or resolves.
- Agent observations: zero-write preview; only "station not reporting" and "frozen sensor" can be proposed; sent only after a second person approves.
- Change spine: proposal (24-hour expiry, complete state), approval (separate scope, second person, exact diff echo, reason, stale if the target moved), audit reads.

## Human-approval invariant
Agent may propose, never approve. Proven by tests that walk compiled IL: no MCP code reaches approval, direct writes, the store, the outbox or the review operations (`McpWritePathBoundaryTests.cs:85,361`, `ObserverBoundaryTests.cs:266,327,349`), plus scope gates and refusals of self-approval (`ChangeApprovalServiceTests.cs:96`, `AgentObservationApprovalPathTests.cs:344,414,428`).
Caveat: a person with the weather-policy management permission publishes policy and writes limits directly (version-checked, loosening acknowledged, audited) without a second approver. Do not say every change needs two people.

## Live on 2026-10-04
- Production serves the MCP discovery document and a 401 challenge at `services.wakecap.com/weather-station/mcp`. Routes for observer findings, agent observations, change proposal and approval, change audit, safety policy and gas acknowledge exist (401 or 405, a bogus route gives 404).
- Not evidenced: any connected agent, any approver token, narration enabled, composition flag on, observation delivery working.
- Defect candidate: the production discovery document advertises a cluster-internal authority, so an outside client cannot complete discovery.
- Served front end 1.0.5 = master through the Gas "hide Zones" change; it already contains gas acknowledge and close, the lightning radii map and set-sensor-location, the observation drawer code (flag-gated) and Saudi-time strings. It lacks the later Esri map and the removed "alerts sent to the alarming service" panel.

## Observation Manager coverage
Weather: yes (automatic outbox, plus approved agent observations). Lightning: yes, on entry to Red, Fault or Offline only. Gas: NOT built; a Todo ticket was created today; the prototype's Observation Manager tab is a mock. Lightning email and SMS were removed on 2026-09-24.

## "One language" check
- One backend: confirmed.
- One permission family: confirmed for reads; writes use different grants.
- One rule set: refuted (three separate rule implementations; one shared principle, unknown never reads as safe).
- One audit trail: refuted (audit covers weather policy only; lightning settings and gas zones have none; gas acknowledge and close are recorded on the alert row).

## Biggest open questions
Identity discovery address; whether any production token carries the approval or review scope; composition flag and narration state in production; Observation Manager routing and delivery health; lightning queue configuration; whether MCP permission checks are project-scoped.
