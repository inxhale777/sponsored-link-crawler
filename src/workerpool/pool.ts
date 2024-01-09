import workerpool from 'workerpool'

const pool = workerpool.pool(`${__dirname}/worker.js`, {
    maxWorkers: 3,
})

export default {
    run: async function (pages: number, keywords: string[]): Promise<string[]> {
        const tasks = [];

        // TODO: since we can't share memory or serialize crowler.run function
        //  we just hardcode our crowlers for each implementation
        //  in the future it must be done via generic interface
        //  like Crawler[].forEach(c => c.run(args))

        for (const k of keywords) {
            tasks.push(pool.exec('google', [pages, k]))
            tasks.push(pool.exec('bing', [pages, k]))
            tasks.push(pool.exec('yahoo', [pages, k]))
        }

        return Promise.all(tasks)
    }
}