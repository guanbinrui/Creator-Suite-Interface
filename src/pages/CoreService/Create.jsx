import { useState, useCallback, useRef } from 'react'
// import { DocumentPlusIcon } from '@heroicons/react/24/outline'
import { useAccount, useConnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { fetcher } from '../../helpers/fetcher'

export function Create() {
    const { isConnected } = useAccount()

    const { connectAsync } = useConnect({
        connector: new InjectedConnector(),
        onSuccess(result) {
            console.log(result)
        },
    })

    const setup = useCallback((signature, pubkey) => {
        console.log('setup', { signature, pubkey })
        fetcher('/api/core/setup', {
            method: 'POST',
            body: JSON.stringify({
                SUBKEY: {
                    PUBLIC: '',
                    SIGNATURE: signature,
                    AVATAR: pubkey,
                    PRIVATE: '',
                },
                HOST: {
                    DOMAIN: 'localhost',
                },
            }),
        })
    }, [])

    const { data: signedSubkey, signMessage, signMessageAsync } = useSignMessage()

    const signPubkey = useCallback(async () => {
        const result = await fetcher('/api/core/generate', {
            method: 'POST',
        })
        const signed = await signMessageAsync({
            message: `Subkey certification signature: ${result.SubkeyPublic}`,
        })
        setup(signed /** TODO wallet public key */)
    }, [signMessage])

    return (
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            {!signedSubkey ? (
                <div className="bg-white py-12 sm:py-12">
                    <div className="mx-auto max-w-2xl py-24 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <button
                            type="button"
                            className="order-0 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
                            onClick={async () => {
                                if (!isConnected) {
                                    await connectAsync()
                                    await signPubkey()
                                } else {
                                    await signPubkey()
                                }
                            }}
                        >
                            {isConnected ? 'Generate' : 'Connect and Generate'}
                        </button>
                    </div>
                </div>
            ) : null}
            <form className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                        <div>
                            <h3 className="text-2xl font-medium leading-6 text-gray-900">List for sale</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Your work will be stored in an encrypted form on the server and can only be viewed by
                                anyone who makes a payment through a smart contract.
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <div className="mt-1 flex rounded-md max-w-lg">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        placeholder="Item name"
                                        className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    The description will be included on the creation's detail page.{' '}
                                    <a
                                        className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                                        href="https://www.markdownguide.org/"
                                        target="_blank"
                                    >
                                        Markdown
                                    </a>{' '}
                                    syntax is supported.
                                </p>
                            </div>

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                    Set price
                                </label>
                                <div className="mt-1 sm:col-span-2">
                                    <div className="flex max-w-lg rounded-md">
                                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                            DAI
                                        </span>
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            autoComplete="price"
                                            placeholder="Amount"
                                            className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Complete Listing
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
