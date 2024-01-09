import workerpool from 'workerpool';

const pool = workerpool.pool(`${__dirname}/worker.js`, {
  maxWorkers: 3,
});

export default {
  run: async function(pages: number, keywords: string[]): Promise<string[]> {
    const tasks = [];

    // TODO: since we can't share memory or serialize crawler.run function
    //  we just hardcode our crawlers for each implementation
    //  in the future it must be done via generic interface
    //  like Crawler[].forEach(c => c.run(args))

    for (const c of ['google', 'bing', 'yahoo']) {
      for (const k of keywords) {
        tasks.push(pool.exec('crawl', [c, pages, k]));
      }
    }

    return Promise.all(tasks);
  },
};