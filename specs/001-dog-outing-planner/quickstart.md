# Quickstart: West End Dog-Inclusive Outing Planner

## Prerequisites

- A current desktop browser for development checks.
- A smartphone or mobile browser emulator for mobile-first usability checks.
- Internet access for OpenStreetMap tiles when using the Leaflet base map.

## Run Locally

Because the prototype is planned as a static site, any simple static file server is sufficient.

Example:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

If no local server is available, most screens should still be inspectable by opening `index.html`,
but map tiles and module loading are more reliable through a local server.

## Validation Scenario 1: Plan a Multi-Activity Outing

1. Open the prototype on a mobile-sized viewport.
2. Continue without a saved dog.
3. Select at least two activities, such as market and riverside walk.
4. Select an available time.
5. Add one lightweight preference, such as avoid crowded areas.
6. Generate the itinerary.

Expected outcome:

- A suggested ordered itinerary appears.
- Route distance/duration and primary destinations are visible.
- Dog-relevant context is visible without lengthy setup.
- Simulated context is not presented as live data.

## Validation Scenario 2: Review and Adjust

1. From the itinerary review view, inspect the map and destination cards.
2. Open dog-access details for a destination.
3. Replace one destination or route option.

Expected outcome:

- Access information appears on demand.
- Itinerary updates without restarting planning.
- The map still shows a real West End base map with prototype overlays.

## Validation Scenario 3: Active Navigation

1. Start the outing.
2. Confirm the view simplifies to route, next destination, distance/time, nearest water, and
   nearest bin.
3. Advance the route step manually.

Expected outcome:

- Navigation content updates deterministically.
- Facility distances are predefined approximate labels.
- Secondary information remains on demand.

## Validation Scenario 4: Crowd Alert and Plan B

1. Continue advancing route steps until the predefined crowd-change step.
2. Read the alert.
3. Inspect the highlighted Plan B route overlay.
4. Choose keep current route.
5. Repeat and choose switch to Plan B.

Expected outcome:

- Alert appears at the same route step each run.
- Plan B comparison labels are visible and simple.
- The user's keep/switch choice controls the route state.
- The flow works without vibration.

## Validation Scenario 5: Saved Dog Preferences

1. Enter lightweight dog preferences.
2. Save them with a dog name.
3. Refresh or revisit the prototype.
4. Select the saved dog.
5. Temporarily change one preference for the current outing.

Expected outcome:

- Saved dog preferences are reusable in the same browser.
- Temporary changes do not overwrite the saved dog unless explicitly saved.
- The user can still continue without a saved dog.

## GitHub Pages Deployment Check

1. Keep all runtime files static.
2. Use relative asset paths.
3. Avoid backend-only features.
4. Confirm `index.html` works from the repository root or the configured Pages directory.

Expected outcome:

- The prototype can be served as a static site.
- No server database, authentication, or live application API is required.
