import { Router } from 'express';
import { OrderRecord } from '../../records';

export const manageOrders = Router();

manageOrders
  .get('/', async (req, res) => {
    const orders = await OrderRecord.getAllOrders();
    res.status(200).json(orders);
  })

  .patch('/:orderId', async (req, res) => {
    const order = await OrderRecord.getOrder(req.params.orderId);
    if (!order) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'Order not found',
      });
    }

    await new OrderRecord({ ...order, status: req.body.status }).update();

    res.status(200).json({
      status: res.statusCode,
      message: 'Order updated successfully',
    });
  });
