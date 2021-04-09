import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

async function hashPass(password: string) {
  return bcrypt.hash(password, saltOrRounds);
}

async function comparePass(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export default { hashPass, comparePass };
