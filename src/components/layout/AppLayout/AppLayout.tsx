import { Outlet, useLocation } from 'react-router-dom'
import AppHeader from '../AppHeader/AppHeader'

function AppLayout() {
  const { pathname } = useLocation();

  const title = pathname === '/'
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