import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { UserRecord } from '../../records';
import { manageProducts } from './manageProducts.router';
import { manageOrders } from './manageOrders.router';

export const adminRouter = Router();

adminRouter
  .use(authMiddleware('admin'))

  .get('/:adminId/dashboard', async (req, res) => {
    const admin = await UserRecord.findById(req.params.adminId);
    if (!admin) {
      res.status(404).json({
        status: res.statusCode,
        message: 'Admin not found',
      });
    }
    res.status(200).json({
      status: res.statusCode,
      adminId: admin?.userId,
    });
  })

  .get('/manage/users', async (req, res) => {
    const users = await UserRecord.getAll();
    res.status(200).json(users);
  })

  .use('/manage/orders', manageOrders)
  .use('/manage/products', manageProducts);
