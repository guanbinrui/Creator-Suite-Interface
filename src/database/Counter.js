import { createInstance } from 'localforage'

const counterStore = createInstance({
    name: 'Counter',
    version: 2,
})

export async function getNextCount() {
    const counter = await counterStore.getItem('counter')

    if (counter === null) {
        await counterStore.setItem('counter', 0)
    } else {
        await counterStore.setItem('counter', counter + 1)
    }
    return counterStore.getItem('counter')
}
