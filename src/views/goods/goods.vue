<template>
  <div class='goods-container'>
    <transition name="fade">
      <div class="top-nav"
           v-show="showTopNav">
        <div class="back"
             @click="$router.back()">
          <van-icon name="arrow-left" />
        </div>
        <div class="more">
          <van-icon name="ellipsis" />
        </div>
      </div>
    </transition>
    <van-tabs v-model="activeName"
              class="goods-info-nav"
              scrollspy
              sticky
              ref="navTabs">
      <van-tab title="商品"
               name="goods">
        <div class="main-img">
          <van-image class="goods-img"
                     fit="cover"
                     :src="goods.mainPic">
            <template v-slot:loading>
              <van-loading type="spinner"
                           size="100" />
            </template>
          </van-image>
        </div>
        <!-- 标题价格优惠券 -->
        <div class="galaxy-abstract">
          <div class="galaxy-abstract-ps">
            <div class="galaxy-abstract-price">
              ￥<span> {{goods.actualPrice}}</span>
              <span>原价{{goods.originalPrice}}</span>
            </div>
            <div class="galaxy-abstract-sales">已售<span>{{goods.monthSales}}</span>件</div>
          </div>

          <div class="galaxy-abstract-title">
            <span class="tm"></span>
            {{goods.dtitle}}
          </div>
          <div class="galaxy-abstract-features">

          </div>
          <div class="galaxy-abstract-coupon flex-row">
            <div class="galaxy-abstract-coupon-effective flex-row">
              <div class="galaxy-abstract-coupon-amount flex-row">¥<span>{{goods.couponPrice}}</span></div>
              <div class="galaxy-abstract-coupon-deadline flex-column">
                <span>优惠券使用期限</span>
                <span>{{goods.couponStartTime|date}}-{{goods.couponEndTime|date}}</span>
              </div>
            </div>
            <a class="galaxy-abstract-coupon-receive">
              立即领券 </a>
          </div>
        </div>
      </van-tab>
      <van-tab title="评价"
               name="common">
        评价
      </van-tab>
      <van-tab title="详情"
               name="detail">
        详情
      </van-tab>
      <van-tab title="推荐"
               name="recommend">
        推荐
      </van-tab>
      <div slot="nav-left"
           class="wap-nav-placeholder"></div>
      <div slot="nav-left"
           class="wap-nav-wrap"
           @click="$router.back()">
        <van-icon name="arrow-left" />
      </div>
      <div slot="nav-right"
           class="wap-nav-placeholder"></div>
      <div slot="nav-right"
           class="wap-nav-wrap">
        <van-icon name="ellipsis" />
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getGoodsDetails, getSimilerGoods } from '@/api/goods'
import { debounce } from 'lodash'

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
    console.log(this.buyRecords)
  },

  mounted () { },

  methods: {
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
    /* 函数的防抖 */
    handleScroll: debounce(function () {
      /* document.documentElement.scrollTop||document.body.scrollTop;做兼容处理手机端获取的top为0 */
      const top = document.documentElement.scrollTop || document.body.scrollTop
      console.log(top)
      if (top > 66) {
        this.showTopNav = false
        const opacity = top / 52
        const newopacity = opacity > 1 ? 1 : opacity
        document.getElementsByClassName('van-sticky--fixed')[0].style.opacity = newopacity
      } else {
        this.showTopNav = true
        const opacity = top / 44
        const newopacity = opacity > 1 ? 1 : opacity
        document.getElementsByClassName('van-sticky--fixed')[0].style.opacity = newopacity
      }
    }, 200)
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
  /deep/ .van-tabs {
    top: -44px;
    & > div:first-child {
      .van-sticky--fixed {
        opacity: 0;
      }
    }

    .wap-nav-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      padding: 0 10px;
    }
  }
  /deep/ .van-tab__pane,
  .van-tab__pane-wrapper {
    height: 600px;
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
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
