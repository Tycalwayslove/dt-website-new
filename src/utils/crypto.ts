import CryptoJS from 'crypto-js'

export interface AesParams {
  key: string
  iv: string
}

export function encryptByAES(plainText: string, params: AesParams): string {
  const key = CryptoJS.enc.Utf8.parse(params.key)
  const iv = CryptoJS.enc.Utf8.parse(params.iv)
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}
