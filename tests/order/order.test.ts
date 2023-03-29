import { pool } from '../../utlis';
import { testOrder } from './testingRecord';
import { OrderRecord } from '../../records';

afterAll(async () => {
  await pool.execute("DELETE FROM `order_details` WHERE `productId` = 'test_product1'");
  await pool.execute("DELETE FROM `orders` WHERE `userId` = 'test_user'");
  await pool.end();
});

// -- testing getOrder() method
test('OrderRecord.getOrder() returns order data from database', async () => {
  const order = await OrderRecord.getOrder('first_order');
  expect(order).toBeDefined();
  expect(order?.totalValue).toBe(420);
  expect(order?.totalQty).toBe(99);
});

test('OrderRecord.getOrder() returns null from database for not existing order', async () => {
  const order = await OrderRecord.getOrder('loremIpsum');
  expect(order).toBeNull();
});
// --end of testing getOrder() method

// -- testing getOrderedProducts() method
test('OrderRecord.getOrderedProducts() returns ordered products from database for existing order', async () => {
  const order = await OrderRecord.getOrderedProducts('first_order');
  expect(order).toBeDefined();
  expect(order?.length).toBe(2);
});

test('OrderRecord.getOrderedProducts()  returns null from database for not existing order', async () => {
  const order = await OrderRecord.getOrderedProducts('loremIpsum');
  expect(order).toBeNull();
});
// --end of testing getOrderedProducts() method

// -- testing getUserOrders() method
test('OrderRecord.getUserOrders() returns order data from database', async () => {
  const order = await OrderRecord.getUserOrders('25cc95b3-c83f-4262-af4a-52b9e0a761f6');
  expect(order).toBeDefined();
  expect(order?.length).toBe(2);
  expect(order && order[1].orderId).toBe('second_order');
});

test('OrderRecord.getUserOrders() returns null from database for not existing user', async () => {
  const order = await OrderRecord.getUserOrders('loremIpsum');
  expect(order).toBeNull();
});
// --end of testing getUserOrders() method

// -- testing getAllOrders() method
test('OrderRecord returns all orders', async () => {
  const orders = await OrderRecord.getAllOrders();
  expect(orders).toBeDefined();
  expect(orders).not.toBeNull();
});
// --end of testing getAllOrders() method

// -- testing saveOrder() method
test('UserRecord.saveOrder inserts data to database', async () => {
  const order = new OrderRecord({
    ...testOrder,
  });

  await order.saveOrder();

  const newOrder = await OrderRecord.getOrder(order.orderId);
  expect(newOrder).toBeDefined();
  expect(newOrder).not.toBeNull();
  expect(newOrder?.orderId).toBe(order.orderId);
});
// -- end of testing saveOrder() method
