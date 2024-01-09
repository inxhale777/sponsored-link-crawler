import Joi from 'joi'

export default Joi.object().keys({
    keywords: Joi.array().required().min(1).items(Joi.string()),
    pages: Joi.number().required().min(1).max(10)
})