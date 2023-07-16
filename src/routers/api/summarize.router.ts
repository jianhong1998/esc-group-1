import { Router } from 'express';
import {
    summarizeController,
    summarizeMultipleNewsController,
} from '../../controllers/summarize.controller';
import { chatRequestValidationMiddleware } from '../../controllers/middleware/chatRequestValidation.controller';
import { summarizeRequestValidationMiddleware } from '../../controllers/middleware/summarizeRequestValidation.controller';

const summarizeRouter = Router();

summarizeRouter.post(
    '/',
    chatRequestValidationMiddleware(),
    summarizeController
);

summarizeRouter.post(
    '/news',
    summarizeRequestValidationMiddleware(),
    summarizeMultipleNewsController
);

export default summarizeRouter;
