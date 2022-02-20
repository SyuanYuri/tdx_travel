<script setup>
import { useStore } from "../store/index";
import { storeToRefs } from "pinia";

const store = useStore();
const { adultsCount, kidCount } = storeToRefs(store);

function setpersonState() {
  store.personState = true;
  store.togglePopup();
}
</script>

<template>
  <div
    v-show="store.peoplePopup"
    class="card popup rounded-4 position-absolute"
    style="width: 14rem"
  >
    <button
      @click="store.togglePopup()"
      type="button"
      class="btn-close btn-close-white ms-auto mt-3 me-3"
      aria-label="Close"
    ></button>
    <div class="card-body mb-2 pt-0">
      <div>
        <p class="text-start ps-2">{{ $t("__adults") }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <button :disabled="store.adultsCount === 1" type="button" class="btn text-white">
            <i @click="store.adultsCountCompute('minus')" class="bi bi-dash-lg fs-5"></i>
          </button>
          <span class="border rounded-3 py-2 px-3">{{ adultsCount }}</span>
          <button type="button" class="btn text-white">
            <i @click="store.adultsCountCompute('plus')" class="bi bi-plus-lg fs-5"></i>
          </button>
        </div>
      </div>
      <div>
        <p class="text-start mt-3 ps-2">{{ $t("__kids") }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <button :disabled="store.kidCount === 0" type="button" class="btn text-white">
            <i @click="store.kidCountCompute('minus')" class="bi bi-dash-lg fs-5"></i>
          </button>
          <span class="border rounded-3 py-2 px-3">{{ kidCount }}</span>
          <button type="button" class="btn text-white">
            <i @click="store.kidCountCompute('plus')" class="bi bi-plus-lg fs-5"></i>
          </button>
        </div>
      </div>
      <button
        @click="setpersonState()"
        type="button"
        class="btn btn-primary mt-4"
        style="letter-spacing: 1px; width: 100%;"
      >Add</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  background: #2d334a;
  position: absolute;
  z-index: 500;
  top: 100px;
  right: 75px;
  color: #fff;
}
</style>
