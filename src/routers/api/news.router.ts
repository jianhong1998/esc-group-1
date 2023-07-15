import { Router } from 'express';
import {
    getAllNewsURLsHandler,
    getMultipleNewsContentHandler,
    getNewsContentHandler,
} from '../../controllers/news.controller';
import { urlValidator } from '../../controllers/middleware/urlValidator.controller';

const newsRouter = Router();

newsRouter.use(urlValidator());

newsRouter.get('/urls', getAllNewsURLsHandler);
newsRouter.get('/content', getNewsContentHandler);
newsRouter.get('/', getMultipleNewsContentHandler);

export default newsRouter;
