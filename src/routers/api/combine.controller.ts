import { Router } from 'express';
import { combineOperationHandler } from '../../controllers/combine.controller';

const combineRouter = Router();

combineRouter.get('/', combineOperationHandler);

export default combineRouter;
