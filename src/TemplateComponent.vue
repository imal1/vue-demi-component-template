<template>
  <div>
    <div ma4 class="template-component">Template Component</div>
  </div>
</template>

<script lang="ts">
import { templateComponentProps } from "./props.d";
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "VueDemiTemplateComponent",
  props: templateComponentProps,
  setup() {},
});
</script>
