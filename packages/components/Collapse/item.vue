<template>
  <div class="v-collapse-item">
    <div class="v-collapse-item__title" @click="switchItem(name)">
      <slot name="title">{{ title }}</slot>
      <VIcon icon="angle-right" :rotation="iconRotation"/>
    </div>
    <transition name="fade" v-on="transitionEvent">
      <div class="v-collapse-item__wrapper" v-show="isShow">
        <div class="v-collapse-item__content">
          <slot></slot> 
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, type ComputedRef } from 'vue';
import type { CollapseItemProps, nameType } from './type';
import { collapseKey } from './type';
import VIcon from '@v-element/components/Icon/index.vue';
import type { iconProps } from '@v-element/components/Icon/type';

defineOptions({
  name: 'VCollapseItem'
})
const props = defineProps<CollapseItemProps>()

const itemConfig = inject(collapseKey)
const switchItem = (name: nameType) => {
  if (props.isDisabled) return
  itemConfig?.toggle(name)
}

const isShow = computed(() => {
  return itemConfig?.activeNames.includes(props.name)
})

const iconRotation: ComputedRef<iconProps['rotation']> = computed(() => {
  return isShow.value ? 90 : undefined
})

const transitionEvent = {
  beforeEnter(el: HTMLElement) {
    el.style.height = '0px'
  },
  enter(el: HTMLElement) {
    el.style.height = `${el.scrollHeight}px`
  },
  beforeLeave(el: HTMLElement) {
    el.style.height = `${el.scrollHeight}px`
  },
  leave(el: HTMLElement) {
    el.style.height = '0px'
  }
}
</script>