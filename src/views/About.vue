<template>
  <div class="about container">
    <h1>This is an about page</h1>
    <div v-if="presentGua" class="row mt-5 justify-content-center">
      <Gua :guaInfo="presentGua" :location="location" />
      <template v-if="location != 0">
        <div class="col-1 arrow-center">
          <div class="">
            <i class="arrow right"></i>
          </div>
        </div>
        <Gua :guaInfo="futureGua" :location="location" />
      </template>
    </div>
    <div class="row mt-5 justify-content-center">
      <div class="col-3">
        <button type="button" class="btn btn-primary" @click="getGua">得卦</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { Gua64 } from "../guaModel/gua/Gua64"
import { IChing } from "../guaModel/IChing"
import { toBinary } from "../js"
import Gua from "../components/Gua/Gua.vue"
export default defineComponent({
  components: {
    Gua,
  },
  setup() {
    const iching = new IChing()
    const presentGua = ref<Gua64>()
    const futureGua = ref<Gua64>()
    const location = ref<number>()
    const presentGua_ = {
      Name: "艮為山",
      GuaNumber: 36,
      GuaOrder: "52",
      AboveGua: { Name: "艮", GuaNumber: 4, GuaOrder: "7" },
      BelowGua: { Name: "艮", GuaNumber: 4, GuaOrder: "7" },
    }
    const futureGua_ = {
      Name: "火地晉",
      GuaNumber: 40,
      GuaOrder: "35",
      AboveGua: { Name: "離", GuaNumber: 5, GuaOrder: "3" },
      BelowGua: { Name: "坤", GuaNumber: 0, GuaOrder: "8" },
    }
    const location_ = 12

    const locationArray = computed(() => {
      if (location.value != undefined) {
        return toBinary(location.value)
      }
      return null
    })

    const getGua = () => {
      ;[presentGua.value, futureGua.value, location.value] =
        iching.GetDivnationResult()
    }
    return {
      presentGua,
      futureGua,
      location,
      locationArray,
      getGua,
      toBinary,
    }
  },
})
</script>

<style lang="scss" scoped>
* {
  // border: 1px solid gray;
}
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