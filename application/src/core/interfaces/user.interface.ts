interface ICreateUser {
  name: string;
  email: string;
  descriptions: Record<string, string>;
  password: string;
  confirmPassword: string;
}

export { ICreateUser };
