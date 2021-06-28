<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }" replace
        >易經</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-for="path in paths" :key="path.name" class="nav-item">
            <router-link class="nav-link" :to="{ name: path.name }" :replace="path.isReplace">
              {{ path.text }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- <img src="./assets/background.jpg" alt=""> -->
  <router-view v-slot="{ Component }">
    <keep-alive include="IChing,Plum">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  setup() {
    const paths = reactive([
      {
        name: "Home",
        text: "首頁",
        isReplace: false
      },
      {
        name: "IChing",
        text: "卜卦",
        isReplace: true
      },
      {
        name: "Plum",
        text: "梅花易",
        isReplace: true
      },
      {
        name: "Records",
        text: "記錄",
        isReplace: false
      },
      {
        name: "64gua",
        text: "六十四卦",
        isReplace: false
      },
    ])
    return {
      paths,
    }
  },
})
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
