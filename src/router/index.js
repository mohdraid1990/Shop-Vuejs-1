import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      title: "Home",
    },
  },
  {
    path: "/Shop",
    name: "Shop",
    component: () => import("../views/ShopApp.vue"),
    meta: {
      title: "Shop",
    },
  },
  {
    path: "/About",
    name: "About",
    component: () => import("../views/AboutView.vue"),
    meta: {
      title: "About",
    },
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: () => import("../components/ProductDetail.vue"),
    meta: {
      title: "Product Detail",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, fromRoute, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
