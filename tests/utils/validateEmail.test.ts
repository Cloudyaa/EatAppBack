import { validateEmail } from "../../utlis";

let errMessage: string;

describe('Validate email', () => {
  it('Throws when no email provided', () => {
    errMessage = 'Email must be provided';
    expect(() => {
      validateEmail('');
    }).toThrow(errMessage);
  });

  it('Throws when email does not contain @', () => {
    errMessage = 'Email does not match valid pattern';
    expect(() => {
      validateEmail('abc.co.uk');
    }).toThrow(errMessage);
  });

  it('Throws when email is too short to be correct', () => {
    expect(() => {
      validateEmail('a@b.c');
    }).toThrow(errMessage);
  });

  it('Throws when email starts with special character', () => {
    expect(() => {
      validateEmail('-test@example.com');
    }).toThrow(errMessage);
  });

  it('Throws when email part ends with special character', () => {
    expect(() => {
      validateEmail('a@b-.co');
    }).toThrow(errMessage);
    expect(() => {
      validateEmail('a-@b.co');
    }).toThrow(errMessage);
    expect(() => {
      validateEmail('a@b.co-');
    }).toThrow(errMessage);
  });
});
