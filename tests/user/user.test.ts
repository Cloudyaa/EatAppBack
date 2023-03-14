import { pool } from '../../utlis';
import { testUser } from './testingRecord';
import { UserRecord } from '../../records';

afterAll(async () => {
  await pool.execute("DELETE FROM `users` WHERE `email` = 'test@example.com'");
  await pool.end();
});

// -- testing insert() method
test('UserRecord.insert inserts data to database', async () => {
  const user = new UserRecord({
    ...testUser,
  });

  await user.insert();

  const newUser = await UserRecord.findByEmail(user.email);
  expect(newUser).toBeDefined();
  expect(newUser).not.toBeNull();
  expect(newUser?.userId).toBe(user.userId);
});
// -- end of testing insert(productId) method

// -- testing findByEmail() method
test('UserRecord returns data from database for one entry', async () => {
  const user = await UserRecord.findByEmail('user@eat.com');
  expect(user).toBeDefined();
  expect(user?.userId).toBe('86ba84a3-d5ad-409f-9083-40caff1e4af5');
  expect(user?.email).toBe('user@eat.com');
  expect(user?.password).toBeTruthy();
});

test('UserRecord returns null from database for not existing entry', async () => {
  const user = await UserRecord.findByEmail('loremIpsum');
  expect(user).toBeNull();
});
// --end of testing findByEmail() method

// -- testing findById() method
test('UserRecord returns data from database for one entry', async () => {
  const user = await UserRecord.findById('86ba84a3-d5ad-409f-9083-40caff1e4af5');
  expect(user).toBeDefined();
  expect(user?.userId).toBe('86ba84a3-d5ad-409f-9083-40caff1e4af5');
  expect(user?.email).toBe('user@eat.com');
});

test('UserRecord returns null from database for not existing entry', async () => {
  const user = await UserRecord.findById('loremIpsum');
  expect(user).toBeNull();
});
// --end of testing findById() method

// -- testing getAll() method
test('UserRecord.getAll returns only desired amount of data', async () => {
  const users = await UserRecord.getAll();
  expect((users[0] as UserRecord).createdAt).toBeUndefined();
  expect((users[0] as UserRecord).updatedAt).toBeUndefined();
});

// -- end of testing getAll() method
