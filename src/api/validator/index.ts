import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { MalformedPayload } from '../../core/error';

export enum ValidationSource {
  QUERY = 'query',
}

export default (
  schema: Joi.AnySchema,
  source: ValidationSource,
) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source]);

      if (!error) return next();

      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ''))
        .join(',');

      next(new MalformedPayload(message));
    } catch (error) {
      next(error);
    }
  };