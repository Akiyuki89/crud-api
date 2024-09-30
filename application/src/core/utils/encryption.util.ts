import * as bcrypt from 'bcrypt';

class Encryption {
  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    const validate = await bcrypt.compare(password, hash);
    return validate;
  }
}

export { Encryption };
