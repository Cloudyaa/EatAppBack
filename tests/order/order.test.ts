import { pool } from '../../utlis';
import { testOrder } from './testingRecord';
import { OrderRecord } from '../../records';

afterAll(async () => {
  await pool.execute("DELETE FROM `orders` WHERE `userId` = 'test_user'");
  await pool.end();
});

// -- testing getOne() method
test('OrderRecord returns data from database for one entry', async () => {
  const order = await OrderRecord.getOne('first_order');
  expect(order).toBeDefined();
  expect(order?.userId).toBe('dd11334e-d915-48a1-87ff-378379a6e586');
  expect(order?.totalValue).toBe(420);
});

test('OrderRecord returns null from database for not existing entry', async () => {
  const order = await OrderRecord.getOne('loremIpsum');
  expect(order).toBeNull();
});
// --end of testing getOne() method

// -- testing insert() method
test('UserRecord.insert inserts data to database', async () => {
  const order = new OrderRecord({
    ...testOrder,
  });

  await order.insert();

  const newOrder = await OrderRecord.getOne(order.orderId);
  expect(newOrder).toBeDefined();
  expect(newOrder).not.toBeNull();
  expect(newOrder?.userId).toBe(order.userId);
});
// -- end of testing insert() method

// -- testing getUserOrders() method
test('OrderRecord returns user orders', async () => {
  const orders = await OrderRecord.getUserOrders('dd11334e-d915-48a1-87ff-378379a6e586');
  expect(orders).toBeDefined();
  expect(orders).not.toBeNull();
});

test('OrderRecord returns null when user has no orders yet', async () => {
  const order = await OrderRecord.getUserOrders('86ba84a3-d5ad-409f-9083-40caff1e4af5');
  expect(order).toBeNull();
});
// --end of testing getUserOrders() method

// -- testing getAll() method
test('OrderRecord returns all orders', async () => {
  const orders = await OrderRecord.getAll();
  expect(orders).toBeDefined();
  expect(orders).not.toBeNull();
});
// --end of testing getAll) method
