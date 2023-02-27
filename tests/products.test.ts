import { ProductRecord } from '../records/product.record';
import { testProduct } from './testingRecord';
import { ProductEntity } from '../types';
import { pool } from '../utlis/db';

afterAll(async () => {
  await pool.execute("DELETE FROM `products` WHERE `name` = 'Test name'");
  await pool.end();
});

// -- testing insert(product_id) method
test('ProductRecord.insert inserts data to database', async () => {
  const product = new ProductRecord({
    ...testProduct,
  });

  await product.insert();

  const newProduct = await ProductRecord.getOne(product.product_id);
  expect(newProduct).toBeDefined();
  expect(newProduct).not.toBeNull();
  expect(newProduct?.product_id).toBe(product.product_id);
});
// -- end of testing insert(product_id) method

// -- testing getOne() method
test('ProductRecord returns data from database for one entry', async () => {
  const product = await ProductRecord.getOne('8aad8b13-ef02-4730-8456-3cd89c1f146d');
  expect(product).toBeDefined();
  expect(product?.product_id).toBe('8aad8b13-ef02-4730-8456-3cd89c1f146d');
  expect(product?.name).toBe('tomatoes');
  expect(product?.description).toBe(
    'Sweet and juicy vine-ripened Class I Rosa tomatoes. Wash before use. Source of Vitamin C. 1 of your 5 a day.Product life guaranteed for 3 days excluding delivery day, with an average of 4 days.',
  );
  expect(product?.lifeInDays).toStrictEqual(5);
  expect(product?.price).toStrictEqual(3.49);
  expect(product?.energy).toStrictEqual(14);
  expect(product?.fat).toStrictEqual(0.1);
  expect(product?.protein).toStrictEqual(0.5);
  expect(product?.fibre).toStrictEqual(1.0);
  expect(product?.sugars).toStrictEqual(3.0);
  expect(product?.salt).toStrictEqual(0.1);
});

test('ProductRecord returns null from database for not existing entry', async () => {
  const ad = await ProductRecord.getOne('loremIpsum');
  expect(ad).toBeNull();
});
// --end of testing getOne() method

// -- testing find() method
test('ProductRecord.find returns only desired amount of data', async () => {
  const products = await ProductRecord.find('');
  expect((products[0] as ProductEntity).description).toBeUndefined();
  expect((products[0] as ProductEntity).energy).toBeUndefined();
  expect((products[0] as ProductEntity).fat).toBeUndefined();
  expect((products[0] as ProductEntity).protein).toBeUndefined();
  expect((products[0] as ProductEntity).fibre).toBeUndefined();
  expect((products[0] as ProductEntity).sugars).toBeUndefined();
  expect((products[0] as ProductEntity).salt).toBeUndefined();
});

test('ProductRecord.find returns empty array when searching for something that does not exist', async () => {
  const products = await ProductRecord.find('----');
  expect(products).toHaveLength(0);
});

test('ProductRecord.find returns array of found entries when searching for "a"', async () => {
  const products = await ProductRecord.find('a');
  expect(products).not.toHaveLength(0);
  expect(products[0].product_id).toBeDefined();
});
// -- end of testing find() method
