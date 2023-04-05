import { testUser } from './testingRecord';
import { UserRecord } from '../../records';

test('Can build UserRecord', () => {
  const test = new UserRecord({ ...testUser });
  expect(test.email).toBe('test@example.com');
  expect(test.password).toBe('c7HJ3:KI%5');
});
