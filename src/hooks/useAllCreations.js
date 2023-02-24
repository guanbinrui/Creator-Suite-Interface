import useSWR from 'swr'
import { delay } from '../helpers/delay'
import { getAllCreations } from '../database'

export function useAllCreations() {
    return useSWR(
        'useAllCreations',
        async () => {
            await delay(3000)
            return getAllCreations()
        },
        { suspense: true },
    )
}
