import { readContract } from '@wagmi/core'
import { polygonMumbai } from '@wagmi/core/chains'
import ERC20ABI from '../abis/ERC20.json'
import { isValidAddress } from '../helpers/isValidAddress'

/**
 * Return the balance of the owner on the ERC20 contract
 */
export function balanceOf(address, owner) {
    if (!isValidAddress(address)) throw new Error('Not a valid contract address.')
    if (!isValidAddress(owner)) throw new Error('Not a valid owner address.')

    return readContract({
        chainId: polygonMumbai.id,
        address,
        abi: ERC20ABI,
        functionName: 'balanceOf',
        args: [owner],
    })
}
