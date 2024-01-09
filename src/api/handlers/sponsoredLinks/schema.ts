import Joi from 'joi';
import { maxPageCount } from '../../../config';

export default Joi.object().keys({
  keywords: Joi.array().required().min(1).items(Joi.string()),
  pages: Joi.number().required().min(1).max(maxPageCount),
});