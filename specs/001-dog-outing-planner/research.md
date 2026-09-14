# Research: West End Dog-Inclusive Outing Planner

## Decision: Static HTML/CSS/Vanilla JavaScript Architecture

**Rationale**: A static front-end keeps the prototype easy to run, inspect, and deploy for a
university HCI project. It aligns with the constitution by avoiding backend infrastructure,
authentication, databases, and production architecture.

**Alternatives considered**:

- React or another framework: rejected because the current scope can be handled with simple UI
  state and DOM updates, and framework setup would add unnecessary complexity.
- Backend-rendered app: rejected because no server-side behaviour is required.
- No-code prototyping tool: rejected because the project needs a real map interaction and
  deterministic route-step simulation that are easier to control in code.

## Decision: Leaflet With OpenStreetMap Base Tiles

**Rationale**: Leaflet provides a lightweight, established way to display a real West End base map
with custom overlays. OpenStreetMap tiles satisfy the real geography requirement without introducing
live application data APIs.

**Alternatives considered**:

- Static map image: simpler, but weaker for testing map pan/zoom and overlay comprehension.
- Google Maps or Mapbox: more feature-rich, but may require keys, accounts, pricing, or production
  integration decisions that are unnecessary for the prototype.
- Custom SVG map: high control, but less credible as real West End geography.

## Decision: Local Mock Data for Prototype-Specific Content

**Rationale**: Destinations, facilities, routes, crowd scenarios, weather, alerts, and Plan B data
can be deterministic, transparent, and repeatable when kept in local JavaScript or JSON-style data
files. This supports usability testing without live APIs.

**Alternatives considered**:

- Live venue, weather, crowd, or routing APIs: rejected by scope and constitution.
- Hard-coded data inside UI rendering functions: rejected because it makes test scenarios harder to
  review and adjust.
- Server database: rejected because persistence is not needed beyond optional local dog preferences.

## Decision: Manual Route-Step Navigation Simulation

**Rationale**: Manual step advancement gives facilitators a repeatable way to progress the active
navigation scenario. It avoids location tracking and makes each participant encounter the same
navigation states.

**Alternatives considered**:

- Live geolocation: rejected because it is unreliable for classroom testing and outside prototype
  scope.
- Timer-based simulation: rejected because it can rush or lag behind participant comprehension.
- Static active navigation: rejected because it would not adequately test changing route context.

## Decision: Predefined Facility Distances Per Route Step

**Rationale**: Predefined approximate distances preserve the glanceable navigation experience
without building a distance engine. They also ensure usability tests are repeatable.

**Alternatives considered**:

- Straight-line calculation from coordinates: feasible but unnecessary for the research goal.
- Walking-distance calculation along route segments: rejected because it resembles production route
  logic and adds complexity.

## Decision: Crowd Alert Triggered by Predefined Route Step

**Rationale**: A step-based trigger fits the manual navigation simulation and guarantees the alert
appears at the intended moment in each usability session.

**Alternatives considered**:

- Hidden facilitator trigger: flexible but less tied to the participant's route context.
- Timer trigger: less reliable during think-aloud testing.
- User-opened detail trigger: too dependent on participant behaviour.

## Decision: Highlighted Plan B Overlay With Simple Comparison Labels

**Rationale**: Showing Plan B as an overlay lets participants compare the current route and
alternative route visually. Simple labels such as quieter, extra minutes, and extra distance keep
the decision understandable without detailed routing logic.

**Alternatives considered**:

- Summary card only: easier to build but weaker for route comparison on a map.
- Immediate route replacement: risks taking agency away from the user.
- Full recalculated route: outside scope and technically unnecessary.

## Decision: localStorage for Optional Saved Dog Preferences

**Rationale**: localStorage supports lightweight preference reuse across sessions without accounts,
authentication, or a backend. It is sufficient for a prototype and can be reset by the facilitator.

**Alternatives considered**:

- Server-side profile storage: rejected by scope.
- In-memory only: simpler, but does not test future-visit preference reuse.
- Browser cookies: less transparent and less suitable for structured preference data.

## Decision: Static or Scenario-Based Weather Context

**Rationale**: Weather remains supporting context in planning. It can be static for the baseline
scenario or varied by local scenario data if a usability test needs to examine weather influence.

**Alternatives considered**:

- Live weather API: rejected by scope and transparent simulation requirements.
- No weather context: allowed, but misses one design hypothesis from the specification.

## Decision: Mobile Browser Behaviours Versus Visual Simulation

**Rationale**: Core behaviours must work in normal mobile browsers: planning flow, map display,
overlay toggles, route-step navigation, Plan B choice, details disclosure, and localStorage
preference reuse. Optional vibration may be attempted where supported, but visual alerts must fully
communicate the event without it.

**Alternatives considered**:

- Native app behaviours: rejected because the target is mobile web.
- Device-specific sensor behaviours: rejected because they reduce repeatability.

## Decision: GitHub Pages-Compatible Static Deployment

**Rationale**: GitHub Pages can host static files with no server code, matching the course
prototype scope and allowing simple demonstration links.

**Alternatives considered**:

- Custom hosting or cloud infrastructure: rejected as production-oriented.
- Local-only prototype: useful during development, but less convenient for demonstration and
  remote review.
