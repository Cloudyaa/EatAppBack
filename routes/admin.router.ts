import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserRecord } from "../records";


export const adminRouter = Router();

adminRouter
  .use(authMiddleware('admin'))

  .get('/', async (req, res) => {
    res.json({
      status: res.statusCode,
      message: 'Welcome to admin panel',
    });
  })

  .get('/manage/users', async (req, res) => {
    const users = await UserRecord.getAll();
    res.json(users);
  });
