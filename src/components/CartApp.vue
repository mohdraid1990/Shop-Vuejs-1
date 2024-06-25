<template>
  <div
    class="cart"
    :class="{
      'cart-visible': props.showCartModal,
      'cart-hidden': !props.showCartModal,
    }"
  >
    <div class="cart-header">
      <h2>Shopping Cart</h2>
      <button @click="closeCart">Close</button>
    </div>
    <div class="cart-body">
      <div v-if="cartItems.length > 0" class="cart-items">
        <div
          v-for="(item, index) in cartItems"
          :key="item.id"
          class="cart-item"
        >
          <span class="item-number">{{ index + 1 }}.</span>
          <img
            :src="item.images[0]"
            :alt="item.title"
            class="cart-item-image"
          />
          <div class="cart-item-info">
            <h3>{{ item.title }}</h3>
            <p>Price: {{ item.price }} $</p>
            <p>Quantity: {{ item.quantity }}</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item.id)">-</button>
              <button @click="increaseQuantity(item.id)">+</button>
            </div>
            <button @click="removeFromCart(item.id)">Remove</button>
          </div>
        </div>
      </div>
      <div v-else class="empty-cart">
        <p>Your cart is empty.</p>
      </div>
      <div class="cart-footer" v-if="cartItems.length > 0">
        <p class="total">Total: {{ total }} $</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";
import { useCartStore } from "@/stores/cartStore";

const props = defineProps({
  showCartModal: Boolean,
});
const emits = defineEmits(["close-cart"]);
const cartStore = useCartStore();

const cartItems = computed(() => cartStore.items);
const total = computed(() =>
  cartStore.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

const removeFromCart = (id) => cartStore.removeFromCart(id);
const increaseQuantity = (id) => cartStore.incrementQuantity(id);
const decreaseQuantity = (id) => cartStore.decrementQuantity(id);
const closeCart = () => emits("close-cart");
</script>

<style lang="scss">
.cart {
  position: fixed;
  top: 72px;
  right: 0;
  width: 300px;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(58, 52, 52, 0.1);
  z-index: 111;
  display: flex;
  flex-direction: column;

  &.cart-visible {
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;
  }

  &.cart-hidden {
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  }

  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #ddd;

    h2 {
      margin: 0;
      font-size: 20px;
    }

    button {
      border: none;
      font-size: 20px;
      width: 100px;
      cursor: pointer;
      padding: 4px 8px;
      background-color: rgb(77, 50, 50);
      margin-right: 20px;
      border-radius: 10px;
      color: white;
      transition: 0.3s all;
      &:hover {
        background-color: #495091;
      }
    }
  }

  .cart-body {
    flex: 1;
    padding: 16px;
    overflow-y: auto;

    .cart-items {
      .cart-item {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        gap: 10px;

        .cart-item-image {
          width: 50px;
          height: 50px;
          object-fit: cover;
          margin-right: 16px;
          border-radius: 10px;
          cursor: pointer;
        }

        .cart-item-info {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin-top: 15px;

          h3 {
            margin: 0;
            font-size: 18px;
          }

          p {
            margin: 8px 0;
            font-size: 20px;
          }

          .quantity-controls {
            margin-top: 8px;
            display: flex;
            align-items: center;
            justify-content: center;

            button {
              border: none;
              font-size: 25px;
              cursor: pointer;
              padding: 4px 8px;
              background-color: rgb(77, 50, 50);
              margin-right: 20px;
              margin-top: 10px;
              border-radius: 5px;
              width: 70px;
              color: white;
              transition: 0.3s all;
              margin-top: 10px;

              &:hover {
                transform: scale(0.9);
              }
            }
          }

          button {
            background: none;
            border: none;
            border-radius: 10px;
            background-color: #917549;
            transition: 0.3s all;
            color: white;
            padding: 10px;
            cursor: pointer;
            margin-top: 10px;
            &:hover {
              transform: scale(1.2);
            }
          }
        }
      }
    }

    .empty-cart {
      text-align: center;
      font-size: 18px;
      color: #999;
    }

    .cart-footer {
      display: flex;
      justify-content: center;
      padding-top: 10px;

      .total {
        font-size: 25px;
        font-family: sans-serif;
        font-weight: bold;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .cart {
    top: 71px;
    width: 376px;
  }
}
</style>
