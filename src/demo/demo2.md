***

* 可通过defaultClickAction控制点击fixed区域是否伸缩内容
* 配合fixed作用域插槽暴露的toggle、open、close方法自定义点击行为

```vue
<template>
  <r-collapse
    v-model="activeKeys"
    class="collapse-demo"
    activeClass="collapse-demo-active"
  >
    <r-collapse-panel
      name="one"
      class="collapse-demo-panel"
      :defaultClickAction="false"
    >
      <template
        v-slot:fixed="{
          toggle
        }"
      >
        <div class="collapse-fixed">
          <div>只能通过右边的icon展开我</div>
          <i class="iconfont iconzhankaix" @click="toggle"></i>
        </div>
      </template>
      <div class="collapse-content">这是展开的内容</div>
    </r-collapse-panel>
  </r-collapse>
</template>

<script>
export default {
  data() {
    return {
      activeKeys: []
    }
  }
}
</script>

<style scoped>
.collapse-demo {
  width: 300px;
}
.collapse-demo-panel.collapse-demo-active .collapse-fixed i  {
  transform: scale(0.5) rotate(180deg) !important;
}
.collapse-demo-panel .collapse-fixed {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #E4EAFF;
  padding: 10px;
}
.collapse-demo-panel .collapse-fixed i {
  font-size: 12px;
  transform: scale(.5);
  transition: transform .3s;
  cursor: pointer;
}
.collapse-demo-panel .collapse-content {
  padding: 10px;
}
</style>


```