import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EventMixin extends Vue {
  /**
   * 子组件向嵌套的父组件分发事件
   * @param componentName vue组件名称
   * @param eventName 要分发的事件名称
   * @param params 事件携带的参数
   */
  public dispatch(componentName: string, eventName: string, params: any[]) {
    let parent = this.$parent || this.$root;
    let name = parent.$options.name;

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;
      if (parent) {
        name = parent.$options.name;
      }
    }

    if (parent) {
      parent.$emit.apply(parent, [eventName, ...params]);
    }
  }
}
