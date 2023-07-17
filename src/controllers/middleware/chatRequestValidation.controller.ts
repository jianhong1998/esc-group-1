import { RequestHandler } from 'express';

const chatRequestValidationMiddleware =
    (): RequestHandler => (req, res, next) => {
        if (!('message' in req.body)) {
            return res
                .status(200)
                .send({ message: 'message in request is undefined.' });
        }

        next();
    };

export { chatRequestValidationMiddleware };
