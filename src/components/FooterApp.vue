<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footer-section about">
        <h2>About Us</h2>
        <p>
          We offer the best fashion products for everyone. Quality and
          affordability are our main goals.
        </p>
      </div>
      <div class="footer-section contact">
        <h2>Contact Us</h2>
        <p>Email: mohdraid62@yahoo.com</p>
        <p>Phone: +79962662350</p>
        <p>Address: Russia, Saratov</p>
      </div>
      <div class="footer-section social">
        <h2>Follow Us</h2>
        <div class="social-links">
          <a href="https://wa.me/+79962662350"
            ><i class="fab fa-whatsapp"></i
          ></a>
          <a
            href="https://www.linkedin.com/in/mohammed-hameed-04b795267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            ><i class="fab fa-linkedin-in"></i
          ></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>
        © <span id="current-year">{{ currentYear }}</span> Created by Mohd. All
        rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const currentYear = ref("");

    onMounted(() => {
      currentYear.value = new Date().getFullYear();
    });

    return {
      currentYear,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 30px 0;
  text-align: center;
  font-family: "Arial", sans-serif;

  .footer-container {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    justify-content: space-between;
    margin: 0 auto;
  }

  .footer-section {
    flex: 1;
    min-width: 200px;
    margin: 20px 0;

    h2 {
      font-size: 18px;
      margin-bottom: 10px;
      color: #f39c12;
    }

    p,
    ul,
    a {
      font-size: 14px;
      color: #bdc3c7;
      margin: 5px 0; /* Add margin to create space between texts */
    }

    a {
      text-decoration: none;
      color: #ecf0f1;
      transition: color 0.2s;

      &:hover {
        color: #f39c12;
      }
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin: 5px 0;
      }
    }
  }

  .social-links {
    display: flex;
    justify-content: center;

    a {
      font-size: 18px;
      color: #ecf0f1;
      margin: 0 10px;
      transition: color 0.2s;

      &:hover {
        color: #f39c12;
      }
    }
  }

  .footer-bottom {
    margin-top: 20px;
    font-size: 14px;
    color: #bdc3c7;
  }
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
