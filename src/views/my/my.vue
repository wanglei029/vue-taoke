<template>
  <div class='my-container'>
    <div v-if="user">
      <div>{{user}}</div>
      <van-button type="danger"
                  @click="logout">退出登录</van-button>
    </div>
    <div v-else>
      <h1>未登录</h1>
      <van-button type="danger"
                  @click="$router.push('login')">登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'my',
  props: {},
  components: {},
  data () {
    return {

    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  created () { },

  mounted () { },

  methods: {
    logout () {
      console.log('退出登录')
      this.delCurrentUser()
    },
    ...mapActions({ delCurrentUser: 'delCurrentUser' })
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.my-container {
}
</style>
