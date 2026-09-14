export const preferenceDefaults = {
  quieterAreas: false,
  fewerDogs: false,
  avoidCrowds: false,
  easyWaterAccess: false,
  noSpecificPreference: true
};

export const initialState = {
  view: "planning",
  selectedDogId: null,
  temporaryPreferences: { ...preferenceDefaults },
  selectedActivities: [],
  availableTime: 90,
  selectedItinerary: null,
  currentRouteId: "route-a",
  activeRouteStepIndex: 0,
  alertState: "hidden",
  activeEventId: null,
  planBVisible: false,
  planBSwitched: false,
  facilityLayerVisible: false,
  detailsPanel: null,
  simulationDisclosureAcknowledged: false,
  message: ""
};

export let state = { ...initialState, temporaryPreferences: { ...preferenceDefaults } };

export function getState() {
  return state;
}

export function setState(patch) {
  state = {
    ...state,
    ...patch,
    temporaryPreferences: patch.temporaryPreferences
      ? { ...patch.temporaryPreferences }
      : state.temporaryPreferences
  };
  return state;
}

export function resetPrototype() {
  state = { ...initialState, temporaryPreferences: { ...preferenceDefaults } };
  return state;
}

export function toggleActivity(activityId) {
  const selected = new Set(state.selectedActivities);
  if (selected.has(activityId)) selected.delete(activityId);
  else selected.add(activityId);
  setState({ selectedActivities: Array.from(selected), message: "" });
}

export function setPreference(key, value) {
  const next = { ...state.temporaryPreferences };
  if (key === "noSpecificPreference" && value) {
    Object.keys(next).forEach((pref) => {
      next[pref] = pref === "noSpecificPreference";
    });
  } else {
    next[key] = value;
    if (value) next.noSpecificPreference = false;
    if (!Object.entries(next).some(([pref, enabled]) => pref !== "noSpecificPreference" && enabled)) {
      next.noSpecificPreference = true;
    }
  }
  setState({ temporaryPreferences: next, message: "" });
}

export function applySavedDog(dog) {
  if (!dog) {
    setState({
      selectedDogId: null,
      temporaryPreferences: { ...preferenceDefaults },
      message: "Continuing without a saved dog."
    });
    return;
  }
  setState({
    selectedDogId: dog.id,
    temporaryPreferences: { ...preferenceDefaults, ...dog.preferences },
    message: `${dog.dogName} selected. Preferences copied for this outing.`
  });
}

export function updateForRoute(routeId) {
  setState({
    currentRouteId: routeId,
    activeRouteStepIndex: 0,
    planBSwitched: routeId !== "route-a",
    planBVisible: false,
    alertState: "hidden",
    activeEventId: null
  });
}
