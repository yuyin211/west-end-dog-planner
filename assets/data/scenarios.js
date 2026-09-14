export const scenarioEvents = [
  {
    id: "crowd-boundary-step-2",
    type: "crowdChange",
    routeId: "route-a",
    triggerStepIndex: 2,
    affectedSegmentIds: ["seg-boundary"],
    title: "Crowds building ahead",
    message: "Boundary Street is now busier. A quieter riverside detour is available.",
    alternativeRouteId: "route-b",
    vibrationPattern: [80, 40, 80]
  }
];
