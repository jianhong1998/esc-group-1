import { Router } from 'express';
import { getAllNewsURLs } from '../../controllers/news.controller';

const newsRouter = Router();

newsRouter.get('/urls', getAllNewsURLs);

export default newsRouter;
