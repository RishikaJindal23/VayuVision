import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * Demonstrates: Custom Hooks, useState, useEffect, and localStorage persistence.
 *
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default initial state if key doesn't exist
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // useState with lazy initialization function
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // useEffect to sync storedValue to localStorage whenever key or storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
