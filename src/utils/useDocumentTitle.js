import { useEffect } from 'react';

/**
 * Custom hook to manage document title.
 * Replaces react-helmet-async to avoid React 19 peer dependency issues.
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) {
      document.title = title;
    }
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
