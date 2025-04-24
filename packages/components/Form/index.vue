<template>
  <div class="v-form">
    <div class="v-form__body">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import { FormInjectKey, type FormContext, type FormInterface, type FormProps } from './type';
import { useEventBus } from '@v-element/common/useEventBus';
import type { FormItemField } from '../FormItem/type';

defineOptions({
  name: 'VForm',
})
const props = defineProps<FormProps>()
// const emits = defineEmits<FormEmits>()
const fields = ref<FormItemField[]>([])
const addField = (field: FormItemField) => {
  fields.value.push(field)
}
const removeField = (field: FormItemField) => {
  const index = fields.value.indexOf(field)
  if (index > -1) {
    fields.value.splice(index, 1)
  }
}
const fieldEmit = useEventBus<FormItemField>({
  addField,
  removeField
})
const initModel = ref<Record<string, Object> | null>(null)

watch(() => props.model, (val) => {
  initModel.value = val
}, {
  once: true
})

const validate = async (props: string[] = []) => {
  const promiseArr = props.length > 0
                      ? fields.value.filter(v => props.includes(v.prop)).map(v => v.validate())
                      : fields.value.map(v => v.validate())
  return new Promise((resolve, reject) => {
    Promise.all(promiseArr).then(res => {
      const errors = res.filter(v => {
        if(v?.fields) {
          const key = Object.keys(v.fields)[0]
          return v.fields[key].length > 0
        }
      }).reduce((pre, cur) => {
        const key = Object.keys(cur.fields)[0]
        pre.push(...cur.fields[key])
        return pre
      },[])
      if(errors.length > 0) {
        reject(errors[0].message)
      } else {
        resolve(true)
      }
    })
  })
}
const reset = () => {
  fields.value.forEach(v => v.clearValidate())
  fields.value.forEach(v => v.resetField())
}

provide<FormContext>(FormInjectKey,{
  model: props.model,
  rules: props.rules || {},
  fieldEmit
})

defineExpose<FormInterface>({
  validate,
  reset
})
</script>