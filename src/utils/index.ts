import { encryption, decryption, encryptByAES, decryptByAES} from './secure';

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

export function getLanguage() {
  let storageLanguage = sessionStorage.getItem('language');
  let language = storageLanguage ? storageLanguage : '';
  // const lang = navigator.language || navigator.userLanguage; // 常规浏览器语言和IE浏览器
  const lang = navigator.language;
  language = language || lang;
  language = language.replace(/-/, '_').toLowerCase();
  if (language === 'zh_cn' || language === 'zh') {
    language = 'zh_CN';
  } else if (language === 'zh_tw' || language === 'zh_hk' || language === 'uk_cn') {
    language = 'uk_CN';
  } else {
    language = 'zh_CN';
  }
  return language;
}
export default {
  encryptionFun,
  decryptionFun,
  encryptByAESFun,
  decryptByAESFun,

  getLanguage,
};
