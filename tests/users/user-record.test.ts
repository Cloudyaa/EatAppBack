import { testUser } from '../testingRecords';
import moment from 'moment/moment';
import { UserRecord } from '../../records/user.record';

let errMessage: string;

test('Can build UserRecord', () => {
  expect(testUser.email).toBe('test@example.com');
  expect(testUser.password).toBe('qwerty123456');
  expect(testUser.createdAt).toBe(moment().format('YYYY-MM-DD hh:mm:ss'));
});

test('Throws when invalid email provided', () => {
  errMessage = 'Email cannot have less than 6 and more than 128 characters and must contain @';
  expect(
    () =>
      new UserRecord({
        ...testUser,
        email: '',
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new UserRecord({
        ...testUser,
        email:
          'Test@TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest',
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new UserRecord({
        ...testUser,
        email: 'a@b.c',
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new UserRecord({
        ...testUser,
        email: 'test.com',
      }),
  ).toThrow(errMessage);
});

test('Throws when invalid password provided', () => {
  errMessage = 'Password must have at least 8 and no more than 30 characters';
  expect(
    () =>
      new UserRecord({
        ...testUser,
        password: '',
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new UserRecord({
        ...testUser,
        password: 'lorem',
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new UserRecord({
        ...testUser,
        password: 'Loremipsumdolorsitametconsecteturadi',
      }),
  ).toThrow(errMessage);
});

// add more tests about password strength
