<template>
  <div class="row justify-content-center">
    <div class="mb-3 row">
      <label for="date" class="col-sm-2 col-form-label">Date</label>
      <div class="col-sm-10">
        <input
          type="text"
          readonly
          class="form-control-plaintext"
          id="date"
          :value="date"
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
          v-model="discription"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    date: String,
    discription: String,
  },
  setup() {},
})
</script>
