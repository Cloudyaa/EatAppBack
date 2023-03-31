import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { OrderRecord, UserRecord } from '../records';
import { OrderDTO } from '../types';

export const userRouter = Router();

userRouter
  .get('/:userId/dashboard', authMiddleware('user'), async (req, res) => {
    const user = await UserRecord.findById(req.params.userId);
    /* prettier-ignore */
    if (!user) {
      res.status(404).json({
        status: res.statusCode,
        message: "User not found"
      });
    }
    res.status(200).json(user);
  })

  .get('/:userId/orders', authMiddleware('user'), async (req, res) => {
    const orders = await OrderRecord.getUserOrders(req.params.userId);
    if (orders === null) {
      res.status(404).json({
        status: res.statusCode,
        message: 'No orders found yet',
      });
    } else {
      res.status(200).json(orders);
    }
  })

  .post('/:userId/order/new', authMiddleware('user'), async (req, res) => {
    const userOrder: OrderDTO = req.body;

    const newOrder = new OrderRecord(userOrder);

    await newOrder.saveOrder();

    res.status(200).json({
      status: res.statusCode,
      message: 'Order created successfully',
    });
  })

  .get('/:userId/order/:orderId', authMiddleware('user'), async (req, res) => {
    const { userId, orderId } = req.params;

    const order = await OrderRecord.getOrder(orderId);

    if (!order) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'Order not found',
      });
    }

    // check if the order belongs to user
    const isUserOrder = order?.userId === userId;

    if (!isUserOrder) {
      return res.status(403).json({
        status: res.statusCode,
        message: `You are not authorized to see this page`,
      });
    }

    const products = await OrderRecord.getOrderedProducts(orderId);
    res.status(200).json({ order, products });
  });
