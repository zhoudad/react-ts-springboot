import { encryption, decryption, encryptByAES, decryptByAES } from './secure';

//加密解密
export function encryptionFun(data: any): any {
  let funcMessage = encryption(data);
  return funcMessage;
}

export function decryptionFun(data: any): any {
  let funcMessage = decryption(data);
  return funcMessage;
}

// 加密解密
export function encryptByAESFun(data: any): any {
  let funcMessage = encryptByAES(data);
  return funcMessage;
}

export function decryptByAESFun(data: any): any {
  let funcMessage = decryptByAES(data);
  return funcMessage;
}
export default {
  encryptionFun,
  decryptionFun,
  encryptByAESFun,
  decryptByAESFun,
};
