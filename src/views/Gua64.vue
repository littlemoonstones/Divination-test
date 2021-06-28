<template>
  <div class="container-fluid">
    <div class="row mt-4">
      <h1 class="text-center">六十四卦</h1>
    </div>
    <div
      class="
        row
        py-3
        px-0 px-md-5
        d-flex
        flex-wrap
        justify-content-center justify-content-md-start
      "
    >
      <Gua
        v-for="item in items"
        :key="item.id"
        @mouseover="mouseOver(item.GuaOrder)"
        @mouseout="mouseOut()"
        @click="clickGua(item.GuaOrder)"
        :guaInfo="item"
        :varianceNumber="item.GuaOrder == guaId ? 63 : 0"
        class="Gua mb-2 mb-md-3"
      />
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="detailedModal"
    tabindex="-1"
    aria-labelledby="detailedModalLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-lg-down
      "
    >
      <div class="modal-content">
        <template v-if="content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailedModalLabel">
              {{ content.卦序 }} {{ content.卦名 }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="mb-3">
                <p class="h5">{{ content.卦辭.卦象 }}</p>
                <template v-for="explain in GuaExplain" :key="explain">
                  <p>
                    <b>{{ explain }}:</b> {{ content.卦辭[explain] }}
                  </p>
                </template>
                <hr class="dropdown-divider" />
              </div>
              <div class="mb-3" v-for="yao in Yao" :key="yao">
                <p class="h5">{{ content[yao].爻名 }}</p>
                <template v-for="explain in YaoExplain" :key="explain">
                  <p>
                    <b>{{ explain }}:</b> {{ content[yao][explain] }}
                  </p>
                </template>
                <hr class="dropdown-divider" />
              </div>
            </div>
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
        </template>
      </div>
    </div>
  </div>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { Gua64Data } from "@/assets/json/GUA"
import { Gua64 } from "@/guaModel/gua/Gua64"
import { Gua64BundleType } from "@/type/DataType"
import Gua from "@/components/Gua/Gua.vue"
import { Modal } from "bootstrap"
// import json setting: https://hackernoon.com/import-json-into-typescript-8d465beded79
export default defineComponent({
  components: {
    Gua,
  },
  setup() {
    let modal: Modal | null
    const Yao = ["六爻一", "六爻二", "六爻三", "六爻四", "六爻五", "六爻六"]
    const YaoExplain = ["彖文", "彖義", "象文", "象釋"]
    const GuaExplain = ["卦文", "卦白", "象文", "象釋"]
    onMounted(() => {
      const ele = document.getElementById("detailedModal")!
      modal = new Modal(ele)
    })
    const items: Gua64[] = []
    const guaId = ref<number>(0)
    const content = ref<Gua64BundleType | null>(null)

    for (let item of Gua64Data) {
      items.push(new Gua64(item.id))
    }
    const mouseOver = (_id: string) => {
      guaId.value = parseInt(_id)
    }
    const mouseOut = () => (guaId.value = -1)

    content.value = Gua64Data[1]
    const clickGua = (_id: string) => {
      content.value = Gua64Data[parseInt(_id) - 1]
      modal?.show()
    }

    return {
      guaId,
      items,
      content,
      Yao,
      YaoExplain,
      GuaExplain,
      mouseOver,
      mouseOut,
      clickGua,
    }
  },
})
</script>
<style lang="scss" scoped>
.Gua {
  cursor: pointer;
  //   div {
  //     background: green;
  //   }
  //   .blank {
  //     background: transparent;
  //   }
}
</style>