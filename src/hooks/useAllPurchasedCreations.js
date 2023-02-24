import useSWR from 'swr'
import { getAllPurchasedCreations } from '../database'

/**
 * Use all purchased creations
 * @param {string} owner
 * @returns
 */
export function useAllPurchasedCreations(owner) {
    return useSWR(`useAllPurchasedCreations_${owner}`, async () => {
        return getAllPurchasedCreations(owner)
    })
}
