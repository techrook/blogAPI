const Joi = require('joi');

const blogValidatorMiddleware = async (req, res , next) => {
    const blogPayload = req.body
    try {
        await blogValidator.validateAsync(blogPayload);
        next();
    } catch (error) {
        console.log(error);
        return res.status(406).send(error.details[0].message);
    }
}

const blogValidator = Joi.object({
    blogInfo : {
    title: Joi.string()
        .min(5)
        .max(255)
        .required(),
    description: Joi.string()
        .min(5)
        .max(255)
        .required(),
    body: Joi.string()
        .min(20)
        .max(300)
        .required(),
    tags: Joi.string()
    }
})

module.exports = blogValidatorMiddleware