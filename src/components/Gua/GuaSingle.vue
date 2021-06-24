<template>
  <template v-if=" gua ==='1' ">
    <div class="row gua" :class="{ changed: changed=='1' }">
      <div class="col"></div>
    </div>
  </template>
  <template v-else>
    <div class="row gua" :class="{ changed: changed=='1'  }">
      <div class="col"></div>
      <div class="col-1 blank"></div>
      <div class="col"></div>
    </div>
  </template>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
      gua: String,
      changed: String
  },
  setup(props) {
  },
})
</script>
<style lang="scss" scoped>
.gua {
    // margin: 4px 0;
    margin-bottom: 5px;
    // padding: 0;
  div {
    background: black;
    border-radius: 15px;
    height: 10px;
  }
  .blank {
    background: transparent;
    // width: 100%;
    // max-width: 100px;
  }

  &.changed {
    div {
      background: red;
    }
    .blank {
      background: transparent;
    }
  }
}
</style>