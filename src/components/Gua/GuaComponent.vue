<template>
  <div v-if="presentGua" class="row mt-5">
    <div class="row justify-content-center">
      <Gua :guaInfo="presentGua" :varianceNumber="varianceNumber" />
      <template v-if="varianceNumber != 0">
        <div class="col-1 arrow-center">
          <div class="">
            <i class="arrow right"></i>
          </div>
        </div>
        <Gua :guaInfo="futureGua" :varianceNumber="varianceNumber" />
      </template>
    </div>
    <template v-if="GuaResult.isSaved">
    <div class="row justify-content-center">
      <div class="mb-3 row">
        <label for="date" class="col-sm-2 col-form-label">Date</label>
        <div class="col-sm-10">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            id="date"
            :value="GuaResult.date"
          />
        </div>
        <div class="mb-3 row">
          <label for="exampleFormControlTextarea1" class="form-label"
            >Discription</label
          >
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="GuaResult.discription"
            readonly
          ></textarea>
        </div>
      </div>
    </div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue"
import { Gua64 } from "@/guaModel/gua/Gua64"
import { GuaResultType } from "@/type/GuaType"
import Gua from "./Gua.vue"

export default defineComponent({
  components: {
    Gua,
  },
  props: {
    GuaResult: {
      type: Object as PropType<GuaResultType>,
      requierd: true,
    },
  },
  setup(props) {
    const presentGua = ref<Gua64>(new Gua64(props.GuaResult!.presentGua))
    const futureGua = ref<Gua64>(new Gua64(props.GuaResult!.futureGua))
    const varianceNumber = ref<number>(props.GuaResult!.varianceNumber)

    return {
      presentGua,
      futureGua,
      varianceNumber,
    }
  },
})
</script>
<style lang="scss" scoped>
.arrow {
  border: solid black;
  border-width: 0 5px 5px 0;
  display: inline-block;
  padding: 5px;
  &.right {
    transform: rotate(-45deg);
  }
}
.arrow-center {
  position: relative;
  div {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(0%, -50%);
  }
}
</style>