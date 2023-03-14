export interface SimpleUserEntity {
  userId: string;
  email: string;
  role: string;
}

export interface SafeUserEntity extends SimpleUserEntity {
  createdAt: string;
  updatedAt: string;
}

export interface UserEntity extends SimpleUserEntity, SafeUserEntity {
  password: string;
}

export interface NewUserEntity extends Omit<UserEntity, 'userId' | 'createdAt' | 'updatedAt'> {
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser {
  userId: string;
  role: string;
  exp: number;
}
