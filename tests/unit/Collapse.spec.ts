import { shallowMount } from '@vue/test-utils';
import Collapse from '@/components/Collapse.vue';

describe('Collapse.vue', () => {
  it('触发r.collapse.open事件，将参数添加到value属性的数组中，随后携带新的数组触发input事件，并触发change事件，参数为新旧value的值', () => {
    const wrapper = shallowMount(Collapse, {
      propsData: {
        value: [],
      },
    });
    wrapper.vm.$emit('r.collapse.open', 'a');
    expect(wrapper.emitted().input[0]).toEqual([['a']]);
    expect(wrapper.emitted().change[0]).toEqual([['a'], []]);
  });

  it('触发r.collapse.close事件, 将参数从value属性的数组中删除，随后新的数组触发input事件，并触发change事件，参数为新旧value的值', () => {
    const wrapper = shallowMount(Collapse, {
      propsData: {
        value: ['a', 'b'],
      },
    });
    wrapper.vm.$emit('r.collapse.close', 'a');
    expect(wrapper.emitted().input[0]).toEqual([['b']]);
    expect(wrapper.emitted().change[0]).toEqual([['b'], ['a', 'b']]);
  });

  it('accordion为true，value传入多项时，默认只展开第一项', () => {
    const wrapper = shallowMount(Collapse, {
      propsData: {
        value: ['a', 'b'],
        accordion: true,
      },
    });
    expect(wrapper.emitted().input[0]).toEqual([['a']]);
  });

  it('accordion为true，触发r.collapse.open事件，value应只包含该项', () => {
    const wrapper = shallowMount(Collapse, {
      propsData: {
        value: ['a'],
        accordion: true,
      },
    });
    wrapper.vm.$emit('r.collapse.open', 'b');
    expect(wrapper.emitted().input[0]).toEqual([['b']]);
    expect(wrapper.emitted().change[0]).toEqual([['b'], ['a']]);
  });
});
