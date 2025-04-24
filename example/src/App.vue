<script setup lang="ts">
import {ref, onMounted, type Ref, reactive, type Reactive, h} from 'vue'
import type {ButtonInterface} from '@v-element/components/Button/type'
import type { CollapseItemProps, nameType } from '@v-element/components/Collapse/type'
// import testComponent from '@v-element/components/test.component'
import type { TooltipInterface, TooltipProps } from '@v-element/components/Tooltip/type'
import VDropdown from '@v-element/components/Dropdown/index.vue'
// import VDropdown from '@v-element/components/Dropdown/index.tsx'
import { Message } from '@v-element/components/Message/index.service'
import type { MessageProps } from '@v-element/components/Message/type'
import type { FormInterface } from '@v-element/components/Form/type'

const buttonRef = ref<ButtonInterface | null>(null)
onMounted(() => {
  // console.log(buttonRef.value?.ref)
})
const activeNames: Ref<nameType[]> = ref(['1'])
const tooltipRef: Ref<TooltipInterface | null> = ref(null)
const collapseChange = (v: nameType[]) => {
  activeNames.value = v
}
const collapsesArr: CollapseItemProps[] = [
  {
    name: '1',
    title: '标题1',
    content: '内容1'
  },
  {
    name: '2',
    title: '标题2',
    content: '内容2'
  },
  {
    name: '3',
    title: '标题3',
    content: '内容3'
  }
]

const tooltipConfig: Reactive<TooltipProps> = reactive({
  content: 'hello world',
  placement: 'bottom',
  trigger: 'click',
  // visible: true,
  menuls: true,
  propOptions: {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ]
  }
})

const changetootipvisible = () => {
  // tooltipConfig.visible = !tooltipConfig.visible
  tooltipRef.value?.target()
}

const dropdownItems = [
    {
      label: h('strong', null, '选项1'),
      value: '1',
    },
    {
      label: '选项2',
      value: '2',
      disabled: true
    },
    {
      label: '选项3',
      value: '3',
    },
  ]
const dropdownSelected = ref('')
let c = 0
const messageTypes: Array<MessageProps['type']> = ['primary', 'success', 'warning', 'info', 'danger']
const showMessage = () => {
  Message({message: 'hello word' + c , showClose: true, duration: 0, type: messageTypes[c % 5]})
  c++
}
const inputValue = ref<string>('')

const formRef = ref<FormInterface | null>(null)
const switchValue = ref<boolean>(false)
const formConfig = reactive({
  formModel: {
    name: '123',
    password: '123',
    email: '123'
  },
  rules: {
    name: {
      type: 'string',
      required: true,
      trigger: 'input',
      message: '请输入姓名'
    },
    email: [
      {
        required: true,
        trigger: 'input',
        message: '请输入email'
      },
      {
        trigger: 'blur',
        pattern: /^123@163.com$/,
        message: '请输入正确的email'
      }
    ],
    password: {
      type: 'string',
      required: true,
      trigger: 'input',
      message: '请输入密码'
    }
  }
})
const validate = () => {
  if (formRef.value) {
    const {validate} = formRef.value
    validate().then(() => {
      console.log('success')
    }).catch((err: string) => {
      console.log(err)
    })
  }
}
const resetValidate = () => {
  if (formRef.value) {
    const {reset} = formRef.value
    reset()
  }
}
</script>

<template>
  <header>
    <Tooltip v-bind="tooltipConfig" ref="tooltipRef">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    </Tooltip>
  </header>
  <main>
    <VForm ref="formRef" :model="formConfig.formModel" :rules="formConfig.rules">
      <v-form-item prop="name" label="用户名">
        <v-input v-model="formConfig.formModel.name"></v-input>
      </v-form-item>
      <v-form-item prop="email" label="邮箱">
        <v-input v-model="formConfig.formModel.email"></v-input>
      </v-form-item>
      <v-form-item prop="password" label="密码">
        <v-input v-model="formConfig.formModel.password" type="password"></v-input>
      </v-form-item>
    </VForm>
    <VButton @click="validate">校验</VButton>
    <VButton @click="resetValidate">重置</VButton>
    <br>
    <VSwitch v-model="switchValue" size="large"></VSwitch>
    <VSwitch v-model="switchValue" :disabled="true"></VSwitch>
    <VSwitch v-model="switchValue" size="small" active-action-icon="home" inactive-action-icon="user-secret">
      <template #icon>
        <VIcon icon="home" class="v-input-icon"></VIcon>
      </template>
    </VSwitch>
    <br>
    <VInput v-model="inputValue" size="large" :visibility="true">
      <template #prefix>
        <VIcon icon="home" class="v-input-icon"></VIcon>
      </template>
      <template #suffix>
        <VIcon icon="search" class="v-input-icon"></VIcon>
      </template>
    </VInput>
    <VInput v-model="inputValue" :disabled="true"></VInput>{{ inputValue }}
    <VInput v-model="inputValue" size="small" prefixIcon="home" stuffixIcon="search"  :readonly="true"></VInput>
    <br>
    <VButton disabled ref="buttonRef">disabled</VButton>
    <VButton :round="true" @click="changetootipvisible">round</VButton>
    <VButton :circle="true" @click="showMessage">show message</VButton>
    <br>
    <VButton size="large">large</VButton>
    <VButton>default</VButton>
    <VButton size="small">small</VButton>
    <br>
    <VButton type="success" size="large" loading>success</VButton>
    <VButton type="primary" size="large">primary</VButton>
    <VButton type="warning" size="large">warning</VButton>
    <VButton type="info" size="large">info</VButton>
    <VButton type="danger" size="large">danger</VButton>
  </main>
  <VCollapse v-model:activeNames="activeNames" accordion @change="collapseChange">
    <template v-for="(item, key) in collapsesArr" :key="key">
      <VCollapseItem v-bind="item">
        <template #title>{{item.title}}</template>
        <div>{{item.content}}</div>
      </VCollapseItem>
    </template>
  </VCollapse>
  <VIcon icon="house" color="red"></VIcon>
  <VIcon icon="user-secret" size="2xl"></VIcon>
  <VIcon icon="user-secret" size="2xl" type="danger"></VIcon>
  <!-- <testComponent msg="test use"></testComponent> -->
  {{ dropdownSelected }}
  <VDropdown :items="dropdownItems" @selected="dropdownSelected = $event.value">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </VDropdown>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
