import './styles/index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/index.jsx'
import { Error } from './pages/Error/index.jsx'
import { Dashboard } from './pages/Dashboard/index.jsx'
import { CoreService } from './pages/CoreService/index.jsx'
import { WagmiProvider } from './contexts/Wagmi'

function App() {
    return (
        <WagmiProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />}></Route>
                    <Route path="/creation/*" element={<Dashboard />} />
                    <Route path="/core-service/*" element={<CoreService />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </WagmiProvider>
    )
}

export default App
