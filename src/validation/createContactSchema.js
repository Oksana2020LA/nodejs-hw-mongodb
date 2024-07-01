import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 symbols',
    'string.max': 'Name must be less than 20 symbols',
    'any.required': 'Name is required',
  }),
    phoneNumber: Joi.string().required().min(3).max(20),
  email: Joi.string().email(),
  contactType: Joi.string().valid("work", "home", "personal"),
  isFavourite: Joi.boolean(),
  userId: Joi.string().required(),
});