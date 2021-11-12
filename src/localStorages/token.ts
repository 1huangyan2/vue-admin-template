const key = 'token'

// 设置token
export const setToken = (token: string): string => {
  localStorage.setItem(key, token)
  return token
}

// 删除token
export const delToken = () => {
  localStorage.removeItem(key)
}
