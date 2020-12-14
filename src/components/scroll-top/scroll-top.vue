<template>
  <div class='scroll-top-container'
       id="back"
       @click="backTop">
    <span class="icon icon-weibiaoti33"></span>
    <!-- @mousedown="mouseMove"
       @mousemove="mouseMove" -->
  </div>
</template>

<script>

export default {
  name: 'scroll-top',
  props: {},
  components: {},
  data () {
    return {
      canMove: false
    }
  },

  computed: {},

  created () { },

  mounted () {
    // window.addEventListener('mousemove', () => {
    //   console.log('鼠标移动')
    //   if (this.canMove) {
    //     console.log('鼠标移动')
    //   }
    // })
  },

  methods: {
    backTop () {
      this.$emit('backTop')
    },
    mouseMove () {
      this.canMove = true
      console.log(this.canMove)
      const back = document.getElementById('back')
      // 当鼠标在back上按下时
      back.addEventListener('mousedoup', () => { this.canMove = false })
      back.onmousedown = function () { }
      // 打卡开关
      // 当鼠标在窗口中移动时
      // 改变back的位置
      // 当鼠标在back上抬起时
      // 关闭开关
    }

  },

  watch: {}

}

</script>
<style lang='less' scoped>
.scroll-top-container {
  position: fixed;
  right: 10px;
  bottom: 60px;
  z-index: 10;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    font-size: 24px;
    color: #fff;
  }
}
</style>
