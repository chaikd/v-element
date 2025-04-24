<template>
  <div class="v-tooltip" ref="containerRef" v-on="outEvent">
    <div class="v-tooltip__main" ref="tooltipRef" v-on="triggerEnvents" @click.stop>
      <slot></slot>
    </div>
    <transition name="tooltip">
      <div v-if="isVisible" class="v-tooltip__content" id="tooltip" ref="contentRef" @click.stop>
        <slot name="content">
          <div class="is-content">{{ content }}</div>
        </slot>
        <div v-if="arrow" id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import type { TooltipEmits, TooltipInterface, TooltipProps } from './type';
import { createPopper, type Instance } from '@popperjs/core';
import { useOutsideClickEvent } from '@v-element/hooks/useOutsideClickEvent';

defineOptions({
  name: 'VTooltip',
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'click',
  visible: false,
  arrow: true
})
const emits = defineEmits<TooltipEmits>()

const containerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
let popperInstance: Instance | null = null
const isVisible = ref(false)

useOutsideClickEvent(containerRef.value, () => {
  if (props.trigger === 'click' && isVisible.value && !props.menuls) {
    triggerVisible(false)
  }
})
const triggerVisible = (val?: boolean) => {
  isVisible.value = val !== undefined ? val : !isVisible.value
  emits('visibleChange', isVisible.value)
  // emits('update:visible', isVisible.value)
}

const popperInstanceControl = () => {
  if (tooltipRef.value && contentRef.value) {
    popperInstance = createPopper(tooltipRef.value, contentRef.value, {
      placement: props.placement,
      ...props.propOptions
    })
  } else {
    popperInstance?.destroy()
    popperInstance = null
  }
}

// onMounted(() => {
//   if (props.visible) {
//     popperInstanceControl()
//   }
// })
// watch(() => props.visible, (val) => {
//   isVisible.value = val
// })

watch(isVisible, (val) => {
  if(val) {
    popperInstanceControl()
  }
}, {
  immediate: true,
  flush: 'post',
})

const triggerEnvents = computed(() => {
  switch(props.trigger) {
    case 'click':
      return {
        click: () => {triggerVisible()}
      }
    case 'hover':
      return {
        mouseenter: () => {triggerVisible(true)},
      }
    default:
      return {}
  }
})
const outEvent = computed(() => {
  switch(props.trigger) {
    case 'hover': 
      return {
        mouseleave: () => triggerVisible(false)
      }
    default:
      return {}
  }
})

onUnmounted(() => {
  triggerVisible(false)
})
defineExpose<TooltipInterface>({
  open: () => {
    if (!props.menuls) {
      return
    }
    triggerVisible(true)
  },
  close: () => {
    if (!props.menuls) {
      return
    }
    triggerVisible(false)
  },
  target: () => {
    if (!props.menuls) {
      return
    }
    if(isVisible.value) {
      triggerVisible(false)
    } else {
      triggerVisible(true)
    }
  },
})

</script>