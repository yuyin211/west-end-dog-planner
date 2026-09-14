# Feature Specification: West End Dog-Inclusive Outing Planner

**Feature Branch**: `001-dog-outing-planner`

**Created**: 2026-09-14

**Status**: Draft

**Input**: User description: "Create a baseline specification for an interactive mobile-web prototype for a university HCI project. The project supports dog owners planning and navigating multi-activity dog-inclusive outings in West End, Brisbane, using progressive disclosure, real geography, realistic curated content, simulated dynamic data, lightweight dog preferences, active navigation, facilities, crowd-change alerts, and user-controlled route adaptation. The prototype is for usability testing, not production."

## Clarifications

### Session 2026-09-14

- Q: What should count as real map content versus simulated prototype data? -> A: Real West End base map and streets; destinations, facilities, routes, crowd, weather, and alerts may be curated or simulated overlays.
- Q: How should active navigation progress be simulated during usability testing? -> A: Facilitator or participant advances through route steps manually; the map and navigation UI update to the next simulated position.
- Q: When should the simulated crowd-change alert be triggered during the test outing? -> A: Trigger at a predefined route step when the participant or facilitator advances to that point.
- Q: How should distances to nearby facilities be determined during active navigation? -> A: Use predefined approximate facility distances for each active navigation route step.
- Q: How should the alternative route be represented when the crowd-change alert appears? -> A: Show a highlighted alternative route overlay with simple comparison labels such as quieter, extra minutes, or extra distance.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Plan a Dog-Inclusive Outing (Priority: P1)

A dog owner opens the prototype, optionally selects a saved dog or continues without one,
chooses one or more outing activities, selects available time, adds lightweight dog preferences
when relevant, and receives a suggested ordered itinerary in West End.

**Why this priority**: Planning the outing is the primary value of the prototype and the entry
point for testing whether users can create a useful outing with minimal effort.

**Independent Test**: Can be tested by asking a participant to create an outing that combines at
least two activities and confirm that the prototype returns an ordered itinerary with route
summary, destinations, and dog-relevant context.

**Acceptance Scenarios**:

1. **Given** the user has opened the prototype, **When** they select multiple activities and an
   available time, **Then** the prototype presents a suggested multi-stop outing in West End.
2. **Given** the user has selected dog preferences, **When** the itinerary is generated, **Then**
   the suggested outing reflects relevant preference constraints such as quieter areas or easier
   access to water.
3. **Given** the user wants to avoid setup, **When** they continue without selecting or saving a
   dog, **Then** they can still generate and review an outing.

---

### User Story 2 - Review and Adjust the Itinerary (Priority: P1)

A dog owner reviews the generated itinerary, map, walking route, route summary, destinations,
facilities, and dog-access information, then adjusts or replaces a destination or route without
restarting the planning flow.

**Why this priority**: The prototype must test whether users understand the recommendation and can
adapt it before starting an outing.

**Independent Test**: Can be tested by giving a participant a generated itinerary and asking them
to identify dog-friendly access details, route distance or duration, nearby facilities, and replace
one stop or route option.

**Acceptance Scenarios**:

1. **Given** an itinerary has been generated, **When** the user reviews it, **Then** the prototype
   shows primary destinations, walking route, approximate distance, estimated duration, and
   relevant dog-access information.
2. **Given** the user wants to change one stop, **When** they choose to replace a destination,
   **Then** the prototype updates the itinerary without requiring the user to restart planning.
3. **Given** venue-specific access information is shown, **When** the user asks for more detail,
   **Then** the prototype can show an update note or source awareness cue where appropriate.

---

### User Story 3 - Navigate the Active Outing (Priority: P1)

A dog owner starts the outing and the interface switches to a simplified active-navigation mode
that prioritises the current route, next destination, distance or time to that destination, and
nearest essential facilities. During usability testing, route progress is simulated by manually
advancing through route steps so the map and navigation information update to the next prototype
position, including predefined approximate distances to nearby essential facilities.

**Why this priority**: Active navigation is central to testing the "show only what matters now"
design principle during a realistic mobile walking context.

**Independent Test**: Can be tested by asking a participant to start an outing and use the active
navigation screen to identify the next stop, remaining distance or time, nearest drinking water,
and nearest bin.

**Acceptance Scenarios**:

1. **Given** the user starts the outing, **When** active navigation begins, **Then** the interface
   simplifies to prioritise route, next destination, distance or time, nearest drinking water, and
   nearest bin.
2. **Given** the user is in active navigation, **When** they need more details, **Then** secondary
   destination, access, or facility information is available on demand rather than always visible.
3. **Given** additional facilities exist nearby, **When** active navigation is displayed, **Then**
   drinking water and bins are shown by default while other facilities remain optional or on demand.

---

### User Story 4 - Respond to a Simulated Condition Change (Priority: P2)

During an outing, a simulated crowd condition changes on a route segment at a predefined route
step. The user receives a contextual alert only if the change affects the current outing, compares
the current route with an optional quieter alternative shown as a highlighted route overlay with
simple comparison labels, and chooses whether to keep or switch routes.

**Why this priority**: This tests the key design hypotheses about proactive alerts, actionable
Plan B routing, and user-controlled adaptation.

**Independent Test**: Can be tested by advancing to the predefined crowd-change route step and
asking a participant to interpret the alert, compare route impact, and make a route decision.

**Acceptance Scenarios**:

1. **Given** the user is navigating and a relevant route segment becomes significantly more
   crowded, **When** the alert appears, **Then** it explains the change with minimal text and offers
   a clear option to view or switch to an alternative.
2. **Given** an alternative route is available, **When** the user compares it with the current
   route, **Then** the prototype shows a highlighted alternative route overlay and communicates a
   simple impact such as additional walking time, additional distance, or quieter conditions.
3. **Given** the user sees an alternative route, **When** they choose to keep the current route or
   switch, **Then** the prototype follows that user decision.

---

### User Story 5 - Reuse Lightweight Dog Preferences (Priority: P3)

A dog owner can save simple dog preferences with a dog name and reuse them on a future visit,
while still being able to make temporary changes for the current outing.

**Why this priority**: Preference reuse may reduce repeated input, but it must not create a lengthy
setup burden or distract from the core planning and navigation flow.

**Independent Test**: Can be tested by saving a named dog preference set, starting a new planning
session, selecting the saved dog, and temporarily modifying one preference for the current outing.

**Acceptance Scenarios**:

1. **Given** the user has entered simple dog preferences, **When** they choose to save them, **Then**
   they can provide a dog name and reuse those preferences later.
2. **Given** a saved dog is available, **When** the user starts planning, **Then** they can select
   the dog or continue without selecting one.
3. **Given** a saved dog has been selected, **When** the user changes a preference for this outing,
   **Then** the change applies to the current outing without permanently changing the saved dog
   profile unless the user explicitly chooses to save it.

### Edge Cases

- The user selects no activities before requesting an itinerary; the prototype prompts for at
  least one activity without losing existing planning input.
- The user's selected activities or time cannot form a believable multi-stop outing; the prototype
  presents a simpler itinerary or explains that fewer stops are recommended.
- The user skips dog preferences entirely; the prototype still produces a general dog-inclusive
  outing.
- The user selects preferences that conflict with available curated destinations; the prototype
  shows the closest suitable option and explains the relevant trade-off.
- Simulated dynamic data is unavailable, hidden, or disabled for a test session; the prototype still
  supports planning, review, and active navigation.
- A crowd-change alert is triggered while the user is viewing details; the alert remains
  contextual and does not obscure the user's ability to continue.
- Optional vibration is unsupported or disabled; the alert remains visible and understandable
  without vibration.
- A saved dog name is left blank; the prototype asks for a short name before saving or allows the
  user to continue without saving.
- Source or update information is unavailable for a destination; the prototype avoids implying
  verified live accuracy.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to select multiple desired activities for one outing, including
  market, cafe or food, shopping, riverside walk, and rest or picnic.
- **FR-002**: Users MUST be able to select available outing time before receiving a suggested
  itinerary.
- **FR-003**: Users MUST be able to select a saved dog or continue without selecting one.
- **FR-004**: Users MUST be able to provide lightweight dog preferences, including quieter areas,
  fewer dogs, avoiding crowded areas, easier access to water, or no specific preference.
- **FR-005**: The prototype MUST generate a suggested outing that combines selected activities into
  an ordered multi-stop itinerary.
- **FR-006**: The suggested itinerary MUST use a small curated set of realistic West End, Brisbane
  destinations and facilities as prototype overlays rather than attempting complete area coverage.
- **FR-007**: The prototype MUST display a real geographic base map of West End, Brisbane with
  realistic streets and locations.
- **FR-007a**: Application-specific content, including destinations, facilities, suggested routes,
  crowd levels, weather, and alerts, MAY be curated or simulated as prototype overlays on the real
  map.
- **FR-008**: The itinerary MUST include a suggested walking route connecting selected stops.
- **FR-009**: The itinerary MUST display approximate walking distance and estimated duration.
- **FR-010**: Destination information MUST indicate relevant dog-friendly access details, including
  whether dogs are allowed, where dogs are allowed, and leash requirements where applicable.
- **FR-011**: The planning interface MUST require minimal input and avoid lengthy onboarding or
  complex profiles.
- **FR-012**: Planning MAY display lightweight simulated weather and temperature information when
  relevant to the outing.
- **FR-013**: Weather information MUST remain supporting context and MUST NOT become the primary
  planning feature.
- **FR-014**: The prototype MUST support relevant facilities, including drinking water, bins,
  seating or shade, toilets, and parking or access points.
- **FR-015**: During active navigation, drinking water and bins MUST be shown by default when
  relevant nearby facilities are available.
- **FR-015a**: Distances to nearby facilities during active navigation MUST use predefined
  approximate values for each route step rather than live or production-grade distance
  calculation.
- **FR-016**: Other facilities MUST be available as optional layers, details, or on-demand
  information rather than competing with default navigation information.
- **FR-017**: Users MUST be able to review itinerary, route, destinations, facilities, and dog-access
  information before starting the outing.
- **FR-018**: Users MUST be able to replace a destination, change a route, or adjust an outing
  without restarting the entire planning process.
- **FR-019**: Once the user starts the outing, the prototype MUST switch to a simplified active
  navigation view.
- **FR-019a**: Active navigation progress MUST be simulated through manual route-step advancement
  by the participant or facilitator, updating the map and navigation UI to the next simulated
  position.
- **FR-020**: Active navigation MUST prioritise the current route, next destination, distance or
  estimated time to next destination, nearest relevant drinking water point, and nearest relevant
  bin.
- **FR-021**: Active navigation MUST use simple icons, short labels, and minimal text for primary
  information.
- **FR-022**: Secondary information MUST remain hidden until requested or contextually relevant.
- **FR-023**: Route segments MAY show simulated crowd levels, including low, moderate, and high.
- **FR-024**: Crowding MUST be represented visually on the route itself rather than primarily
  through long text descriptions.
- **FR-025**: If a simulated route segment becomes significantly more crowded at a predefined
  route step and affects the current outing, the prototype MAY display a contextual alert.
- **FR-026**: Where supported, the prototype MAY use vibration as part of a simulated crowd-change
  alert, but the alert experience MUST remain complete without vibration.
- **FR-027**: When a relevant simulated condition changes, the prototype SHOULD provide an optional
  alternative route or Plan B.
- **FR-028**: Alternative route details SHOULD communicate simple impact, such as additional walking
  time, additional distance, or quieter conditions.
- **FR-028a**: When presented from a crowd-change alert, the alternative route SHOULD appear as a
  highlighted route overlay with simple comparison labels such as quieter, extra minutes, or extra
  distance.
- **FR-029**: Users MUST decide whether to keep the current route or switch to the alternative.
- **FR-030**: Crowding, weather, and similar contextual information MUST NOT dominate the interface
  unless it affects the current outing.
- **FR-031**: Dynamic information, including crowd levels, crowd changes, weather, facility status,
  and route-change alerts, MAY be simulated using prototype overlay data.
- **FR-032**: The interface MUST NOT imply that simulated information is live, verified, or
  real-time.
- **FR-033**: Users MAY save provided dog preferences for reuse.
- **FR-034**: When saving dog preferences, users MUST be able to enter a dog name.
- **FR-035**: Saved dog preferences MUST be reusable on a later prototype visit or session.
- **FR-036**: Users MUST be able to modify saved preferences for the current outing without
  permanently changing the saved dog profile.
- **FR-037**: Where access rules or venue-specific information is presented, the prototype SHOULD
  support showing a source or update note when appropriate.
- **FR-038**: Planning mode MUST keep activities, available time, selected dog or preferences,
  itinerary, route distance or duration, and primary destinations visible when they are relevant to
  the current planning step.
- **FR-039**: Planning mode MUST keep weather, crowd information, and dog-specific considerations
  contextual rather than always dominant.
- **FR-040**: Planning mode MUST make detailed access rules, parking, facilities, information
  sources, and detailed venue information available on demand.
- **FR-041**: Active navigation mode MUST keep route, next destination, distance or time to next
  destination, nearest drinking water, and nearest bin visible.
- **FR-042**: Active navigation mode MUST keep crowd level by segment and condition-change alerts
  contextual.
- **FR-043**: Active navigation mode MUST make additional facilities, destination details,
  alternative route details, and access information available on demand.
- **FR-044**: The prototype MUST support deterministic dynamic events suitable for repeatable
  usability testing.
- **FR-044a**: The crowd-change event MUST be triggerable at a predefined route step when the
  participant or facilitator advances active navigation to that point.
- **FR-045**: The prototype MUST remain focused on planning, suggested itinerary, map review, dog
  preferences, saved dog preference reuse, active navigation, facility visibility, simulated crowd
  change, and route adaptation.
- **FR-046**: The prototype MUST exclude production deployment infrastructure, backend databases,
  user authentication, real-time crowd sensing, real-time dog activity sensing, live weather,
  live traffic infrastructure, complete business coverage, full turn-by-turn navigation,
  commercial recommendation logic, and production-grade route optimisation.

### Key Entities

- **Dog Preference Set**: A lightweight collection of dog-related preferences, optionally attached
  to a dog name for reuse.
- **Activity Selection**: One or more outing activity types chosen by the user, such as market,
  food, shopping, riverside walk, or rest.
- **Outing Itinerary**: An ordered set of destinations, route summary, and contextual information
  generated from the user's activities, available time, and preferences.
- **Destination**: A realistic curated West End prototype overlay with activity fit, dog-access
  details, and optional source or update note.
- **Walking Route**: A geographic route connecting itinerary stops, including approximate distance,
  estimated duration, route segments, manually advanceable route steps, predefined facility
  distance values, and optional highlighted alternative route overlay.
- **Facility**: A relevant support point overlay such as drinking water, bin, seating or shade,
  toilet, or parking or access point, with predefined approximate distance values where shown in
  active navigation.
- **Simulated Condition**: Prototype data representing weather, crowd level, facility status, or a
  route-change event, including the route step where the event appears during testing.
- **Contextual Alert**: A route-relevant message that appears at a predefined route step only when
  a simulated condition may require a user decision.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 80% of usability test participants can generate a multi-activity outing from
  the initial screen in under 2 minutes without facilitator assistance.
- **SC-002**: At least 80% of participants can correctly identify the itinerary order, walking
  distance or duration, and primary destinations after reviewing the suggested outing.
- **SC-003**: At least 80% of participants can identify whether a destination is dog-friendly and
  locate more detailed access information when asked.
- **SC-004**: At least 80% of participants can start active navigation and identify the next
  destination, distance or time to next destination, nearest drinking water, and nearest bin within
  30 seconds.
- **SC-005**: At least 75% of participants can correctly interpret a simulated crowd-change alert
  and explain why it appeared.
- **SC-006**: At least 75% of participants can compare the current route with Plan B and make an
  informed keep-or-switch decision.
- **SC-007**: At least 75% of participants report that the active navigation view shows enough
  information without feeling overloaded.
- **SC-008**: At least 75% of participants understand that crowd, weather, facility status, and
  route-change information are simulated prototype data rather than verified live data.
- **SC-009**: Participants can complete the core end-to-end test flow, from planning through route
  adaptation decision, in under 8 minutes during a moderated usability test.
- **SC-010**: At least 70% of participants who choose to save dog preferences can reuse them in a
  later planning flow and make a temporary change without assuming the saved profile was
  permanently changed.

## Assumptions

- The target users are dog owners or dog walkers planning casual outings in West End, Brisbane.
- The prototype is evaluated primarily on smartphone-sized screens using touch interaction.
- The prototype uses a real West End geographic base map, while application-specific destinations,
  facilities, routes, crowd, weather, and alerts may be curated or simulated as overlays sufficient
  for usability testing.
- Application-specific destination, facility, crowd, weather, route-change, and venue-access data
  can be mocked or simulated for prototype purposes.
- Saved dog preferences are stored only for the prototype experience and do not require user
  accounts.
- Dynamic events can be deterministic so each usability testing participant can encounter the same
  crowd-change and route-adaptation scenario at the same predefined route step.
- Active navigation does not require live user location; progress through the outing is simulated
  by manual route-step advancement during usability testing.
- Facility distances shown during active navigation are predefined approximate values tied to the
  current route step.
- Alternative routes are represented as prototype overlays for comparison and do not require
  production-grade route recalculation.
- The prototype does not need to provide production-grade routing, live traffic, live crowd sensing,
  live weather, account security, or a comprehensive business directory.
- Where simulated information appears, the interface makes its prototype nature clear without
  interrupting the core task flow.
