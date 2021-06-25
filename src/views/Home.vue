<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <div v-if="data">{{ data }}</div>
    <button class="btn btn-secondary" @click="click">Click</button>
    <button class="btn btn-primary" @click="getData">Get Data</button>
    <button class="btn btn-secondary" @click="clearAll">Reset</button>
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
    const dbPromise = openDB("myDB", 1, {
      upgrade(db) {
        db.createObjectStore("employee")
      },
    })
    const data = ref<any>(null)
    const click = () => {
      console.log("click")
      dbPromise.then((db) => {
        const tx = db.transaction("employee", "readwrite")
        const data = {
          id: 1,
          name: "dog",
        }
        tx.objectStore("employee")
          .put(data, uuidV4())
          .then((_) => {
            console.log(tx)
          })

        return tx.done
      })
    }
    const getData = () => {
      dbPromise
        .then((db) => {
          return db.transaction("employee").objectStore("employee").getAll()
        })
        .then((d) => (data.value = d))
    }
    const clearAll = async () => {
      const tx = (await dbPromise).transaction("employee", "readwrite")
      await tx.objectStore("employee").clear()
      console.log(tx.done)
      return tx.done
    }
    return {
      click,
      getData,
      clearAll,
      data,
    }
  },
})
</script>
