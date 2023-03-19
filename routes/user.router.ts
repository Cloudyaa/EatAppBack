import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserRecord } from '../records';

export const userRouter = Router();

userRouter.get('/dashboard/:id', authMiddleware('user'), async (req, res) => {
  const user = await UserRecord.findById(req.params.id);

  if (!user) {
    res.status(404).json({
      status: res.statusCode,
      message: 'User not found',
    });
  }

  res.json(user);
});