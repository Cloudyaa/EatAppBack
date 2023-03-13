import { validatePassword } from '../../user/validatePassword';

let errMessage: string;

describe('Validate password', () => {
  it('Throws if password is not provided', () => {
    errMessage = 'Password must be provided';
    expect(() => {
      validatePassword('');
    }).toThrow(errMessage);
  });

  it('Throws when too short password provided', () => {
    errMessage = 'Password must be at least 8 and no more than 20 characters long';
    expect(() => {
      validatePassword('1234567');
    }).toThrow(errMessage);
  });

  it('Throws when too long password provided', () => {
    expect(() => {
      validatePassword('123456789012345678901');
    }).toThrow(errMessage);
  });

  it('Throws if password does not contain at least one number', () => {
    errMessage = 'Password is not strong enough';
    expect(() => {
      validatePassword('abcdefghi');
    }).toThrow(errMessage);
  });

  it('Throws if password does not contain at least one small letter', () => {
    expect(() => {
      validatePassword('ABCDEFGH1');
    }).toThrow(errMessage);
  });

  it('Throws if password does not contain at least one capital letter', () => {
    expect(() => {
      validatePassword('abcdefgh1');
    }).toThrow(errMessage);
  });

  it('Throws if password does not contain at least one special character', () => {
    expect(() => {
      validatePassword('abcdefgh1A');
    }).toThrow(errMessage);
  });

  it('Throws if password contains 2 same characters next to each other', () => {
    expect(() => {
      validatePassword('AbCd3f3#11');
    }).toThrow(errMessage);
  });
});
