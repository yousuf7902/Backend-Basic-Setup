import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/ApiErrors.js';


export const errorConverter = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';
    err = new ApiError(statusCode, message);
  }
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};