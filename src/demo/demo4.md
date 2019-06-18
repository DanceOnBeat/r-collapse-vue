***

* 可支持嵌套的场景

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
      <r-collapse
        v-model="subActiveKeys"
        class="sub-collapse-demo"
        activeClass="sub-collapse-demo-active"
      >
        <r-collapse-panel name="sub-two">
          <template slot="fixed">
            <div class="sub-collapse-fixed">
              <div>我是Panel 1-1</div>
              <i class="iconfont iconzhankaix"></i>
            </div>
          </template>
          <div class="sub-collapse-content">这是Panel 1-1的内容</div>
        </r-collapse-panel>
      </r-collapse>
    </r-collapse-panel>
  </r-collapse>
</template>

<script>
export default {
  data() {
    return {
      activeKeys: [],
      subActiveKeys: []
    }
  }
}
</script>

<style lang="scss" scoped>
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
.sub-collapse-demo-active .sub-collapse-fixed i {
  transform: scale(0.5) rotate(180deg) !important;
}
.sub-collapse-fixed {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #F3F6FF;
  padding: 10px;
}
.sub-collapse-fixed i {
  font-size: 12px;
  transform: scale(.5);
  transition: transform .3s;
  cursor: pointer;
}
.sub-collapse-content {
  padding: 10px 20px;
}
</style>


```