import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

async function hashPass(password: string) {
  return bcrypt.hash(password, saltOrRounds);
}

export { hashPass };
