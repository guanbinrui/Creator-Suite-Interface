import useSWRMutation from 'swr/mutation'
import { getCreation, purchaseCreation } from '../database'
import { connectIfNeeded, getAssetId, purchaseAsset } from '../connections'

/**
 * Use to purchase a creation
 * @param {string} creationId
 * @param {string} buyer the buyer address
 * @returns
 */
export function usePurchaseCreation(creationId, buyer) {
    return useSWRMutation(
        'usePurchaseCreation',
        async () => {
            await connectIfNeeded()

            const creation = await getCreation(creationId)
            const assetId = await getAssetId(creation.ownerAddress)
            return purchaseCreation(creationId, buyer, await purchaseAsset(assetId))
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
