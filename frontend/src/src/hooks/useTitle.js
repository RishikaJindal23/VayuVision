import { useEffect } from 'react';

/**
 * Custom Hook: useTitle
 * Demonstrates: Custom Hooks & useEffect side-effects for DOM manipulation (updating tab title).
 *
 * @param {string} title - Document title string
 */
export function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | RESUMATE` : 'RESUMATE - ATS Resume Intelligence';

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
