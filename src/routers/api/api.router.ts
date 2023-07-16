import { Router } from 'express';
import newsRouter from './news.router';
import summarizeRouter from './summarize.router';

const apiRouter = Router();

apiRouter.use('/news', newsRouter);
apiRouter.use('/summarize', summarizeRouter);

export default apiRouter;
