<template>
  <div v-if="GuaResult.PresentGua" class="row my-4 my-md-5 justify-content-center">
    <div class="row justify-content-center">
      <Gua :guaInfo="GuaResult.PresentGua" :varianceNumber="GuaResult.varianceNumber" />
      <template v-if="GuaResult.varianceNumber != 0">
        <div class="col-2 col-md-2 col-lg-1 arrow-center">
          <div class="">
            <i class="arrow right"></i>
          </div>
        </div>
        <Gua :guaInfo="GuaResult.FutureGua" :varianceNumber="GuaResult.varianceNumber" />
      </template>
    </div>
    <template v-if="GuaResult.PresentGua">
      <div class="row my-2 my-md-3">
        <div class="col">
          <div class="row justify-content-center">
            <div class="col-auto text-end">本卦:</div>
            <div class="col-auto">
              <a :href="parseLink(GuaResult.PresentGua.GuaOrder)" target="_blank">link</a>
            </div>
          </div>
          <template v-if="GuaResult.varianceNumber != 0">
            <div class="row justify-content-center">
              <div class="col-auto text-end">變卦:</div>
              <div class="col-auto">
                <a :href="parseLink(GuaResult.FutureGua.GuaOrder)" target="_blank">link</a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue"
import { GuaResultType } from "@/guaModel/types"
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
    console.log("GuaComponent", props.GuaResult)
    // const presentGua = ref<Gua64>(new Gua64(props.GuaResult!.presentGua))
    // const futureGua = ref<Gua64>(new Gua64(props.GuaResult!.futureGua))
    // const varianceNumber = ref<number>(props.GuaResult!.varianceNumber)
    // console.log("pro", presentGua.value, futureGua.value)
    // const link1 = ref<string>("")
    // const link2 = ref<string>("")
    const parseLink = (guaOrder: string)=>{
      return `https://www.golla.tw/sm/64gua/${42257-parseInt(guaOrder)}.html`
    }
    // link1.value = parseLink(presentGua.value.GuaOrder)
    // link2.value = parseLink(futureGua.value.GuaOrder)
    return {
      parseLink
      // presentGua,
      // futureGua,
      // varianceNumber,
      // link1,
      // link2
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
    left: 40%;
    transform: translate(0%, -50%);
  }
}
</style>