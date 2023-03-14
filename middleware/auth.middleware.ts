import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { AuthUser } from '../types';
import { UserRecord } from '../records/user.record';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'default_secret';

export const authMiddleware =
  (requiredRole: string) => async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: req.statusCode,
        message: 'No token provided',
      });
    }

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as AuthUser;
      if (decodedToken.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const userRole = await UserRecord.getRole(decodedToken.userId);

      // if user wants access to admin panel
      if (userRole !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (error) {
      console.error(error);

      // if not logged person wants access to admin panel
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
