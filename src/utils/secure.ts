import CryptoJS from 'crypto-js';

var CONTRAST = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 对照
var DICTIONARIES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()'; //字典
var IV_TEXT = '0102030405060708';

const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF'); //十六位十六进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412'); //十六位十六进制数作为秘钥偏移量

//解密方法
function Decrypt(word: any) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
//加密方法
function Encrypt(word: any) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

/**
 * 字符串转byte[]
 */
export function stringToByte(str: any) {
  let bytes = new Array();
  let len, c;
  len = str.length;
  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i); //charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。
    // console.log(c)
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0);
      bytes.push(((c >> 12) & 0x3f) | 0x80);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0);
      bytes.push((c & 0x3f) | 0x80);
    } else {
      bytes.push(c & 0xff);
    }
  }
  return bytes;
}

/**
 * byte[]转字符串
 */
function byteToString(arr: any) {
  if (typeof arr === 'string') {
    return arr;
  }
  var str = '',
    _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

/**
 * 十六进制字符串转字节数组
 */
function Str2Bytes(str: any) {
  var pos = 0;
  var len = str.length;
  if (len % 2 != 0) {
    return null;
  }
  len /= 2;
  var hexA = new Array();
  for (var i = 0; i < len; i++) {
    var s = str.substr(pos, 2);
    var v = parseInt(s, 16);
    hexA.push(v);
    pos += 2;
  }
  return hexA;
}

/**
 * 字节数组转十六进制字符串
 */
function Bytes2Str(arr: any) {
  var str = '';
  for (var i = 0; i < arr.length; i++) {
    var tmp = arr[i].toString(16);
    if (tmp.length == 1) {
      tmp = '0' + tmp;
    }
    str += tmp;
  }
  return str;
}

/**
 * 字符串插入指定位置字符
 */
function insertChar(str: any, char: any, pos: any) {
  var oldstrArray = [str.substring(0, pos), str.substring(pos, str.length)];
  //        console.log("拆分后字符串 = %s", oldstrArray.toString());
  var newstr = oldstrArray[0] + char + oldstrArray[1];
  //        console.log("组合后字符串 = %s", newstr);
  return newstr;
}

/**
 * 加密
 */
export function encryption(content: any) {
  content = content.replace(/,/g, 'FENGEFU');
  //        console.log("密前文本 = %s", content);
  // 根据DICTIONARIES生成16为动态密钥
  var maxPos = DICTIONARIES.length; // 密钥字典最大长度
  var LEN = 16; // 密钥长度
  var password = ''; // 动态密钥
  var array = new Array(maxPos)
    .fill(0)
    .map((v, i) => i + 1)
    .sort(() => 0.5 - Math.random())
    .filter((v, i) => i < LEN); // 生成16个不同随机数,作为字典抽取角标
  for (var i = 0; i < array.length; i++) {
    password += DICTIONARIES.charAt(array[i] - 1);
  }
  // console.log("原始动态密钥 = %s", password);
  // AES加密内容
  var key = CryptoJS.enc.Utf8.parse(password);
  var iv = CryptoJS.enc.Utf8.parse(IV_TEXT);
  var encryptResult = CryptoJS.AES.encrypt(content, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  // 转BASE64,增加加密强度
  var encryptedStr = encryptResult.ciphertext.toString();
  // // encryptedStr = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encryptedStr));
  // encryptedStr = Bytes2Str(stringToByte(encryptedStr));
  // console.log(encryptedStr);
  // console.log("原始加密后密文 = %s", encryptedStr);
  // 密钥干扰
  var currentTimeMillis = new Date().valueOf().toString(); // 获得当前时间戳
  var currentTimeMillisLength = currentTimeMillis.length;
  if (currentTimeMillisLength < 13) {
    // 解决特殊机型获取当前时间毫秒位数异常
    var missingCount = 13 - currentTimeMillisLength;
    for (let i = 0; i < missingCount; i++) {
      currentTimeMillis = currentTimeMillis + i;
    }
  } else if (currentTimeMillis.length > 13) {
    currentTimeMillis = currentTimeMillis.substring(0, 13);
  }
  //        console.log("当前时间戳 = %s", currentTimeMillis);
  //        console.log("当前时间戳长度 = %s", currentTimeMillis.length);
  var h = new Array(); // 实际插入角标集合
  var arrayTime = new Array(16)
    .fill(0)
    .map((v, i) => i + 1)
    .sort(() => 0.5 - Math.random())
    .filter((v, i) => i < currentTimeMillis.length); // 生成16个不同随机数,作为字典抽取角标
  for (let i = 0; i < arrayTime.length; i++) {
    //            console.log("取16位随机数第 %s 位", arrayTime[i] - 1);
    h[i] = arrayTime[i] - 1;
  }
  //        console.log("集合长度 = %s", h.length);
  var indexs = ''; // 插入角标字符串,每位是要插入的角标
  //随机选取要插入干扰字符
  var arrayMix = new Array(13)
    .fill(0)
    .map((v, i) => i + 1)
    .sort(() => 0.5 - Math.random())
    .filter((v, i) => i < h.length); // 生成13个不同随机数,作为字典抽取角标
  //        console.log("arrayMix集合长度 = %s", arrayMix.length);
  for (let i = 0; i < arrayMix.length; i++) {
    var charAt = currentTimeMillis.charAt(arrayMix[i] - 1); //取随机干扰字符
    //            console.log("干扰字符 = %s", charAt);
    password = insertChar(password, charAt, h[i]);
    //            console.log("已插入干扰字符密钥 = %s", password);
    indexs += CONTRAST.charAt(h[i]); // 将10进制角标映射为16进制标识方式
  }
  // console.log("混淆插入角标索引集合字符串 = %s", indexs);
  // console.log("混淆后的动态密钥 = %s", password);
  //将角标分成两节(0~6)(6~13)
  var qian = indexs.substring(0, 6);
  var hou = indexs.substring(6, 13);
  //将分好的两节分别拼接到角标前后
  password = qian + password + hou;
  //        console.log("最终携带混淆角标混淆后的动态密钥 = %s", password);
  var result = password + ',' + encryptedStr;
  // console.log("最终加密文本 = %s", result);
  var byteResult = stringToByte(result);
  //        console.log("最终字节加密文本 = %s", byteResult);
  var hexResult = Bytes2Str(byteResult).toUpperCase();
  // console.log("最终16进制加密文本 = %s", hexResult);
  // console.log("--------------------------");
  return hexResult;
}

/**
 * 解密
 * @param content
 */
export function decryption(content: any) {
  var btyeMessage = Str2Bytes(content);
  //        console.log("最终16进制转字符串加密文本Byte = %s", btyeMessage);
  var message = byteToString(btyeMessage);
  // console.log("字节转字符串加密文本 = %s", message);
  var resultArray = message.split(',');
  //        console.log("混淆密钥 = %s", resultArray[0]);
  var realMessage = resultArray[1];
  // console.log("实际密文 = %s", realMessage);
  var qian = resultArray[0].substring(0, 6);
  var hou = resultArray[0].substring(resultArray[0].length - 7, resultArray[0].length);
  var indexs16 = qian + hou;
  var password = resultArray[0].substring(6, resultArray[0].length - 7);
  // console.log("干扰字符角标 = %s", indexs16);
  // console.log("干扰后密钥 = %s", password);
  var indexArray = indexs16.split('');
  //        console.log("角标数量 = %s", indexArray);
  for (var i = indexArray.length - 1; i >= 0; i--) {
    var pos = parseInt(indexArray[i], 16); // 16进制字符转10进制字符
    //            console.log("干扰字符角标 = %s", pos);
    password = password.substring(0, pos) + password.substring(pos + 1);
    //            console.log("删除干扰字符后 = %s", password);
  }
  // console.log("实际密钥 = %s", password);
  // AES解密内容
  var key = CryptoJS.enc.Utf8.parse(password);
  var iv = CryptoJS.enc.Utf8.parse(IV_TEXT);
  // realMessage = CryptoJS.enc.Hex.parse(realMessage).toString();
  var encryptedHexStr = CryptoJS.enc.Hex.parse(realMessage);
  var encryptedBase64Str2 = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str2, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
  decryptedStr = decryptedStr.replace(/FENGEFU/g, ',');
  // console.log("最终文本 = %s", decryptedStr);
  return decryptedStr;
}

// 加密,调用该方法时，传入的data必须是字符串类型，故，如果要加密对象等类型，需要先用JSON.stringify()将其字符串化再传入
export function encryptByAES(data: any) {
//   console.log('加密前', data);
  let keyStr = 'TheKeyOfmyDatadx'; // 16位，密钥字符串
  let key = CryptoJS.enc.Utf8.parse(keyStr); // 将字符串的转为WordArray类型
  let mydata = CryptoJS.enc.Utf8.parse(data);
  //   debugger
  //   console.log('key:', key, 'mydata:', mydata)
  let udata = CryptoJS.AES.encrypt(mydata, key, {
    mode: CryptoJS.mode.ECB, // 加密模式，ECB模式
    padding: CryptoJS.pad.Pkcs7, // 填充方式
  });
  let encrypted = udata.toString(); //  返回的是base64的密文,是字符串类型
  return encrypted;
}
// 解密, 调用该方法时，传入的data是base64的密文
export function decryptByAES(data: any) {
  let keyStr = 'TheKeyOfmyDatadx';
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let udata = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decrypted = udata.toString(CryptoJS.enc.Utf8); // 返回的是加密之前的原始数据,是字符串类型
  return decrypted;
}

export default {
  encryption,
  decryption,
  encryptByAES,
  decryptByAES,
  Decrypt,
  Encrypt,
};
