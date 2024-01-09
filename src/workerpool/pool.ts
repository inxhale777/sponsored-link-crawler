import workerpool from 'workerpool'

const pool = workerpool.pool(`${__dirname}/worker.js`, {
    maxWorkers: 3,
})

export default {
    run: async function (pages: number, keywords: string[]): Promise<string[]> {
        return Promise.all([
            // TODO: unable to serialize crawler.run function or share memory with worker,
            //  so just hardcode our crawlers here
            //  In the future it must be done via passing Crawler interface down to worker

            pool.exec('google', [pages, keywords],),
            pool.exec('bing', [pages, keywords]),
            pool.exec('yahoo', [pages, keywords]),
        ])
    }
}