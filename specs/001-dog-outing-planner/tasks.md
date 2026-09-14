# Tasks: West End Dog-Inclusive Outing Planner

**Input**: Design documents from `/specs/001-dog-outing-planner/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No automated TDD tasks are required by the specification. Validation tasks focus on
manual usability-test walkthroughs, mobile browser checks, deterministic scenario checks, and
static-site compatibility.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing
of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel after prerequisites in the same phase are complete
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the static front-end project foundation without build tooling, backend,
authentication, database, or live application APIs.

- [ ] T001 Create static entry point with Leaflet CSS/JS links and root app containers in `index.html`
- [ ] T002 [P] Create mobile-first stylesheet scaffold with CSS variables, base typography, touch targets, and responsive shell in `assets/css/styles.css`
- [ ] T003 [P] Create JavaScript module files for app, state, storage, map, planner, navigation, and UI in `assets/js/app.js`, `assets/js/state.js`, `assets/js/storage.js`, `assets/js/map.js`, `assets/js/planner.js`, `assets/js/navigation.js`, and `assets/js/ui.js`
- [ ] T004 [P] Create local mock-data module files in `assets/data/destinations.js`, `assets/data/facilities.js`, `assets/data/routes.js`, `assets/data/scenarios.js`, and `assets/data/weather.js`
- [ ] T005 Initialize app bootstrapping that imports modules, creates initial state, and renders the first screen in `assets/js/app.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared state, rendering, data, and map foundations that all user stories depend
on.

**CRITICAL**: No user story work should begin until this phase is complete.

- [ ] T006 Define central app state shape and reset defaults for planning, review, navigation, alerts, and saved-dog selection in `assets/js/state.js`
- [ ] T007 [P] Implement generic view rendering helpers, screen switching, bottom-sheet helpers, and progressive-disclosure helpers in `assets/js/ui.js`
- [ ] T008 [P] Implement localStorage read/write/reset helpers for `westEndDogPlanner.savedDogs` in `assets/js/storage.js`
- [ ] T009 [P] Add curated West End destination records with activity tags, coordinates, dog-access details, suitability tags, and source/update notes in `assets/data/destinations.js`
- [ ] T010 [P] Add facility records for water, bins, seating/shade, toilets, and parking/access points in `assets/data/facilities.js`
- [ ] T011 [P] Add primary route, Plan B route, route segments, route steps, per-step facility distances, and route summaries in `assets/data/routes.js`
- [ ] T012 [P] Add deterministic crowd-change scenario event with predefined route step, alert copy, affected segment ids, Plan B link, and optional vibration pattern in `assets/data/scenarios.js`
- [ ] T013 [P] Add simulated planning weather context with temperature label, planning note, and explicit simulated flag in `assets/data/weather.js`
- [ ] T014 Implement Leaflet map initialization, OpenStreetMap tile layer, overlay layer groups, and safe map reset behaviour in `assets/js/map.js`

**Checkpoint**: Foundation ready. The app shell loads, mock data imports, state initializes, and an empty Leaflet map can render without backend services.

---

## Phase 3: User Story 1 - Plan a Dog-Inclusive Outing (Priority: P1) MVP

**Goal**: A dog owner can select or skip a dog, choose activities and time, provide lightweight dog
preferences, and generate a suggested multi-stop outing.

**Independent Test**: Open the prototype, continue without a saved dog, select at least two
activities and a time, add a preference, and confirm that a suggested itinerary is generated.

### Implementation for User Story 1

- [ ] T015 [P] [US1] Render the start and dog-selection screen with saved dog list placeholder and continue-without-dog action in `assets/js/ui.js`
- [ ] T016 [P] [US1] Render activity selection controls for market, food, shopping, riverside walk, and rest/picnic in `assets/js/ui.js`
- [ ] T017 [P] [US1] Render available-time selection controls with concise mobile labels in `assets/js/ui.js`
- [ ] T018 [P] [US1] Render lightweight dog preference controls with mutually exclusive no-specific-preference behaviour in `assets/js/ui.js`
- [ ] T019 [US1] Implement planning state updates for selected dog, activities, available time, and temporary preferences in `assets/js/state.js`
- [ ] T020 [US1] Implement itinerary generation using selected activities, available time, preferences, destinations, routes, and weather data in `assets/js/planner.js`
- [ ] T021 [US1] Add validation and inline feedback when the user tries to generate an outing without selecting activities in `assets/js/planner.js`
- [ ] T022 [US1] Add simpler-itinerary fallback messaging when selected activities or time cannot form a believable multi-stop outing in `assets/js/planner.js`
- [ ] T023 [US1] Render generated itinerary summary handoff from planning to review mode in `assets/js/ui.js`
- [ ] T024 [US1] Add explicit simulated-data disclosure for planning weather and generated prototype content in `assets/js/ui.js`

**Checkpoint**: User Story 1 is independently testable as the MVP planning flow.

---

## Phase 4: User Story 2 - Review and Adjust the Itinerary (Priority: P1)

**Goal**: A dog owner can review itinerary order, route summary, destinations, facilities,
dog-access information, and make simple adjustments without restarting.

**Independent Test**: Generate an itinerary, identify route distance/duration and dog-friendly
access details, open details on demand, and replace one destination or route option.

### Implementation for User Story 2

- [ ] T025 [P] [US2] Render itinerary review cards with ordered stops, destination summaries, and primary dog-access information in `assets/js/ui.js`
- [ ] T026 [P] [US2] Render route summary with approximate total distance, estimated duration, and selected activity coverage in `assets/js/ui.js`
- [ ] T027 [US2] Render on-demand destination detail sheet with access rules, source/update note, and facility context in `assets/js/ui.js`
- [ ] T028 [US2] Implement destination replacement logic using replacement groups and suitability tags in `assets/js/planner.js`
- [ ] T029 [US2] Implement route option adjustment that swaps between allowed predefined route variants without recalculating routes in `assets/js/planner.js`
- [ ] T030 [US2] Update review state and rerender itinerary/map overlays after destination or route adjustment in `assets/js/state.js`
- [ ] T031 [US2] Add contextual weather, crowd, and dog-specific considerations as secondary review content in `assets/js/ui.js`
- [ ] T032 [US2] Add start-outing action that transitions from review mode to active navigation mode in `assets/js/ui.js`

**Checkpoint**: User Story 2 is independently testable after generating an itinerary from US1.

---

## Phase 5: User Story 3 - Navigate the Active Outing (Priority: P1)

**Goal**: A dog owner can start active navigation and see a simplified route view with next
destination, distance/time, nearest water, nearest bin, and manual route-step progression.

**Independent Test**: Start an outing, identify next destination and essential facilities within
30 seconds, then manually advance route steps and confirm the UI updates deterministically.

### Implementation for User Story 3

- [ ] T033 [P] [US3] Render simplified active-navigation layout with route, next destination, distance/time, nearest water, and nearest bin regions in `assets/js/ui.js`
- [ ] T034 [P] [US3] Add active-navigation CSS for glanceable labels, sticky controls, compact map area, and large touch targets in `assets/css/styles.css`
- [ ] T035 [US3] Implement manual route-step progression actions and bounds handling in `assets/js/navigation.js`
- [ ] T036 [US3] Update active-navigation state for current route id, current step index, next destination, and per-step facility distances in `assets/js/state.js`
- [ ] T037 [US3] Render current route, route-step marker, destination markers, and essential facility markers on the Leaflet map in `assets/js/map.js`
- [ ] T038 [US3] Render optional on-demand panels for additional facilities, destination details, and access information in `assets/js/ui.js`
- [ ] T039 [US3] Ensure active navigation hides nonessential planning/review content while preserving access to on-demand details in `assets/js/ui.js`
- [ ] T040 [US3] Add active-navigation completion or final-stop state when the last predefined route step is reached in `assets/js/navigation.js`

**Checkpoint**: User Story 3 is independently testable after US1 and US2 create a reviewed itinerary.

---

## Phase 6: User Story 4 - Respond to a Simulated Condition Change (Priority: P2)

**Goal**: A dog owner receives a contextual crowd alert at the predefined route step, compares
current route with Plan B, and chooses whether to keep or switch.

**Independent Test**: Advance active navigation to the predefined crowd-change step, interpret the
alert, inspect Plan B overlay, and verify both keep-current and switch-route decisions work.

### Implementation for User Story 4

- [ ] T041 [P] [US4] Style route segment crowd levels for low, moderate, and high crowd states in `assets/css/styles.css`
- [ ] T042 [US4] Draw crowd-level route segment overlays on the Leaflet map using scenario and route segment data in `assets/js/map.js`
- [ ] T043 [US4] Detect predefined crowd-change trigger step during manual route-step advancement in `assets/js/navigation.js`
- [ ] T044 [US4] Render contextual crowd alert with minimal copy, simulated-data cue, keep-current action, and view Plan B action in `assets/js/ui.js`
- [ ] T045 [US4] Add optional vibration request with graceful visual fallback when the crowd alert appears in `assets/js/navigation.js`
- [ ] T046 [US4] Render highlighted Plan B route overlay and simple comparison labels for quieter, extra time, and extra distance in `assets/js/map.js`
- [ ] T047 [US4] Implement keep-current-route decision that dismisses or resolves the alert without changing the route in `assets/js/navigation.js`
- [ ] T048 [US4] Implement switch-to-Plan-B decision that updates route state, map overlay, route steps, and active-navigation labels in `assets/js/navigation.js`

**Checkpoint**: User Story 4 is independently testable once active navigation is functional.

---

## Phase 7: User Story 5 - Reuse Lightweight Dog Preferences (Priority: P3)

**Goal**: A dog owner can save simple dog preferences with a dog name, reuse them later, and make
temporary outing-specific changes without overwriting the saved profile.

**Independent Test**: Save a dog preference set, refresh or revisit the prototype, select the saved
dog, temporarily modify one preference, and confirm saved values are unchanged unless explicitly
saved.

### Implementation for User Story 5

- [ ] T049 [P] [US5] Render save-dog-preferences controls with dog name input and save/skip actions in `assets/js/ui.js`
- [ ] T050 [US5] Implement dog preference validation for required dog name on save and mutually exclusive no-specific-preference state in `assets/js/storage.js`
- [ ] T051 [US5] Implement saved dog create, read, update, and delete helpers for `westEndDogPlanner.savedDogs` in `assets/js/storage.js`
- [ ] T052 [US5] Load saved dog options at app startup and show them on the start/planning screen in `assets/js/app.js`
- [ ] T053 [US5] Apply selected saved dog preferences to planning state without requiring account or authentication data in `assets/js/state.js`
- [ ] T054 [US5] Implement temporary outing-specific preference changes that do not overwrite saved dog data unless explicitly saved in `assets/js/state.js`
- [ ] T055 [US5] Add facilitator reset control for clearing saved dog preferences and returning to default prototype state in `assets/js/ui.js`

**Checkpoint**: User Story 5 is independently testable as local preference persistence in the same browser.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improve mobile usability, progressive disclosure, transparency, and validation across
the full prototype.

- [ ] T056 [P] Audit all screens for mobile-first spacing, readable text, and touch target size in `assets/css/styles.css`
- [ ] T057 [P] Add focused empty/error states for no activity selected, no saved dogs, unavailable replacement, and unsupported vibration in `assets/js/ui.js`
- [ ] T058 [P] Add visible simulation labels for crowd, weather, facility status, route alerts, and prototype overlays in `assets/js/ui.js`
- [ ] T059 Verify end-to-end planning, review, active navigation, crowd alert, Plan B, and saved dog flow against `specs/001-dog-outing-planner/quickstart.md`
- [ ] T060 Verify deterministic scenario repeatability by running the predefined route-step alert flow twice and documenting result in `specs/001-dog-outing-planner/quickstart.md`
- [ ] T061 Verify no backend, authentication, database server, live weather API, live crowd API, or full routing engine dependency exists in `index.html` and `assets/js/app.js`
- [ ] T062 Verify GitHub Pages compatibility by checking relative asset paths and static-only runtime assumptions in `index.html`
- [ ] T063 Smoke test the prototype in a mobile viewport and desktop facilitator viewport, then tune responsive layout in `assets/css/styles.css`
- [ ] T064 Update quickstart notes with final local run command, known browser expectations, and usability-test validation steps in `specs/001-dog-outing-planner/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational; MVP planning flow.
- **User Story 2 (Phase 4)**: Depends on US1-generated itinerary state.
- **User Story 3 (Phase 5)**: Depends on US1 and US2 because active navigation starts from a reviewed itinerary.
- **User Story 4 (Phase 6)**: Depends on US3 route-step navigation.
- **User Story 5 (Phase 7)**: Depends on Setup and storage foundation; can be implemented after US1 or in parallel with US2/US3 if coordination is careful.
- **Polish (Phase 8)**: Depends on desired user stories being complete.

### User Story Dependencies

- **US1 Plan a Dog-Inclusive Outing**: Required MVP.
- **US2 Review and Adjust the Itinerary**: Builds on generated itinerary from US1.
- **US3 Navigate the Active Outing**: Builds on reviewed itinerary from US2.
- **US4 Respond to a Simulated Condition Change**: Builds on active navigation from US3.
- **US5 Reuse Lightweight Dog Preferences**: Enhances US1 planning and can be delivered after MVP.

### Parallel Opportunities

- Setup tasks T002, T003, and T004 can run in parallel after T001 is understood.
- Foundation data tasks T009 through T013 can run in parallel with T007 and T008.
- US1 UI control tasks T015 through T018 can run in parallel before state integration.
- US2 review UI tasks T025 and T026 can run in parallel.
- US4 CSS task T041 can run before scenario trigger logic.
- US5 UI task T049 can run before storage helpers T050 and T051.
- Polish tasks T056, T057, and T058 can run in parallel after core flows exist.

---

## Parallel Example: User Story 1

```text
Task: "T015 [P] [US1] Render the start and dog-selection screen with saved dog list placeholder and continue-without-dog action in assets/js/ui.js"
Task: "T016 [P] [US1] Render activity selection controls for market, food, shopping, riverside walk, and rest/picnic in assets/js/ui.js"
Task: "T017 [P] [US1] Render available-time selection controls with concise mobile labels in assets/js/ui.js"
Task: "T018 [P] [US1] Render lightweight dog preference controls with mutually exclusive no-specific-preference behaviour in assets/js/ui.js"
```

## Parallel Example: Foundational Data

```text
Task: "T009 [P] Add curated West End destination records with activity tags, coordinates, dog-access details, suitability tags, and source/update notes in assets/data/destinations.js"
Task: "T010 [P] Add facility records for water, bins, seating/shade, toilets, and parking/access points in assets/data/facilities.js"
Task: "T011 [P] Add primary route, Plan B route, route segments, route steps, per-step facility distances, and route summaries in assets/data/routes.js"
Task: "T012 [P] Add deterministic crowd-change scenario event with predefined route step, alert copy, affected segment ids, Plan B link, and optional vibration pattern in assets/data/scenarios.js"
Task: "T013 [P] Add simulated planning weather context with temperature label, planning note, and explicit simulated flag in assets/data/weather.js"
```

## Parallel Example: User Story 4

```text
Task: "T041 [P] [US4] Style route segment crowd levels for low, moderate, and high crowd states in assets/css/styles.css"
Task: "T042 [US4] Draw crowd-level route segment overlays on the Leaflet map using scenario and route segment data in assets/js/map.js"
Task: "T044 [US4] Render contextual crowd alert with minimal copy, simulated-data cue, keep-current action, and view Plan B action in assets/js/ui.js"
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 setup.
2. Complete Phase 2 foundation.
3. Complete Phase 3 User Story 1.
4. Stop and validate the planning flow independently.

### Incremental Prototype Delivery

1. Add User Story 2 for itinerary review and adjustment.
2. Add User Story 3 for active navigation.
3. Add User Story 4 for crowd alert and Plan B route adaptation.
4. Add User Story 5 for saved dog preference reuse.
5. Complete Phase 8 polish and run the quickstart validation.

### Scope Guard

- Do not add backend services, authentication, server databases, live weather APIs, live crowd APIs,
  full routing engines, production route optimisation, or unrelated product features.
- Prefer deterministic local prototype logic whenever the specification allows simulated behaviour.
- Preserve mobile-first simplicity, progressive disclosure, and transparent simulation in every
  task.
