import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { AuthUser } from '../types';
import { UserRecord } from '../account/user/user.record';

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

      // if user is not authorized to access the requested dashboard
      if (requiredRole === 'user' && decodedToken.userId !== req.params.id) {
        return res.status(401).json({ message: 'You are not authorized to access this dashboard' });
      }

      // if role of the user in the decoded token is different from the requiredRole
      if (decodedToken.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const user = await UserRecord.findById(decodedToken.userId);

      // if user wants access to admin panel
      if (user && user.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      console.error(error);

      // if not logged person wants access to admin panel or token expired
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: 'Token has expired' });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    }
  };
