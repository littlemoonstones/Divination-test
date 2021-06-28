<template>
  <div class="row mt-5 justify-content-center">
    <div class="col col-xs-6 col-md-3" style="text-align: center">
      <button type="button" class="btn btn-danger mx-1" @click="emitReset">
        Reset
      </button>
      <button
        type="button"
        class="btn btn-primary mx-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        :disabled="isSaved"
      >
        Save
      </button>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">確認儲存</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-if="GuaResult" class="modal-body">
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Your Description</label
            >
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              v-model="discription"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="discription = ''"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="addHistory">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue"
import { openDB } from "idb"
import { Modal } from "bootstrap"
import { GuaResultType } from "@/guaModel/types"
import { v4 as uuidV4 } from "uuid"
import moment from "moment"

export default defineComponent({
  props: {
    GuaResult: {
      type: Object as PropType<GuaResultType>,
      required: true,
    },
  },
  emits: ["reset"],
  setup(props, { emit }) {
    // https://learnvue.co/2020/09/how-to-deploy-your-vue-app-to-github-pages/
    const dbPromise = openDB("record", 1, {
      upgrade(db) {
        db.createObjectStore("save")
      },
    })

    let modal: Modal | null
    onMounted(() => {
      const ele = document.getElementById("exampleModal")!
      modal = new Modal(ele)
    })
    const discription = ref<string>("")
    const isSaved = ref<boolean>(false)
    const addHistory = async () => {
      modal!.hide()
      const id = uuidV4()
      const _ = (await dbPromise)
        .transaction("save", "readwrite")
        .objectStore("save")
        .put(
          {
            id,
            date: moment().format("YYYY/MM/DD, h:mm:ss a"),
            presentGua: props.GuaResult.PresentGua.GuaOrder,
            futureGua: props.GuaResult.FutureGua.GuaOrder,
            varianceNumber: props.GuaResult.varianceNumber,
            discription: discription.value,
            isSaved: true,
          },
          id
        )
      _.then((event) => {
        modal!.hide()
        isSaved.value = true
      }).catch((error) => {
        console.log(error)
        alert(error)
        isSaved.value = false
      })
    }

    const emitReset = () => {
      discription.value = ""
      isSaved.value = false
      emit("reset")
    }

    return {
      discription,
      isSaved,
      addHistory,
      emitReset,
    }
  },
})
</script>
