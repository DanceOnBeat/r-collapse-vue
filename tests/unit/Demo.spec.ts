import { mount } from '@vue/test-utils';
import Demo from '@/demo/app.vue';
import CollapsePanel from '@/components/CollapsePanel.vue';

describe('Demo.vue', () => {
  it('CollapsePanel初始化时会获取父Collapse组件的实例', () => {
    const demo = mount(Demo);
    const panel = demo.find(CollapsePanel);
    panel.vm.$mount();
    expect(panel.vm.$data.parent.$options.name).toBe('RCollapse');
  });

  it('点击CollapsePanel会触发伸展/收缩', () => {
    const demo = mount(Demo);
    const panel = demo.find(CollapsePanel);
    panel.find('.r-collapse-panel-fixed').trigger('click');
    expect((panel.vm as any).status).toBeTruthy();
    panel.find('.r-collapse-panel-fixed').trigger('click');
    expect((panel.vm as any).status).toBeFalsy();
  });
});
