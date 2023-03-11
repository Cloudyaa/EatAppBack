import express, { json } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';
import 'express-rate-limit';
import { handleError } from './utlis/errors';
import { config } from './config/config';
import { productsRouter } from './routes/products.router';
import { usersRouter } from './routes/users.router';

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

//routes
app.use('api/products', productsRouter);
app.use('api/user', usersRouter);
//end of routes
app.use(handleError);

app.listen(3001, 'localhost', () => {
  console.log('listening on http://localhost:3001');
});
