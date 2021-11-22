import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
// import token from '@/localStorage/token';
import { ElMessage } from 'element-plus'
import router from '@/router'
import Qs from 'qs'

const BaseUrl = process.env.VUE_APP_REQUEST_HOST

interface Request {
  request(params: AxiosRequestConfig): Promise<Response>
  get<T>(params: AxiosRequestConfig): Promise<Response<T>>
  delete<T>(params: AxiosRequestConfig): Promise<Response<T>>
  post<T>(params: AxiosRequestConfig): Promise<Response<T>>
  put<T>(params: AxiosRequestConfig): Promise<Response<T>>
}

interface Response<T = any> {
  code: number
  msg: string
  data?: T
}

export const pendingRequest = new Map()

// 生成请求key
function generateReqKey(config: AxiosRequestConfig) {
  const { method, url, params, data } = config
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&')
}

// 添加请求到map对象
function addPendingRequest(config: AxiosRequestConfig) {
  if (config.url && ['/testing'].includes(config.url)) {
    // 排除请求api
    return
  }
  const requestKey = generateReqKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel)
      }
    })
}

// 从map对象删除请求
function removePendingRequest(config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey)
    cancelToken(requestKey)
    pendingRequest.delete(requestKey)
  }
}
// 清空请求
export const emptyPendingRequest = () => {
  for (const [key, value] of pendingRequest) {
    value()
  }
}

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    removePendingRequest(config) // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config) // 把当前请求信息添加到pendingRequest对象中
    return config
  },
  () => {
    return Promise.reject({ code: -1, msg: '请求失败了' })
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config) // 从pendingRequest对象中移除请求
    // 请求成功
    return response
  },
  (error: AxiosError) => {
    removePendingRequest(error.config || {}) // 从pendingRequest对象中移除请求
    if (error instanceof axios.Cancel) {
      // 请求取消了
      return Promise.reject({ code: -1, msg: '' })
    }
    // 请求不成功
    let code = -1
    let msg = '请求失败了'
    if (error.response) {
      const { data, status } = error.response
      code = status
      msg = data
    }
    return Promise.reject({ code, msg })
  }
)

// url 动态参数替换
const replaceUrlDynamicParams = (url = '', params: { [key: string]: any } = {}): [string, { [key: string]: any }] => {
  const keys = Object.keys(params)
  let pattern: RegExp | null = null
  for (const key of keys) {
    pattern = new RegExp(`:${key}\\b`, 'g')
    if (pattern.test(url)) {
      // url 当前有动态参数，使用正则替换
      url = url.replace(pattern, params[key])
      delete params[key]
    }
  }
  return [url, params]
}

const request: Request = {
  request(params) {
    const [url, _params] = replaceUrlDynamicParams(params.url, params.params)
    params.url = url
    params.params = _params
    if (params.method !== 'GET') {
      // 只有get的请求参数放在params里面，其他参数放在body里面
      params.data = params.params
      delete params.params
    }
    const { headers = {}, ...args } = params

    // if (token.get()) {
    //   // 携带登录token
    //   headers.Authorization = token.get();
    // }
    return new Promise((resolve) =>
      axios({
        baseURL: BaseUrl + '/api',
        headers,
        ...args
      })
        .then((res: AxiosResponse<Response>) => {
          const { data } = res
          // 接口返回二进制或者字符串 接口请求成功
          if (data instanceof ArrayBuffer || typeof data === 'string') {
            resolve({ code: 0, msg: 'success', data })
            return
          }
          // 接口返回失败
          if (data.code !== 0) {
            ElMessage.error(data.msg || '请求失败')
          }
          resolve(data)
          // token失效，或未登录 需要授权
          if ([406, 403].includes(data.code)) {
            // token.delete();
            // 跳登录页
            router.replace('/login')
          }
        })
        .catch((err: Response) => {
          const { msg } = err
          msg && ElMessage.error(msg)
          resolve({ code: -1, msg })
        })
    )
  },
  get(params) {
    return this.request({ ...params, method: 'GET' })
  },
  post(params) {
    return this.request({ ...params, method: 'POST' })
  },
  delete(params) {
    return this.request({ ...params, method: 'DELETE' })
  },
  put(params) {
    return this.request({ ...params, method: 'PUT' })
  }
}

export default request
