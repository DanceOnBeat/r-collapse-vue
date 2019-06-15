<template>
  <div
    class="r-collapse-panel"
    :class="status ? activeClass : ''"
  >
    <div class="r-collapse-panel-fixed" @click="handleFixedClick">
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
  @Prop({
    type: String,
  })
  public name!: string;

  // 默认点击fixed能够切换panel状态
  @Prop({
    type: Boolean,
    default: true,
  })
  public defaultClickAction!: boolean;

  get innerName(): string {
    return this.name || Math.random().toString(32).substr(2);
  }

  // 当前展开的panel集合
  get activeKeys(): string[] {
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

  public toggle() {
    if (this.status) {
      this.close();
    } else {
      this.open();
    }
  }

  public open() {
    this.dispatch('RCollapse', 'r.collapse.open', [this.innerName]);
  }

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
    const children = el.children;
    if (children) {
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

