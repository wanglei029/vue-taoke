<template>
  <div class='container'>
    <van-nav-bar title="登录/注册"
                 class="app-nav-bar"
                 @click-left="$router.back()"
                 left-arrow />
    <van-form @submit="onLogin"
              :show-error="false"
              :show-error-message="false"
              validate-first
              ref="login-form"
              @failed="onFailed">
      <van-field v-model="user.mobile"
                 center
                 icon-prefix="icon"
                 left-icon="shouji"
                 right-icon="warning-o"
                 name="mobile"
                 placeholder="请输入手机号"
                 :rules="formRules.mobile" />
      <van-field v-model="user.code"
                 center
                 icon-prefix="icon"
                 left-icon="yanzhengma"
                 name="code"
                 placeholder="请输入验证码"
                 :rules="formRules.code">
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn"
                    @click="onLogin"
                    block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'login',
  props: {},
  components: {},
  data () {
    return {
      user: {
        mobile: '13922222222',
        code: '246810'
      },
      /* 表单验证规则 */
      formRules: {
        mobile: [
          { required: true, message: '请输入正确内容' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入正确密码' },
          { pattern: /^\d{6}$/, message: '密码错误' }
        ]
      }
    }
  },

  computed: {
    // ...mapGetters(['user'])
  },

  created () { },

  mounted () { },

  methods: {
    onLogin () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // const { data } = await login(this.user)
        this.$toast.success('登录成功')
        /* 将后端返回的用户登录状态放到vuex中 */
        // console.log(data)
        this.saveCurrentUser(this.user)
        // 清除layout缓存
        // this.removeCachePage('Layout')
        /* 有缺点 */
        // this.$router.back()
        // this.$router.push(this.$route.query.redirect)
        if (this.$route.query.redirect) {
          console.log('返回', this.$route.query.redirect)
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        Toast.fail('登录失败')
      }
    },
    /* 表单验证失败 */
    onFailed (err) {
      if (err.errors[0]) {
        this.$toast(
          {
            message: err.errors[0].message,
            position: 'top'
          }
        )
      }
      console.log(err)
    },
    // ...mapMutations({
    //   setUser: 'SET_USER'
    // }),
    ...mapActions({ saveCurrentUser: 'saveCurrentUser' })

  },

  watch: {}

}

</script>
<style lang='less' scoped>
.container {
  .send-btn {
    width: 76px;
    height: 23px;
  }

  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      border-radius: 15px;
      border: none;
      background-image: linear-gradient(to bottom, #fe204a, #fe3b35);
      .van-button__text {
        font-size: 15px;
        color: #fff;
      }
    }
  }
}
</style>
