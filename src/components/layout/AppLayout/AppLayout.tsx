import { Outlet, useLocation } from 'react-router-dom'
import AppHeader from '../AppHeader/AppHeader'
import { useEffect } from 'react';

function AppLayout() {
  const { pathname } = useLocation();

  /**
     * Reset the browser's document scroll position whenever the route changes.
     * React Router performs client-side navigation without reloading the page,
     * so the browser may otherwise keep the previous page's scroll position.
  */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const title = pathname === '/' || pathname == '/calls'
    ? 'Calls'
    : 'Call Details';

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title={title} />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout