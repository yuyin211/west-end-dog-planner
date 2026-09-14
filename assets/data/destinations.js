export const destinations = [
  {
    id: "davies-park-market",
    name: "Davies Park Market",
    activityTags: ["market", "food"],
    coordinates: [-27.48149, 153.00256],
    summary: "Open-air market stop with food stalls and riverside shade nearby.",
    dogAccess: {
      allowed: "limited",
      whereAllowed: "Outdoor paths and stall edges",
      leashRequirement: "Leash recommended in busy areas"
    },
    sourceNote: "Prototype access note based on typical outdoor-market conditions.",
    suitabilityTags: ["waterNearby", "crowdSensitive"],
    replacementGroup: "market"
  },
  {
    id: "boundary-st-cafe",
    name: "Boundary Street Cafe Strip",
    activityTags: ["food", "shopping"],
    coordinates: [-27.48002, 153.01218],
    summary: "Food and coffee stop with outdoor seating options.",
    dogAccess: {
      allowed: "limited",
      whereAllowed: "Outdoor seating and footpath edges",
      leashRequirement: "Dogs remain leashed beside seating"
    },
    sourceNote: "Prototype venue grouping; confirm individual venues before real visits.",
    suitabilityTags: ["waterNearby"],
    replacementGroup: "food"
  },
  {
    id: "hardgrave-cafe",
    name: "Hardgrave Road Quiet Cafe",
    activityTags: ["food", "restPicnic"],
    coordinates: [-27.48402, 153.00678],
    summary: "Quieter food stop away from the busiest part of Boundary Street.",
    dogAccess: {
      allowed: "limited",
      whereAllowed: "Outdoor seating",
      leashRequirement: "Leash required"
    },
    sourceNote: "Simulated prototype destination.",
    suitabilityTags: ["quiet", "waterNearby"],
    replacementGroup: "food"
  },
  {
    id: "avid-reader-area",
    name: "Boundary Street Shops",
    activityTags: ["shopping"],
    coordinates: [-27.47939, 153.01272],
    summary: "Small shopping stop for browsing and people-watching.",
    dogAccess: {
      allowed: "limited",
      whereAllowed: "Footpath and outdoor edges",
      leashRequirement: "Leash required"
    },
    sourceNote: "Prototype shopping area, not a live store directory.",
    suitabilityTags: ["crowdSensitive"],
    replacementGroup: "shopping"
  },
  {
    id: "orleigh-park",
    name: "Orleigh Park Riverside",
    activityTags: ["riversideWalk", "restPicnic"],
    coordinates: [-27.48965, 152.99679],
    summary: "Riverside walking and resting area with shade and open space.",
    dogAccess: {
      allowed: "allowed",
      whereAllowed: "Park paths and open areas",
      leashRequirement: "Follow posted park rules"
    },
    sourceNote: "Prototype public-space note; verify council signage for real visits.",
    suitabilityTags: ["quiet", "shaded", "waterNearby"],
    replacementGroup: "riverside"
  },
  {
    id: "riverside-path",
    name: "West End Riverside Path",
    activityTags: ["riversideWalk"],
    coordinates: [-27.48655, 152.99924],
    summary: "Scenic path segment for an easy dog walk.",
    dogAccess: {
      allowed: "allowed",
      whereAllowed: "Shared riverside path",
      leashRequirement: "Leash required on shared paths"
    },
    sourceNote: "Prototype route stop.",
    suitabilityTags: ["quiet", "waterNearby"],
    replacementGroup: "riverside"
  },
  {
    id: "musgrave-rest",
    name: "Shaded Rest Stop",
    activityTags: ["restPicnic"],
    coordinates: [-27.47727, 153.01505],
    summary: "Short rest stop near shade and seating before heading back.",
    dogAccess: {
      allowed: "allowed",
      whereAllowed: "Outdoor seating and grassed edge",
      leashRequirement: "Leash recommended"
    },
    sourceNote: "Simulated rest stop for prototype testing.",
    suitabilityTags: ["shaded", "quiet"],
    replacementGroup: "rest"
  }
];

export const activityLabels = {
  market: "Market",
  food: "Cafe or food",
  shopping: "Shopping",
  riversideWalk: "Riverside walk",
  restPicnic: "Rest or picnic"
};
