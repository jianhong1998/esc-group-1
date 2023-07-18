import { Router } from 'express';
import newsRouter from './news.router';
import summarizeRouter from './summarize.router';
import translateRouter from './translate.router';
import combineRouter from './combine.controller';

const apiRouter = Router();

apiRouter.use('/news', newsRouter);
apiRouter.use('/summarize', summarizeRouter);
apiRouter.use('/translate', translateRouter);
apiRouter.use('/combine', combineRouter);

export default apiRouter;
