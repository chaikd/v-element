---
 layout: doc
---
# Icon 图标

使用[Fort Awesome](https://fontawesome.com/)作为基础图标。

## 使用图标

  - 需要导入v-icon组件
  - 默认导入所有的图标，搜索图标可从[Fort Awesome](https://fontawesome.com/)查看

## 基本用法
    
  <VIcon icon="search"></VIcon>
  ``` vue
  <template>
    <v-icon icon="search"></v-icon>
  </template>
  ```


## 更多属性
      
  <VIcon icon="spinner" spin style="margin-right:10px;"></VIcon>
  <VIcon icon="angle-right" rotation="90" style="margin-right:10px;"></VIcon>
  <VIcon icon="info" type="danger"></VIcon>

  ``` vue
  <template>
    <VIcon icon="spinner" spin></VIcon>
    <VIcon icon="angle-right" rotation="90"></VIcon>
    <VIcon icon="info" type="danger"></VIcon>
  </template>
  ```


## Attribute
| 属性名              |      说明      |  类型  | 默认值         |
| -------------      | :-----------: | ----:  | ------------- |
| icon(必填)          |  图标名称（可从Fort Awesome图标库 搜索）   | string | 
| type               |  主题颜色类型：primary, success, warning, danger, info   | string | undefined
| rotation           |   旋转角度：90，180，270    |    number/string  | undefined |
| flip               |   翻转：'horizontal', 'vertical', 'both'    |    string  | undefined |
| color              |   图标颜色     |    string  | 继承字体颜色 |
| spin               |   图标旋转     |    boolean  | undefined |
| 其他               |   其他FortAwesome图标支持的属性     |   any   | undefined |





