import './styles/index.css'

import { HashRouter, Route, Routes } from 'react-router-dom'
import { polygonMumbai } from '@wagmi/chains'
import { Home } from './pages/Home/index.jsx'
import { Error } from './pages/Error/index.jsx'
import { Dashboard } from './pages/Dashboard/index.jsx'
import { WagmiProvider } from './contexts/Wagmi'

function App() {
    return (
        <WagmiProvider chainId={polygonMumbai.id}>
            <HashRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="creation/*" element={<Dashboard />} />
                    </Route>
                    <Route path="*" element={<Error />} />
                </Routes>
            </HashRouter>
        </WagmiProvider>
    )
}

export default App
