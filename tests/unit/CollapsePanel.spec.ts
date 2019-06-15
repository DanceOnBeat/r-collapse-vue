import { shallowMount } from '@vue/test-utils';
import CollapsePanel from '@/components/CollapsePanel.vue';

describe('CollapsePanel.vue', () => {
  it('传入name则innerName为name，否则生成一个随机字符串', () => {
    const wrapper = shallowMount(CollapsePanel, {
      propsData: {
        name: 'a',
      },
    });
    expect((wrapper.vm as any).innerName).toBe('a');
  });

  it('根据父组件的activeKeys是否包含自身的name判断status状态', () => {
    const wrapper = shallowMount(CollapsePanel, {
      propsData: {
        name: 'a',
      },
      computed: {
        activeKeys() {
          return ['a', 'b'];
        },
      },
    });
    expect((wrapper.vm as any).status).toBeTruthy();
  });

  it('当status为true时，给根节点添加自定义类名，默认为r-collapse-panel-active', () => {
    const wrapper = shallowMount(CollapsePanel, {
      computed: {
        status() {
          return true;
        },
      },
    });
    expect(wrapper.classes('r-collapse-panel-active')).toBeTruthy();
  });

  it('defaultClickAction为false时，点击fixed部分无效', () => {
    const wrapper = shallowMount(CollapsePanel, {
      propsData: {
        defaultClickAction: false,
      },
    });
    wrapper.find('.r-collapse-panel-fixed').trigger('click');
    expect((wrapper.vm as any).status).toBeFalsy();
  });
});
