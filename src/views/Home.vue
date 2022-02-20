<script setup>
import Litepicker from "litepicker";
import "litepicker/dist/plugins/ranges";
import { onMounted, reactive } from "vue";
import { useStore } from "../store/index";
import { storeToRefs } from "pinia";
import moment from "moment";
import Swiper from "swiper/bundle";
import { Grid } from "swiper";
import "swiper/css/bundle";
import { classList } from "../utils/classList";
import { cityList } from "../utils/cityList";
import router from "../router";
import CountModal from "../components/CountModal.vue";

const store = useStore();
store.getAllActivity();
const { adultsCount, kidCount, cityName, activityList } = storeToRefs(store);

const categoryList = reactive(Object.assign([], classList.group));

function mouseOver(index) {
  categoryList[index].active = !categoryList[index].active;
}

function searchScenicSpot() {
  const date = document.getElementById("litepicker").value;
  store.setDate(date);
  router.push("/scenicSpot");
}

// Swiper 斷點設置
const breakpointsObj = {
  320: {
    slidesPerView: 1.5,
  },
  480: {
    slidesPerView: 2,
  },
  640: {
    slidesPerView: 3,
  },
  960: {
    slidesPerView: 4,
  },
  1280: {
    slidesPerView: 5,
  },
  1920: {
    slidesPerView: 6,
  },
};

onMounted(() => {
  new Swiper(".classSwiper", {
    spaceBetween: 30,
    slidesPerGroup: 3,
    loopFillGroupWithBlank: true,
    breakpoints: breakpointsObj,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  new Swiper(".eventSwiper", {
    spaceBetween: 30,
    modules: [Grid],
    grid: {
      rows: 2,
      fill: "row",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: breakpointsObj,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  new Litepicker({
    element: document.getElementById("litepicker"),
    plugins: ["ranges"],
    lang: "zh-tw",
    format: `YY/MM/DD`,
  });
});
</script>

<template>
  <div class="position-relative">
    <div class="d-flex flex-column container-box">
      <div class="position-absolute" style="right: 50px">
        <img
          src="../assets/images/home-round-md.png"
          alt="homepage-image"
          class="position-absolute"
          style="max-height: 50vh; right: 15em; bottom: 3em; z-index: -150"
        />
        <img
          class="position-absolute"
          src="../assets/images/home-round-lg.png"
          alt="homepage-image"
          style="max-height: 80vh; bottom: 2em; z-index: -200"
        />
        <img
          src="../assets/images/Saly-3.png"
          alt="homepage-image"
          class="position-sticky"
          style="max-height: 80vh; top: 50px; z-index: -100"
        />
      </div>
      <div class="text-start">
        <h2 class="font fw-bold text-dark" style="font-size: 80px">
          Reward yourself
          <br />for a little holiday
        </h2>
        <p class="text-grey-dark">{{ $t("__project") }}</p>
      </div>

      <div
        class="d-inline-flex flex-column flex-md-row align-self-start justify-content-start bg-secondary text-white rounded-4 py-4 py-md-3 px-4 search-box"
      >
        <div class="d-flex flex-row flex-md-column justify-content-md-between pe-5 search-line">
          <span class="d-flex">
            <i class="bi bi-geo-alt fs-5 me-2"></i>
            <p class="my-auto search-title">{{ $t("__location") }}</p>
          </span>
          <select v-model="cityName" class="form" style="letter-spacing: 1px">
            <option value selected="selected" disabled>{{ $t("__find_destination") }}</option>
            <option
              v-for="item in cityList.group"
              :key="item"
              :value="item.enName"
            >{{ item.cityName }}</option>
          </select>
        </div>
        <div
          class="d-flex flex-row flex-md-column justify-content-md-between px-0 px-md-4 my-3 my-md-0 search-line"
        >
          <span class="d-flex">
            <i class="bi bi-calendar4 fs-5 me-2"></i>
            <p class="my-auto search-title">{{ $t("__date_range") }}</p>
          </span>
          <input
            class="form"
            type="text"
            id="litepicker"
            :placeholder="$t('__choose_date')"
            style="letter-spacing: 1px; width: 100%;"
            autocomplete="off"
          />
        </div>
        <div
          class="d-flex flex-row flex-md-column justify-content-md-between ps-0 pe-0 ps-md-4 pe-md-5 mb-3 mb-md-0"
        >
          <span class="d-flex">
            <i class="bi bi-people fs-5 me-2"></i>
            <p class="my-auto search-title">{{ $t("__total_person") }}</p>
          </span>
          <a @click="store.togglePopup()" class="text-start text-white text-decoration-none form">
            <span v-if="!store.personState">{{ $t("__add_people") }}</span>
            <span v-else>{{ `${adultsCount} ${$t("__adults")} + ${kidCount} ${$t("__kids")}` }}</span>
          </a>
          <CountModal></CountModal>
        </div>
        <button
          @click="searchScenicSpot()"
          type="button"
          class="ms-4 btn btn-primary rounded-4 px-3"
        >
          <i class="bi bi-search fs-4"></i>
        </button>
      </div>

      <div class="align-self-start text-start text-dark">
        <p class="fw-bold my-auto">{{ $t("__nearby_location") }}</p>
        <!-- 動態更改城市 -->
        <div class="d-flex align-items-center">
          <span class="font fw-bold fs-1">
            <p class="my-auto" v-if="store.cityName">{{ store.cityName }}</p>
            <p class="my-auto" v-else>Beitou Park, Taipei</p>
          </span>
          <button type="button" class="ms-5 btn btn-primary rounded-4">
            <i class="bi bi-arrow-right fs-5"></i>
          </button>
        </div>
        <small>{{ $t("__current_location") }}</small>
      </div>

      <div class="align-self-center services-container" style="margin: 5em 0">
        <h3 class="font fw-bold" style="font-size: 64px">Our services for your needs.</h3>
        <p class="mx-auto" style="max-width: 770px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est libero
          varius luctus fermentum leo cras metus, urna. Suspendisse dolor
          dignissim adipiscing arcu.
        </p>
        <img
          class="position-absolute"
          src="../assets/images/home-round-sm.png"
          alt="homepage-image"
        />
        <img class="position-absolute" src="../assets/images/Saly-8.png" alt="homepage-image" />
      </div>

      <div class="d-flex flex-column flex-md-row">
        <div class="d-flex flex-column">
          <i class="bi bi-chat-square-text fs-1"></i>
          <p class="fw-bold my-3">Synchronous planning</p>
          <small>
            At eripuit signiferumque sea, vel ad mucius molestie, cu labitur
            iuvaret vulputate sed.
          </small>
          <button
            type="button"
            class="mx-auto btn btn-outline-secondary rounded-4 mt-4 px-3 py-2 fw-bold"
            style="letter-spacing: 1px"
          >Discover</button>
        </div>
        <div class="d-flex flex-column mx-5 my-5 my-md-0">
          <i class="bi bi-cash-coin fs-1"></i>
          <p class="fw-bold my-3">Low Fare Calendar</p>
          <small>
            At eripuit signiferumque sea, vel ad mucius molestie, cu labitur
            iuvaret vulputate sed.
          </small>
          <button
            type="button"
            class="mx-auto btn btn-outline-secondary rounded-4 mt-4 px-3 py-2 fw-bold"
            style="letter-spacing: 1px"
          >Discover</button>
        </div>
        <div class="d-flex flex-column">
          <i class="bi bi-map fs-1"></i>
          <p class="fw-bold my-3">Tourism integration</p>
          <small>
            At eripuit signiferumque sea, vel ad mucius molestie, cu labitur
            iuvaret vulputate sed.
          </small>
          <button
            type="button"
            class="mx-auto btn btn-outline-secondary rounded-4 mt-4 px-3 py-2 fw-bold"
            style="letter-spacing: 1px"
          >Discover</button>
        </div>
      </div>
    </div>

    <div class="align-self-start bg-light p-4" style="width: 100%">
      <p class="text-start fw-bold m-auto">{{ $t("__category") }}</p>
      <h4 class="text-start font fw-bold fs-2 my-2">Tour in any way</h4>
      <p class="text-start" style="max-width: 400px">{{ $t("__category_directions") }}</p>

      <div class="swiper classSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in categoryList" :key="item.className">
            <div class="card slide-card" @mouseover="mouseOver(index)" @mouseout="mouseOver(index)">
              <img :src="item.picture" class="card-img-top slide-img" />
              <div class="card-img-overlay p-0">
                <h6
                  class="card-title text-white w-100 m-0 py-3 position-absolute"
                  style="
                    background-color: rgba(0, 0, 0, 0.5);
                    bottom: -1px;
                    letter-spacing: 2px;
                  "
                >
                  {{ item.className }}
                  <br />
                  <span
                    v-show="item.active"
                    :class="{ 'd-inline-flex': item.active }"
                    class="my-1 py-1 border-top"
                  >
                    Explore More
                    <i class="bi bi-arrow-right-short"></i>
                  </span>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>

    <div class="align-self[-start p-4 mt-5" style="width: 100%">
      <p class="text-start fw-bold m-auto">{{ $t("__event") }}</p>
      <h4 class="text-start font fw-bold fs-2 my-2">Release your energy</h4>
      <p class="text-start" style="max-width: 400px">{{ $t("__event_directions") }}</p>

      <div class="swiper eventSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in activityList" :key="item.ActivityID">
            <div class="card slide-card">
              <img :src="item.Picture.PictureUrl1" class="card-img-top slide-img" />
              <div class="card-img-overlay p-0">
                <h6
                  class="card-title text-start text-white w-100 m-0 py-2 px-3 position-absolute"
                  style="
                    font-size: 12px;
                    background-color: rgba(0, 0, 0, 0.5);
                    bottom: -1px;
                    letter-spacing: 2px;
                    line-height: 1.5;
                  "
                >
                  {{ item.ActivityName }}
                  <br />
                  <small>{{ `${moment(item.StartTime).format("MM‧DD")}(${moment(item.StartTime).format("dddd").substr(0, 3)})－${moment(item.EndTime).format("MM‧DD")}(${moment(item.EndTime).format("dddd").substr(0, 3)})` }}</small>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
::placeholder {
  color: white;
  letter-spacing: 1px;
}

.font {
  font-family: Garamond;
}

.form {
  border: none;
  background: #2d334a;
  color: white;
  cursor: pointer;
}

.swiper {
  width: 100%;
  height: 100%;
  .swiper-button-prev,
  .swiper-button-next {
    color: #c3cbcd;
  }
}

.swiper-slide {
  border-radius: 0px 32px 32px 32px;
  text-align: center;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  img {
    transform: scale(1, 1);
    transition: all 0.5s ease-out;
  }
  :hover img {
    transform: scale(1.2, 1.2);
  }
  .slide-card {
    height: 235px;
    border-radius: 0px 32px 32px 32px;
  }
  .slide-img {
    object-fit: cover;
    border-radius: 0px 32px 0 0;
    height: 100%;
    width: 300px;
  }
}

.container-box {
  padding: 5em;
}

@media (max-width: 1000px) {
  .container-box {
    padding: 3em;
  }
}

@media (max-width: 368px) {
  .container-box {
    padding: 1.5em;
  }
}

.search-box {
  position: relative;
  letter-spacing: 1px;
  margin: 5em 0;
}

.search-line {
  border-right: 1px solid #fff;
}

.search-title {
  border-right: none;
}

.services-container {
  img:first-of-type {
    top: 650px;
    left: 0;
    z-index: -200;
  }
  img:last-of-type {
    top: 500px;
    left: 0;
    z-index: -100;
  }
}

@media (max-width: 768px) {
  .search-box {
    width: 100%;
  }
  .search-line {
    border-right: none;
  }
  .search-title {
    width: 80px;
    text-align: start;
    margin-right: 10px;
    border-right: 1px solid #fff;
  }
  .services-container {
    img:first-of-type {
      top: 1200px;
      left: 0;
      z-index: -200;
    }
    img:last-of-type {
      top: 1100px;
      left: 0;
      z-index: -100;
    }
  }
}
</style>
