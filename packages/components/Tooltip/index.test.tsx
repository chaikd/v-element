import {DOMWrapper, mount, VueWrapper} from '@vue/test-utils';
import {describe, expect, beforeAll, test} from 'vitest';
import {nextTick} from 'vue';
import Tooltip from './index.vue';

let wrapper: VueWrapper
let main: DOMWrapper<Element>
let content: DOMWrapper<Element>

describe('Tooltip', () => {
  beforeAll(() => {
    wrapper = mount((
      <Tooltip>
        <button>test button</button>
      </Tooltip>
    ), {
      props: {
        content: 'test tooltip content',
      //   trigger: 'hover',
      //   placement: 'top',
      //   arrow: true,
      //   visible: true,
      //   menuls: true,
      //   propOptions: {
      //     modifiers: [
      //       {
      //         name: 'offset',
      //         options: {
      //           offset: [0, 8]
      //         }
      //       }
      //     ]
      //   }
      }
    })
    main = wrapper.find('.v-tooltip__main')
    content = wrapper.find('#tooltip')
  })
  test('base', () => {
    expect(wrapper.exists()).toBe(true)
    expect(main.text()).includes('test button')
    expect(content.exists()).toBe(false)
  })
  test('event & prop', async () => {
    await wrapper.setProps({content: 'content1'})
    await main.trigger('click')
    content = wrapper.find('#tooltip')
    expect(content.exists()).toBe(true)
    expect(content.attributes('data-popper-placement')).toBe('bottom')

    expect(wrapper.emitted()).toHaveProperty('visibleChange')
    
    const changeEvented = wrapper.emitted('visibleChange') || []
    expect(changeEvented).toHaveLength(1)
    expect(changeEvented[0]).toEqual([true])

    await main.trigger('click')
    content = wrapper.find('#tooltip')
    expect(content.exists()).toBe(false)

    await wrapper.setProps({trigger: 'hover'})
    await main.trigger('mouseenter')
    content = wrapper.find('#tooltip')
    expect(content.html()).includes('content1')

    const container = wrapper.find('.v-tooltip')
    await container.trigger('mouseleave')
    content = wrapper.find('#tooltip')
    expect(content.exists()).toBe(false)

    const changeEvented1 = wrapper.emitted('visibleChange') || []
    expect(changeEvented1).toHaveLength(4)
    expect(changeEvented1[3]).toEqual([false])

    await wrapper.setProps({arrow: false})
    expect(wrapper.find('.v-tooltip__arrow').exists()).toBe(false)
  })
})
