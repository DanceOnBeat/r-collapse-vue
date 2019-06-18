***

* 必须使用Collapse包含CollapsePanel
* 需给Collapse传入v-model用来控制展开的数据
* CollapsePanel中通过slot="fixed"定义固定头，默认slot为可伸缩的内容区域
* 可通过activeClass指定展开状态的类名，方便对样式进行区别
* 组件只提供了伸缩相关的逻辑，样式相关的完全交给开发者定制

```vue
<template>
  <r-collapse
    v-model="activeKeys"
    class="collapse-demo"
    activeClass="collapse-demo-active"
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
</style>
```