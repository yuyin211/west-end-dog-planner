import { destinations } from "../data/destinations.js";
import { facilities } from "../data/facilities.js";
import { routes } from "../data/routes.js";

let map;
let layers = {};

const westEndCenter = [-27.4845, 153.0045];

export function initMap(containerId = "map") {
  const container = document.getElementById(containerId);
  if (!container || typeof L === "undefined") return null;

  if (map) {
    disposeMap();
  }

  map = L.map(container, {
    zoomControl: false,
    attributionControl: true,
    fadeAnimation: false,
    zoomAnimation: false,
    markerZoomAnimation: false,
    inertia: false
  }).setView(westEndCenter, 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  L.control.zoom({ position: "bottomright" }).addTo(map);
  layers = {
    routes: L.layerGroup().addTo(map),
    markers: L.layerGroup().addTo(map),
    facilities: L.layerGroup().addTo(map),
    position: L.layerGroup().addTo(map),
    planB: L.layerGroup().addTo(map)
  };
  return map;
}

export function disposeMap() {
  if (!map) return;
  try {
    map.off();
    map.remove();
  } catch {
    // Leaflet may already be detached during view swaps in the prototype.
  }
  map = null;
  layers = {};
}

export function renderReviewMap(itinerary) {
  const activeMap = initMap();
  if (!activeMap || !itinerary) return;
  const route = getRoute(itinerary.primaryRouteId);
  drawRoute(route, false);
  drawDestinationMarkers(itinerary.stopIds);
  drawFacilities(false);
  fitRoute(route);
}

export function renderNavigationMap(state, currentStep) {
  const activeMap = initMap();
  if (!activeMap) return;
  const route = getRoute(state.currentRouteId);
  drawRoute(route, true, currentStep?.activeSegmentIds || []);
  drawDestinationMarkers(route.stopIds);
  drawFacilities(true);
  if (currentStep) {
    L.circleMarker(currentStep.position, {
      radius: 9,
      color: "#183a37",
      fillColor: "#42b883",
      fillOpacity: 1,
      weight: 3
    })
      .bindPopup("Simulated current position")
      .addTo(layers.position);
  }
  if (state.planBVisible || state.alertState === "visible") {
    const alt = routes.find((item) => item.id === route.alternativeRouteId || item.id === "route-b");
    if (alt) drawPlanB(alt);
  }
  fitRoute(route);
}

export function drawPlanB(route) {
  if (!map || !route) return;
  layers.planB.clearLayers();
  L.polyline(route.polyline, {
    color: "#1f78b4",
    weight: 7,
    opacity: 0.75,
    dashArray: "8 8"
  })
    .bindPopup(`Plan B: ${route.comparisonLabels?.join(" | ") || route.summary.durationLabel}`)
    .addTo(layers.planB);
}

function drawRoute(route, showCrowd, activeSegmentIds = []) {
  if (!route) return;
  layers.routes.clearLayers();
  route.segments.forEach((segment) => {
    const level = segment.changedCrowdLevel && activeSegmentIds.includes(segment.id)
      ? segment.changedCrowdLevel
      : segment.crowdLevel;
    L.polyline(segment.polyline, {
      color: showCrowd ? crowdColor(level) : "#4267ac",
      weight: activeSegmentIds.includes(segment.id) ? 8 : 6,
      opacity: 0.85
    })
      .bindPopup(`Crowd level: ${level} (simulated)`)
      .addTo(layers.routes);
  });
}

function drawDestinationMarkers(stopIds) {
  layers.markers.clearLayers();
  stopIds
    .map((id) => destinations.find((destination) => destination.id === id))
    .filter(Boolean)
    .forEach((destination, index) => {
      L.circleMarker(destination.coordinates, {
        radius: 7,
        color: "#14533e",
        fillColor: "#ffffff",
        fillOpacity: 1,
        weight: 3
      })
        .bindPopup(`${index + 1}. ${destination.name}<br>${destination.summary}`)
        .addTo(layers.markers);
    });
}

function drawFacilities(essentialOnly) {
  layers.facilities.clearLayers();
  facilities
    .filter((facility) => !essentialOnly || facility.type === "water" || facility.type === "bin")
    .forEach((facility) => {
      L.circleMarker(facility.coordinates, {
        radius: 6,
        color: facility.type === "water" ? "#0277bd" : "#4b5563",
        fillColor: facility.type === "water" ? "#63c7f2" : "#d1d5db",
        fillOpacity: 0.9,
        weight: 2
      })
        .bindPopup(`${facility.name}<br>${facility.description}<br>Status: prototype ${facility.status}`)
        .addTo(layers.facilities);
    });
}

function fitRoute(route) {
  if (!map || !route?.polyline?.length) return;
  const activeMap = map;
  const bounds = L.latLngBounds(route.polyline);
  activeMap.fitBounds(bounds.pad(0.22));
  setTimeout(() => {
    if (map === activeMap) activeMap.invalidateSize();
  }, 80);
}

function getRoute(id) {
  return routes.find((route) => route.id === id) || routes[0];
}

function crowdColor(level) {
  if (level === "high") return "#d1495b";
  if (level === "moderate") return "#f59e0b";
  return "#2a9d8f";
}
