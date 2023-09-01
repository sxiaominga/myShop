<template>
  <div class="login">
    <van-nav-bar title="标题" left-arrow @click-left="$router.back()" />
    <div class="container">
      <div class="title">
        <h3>手机登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input
            v-model="mobile"
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            v-model="picCode"
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
          />
          <img
            :src="picUrl"
            alt="图片加载失败"
            @click="getPicCode"
            v-if="picUrl"
          />
        </div>
        <div class="form-item">
          <input
            v-model="msgCode"
            class="inp"
            placeholder="请输入短信验证码"
            type="text"
          />
          <button @click="getCode">
            {{
              second === totalSecond ? "获取验证码" : second + `秒后重新发送`
            }}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>
  
<script>
import { getMsgCode, getPicCode ,codeLogin} from "@/api/login";
export default {
  name: "LoginIndex",
  data() {
    return {
      msgCode: "",
      picCode: "", //用户输入的图形验证码
      mobile: "", // 手机号
      picKey: "", //将来请求传递的图形验证码的标识
      picUrl: "", //存储请求渲染的图片地址
      totalSecond: 5, // 总秒数
      second: 5, // 倒计时的秒数
      timer: null, // 定时器 id
    };
  },
 async created() {
    this.getPicCode();
  },
  methods: {
    //获取图形验证码
    async getPicCode() {
      const {
        data: { base64, key },
      } = await getPicCode();
      this.picUrl = base64;
      this.picKey = key;
    },
    //校验手机号，图形验证码是否合法
    validFn() {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {//第一个数字为1，第二个数字为3-9，后面再加9位
        this.$toast("请输入正确的手机号");
        return false;
      }
      if (!/^\w{4}$/.test(this.picCode)) {//匹配满足大小写的四个字符
        this.$toast("请输入正确的图形验证码");
        return false;
      }
      return true;
    },
    //获取短信验证码
     async getCode() {
      if (this.validFn()) {
        //发送请求
      await getMsgCode(this.picCode, this.picKey, this.mobile);
        this.$toast("发送成功，请注意查收");
        //当前没有定时器，且totalSecond和second一致才可以倒计时
        if (!this.timer && this.second === this.totalSecond) {
          //开启倒计时
          this.timer = setInterval(() => {
            this.second--;
            if (this.second <= 0) {
              clearInterval(this.timer);
              this.timer = null; //重置定时器id
              this.second = this.totalSecond;
            }
          }, 1000);
        }
      }
    },
    //登录校验
    async login() {
      //为了防止在登录前用户更改了前面的内容
      if (!this.validFn()) {
        return;
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast("请输入正确的手机验证码");
        return;
      }
      const res = await codeLogin(this.mobile, this.msgCode);
      this.$store.commit('user/setUserInfo',res.data)
      //console.log(res)
      //判断有无回跳地址
      const url = this.$route.query.backUrl || '/'

      this.$router.replace(url);
      this.$toast("登录成功");
    },
  },
  destroyed() {
    //离开页面销毁定时器
    clearInterval(this.timer);
  },
};
</script>
  
<style lang="less" scoped>
.container {
  padding: 49px 29px; //上下49px，左右29px
  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }
  .form-item {
    //border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }
  .login-btn {
    height: 42px;
    width: 100%;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>