# Implementation Plan: West End Dog-Inclusive Outing Planner

**Branch**: `001-dog-outing-planner` | **Date**: 2026-09-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-dog-outing-planner/spec.md`

## Summary

Build a mobile-first static web prototype that lets dog owners plan, review, navigate, and adapt a
dog-inclusive multi-stop outing in West End, Brisbane. The implementation will use plain HTML, CSS,
and vanilla JavaScript, with Leaflet and OpenStreetMap tiles for the real West End base map. All
prototype-specific destinations, facilities, routes, weather, crowd states, route steps, and alerts
will come from local mock data. Optional saved dog preferences will use browser localStorage.

The prototype will optimise for reliable usability testing rather than production robustness:
active navigation advances through predefined route steps, crowd-change alerts trigger at a
predefined step, facility distances are predefined per step, and Plan B appears as a highlighted
alternative route overlay with simple comparison labels.

## Technical Context

**Language/Version**: HTML5, CSS3, vanilla JavaScript using modern browser APIs supported by current
mobile browsers

**Primary Dependencies**: Leaflet for map display; OpenStreetMap tile layer for real West End base
map

**Storage**: Local JavaScript/JSON mock data files for prototype content; browser localStorage for
optional saved dog preferences

**Testing**: Manual usability-test scenarios, browser smoke checks, responsive viewport checks,
localStorage persistence checks, and deterministic scenario walkthroughs

**Target Platform**: Mobile-first static web prototype, usable in current iOS Safari, Android
Chrome, and desktop browsers for facilitator testing

**Project Type**: Static front-end web prototype

**Performance Goals**: Initial prototype screen usable within 3 seconds on a typical mobile
connection; route-step updates and Plan B display feel immediate during moderated testing

**Constraints**: No backend, no authentication, no server database, no live application APIs, no
full routing engine, no production-grade route optimisation, no live crowd or weather data

**Scale/Scope**: One HCI prototype covering one curated West End scenario set: planning, itinerary
review, map review, saved dog preference reuse, active navigation, facility visibility, simulated
crowd change, and route adaptation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Prototype-first**: PASS. The plan prioritises realistic interaction and repeatable usability
  testing over production infrastructure.
- **Mobile-first simplicity**: PASS. The UI is planned as a smartphone-first static prototype with
  simple one-column flows and glanceable navigation.
- **Progressive disclosure**: PASS. Planning, itinerary review, and active navigation separate
  always-visible, contextual, and on-demand information.
- **Research-driven design**: PASS. The plan maps directly to the specification's design
  hypotheses and success criteria.
- **Real geography, simulated dynamic data**: PASS. Leaflet/OpenStreetMap provides real West End
  geography; prototype-specific overlays are local mock data.
- **Minimal technical complexity**: PASS. The selected architecture avoids frameworks, backend
  services, databases, accounts, live APIs, and build tooling unless later proven necessary.
- **Glanceable active navigation**: PASS. Active navigation prioritises route, next destination,
  distance/time, nearest water, and nearest bin.
- **Contextual dynamic assistance**: PASS. Crowd alerts appear only at the predefined route step
  when relevant.
- **User-controlled adaptation**: PASS. Users choose whether to keep the current route or switch to
  Plan B.
- **Lightweight personalisation**: PASS. Saved dog preferences are optional and lightweight.
- **Transparent simulation**: PASS. Simulated overlays and dynamic data must be labelled as
  prototype data.
- **Maintain prototype scope**: PASS. The plan excludes production infrastructure and broader
  product features.

No constitution violations require justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-dog-outing-planner/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- ui-flows.md
|   `-- mock-data.md
|-- checklists/
|   `-- requirements.md
`-- tasks.md
```

### Source Code (repository root)

```text
index.html
assets/
|-- css/
|   `-- styles.css
|-- js/
|   |-- app.js
|   |-- state.js
|   |-- storage.js
|   |-- map.js
|   |-- planner.js
|   |-- navigation.js
|   `-- ui.js
`-- data/
    |-- destinations.js
    |-- facilities.js
    |-- routes.js
    |-- scenarios.js
    `-- weather.js
```

**Structure Decision**: Use a single static front-end project at repository root. Keep source files
small and explicit: mock data in `assets/data/`, feature logic in focused vanilla JavaScript files,
and all UI served by `index.html`. This keeps the project compatible with GitHub Pages and avoids
unnecessary build tooling.

## Major UI Views and Components

- **Start / Dog Selection View**: lets users select a saved dog, continue without one, or enter
  lightweight preferences.
- **Planning View**: activity selection, available time selection, optional dog preferences, and
  lightweight simulated weather context.
- **Itinerary Review View**: ordered stops, route summary, primary dog-access details, map preview,
  and destination/route replacement controls.
- **Map Review Panel**: Leaflet map with real West End base map and local overlays for
  destinations, route, facilities, crowd segments, and optional layers.
- **Active Navigation View**: simplified view with current route, next destination, distance/time,
  nearest water, nearest bin, and manual route-step controls for test progression.
- **Contextual Alert / Plan B Sheet**: appears at the predefined crowd-change route step and shows
  a highlighted alternative route overlay with simple comparison labels.
- **Details Sheets**: on-demand access rules, destination details, additional facilities, source or
  update notes, and alternative route detail.

## Application State

State remains client-side and resettable for test facilitation:

- `selectedDogId`
- `temporaryPreferences`
- `selectedActivities`
- `availableTime`
- `selectedItineraryId`
- `currentRouteId`
- `activeRouteStepIndex`
- `alertState`
- `planBVisible`
- `planBSwitched`
- `facilityLayerVisible`
- `detailsPanel`
- `simulationDisclosureAcknowledged`

Saved dog preferences persist only through localStorage. Everything else can reset on refresh or
through a prototype reset control.

## Mock Data Structure

Local mock data will define:

- destinations with activity tags, coordinates, dog-access details, source/update note, and
  suitability hints
- facilities with type, coordinates, description, and optional availability/status
- routes with primary and Plan B coordinate arrays, ordered stops, route steps, crowd segments,
  route summaries, and per-step facility distances
- scenarios with deterministic event triggers such as crowd-change route step and alert copy
- weather as static or scenario-specific planning context

## Map and Route Representation

Leaflet displays the real West End base map. Prototype-specific data appears as overlays:
destination markers, facility markers, route polylines, route-step position marker, crowd-level
segment styles, and highlighted Plan B polyline. Routes are predefined line geometries in local
mock data, not generated by a routing engine.

## Route-Step Navigation Simulation

Active navigation uses predefined route steps. The participant or facilitator advances steps with a
visible control during testing. Each step updates the current position marker, next destination,
remaining distance/time copy, nearest drinking water distance, nearest bin distance, and contextual
crowd segment state.

## Crowd-Change Scenario Handling

The crowd-change event triggers when active navigation reaches the predefined route step in local
scenario data. The alert uses minimal text, offers keep/switch choices, and can optionally request
device vibration where supported. If vibration is unavailable, the visual alert remains complete.

## Plan B Route Switching

Plan B is represented as a highlighted alternative route overlay with simple comparison labels such
as quieter, extra minutes, or extra distance. Users can inspect the overlay, keep the current route,
or switch to Plan B. Switching updates `currentRouteId`, hides or resolves the alert, and continues
manual route-step navigation on the selected route.

## Dog Preference Saving and Reuse

Dog preferences are optional. If saved, localStorage stores only a generated local id, dog name,
preference flags, and last updated timestamp. The user can select a saved dog on a future visit,
temporarily modify preferences for the current outing, or explicitly save updates. No accounts,
server storage, or authentication are used.

## Responsive Mobile Layout

The UI is designed mobile-first with a single-column flow, touch-friendly controls, bottom sheets
for secondary details, compact map overlays, and short labels in active navigation. Desktop layouts
may center the mobile prototype or provide a wider map/review composition for facilitator use.

## Static Deployment Approach

The prototype should run from static files and be deployable with GitHub Pages. During development,
a simple local static server is enough for browser testing. External dependencies should be loaded
in the simplest way compatible with static deployment, with any CDN dependency documented in
quickstart.

## Testing Approach

- Run through the end-to-end moderated usability script on a mobile viewport.
- Verify activity selection, itinerary generation, map display, dog-access details, and adjustment
  controls.
- Verify saved dog creation, reuse, temporary preference change, and localStorage reset.
- Verify manual route-step advancement updates navigation content deterministically.
- Verify crowd-change alert triggers at the predefined step.
- Verify Plan B overlay comparison and keep/switch decisions.
- Verify simulated data disclosure is visible and understandable.
- Smoke test in iOS Safari, Android Chrome, and a desktop browser.

## Complexity Tracking

No constitution violations or unnecessary complexity are introduced.
