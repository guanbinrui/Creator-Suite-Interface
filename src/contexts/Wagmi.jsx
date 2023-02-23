import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
})

export function WagmiProvider(props) {
    return <WagmiConfig client={client}>{props.children}</WagmiConfig>
}
