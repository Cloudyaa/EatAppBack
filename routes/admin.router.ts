import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { OrderRecord, UserRecord } from '../records';

export const adminRouter = Router();

adminRouter
  .use(authMiddleware('admin'))

  .get('/', async (req, res) => {
    res.json({
      status: res.statusCode,
      message: 'success',
    });
  })

  .get('/manage/users', async (req, res) => {
    const users = await UserRecord.getAll();
    res.status(200).json(users);
  })

  .get('/manage/orders', async (req, res) => {
    const users = await OrderRecord.getAllOrders();
    res.status(200).json(users);
  });
