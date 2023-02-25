import useSWRMutation from 'swr/mutation'
import { purchaseCreation } from '../database'

export function usePurchaseCreation(id, buyerAddress) {
    return useSWRMutation(
        'usePurchaseCreation',
        async () => {
            return purchaseCreation(id, buyerAddress)
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
