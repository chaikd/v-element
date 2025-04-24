<template>
  <div class="v-collapse">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { provide, reactive, type Reactive } from 'vue';
import type { CollapseContext, CollapseEmits, CollapseProps, nameType } from './type';
import { collapseKey } from './type';

defineOptions({
  name: 'VCollapse'
})
const props = defineProps<CollapseProps>()
defineModel<{
  activeNames: nameType[]
}>()
const emits = defineEmits<CollapseEmits>()
const itemConfig: Reactive<CollapseContext> = reactive({
  activeNames: props.activeNames as nameType[],
  toggle: (name: string) => {
    const index = itemConfig.activeNames.indexOf(name)
    if (index > -1) {
      itemConfig.activeNames.splice(index, 1)
    } else {
      if (props.accordion) {
        itemConfig.activeNames = []
      }
      itemConfig.activeNames.push(name)
    }
    emits('change', itemConfig.activeNames)
  }
})

provide(collapseKey, itemConfig)
</script>