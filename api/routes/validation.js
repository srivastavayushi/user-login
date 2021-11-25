// validation
const Joi = require('@hapi/joi');

// Register validation

const registerValidation = data =>{
    const schema = Joi.object({
        phone: Joi.number().min(10).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
