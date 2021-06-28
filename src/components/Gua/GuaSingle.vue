<template>
  <template v-if=" gua ==='1' ">
    <div class="gua" :class="{ changed: changed=='1' }">
      <div class="single"></div>
    </div>
  </template>
  <template v-else>
    <div class="gua" :class="{ changed: changed=='1'  }">
      <div class="double"></div>
      <div class="blank"></div>
      <div class="double"></div>
    </div>
  </template>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
      gua: String,
      changed: String
  }
})
</script>
<style lang="scss" scoped>
.gua{
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
  div {
    background: black;
    border-radius: 15px;
    height: 10px;
  }
  .blank {
    background: transparent;
    min-width: 15px;
  }
  .single{
    width: 100%;
  }
  .double{
    width: 50%
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