<template>
  <div class="product-detail" v-if="product">
    <h1 class="product-title">{{ product.title }}</h1>
    <h2 class="product-rating" v-if="product.rating">
      Rating: {{ product.rating.rate }}
    </h2>
    <div class="image-container">
      <transition-group name="fade" tag="div" class="main-image-wrapper">
        <img
          v-for="(image, index) in [activeImage]"
          :src="image"
          :alt="'Product Image ' + index"
          class="main-image"
          :key="image"
        />
      </transition-group>
      <div class="thumbnail-images">
        <img
          v-for="(image, index) in product.images"
          :src="image"
          :alt="'Image ' + index"
          :key="index"
          class="thumbnail"
          @click="updateActiveImage(image)"
        />
      </div>
    </div>
    <div class="details">
      <p class="price">Price: ${{ product.price }}</p>
      <p class="description">{{ product.description }}</p>
      <button class="order-button" @click="handleOrder(product.id)">
        Order Now
      </button>
    </div>
    <!-- Modal for Cart -->
    <div v-if="showCartModal" class="cart-modal">
      <CartApp :showCartModal="showCartModal" @close-cart="closeCartModal" />
    </div>
    <!-- End Modal for Cart -->
  </div>
  <div v-else class="loading">
    <p>Loading product details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";
import CartApp from "@/components/CartApp.vue";

const productStore = useProductStore();
const cartStore = useCartStore();
const route = useRoute();

const product = ref(null);
const activeImage = ref("");
const showCartModal = ref(false);

onMounted(async () => {
  const productId = route.params.id;
  await productStore.fetchProducts();
  product.value = productStore.products.find(
    (p) => p.id === parseInt(productId)
  );
  if (product.value) {
    activeImage.value = product.value.images[0];
  }
});

const handleOrder = async (productId) => {
  const productToOrder = productStore.products.find((p) => p.id === productId);
  if (productToOrder) {
    await productStore.placeOrder(productId);
    cartStore.addToCart(productToOrder);
    console.log("Order placed:", productToOrder);
    openCartModal();
    setTimeout(closeCartModal, 3000); // يغلق الكارت تلقائيًا بعد 3 ثوانٍ
  } else {
    console.error("Product not found:", productId);
  }
};
const updateActiveImage = (image) => {
  activeImage.value = image;
};

const openCartModal = () => {
  showCartModal.value = true;
};

const closeCartModal = () => {
  showCartModal.value = false;
};
</script>

<style lang="scss" scoped>
$product-color: #4276b9;
$product-hover-color: #36a953;
$product-title-color: #463545;
$product-price-color: #1b0a5a;
$loading-color: #b66d6d;
$transition-duration: 0.6s;
$animation-duration: 0.6s;

.product-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  background-color: #48496775;
  width: 100%;
  min-height: 100vh;
}

.product-title {
  font-size: 40px;
  margin-bottom: 15px;
  color: $product-title-color;
  font-weight: bold;
  text-align: center;
}

.product-rating {
  font-size: 20px;
  margin-bottom: 15px;
  color: darken($product-title-color, 10%);
}

.image-container {
  position: relative;

  .main-image-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .main-image {
      width: 100%;
      max-width: 400px;
      height: auto;
      border-radius: 15px;
      object-fit: cover;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform $animation-duration ease-in,
        opacity $animation-duration ease-in;
    }
  }

  .thumbnail-images {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;

    .thumbnail {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 10px;
      cursor: pointer;
      transition: transform $transition-duration,
        box-shadow $transition-duration;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

.details {
  margin-top: 25px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;

  .price {
    font-size: 24px;
    color: $product-price-color;
    font-weight: bold;
  }

  .description {
    font-size: 20px;
    color: darken($product-title-color, 80%);
  }

  .order-button {
    padding: 12px 25px;
    font-size: 16px;
    background-color: $product-color;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color $transition-duration,
      transform $transition-duration;

    &:hover {
      background-color: $product-hover-color;
      transform: scale(1.05);
    }
  }
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 12px;
  color: $loading-color;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-duration,
    transform $animation-duration ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95) rotate(-5deg);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1) rotate(7deg);
}

// .cart-modal {
//   position: fixed;
//   top: 0;
//   right: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: flex-end;

//   .cart {
//     width: 300px;
//     background-color: #fff;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     transition: transform 0.3s ease;
//   }
// }
</style>
