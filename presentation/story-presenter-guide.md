# Connected Environment story: presenter guide

Open `connected-environment-story.html` in Chrome. It works offline.

**One press per slide:** press → once and the whole slide plays by itself. Press → again to skip to the end of the slide. Press → again to go on. Press J if you prefer one step per press.

**Keys:** → or Space = next step · ← = back · O = all slides · N = notes · P = presenter window · S = short talk · F = full screen · B = black screen · L = laser · T = timer · M = calm · ? = help

**Full story:** 8 slides. **Short talk (S):** 7 slides.

## Run of show

| # | Slide | Steps | Short talk | Minutes |
|---|---|---|---|---|
| 1 | From a weather station to one data bank | 2 | yes | 1 |
| 2 | Is it safe to work right now? | 4 | yes | 1 |
| 3 | The cost of every decision | 4 | yes | 1 |
| 4 | One app grew into three | 5 | yes | 1 |
| 5 | Two paths in. One page. | 4 | yes | 1.3 |
| 6 | Connect to other WakeCap products | 3 | yes | 1 |
| 7 | Our roadmap | 4 |  | 1.2 |
| 8 | One data bank. One answer. Lives first. | 3 | yes | 0.5 |

## Talk track

### 1. From a weather station to one data bank

> One weather app became three products. Next step: one data bank.
>
> Step 1: Weather Station, Lightning and Gas are live today.
>
> Step 2: the purple dots are the future: permits, equipment, workers. Not built yet.

### 2. Is it safe to work right now?

> On site, one question matters: is it safe to work right now?
>
> Heat says Danger. Lightning says All Clear. Gas says Check.
>
> These are live screens from three projects, 4 October 2026.
>
> Check is not calm. It means we cannot be sure.
>
> Connected Environment puts all three in one place.

### 3. The cost of every decision

> Every decision to stop work has a cost. Stop too late, and people are at risk. Stop too early, and hours are lost.
>
> Step 1: this is a real page from a live project. It shows 30 days of heat, and the limit.
>
> Step 2: each red bar is a day the limit would have stopped work. For heat, that is 8 of 30 days.
>
> Step 3: for wind, it is 1 of 30 days.
>
> Step 4: a limit is a decision. This page shows its cost in days, before anyone sets it.

**If asked:**
- the limits on that page are 46 °C for heat and 32 km/h for wind. When we captured it, the heat index was 50.1 °C, in Danger, with 30 minutes of work, 10 minutes of rest and 250 ml of water every 15 minutes. The bars are redrawn from the live page: same 30 days, same limits, same red days.

### 4. One app grew into three

> Open with the headline: one app grew into three products.
>
> Step 1, May 2025: Weather Station was one product on its own.
>
> Step 2, June 2026: it got its own app.
>
> Step 3, August 2026: the app got a new name, Connected Environment.
>
> Step 4, September 2026: Lightning and Gas joined it.
>
> Step 5, October 2026: it reached version 1.0.

**If asked:**
- the backend was about 276 commits old before the UI moved to its own app (June 2026). The rename on 24 Aug 2026 moved about 260 files. The backend moved about 345 files on 27 Aug. The first production tag under the new name was 3 Sep 2026. Version 1.0 was tagged 30 Sep 2026, so the Oct label means the 1.0 build that was live that month: build 1.0.7 was seen live on 4 Oct 2026. Lightning landed in the code on 30 Aug 2026, Gas screens on 8 Sep and the Gas backend on 13 Sep.

### 5. Two paths in. One page.

> Two paths bring data in today. We can support more.
>
> Step 1: path 1 is our own Modbus path. A weather sensor talks Modbus. Our mesh radio and a gateway carry it to the cloud. Then our system works out the heat answer.
>
> Step 2: Lightning uses the same path. A warning unit decides on site. We are the backup. If we hear nothing, we never say all clear.
>
> Step 3: path 2 is the maker’s cloud. Gas detectors send to the maker, and we ask the maker for the readings.
>
> Step 4: we can support more paths. Today we have two. Both end on one page you read.

**If asked:**
- Weather and Lightning both use Modbus. Weather has a sensor head. Lightning has an input module on the warning unit. Both ride the same mesh radio and gateway into AWS IoT and a queue. A sensors service saves the weather and the new backend reads it. The backend takes the Lightning queues itself. Gas is read from the maker’s cloud on a timer. This is from the code; deploy is not verified.

### 6. Connect to other WakeCap products

> Our data does not have to stop at our screens. We can connect it to other WakeCap products.
>
> This is the data bank. It holds Weather, Lightning and Gas. Today the example is wind speed.
>
> Step 1: example one is Work Permits. A lifting action needs a safe wind. When the wind speed goes over the limit, the permit holds.
>
> Step 2: example two is Equipment. Wind speed can help plan when vehicles move.
>
> Step 3: example three is work plans. We can plan the day early. A person approves every plan.
>
> More products can join later. This is a vision. Nobody has built it.

**If asked:**
- the Digital Work Permit service and the equipments service already run as separate services. The permit service already sends permit types to the Observation Manager. That is in the code; full production state is not proven. Our product already has a wind limit and a lightning state that a permit could read. A permit could also read gas and heat: for example, hot work waits for gas OK, and a confined space stops when heat is in danger. A forecast, safe hours and work plans do not exist in the code today.

### 7. Our roadmap

> This is our roadmap. First, what is live today: Weather Station, Lightning and Gas.
>
> Step 1: finish 1.0. Gas peaks and totals, and alerts that know the zone.
>
> Step 2: build the data bank. One shared key, and join the data.
>
> Step 3: connect to other products and plan the day. Work Permits, Equipment, forecasts and plans.
>
> Step 4: a person approves every action.

### 8. One data bank. One answer. Lives first.

> Three lights, three answers, now one light: one data bank, one answer, lives first. Say it slowly, then press Next, say thank you and take questions.
