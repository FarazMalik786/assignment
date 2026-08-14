import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import AppLayout from '@layouts/AppLayout/AppLayout'
import CallsList from '@pages/CallsList/CallsList'
import CallDetails from '@pages/CallDetails/CallDetails'
import NotFound from '@pages/NotFound/NotFound'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Navigate to="/calls" replace />} />
                <Route element={<AppLayout />}>
                    <Route path="calls" element={<CallsList />} />
                    <Route path="calls/:callId" element={<CallDetails />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes