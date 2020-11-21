<template>
  <div class='goods-container'>
    <!-- <transition name="fade"> -->
    <div class="top-nav"
         v-if="showTopNav">
      <div class="back"
           @click="$router.back()">
        <van-icon name="arrow-left" />
      </div>
      <div class="more">
        <van-icon name="ellipsis" />
      </div>
    </div>
    <!-- </transition> -->
    <!-- <transition name="fade"> -->
    <div class="goods-info-nav"
         id="goods-info-nav"
         v-if="!showTopNav">
      <div @click='jumpto("goods")'>商品</div>
      <div @click='jumpto("common")'>评价</div>
      <div @click='jumpto("detail")'>详情</div>
      <div @click='jumpto("recommend")'>推荐</div>
    </div>
    <!-- </transition> -->
    <div id='goods'
         class="goods">商品</div>
    <div id='common'
         class="goods">评价</div>
    <div id='detail'
         class="goods">详情</div>
    <div id='recommend'
         class="goods">推荐</div>
  </div>
</template>

<script>
import { getGoodsDetails, getSimilerGoods } from '@/api/goods'

export default {
  name: 'Goods',
  props: {},
  components: {},
  data () {
    return {
      activeName: 'goods',
      goods: {},
      showTopNav: true
    }
  },
  filters: {
    date (date) {
      const oldDate = new Date(date)
      return `${oldDate.getFullYear()}.${oldDate.getMonth() + 1}.${oldDate.getDate()}`
    }
  },
  computed: {},

  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.loadGoodsDetails()
  },

  mounted () { },

  methods: {
    jumpto (id, e) {
      const tab = document.getElementById(id)
      console.log(tab.offsetTop)
      window.scrollTo(0, tab.offsetTop - 44)
    },
    async loadGoodsDetails () {
      // console.log(this.$route)
      const params = this.$route.params
      const { data } = await getGoodsDetails(params)
      this.goods = data.data
      const similer = await getSimilerGoods({ id: this.$route.params.id })
      console.log(data)
      console.log(similer)
    },
    onClickLeft () {
      this.$toast('返回')
    },
    onClickRight () {
      this.$toast('按钮')
    },
    handleScroll () {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      const div = document.getElementById('goods-info-nav')
      console.log(top)
      console.log(div)
      if (top > 66) {
        this.showTopNav = false
      } else {
        this.showTopNav = true
      }
    }
  },

  watch: {
  }

}

</script>
<style lang='less' scoped>
.goods-container {
  .top-nav {
    width: 100%;
    height: 46px;
    padding: 0 10px;
    box-sizing: border-box;
    position: fixed;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .back,
    .more {
      width: 30px;
      height: 30px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      font-size: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .goods-info-nav {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    font-size: 16px;
    color: #333;
    background: #fff;
  }
  .goods {
    height: 600px;
  }

  /deep/ .main-img {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    .goods-img {
      .van-image__img {
        width: 100%;
      }
    }
  }
  // /deep/.van-notice-bar {
  //   width: 60%;
  //   height: 25px;
  //   top: -50px;
  //   background-color: rgba(0, 0, 0, 0.4);
  //   color: #fff;
  //   margin-left: 15px;
  //   border-radius: 10px;
  // }
  // .notice-swipe {
  //   height: 40px;
  //   line-height: 40px;
  // }
  .galaxy-abstract {
    border-top: 1px solid #eaeaea;
    border-radius: 0 0 10px 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 5px 10px 12px;
    background: #fff;
    .galaxy-abstract-ps {
      height: 38px;
      line-height: 38px;
      align-items: baseline;
      justify-content: space-between;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .galaxy-abstract-price {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        height: 38px;
        color: #f91415;
        span:first-child {
          font-size: 27px;
          display: inline-block;
        }
        span:last-child {
          padding-left: 6px;
          text-decoration: line-through;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #888;
        }
      }
      .galaxy-abstract-sales {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #888;
        span {
          color: #f91415;
        }
      }
    }
    .galaxy-abstract-title {
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333;
      line-height: 20px;
      margin-top: 12px;
      overflow: hidden;
      padding-bottom: 10px;

      span {
        padding-left: 30px;
        margin-right: 5px;
        font-size: 16px;
        position: relative;
        z-index: 1;
        zoom: 1;
        top: -1px;
        font-weight: 400;
        color: #333;
      }
      span.tm {
        background: url("./lable-icon-02.png") left center no-repeat;
        background-size: 30px;
      }
    }
    .galaxy-abstract-features {
      margin-bottom: 15px;
    }
    .galaxy-abstract-coupon {
      height: 65px;
      background: linear-gradient(270deg, #fee 0, #ffe2e8 100%);
      border-radius: 10px;
      box-sizing: border-box;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .galaxy-abstract-coupon-effective {
        flex: 1;
        height: 35px;
        padding: 15px 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        .galaxy-abstract-coupon-amount {
          height: 35px;
          line-height: 35px;
          padding: 0 20px;
          font-size: 15px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ff313e;
          align-items: baseline;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;
        }
        .galaxy-abstract-coupon-deadline {
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: stretch;
          span:first-child {
            height: 18px;
            font-size: 13px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ff313e;
            line-height: 18px;
          }
          span:last-child {
            height: 16px;
            font-size: 11px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ff313e;
            line-height: 16px;
          }
        }
      }
      .galaxy-abstract-coupon-receive {
        padding: 15px 0;
        flex: 0 0 115px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-size: 14px;
        color: #ff313e;
        text-decoration: none;
        border-left: 1px dashed #fff;
        position: relative;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        &::after,
        &::before {
          content: "";
          background: #fff;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          position: absolute;
          left: -6px;
          top: -6px;
          z-index: 8;
        }
        &::after {
          top: 60px;
        }
      }
    }
  }
}
</style>
