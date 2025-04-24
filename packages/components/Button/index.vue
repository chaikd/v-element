<template>
  <button
    ref="buttonRef"
    class="v-button"
    :class="{
      [`v-button--${type}`]: type,
      [`v-button--${size}`]: size,
      'is-cia': loading ,
      'is-circle': circle ,
      'is-round': round ,
      'is-disabled': disabled,
    }"
    :disabled="disabled || loading"
    :type="nativeType"
    :autoFocus="autofocus"
  >
    <span v-if="loading">
      <VIcon icon="spinner" spin></VIcon>
    </span>
    <span v-else-if="icon && !loading">
      <VIcon :icon="icon"></VIcon>
    </span>
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type {ButtonProps} from './type';
import type {Ref} from 'vue';
import VIcon from '@v-element/components/Icon/index.vue';
defineOptions({
  name: 'VButton',
});

const buttonRef = ref<HTMLButtonElement | null>(null);
withDefaults(defineProps<ButtonProps>(),{
  type: 'default',
  size: 'medium',
  nativeType: 'button',
  autofocus: false,
  loading: false,
  disabled: false,
});
defineExpose<{
  ref: Ref<HTMLButtonElement | null>;
}>({
  ref: buttonRef,
});
</script>
<style scoped>
</style>