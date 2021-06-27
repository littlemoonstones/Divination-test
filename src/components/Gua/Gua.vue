<template>
  <div class="col col-md-2">
    <div class="row justify-content-center">
      <div class="col-1 gua8 px-0">
        <div class="gua8-text">
          <div>{{ guaInfo.AboveGua.Name }}</div>
        </div>
        <div class="gua8-text">
          <div>{{ guaInfo.BelowGua.Name }}</div>
        </div>
      </div>
      <div class="col gua-image">
        <GuaSingle
          v-for="(item, index) in toBinary(guaInfo.GuaNumber)"
          :key="index"
          :gua="item"
          :changed="varianceNumberArray[index]"
        />
      </div>
    </div>
    <div class="row justify-content-center mt-2">
      <div class="offset-1 col gua-title text-center fs-6">
        #{{ guaInfo.GuaOrder }} {{ guaInfo.Name }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, reactive } from "vue"
import { Gua64Type } from "@/type/GuaType"
import { toBinary } from "@/js"
import GuaSingle from "./GuaSingle.vue"
export default defineComponent({
  components: {
    GuaSingle,
  },
  props: {
    guaInfo: Object as PropType<Gua64Type>,
    varianceNumber: Number,
  },
  setup(props) {
    const varianceNumberArray = computed(() => {
      if (props.varianceNumber != undefined) {
        return toBinary(props.varianceNumber)
      }
      return null
    })
    return {
      varianceNumberArray,
      toBinary,
    }
  },
})
</script>

<style lang="scss" scoped>
*{
  // border: 1px grey solid;
}
.gua8 {
  height: auto;
}
.gua-image{
  max-width: 100px;
}
.gua8-text {
  position: relative;
  width: 100%;
  div {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-45%);
    margin-top: 2px;
    color: green;
  }
  height: 45%;
}
.gua-title {
  padding: 0;
  color: blue;
}
</style>