import { createInstance } from 'localforage'

const counterStore = createInstance({
    name: 'Counter',
    version: 2,
})

export async function getCount() {
    const counter = await counterStore.getItem('counter')

    if (counter === null) {
        await counterStore.setItem('counter', 0)
    }
    return counterStore.getItem('counter')
}

export async function commitCount() {
    const count = await getCount()
    return counterStore.setItem('counter', count + 1)
}
