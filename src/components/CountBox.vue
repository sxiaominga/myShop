<template>
  <div class="countbox">
    <button class="mul" @click="mul">-</button>
    <input type="text" class="inp" :value="value" @change="change" />
    <button class="add" @click="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    mul() {
      if (this.value > 1) {
        this.$emit("input", this.value - 1);
      }
    },
    add() {
      this.$emit("input", this.value + 1);
    },
    change(e){
        const num = +e.target.value
        console.log(num)
         // 输入了不合法的文本 或 输入了负值，回退成原来的 value 值
         if(isNaN(num)||num<1)
         {
            e.target.value = this.value
            return
         }
         this.$emit('input',num)
    }
  },
};
</script>

<style lang="less" scoped>
.countbox {
  width: 110px;
  display: flex;
  .mul,
  .add {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>