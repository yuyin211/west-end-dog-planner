import { scenarioEvents } from "../data/scenarios.js";
import { getRoute } from "./planner.js";

export function getCurrentStep(state) {
  const route = getRoute(state.currentRouteId);
  return route.steps[Math.min(state.activeRouteStepIndex, route.steps.length - 1)];
}

export function nextStep(state) {
  const route = getRoute(state.currentRouteId);
  const nextIndex = Math.min(state.activeRouteStepIndex + 1, route.steps.length - 1);
  return {
    activeRouteStepIndex: nextIndex,
    ...alertPatchForStep(state.currentRouteId, nextIndex, state)
  };
}

export function previousStep(state) {
  return {
    activeRouteStepIndex: Math.max(state.activeRouteStepIndex - 1, 0),
    message: ""
  };
}

export function keepCurrentRoute() {
  return {
    alertState: "keptCurrent",
    planBVisible: false,
    message: "Current route kept."
  };
}

export function showPlanB(state) {
  return {
    planBVisible: true,
    alertState: state.alertState === "hidden" ? "visible" : state.alertState,
    message: "Plan B shown for comparison."
  };
}

export function switchToPlanB(state) {
  const event = scenarioEvents.find((item) => item.id === state.activeEventId) || scenarioEvents[0];
  return {
    currentRouteId: event.alternativeRouteId,
    activeRouteStepIndex: 0,
    alertState: "switchedPlanB",
    planBVisible: false,
    planBSwitched: true,
    message: "Switched to the quieter Plan B route."
  };
}

export function triggerOptionalVibration(event) {
  if ("vibrate" in navigator && event?.vibrationPattern) {
    navigator.vibrate(event.vibrationPattern);
    return true;
  }
  return false;
}

export function getScenarioEvent(state) {
  if (!state.activeEventId) return null;
  return scenarioEvents.find((event) => event.id === state.activeEventId) || null;
}

function alertPatchForStep(routeId, stepIndex, state) {
  const event = scenarioEvents.find(
    (item) => item.routeId === routeId && item.triggerStepIndex === stepIndex
  );
  if (!event || state.alertState === "keptCurrent" || state.alertState === "switchedPlanB") {
    return { message: "" };
  }
  triggerOptionalVibration(event);
  return {
    alertState: "visible",
    activeEventId: event.id,
    planBVisible: false,
    message: "Crowd-change alert shown. This is simulated prototype data."
  };
}
