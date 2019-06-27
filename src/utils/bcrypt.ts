import * as bcrypt from "bcrypt";

export async function hash(password: string): Promise<string> {
  const SALT_ROUND = 10;

  const hash = await bcrypt.hash(password, SALT_ROUND);
  if (!hash) {
    throw new Error("Hash error");
  }
  return hash;
}

export async function checkHash(
  reqPassword: string,
  dbpassword: string
): Promise<boolean> {
  return bcrypt.compare(reqPassword, dbpassword);
}
