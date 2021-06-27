<template>
  <div class="about container">
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

    <GuaComponent v-if="GuaResult" :GuaResult="GuaResult" />

    <div class="row mt-5 justify-content-center">
      <div class="col-6 col-md-3" style="text-align: center;">
        <button
          v-if="numArray.length != 6"
          type="button"
          class="btn btn-primary"
          @click="Toss"
        >
          Toss
        </button>
        <template v-else>
          <button type="button" class="btn btn-danger mx-1" @click="Reset">
            Reset
          </button>
          <button
            type="button"
            class="btn btn-primary mx-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            :disabled="GuaResult.isSaved"
          >
            Save
          </button>
        </template>
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
                    v-model="GuaResult.discription"
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
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="addHistory"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row"></div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from "vue"
import { Gua64 } from "../guaModel/gua/Gua64"
import { IChing } from "../guaModel/IChing"
import { toBinary } from "../js"
import Gua from "../components/Gua/Gua.vue"
import GuaComponent from "../components/Gua/GuaComponent.vue"
import { GuaResultType } from "../type/GuaType"
import { v4 as uuidV4 } from "uuid"
import { openDB } from "idb"
import moment from "moment"
import { Modal } from "bootstrap"
export default defineComponent({
  name: "Divination",
  components: {
    Gua,
    GuaComponent,
  },
  setup() {
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
    const isSaved = ref(false)
    const addHistory = async () => {
      modal!.hide()
      const _ = (await dbPromise)
        .transaction("save", "readwrite")
        .objectStore("save")
        .put(
          {
            id: GuaResult.value?.id,
            date: GuaResult.value?.date,
            presentGua: GuaResult.value?.presentGua,
            futureGua: GuaResult.value?.futureGua,
            varianceNumber: GuaResult.value?.varianceNumber,
            discription: GuaResult.value?.discription,
            isSaved: !GuaResult.value?.isSaved,
          },
          GuaResult.value?.id
        )
      _.then((event) => {
        modal!.hide()
        GuaResult.value!.isSaved = true
      })
    }

    const iching = new IChing()
    const GuaResult = ref<GuaResultType | null>(null)

    const varianceNumberArray = computed(() => {
      if (GuaResult.value != null) {
        return toBinary(GuaResult.value.varianceNumber)
      }
      return null
    })

    const numArray: number[] = reactive<number[]>([])
    const Toss = () => {
      if (numArray.length <= 6) {
        numArray.push(IChing.GetRandomNumber())
      }
    }
    watch(numArray, () => {
      if (numArray.length == 6) {
        const temp = IChing.ToGua64(numArray)
        GuaResult.value = {
          id: uuidV4(),
          date: moment().format("YYYY/MM/DD, h:mm:ss a"),
          presentGua: temp.PresentGua.GuaOrder,
          futureGua: temp.FutureGua.GuaOrder,
          varianceNumber: temp.varianceNumber,
          discription: "",
          isSaved: false,
        }
      }
    })
    const Reset = () => {
      GuaResult.value = null
      numArray.splice(0)
      isSaved.value = false
    }
    return {
      GuaResult,
      varianceNumberArray,
      numArray,
      isSaved,
      toBinary,
      Reset,
      Toss,
      addHistory,
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
  div{
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