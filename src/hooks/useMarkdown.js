import useSWR from 'swr'
import { dataURLtoBlob } from '../helpers/dataURLtoBlob'

export function useMarkdown(content) {
    return useSWR(
        `useMarkdown_${content.length}`,
        async () => {
            if (!content.startsWith('data:')) return content

            return new Promise((resolve, reject) => {
                try {
                    const blob = dataURLtoBlob(content)
                    const reader = new FileReader()

                    reader.onloadend = () => {
                        resolve(reader.result)
                    }
                    reader.onerror = () => {
                        reject(reader.error)
                    }

                    reader.readAsText(blob)
                } catch (error) {
                    reject(error)
                }
            })
        },
        {
            suspense: true,
            revalidateOnFocus: false,
            revalidateOnMount: false,
        },
    )
}
