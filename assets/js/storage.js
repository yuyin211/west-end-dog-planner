const STORAGE_KEY = "westEndDogPlanner.savedDogs";

export function loadSavedDogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const dogs = raw ? JSON.parse(raw) : [];
    return Array.isArray(dogs) ? dogs : [];
  } catch {
    return [];
  }
}

export function saveDogPreference(dogName, preferences, existingId = null) {
  const name = dogName.trim();
  if (!name) {
    return { ok: false, error: "Enter a short dog name before saving." };
  }

  const normalised = normalisePreferences(preferences);
  const dogs = loadSavedDogs();
  const id = existingId || `dog-${Date.now()}`;
  const record = {
    id,
    dogName: name.slice(0, 24),
    preferences: normalised,
    updatedAt: new Date().toISOString()
  };
  const next = dogs.filter((dog) => dog.id !== id).concat(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return { ok: true, dog: record, dogs: next };
}

export function deleteSavedDog(id) {
  const next = loadSavedDogs().filter((dog) => dog.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearSavedDogs() {
  localStorage.removeItem(STORAGE_KEY);
}

export function normalisePreferences(preferences) {
  const next = {
    quieterAreas: Boolean(preferences.quieterAreas),
    fewerDogs: Boolean(preferences.fewerDogs),
    avoidCrowds: Boolean(preferences.avoidCrowds),
    easyWaterAccess: Boolean(preferences.easyWaterAccess),
    noSpecificPreference: Boolean(preferences.noSpecificPreference)
  };
  const hasSpecific = next.quieterAreas || next.fewerDogs || next.avoidCrowds || next.easyWaterAccess;
  next.noSpecificPreference = !hasSpecific;
  return next;
}
