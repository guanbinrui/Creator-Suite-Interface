import useSWRMutation from 'swr/mutation'
import { delay } from '../helpers/delay'
import { createCreation } from '../database'

export function useCreateCreation(creation) {
    return useSWRMutation(
        'useCreateCreation',
        async () => {
            await delay(1500)
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
