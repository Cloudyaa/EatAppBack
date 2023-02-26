import { ProductRecord } from '../records/product.record';

test('ProductRecord returns data from database for one entry', async () => {
  const product = await ProductRecord.getOne('test_id');
  expect(product).toBeDefined();
  expect(product?.id).toBe('test_id');
  expect(product?.name).toBe('test_product');
  expect(product?.description).toBe('test_desc');
  expect(product?.price).toStrictEqual(1.99);
  expect(product?.energy).toStrictEqual(70);
  expect(product?.fat).toStrictEqual(0.3);
  expect(product?.saturates).toStrictEqual(0.1);
  expect(product?.sugars).toStrictEqual(2.5);
  expect(product?.salt).toStrictEqual(0.01);
});

test('ProductRecord returns null from database for not existing entry', async () => {
  const ad = await ProductRecord.getOne('loremIpsum');
  expect(ad).toBeNull();
});
