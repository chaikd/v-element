<template>
  <div
    class="v-input"
    :class="{
      ['v-input--' + size]: size,
      'v-input--disabled': disabled,
    }"
  >
    <template v-if="type !== 'textarea'">
      <div class="v-input-body">
        <slot name="prefix">
          <span v-if="prefixIcon" class="v-input__prefix v-input-icon">
            <VIcon :icon="prefixIcon"></VIcon>
          </span>
        </slot>
        <input
          ref="inputRef"
          :type="visibility ? visibilityType : type"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          v-model="inputValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          class="v-input__field"
        />
        <span v-if="clearable" class="v-input-clear v-input-icon" @click="clearInput">
          <VIcon icon="circle-xmark"></VIcon>
        </span>
        <span v-if="visibility" class="v-input__visibility v-input-icon" @click="targetVisibility">
          <VIcon icon="eye" v-if="visibilityType === 'password'"></VIcon>
          <VIcon icon="eye-slash" v-if="visibilityType !== 'password'"></VIcon>
        </span>
        <slot name="suffix">
          <span v-if="suffixIcon" class="v-input__suffix v-input-icon">
            <VIcon :icon="suffixIcon"></VIcon>
          </span>
        </slot>
      </div>
    </template>
    <template v-else>
      <textarea
        :placeholder="placeholder"
        v-model="inputValue"
        @input="handleInput"
        @change="handleInput"
        class="v-input__field"
      ></textarea>
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue';
import type { InputEmits, InputProps } from './type';
import VIcon from '@v-element/components/Icon/index.vue';
import { isArray } from 'lodash-es';
import { FormItemInjectKey, type FormItemContext, type ItemRule } from '../FormItem';

defineOptions({
  name: 'VInput',
});
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  modelValue: '',
  placeholder: '请输入',
  clearable: true,
})
const emits = defineEmits<InputEmits>()
const inputValue = ref<string>(props.modelValue);
const inputRef = ref<HTMLElement | null>(null)
const formItemContext = inject(FormItemInjectKey) as FormItemContext
const triggers = computed(() => {
  if (formItemContext && formItemContext.itemRule && isArray(formItemContext.itemRule)) {
    return formItemContext.itemRule.map((v: ItemRule) => v.trigger).filter((v: string | undefined) => !!v)
  } else {
    return formItemContext.itemRule ? [(formItemContext.itemRule as ItemRule).trigger] : []
  }
})

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});

const clearable = computed(() => {
  return props.clearable && inputValue.value !== '';
})

const visibilityType = ref(props.type);

const targetVisibility = () => {
  visibilityType.value = visibilityType.value === 'password' ? 'text' : 'password';
}

const handleInput = () => {
  emits('update:modelValue', inputValue.value);
  emits('input', inputValue.value);
  triggerValidate('input')
}
const handleChange = () => {
  emits('change', inputValue.value);
  triggerValidate('change')
}
const handleFocus = () => {
  emits('focus');
  triggerValidate('focus')
}
const handleBlur = () => {
  emits('blur');
  triggerValidate('blur')
}
const triggerValidate = (trigger: string) => {
  const triggersArr = triggers.value
  if (trigger && triggersArr.length > 0 && triggersArr.includes(trigger)) {
    console.log('trigger: ', trigger);
    formItemContext.validate()
  }
}

const clearInput = () => {
  inputValue.value = '';
  emits('update:modelValue', '');
  if (inputRef.value) {
    inputRef.value.focus()
  }
  triggerValidate('input')
}
</script>