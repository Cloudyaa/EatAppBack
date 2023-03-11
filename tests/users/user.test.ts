import { pool } from '../../utlis/db';
import { UserRecord } from '../../records/user.record';
import { testUser } from '../testingRecords';

afterAll(async () => {
  await pool.execute("DELETE FROM `users` WHERE `email` = 'test@example.com'");
  await pool.end();
});

// -- testing insert(productId) method
test('UserRecord.insert inserts data to database', async () => {
  const user = new UserRecord({
    ...testUser,
  });

  await user.insert();

  const newUser = await UserRecord.getOne(user.userId);
  expect(newUser).toBeDefined();
  expect(newUser).not.toBeNull();
  expect(newUser?.userId).toBe(user.userId);
});
// -- end of testing insert(productId) method

// -- testing getOne() method
test('UserRecord returns data from database for one entry', async () => {
  const user = await UserRecord.getOne('test_user');
  expect(user).toBeDefined();
  expect(user?.userId).toBe('test_user');
  expect(user?.email).toBe('user@eat.com');
  expect(user?.password).toBe('12345678');
});

test('UserRecord returns null from database for not existing entry', async () => {
  const user = await UserRecord.getOne('loremIpsum');
  expect(user).toBeNull();
});
// --end of testing getOne() method

// -- testing getAll() method
test('UserRecord.getAll returns only desired amount of data', async () => {
  const users = await UserRecord.getAll();
  expect((users[0] as UserRecord).createdAt).toBeUndefined();
  expect((users[0] as UserRecord).updatedAt).toBeUndefined();
});

// -- end of testing getAll() method
