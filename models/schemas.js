import Joi from 'joi';

export const schemas = {
    collections: Joi.object().keys({
        name: Joi.string().required(),
        id: Joi.number()
    }),
    images: Joi.object().keys({
        name: Joi.string(),
        id: Joi.number(),
        path: Joi.required()
    })
}
