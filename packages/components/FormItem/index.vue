<template>
  <div class="v-form-item">
    <div class="v-form-item-label">
      <span class="v-form-item-label-required-tag" v-if="required">*</span>
      <span class="v-form-item-label-content">{{ label }}：</span>
    </div>
    <div class="v-form-item-content">
      <slot />
      <div class="v-form-item-error">
        <span v-if="validateStatus.errorMessage" class="v-form-item-error-text">{{ validateStatus.errorMessage }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, inject, onMounted, provide, reactive } from 'vue';
import { FormItemInjectKey, type FormItemContext, type FormItemProps, type ItemRule } from './type';
import Schema from 'async-validator';
import { FormInjectKey, type FormContext } from '../Form/type';

defineOptions({
  name: 'VFormItem',
})
const props = defineProps<FormItemProps>()
const formContext = inject(FormInjectKey) as FormContext
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let initValue: any = null

onMounted(() => {
  formContext.fieldEmit('addField', formItemField.value)
  initValue = itemValue.value
})


const formItemField = computed(() => {
  return {
    prop: props.prop,
    validate,
    clearValidate,
    resetField
  }
})

const itemRules = computed(() => {
  const rule = formContext?.rules[props.prop]
  if(Array.isArray(rule)) {
    return rule
  } else {
    return [rule]
  }
})

const itemValue = computed(() => {
  return formContext?.model[props.prop]
})
const required = computed(() => {
  return itemRules.value.some(v => v.required)
})

const validateStatus = reactive({
  state: 'init',
  errorMessage: '',
  loading: false
})
const validate = () => {
  validateStatus.state = 'loading'
  const valitator = new Schema({
    [props.prop]: itemRules.value as ItemRule[]
  })
  return valitator.validate({[props.prop]: itemValue.value}).then(() => {
    validateStatus.state = 'success'
    validateStatus.errorMessage = ''
  }).catch((error) => {
    validateStatus.errorMessage = error.fields[props.prop][0].message
    return error
  }).finally(() => {
    validateStatus.loading = false
  })
}
const clearValidate = () => {
  resetValidate()
}
const resetField = () => {
  formContext.model[props.prop] = initValue
}

const resetValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errorMessage = ''
  validateStatus.loading = false
}
provide<FormItemContext>(FormItemInjectKey, {
  itemRule: (itemRules.value as ItemRule[]),
  validate: validate,
})

</script>