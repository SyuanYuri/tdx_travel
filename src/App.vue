<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar />
  <div style="margin-bottom: 10vh">
    <router-view />
  </div>
  <div class="footer">
    <Footer />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Open Sans", sans-serif;
  letter-spacing: 1px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

html {
  min-height: 100%;
  position: relative;
}

body {
  /* Margin bottom by footer height */
  margin-bottom: 20em;
}

input:focus {
  outline: none;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  margin: 3px 0 5px 0;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 4px;
  border-radius: 4px;
  background: rgb(219, 219, 219);
}

.footer {
  position: relative;
  bottom: 0;
  right: 0;
  left: 0;
}

.litepicker[data-plugins*="ranges"]
  > .container__main
  > .container__predefined-ranges {
  display: none;
}

.form {
  border: none;
  background: #2d334a;
  color: white;
  cursor: pointer;
}

.clear-btn {
  width: 100px;
  cursor: pointer;
  transition: border-color 0.5s ease-in-out;
  border-bottom: 1px solid #fff;
  &:hover {
    border-bottom: 1px solid #000;
  }
}

.container-box {
  padding: 1em 5em;
}

@media (max-width: 1200px) {
  .container-box {
    padding: 1em 2.2em;
  }
}

.divider {
  border-right: 1px solid #fff;
}

@media (max-width: 576px) {
  .divider {
    border-right: 1px solid transparent;
  }
  .clear-btn {
    width: 30px;
  }
}
</style>
