import './styles/index.css'

import { HashRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/index.jsx'
import { Error } from './pages/Error/index.jsx'
import { Dashboard } from './pages/Dashboard/index.jsx'
import { WagmiProvider } from './contexts/Wagmi'
import { Settings } from './pages/Settings'
import { Favorites } from './pages/Favorites'

function App() {
    return (
        <WagmiProvider>
            <HashRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="creator">
                            <Route index element={<Dashboard />} />
                            <Route path="favorites" element={<Favorites />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<Error />} />
                </Routes>
            </HashRouter>
        </WagmiProvider>
    )
}

export default App
