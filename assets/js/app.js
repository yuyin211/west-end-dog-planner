import { getState, setState, resetPrototype, toggleActivity, setPreference, applySavedDog, updateForRoute } from "./state.js";
import { loadSavedDogs, saveDogPreference, deleteSavedDog, clearSavedDogs } from "./storage.js";
import { generateItinerary, replaceDestination, swapRoute, getRoute } from "./planner.js";
import { renderApp, renderSaveDogPanel } from "./ui.js";
import { disposeMap, renderReviewMap, renderNavigationMap } from "./map.js";
import { getCurrentStep, nextStep, previousStep, keepCurrentRoute, showPlanB, switchToPlanB } from "./navigation.js";

const app = document.getElementById("app");
let savedDogs = loadSavedDogs();

function render() {
  const state = getState();
  disposeMap();
  app.innerHTML = renderApp(state, savedDogs);
  requestAnimationFrame(() => renderMapForState());
}

function renderMapForState() {
  const state = getState();
  if (state.view === "review" && state.selectedItinerary) {
    renderReviewMap(state.selectedItinerary);
  }
  if (state.view === "navigation" && state.selectedItinerary) {
    renderNavigationMap(state, getCurrentStep(state));
  }
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  const state = getState();

  if (action === "reset-prototype") {
    resetPrototype();
    render();
    return;
  }
  if (action === "select-no-dog") {
    applySavedDog(null);
    render();
    return;
  }
  if (action === "select-dog") {
    applySavedDog(savedDogs.find((dog) => dog.id === target.dataset.id));
    render();
    return;
  }
  if (action === "toggle-activity") {
    toggleActivity(target.dataset.id);
    render();
    return;
  }
  if (action === "set-time") {
    setState({ availableTime: Number(target.dataset.minutes), message: "" });
    render();
    return;
  }
  if (action === "generate-itinerary") {
    const result = generateItinerary(state);
    if (!result.ok) {
      setState({ message: result.message });
    } else {
      setState({
        selectedItinerary: result.itinerary,
        currentRouteId: result.itinerary.primaryRouteId,
        activeRouteStepIndex: 0,
        view: "review",
        message: "Suggested itinerary generated."
      });
    }
    render();
    return;
  }
  if (action === "back-planning") {
    setState({ view: "planning", message: "" });
    render();
    return;
  }
  if (action === "back-review") {
    setState({ view: "review", message: "" });
    render();
    return;
  }
  if (action === "show-destination") {
    setState({ detailsPanel: `destination:${target.dataset.id}` });
    render();
    return;
  }
  if (action === "show-facility") {
    setState({ detailsPanel: `facility:${target.dataset.id}` });
    render();
    return;
  }
  if (action === "show-details") {
    setState({ detailsPanel: target.dataset.panel });
    render();
    return;
  }
  if (action === "close-details") {
    setState({ detailsPanel: null });
    render();
    return;
  }
  if (action === "replace-destination") {
    setState({
      selectedItinerary: replaceDestination(state.selectedItinerary, target.dataset.id),
      message: "Itinerary adjusted without restarting planning."
    });
    render();
    return;
  }
  if (action === "swap-route") {
    const itinerary = swapRoute(state.selectedItinerary);
    setState({
      selectedItinerary: itinerary,
      currentRouteId: itinerary.primaryRouteId,
      message: "Route option changed."
    });
    render();
    return;
  }
  if (action === "start-navigation") {
    setState({
      view: "navigation",
      activeRouteStepIndex: 0,
      alertState: "hidden",
      planBVisible: false,
      detailsPanel: null,
      message: "Active navigation uses manual prototype steps."
    });
    render();
    return;
  }
  if (action === "next-step") {
    setState(nextStep(state));
    render();
    return;
  }
  if (action === "prev-step") {
    setState(previousStep(state));
    render();
    return;
  }
  if (action === "show-plan-b") {
    setState(showPlanB(state));
    render();
    return;
  }
  if (action === "keep-current") {
    setState(keepCurrentRoute());
    render();
    return;
  }
  if (action === "switch-plan-b") {
    setState(switchToPlanB(state));
    render();
    return;
  }
  if (action === "open-save-dog") {
    app.insertAdjacentHTML("beforeend", renderSaveDogPanel(state));
    return;
  }
  if (action === "save-dog") {
    const input = document.getElementById("dog-name-input");
    const result = saveDogPreference(input?.value || "", state.temporaryPreferences, state.selectedDogId);
    if (!result.ok) {
      setState({ message: result.error });
    } else {
      savedDogs = result.dogs;
      setState({ selectedDogId: result.dog.id, detailsPanel: null, message: `${result.dog.dogName} saved for reuse.` });
    }
    render();
    return;
  }
  if (action === "delete-dog") {
    savedDogs = deleteSavedDog(target.dataset.id);
    setState({ selectedDogId: null, message: "Saved dog removed." });
    render();
    return;
  }
  if (action === "clear-saved-dogs") {
    clearSavedDogs();
    savedDogs = [];
    setState({ selectedDogId: null, message: "Saved dog preferences cleared." });
    render();
  }
});

app.addEventListener("change", (event) => {
  const target = event.target;
  if (target?.dataset?.action === "toggle-preference") {
    setPreference(target.dataset.key, target.checked);
    render();
  }
});

window.addEventListener("resize", () => {
  const state = getState();
  if (state.view === "review" && state.selectedItinerary) renderReviewMap(state.selectedItinerary);
  if (state.view === "navigation" && state.selectedItinerary) renderNavigationMap(state, getCurrentStep(state));
});

window.__westEndDogPlanner = {
  reset: () => {
    resetPrototype();
    render();
  },
  setRoute: (routeId) => {
    if (getRoute(routeId)) {
      updateForRoute(routeId);
      render();
    }
  }
};

render();
