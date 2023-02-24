import useSWR from 'swr'
import { delay } from '../helpers/delay'
import { getAllOwnedCreations } from '../database'

/**
 * Use all owned creations
 * @param {string} owner
 * @returns
 */
export function useAllOwnedCreations(owner) {
    return useSWR(
        'useAllOwnedCreations',
        async () => {
            await delay(1500)
            return getAllOwnedCreations(owner)
        },
        { suspense: true, revalidateOnFocus: true, revalidateOnMount: true },
    )
}
