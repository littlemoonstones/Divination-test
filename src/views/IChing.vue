<template>
  <div class="container pt-4">
    <div class="row py-2 py-md-4">
      <h1>易經卜卦</h1>
      <p class="lead">說明：想好問題之後，按六下按鈕</p>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 ball-group d-flex justify-content-center">
        <div
          v-for="(num, index) in numArray"
          :key="index"
          class="mx-1 ball list-complete-item"
        >
          <div>
            {{ num }}
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <div class="col col-xs-6 col-md-3" style="text-align: center">
        <button
          v-if="numArray.length != 6"
          type="button"
          class="btn btn-primary"
          @click="Toss"
        >
          Toss
        </button>
      </div>
    </div>
    <GuaComponent v-if="GuaResult" :GuaResult="GuaResult" />
    <SaveModal
      v-if="numArray.length == 6"
      :GuaResult="GuaResult"
      @reset="Reset"
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from "vue"
import { IChing } from "../guaModel/Divinations/IChing"
import GuaComponent from "../components/Gua/GuaComponent.vue"
import SaveModal from "@/components/SaveModal.vue"
import { GuaResultType } from "@/guaModel/types"
export default defineComponent({
  name: "IChing",
  components: {
    GuaComponent,
    SaveModal,
  },
  setup() {
    // https://learnvue.co/2020/09/how-to-deploy-your-vue-app-to-github-pages/

    const GuaResult = ref<GuaResultType | null>(null)

    const numArray: number[] = reactive<number[]>([])
    const Toss = () => {
      if (numArray.length <= 6) {
        numArray.push(IChing.GetRandomNumber())
      }
    }

    watch(numArray, () => {
      if (numArray.length == 6) {
        const iching = new IChing(numArray)
        GuaResult.value = iching.GetDivnationResult()
        console.log("GuaResult: ", GuaResult.value)
      }
    })

    const Reset = () => {
      GuaResult.value = null
      numArray.splice(0)
    }
    
    return {
      GuaResult,
      numArray,
      // toBinary,
      Reset,
      Toss,
      // addHistory,
    }
  },
})
</script>

<style lang="scss" scoped>
* {
  // border: 1px solid gray;
}
.ball-group {
  display: flex;
  flex-direction: row;
  justify-self: center;
}
.ball {
  width: 50px;
  height: 50px;
  // border: 1px solid coral;
  background: greenyellow;
  border-radius: 50%;
  position: relative;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    font-weight: bold;
    // text-align: center;
  }
}
</style>