import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { UserRecord } from '../records';
import { validateEmail, validatePassword } from '../utlis';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'default_secret';

export const accountRouter = Router();

accountRouter
  .post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'Missing required fields',
      });
    }

    const isAlreadySigned = await UserRecord.findByEmail(email);

    if (isAlreadySigned) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'User already signed',
      });
    }

    // validation of provided data
    validateEmail(email);
    validatePassword(password);

    // encrypt password
    const hashedPassword = await hash(password, 10);

    // create new user
    const validUser = new UserRecord({
      email,
      password: String(hashedPassword),
      role: 'user',
    });

    await validUser.insert();

    res.status(200).json({
      status: res.statusCode,
      message: 'Account created successfully',
    });
  })

  .post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      // findByEmail user by provided email
      const user = await UserRecord.findByEmail(email);

      // check if user exists
      if (!user) {
        return res.status(401).json({
          status: res.statusCode,
          message: 'User not found',
        });
      }

      // check if provided password is correct
      const isMatch = await compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          status: res.statusCode,
          message: 'Invalid email or password',
        });
      }

      // generate token
      const token = jwt.sign(
        {
          role: user.role,
          userId: user.userId,
        },
        JWT_SECRET,
        {
          expiresIn: 60 * 60 * 3, // 3 hours
        },
      );

      if (user.role === 'user') {
        return res.status(200).json({
          status: res.statusCode,
          role: user.role,
          userId: user.userId,
          token,
        });
      }

      if (user.role === 'admin') {
        return res.status(200).json({
          status: res.statusCode,
          token,
        });
      }
    } catch (err) {
      res.status(500).json({
        status: res.statusCode,
        error: err,
        message: 'Internal server error',
      });
    }
  });
