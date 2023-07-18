import { Router } from 'express';
import { verifyContentInRequestMiddleware } from '../../controllers/middleware/translateRequestValidation.controller';
import { translateContentHandler } from '../../controllers/translate.controller';

const translateRouter = Router();

translateRouter.post(
    '/',
    verifyContentInRequestMiddleware(),
    translateContentHandler
);

export default translateRouter;
