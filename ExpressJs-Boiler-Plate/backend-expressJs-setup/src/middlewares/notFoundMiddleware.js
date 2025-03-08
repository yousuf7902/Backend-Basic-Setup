import { errorHandler } from "./errorMiddleware"

export const notFound = (req, res, next) => {
    const error = new errorHandler(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}