import { Router } from 'express';

export const usersRouter = Router();

usersRouter
  .get('/all', async (req, res) => {
    res.json('all users');
  })
  .post('/login', async (req, res) => {
    res.json('user login');
  })

  .post('/add', async (req, res) => {
    res.json('user add');
  });
