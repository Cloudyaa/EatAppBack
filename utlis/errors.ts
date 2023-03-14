import { NextFunction, Request, Response } from 'express';

export class ValidationError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  // prettier-ignore
  res
    .status(err instanceof ValidationError ? 400 : 500)
    .json({
      message: err instanceof ValidationError
        ? {
          status: res.statusCode,
          message: err.message
        }
        : {
          status: res.statusCode,
          message: "Sorry, please try again later"
        }
    });
};
