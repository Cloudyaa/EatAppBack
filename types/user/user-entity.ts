export interface SimpleUserEntity {
  userId: string;
  email: string;
  password: string;
}

export interface UserEntity extends SimpleUserEntity {
  createdAt: string;
  updatedAt: string;
}

export interface SecureUserEntity extends Omit<UserEntity, 'password'> {
  password?: string;
}

export interface NewUserEntity extends Omit<UserEntity, 'userId'> {
  userId?: string;
}
