import Joi from 'joi';

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages(),
    phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  contactType: Joi.string().valid("work", "home", "personal"),
  isFavourite: Joi.boolean(),
});