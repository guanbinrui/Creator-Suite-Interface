import { createInstance } from 'localforage'
import { isSameAddress } from '../helpers/isSameAddress'
import { chain, isNil, isNull, isUndefined, omitBy, wrap } from 'lodash'

const store = createInstance({
    name: 'CreatorSuite',
})

export function validateCreation(creation) {
    if (!name) throw new Error('No name.')
    if (!ownerAddress) throw new Error('No owner address.')
    if (!paymentTokenAddress) throw new Error('No payment token address.')
    if (!paymentTokenAmount) throw new Error('No payment token amount.')
    if (!attachments.length) throw new Error('No attachments.')
}

/**
 * Add creation
 * @param {string} id
 * @param {object} creation
 */
export function addCreation(id, creation) {
    validateCreation(creation)
    store.setItem(id, creation)
}

/**
 * Create a creation from scratch
 * @param {string} name
 * @param {string} description
 * @param {string} ownerAddress
 * @param {string} paymentTokenAddress
 * @param {string} paymentTokenAmount
 * @param {Blob[]} attachments
 * @returns
 */
export function createCreation(name, description, ownerAddress, paymentTokenAddress, paymentTokenAmount, attachments) {
    const now = Date.now()
    const creation = {
        name,
        description,
        attachments,
        ownerAddress,
        buyerAddresses: [],
        paymentTokenAddress,
        paymentTokenAmount,
        createdAt: now,
        updatedAt: now,
    }

    validateCreation(creation)
    return creation
}

/**
 * Update a preexist creation
 * @param {string} id
 * @param {object} updates
 * @returns
 */
export async function updateCreation(id, updates) {
    const creation = await getCreation(id)
    if (!creation) throw new Error(`Cannnot find ${id}.`)

    await store.setItem(id, {
        ...creation,
        ...chain(updates)
            .omitBy(isNil)
            .omitBy(isNaN)
            .omitBy(isEmpty)
            .omitBy((x) => (typeof x === 'string') & (x === '')),
        updatedAt: Date.now(),
    })

    return getCreation(id)
}

/**
 * Delete a creation
 * @param {string} id
 */
export async function removeCreation(id) {
    const creation = await getCreation(id)
    if (!creation) throw new Error(`Cannnot find ${id}.`)

    await store.removeItem(id)
}

/**
 * Fetch a creation
 * @param {string} id
 * @returns
 */
export function getCreation(id) {
    return store.getItem(id)
}

/**
 * Get all creations
 * @returns
 */
export async function getAllCreations() {
    const creations = []

    await store.iterate((value, key, iterationNumber) => {
        value.push(value)
    })
    return creations
}

/**
 * Fetch all creations owned by the owner
 * @param {string} owner
 * @returns
 */
export async function getAllOwnedCreations(owner) {
    const creations = []

    await store.iterate((value, key, iterationNumber) => {
        if (isSameAddress(value.owner, key)) {
            creations.push(value)
        }
    })
    return creations
}

/**
 * Fetch all creations purchased by the owner
 * @param {string} owner
 * @returns
 */
export async function getAllPurchasedCreations(owner) {
    const creations = []

    await store.iterate((value, key, iterationNumber) => {
        if (value.buyerAddresses.some((x) => isSameAddress(x, key))) {
            creations.push(value)
        }
    })
    return creations
}
