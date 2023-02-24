import { chain, isNil, isEmpty } from 'lodash'
import { createInstance } from 'localforage'
import { isSameAddress } from '../helpers/isSameAddress'
import { isValidAddress } from '../helpers/isValidAddress'

const store = createInstance({
    name: 'CreatorSuite',
})

function getNextCreationId() {
    return store.length
}

function validateCreation(creation) {
    if (!creation.name) throw new Error('No name.')
    if (!creation.ownerAddress) throw new Error('No owner address.')
    if (!isValidAddress(creation.ownerAddress)) throw new Error('No a valid owner address.')
    if (!creation.paymentTokenAddress) throw new Error('No payment token address.')
    if (!isValidAddress(creation.paymentTokenAddress)) throw new Error('No a valid payment token address.')
    if (!creation.paymentTokenAmount) throw new Error('No payment token amount.')
    if (!creation.attachments.length) throw new Error('No attachments.')
    const attachment = creation.attachments[0]
    if (!attachment.title) throw new Error('No attachment title.')
    if (!attachment.content) throw new Error('No attachment content.')
    if (!creation.createdAt) throw new Error('No created at.')
    if (!creation.updatedAt) throw new Error('No updated at.')
}

/**
 * Create a creation from scratch
 * @param {string} name
 * @param {string} description
 * @param {string} ownerAddress
 * @param {string} paymentTokenAddress
 * @param {string} paymentTokenAmount
 * @param {string[]} attachments
 * @returns
 */
export async function createCreation(initials) {
    const now = Date.now()
    const creation = {
        ...initials,
        createdAt: now,
        updatedAt: now,
    }
    validateCreation(creation)

    const id = await getNextCreationId()

    await store.setItem(id, creation)
    return store.getItem(id)
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
