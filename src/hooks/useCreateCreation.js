import useSWRMutation from 'swr/mutation'
import { createCreation } from '../database'

export function useCreateCreation(creation) {
    return useSWRMutation(
        'useCreateCreation',
        async () => {
            return createCreation(creation)
        },
        {
            suspense: true,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnMount: false,
            revalidateOnReconnect: false,
        },
    )
}
