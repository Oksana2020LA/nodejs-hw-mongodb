import { Router } from "express";
import {
    createContactController,
    deleteContactController,
    getContactsController,
    getContactByIdController,
    patchContactController
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema } from "../validation/createContactSchema.js";
import isValidId from "../middlewares/isValidId.js";
import {updateContactSchema} from '../validation/updateContactSchema.js';

const router = Router();

router.use('/contacts/:contactId', isValidId('contactId'));

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', validateBody(updateContactSchema), (req, res, next) => {
    console.log("PATCH request received");
    next();
}, ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
export default router;