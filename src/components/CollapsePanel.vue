<template>
  <div
    class="r-collapse-panel"
    :class="status ? activeClass : ''"
  >
    <div class="r-collapse-panel-fixed" @click="handleFixedClick">
      <!-- @slot 固定头部，是一个作用域插槽，可提供toggle、open、close方法 -->
      <slot
        name="fixed"
        :toggle="toggle"
        :open="open"
        :close="close"
      >
      </slot>
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @afterEnter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div v-show="status" class="r-collapse-panel-content">
        <!-- @slot 自定义可伸缩内容的区域 -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator';
import Collapse from './Collapse.vue';
import EventMixin from '@/mixins/event';

@Component
export default class RCollapsePanel extends Mixins(EventMixin) {
  /**
   * 唯一标识，不指定会随机生成
   */
  @Prop({
    type: String,
  })
  public name!: string;
  /**
   * 默认点击fixed能够伸缩内容区域
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  public defaultClickAction!: boolean;

  get innerName(): string {
    return this.name || Math.random().toString(32).substr(2);
  }

  get activeKeys(): string[] { // 当前展开的panel集合
    if (this.parent) {
      return this.parent.value;
    }
    return [];
  }

  get activeClass(): string {
    if (this.parent) {
      return this.parent.activeClass;
    }
    return 'r-collapse-panel-active';
  }

  get status(): boolean { // panel的展开状态
    return this.activeKeys.includes(this.innerName);
  }

  public parent: Collapse | null = null;

  public handleFixedClick() {
    if (this.defaultClickAction) {
      this.toggle();
    }
  }

  /**
   * 切换伸缩状态
   * @public
   */
  public toggle() {
    if (this.status) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * 将内容展开
   * @public
   */
  public open() {
    this.dispatch('RCollapse', 'r.collapse.open', [this.innerName]);
  }

  /**
   * 将内容收起
   * @public
   */
  public close() {
    this.dispatch('RCollapse', 'r.collapse.close', [this.innerName]);
  }

  public beforeEnter(el: HTMLElement) {
    el.style.height = '0';
  }

  public enter(el: HTMLElement) {
    el.style.height = this.getContentHeihgt(el);
  }

  public afterEnter(el: HTMLElement) {
    el.style.height = '';
  }

  public beforeLeave(el: HTMLElement) {
    el.style.height = this.getContentHeihgt(el);
  }

  public leave(el: HTMLElement) {
    // 修复before-leave与leave在同一帧中被修改height导致无动画
    setTimeout(() => {
      el.style.height = '0';
    }, 0);
  }

  public afterLeave(el: HTMLElement) {
    el.style.height = '';
  }

  public getContentHeihgt(el: HTMLElement): string {
    if (el.scrollHeight) {
      return el.scrollHeight + 'px';
    }
    return '';
  }

  public mounted() {
    // 获取Collapse的实例
    let p = this.$parent;
    while (p) {
      if (p && p.$options.name !== 'RCollapse') {
        p = p.$parent;
      } else {
        this.parent = p as Collapse;
        return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.r-collapse-panel {
  .r-collapse-panel-content {
    overflow: hidden;
    transition: height .3s;
  }
}
</style>

