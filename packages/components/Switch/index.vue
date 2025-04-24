<template>
  <div
    class="v-switch"
    :class="{
      ['v-switch--' + size]: size,
      'v-switch--disabled': disabled,
      'v-switch--checked': checked,
    }"
    @click="handleClick"
  >
    <input
      type="checkbox"
      class="v-switch__input"
      v-model="currentValue"
      :disabled="disabled"
    />
    <div class="v-switch__core">
      <div class="v-switch__core__active" ref="activeRef">{{activeText}}</div>
      <div class="v-switch__core__inner">
        <span v-if="activeIcon">
          <VIcon :icon="activeIcon" class="v-switch__core__inner__icon"></VIcon>
        </span>
      </div>
      <div class="v-switch__core__inactive" ref="inactiveRef">{{inactiveText}}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, ref, type Ref } from 'vue';
import type { SwitchEmits, SwitchProps, ValueType } from './type.ts';
import VIcon from '@v-element/components/Icon/index.vue';

defineOptions({
  name: 'VSwitch',
})
const props = withDefaults(defineProps<SwitchProps>(), {
  activeText: '是',
  inactiveText: '否',
  activeValue: true,
  inactiveValue: false,
})
const emits = defineEmits<SwitchEmits>()
const activeRef = ref<HTMLElement | null>(null)
const inactiveRef = ref<HTMLElement | null>(null)
const currentValue: Ref<ValueType> = ref(props.modelValue);
const checked = computed(() => {
  return currentValue.value === props.activeValue;
});
const activeIcon = computed(() => {
  return checked.value ? props.activeActionIcon : props.inactiveActionIcon;
})

onMounted(async () => {
  await nextTick()
  initInactiveStyle()
})

const handleClick = () => {
  if (props.disabled) return
  currentValue.value = checked.value ? props.inactiveValue : props.activeValue;
  emits('change', currentValue.value)
  emits('update:modelValue', currentValue.value)
  targetActiveWidth()
}

const targetActiveWidth = () => {
  if(activeRef.value && inactiveRef.value) {
    activeRef.value.style.width = checked.value ? `${activeRef.value?.scrollWidth + 4}px` : '0px'
    inactiveRef.value.style.width = !checked.value ? `${inactiveRef.value?.scrollWidth + 4}px` : '0px'
  }
}
const initInactiveStyle = () => {
  if (inactiveRef.value) {
    inactiveRef.value.style.width = `${inactiveRef.value?.scrollWidth + 4}px`
  }
}
</script>