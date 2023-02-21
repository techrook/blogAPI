const Joi = require('joi');

const addBlogValidator = Joi.object({
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
})

const updateBlogValidator = Joi.object({
    title: Joi.string()
        .min(5)
        .max(255),
    description: Joi.string()
        .min(5)
        .max(255),
    body: Joi.string()
        .min(20)
        .max(300),
    tags: Joi.string()
})

const addBlogValidatorMiddleware = async (req, res , next) => {
    const blogPayload = req.body
    try {
        await addBlogValidator.validateAsync(blogPayload);
        next();
    } catch (error) {
        console.log(error);
        return res.status(406).send(error.details[0].message);
    }
}

const updateBlogValidatorMiddleware = async (req, res , next) => {
    const blogPayload = req.body
    try {
        await updateBlogValidator.validateAsync(blogPayload);
        next();
    } catch (error) {
        console.log(error);
        return res.status(406).send(error.details[0].message);
    }
}

module.exports = {
    addBlogValidatorMiddleware,
    updateBlogValidatorMiddleware
}