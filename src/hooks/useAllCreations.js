import useSWR from 'swr'
import { getAllCreations } from '../database'

export function useAllCreations() {
    return useSWR('useAllCreations', () => {
        return getAllCreations()
    })
}
