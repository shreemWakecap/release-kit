# Connected Environment 1.0: presenter guide

For the internal release presentation. Assumes an internal audience (product, delivery, support, sales engineering) and about 12 minutes of talk plus questions. Nothing in this folder was posted or sent.

**Files:** `connected-environment-1.0.pptx` (editable, speaker notes on every slide), `connected-environment-1.0.pdf` (to present or share), `one-pager.pdf` (leave-behind), this guide. Videos: `../four-videos/final/`.

## Run of show

| Slide | Title | Min | Cue |
|---|---|---|---|
| 1 | Connected Environment 1.0 | 0.5 |  |
| 2 | Is it safe to work right now? | 1 |  |
| 3 | One product. Three environment products inside. | 1 | Play the overview video here (3:21) if you have time, or at the end. |
| 4 | A heat number is not an answer | 1.5 | Optional: Weather Station video (2:18). |
| 5 | Look back at the heat. Check what stops work. | 1.25 |  |
| 6 | A backup, not the alarm | 1.25 | Optional: Lightning video (2:08). |
| 7 | A quiet screen is not a safe screen | 1.5 | Optional: Gas video (2:32). |
| 8 | Each project switches on only what it uses | 0.75 | If asked how to enable or configure: setup tour (4:33), or appendix slide 12. |
| 9 | Three roads in, one platform behind them | 1 |  |
| 10 | What it does not do yet, and where it is going | 1 |  |
| 11 | Five short videos, and one place to start | 0.75 |  |
| | **Talk total** | **11.5** | Add 3:21 if you play the overview video. Questions: 5 min. |

**Short version (about 8 minutes):** slides 1, 2, 3, 10 and 11, then play the overview video (3:21).

**Appendix (not presented, kept for questions):** 12 setup flows, 13 careful wording, 14 glossary.

## Talk track

### 1. Connected Environment 1.0

> Welcome. About twelve minutes, plus questions. The overview video (3:21) is optional.
>
> We cover why we built Connected Environment, what is in 1.0 today, what it does not do yet, and where to watch and try it.
>
> The three chips on the right are the three answers a site can get: Danger from Weather Station, All Clear from Lightning, Check from Gas. That is the whole story in one picture.

### 2. Is it safe to work right now?

> On site the question is simple: is it safe to work right now?
>
> Heat says one thing. Lightning says another. Gas says a third. Three screens, three products, three places to look.
>
> Connected Environment puts them under one roof.
>
> These tiles are live production screens from three different projects, captured on 4 October. Weather showed Danger. Lightning showed All Clear. Gas showed Check.
>
> Point out that Check does not mean calm. It means one detector is not reporting, so the screen cannot confirm it is safe.

### 3. One product. Three environment products inside.

> Connected Environment is one umbrella in the portal.
>
> Under it sit Weather Station, Lightning and Gas, each with its own screens and devices.
>
> They share one platform: one backend, one menu and header. A project switches on only the products it uses.
>
> The last line, new environment products go under it, is our stated direction. It is not a shipped feature, so say it as direction.

### 4. A heat number is not an answer

> A heat number does not tell a supervisor what to do. The strip across the top does: Danger, in words, and an instruction.
>
> One: View Recommended Steps opens the actions in priority order. First, pause outdoor work and move crews to shade or rest. Then notify the site safety officer.
>
> Two: the heat card carries the cycle in force. Work time, rest time, and drinking water.
>
> Three: station health. An offline station is named, and readiness reads Not ready.
>
> Four: the gear opens Select parameters. It chooses which readings are featured. Each station also has a rename pencil.

### 5. Look back at the heat. Check what stops work.

> Two more places.
>
> Reports: pick a period and see the peak heat index and peak wind speed across stations, with a daily breakdown and an Excel export.
>
> Settings, Weather Station holds the Site Safety Policy. Stop-work limits. For temperature and wind, a 30 day chart shows what the limit would have done. On the project in this screenshot, temperature would have stopped work on eight of the last 30 days, and wind on one. Those are values at capture time.
>
> Below the limits are the heat index bands, each with work, rest and water settings, and a Change history tab.
>
> Say the warning out loud: the page says changing anything here changes when work stops, for everyone on the project.

### 6. A backup, not the alarm

> Lightning is close. Who tells the crew to stop? The site&#x27;s own cabinet lights and sounder, first. This page is the backup, and its top line says so.
>
> Only the green state counts as safe to work.
>
> The rings are the configured alert distances. They are a zone reference, not a live strike position.
>
> New here: a map of the alert distances, an alarm activity chart, and an alarm history you can export as CSV.
>
> The wallboard and phone views, shown in the inset, open by web address, not from the menu.
>
> Settings, Lightning lets you edit the alert distances and set the location.

### 7. A quiet screen is not a safe screen

> A quiet gas screen is not a safe gas screen.
>
> The Gas dashboard opens on Overview. Five detectors, four online. Live alarms counts alerts nobody has acknowledged. Each gas card shows the worst current reading among the detectors that are reporting, with its limits.
>
> When a detector stops reporting, the page names it, and the status reads Check: not confirmed safe.
>
> Alerts can be acknowledged and closed, with edit access. Be explicit: that is recorded in WakeCap only. It is not sent to the gas vendor, so an alert closed here stays open in the vendor&#x27;s system.
>
> Compliance lists the limits. Exposure and exceedance figures say Not available yet, instead of an empty chart that reads as all clear.

### 8. Each project switches on only what it uses

> Each project switches on only what it uses.
>
> In Settings, Connected Products has one Active or Inactive switch per product. The table is drawn from three real projects: Weather alone, Lightning alone, and Weather with Gas. The strip below is the live screen.
>
> The menu shows what is on.
>
> We did not switch anything on or off for this deck.
>
> If someone asks how to enable a product: Settings, Connected Products. It changes a real project, so do it with the project owner.

### 9. Three roads in, one platform behind them

> Different roads in, one platform behind them.
>
> Weather stations reach WakeCap over the site&#x27;s wireless mesh, through a gateway, into the cloud, which decodes and stores the readings.
>
> Lightning is read through a small input module and shows on the mesh as a Modbus device. Modbus is an industrial wiring and data standard many sensors speak. Anything unreadable is set aside.
>
> Gas takes another road: the vendor&#x27;s cloud. No mesh, no Modbus. WakeCap asks that cloud on a regular timer, and each detector reports on its own schedule, so each reading shows its age.
>
> Do not quote polling or reporting intervals. We have not verified numbers.

### 10. What it does not do yet, and where it is going

> Be plain about the edges.
>
> Gas acknowledge and close are recorded in WakeCap only. Gas exposure and compliance figures say Not available yet, and some gas history is not stored yet. Trends is in the menu marked Planned.
>
> The AI assistant is direction only. Building blocks exist for Weather Station only. No assistant runs on any site.
>
> Direction: new environment products go under Connected Environment. A future assistant could read weather readings and propose changes. A person approves, and the weather safety answer comes from fixed rules. We promise no dates.

### 11. Five short videos, and one place to start

> Where to watch: five short videos. Start with the overview. The setup tour shows how to enable and configure each product, read only on production.
>
> To try it: open your project in the portal, then click the sun-and-cloud icon in the left rail. That is Connected Environment, if your project has it.
>
> Read the top line first: the Weather verdict, the Lightning banner, the Gas status.
>
> Then take questions. The next slides are the appendix: setup flows, what we say and do not say, and a glossary.

### 12. How products are enabled and configured  (appendix)

> Appendix: the setup flow, in order.
>
> Choose what to feature: the gear on the Weather Station page opens Select parameters.
>
> Enable: Settings, Connected Products, one switch per product.
>
> Configure Weather Station: Settings, Weather Station, the Site Safety Policy.
>
> Configure Lightning: Settings, Lightning. Edit alerting radii and Set location.
>
> Gas has no settings page. Its limits are read only on the Compliance page.
>
> The setup tour video walks through all of it. Remind the audience that enabling a product and changing a policy both affect a real project.

### 13. What we say, and what we do not say  (appendix)

> Cheat sheet for questions.
>
> Say: it is live; Lightning is a backup; gas close is recorded in WakeCap only; the assistant is direction only; new products go under it, as direction.
>
> Do not say: that a site is safe; one rule set or one audit trail; a go-live date or expansion plan; that the assistant approves anything; that gas exposure or compliance figures exist today.

### 14. Terms used in the videos and on the screens  (appendix)

> Glossary, for reference. Nothing here needs to be read out.

## Likely questions, with answers you can say

- **What is in 1.0 today?** Weather Station, Lightning and Gas, on one platform: one menu and header, and one place to switch products on per project (Settings, Connected Products).
- **Can Lightning replace the site's own alarm?** No. The page says it is a backup: the site's cabinet lights and sounder come first. Only the green state counts as safe to work.
- **If we close a gas alert in WakeCap, does it close at the gas vendor?** No. It is recorded in WakeCap only. The page says an alert closed here stays open in the vendor's system.
- **Do we have gas exposure or compliance figures?** Not yet. Those cards say Not available yet. Some gas history is not stored yet.
- **Is there an AI assistant?** Direction only. Building blocks exist for Weather Station only, and no assistant runs on any site. A person approves. The weather safety answer comes from fixed rules.
- **How does a project get Gas or Lightning?** Settings, Connected Products: one Active or Inactive switch per product. It changes a real project, so do it with the project owner. Who is allowed to change it was not verified: confirm before you promise.
- **What is new in Weather Station?** Select parameters (the gear), Reports (Maximum Values Report with Excel export), the Site Safety Policy with 30 day charts for temperature and wind, heat index bands, a Change history tab, and station rename.
- **What time zone do the pages use?** Saudi time, on every page.
- **Where do the readings come from?** Slide 9. Weather over the site's wireless mesh. Lightning through an input module that shows as a Modbus device on the mesh. Gas through the vendor's cloud. Do not quote polling or reporting intervals.
- **What does Check mean on Gas?** Not confirmed safe, for example when a detector is not reporting. It sits between Safe and Alert. It is not an all-clear.
- **Will new products go under Connected Environment?** That is the direction. No dates and no names yet.

If you do not know, say so and take it away. Do not guess a date, a number or a permission.

## Say, and do not say

**Say:** Connected Environment 1.0 is live, with Weather Station, Lightning and Gas. Lightning is a backup. Gas acknowledge and close are recorded in WakeCap only. The AI assistant is direction only. New environment products go under it (direction, no dates).

**Do not say:** that a site is safe. One rule set, or one audit trail. A go-live date or any expansion plan. That the assistant approves or runs anything. That gas exposure or compliance figures exist today. Who closed the three gas alerts on the screenshot.

## If you show the portal live

Safe to click: View Recommended Steps, Details, a station name (opens its panel), Reports period buttons, the Settings pages (look only), the Lightning and Gas pages.

Do not click on production:
- The Active or Inactive switches on Connected Products. They change a real project.
- Save or Publish on the Site Safety Policy. It changes when work stops, for everyone on the project.
- Acknowledge or Close on a gas alert.
- Any Lightning simulate or dev switch.
- Select parameters switches change your own featured cards (saved to your user). Put them back before you finish.

## Where the facts come from

- **Screens:** live production, captured 4 October 2026 (front end refreshed that day), read only. Station names, the top bar, the device label, coordinates and satellite maps are blurred or covered. Numbers on screens (a heat index of 49.5, temperature stopping work on 8 of 30 days) are values at capture, not typical values.
- **Claims:** every spoken claim traces to the evidence column of `../four-videos/final/*.script.md` and to `../release-note.md`.
- **Not verified, so not claimed:** feature-flag values; download and clipboard results; any edit, publish or audit-recording path; Lightning states other than All Clear at capture; backend deploy state; whether 'never falsely safe' holds for stale or faulty Lightning devices; polling intervals.

## Rebuild

Edit `gen_deck.py` (slides and notes) or the crops in `prep_assets.py`, then `./make.sh`. It renders the deck in Chrome, writes the PDF, builds the PPTX and runs `check_pptx.py`, which redraws the PPTX from the file and flags text that would overflow. Re-run `scan` (OCR) before sharing: see README.
