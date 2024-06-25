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
import { authenticate } from '../middlewares/authenticate.js';


const router = Router();

router.use('/:contactId', isValidId('contactId'));
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/:contactId', validateBody(updateContactSchema), (req, res, next) => {
    console.log("PATCH request received");
    next();
}, ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));
export default router;