import express, { NextFunction, Request, Response } from 'express'
import { ParsedQs } from "qs";

import validator, { ValidationSource } from '../../validator';
import schema from './schema'
import pool from "../../../workerpool/pool";

const router = express.Router();

interface QueryRequest extends ParsedQs {
    keywords: string[];
    pages: string;
}

export default router.get('/', validator(schema, ValidationSource.QUERY),
    async (req: Request<any, any, any, QueryRequest>, res: Response, next: NextFunction) => {
        const keywords = req.query.keywords
        const pages = Number(req.query.pages)

        try {
            const result = await pool.run(pages, keywords)
            return res.json({ result })
        } catch (e) {
            next(e)
        }
})