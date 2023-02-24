import useSWR from 'swr'
import { delay } from '../helpers/delay'
import { getAllCreations } from '../database'

export function useAllCreations() {
    return useSWR(
        'useAllCreations',
        async () => {
            await delay(1500)
            return getAllCreations()
        },
        { suspense: true, revalidateOnFocus: true, revalidateOnMount: true },
    )
}
