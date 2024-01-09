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
    return qs.parse(query, {
        comma: true
    })
})

app.use('/api/v1/sponsored-links', sponsoredLinksHandler)

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