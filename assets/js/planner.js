import { destinations } from "../data/destinations.js";
import { routes } from "../data/routes.js";
import { weatherScenarios } from "../data/weather.js";

const activityPriority = ["market", "food", "shopping", "riversideWalk", "restPicnic"];

export function generateItinerary(state) {
  if (!state.selectedActivities.length) {
    return {
      ok: false,
      message: "Choose at least one activity to generate an outing."
    };
  }

  const selectedActivities = sortActivities(state.selectedActivities);
  const preferredQuiet = state.temporaryPreferences.quieterAreas || state.temporaryPreferences.avoidCrowds;
  const stopIds = chooseStops(selectedActivities, preferredQuiet);
  const shortOnTime = state.availableTime < 75 && stopIds.length > 3;
  const adjustedStopIds = shortOnTime ? stopIds.slice(0, 3) : stopIds;
  const routeId = preferredQuiet ? "route-b" : "route-a";
  const route = routes.find((item) => item.id === routeId) || routes[0];
  const weather = state.temporaryPreferences.easyWaterAccess ? weatherScenarios[0] : weatherScenarios[1];

  return {
    ok: true,
    itinerary: {
      id: "itinerary-west-end-baseline",
      title: preferredQuiet ? "Quieter West End outing" : "Market to riverside outing",
      activityIds: selectedActivities,
      availableTimeMinutes: state.availableTime,
      dogPreferenceSummary: preferenceSummary(state.temporaryPreferences),
      stopIds: mergeRouteStops(route.stopIds, adjustedStopIds),
      primaryRouteId: route.id,
      weatherScenarioId: weather.id,
      notes: shortOnTime
        ? "Trimmed to fewer stops so the outing stays believable for the selected time."
        : "Balances selected activities with dog-friendly outdoor stops."
    }
  };
}

export function replaceDestination(itinerary, destinationId) {
  const current = destinations.find((destination) => destination.id === destinationId);
  if (!current) return itinerary;
  const replacement = destinations.find(
    (destination) =>
      destination.id !== current.id &&
      destination.replacementGroup === current.replacementGroup &&
      !itinerary.stopIds.includes(destination.id)
  );
  if (!replacement) {
    return {
      ...itinerary,
      notes: "No alternate curated stop is available for that activity in this prototype."
    };
  }
  return {
    ...itinerary,
    stopIds: itinerary.stopIds.map((id) => (id === destinationId ? replacement.id : id)),
    notes: `${current.name} replaced with ${replacement.name}.`
  };
}

export function swapRoute(itinerary) {
  const nextRouteId = itinerary.primaryRouteId === "route-a" ? "route-b" : "route-a";
  const route = routes.find((item) => item.id === nextRouteId);
  return {
    ...itinerary,
    primaryRouteId: nextRouteId,
    stopIds: mergeRouteStops(route.stopIds, itinerary.stopIds),
    notes: nextRouteId === "route-b" ? "Showing the quieter Plan B route." : "Showing the original route."
  };
}

export function getDestination(id) {
  return destinations.find((destination) => destination.id === id);
}

export function getRoute(id) {
  return routes.find((route) => route.id === id);
}

export function getWeather(id) {
  return weatherScenarios.find((weather) => weather.id === id) || weatherScenarios[0];
}

function sortActivities(activityIds) {
  return [...activityIds].sort((a, b) => activityPriority.indexOf(a) - activityPriority.indexOf(b));
}

function chooseStops(activityIds, preferredQuiet) {
  const stops = [];
  const mapping = {
    market: "davies-park-market",
    food: preferredQuiet ? "hardgrave-cafe" : "boundary-st-cafe",
    shopping: "avid-reader-area",
    riversideWalk: "riverside-path",
    restPicnic: "orleigh-park"
  };
  activityIds.forEach((activityId) => {
    if (mapping[activityId] && !stops.includes(mapping[activityId])) stops.push(mapping[activityId]);
  });
  if (!stops.includes("orleigh-park")) stops.push("orleigh-park");
  return stops;
}

function mergeRouteStops(routeStops, chosenStops) {
  const combined = [...routeStops];
  chosenStops.forEach((stopId) => {
    if (!combined.includes(stopId)) combined.push(stopId);
  });
  return combined;
}

export function preferenceSummary(preferences) {
  const labels = [];
  if (preferences.quieterAreas) labels.push("quieter areas");
  if (preferences.fewerDogs) labels.push("fewer dogs");
  if (preferences.avoidCrowds) labels.push("avoids crowded areas");
  if (preferences.easyWaterAccess) labels.push("easy water access");
  return labels.length ? labels.join(", ") : "no specific preference";
}
