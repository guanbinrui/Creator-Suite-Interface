import "./styles/index.css";
import { Dashboard } from "./components/Dashboard/index.jsx";
import { WagmiProvider } from "./contexts/Wagmi";

function App() {
  return (
    <WagmiProvider>
      <Dashboard />
    </WagmiProvider>
  );
}

export default App;
