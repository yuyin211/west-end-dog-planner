# UI Flow Contracts: West End Dog-Inclusive Outing Planner

These contracts describe user-visible behaviours that implementation must preserve. They are not
API contracts and do not require backend services.

## Flow 1: Plan an Outing

**Initial state**: No active itinerary is required.

**User actions**

1. Open the prototype.
2. Select a saved dog or continue without one.
3. Select one or more activities.
4. Select available time.
5. Optionally set lightweight dog preferences.
6. Generate itinerary.

**Expected outcomes**

- At least one selected activity is required before generation.
- A suggested itinerary appears with ordered stops, route summary, primary destinations, and
  dog-relevant context.
- Weather may appear as lightweight simulated context.
- Simulated data is not presented as live or verified.

## Flow 2: Review and Adjust an Itinerary

**Initial state**: A suggested itinerary exists.

**User actions**

1. Review route, stops, facilities, and dog-access information.
2. Open destination or access details on demand.
3. Replace a destination or route option.

**Expected outcomes**

- Route distance and duration remain visible in review.
- Details appear progressively instead of crowding the main review.
- Replacing a destination or route updates the itinerary without restarting planning.

## Flow 3: Start Active Navigation

**Initial state**: A reviewed itinerary exists.

**User actions**

1. Start outing.
2. Read next destination, distance/time, nearest water, and nearest bin.
3. Advance route step manually.

**Expected outcomes**

- Active navigation view hides nonessential planning details.
- Each route-step advance updates map marker, next destination, distance/time, and facility
  distance labels.
- Additional facilities and destination details remain available on demand.

## Flow 4: Respond to Crowd-Change Alert

**Initial state**: Active navigation is running before the predefined crowd-change step.

**User actions**

1. Advance to the predefined route step.
2. Read the contextual crowd alert.
3. View the highlighted Plan B overlay.
4. Keep current route or switch to Plan B.

**Expected outcomes**

- Alert appears at the predefined step and uses minimal text.
- Current route and Plan B can be compared using simple labels.
- The user controls whether to keep or switch routes.
- If vibration is unavailable, visual alert behaviour is still complete.

## Flow 5: Save and Reuse Dog Preferences

**Initial state**: User has selected or entered preferences.

**User actions**

1. Choose to save preferences.
2. Enter a dog name.
3. Return later and select the saved dog.
4. Temporarily modify preferences for the current outing.

**Expected outcomes**

- Saved preferences are available on a later visit in the same browser.
- Temporary changes affect only the current outing unless explicitly saved.
- The user can continue without saving preferences.
