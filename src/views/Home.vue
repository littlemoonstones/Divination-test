<template>
  <div class="container-fluid py-5 p-md-5 jumbotron text-white">
    <div class="p-2 py-md-5">
      <h1 class="display-5 fw-bold">易經卜卦</h1>
      <p class="col-md-8 fs-4">無事不占，不動不占</p>

      <router-link
        tag="button"
        class="btn btn-outline-light"
        type="button"
        :to="{ name: 'IChing' }"
        replace
        >開始卜卦
      </router-link>
    </div>
  </div>
  <div class="home container">
    <div class="p-5 mb-4 rounded-3"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    return {}
  },
})
</script>
<style lang="scss" scoped>
.jumbotron {
  background-image: url("../assets/background.jpg");
  background-size: cover;
  background-position-y: center;
}
</style>
