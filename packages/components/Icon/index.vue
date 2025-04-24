<template>
  <i class="v-icon" :class="{
    ['v-icon--' + type]: type,
  }" :style="iconStyle">
    <FontAwesomeIcon :icon="['fas', icon]" v-bind="filtedProps"></FontAwesomeIcon>
  </i>
</template>
<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { iconProps } from './type';
import { computed } from 'vue';
import {omit} from 'lodash-es'

defineOptions({
  name: 'VIcon'
})

const props = defineProps<iconProps>()

const filtedProps = computed(() => {
  return omit(props, ['icon', 'color', 'type'])
})
const iconStyle = computed(() => {
  return props.color?{ color:props.color } : {}
})
</script>