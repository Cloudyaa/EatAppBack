import { NewProductEntity, NewUserEntity } from '../types';
import moment from 'moment';

export const testProduct: NewProductEntity = {
  name: 'Test name',
  price: 99.99,
  description: 'Test description',
  lifeInDays: 360,
  energy: 100,
  fat: 20.5,
  protein: 20.5,
  fibre: 20.5,
  sugars: 20.5,
  salt: 20.5,
};

export const testUser: NewUserEntity = {
  email: 'test@example.com',
  password: 'qwerty123456',
  createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
  updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
};
