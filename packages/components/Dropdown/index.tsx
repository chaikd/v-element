import { computed, defineComponent, ref } from "vue";
import type { DropdownItem } from "./type";
import type { TooltipInterface } from "../Tooltip/type";
import VTooltip from "../Tooltip/index.vue";

export default defineComponent({
  name: 'VDropdown',
  props: {
    items: {
      type: Array<DropdownItem>,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom' // top, bottom, left, right
    }
  },
  emits: ['selected', 'visibleChange'],
  setup(props, { emit, slots, expose }) {
    const tooltipProps = computed(() => {
      return {
        ...props,
        items: undefined,
      }
    })
    const tooltipRef = ref<TooltipInterface | null>(null)
    const selected = (item: DropdownItem) => {
      if(item.disabled) return
      emit('selected', item)
    }
    const visibleChange = (val: boolean) => {
      emit('visibleChange', val)
    }
    expose({
      open: tooltipRef.value?.open,
      close: tooltipRef.value?.close,
    })
    const contentTpl = computed(() => {
      return props.items.map((item) => {
        return (
          <div
            key={item.value}
            class="dropdown-item"
            onClick={() => selected(item)}
            style={{ cursor: item.disabled ? 'not-allowed' : 'pointer' }}
          >
            {item.label}
          </div>
        )
      })
    })
    return () => (
      <div class="v-dropdown">
        <VTooltip ref={tooltipRef} onVisibleChange={visibleChange}>
          {{
            default: slots.default && slots.default(),
            content: contentTpl.value
          }}
        </VTooltip>
      </div>
    )
  }
})