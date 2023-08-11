import { Router } from 'express';
import { verifyContentInRequestMiddleware } from '../../controllers/middleware/translateRequestValidation.controller';
import { translateContentHandler } from '../../controllers/translate.controller';
import { chatRequestValidationMiddleware } from '../../controllers/middleware/chatRequestValidation.controller';

const translateRouter = Router();

translateRouter.post(
    '/',
    chatRequestValidationMiddleware(),
    translateContentHandler
);

export default translateRouter;
