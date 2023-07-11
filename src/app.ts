import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import indexRouter from './routers/index.router';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('react'));

app.use('/', indexRouter);

app.listen(port, () => {
    console.log('App is running on port', port);
});
