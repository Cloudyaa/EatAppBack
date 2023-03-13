import { ValidationError } from '../utlis/errors';

export const validateEmail = (email: string) => {
  const emailRegex =
    /^(?!.*@{2})(?!.*[-_.]{3})[^\s!?\-;:'"*#&]+(?:[\w.-]*\w)?@(?!-)(?:[a-zA-Z0-9-]{0,63}(?<!-)\.)+(?!-)[a-zA-Z]{2,}$/;

  if (!email) {
    throw new ValidationError('Email must be provided');
  }

  if (!emailRegex.test(email)) {
    throw new ValidationError('Email does not match valid pattern');
  }
};
