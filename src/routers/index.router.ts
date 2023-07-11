import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import apiRouter from './api/api.router';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'dev';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexRouter = Router();

indexRouter.use('/api', apiRouter);

if (NODE_ENV === 'production') {
    indexRouter.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/react/index.html'));
    });
}

export default indexRouter;
