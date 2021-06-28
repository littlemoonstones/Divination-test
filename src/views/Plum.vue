<template>
  <div class="container mt-3">
    <h1>梅花易</h1>
    <div class="row">
      <div class="input-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Please enter a number"
          aria-describedby="button-addon2"
          v-model="num"
          @keypress.enter="getResult"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          @click="getResult"
          :disabled="isUsed"
        >
          Submit
        </button>
      </div>
    </div>
    <GuaComponent v-if="GuaResult" :GuaResult="GuaResult" />
    <SaveModal
      v-if="isUsed"
      :GuaResult="GuaResult"
      @reset="Reset"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import { Plum } from "@/guaModel/Divinations/Plum"
import GuaComponent from "@/components/Gua/GuaComponent.vue"
import SaveModal from "@/components/SaveModal.vue"
import { GuaResultType } from "@/guaModel/types"
import { GuaResultSaveType } from "@/type/GuaType"
import moment from "moment"
import { v4 as uuidV4 } from "uuid"
export default defineComponent({
  name: "Plum",
  components: {
    GuaComponent,
    SaveModal,
  },
  setup() {
    const isUsed = ref<boolean>(false)
    const num = ref<string>("")
    const Reset = ()=>{
      isUsed.value = false
      GuaResult.value = null
      num.value = ""
    }
    const GuaResult = ref<GuaResultType | null>(null)

    const getResult = ()=>{
      if(isUsed.value || num.value.trim()=="") return
      let n = parseInt(num.value)
      const plum = new Plum(n)
      GuaResult.value = plum.GetDivnationResult()
      isUsed.value = true
    }
    
    return {
      isUsed,
      num,
      GuaResult,
      Reset,
      getResult
    }
  },
})
</script>
