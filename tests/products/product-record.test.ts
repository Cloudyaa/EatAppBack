import { stringOver1000, testProduct } from './testingRecord';
import { ProductRecord } from '../../records';

let errMessage: string;

test('Can build ProductsRecord', () => {
  expect(testProduct.name).toBe('Test name');
  expect(testProduct.description).toBe('Test description');
  expect(testProduct.price).toStrictEqual(99.99);
  expect(testProduct.energy).toStrictEqual(100);
  expect(testProduct.lifeInDays).toStrictEqual(360);
  expect(
    testProduct.fat &&
      testProduct.protein &&
      testProduct.fibre &&
      testProduct.sugars &&
      testProduct.salt,
  ).toStrictEqual(20.5);
});

test('Throws when invalid name provided', () => {
  errMessage = 'Product name cannot be empty and cannot exceed 100 characters';
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        name: '',
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        name: 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test',
      }),
  ).toThrow(errMessage);
});

test('Throws when too long description provided', () => {
  errMessage = 'Product description cannot exceed 1000 characters';
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        description: stringOver1000,
      }),
  ).toThrow(errMessage);
});

test('Throws when invalid price provided', () => {
  errMessage = 'Price cannot be negative or greater than 99.99';
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        price: -10,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        price: 100,
      }),
  ).toThrow(errMessage);
});

test('Throws when invalid energy amount provided', () => {
  errMessage = 'Energy cannot be negative or greater than 500 kcal';
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        energy: -501,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        energy: 501,
      }),
  ).toThrow(errMessage);
});

test('Throws when invalid nutrition data provided', () => {
  errMessage = 'Nutrition data cannot be negative or greater than 99.99g';
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        fat: -1,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        protein: -1,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        fibre: -1,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        sugars: -1,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        salt: -1,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        fat: 100,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        protein: 100,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        fibre: 100,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        sugars: 100,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        salt: 100,
      }),
  ).toThrow(errMessage);
});
