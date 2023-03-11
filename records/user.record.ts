import { ValidationError } from '../utlis/errors';
import { FieldPacket } from 'mysql2';
import { pool } from '../utlis/db';
import { v4 as uuid } from 'uuid';
import { NewUserEntity, SimpleUserEntity, UserEntity } from '../types';

type UserRecordResults = [UserEntity[], FieldPacket[]];

export class UserRecord implements UserEntity {
  userId: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;

  constructor(obj: NewUserEntity) {
    if (!obj.email || obj.email.length < 6 || obj.email.length > 128 || !obj.email.includes('@')) {
      throw new ValidationError(
        'Email cannot have less than 6 and more than 128 characters and must contain @',
      );
    }

    if (!obj.password || obj.password.length < 7 || obj.password.length > 31) {
      throw new ValidationError('Password must have at least 8 and no more than 30 characters');
    }
    obj.userId ? (this.userId = obj.userId) : null;
    this.email = obj.email;
    this.password = obj.password;
    this.createdAt = obj.createdAt;
    this.updatedAt = obj.updatedAt;
  }

  static async getOne(id: string): Promise<UserRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM `users` WHERE `userId` = :id', {
      id,
    })) as UserRecordResults;

    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async getAll(): Promise<SimpleUserEntity[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `users` ORDER BY `email` ASC',
    )) as UserRecordResults;
    //   return results.map(obj => new ChildRecord(obj));
    return results.map((result) => {
      const { userId, email, password } = result;
      return {
        userId,
        email,
        password,
      };
    });
  }

  async insert(): Promise<string> {
    if (!this.userId) {
      this.userId = uuid();
    } else {
      throw new Error('Cannot insert something that is already in database');
    }

    await pool.execute(
      'INSERT INTO `users` VALUES (:userId, :email, :password, :createdAt, :updatedAt)',
      this,
    );

    return this.userId;
  }
}
