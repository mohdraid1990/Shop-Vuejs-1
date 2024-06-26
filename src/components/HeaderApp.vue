<template>
  <div class="app">
    <header :class="{ 'scrolled-nav': scrollNav }">
      <nav>
        <div class="logo">
          <h1>Shop</h1>
        </div>
        <ul v-show="!mobile" class="navigation">
          <li v-for="link in visibleRoutes" :key="link.name">
            <router-link :to="link.path" @click="handleLinkClick">{{
              link.meta.title
            }}</router-link>
          </li>
        </ul>
        <transition
          name="fade-in-out"
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <ul v-show="mobileNav" class="dropdown-nav">
            <li v-for="link in visibleRoutes" :key="link.name">
              <router-link :to="link.path" @click="handleLinkClick">{{
                link.meta.title
              }}</router-link>
            </li>
          </ul>
        </transition>
        <div class="cart-icon" @click="toggleCart">
          <i class="fa-solid fa-shopping-cart"></i>
        </div>
        <div
          @click="toggleMobileNav"
          v-show="mobile"
          class="icon"
          :class="{ 'icon-active': mobileNav }"
        >
          <i class="fa-solid fa-bars"></i>
        </div>
      </nav>
    </header>
    <CartApp
      v-if="showCart"
      :showCartModal="showCart"
      @close-cart="toggleCart"
    />
    <router-view />
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
// import { useProductStore } from "@/stores/productStore";
import CartApp from "@/components/CartApp.vue";

const router = useRouter();
const myRoutes = ref([]);
const mobile = ref(true);
const mobileNav = ref(false);
const windowwidth = ref(null);
const scrollNav = ref(false);
const showCart = ref(false);
// const productStore = useProductStore();
// const cartItemsCount = computed(
//   () => productStore.products.filter((product) => product.inCart).length
// );

const updateScroll = () => {
  const scrollposition = window.scrollY;
  scrollNav.value = scrollposition > 50;
};

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
  if (mobileNav.value) {
    showCart.value = false; // إغلاق الكارت عند فتح الناف بار
  }
};

const toggleCart = () => {
  showCart.value = !showCart.value;
  if (showCart.value) {
    mobileNav.value = false; // إغلاق الناف بار عند فتح الكارت
  }
};

const cheackScreen = () => {
  windowwidth.value = window.innerWidth;
  if (windowwidth.value <= 850) {
    mobile.value = true;
  } else {
    mobile.value = false;
    mobileNav.value = false;
  }
};

const handleLinkClick = () => {
  if (mobile.value) {
    mobileNav.value = false;
  }
};

const visibleRoutes = computed(() =>
  myRoutes.value.filter((route) => route.name !== "ProductDetail")
);

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
});

onMounted(() => {
  myRoutes.value = router.options.routes;
  cheackScreen();
  window.addEventListener("resize", cheackScreen);
  window.addEventListener("scroll", updateScroll);
});
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  header {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    position: fixed;
    transition: all 0.4s ease;
    z-index: 99999999999;

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      transition: all 0.4s ease;
      width: 75%;
      margin: 0 auto;
      position: relative;

      .logo {
        display: flex;
        align-items: center;

        h1 {
          font-size: 40px;
          font-style: italic;
          font-weight: 400;
          color: #f39c12;
        }
      }

      .icon {
        cursor: pointer;
        font-size: 24px;
        transition: 0.4s ease all;
        color: #fff;
      }

      .icon-active i {
        transform: rotate(180deg);
      }

      .navigation {
        display: flex;
        gap: 20px;
        align-items: center;

        li {
          list-style: none;
          text-transform: uppercase;
          margin-left: 16px;

          a {
            text-decoration: none;
            color: #7b7194;
            font-size: 20px;
            transition: all 0.4s ease;
            padding-bottom: 4px;
            &.router-link-exact-active {
              color: #f39c12;
            }

            &:hover {
              color: #f39c12;
            }

            &.router-link-exact-active {
              color: #f39c12;
            }
          }
        }
      }

      .dropdown-nav {
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100%;
        max-width: 250px;
        height: 100%;
        background-color: #555;
        top: 0;
        left: 0;
        z-index: 99999999;

        li {
          list-style: none;
          font-size: 24px;
          margin-left: 0;
          margin-top: 20px;

          a {
            text-decoration: none;
            color: #fff;
            margin-left: 25px;
          }
        }
      }

      .fade-in-out-enter-active,
      .fade-in-out-leave-active {
        transition: opacity 0.5s ease;
      }

      .fade-in-out-enter-from,
      .fade-in-out-leave-to {
        opacity: 0;
      }

      .cart-icon {
        position: relative;
        cursor: pointer;
        color: #7ebb2f;
        font-size: 24px;
        margin-left: 20px;
        transition: 0.3s all;
        &:hover {
          transform: scale(1.4);
        }
      }
    }
  }
}

.scrolled-nav {
  background-color: #000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);
  nav {
    padding: 8px 0;
    .logo img {
      width: 40px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
