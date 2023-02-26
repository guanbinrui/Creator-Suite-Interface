import useSWRMutation from 'swr/mutation'
import { createCreation } from '../database'
import { connectIfNeeded, createAsset, getAssetId } from '../connections'
import { isValidAddress } from '../helpers/isValidAddress'
import { isGreaterThan } from '../helpers/isGreaterThan'

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

            const { id: creationId, ownerAddress, paymentTokenAddress, paymentTokenAmount } = creation

            if (!isValidAddress(ownerAddress)) throw new Error('Invalid owner address.')
            if (!isValidAddress(paymentTokenAddress)) throw new Error('Invalid payment token address.')
            if (!isGreaterThan(paymentTokenAmount || 0, 0)) throw new Error('Invalid payment token amount.')

            return createCreation({
                ...creation,
                assetId: await getAssetId(ownerAddress, creationId),
                transactionHash: await createAsset(creationId, paymentTokenAddress, paymentTokenAmount),
            })
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
