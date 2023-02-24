import useSWR from 'swr'
import { getAllOwnedCreations } from '../database'

/**
 * Use all owned creations
 * @param {string} owner
 * @returns
 */
export function useAllOwnedCreations(owner) {
    return useSWR(
        `useAllOwnedCreations_${owner}`,
        async () => {
            return getAllOwnedCreations(owner)
        },
        { suspense: true, revalidateOnFocus: false, revalidateOnMount: true },
    )
}
