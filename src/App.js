import './styles/index.css'

import { HashRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/index.jsx'
import { Error } from './pages/Error/index.jsx'
import { Dashboard } from './pages/Dashboard/index.jsx'
import { WagmiProvider } from './contexts/Wagmi'
import { Settings } from './pages/Settings'

function App() {
    return (
        <WagmiProvider>
            <HashRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="creator">
                            <Route index element={<Dashboard />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<Error />} />
                </Routes>
            </HashRouter>
        </WagmiProvider>
    )
}

export default App
