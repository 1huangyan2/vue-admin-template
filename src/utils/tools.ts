// 随机生成字符串
export const generateRandomStr = (n: number): string => {
  const str = 'I1UuVv9gqoOLlABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const max = str.length
  if (n > max) {
    throw new Error('生成字符串超出最大限制')
  }
  let randomStr = ''
  for (let i = 0; i < n; i++) {
    randomStr += str.charAt(Math.floor(Math.random() * max))
  }
  return randomStr
}

// arrayBuffer转base64图片
export const arrayBufferToBase64Img = (buffer: ArrayBuffer): string => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return 'data:image/jpg;base64,' + window.btoa(binary)
}
