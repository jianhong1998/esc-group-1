import { Router } from 'express';
import {
    getAllNewsURLsHandler,
    getNewsContentHandler,
} from '../../controllers/news.controller';
import { urlValidator } from '../../controllers/middleware/urlValidator.controller';

const newsRouter = Router();

newsRouter.use(urlValidator());

newsRouter.get('/urls', getAllNewsURLsHandler);
newsRouter.get('/content', getNewsContentHandler);

export default newsRouter;
