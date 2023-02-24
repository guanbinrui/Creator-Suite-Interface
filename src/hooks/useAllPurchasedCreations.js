import useSWR from 'swr'
import { delay } from '../helpers/delay'
import { getAllPurchasedCreations } from '../database'

/**
 * Use all purchased creations
 * @param {string} owner
 * @returns
 */
export function useAllPurchasedCreations(owner) {
    return useSWR(`useAllPurchasedCreations_${owner}`, async () => {
        await delay(1500)
        return getAllPurchasedCreations(owner)
    })
}
