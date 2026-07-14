import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((current) => !current);
  }, []);

  const openMobileNav = useCallback(() => {
    setMobileNavOpen(true);
  }, []);

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  const showNotification = useCallback((message) => {
    setNotification({ id: Date.now(), message });
    window.setTimeout(() => setNotification(null), 3200);
  }, []);

  const handlePlaceholder = useCallback(
    (label) => {
      showNotification(`${label} is ready for product logic.`);
    },
    [showNotification],
  );

  const value = useMemo(
    () => ({
      sidebarCollapsed,
      toggleSidebar,
      mobileNavOpen,
      openMobileNav,
      closeMobileNav,
      notification,
      showNotification,
      handlePlaceholder,
    }),
    [
      closeMobileNav,
      handlePlaceholder,
      mobileNavOpen,
      notification,
      openMobileNav,
      sidebarCollapsed,
      showNotification,
      toggleSidebar,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used inside UIProvider');
  }

  return context;
}
