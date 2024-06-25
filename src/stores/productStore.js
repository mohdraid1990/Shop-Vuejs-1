// stores/productStore.js
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    loading: true,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products?limit=25"
        );
        const data = await response.json();
        console.log("Fetched data:", data);
        this.products = data.map((product, index) => ({
          ...product,
          id: index + 1,
        }));
        console.log("Products:", this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false;
      }
    },

    updateActiveImage(product, image) {
      product.activeImage = image;
    },
    truncateTitle(title, wordLimit) {
      const words = title.split(" ");
      if (words.length <= wordLimit) {
        return title;
      }
      return words.slice(0, wordLimit).join(" ") + "...";
    },
    async placeOrder(productId) {
      try {
        const res = await fetch("https://fakestoreapi.com/carts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        console.log("Order placed:", data);
      } catch (error) {
        console.error("Error placing order:", error);
      }
    },
  },
});
