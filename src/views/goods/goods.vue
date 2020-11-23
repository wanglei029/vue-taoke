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
            <a class="galaxy-abstract-coupon-receive"
               :href="goods.couponLink">
              立即领券 </a>
          </div>
        </div>
      </van-tab>
      <van-tab title="评价"
               name="common">
        <van-cell title="达人推荐"
                  icon="manager"
                  :value='`分享${goods.hotPush}次`' />
        <div class="galaxy-talent-content">{{goods.desc}}</div>
      </van-tab>
      <van-tab title="详情"
               name="detail">
        <!-- 店铺信息 -->
        <div class="galaxy-store flex-row">
          <img :src="goods.shopLogo?goods.shopLogo:'https://img.alicdn.com/imgextra//3f/c1/TB1oOwUazqhSKJjSspnSuw79XXa.jpg'">
          <div class="galaxy-store-info flex-column">
            <div class="galaxy-store-info-header flex-row">
              <div class="galaxy-store-info-title">{{goods.shopName}}</div>
              <div class="galaxy-store-info-into">
                <a class="coming"
                   href="javascript:void(0)">进店逛逛</a>
                <a class="all"
                   href="javascript:void(0)"> 全部商品 </a>
              </div>
            </div>
            <div class="galaxy-store-info-score flex-row"> <span>描述：4.8<i class="high-score">高</i></span> <span>卖家：4.8<i class="high-score">高</i></span> <span>物流：4.8<i class="high-score">高</i></span> </div>
          </div>
        </div>
        <!-- 详情图 -->
        <van-collapse v-model="activeDetail">
          <van-collapse-item title="商品详情"
                             name="detail">
            <van-image class="detail-pic"
                       v-for="(img,index) in detailPics"
                       :key="index"
                       :src="img.img"
                       fit="contain" />
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="推荐"
               name="recommend">
        <goods-list :list='similerGoods'></goods-list>
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
    <van-goods-action>
      <!-- class="iconfont"
                  class-prefix='icon'
                  slot="icon"
                  slot-scope="props"
                  :name="props.active ?'home-fill':'home1'" -->
      <van-goods-action-icon @click="$router.push('/')">
        <span class="icon icon-home-fill"
              :style="{color:'#333'}"
              slot="icon"></span>
        <span>首页</span>
      </van-goods-action-icon>
      <!-- <van-goods-action-icon icon="home"
                             text="首页"
                             color="#07c160" /> -->
      <van-goods-action-icon icon="cart-o"
                             text="购物车" />
      <van-goods-action-icon :icon="isFavorite (goods)?'star':'star-o'"
                             :text="isFavorite (goods)?'已收藏':'未收藏'"
                             @click="toggleFavorite(goods)"
                             color="#ff5000" />
      <van-goods-action-button type="warning"
                               :text="isFavorite (goods)?'取消收藏':'添加收藏'"
                               :loading="isFavoriteLoading"
                               @click="toggleFavorite(goods)" />
      <van-goods-action-button type="danger"
                               text="领券购买"
                               :url="goods.couponLink" />
    </van-goods-action>
  </div>
</template>

<script>
import { getGoodsDetails, getSimilerGoods } from '@/api/goods'
import { debounce } from 'lodash'
import GoodsList from './similer-goods'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Goods',
  props: {},
  components: { GoodsList },
  data () {
    return {
      activeDetail: [],
      activeName: 'goods',
      goods: {},
      detailPics: [],
      similerGoods: [],
      showTopNav: true,
      isFavoriteLoading: false // 是否收藏中状态
    }
  },
  filters: {
    date (date) {
      const oldDate = new Date(date)
      return `${oldDate.getFullYear()}.${oldDate.getMonth() + 1}.${oldDate.getDate()}`
    }
  },
  computed: {
    ...mapGetters([
      'favoriteList'
    ])
  },

  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.loadGoodsDetails()
    this.loadSimilerGoods()
  },

  mounted () { },

  methods: {
    async loadGoodsDetails () {
      console.log('获取商品详情', this.$route.params)
      const params = this.$route.params
      const { data } = await getGoodsDetails(params)
      this.goods = data.data
      this.detailPics = JSON.parse(data.data.detailPics)
    },
    async loadSimilerGoods () {
      const params = this.$route.params
      console.log('获取相似好物', { id: this.$route.params.id })
      const { data } = await getSimilerGoods({ id: this.$route.params.id })
      this.similerGoods = data.data
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
    }, 200),
    toggleFavorite (goods) {
      this.isFavoriteLoading = true
      console.log(this.isFavorite(goods))
      if (this.isFavorite(goods)) {
        // 已经关注就取消收藏
        this.deleteFavoriteList(goods)
      } else {
        // 未关注就添加收藏
        this.saveFavoriteList(goods)
      }
      // this.article.is_followed = !this.article.is_followed
      this.isFavoriteLoading = false
    },
    /* 查看当前商品是否在favoriteList中 */
    isFavorite (goods) {
      const index = this.favoriteList.findIndex((item) => {
        return item.goodsId === goods.goodsId
      })
      /* 如果index大于-1说明当前商品已经被收藏了 */
      return index > -1
    },
    ...mapActions(['saveFavoriteList', 'deleteFavoriteList'])
  },

  watch: {
    '$route' (to, from) {
      this.loadGoodsDetails()
      this.loadSimilerGoods()
      document.documentElement.scrollTop =
        document.body.scrollTop = 0
    }
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
    // height: 600px;
    background: #fff;
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
  /* 主图下方 价格标题 */
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
  /* 评价 */
  .galaxy-talent-content {
    background: #f4f4f4;
    border-radius: 10px;
    padding: 8px 18px;
    margin-top: 10px;
    position: relative;
    color: #555;
    line-height: 18px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    &::after {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      top: -10px;
      left: 51px;
      border-bottom: 12px solid #f4f4f4;
      border-right: 20px solid #fff;
      z-index: 8;
      transform: rotate(-10deg);
    }
  }
  /* 店铺信息 */
  .galaxy-store {
    padding: 10px;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 52px;
      height: 52px;
      border-radius: 5px;
      flex-basis: 52px;
    }
    .galaxy-store-info {
      flex: 1;
      height: 52px;
      box-sizing: border-box;
      padding-left: 8px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      align-items: stretch;
      .galaxy-store-info-header {
        justify-content: space-between;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .galaxy-store-info-title {
          height: 20px;
          font-size: 13px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333;
          line-height: 20px;
        }
        .galaxy-store-info-into {
          display: flex;
          justify-content: space-between;
          align-items: center;
          a:first-child {
            width: 58px;
            height: 22px;
            line-height: 22px;
            font-size: 11px;
            color: #fe3738;
            border: 1px solid #fe3738;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
          }
          a {
            text-decoration: none;
            text-align: center;
            border-radius: 11px;
            display: inline-block;
          }
          a:last-child {
            width: 60px;
            height: 24px;
            line-height: 24px;
            background: linear-gradient(90deg, #ff5050 0, #ff345d 100%);
            font-size: 11px;
            color: #fff;
            margin-left: 10px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
          }
        }
      }
      .galaxy-store-info-score {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        span {
          display: inline-flex;
          align-items: center;
          height: 18px;
          font-size: 12px;
          color: #888;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          &:nth-child(n + 2) {
            margin-left: 14px;
          }
          i {
            margin-left: 4px;
            display: inline-block;
            width: 13px;
            height: 13px;
            line-height: 13px;
            text-align: center;
            background: #f0f0f0;
            border-radius: 3px;
            font-style: normal;
            font-size: 9px;
          }
          i.high-score {
            background: #fa2435;
            color: #fff;
          }
        }
      }
      .galaxy-talent-title {
        justify-content: space-between;
      }
    }
  }
  /* 详情图 解决自适应高度的div里放置图片在下方会有一点空白距离*/
  .detail-pic {
    display: block;
    img {
      vertical-align: middle;
      width: 100%;
      background: rgb(245, 245, 245);
      display: inline;
    }
  }
}
</style>
