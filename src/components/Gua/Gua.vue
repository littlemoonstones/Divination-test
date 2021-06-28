<template>
  <div class="col-auto">
    <div class="my-2">
      <div class="gu8-group">
        <div class="gua8-item-1">
          <div class="gua8-text">
            {{ guaInfo.AboveGua.Name }}
          </div>
          <div class="gua8-text">
            {{ guaInfo.BelowGua.Name }}
          </div>
        </div>
        <div class="gua8-item-2">
          <GuaSingle
            v-for="(item, index) in toBinary(guaInfo.GuaNumber)"
            :key="index"
            :gua="item"
            :changed="toBinary(varianceNumber)[index]"
          />
        </div>
      </div>
      <div class="gua-title text-center">
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
    guaInfo: {
      type: Object as PropType<Gua64Type>,
      required: true,
    },
    varianceNumber: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    return {
      toBinary,
    }
  },
})
</script>

<style lang="scss" scoped>
$gua-container: 100px;
$gua-width: 80%;
$gua-text: 20%;

.gu8-group {
  width: $gua-container;
  // min-width: 100px;
  height: auto;
  display: flex;
  justify-content: space-between;
}

.gua8-item-2 {
  width: $gua-width;
  min-width: 50px;
}

.gua8-item-1 {
  width: $gua-text;
  min-width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.gua8-text {
  text-align: center;
  color: green;
}
.gua-title {
  position: relative;
  left: 10px;
  width: $gua-width;
  min-width: 100px;
  padding: 0;
  color: blue;
}
</style>