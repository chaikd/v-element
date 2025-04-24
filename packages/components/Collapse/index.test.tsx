import { beforeAll, describe, expect, test, vi } from 'vitest';
import Collapse from './index.vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import CollpaseItem from './item.vue';

const onChange = vi.fn()
let wrapper: VueWrapper
let items: VueWrapper[], headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
describe('collapse', () => {
  beforeAll(() => {
    wrapper = mount(() => (<Collapse activeNames={['1']} accordion={true} onChange={onChange}>
      <CollpaseItem name="1" title="1">
        content1
      </CollpaseItem>
      <CollpaseItem name="2" title="2" isDisabled={true}>
        content2
      </CollpaseItem>
      <CollpaseItem name="3" title="3">
        content3
      </CollpaseItem>
    </Collapse>),{
      emits: ['update:activeNames', 'change'],
      global: {
        stubs: ['VIcon']
      }
    })
    items = wrapper.findAllComponents(CollpaseItem)
    headers = wrapper.findAll('.v-collapse-item__title')
    contents = wrapper.findAll('.v-collapse-item__wrapper')
  })
  test('基础测试', () => {
    expect(wrapper.classes().includes('v-collapse')).toBeTruthy()

    // 测试是否有3个标题和3个内容， 内容是否显示
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    expect(headers[0].text()).toBe('1')
    expect(headers[1].text()).toBe('2')
    expect(items.length).toBe(3)
    expect(contents[0].isVisible()).toBeTruthy()
    expect(contents[1].isVisible()).toBeFalsy()

    // 测试是否禁用
    // expect(items[1].props('isDisabled')).toBeTruthy()
  })
  test('事件测试', async () => {
    await headers[0].trigger('click')
    expect(onChange).toBeCalledWith([])
    // expect(contents[0].element?.style?.display === 'none').toBeTruthy()

    await headers[1].trigger('click')
    expect(onChange).toBeCalledWith([])
    expect(contents[1].isVisible()).toBeFalsy()

    await headers[2].trigger('click')
    expect(onChange).toBeCalledWith(['3'])
  })
})