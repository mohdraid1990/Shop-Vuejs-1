<template>
  <div class="home">
    <div class="images">
      <img src="@/assets/55555553.jpg" alt="#" />
    </div>
    <div class="text">
      <h1>Fashion perfect</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
    </div>

    <div class="btn" @click="navigateToShop">
      <span>Shop Now</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToShop = () => {
  router.push({ name: "Shop" });
};
</script>

<style lang="scss" scoped>
.home {
  padding-top: 120px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(130, 157, 190, 0.89);
  min-height: 100vh;
  .images {
    width: 500px;
    height: 500px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 5px solid rgb(51, 153, 114);
      border-radius: 50px;
      cursor: pointer;
    }
  }
  .text {
    padding-top: 20px;
    h1 {
      font-size: 35px;
      color: rgb(7, 49, 28);
      text-align: center;
    }
    p {
      font-size: 20px;
      color: rgb(58, 99, 58);
    }
  }
  .btn {
    margin-top: 20px;
    width: 300px;
    padding: 10px;
    background-color: rgb(115, 81, 146);
    transition: 0.2s all ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    cursor: pointer;
    font-size: 20px;
    font-family: "Courier New", Courier, monospace;
    &:hover {
      background-color: rgba(163, 66, 82, 0.849);
    }
    span {
      text-align: center;
      color: rgb(190, 182, 182);
      text-decoration: none;
    }
  }
}

// Media query
@media (max-width: 768px) {
  .home {
    .images {
      width: 350px;
      height: 350px;
    }
    .text {
      h1 {
        font-size: 28px;
      }
      p {
        font-size: 18px;
      }
    }
    .btn {
      width: 250px;
      padding: 8px;
      font-size: 18px;
    }
  }
}

@media (max-width: 480px) {
  .home {
    .images {
      width: 300px;
      height: 300px;
    }
    .text {
      h1 {
        font-size: 24px;
      }
      p {
        font-size: 16px;
      }
    }
    .btn {
      width: 200px;
      padding: 6px;
      font-size: 16px;
    }
  }
}
</style>
