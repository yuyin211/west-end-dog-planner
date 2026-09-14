export const routes = [
  {
    id: "route-a",
    name: "Market to Riverside Loop",
    stopIds: ["davies-park-market", "boundary-st-cafe", "riverside-path", "orleigh-park"],
    summary: {
      distanceLabel: "2.7 km",
      durationLabel: "44 min"
    },
    polyline: [
      [-27.48149, 153.00256],
      [-27.48084, 153.00611],
      [-27.48002, 153.01218],
      [-27.48283, 153.00978],
      [-27.48655, 152.99924],
      [-27.48965, 152.99679]
    ],
    segments: [
      {
        id: "seg-market",
        crowdLevel: "moderate",
        polyline: [
          [-27.48149, 153.00256],
          [-27.48084, 153.00611]
        ]
      },
      {
        id: "seg-boundary",
        crowdLevel: "moderate",
        changedCrowdLevel: "high",
        polyline: [
          [-27.48084, 153.00611],
          [-27.48002, 153.01218]
        ]
      },
      {
        id: "seg-riverside",
        crowdLevel: "low",
        polyline: [
          [-27.48002, 153.01218],
          [-27.48283, 153.00978],
          [-27.48655, 152.99924]
        ]
      },
      {
        id: "seg-orleigh",
        crowdLevel: "low",
        polyline: [
          [-27.48655, 152.99924],
          [-27.48965, 152.99679]
        ]
      }
    ],
    steps: [
      {
        index: 0,
        position: [-27.48149, 153.00256],
        nextDestinationId: "boundary-st-cafe",
        distanceToNextLabel: "950 m / 14 min",
        facilityDistances: { water: "420 m", bin: "160 m", shade: "70 m" },
        activeSegmentIds: ["seg-market"]
      },
      {
        index: 1,
        position: [-27.48084, 153.00611],
        nextDestinationId: "boundary-st-cafe",
        distanceToNextLabel: "480 m / 7 min",
        facilityDistances: { water: "300 m", bin: "260 m", shade: "220 m" },
        activeSegmentIds: ["seg-boundary"]
      },
      {
        index: 2,
        position: [-27.48002, 153.01218],
        nextDestinationId: "riverside-path",
        distanceToNextLabel: "1.1 km / 17 min",
        facilityDistances: { water: "90 m", bin: "80 m", toilet: "620 m" },
        activeSegmentIds: ["seg-boundary", "seg-riverside"]
      },
      {
        index: 3,
        position: [-27.48655, 152.99924],
        nextDestinationId: "orleigh-park",
        distanceToNextLabel: "520 m / 8 min",
        facilityDistances: { water: "180 m", bin: "210 m", seatingShade: "160 m" },
        activeSegmentIds: ["seg-riverside", "seg-orleigh"]
      },
      {
        index: 4,
        position: [-27.48965, 152.99679],
        nextDestinationId: "orleigh-park",
        distanceToNextLabel: "Arrived",
        facilityDistances: { water: "60 m", bin: "90 m", seatingShade: "40 m" },
        activeSegmentIds: ["seg-orleigh"]
      }
    ],
    alternativeRouteId: "route-b"
  },
  {
    id: "route-b",
    baseRouteId: "route-a",
    name: "Quieter Riverside Detour",
    stopIds: ["davies-park-market", "hardgrave-cafe", "riverside-path", "orleigh-park"],
    summary: {
      distanceLabel: "3.0 km",
      durationLabel: "49 min"
    },
    comparisonLabels: ["Quieter", "+5 min", "+300 m"],
    polyline: [
      [-27.48149, 153.00256],
      [-27.48402, 153.00678],
      [-27.48655, 152.99924],
      [-27.48965, 152.99679]
    ],
    segments: [
      {
        id: "seg-detour-cafe",
        crowdLevel: "low",
        polyline: [
          [-27.48149, 153.00256],
          [-27.48402, 153.00678]
        ]
      },
      {
        id: "seg-detour-river",
        crowdLevel: "low",
        polyline: [
          [-27.48402, 153.00678],
          [-27.48655, 152.99924],
          [-27.48965, 152.99679]
        ]
      }
    ],
    steps: [
      {
        index: 0,
        position: [-27.48149, 153.00256],
        nextDestinationId: "hardgrave-cafe",
        distanceToNextLabel: "780 m / 12 min",
        facilityDistances: { water: "420 m", bin: "160 m", shade: "70 m" },
        activeSegmentIds: ["seg-detour-cafe"]
      },
      {
        index: 1,
        position: [-27.48402, 153.00678],
        nextDestinationId: "riverside-path",
        distanceToNextLabel: "1.0 km / 16 min",
        facilityDistances: { water: "240 m", bin: "260 m", seatingShade: "120 m" },
        activeSegmentIds: ["seg-detour-cafe", "seg-detour-river"]
      },
      {
        index: 2,
        position: [-27.48655, 152.99924],
        nextDestinationId: "orleigh-park",
        distanceToNextLabel: "520 m / 8 min",
        facilityDistances: { water: "180 m", bin: "210 m", seatingShade: "160 m" },
        activeSegmentIds: ["seg-detour-river"]
      },
      {
        index: 3,
        position: [-27.48965, 152.99679],
        nextDestinationId: "orleigh-park",
        distanceToNextLabel: "Arrived",
        facilityDistances: { water: "60 m", bin: "90 m", seatingShade: "40 m" },
        activeSegmentIds: ["seg-detour-river"]
      }
    ]
  }
];
