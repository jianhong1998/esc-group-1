import { Router } from 'express';
import {
    summarizeController,
    summarizeMultipleNewsController,
} from '../../controllers/summarize.controller';
import { chatRequestValidationMiddleware } from '../../controllers/middleware/chatRequestValidation.controller';
import { summarizeRequestValidationMiddleware } from '../../controllers/middleware/summarizeRequestValidation.controller';
import { urlValidator } from '../../controllers/middleware/urlValidator.controller';

const summarizeRouter = Router();

summarizeRouter.post(
    '/',
    chatRequestValidationMiddleware(),
    summarizeController
);

summarizeRouter.use('/news', urlValidator());
summarizeRouter.get('/news', summarizeMultipleNewsController);

export default summarizeRouter;
