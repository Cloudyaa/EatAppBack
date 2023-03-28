import moment from 'moment';
import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { NewUserEntity, SafeUserEntity, SimpleUserEntity, UserEntity } from '../types';
import { pool } from '../utlis';

type UserRecordResults = [UserEntity[], FieldPacket[]];
type SafeUserRecordResults = [SafeUserEntity[], FieldPacket[]];

export class UserRecord implements UserEntity {
  userId: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: string;

  constructor(obj: NewUserEntity) {
    this.email = obj.email;
    this.password = obj.password;
    this.role = obj.role;
    obj.userId ? (this.userId = obj.userId) : null;
    obj.createdAt ? (this.createdAt = obj.createdAt) : null;
    obj.updatedAt ? (this.updatedAt = obj.updatedAt) : null;
  }

  static async getAll(): Promise<SimpleUserEntity[]> {
    const [results] = (await pool.execute(
      ` SELECT users.*, roles.name AS role 
            FROM users
            JOIN user_roles ur ON users.userId = ur.userId 
            JOIN roles roles ON ur.roleId = roles.roleId 
            ORDER BY users.email ASC`,
    )) as UserRecordResults;

    return results.map((result) => {
      const { userId, email, role } = result;
      return {
        userId,
        email,
        role,
      };
    });
  }

  static async findByEmail(email: string): Promise<UserRecord | null> {
    const [results] = (await pool.execute(
      ` SELECT users.*, roles.name AS role 
            FROM users 
            JOIN user_roles ON users.userId = user_roles.userId 
            JOIN roles ON user_roles.roleId = roles.roleId
            WHERE users.email = :email`,
      {
        email,
      },
    )) as UserRecordResults;

    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async findById(userId: string): Promise<SafeUserEntity | null> {
    const [results] = (await pool.execute(
      ` SELECT users.*, roles.name AS role 
            FROM users 
            JOIN user_roles ON users.userId = user_roles.userId 
            JOIN roles ON user_roles.roleId = roles.roleId
            WHERE users.userId = :userId`,
      {
        userId,
      },
    )) as SafeUserRecordResults;

    if (results.length === 0) {
      return null;
    }
    const { role, email, updatedAt, createdAt } = results[0];
    return {
      userId,
      role,
      email,
      updatedAt,
      createdAt,
    };
  }

  async insert(): Promise<string> {
    if (!this.userId) {
      this.userId = uuid();
    } else {
      throw new Error('Cannot insert something that is already in database');
    }

    if (!this.createdAt) {
      this.createdAt = moment().format('YYYY-MM-DD hh:mm:ss');
    }

    if (!this.updatedAt) {
      this.updatedAt = moment().format('YYYY-MM-DD hh:mm:ss');
    }

    await pool.execute(
      'INSERT INTO `users` VALUES (:userId, :email, :password, :createdAt, :updatedAt)',
      this,
    );
    await pool.execute(
      'INSERT INTO `user_roles` VALUES (:userId, :roleId, :createdAt, :updatedAt)',
      {
        ...this,
        roleId: this.role === 'user' ? 'role_user' : 'role_admin',
      },
    );

    return this.userId;
  }
}
