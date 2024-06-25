<template>
  <div class="container">
    <div class="products">
      <div v-if="!productStore.loading" class="product">
        <div
          v-for="product in displayedProducts"
          :key="product.id"
          class="card"
          @click="goToProductDetail(product.id)"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h1>{{ product.id }}</h1>
          <h2 class="title">
            {{ productStore.truncateTitle(product.title, 5) }}
          </h2>
          <p class="Price">Price: ${{ product.price }}</p>
          <div class="images">
            <img
              :src="currentImages[product.id]"
              @click.stop="changeImage(product)"
              alt="Product Image"
              class="active-image"
              :data-aos="imageAnimation"
            />
          </div>
          <button @click.stop="goToProductDetail(product.id)">Order Now</button>
        </div>
      </div>
      <div v-else class="loading">
        <p>Loading products...</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "vue-router";
import AOS from "aos";
import "aos/dist/aos.css";

const productStore = useProductStore();
const router = useRouter();
const currentImages = ref({});
const imageAnimation = ref("fade-up");

const goToProductDetail = (id) => {
  router.push({ name: "ProductDetail", params: { id } });
};

const changeImage = (product) => {
  const currentIndex = product.images.indexOf(currentImages.value[product.id]);
  const nextIndex = (currentIndex + 1) % product.images.length;
  currentImages.value[product.id] = product.images[nextIndex];
  imageAnimation.value = "fade-in"; // Change the animation type if needed
};

const displayedProducts = computed(() => {
  return productStore.products.slice(0, 25);
});

onMounted(() => {
  productStore.fetchProducts().then(() => {
    displayedProducts.value.forEach((product) => {
      currentImages.value[product.id] = product.images[0];
    });
  });
  AOS.init();
  AOS.refresh();
});
</script>

<style lang="scss" scoped>
$primary-color: #42b983;
$primary-hover-color: #36a953;
$card-bg-color: #f8f9fa;
$card-border-color: #ddd;
$card-shadow-color: rgba(0, 0, 0, 0.1);
$card-title-color: #333;
$card-price-color: #31473d;
$loading-color: #b66d6d;

.products {
  padding-top: 120px;
}

.product {
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  width: 350px;
  text-align: center;
  background: $card-bg-color;
  border: 1px solid $card-border-color;
  border-radius: 12px;
  box-shadow: 0px 4px 15px $card-shadow-color;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 20px;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 20px $card-shadow-color;
    background-color: #5c2b7c77;
  }

  .title {
    font-size: 20px;
    color: $card-title-color;
    margin-bottom: 15px;
  }

  .Price {
    font-size: 18px;
    font-weight: bold;
    color: $card-price-color;
    margin-bottom: 20px;
  }

  .images {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    .active-image {
      width: 300px;
      height: 300px;
      object-fit: cover;
      border-radius: 10px;
    }
  }

  button {
    margin-top: 15px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: $primary-color;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-out, transform 0.3s ease-out;

    &:hover {
      background-color: $primary-hover-color;
      transform: scale(1.05);
    }
  }
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 50px;
  color: $loading-color;
}
</style>
