import createHttpError from 'http-errors';
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

    const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await getContactById(contactId, userId);
  	// Додаємо базову обробку помилки
  if (!contact) {
    // 2. Створюємо та налаштовуємо помилку
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const photo = req.file;

  let url;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      url = await saveFileToCloudinary(photo);
    } else {
      url = await saveFileToUploadDir(photo);
    }
  };

  const contact = await createContact({ ...req.body, photo: url }, req.user._id);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  })
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {

    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.sendStatus(204);
};


export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const photo = req.file;

    let url;

if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      url = await saveFileToCloudinary(photo);
    } else {
      url = await saveFileToUploadDir(photo);
    }
  };

const result = await updateContact(contactId, {
    ...req.body,
    photo: url,
  }, userId);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  };

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};