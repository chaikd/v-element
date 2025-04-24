import { beforeAll, describe, expect, test } from 'vitest';
import {mount} from '@vue/test-utils'
import VButton from './index.vue'
import VIcon from '../Icon/index.vue'

describe('Button', () => {
  test('test default', () => {
    const button = mount(VButton, {
      props:{
        type: 'primary',
      },
      slots: {
        default: 'default button'
      }
    })
    expect(button.classes().includes('v-button')).toBeTruthy()
    expect(button.classes()).toContain('v-button--primary')
    expect(button.text()).toContain('default button')
  })
  test('test disabled', () => {
    const button = mount(VButton, {
      props:{
        disabled: true
      }
    })
    expect(button.classes()).toContain('is-disabled')
    button.trigger('click')
    expect(button.emitted()).not.toHaveProperty('click')
    expect(button.element.disabled).toBeTruthy()
  })
  test('test loading', () => {
    const button = mount(VButton, {
      props: {
        loading: true
      },
      global: {
        stubs: ['VIcon']
      }
    })
    expect(button.html()).toContain('v-icon')
    const iconElement = button.findComponent(VIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(iconElement.attributes('spin')).toBeTruthy()
  })
  test('test icon', () => {
    const button = mount(VButton, {
      props: {
        icon: 'home'
      },
      global: {
        stubs: ['VIcon']
      }
    })
    const iconElement = button.findComponent(VIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('home')
  })
  test('test click', async () => {
    const button = mount(VButton)
    button.trigger('click')
    expect(button.emitted()).toHaveProperty('click')
  })
})