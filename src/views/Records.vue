<template>
  <div id="save" class="container">
    <div v-if="items != null" class="row">
      <div class="col">
        <table class="table table-hover text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">本卦</th>
            <th scope="col">變卦</th>
            <th scope="col">日期</th>
            <th scope="col">問題描述</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item.id"
            @click="clickGua(item.id)"
          >
            <th scope="row">{{ index }}</th>
            <td>{{ item.presentGua }}</td>
            <td>{{ item.futureGua }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.discription }}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <button class="btn btn-secondary" @click="clearAll">清除所有資料</button>
      </div>
    </div>
    <div
      class="modal fade"
      id="GuaPanel"
      tabindex="-1"
      aria-labelledby="GuaPanelLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div v-if="GuaResult != null" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="GuaPanelLabel">{{ GuaResultSave.date }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <GuaComponent :GuaResult="GuaResult" />
            <Discription :date="GuaResultSave.date" :discription="GuaResultSave.discription"/>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue"
import { openDB } from "idb"
import moment from "moment"
import { GuaResultSaveType } from "@/type/GuaType"
import { GuaResultType } from "@/guaModel/types"
import { Gua64 } from "@/guaModel/gua/Gua64"
import { Modal } from "bootstrap"
import GuaComponent from "@/components/Gua/GuaComponent.vue"
import Discription from "@/components/Discription.vue"

export default defineComponent({
  name: "Records",
  components: {
    GuaComponent,
    Discription
  },
  setup() {
    let modal: Modal | null = null

    onMounted(() => {
      const ele = document.getElementById("GuaPanel")!
      modal = new Modal(ele)
    })

    const dbPromise = openDB("record", 1, {
      upgrade(db) {
        db.createObjectStore("save")
      },
    })
    const items = ref<GuaResultSaveType[] | null>(null)
    const getData = () => {
      dbPromise
        .then((db) => {
          return db.transaction("save").objectStore("save").getAll()
        })
        .then((d) => {
          d.sort((a: GuaResultSaveType, b: GuaResultSaveType): number => {
            let _a = moment(a.date, "YYYY/MM/DD, h:mm:ss a")
            let _b = moment(b.date, "YYYY/MM/DD, h:mm:ss a")
            return _b.diff(_a)
          })
          return (items.value = d)
        })
    }
    getData()
    const GuaResultSave = ref<GuaResultSaveType | null>(null)
    const GuaResult = ref<GuaResultType | null>(null)
    
    const GuaResultToNormal = (GuaResultSave: GuaResultSaveType): GuaResultType=>{
      return {
        PresentGua: new Gua64(parseInt(GuaResultSave.presentGua)),
        FutureGua: new Gua64(parseInt(GuaResultSave.futureGua)),
        varianceNumber: GuaResultSave.varianceNumber
      }
    }
    const clickGua = (id: string) => {
      dbPromise
        .then((db) => {
          return db.transaction("save").objectStore("save").get(id)
        })
        .then((d: GuaResultSaveType) => {
          GuaResultSave.value = d
          GuaResult.value = GuaResultToNormal(d)
          // console.log(d)
          modal?.show()
        })
    }
    const clearAll = async () => {
      try {
        const tx = (await dbPromise)
          .transaction("save", "readwrite")
          .objectStore("save")
          .clear()
        getData()
      } catch (e) {
        alert(e)
      }
    }
    return {
      items,
      GuaResultSave,
      GuaResult,
      clickGua,
      clearAll,
    }
  },
})
</script>
<style lang="scss" scoped>
.table-hover {
  cursor: pointer;
}
</style>
