<template>
  <div class="v-dropdown">
    <Tooltip v-bind="tooltipProps" ref="tooltipRef" @visibleChange="visibleChange">
      <slot></slot>
      <template #content>
        <div class="v-dropdown__content">
          <div
            v-for="item in items"
            :key="item.value"
            :class="{ 'is-disabled': item.disabled }"
            class="v-dropdown__content__item"
            @click="selected(item)"
          >
            <!-- <input type="checkbox" :value="item.value" :disabled="item.disabled" /> -->
            <UseVnode :content="item.label"></UseVnode>
          </div>
        </div>
      </template>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import type { DropdownEmits, DropdownItem, DropdownProps } from './type';
import Tooltip from '@v-element/components/Tooltip/index.vue';
import { computed, ref } from 'vue';
import type { TooltipInterface } from '@v-element/components/Tooltip/type';
import UseVnode from '@v-element/common/useVNode'

defineOptions({
  name: 'VDropdown',
})

const props = withDefaults(defineProps<DropdownProps>(), {
  arrow: true,
  menuls: true,
})
const emits = defineEmits<DropdownEmits>()

const tooltipRef = ref<TooltipInterface | null>(null)
const tooltipProps = computed(() => {
  return {
    ...props,
    items: undefined,
  }
})

const selected = (item: DropdownItem) => {
  if (item.disabled) return
  emits('selected', item)
  tooltipRef.value?.close()
}
const visibleChange = (val: boolean) => {
  emits('visibleChange', val)
}

defineExpose({
  open: tooltipRef.value?.open,
  close: tooltipRef.value?.close,
})
</script>