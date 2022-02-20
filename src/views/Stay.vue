<script>
export default {
  name: "Stay",
  // 切換頁面時清空畫面
  beforeRouteEnter(to, from, next) {
    useStore().personState = false;
    if (from.name === "ScenicSpot") {
      useStore().clearData();
      useStore().clearInput();
    }
    next();
  },
};
</script>

<script setup>
import Litepicker from "litepicker";
import "litepicker/dist/plugins/ranges";
import FilterList from "../components/FilterList.vue";
import CountModal from "../components/CountModal.vue";
import { useStore } from "../store/index";
import { storeToRefs } from "pinia";
import { cityList } from "../utils/cityList";
import { onMounted } from "vue";

const store = useStore();
const { adultsCount, kidCount, cityName, searchHotel, filterHotelList } =
  storeToRefs(store);
store.listToggle = false;

function clearDate() {
  document.getElementById("litepicker").value = "";
}

onMounted(() => {
  new Litepicker({
    element: document.getElementById("litepicker"),
    plugins: ["ranges"],
    lang: "zh-tw",
    format: `YY/MM/DD`,
  });

  if (store.date) {
    document.getElementById("litepicker").value = store.date;
  }
});
</script>

<template>
  <div class="container-box">
    <div class="row">
      <div class="col-12 col-lg-6" style="position: relative">
        <div
          class="row align-items-center bg-secondary py-3 py-sm-2 px-4 rounded-4"
          style="height: 100%; overflow: hidden"
        >
          <div class="col-12 col-sm-3 p-0">
            <div class="d-flex flex-nowrap pe-3 divider">
              <i class="bi bi-geo-alt fs-4 me-2 text-white"></i>
              <select
                v-model="cityName"
                class="form text-primary"
                style="letter-spacing: 1px; width: 100%"
              >
                <option value selected="selected" disabled>{{ $t("__destination") }}</option>
                <option
                  v-for="item in cityList.group"
                  :key="item"
                  :value="item.enName"
                >{{ item.cityName }}</option>
              </select>
            </div>
          </div>
          <div class="col-12 col-sm-5 p-0 my-2 my-sm-0">
            <div class="d-flex flex-nowrap ps-0 ps-sm-3 divider">
              <i class="bi bi-calendar4 fs-4 me-2 text-white"></i>
              <input
                class="form text-primary"
                type="text"
                id="litepicker"
                :placeholder="$t('__choose_date')"
                style="letter-spacing: 1px; width: 100%"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="col-12 col-sm-4 p-0">
            <div class="d-flex flex-nowrap align-items-center ps-0 ps-sm-3">
              <i class="bi bi-people fs-4 me-2 text-white"></i>
              <a
                @click="store.togglePopup()"
                class="text-start text-primary text-decoration-none form"
              >
                <span v-if="!store.personState" style="white-space: nowrap">{{ $t("__add_people") }}</span>
                <span v-else style="white-space: nowrap">
                  {{
                    `${adultsCount} ${$t("__adults")} + ${kidCount} ${$t("__kids")}`
                  }}
                </span>
              </a>
              <div style="top: -30px; right: -50px; position: absolute">
                <CountModal></CountModal>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 mt-3 mt-lg-0 pe-0">
        <div class="row align-items-center">
          <div class="col-9 p-0">
            <div class="row align-items-center ms-0 ms-lg-3 bg-secondary py-2 px-4 rounded-4">
              <div class="col-9">
                <div class="d-flex flex-nowrap">
                  <i class="bi bi-grid fs-4 me-3 text-white"></i>
                  <input v-model="searchHotel" class="form" type="text" style="width: 100%" />
                </div>
              </div>
              <div class="col-3 d-flex justify-content-end">
                <button
                  @click="store.getHotel()"
                  type="button"
                  class="btn btn-primary rounded-3 px-2 py-1"
                >
                  <i class="bi bi-search fs-5"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div
              @click="store.clearInput(); clearDate();"
              class="d-flex align-items-center justify-content-center mx-auto clear-btn"
            >
              <i class="bi bi-x fs-3"></i>
              <span style="white-space: nowrap" class="d-none d-sm-block">{{ $t("__clear") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FilterList :list="filterHotelList"></FilterList>
  </div>
</template>

<style scoped>
::placeholder {
  color: #ffd803;
  letter-spacing: 1px;
}
</style>
