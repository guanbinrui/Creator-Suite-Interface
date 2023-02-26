import { useEnsName } from 'wagmi'
import { mainnet } from '@wagmi/chains'
import { Menu } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Avatar } from '../Avatar'
import { formatEthereumAddress } from '../../helpers/formatEthereumAddress'

export function Account({ address }) {
    const { data: ensName } = useEnsName({ chainId: mainnet.id, address: address })

    return (
        <div>
            <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <span className="flex w-full items-center justify-between">
                    <span className="flex min-w-0 items-center justify-between space-x-3">
                        <Avatar address={address} />
                        <span className="flex min-w-0 flex-1 flex-col">
                            {ensName ? (
                                <span className="truncate text-sm font-medium text-gray-900">{ensName}</span>
                            ) : null}
                            <span className="truncate text-sm text-gray-500">{formatEthereumAddress(address, 4)}</span>
                        </span>
                    </span>
                    <ChevronUpDownIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                </span>
            </Menu.Button>
        </div>
    )
}
