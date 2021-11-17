import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
// import token from '@/localStorage/token';
import { ElMessage } from 'element-plus'
import router from '@/router'

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

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 请求成功
    return response
  },
  (error: AxiosError) => {
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
        headers: {
          ...headers
        },
        ...args
      })
        .then((res: AxiosResponse<Response>) => {
          const { data } = res
          // 请求的图片信息成功 后续让后端统一格式返回
          if (data instanceof ArrayBuffer) {
            resolve({ code: 0, msg: 'success', data })
            return
          }
          // 接口返回失败
          if (data.code !== 0) {
            ElMessage.error(data.msg)
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
          ElMessage.error(msg)
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
