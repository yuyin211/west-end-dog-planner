# Mock Data Contracts: West End Dog-Inclusive Outing Planner

The implementation should keep prototype-specific data local and deterministic. File names are
recommended rather than mandatory, but the structures below define the expected content shape.

## destinations.js

Exports an array of destination records.

Required fields:

- `id`
- `name`
- `activityTags`
- `coordinates`
- `summary`
- `dogAccess`
- `suitabilityTags`

Optional fields:

- `sourceNote`
- `imageAlt`
- `replacementGroup`

## facilities.js

Exports an array of facility records.

Required fields:

- `id`
- `type`
- `coordinates`
- `description`
- `status`

Facility types:

- `water`
- `bin`
- `seatingShade`
- `toilet`
- `parkingAccess`

## routes.js

Exports primary and alternative route records.

Primary route required fields:

- `id`
- `name`
- `stopIds`
- `summary`
- `polyline`
- `segments`
- `steps`
- `alternativeRouteId`

Route step required fields:

- `index`
- `position`
- `nextDestinationId`
- `distanceToNextLabel`
- `facilityDistances.water`
- `facilityDistances.bin`
- `activeSegmentIds`

Alternative route required fields:

- `id`
- `baseRouteId`
- `polyline`
- `comparisonLabels`
- `summary`

## scenarios.js

Exports deterministic scenario events.

Required fields:

- `id`
- `type`
- `routeId`
- `triggerStepIndex`
- `affectedSegmentIds`
- `message`

Optional fields:

- `alternativeRouteId`
- `vibrationPattern`

## weather.js

Exports one or more lightweight weather scenarios.

Required fields:

- `id`
- `label`
- `temperatureLabel`
- `planningNote`
- `simulated`

## localStorage Saved Dog Contract

Storage key: `westEndDogPlanner.savedDogs`

Value: JSON-encoded array of dog preference records.

Record fields:

- `id`
- `dogName`
- `preferences`
- `updatedAt`

Rules:

- No user account identifier is stored.
- Empty dog names cannot be saved.
- Temporary outing preferences are not written back unless the user explicitly saves.
- A facilitator reset control may clear this key for repeatable testing.
