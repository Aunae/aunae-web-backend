export type FindUserDto = {
  [K in 'id' | 'username' | 'email']?: string;
};
