import { ValidationError } from '../utlis/errors';

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\S)(?=.*[!@#$%^&*()_+\-=[\]{}~;:'<>,./?`])(?!.*(.)\1)[A-Za-z0-9\S!@#$%^&*()_+\-=[\]{}~;:'<>,./?`]{8,20}$/;

  if (!password) {
    throw new ValidationError('Password must be provided');
  }

  if (password.length < 8 || password.length > 20) {
    throw new ValidationError('Password must be at least 8 and no more than 20 characters long');
  }

  if (!passwordRegex.test(password)) {
    throw new ValidationError('Password is not strong enough');
  }
};
