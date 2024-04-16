vue
<template>
  <div class="app">
    <header>
      <nav>
        <div class="logo">
          <img src="@/assets/8989.jpg" alt="#" />
        </div>
        <ul class="navigation">
          <li v-for="link in myRoutes" :key="link.name">
            <router-link :to="link.path">{{ link.meta.title }}</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
.app {
  header {
    position: relative;
    min-height: 100vh;
    nav {
      background-color: rebeccapurple;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .logo img {
        width: 60px;
      }
      .navigation {
        display: flex;
        gap: 40px;
        align-items: center;
      }
    }
  }
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const myRoutes = ref([]);

onMounted(() => {
  myRoutes.value = router.options.routes;
});
</script>
