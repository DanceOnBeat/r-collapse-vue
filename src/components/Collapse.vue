<template>
  <div>
    <!-- @slot 用来包裹CollapsePanel以控制所有Panel的行为 -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class RCollapse extends Vue {
  /**
   * 可用v-model代替，如[name]，name为CollapsePanel指定的唯一标识
   * @model
   */
  @Prop({
    type: Array,
    required: true,
  })
  public value!: string[];

  /**
   * 展开状态的自定义类名
   */
  @Prop({
    type: String,
    default: 'r-collapse-panel-active',
  })
  public activeClass!: string;

  /**
   * 是否开启手风琴模式
   */
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
    /**
     * 可用v-model代替
     */
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
    /**
     * 通过调用API或是点击修改伸缩状态后触发，
     * 返回两个参数，第一个是change后的值，第二个是change前的值
     * @type {string[]}
     */
    this.$emit('change', tmp, this.value);
  }

  public mounted() {
    this.$on('r.collapse.open', this.handlePanelOpen);
    this.$on('r.collapse.close', this.handlePanelClose);
  }
}
</script>
