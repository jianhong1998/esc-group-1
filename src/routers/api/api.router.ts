import { Router } from 'express';
import newsRouter from './news.router';

const apiRouter = Router();

apiRouter.use('/news', newsRouter);

export default apiRouter;
