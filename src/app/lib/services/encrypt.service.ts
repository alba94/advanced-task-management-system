import * as crypto from 'crypto-js';

export const encrypt = (value: string, key: string) => {
  return crypto.AES.encrypt(value, key).toString();
}

export const decrypt = (value: string, key: string) => {
  return crypto.AES.decrypt(value, key).toString();
}
