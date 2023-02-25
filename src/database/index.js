import { chain, isNil, isEmpty } from 'lodash'
import { createInstance } from 'localforage'
import { isSameAddress } from '../helpers/isSameAddress'
import { isValidAddress } from '../helpers/isValidAddress'
import { delay } from '../helpers/delay'

const creationStore = createInstance({
    name: 'CreatorSuite',
})

const counterStore = createInstance({
    name: 'Counter',
})

async function getNextCreationId() {
    const counter = await counterStore.getItem('counter')

    console.log('DEBUG: counter')
    console.log({
        counter,
    })

    if (counter === null) {
        await counterStore.setItem('counter', 0)
    } else {
        await counterStore.setItem('counter', counter + 1)
    }
    return counterStore.getItem('counter')
}

function isRemoved(creation) {
    return creation && creation.createdAt === 0
}

function validateCreation(creation) {
    // name
    if (!creation.name) throw new Error('No name.')
    if (typeof creation.name !== 'string') throw new Error('Invalid name.')

    // description
    if (typeof creation.description !== 'string') throw new Error('Invalid description.')

    // owner
    if (!creation.ownerAddress) throw new Error('No owner address.')
    if (!isValidAddress(creation.ownerAddress)) throw new Error('No a valid owner address.')

    // payment token
    if (!creation.paymentTokenAddress) throw new Error('No payment token address.')
    if (!isValidAddress(creation.paymentTokenAddress)) throw new Error('No a valid payment token address.')
    if (!creation.paymentTokenAmount) throw new Error('No payment token amount.')

    // buyers
    if (!Array.isArray(creation.buyerAddresses)) throw new Error('No buyer addresses.')
    if (creation.buyerAddresses.some((x) => !isValidAddress(x))) throw new Error('Invalid buyer address.')

    // attachments
    if (!creation.attachments.length) throw new Error('No attachments.')
    const attachment = creation.attachments[0]
    if (!attachment.name) throw new Error('No attachment name.')
    if (!attachment.content) throw new Error('No attachment content.')

    // dates
    if (!creation.createdAt) throw new Error('No created at.')
    if (!creation.updatedAt) throw new Error('No updated at.')

    return creation
}

/**
 * Create a creation from scratch
 * @param {string} name
 * @param {string} description
 * @param {string} ownerAddress
 * @param {string} paymentTokenAddress
 * @param {string} paymentTokenAmount
 * @param {string[]} attachments
 * @param {string[]} buyerAddresses
 * @returns
 */
export async function createCreation(initials) {
    await delay(1500)

    const id = await getNextCreationId()
    const now = Date.now()
    const creation = {
        ...initials,
        attachments: initials.attachments ?? [],
        buyerAddresses: initials.buyerAddresses ?? [],
        createdAt: now,
        updatedAt: now,
    }

    await creationStore.setItem(id, validateCreation(creation))
    return creationStore.getItem(id)
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

    const mergedCreation = {
        ...creation,
        ...chain(updates)
            .omitBy(isNil)
            .omitBy(isNaN)
            .omitBy(isEmpty)
            .omitBy((x) => x === ''),
        attachments: creation.attachments,
        buyerAddresses: chain([...creation.buyerAddresses, ...updates.buyerAddresses])
            .filter((x) => isValidAddress(x))
            .unionBy((y) => y.toLowerCase()),
        updatedAt: Date.now(),
    }

    await creationStore.setItem(id, validateCreation(mergedCreation))
    return getCreation(id)
}

/**
 * Delete a creation
 * @param {string} id
 */
export async function removeCreation(id) {
    const creation = await getCreation(id)
    if (!creation) throw new Error(`Cannnot find ${id}.`)

    await creationStore.setItem(id, {
        ...creation,
        // tag a removed creation
        createdAt: 0,
    })
}

/**
 * Fetch a creation
 * @param {string} id
 * @returns
 */
export async function getCreation(id) {
    await delay(1500)
    const creation = await creationStore.getItem(id)
    if (isRemoved(creation)) return
    return creation
}

/**
 * Get all creations
 * @returns
 */
export async function getAllCreations() {
    const creations = []

    await delay(1500)
    await creationStore.iterate((value, key, iterationNumber) => {
        creations.push({
            id: key,
            ...value,
        })
    })

    return creations.sort((a, z) => z.updatedAt - a.updatedAt).filter((x) => !isRemoved(x))
}

/**
 * Fetch all creations owned by the owner
 * @param {string} owner
 * @returns
 */
export async function getAllOwnedCreations(owner) {
    const creations = []
    if (!isValidAddress(owner)) return creations

    await delay(1500)
    await creationStore.iterate((value, key, iterationNumber) => {
        console.log({
            key,
            value,
        })
        if (isSameAddress(value.ownerAddress, owner)) {
            creations.push({
                id: key,
                ...value,
            })
        }
    })

    return creations.sort((a, z) => z.updatedAt - a.updatedAt).filter((x) => !isRemoved(x))
}

/**
 * Fetch all creations purchased by the owner
 * @param {string} owner
 * @returns
 */
export async function getAllPurchasedCreations(owner) {
    const creations = []
    if (!isValidAddress(owner)) return creations

    await delay(1500)
    await creationStore.iterate((value, key, iterationNumber) => {
        const { buyerAddresses = [] } = value
        if (buyerAddresses.some((x) => isSameAddress(x, owner))) {
            creations.push({
                id: key,
                ...value,
            })
        }
    })

    return creations.sort((a, z) => z.updatedAt - a.updatedAt).filter((x) => !isRemoved(x))
}
