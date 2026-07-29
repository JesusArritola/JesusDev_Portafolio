import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for intersection observer based scroll spy
 * Replaces the manual scroll listener for better performance
 * @param {string[]} sectionIds - Array of section IDs to observe
 * @param {Object} options - IntersectionObserver options
 * @returns {string} Currently active section ID
 */
export function useScrollSpy(sectionIds, options = {}) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'home');
  const [isClient, setIsClient] = useState(false);

  const {
    offset = 120,
    enabled = true,
  } = options;

  const setActive = useCallback((id) => {
    setActiveSection((prev) => (prev !== id ? id : prev));
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!enabled || !isClient || typeof window === 'undefined') return;

    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY + offset;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY + window.innerHeight >= docHeight - 4) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActive(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds, offset, enabled, setActive, isClient]);

  return activeSection;
}

/**
 * Custom hook for keyboard shortcuts
 * @param {string} key - Key to listen for
 * @param {Function} callback - Callback function
 * @param {Object} options - Event listener options
 */
export function useKeyPress(key, callback, options = {}) {
  const { event = 'keydown', enabled = true } = options;

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const handler = (e) => {
      if (e.key === key) {
        callback(e);
      }
    };

    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [key, callback, event, enabled]);
}

/**
 * Custom hook for typing animation
 * @param {string[]} phrases - Array of phrases to cycle through
 * @param {Object} options - Animation options
 * @returns {string} Current text to display
 */
export function useTypingAnimation(phrases, options = {}) {
  const [text, setText] = useState('');
  const [isClient, setIsClient] = useState(false);
  const {
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
    startDelay = 300,
  } = options;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || phrases.length === 0) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let typing = true;
    let timeoutId = null;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (typing) {
        if (charIndex < currentPhrase.length) {
          setText(currentPhrase.slice(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(type, typingSpeed);
        } else {
          timeoutId = setTimeout(() => {
            typing = false;
            type();
          }, pauseDuration);
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          setText(currentPhrase.slice(0, charIndex));
          timeoutId = setTimeout(type, deletingSpeed);
        } else {
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typing = true;
          timeoutId = setTimeout(type, startDelay);
        }
      }
    };

    const initialTimeout = setTimeout(type, startDelay);
    return () => {
      clearTimeout(initialTimeout);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [phrases, typingSpeed, deletingSpeed, pauseDuration, startDelay, isClient]);

  return text;
}

/**
 * Custom hook for project data fetching with caching
 * @param {string} projectTitle - Title of the project to fetch
 * @returns {Object} Project data and loading state
 */
export function useProjectData(projectTitle) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cacheRef = useRef({});

  useEffect(() => {
    if (!projectTitle) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      if (cacheRef.current[projectTitle]) {
        setData(cacheRef.current[projectTitle]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const slug = projectTitle.replace(/\s+/g, '_');
        const res = await fetch(`/api/json/${encodeURIComponent(slug)}`);

        if (!res.ok) throw new Error('Failed to fetch');

        const json = await res.json();
        cacheRef.current[projectTitle] = json;
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectTitle]);

  return { data, loading, error };
}

/**
 * Custom hook for form submission with status handling
 * @param {Function} submitFn - Async function to handle submission
 * @returns {Object} Form state and handlers
 */
export function useFormSubmit(submitFn) {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const submit = async (formData) => {
    setStatus('sending');
    try {
      await submitFn(formData);
      setStatus('success');
      return true;
    } catch (err) {
      setStatus('error');
      return false;
    }
  };

  const reset = () => setStatus('idle');

  return { status, submit, reset };
}

/**
 * Custom hook for managing expanded categories
 * @param {number} currentCategoryIndex - Current category index
 * @returns {Object} Expanded categories state and handlers
 */
export function useExpandedCategories(currentCategoryIndex) {
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    setExpanded({});
  }, [currentCategoryIndex]);

  const toggle = useCallback((index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  const isExpanded = useCallback((index) => !!expanded[index], [expanded]);

  return { expanded, toggle, isExpanded };
}

/**
 * Custom hook for mobile menu state
 * @returns {Object} Menu state and handlers
 */
export function useMobileMenu() {
  const [open, setOpen] = useState(false);

  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);

  return { open, openMenu, closeMenu, toggleMenu, setOpen };
}

/**
 * Custom hook for keyboard navigation (Escape key)
 * @param {Object} handlers - Event handlers
 * @param {Function} handlers.onEscape - Callback for Escape key
 */
export function useKeyboardNavigation({ onEscape } = {}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEscape]);
}