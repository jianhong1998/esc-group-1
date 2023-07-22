import { RequestHandler } from 'express';
import API_Response from '../../models/apiResponse';

const verifyContentInRequestMiddleware =
    (): RequestHandler<any, API_Response<never>, { content: string }> =>
    (req, res, next) => {
        if (!('content' in req.body)) {
            return res.status(400).send({
                errorMessage: '"content" is not in request body',
                success: false,
            });
        }

        if (typeof req.body.content !== 'string') {
            return res.status(400).send({
                errorMessage: '"content" in request body is not string',
                success: false,
            });
        }

        next();
    };

export { verifyContentInRequestMiddleware };
