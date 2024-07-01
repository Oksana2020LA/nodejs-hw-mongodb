import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const isValidId =
  (idName ='id') =>
(req, res, next) => {
  const  id  = req.params[idName];
  if (!isValidObjectId(id)) {
    next(createHttpError(404, "Not found"));
  }

  next();
};

export default isValidId;