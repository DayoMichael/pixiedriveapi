///import Joi from 'joi';
import {schemas} from '../models/schemas.js/'
export const middleware = ( schema) => {
    return (req,res, next) => {
        const { error } = schemas[schema].validate(req.body);
        const valid = error == null;
        if (valid) {
            next();
        }else {
            const {details} = error;
            const message = details.map(i => i.message).join(',')
            console.log("error", message);
            res.status(422).json({error: message})
        }
    }
}