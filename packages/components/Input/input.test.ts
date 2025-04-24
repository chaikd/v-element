import { beforeAll, describe, expect, it } from "vitest";
import { mount, VueWrapper } from '@vue/test-utils'
import Input from './index.vue'

describe('Input', () => {
  let wrapper: VueWrapper
  beforeAll(() => {
    wrapper = mount(Input, {
      props: {
        type: 'text',
        placeholder: '请输入内容',
        modelValue: '111',
      },
      slots: {
        prefix: '<i class="fa fa-home"></i>',
        suffix: '<i class="fa fa-search"></i>'
      }
    })
  })
  it('basc show', async () => {
    // 内容显示
    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.element.value).toBe('111')
    expect(input.attributes('placeholder')).toBe('请输入内容')
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('disabled')).toBeUndefined()
    // 前缀图标
    expect(wrapper.find('.fa-home').exists()).toBe(true)
    // 后缀图标
    expect(wrapper.find('.fa-search').exists()).toBe(true)
  })
  it('moduleValue', async () => {
    wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: '222',
        clearable: true,
      },
      global: {
        stubs: ['VIcon']
      }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('222')
    await input.setValue('333')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['333'])
    await wrapper.setProps({ modelValue: '444' })
    expect(input.element.value).toBe('444')
  })
  it('event emit', async () => {
    wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: '222',
        clearable: true,
      },
      global: {
        stubs: ['VIcon']
      }
    })
    
    const input = wrapper.find('input')
    // 触发input事件
    await input.trigger('input')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')?.[0]).toEqual(['222'])
    // 触发change事件
    await input.trigger('change') 
    expect(wrapper.emitted('change')).toBeTruthy()
    // 触发focus事件
    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
    // 触发blur事件
    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })
  it('clear', async () => {
    wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: '222',
        clearable: true,
      },
      global: {
        stubs: ['VIcon']
      }
    })
    // 触发clear事件
    const clearBtn = wrapper.find('.v-input-clear')
    expect(clearBtn.exists()).toBe(true)
    await clearBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })
  it('icon', async () => {
    wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: '222',
        prefixIcon: 'home',
        suffixIcon: 'search',
      },
      global: {
        stubs: ['VIcon']
      }
    })
    const prefixIcon = wrapper.find('.v-input__prefix')
    const suffixIcon = wrapper.find('.v-input__suffix')
    expect(prefixIcon.exists()).toBe(true)
    expect(suffixIcon.exists()).toBe(true)
  })
  it('visibility', async () => {
    wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: '222',
        visibility: true,
      },
      global: {
        stubs: ['VIcon']
      }
    })
    const visibility = wrapper.find('.v-input__visibility')
    expect(visibility.exists()).toBe(true)
    await visibility.trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('password')
    await visibility.trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })
})