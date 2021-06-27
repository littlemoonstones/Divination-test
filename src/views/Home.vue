<template>
  <div class="home">
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import HelloWorld from "@/components/HelloWorld.vue" // @ is an alias to /src
import { openDB } from "idb"
import { v4 as uuidV4 } from "uuid"

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    
    return {
      
    }
  },
})
</script>
