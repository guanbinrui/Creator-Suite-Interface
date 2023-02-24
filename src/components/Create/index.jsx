import { useState } from 'react'
import { DocumentPlusIcon } from '@heroicons/react/24/outline'
import { CreatedNotification } from '../CreatedNotification'

export function Create() {
    const [showCreatedNotification, setShowCreatedNotification] = useState(false)

    return (
        <>
            <CreatedNotification show={showCreatedNotification} setShow={setShowCreatedNotification} />
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <form className="space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                            <div>
                                <h3 className="text-2xl font-medium leading-6 text-gray-900">List for sale</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Your work will be stored in an encrypted form on the server and can only be viewed
                                    by anyone who makes a payment through a smart contract.
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

                                <div className="sm:col-span-6">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                                        Upload your work
                                    </label>
                                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                        <div className="space-y-1 text-center">
                                            <DocumentPlusIcon
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                            />
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PDF, Markdown, PNG, JPG, GIF up to 10MB
                                            </p>
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
        </>
    )
}
