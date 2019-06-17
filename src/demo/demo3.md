***

* 通过accordion开启手风琴模式

```vue
<template>
  <r-collapse
    v-model="activeKeys"
    class="collapse-demo"
    activeClass="collapse-demo-active"
    :accordion="true"
  >
    <r-collapse-panel name="one" class="collapse-demo-panel">
      <template slot="fixed">
        <div class="collapse-fixed">
          <div>我是Panel 1</div>
          <i class="iconfont iconzhankaix"></i>
        </div>
      </template>
      <div class="collapse-content">这是Panel 1的内容</div>
    </r-collapse-panel>
    <r-collapse-panel
      name="two"
      class="collapse-demo-panel"
    >
      <template slot="fixed">
        <div class="collapse-fixed">
          <div>我是Panel 2</div>
          <i class="iconfont iconzhankaix"></i>
        </div>
      </template>
      <div class="collapse-content">这是Panel 2的内容</div>
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
  cursor: pointer;
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
.collapse-demo-panel:nth-of-type(n + 2) {
  margin-top: 10px;
}
</style>


```