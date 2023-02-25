import useSWRMutation from 'swr/mutation'
import { purchaseCreation } from '../database'

export function usePurchaseCreation(id, buyerAddress, transactionHash) {
    return useSWRMutation(
        'usePurchaseCreation',
        async () => {
            return purchaseCreation(id, buyerAddress, transactionHash)
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
