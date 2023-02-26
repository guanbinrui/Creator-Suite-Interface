import useSWRMutation from 'swr/mutation'
import { getCreation, purchaseCreation } from '../database'
import { balanceOf, connectIfNeeded, isQualified, purchaseAsset } from '../connections'
import { isGreaterThanOrEqualTo } from '../helpers/isGreaterThanOrEqualTo'

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
            const { assetId, paymentTokenAddress, paymentTokenAmount } = creation

            const balance = await balanceOf(paymentTokenAddress, buyer)
            if (!isGreaterThanOrEqualTo(balance, paymentTokenAmount)) throw new Error('Insufficient balance.')

            const qualified = await isQualified(buyer, assetId)
            if (qualified) throw new Error('Already purchased.')

            return purchaseCreation(creationId, buyer, await purchaseAsset(assetId))
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
