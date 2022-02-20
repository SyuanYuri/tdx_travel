<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const changeLanguage = (e) => {
  locale.value === "tw" ? (locale.value = "en") : (locale.value = "tw");
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light px-6">
    <div class="container-fluid">
      <a class="navbar-brand border-0" href="#">
        <img src="../assets/images/logo.svg" alt style="width: 100px" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        aria-controls="navbar"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 fw-bold">
          <li class="nav-item tab">
            <router-link to="/" class="nav-link text-secondary">{{ $t("__home") }}</router-link>
          </li>
          <li class="nav-item mx-lg-4 tab">
            <router-link to="/scenicSpot" class="nav-link text-secondary">{{ $t("__scenic") }}</router-link>
          </li>
          <li class="nav-item tab">
            <router-link to="/Stay" class="nav-link text-secondary">{{ $t("__stay") }}</router-link>
          </li>
        </ul>
        <form class="d-flex justify-content-center">
          <i
            @click="changeLanguage($event)"
            class="bi bi-globe2 fs-4 mt-1 language-icon"
            style="cursor: pointer"
          ></i>
          <button
            type="button"
            class="btn btn-primary ms-4 px-4 fw-bolder"
            style="border-radius: 16px; letter-spacing: 1px"
          >{{ $t("__login") }}</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a {
  border-bottom: 1px solid transparent;
}
a:hover,
a.router-link-exact-active {
  border-bottom: 1px solid #2d334a;
}

.language-icon:active {
  color: #737b7d;
}

.tab {
  width: 130px;
}

@media (max-width: 1000px) {
  .tab {
    width: auto;
  }
}
</style>
