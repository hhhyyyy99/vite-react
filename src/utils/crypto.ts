import CryptoJS from 'crypto-js';

export const key: string = 'TqXt9fUZpaHorHMyNd0dlA==';

export function encrypt(value: string, key: string) {
  const cryKey = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.lib.WordArray.create(cryKey.words.slice(0, 4));
  const encrypted = CryptoJS.AES.encrypt(value, cryKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); // 输出base64
}

export function decrypt(value: string, key: string) {
  const cryKey = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.lib.WordArray.create(cryKey.words.slice(0, 4));
  const decrypted = CryptoJS.AES.decrypt(value, cryKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
