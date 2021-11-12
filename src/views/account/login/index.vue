<template>
  <el-form :rules="rules" :model="ruleForm" ref="formRef" class="login_form">
    <el-form-item prop="phone">
      <el-input v-model="ruleForm.phone" placeholder="手机号" clearable :prefix-icon="User" @keyup.enter="onSubmit" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="ruleForm.password" placeholder="密码" :type="passwordType" :prefix-icon="Lock" clearable @keyup.enter="onSubmit">
        <template #suffix>
          <el-icon class="el-input__icon">
            <View @click="togglePasswordType" />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="verify_code">
      <el-row :gutter="10">
        <el-col :span="16">
          <el-input v-model="ruleForm.verify_code" clearable placeholder="验证码" :prefix-icon="Check" @keyup.enter="onSubmit" />
        </el-col>
        <el-col :span="8">
          <el-image class="verify_code_img" :src="verifyCodeBase64Img" fit="cover" @click="generateVerifyCode" />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item class="forget_password">
      <router-link to="/account/find_pwd">忘记密码</router-link>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit_btn" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
  <!-- 选择要登录的后台 -->
  <el-dialog :model-value="!!accessToken" title="请选择要登陆的后台" width="368px" @close="handleClose" custom-class="admin_dialog">
    <el-radio-group v-model="adminId">
      <el-radio v-for="admin in admins" :key="admin.id" :label="admin.id" class="admin_radio">{{ admin.organization_name }}</el-radio>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose" size="small">取消</el-button>
        <el-button type="primary" @click="handleConfirm" size="small">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, Ref, /*  */ onMounted } from 'vue'
import { generateRandomStr, arrayBufferToBase64Img } from '@/utils/tools'
import { phonePattern } from '@/utils/patterns'
import { ElForm, ValidateFieldCallback } from 'element-plus'
import { FormRulesMap } from 'element-plus/es/components/form/src/form.type'
import { User, Lock, Check, View } from '@element-plus/icons'
import { fetchVerifyCode } from '@/services/account'
import md5 from 'md5'
import { login, LoginResponse, AdminRow } from '@/services/account'
import { useStore } from 'vuex'

interface LoginParams {
  password: string
  phone: string
  verify_code: string
}

export default defineComponent({
  components: {
    View
  },
  setup() {
    const store = useStore()
    const formRef: Ref<(typeof ElForm & { validate: (fn: ValidateFieldCallback) => void }) | null> = ref(null)
    // 密码input框类型
    const passwordType = ref('password')
    // 账号token
    const accessToken = ref('')
    // 后台id
    const adminId = ref(0)

    // 生成验证码携带的随机字符串
    const randomStr = ref()
    // 验证码base64图片
    const verifyCodeBase64Img = ref('')

    const rules: FormRulesMap = {
      phone: [
        { required: true, message: '请输入手机号' },
        { pattern: phonePattern, message: '手机号格式不正确' }
      ],
      password: [{ required: true, message: '请输入密码' }],
      verify_code: [{ required: true, message: '请输入验证码' }]
    }

    const ruleForm: LoginParams = {
      password: '',
      phone: '',
      verify_code: ''
    }

    const admins: Array<AdminRow> = []

    const state = reactive({
      ruleForm,
      rules,
      admins
    })

    // 显示 | 隐藏密码
    const togglePasswordType = () => {
      let type
      if (passwordType.value === 'password') {
        // 显示密码
        type = 'text'
      } else {
        // 隐藏密码
        type = 'password'
      }
      passwordType.value = type
    }

    // 获取验证码
    const getVerifyCode = async () => {
      const { data } = await fetchVerifyCode(randomStr.value)
      if (data) {
        // 转base64图片，通过图片渲染验证码
        verifyCodeBase64Img.value = arrayBufferToBase64Img(data)
      }
    }

    // 生成验证码
    const generateVerifyCode = () => {
      randomStr.value = generateRandomStr(15)
      getVerifyCode()
      // 清空验证码input框内容
      state.ruleForm.verify_code = ''
    }

    onMounted(() => {
      generateVerifyCode()
    })

    // 切换后台
    const switchAdmin = (data: LoginResponse) => {
      const {
        access_token,
        userdata: { phone_to_users }
      } = data

      if (phone_to_users.length === 1) {
        // 该账号只有一个后台，选择第一个后台，直接登录
        store.dispatch('switchAdmin', { payload: { access_token: access_token, admin_id: phone_to_users[0].id } })
      } else {
        // 该账号有多个后台，显示选择后台弹窗
        accessToken.value = access_token
        adminId.value = phone_to_users[0].id
        state.admins = phone_to_users
      }
    }

    // 提交登录
    const onSubmit = () => {
      if (formRef.value) {
        formRef.value.validate(async (valid) => {
          if (valid) {
            const { data, code } = await login({ ...ruleForm, rand: randomStr.value, password: md5(ruleForm.password) })
            if (code === 0 && data) {
              switchAdmin(data)
            } else {
              generateVerifyCode()
            }
          } else {
            return false
          }
        })
      }
    }

    // 取消选择登录后台
    const handleClose = () => {
      accessToken.value = ''
      generateVerifyCode()
    }

    // 确认选择登录后台
    const handleConfirm = () => {
      store.dispatch('switchAdmin', { payload: { access_token: accessToken.value, admin_id: adminId.value } })
    }

    return {
      ...toRefs(state),
      passwordType,
      verifyCodeBase64Img,
      accessToken,
      adminId,
      formRef,
      User,
      Lock,
      Check,
      onSubmit,
      togglePasswordType,
      generateVerifyCode,
      handleClose,
      handleConfirm
    }
  }
})
</script>

<style scoped lang="scss">
.verify_code_img {
  width: 100%;
  height: 40px;
}
.admin_radio {
  display: block;
  width: 100%;
  line-height: 40px;
  margin: 0;
  padding: 0;
}
</style>
