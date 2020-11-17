<template>
  <div class='goods-list-container'>
    goods-list {{channel}}
  </div>
</template>

<script>

export default {
  name: 'goods-list',
  props: {
    channel: {
      type: Object,
      required: true,
      default: () => { return {} }
    }
  },
  components: {},
  data () {
    return {

    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {},

  watch: {}

}

</script>
<style lang='less' scoped>
.goods-list-container {
}
</style>
