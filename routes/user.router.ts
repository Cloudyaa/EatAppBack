import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { OrderRecord, ProductRecord, UserRecord } from '../records';
import { OrderDTO } from '../types';
import { config } from '../config/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(config.stripeSecret);

type OrderedItemStripeType = {
  price: string;
  quantity: number;
};

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

  .get('/:userId/order/payment/:orderId', authMiddleware('user'), async (req, res) => {
    const { userId, orderId } = req.params;

    const userOrders = await OrderRecord.getUserOrders(userId);
    const order = await OrderRecord.getOrder(orderId);
    const orderedProducts = await OrderRecord.getOrderedProducts(orderId);

    const shouldAddDiscount = userOrders?.length === 1;
    const shouldAddDeliveryFee = order!.totalValue <= 50;

    const getOrderedItems = async (): Promise<OrderedItemStripeType[]> => {
      const items: OrderedItemStripeType[] = [];

      if (!orderedProducts) {
        return [];
      }

      await Promise.all(
        orderedProducts.map(async (item) => {
          const priceId = await ProductRecord.getPriceId(item.productId);
          console.log('product priceId: ', priceId);
          const orderedItem: OrderedItemStripeType = {
            price: String(priceId),
            quantity: Number(item.orderedQty),
          };
          items.push(orderedItem);
        }),
      );

      if (shouldAddDeliveryFee) {
        items.push({
          price: 'price_1OYxG6FXYDkmMsSlUMfG0XRD',
          quantity: 1,
        });
      }

      return items;
    };

    const session = await stripe.checkout.sessions.create({
      success_url: `http://localhost:3000/basket/order/success/${order?.orderNo}`,
      cancel_url: 'http://localhost:3000/basket/order/checkout',
      payment_method_types: ['card', 'p24', 'blik'],
      line_items: await getOrderedItems(),
      discounts: shouldAddDiscount
        ? [
            {
              coupon: 'FIRST_ORDER',
            },
          ]
        : [],
      mode: 'payment',
    });

    res.status(200).json({
      status: res.statusCode,
      message: 'Can redirect to payment',
      orderNumber: order?.orderNo,
      session,
    });
  })

  .post('/:userId/order/new', authMiddleware('user'), async (req, res) => {
    const userOrder: OrderDTO = req.body;

    const newOrder = new OrderRecord(userOrder);

    await newOrder.saveOrder();

    const id = newOrder.orderId;

    const orderNumber = await OrderRecord.getOrderNumber(id);

    res.status(200).json({
      status: res.statusCode,
      message: 'Order created successfully',
      orderNumber,
      orderId: id,
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
