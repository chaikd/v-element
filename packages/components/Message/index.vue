<template>
  <div
    v-if="visible"
    ref="messageRef"
    class="v-message"
    :class="{
      ['v-message--' + props.type]: props.type,
    }"
    :style="messageStyle"
  >
    <template v-if="icons[props.type]">
      <VIcon
        :icon="icons[props.type]"
        class="v-message-icon"
      ></VIcon>
    </template>
    <UseVnode :content="message"></UseVnode>
    <span v-if="showClose">
      <VIcon icon="close" class="v-message-icon v-message-icon--close" @click="closeMessage"></VIcon>
    </span>
  </div>
</template>
<script setup lang="ts">
import type { MessageEmits, MessageProps } from './type';
import UseVnode from '@v-element/common/useVNode'
import VIcon from '@v-element/components/Icon/index.vue'
import { computed, onMounted, ref } from 'vue';
import { getPreBottomOffset } from './index.service';

defineOptions({
  name: 'VMessage',
})
const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  offset: 20,
  type: 'info'
})
const emits = defineEmits<MessageEmits>()
const messageRef = ref<HTMLElement | null>(null)
const visible = ref(true)
const icons = {
  'primary': '',
  'info': 'circle-info',
  'success': 'circle-check', 
  'warning': 'circle-exclamation',
  'danger': 'bug',
}

const timeClose = () => {
  if (props.duration == 0) return
  setTimeout(() => {
    closeMessage()
  }, props.duration)
}

onMounted(() => {
  timeClose()
})

const messageStyle = computed(() => {
  const preBottomOffset = getPreBottomOffset(props.id!)
  return {
    top: `${props.offset + preBottomOffset}px`,
  }
})

const closeMessage = () => {
  visible.value = false
  emits('closed')
  if (props.close) {
    props.close()
  }
}
</script>