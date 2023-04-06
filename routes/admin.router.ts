import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { OrderRecord, ProductRecord, UserRecord } from "../records";

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

  .get('/manage/orders', async (req, res) => {
    const orders = await OrderRecord.getAllOrders();
    res.status(200).json(orders);
  })

  .get('/manage/products', async (req, res) => {
    const products = await ProductRecord.find('');
    res.status(200).json(products);
  })

;
