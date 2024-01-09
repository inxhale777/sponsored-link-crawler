import express, { Request, Response, NextFunction } from 'express';
import qs from 'qs'

import Logger from './core/logger';
import sponsoredLinksHandler from './api/handlers/sponsoredLinks'
import { MalformedPayload } from "./core/error";

process.on('uncaughtException', (e) => {
    Logger.error(e)
    console.log(e)
});

const app = express()

app.set('query parser', (query: string) => {
    const data = qs.parse(query, {
        comma: true
    })

    // hack for single keyword in query
    if (typeof data.keywords === 'string') {
        data.keywords = [data.keywords]
    }

    return data
})

app.use('/api/v1/sponsored-links', sponsoredLinksHandler)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof MalformedPayload) {
        return res.status(400).json({
            error: 'malformed_payload',
            details: err.message
        })
    }

    return res.status(500).json({
        error: err.message,
    })
})

app.listen(3000, () => {
    Logger.info('server stared on port 3000')
})
.on('error', err => {
    Logger.error(err)
})