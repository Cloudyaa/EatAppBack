import { Router } from 'express';
import { UserRecord } from './user.record';
import { authMiddleware } from '../../middleware/auth.middleware';

export const userRouter = Router();

userRouter.get('/dashboard/:id', authMiddleware('user'), async (req, res) => {
  const user = await UserRecord.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  res.json({
    user,
  });
});
