<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class RCollapse extends Vue {
  @Prop({
    type: Array,
    required: true,
  })
  public value!: string[];

  // 展开时添加的类名
  @Prop({
    type: String,
    default: 'r-collapse-panel-active',
  })
  public activeClass!: string;

  // 手风琴模式
  @Prop({
    type: Boolean,
    default: false,
  })
  public accordion!: boolean;

  @Watch('value', { immediate: true })
  public onValueChanged(val: string[], oldVal: string[]) { // 手风琴模式只打开一项
    if (this.accordion && val.length > 1) {
      this.$emit('input', [val[0]]);
    }
  }

  public handlePanelOpen(key: string) {
    let newArr = [];
    if (this.accordion) {
      newArr = [key];
    } else {
      newArr = [
        ...this.value,
        key,
      ];
    }
    this.$emit('input', newArr);
    this.$emit('change', newArr, this.value);
  }

  public handlePanelClose(key: string) {
    const tmp: string[] = [];
    this.value.forEach((item) => {
      if (item !== key) {
        tmp.push(item);
      }
    });
    this.$emit('input', tmp);
    this.$emit('change', tmp, this.value);
  }

  public mounted() {
    this.$on('r.collapse.open', this.handlePanelOpen);
    this.$on('r.collapse.close', this.handlePanelClose);
  }
}
</script>
