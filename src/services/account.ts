import request from '@/utils/request'

// 获取验证码
export const fetchVerifyCode = (rand: string) => request.get<ArrayBuffer>({ url: '/rating_system/admin/verifyImage', params: { rand }, responseType: 'arraybuffer' })

interface LoginParams {
  rand: string
  phone?: string
  username?: string
  password: string
  verify_code: string
}

export interface AdminRow {
  id: number
  organization_id: number
  organization_name: string
}
interface UserData {
  phone_to_users: Array<AdminRow>
}

export interface LoginResponse {
  access_token: string
  userdata: UserData
}

// 登录
export const login = (params: LoginParams) => request.post<LoginResponse>({ url: '/rating_system/admin/login', data: params })

export interface SwitchAdminParams {
  access_token: string
  admin_id: number
}

export interface SwitchAdminResponse {
  access_token: string
}

// 切换后台
export const switchAdmin = (params: SwitchAdminParams) => request.post<SwitchAdminResponse>({ url: '/rating_system/admin/switch_admin', data: params })
