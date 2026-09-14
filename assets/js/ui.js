import { activityLabels } from "../data/destinations.js";
import { destinations } from "../data/destinations.js";
import { facilities } from "../data/facilities.js";
import { getDestination, getRoute, getWeather, preferenceSummary } from "./planner.js";
import { getCurrentStep, getScenarioEvent } from "./navigation.js";

const preferenceLabels = {
  quieterAreas: "Prefers quieter areas",
  fewerDogs: "Prefers fewer dogs",
  avoidCrowds: "Avoids crowded areas",
  easyWaterAccess: "Needs easier water access",
  noSpecificPreference: "No specific preference"
};

export function renderApp(state, savedDogs) {
  if (state.view === "review" && state.selectedItinerary) {
    return renderReview(state, savedDogs);
  }
  if (state.view === "navigation" && state.selectedItinerary) {
    return renderNavigation(state, savedDogs);
  }
  return renderPlanning(state, savedDogs);
}

export function showMessage(message, tone = "info") {
  return message ? `<p class="message ${tone}">${escapeHtml(message)}</p>` : "";
}

function renderPlanning(state, savedDogs) {
  const selectedDog = savedDogs.find((dog) => dog.id === state.selectedDogId);
  const weather = getWeather("warm-cloudy");
  return `
    <section class="screen planning-screen">
      <header class="topbar">
        <div>
          <p class="eyebrow">Prototype outing planner</p>
          <h1>West End dog outing</h1>
        </div>
        <button class="icon-button" data-action="reset-prototype" aria-label="Reset prototype" title="Reset prototype">Reset</button>
      </header>

      ${showMessage(state.message)}

      <section class="panel">
        <div class="section-title">
          <h2>Dog</h2>
          <span class="soft-label">${selectedDog ? escapeHtml(selectedDog.dogName) : "Optional"}</span>
        </div>
        <div class="segmented-list">
          <button class="choice ${!state.selectedDogId ? "selected" : ""}" data-action="select-no-dog">Continue without one</button>
          ${savedDogs
            .map(
              (dog) => `
                <button class="choice ${dog.id === state.selectedDogId ? "selected" : ""}" data-action="select-dog" data-id="${dog.id}">
                  ${escapeHtml(dog.dogName)}
                </button>`
            )
            .join("")}
        </div>
        ${savedDogs.length ? "" : `<p class="hint">No saved dogs yet. You can save preferences later.</p>`}
        <div class="facility-row">
          <button class="mini-chip" data-action="open-save-dog">Save current preferences</button>
          ${savedDogs.length ? `<button class="mini-chip" data-action="clear-saved-dogs">Clear saved dogs</button>` : ""}
        </div>
      </section>

      <section class="panel">
        <div class="section-title">
          <h2>Activities</h2>
          <span class="soft-label">${state.selectedActivities.length || 0} selected</span>
        </div>
        <div class="chip-grid">
          ${Object.entries(activityLabels)
            .map(
              ([id, label]) => `
                <button class="chip ${state.selectedActivities.includes(id) ? "selected" : ""}" data-action="toggle-activity" data-id="${id}">
                  ${label}
                </button>`
            )
            .join("")}
        </div>
      </section>

      <section class="panel compact">
        <div class="section-title">
          <h2>Available time</h2>
          <span class="soft-label">${state.availableTime} min</span>
        </div>
        <div class="segmented-list">
          ${[60, 90, 120]
            .map(
              (minutes) => `<button class="choice ${state.availableTime === minutes ? "selected" : ""}" data-action="set-time" data-minutes="${minutes}">${minutes} min</button>`
            )
            .join("")}
        </div>
      </section>

      <section class="panel">
        <div class="section-title">
          <h2>Preferences</h2>
          <span class="soft-label">${preferenceSummary(state.temporaryPreferences)}</span>
        </div>
        <div class="check-list">
          ${Object.entries(preferenceLabels)
            .map(
              ([key, label]) => `
                <label class="check-row">
                  <input type="checkbox" data-action="toggle-preference" data-key="${key}" ${state.temporaryPreferences[key] ? "checked" : ""} />
                  <span>${label}</span>
                </label>`
            )
            .join("")}
        </div>
      </section>

      <section class="context-strip">
        <span>Weather context</span>
        <strong>${weather.label}, ${weather.temperatureLabel}</strong>
        <small>${weather.planningNote} Simulated prototype data.</small>
      </section>

      <button class="primary-action" data-action="generate-itinerary">Generate outing</button>
      <p class="simulation-note">Map overlays, crowd, weather, facilities and routes are curated or simulated for usability testing.</p>
    </section>
  `;
}

function renderReview(state, savedDogs) {
  const itinerary = state.selectedItinerary;
  const route = getRoute(itinerary.primaryRouteId);
  const weather = getWeather(itinerary.weatherScenarioId);
  const selectedDog = savedDogs.find((dog) => dog.id === state.selectedDogId);
  return `
    <section class="screen review-screen">
      <header class="topbar">
        <button class="text-button" data-action="back-planning">Back</button>
        <div>
          <p class="eyebrow">Suggested outing</p>
          <h1>${escapeHtml(itinerary.title)}</h1>
        </div>
      </header>

      ${showMessage(state.message)}

      <section class="map-shell">
        <div id="map" class="map"></div>
        <div class="map-caption">Real West End base map with prototype overlays. Leaflet | OpenStreetMap.</div>
      </section>

      <section class="summary-grid">
        <article>
          <span>Total</span>
          <strong>${route.summary.distanceLabel}</strong>
        </article>
        <article>
          <span>Time</span>
          <strong>${route.summary.durationLabel}</strong>
        </article>
        <article>
          <span>Dog</span>
          <strong>${selectedDog ? escapeHtml(selectedDog.dogName) : "Current prefs"}</strong>
        </article>
      </section>

      <section class="context-strip">
        <span>Supporting context</span>
        <strong>${weather.label}, ${weather.temperatureLabel}</strong>
        <small>${itinerary.notes} Crowd and weather are simulated.</small>
      </section>

      <section class="panel">
        <div class="section-title">
          <h2>Itinerary</h2>
          <button class="text-button" data-action="swap-route">Change route</button>
        </div>
        <ol class="itinerary-list">
          ${itinerary.stopIds.map((id) => renderStop(id)).join("")}
        </ol>
      </section>

      <section class="panel compact">
        <div class="section-title">
          <h2>Facilities</h2>
          <span class="soft-label">On demand</span>
        </div>
        <div class="facility-row">
          ${facilities
            .slice(0, 5)
            .map((facility) => `<button class="mini-chip" data-action="show-facility" data-id="${facility.id}">${facilityIcon(facility.type)} ${facility.name}</button>`)
            .join("")}
        </div>
      </section>

      ${renderDetailsPanel(state)}

      <button class="primary-action" data-action="start-navigation">Start outing</button>
      <p class="simulation-note">Access notes and source notes are prototype content and not live verification.</p>
    </section>
  `;
}

function renderNavigation(state) {
  const itinerary = state.selectedItinerary;
  const route = getRoute(state.currentRouteId);
  const step = getCurrentStep(state);
  const destination = getDestination(step.nextDestinationId);
  const event = getScenarioEvent(state);
  const atEnd = step.distanceToNextLabel === "Arrived";

  return `
    <section class="screen navigation-screen">
      <header class="nav-header">
        <button class="text-button" data-action="back-review">Review</button>
        <div>
          <p class="eyebrow">Active outing</p>
          <h1>${escapeHtml(route.name)}</h1>
        </div>
      </header>

      <section class="map-shell active">
        <div id="map" class="map"></div>
        <div class="map-caption">Current route, essential facilities and crowd segments are simulated overlays.</div>
      </section>

      ${state.alertState === "visible" ? renderAlert(event, route) : ""}
      ${showMessage(state.message)}

      <section class="nav-card">
        <span class="soft-label">${atEnd ? "Current stop" : "Next destination"}</span>
        <strong>${destination ? escapeHtml(destination.name) : "Outing complete"}</strong>
        <p>${step.distanceToNextLabel}</p>
      </section>

      <section class="nav-essentials">
        <article>
          <span>Water</span>
          <strong>${step.facilityDistances.water}</strong>
        </article>
        <article>
          <span>Bin</span>
          <strong>${step.facilityDistances.bin}</strong>
        </article>
      </section>

      <section class="nav-controls">
        <button class="secondary-action" data-action="prev-step">Previous</button>
        <button class="primary-action inline" data-action="next-step">${atEnd ? "Stay here" : "Advance step"}</button>
      </section>

      <section class="panel compact">
        <div class="section-title">
          <h2>More</h2>
          <span class="soft-label">On demand</span>
        </div>
        <div class="facility-row">
          <button class="mini-chip" data-action="show-details" data-panel="nav-details">Destination details</button>
          <button class="mini-chip" data-action="show-details" data-panel="more-facilities">More facilities</button>
          <button class="mini-chip" data-action="show-plan-b">Plan B</button>
        </div>
      </section>

      ${renderDetailsPanel(state, itinerary)}
    </section>
  `;
}

function renderStop(id) {
  const destination = getDestination(id);
  if (!destination) return "";
  return `
    <li class="stop-card">
      <div>
        <h3>${escapeHtml(destination.name)}</h3>
        <p>${escapeHtml(destination.summary)}</p>
        <small>${accessLabel(destination)}</small>
      </div>
      <div class="card-actions">
        <button class="icon-button" data-action="show-destination" data-id="${destination.id}" aria-label="Details for ${escapeHtml(destination.name)}">Info</button>
        <button class="icon-button" data-action="replace-destination" data-id="${destination.id}" aria-label="Replace ${escapeHtml(destination.name)}">Swap</button>
      </div>
    </li>
  `;
}

function renderAlert(event, route) {
  const alt = getRoute(event?.alternativeRouteId || route.alternativeRouteId);
  return `
    <section class="alert-card" role="alert">
      <span class="soft-label">Simulated alert</span>
      <h2>${escapeHtml(event?.title || "Condition changed")}</h2>
      <p>${escapeHtml(event?.message || "A quieter route is available.")}</p>
      <div class="comparison-row">
        ${(alt.comparisonLabels || []).map((label) => `<span>${label}</span>`).join("")}
      </div>
      <div class="alert-actions">
        <button class="secondary-action" data-action="keep-current">Keep current</button>
        <button class="primary-action inline" data-action="switch-plan-b">Switch route</button>
      </div>
      <button class="text-button" data-action="show-plan-b">View route overlay</button>
    </section>
  `;
}

function renderDetailsPanel(state) {
  if (!state.detailsPanel) return "";
  if (state.detailsPanel.startsWith("destination:")) {
    const destination = getDestination(state.detailsPanel.split(":")[1]);
    if (!destination) return "";
    return `
      <section class="details-sheet">
        <button class="text-button close" data-action="close-details">Close</button>
        <h2>${escapeHtml(destination.name)}</h2>
        <p>${escapeHtml(destination.summary)}</p>
        <dl>
          <dt>Dog access</dt><dd>${accessLabel(destination)}</dd>
          <dt>Where</dt><dd>${escapeHtml(destination.dogAccess.whereAllowed)}</dd>
          <dt>Leash</dt><dd>${escapeHtml(destination.dogAccess.leashRequirement)}</dd>
          <dt>Source note</dt><dd>${escapeHtml(destination.sourceNote)}</dd>
        </dl>
      </section>
    `;
  }
  if (state.detailsPanel?.startsWith("facility:")) {
    const facility = facilities.find((item) => item.id === state.detailsPanel.split(":")[1]);
    if (!facility) return "";
    return `
      <section class="details-sheet">
        <button class="text-button close" data-action="close-details">Close</button>
        <h2>${escapeHtml(facility.name)}</h2>
        <p>${escapeHtml(facility.description)}</p>
        <p class="simulation-note">Status is ${facility.status} prototype data.</p>
      </section>
    `;
  }
  if (state.detailsPanel === "more-facilities") {
    return `
      <section class="details-sheet">
        <button class="text-button close" data-action="close-details">Close</button>
        <h2>Additional facilities</h2>
        <div class="facility-row stacked">
          ${facilities.map((facility) => `<span class="mini-chip">${facilityIcon(facility.type)} ${facility.name}</span>`).join("")}
        </div>
      </section>
    `;
  }
  if (state.detailsPanel === "nav-details") {
    const step = getCurrentStep(state);
    const destination = getDestination(step.nextDestinationId);
    return destination ? renderDetailsPanel({ ...state, detailsPanel: `destination:${destination.id}` }) : "";
  }
  return "";
}

export function renderSaveDogPanel(state) {
  return `
    <section class="details-sheet">
      <button class="text-button close" data-action="close-details">Close</button>
      <h2>Save preferences</h2>
      <label class="field-label" for="dog-name-input">Dog name</label>
      <input id="dog-name-input" class="text-input" type="text" maxlength="24" placeholder="e.g. Milo" />
      <button class="primary-action" data-action="save-dog">Save dog</button>
    </section>
  `;
}

function accessLabel(destination) {
  const allowed = {
    allowed: "Dogs allowed",
    limited: "Dogs allowed in some areas",
    unknown: "Access uncertain"
  };
  return allowed[destination.dogAccess.allowed] || "Access note";
}

function facilityIcon(type) {
  return {
    water: "Water",
    bin: "Bin",
    seatingShade: "Shade",
    toilet: "Toilet",
    parkingAccess: "Access"
  }[type] || "Facility";
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
