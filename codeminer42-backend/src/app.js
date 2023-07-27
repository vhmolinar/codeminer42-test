/* istanbul ignore file */
import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { attachRouters } from '@/routes';
import { logger as appLogger } from '@/utils';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

attachRouters(app);

app.use((error, req, res, next) => {
  appLogger.error(error.stack);
  res.status(error.status).json({ message: error.message });
});

export default app;
