import express, { json, urlencoded, Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';
import 'express-rate-limit';
import { handleError } from './utlis';
import { config } from './config/config';
import { accountRouter, adminRouter, productsRouter, userRouter } from './routes';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
  }),
);
app.use(json());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per 'window' (here, per 5 minutes)
  }),
);

app.use(json({ limit: '10mb' }));
app.use(urlencoded({ limit: '10mb', extended: true }));

const router = Router();

//routes
router.use('/products', productsRouter);
router.use('/account', accountRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);
//end of routes

app.use('/api', router);

app.use(handleError);

app.listen(3001, 'localhost', () => {
  console.log('listening on http://localhost:3001');
});
