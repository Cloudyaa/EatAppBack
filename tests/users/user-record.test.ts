import { testUser } from '../testingRecords';
import { UserRecord } from '../../account/user/user.record';

test('Can build UserRecord', () => {
  const test = new UserRecord({ ...testUser });
  expect(test.email).toBe('test@example.com');
  expect(test.password).toBe('c7HJ3:KI%5');
});
