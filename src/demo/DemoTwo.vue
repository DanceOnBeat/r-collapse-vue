<template>
  <r-collapse
    v-model="activeKeys"
    class="collapse-demo"
    activeClass="collapse-demo-active"
    @change="handleChange"
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RCollapse from '@/components/Collapse.vue';
import RCollapsePanel from '@/components/CollapsePanel.vue';

@Component({
  components: {
    RCollapse,
    RCollapsePanel,
  },
})
export default class DemoTwo extends Vue {
  public activeKeys = [];

  public handleChange(newActiveKeys: string[], oldActiveKeys: string[]) {
    console.log('newActiveKeys', newActiveKeys);
    console.log('oldActiveKeys', oldActiveKeys);
  }
}
</script>

<style lang="scss" scoped>
.collapse-demo {
  width: 300px;
  .collapse-demo-panel.collapse-demo-active {
    .collapse-fixed > i {
      transform: scale(0.5) rotate(180deg) !important;
    }
  }
  .collapse-demo-panel {
    .collapse-fixed {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #E4EAFF;
      padding: 10px;
      > i {
        font-size: 12px;
        transform: scale(.5);
        transition: transform .3s;
        cursor: pointer;
      }
    }
    .collapse-content {
      padding: 10px;
    }
  }
}
</style>

