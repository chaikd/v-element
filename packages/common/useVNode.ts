import { defineComponent } from "vue";

export default defineComponent({
  name: 'showVNode',
  props: {
    content: {
      type: [String, Object],
      require: true
    }
  },
  setup(props) {
    return () => props.content
  } 
})