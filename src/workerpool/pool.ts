import workerpool from 'workerpool'

const pool = workerpool.pool(`${__dirname}/worker.js`, {
    maxWorkers: 3,
})

export default {
    run: async function (pages: number, keywords: string[]): Promise<string[]> {
        const tasks = [];

        for (const k of keywords) {
            tasks.push(pool.exec('google', [pages, k]))
            tasks.push(pool.exec('bing', [pages, k]))
            tasks.push(pool.exec('yahoo', [pages, k]))
        }

        return Promise.all(tasks)
    }
}