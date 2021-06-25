<template>
  <div class="col">
    <div class="row">
      <div class="col-3 gua8 px-0">
        <div class="gua8-text">
          <div>{{ guaInfo.AboveGua.Name }}</div>
        </div>
        <div class="gua8-text">
          <div>{{ guaInfo.BelowGua.Name }}</div>
        </div>
      </div>
      <div class="col">
        <GuaSingle
          v-for="(item, index) in toBinary(guaInfo.GuaNumber)"
          :key="index"
          :gua="item"
          :changed="varianceNumberArray[index]"
        />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col gua-title text-end fs-6 pe-2 pe-md-3">
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
.gua8-text {
  position: relative;
  width: 100%;
  div {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    color: green;
  }
  height: 45%;
}
.gua-title {
  padding: 0;
  // padding-right: 5px;
  color: blue;
}
</style>