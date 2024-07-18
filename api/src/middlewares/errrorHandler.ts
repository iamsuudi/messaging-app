import { NextFunction, Request, Response } from "express";

export default async function errrorHandler(error: Error, _req: Request, res: Response, next: NextFunction) {
    console.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message });
    }

    next(error);
}