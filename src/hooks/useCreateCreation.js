import useSWRMutation from 'swr/mutation'
import { createCreation } from '../database'
import { connectIfNeeded, createAsset } from '../connections'

/**
 * Use to create a creation
 * @param {object} creation
 * @returns
 */
export function useCreateCreation(creation) {
    return useSWRMutation(
        'useCreateCreation',
        async () => {
            await connectIfNeeded()

            const { id, paymentTokenAddress, paymentTokenAmount } = creation
            return createCreation({
                ...creation,
                transactionHash: await createAsset(id, paymentTokenAddress, paymentTokenAmount),
            })
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
