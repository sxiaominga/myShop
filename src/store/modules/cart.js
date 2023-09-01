import { getCartList, changeCount, delSelect } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state() {
    return {
      cartList: []
    }
  },
  mutations: {
    //提供一个设置cartList的mutation
    setCartList(state, newList) {
      state.cartList = newList
    },
    toggleCheck(state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    //全选控制单选
    toggleAllCheck(state, newValue) {
      state.cartList.forEach(item => {
        item.isChecked = newValue
      })
    },
    //数字框修改数量
    // changeCount(state, { goodsId, goodsNum }) {
    //   const goods = state.cartList.find(item => item.goods_id === goodsId)
    //   goods.goods_num = goodsNum
    // }
  },
  //actions主要用于处理异步任务的请求
  actions: {
    async getCartAction(context) {
      const { data } = await getCartList()
      //console.log(res)
      //后台返回的数据中，不包含复选框的选中状态，为了实现将来的功能
      //需要手动维护数据，给每一项，添加一个isChecked状态(标记当前商品是否选中)
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction(context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      //先本地修改
      //context.commit('changeCount', { goodsId, goodsNum })
      //提交到后台
      const res = await changeCount(goodsId, goodsNum, goodsSkuId)
      context.dispatch('getCartAction')
      //console.log(res)
    },
    async delAction(context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功')
      //删除成功之后重新拉取数据
      context.dispatch('getCartAction')

    }
  },
  //封装 getters：商品总数  / 选中的商品列表  /   选中的商品总数  /   选中的商品总价
  getters: {
    //求所有商品累加总数
    cartTotal(state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    //选中商品项----数组
    selCartList(state) {
      return state.cartList.filter(item => item.isChecked)
    },
    //选中总数
    selCount(state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    //选中商品总价
    selPrice(state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    //是否全选
    //单选控制全选
    isAllChecked(state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
