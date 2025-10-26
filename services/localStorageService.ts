
// services/localStorageService.ts

export const loadState = <T>(key: string, defaultValue: T): T => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return defaultValue;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return defaultValue;
  }
};

export const saveState = <T>(key: string, state: T): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

export const clearState = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error clearing state from localStorage:", error);
  }
};
