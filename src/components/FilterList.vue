<script>
export default {
  name: "FilterList",
  components: {
    StarRating,
  },
  props: {
    list: Array,
  }
};
</script>

<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import StarRating from "vue-star-rating";
import { Icon } from '@iconify/vue';
import { useStore } from "../store/index";
import { storeToRefs } from "pinia";
import { onMounted, ref, reactive } from "vue";
import { popupTemplate } from "../utils/popupTemplate";

const store = useStore();

const {
  searchCount,
  hotelSearchCount,
  loadingState,
  filterHotelList,
  filterScenicSpotList,
  listToggle,
  saveState
} = storeToRefs(store);

let map = ref(null);

function getMarker(item) {
  map.value.setView([item.Position.PositionLat, item.Position.PositionLon], 18);
}

let saveList = reactive([]);

function saveScenicSpot(item) {
  item.isActive = !item.isActive;
  if (item.isActive) {
    saveList.push(item);
  } else {
    saveList = saveList.filter((e) => e.ScenicSpotID !== item.ScenicSpotID);
  }
  localStorage.setItem("saveScenicSpot", JSON.stringify(saveList));
}

let assignItem = reactive({ array: [] });

function getItem(item) {
  assignItem.array = item;
}

const popupOptions = reactive({
  maxWidth: "500",
  className: "popupCustom",
});

function setMarker() {
  let list;
  store.listToggle
    ? (list = filterScenicSpotList?.value)
    : (list = filterHotelList?.value);
  const markers = new L.markerClusterGroup();
  if (list.length > 0) {
    list.forEach((item) => {
      markers.addTo(map.value);
      markers.addLayer(
        L.marker([
          item.Position.PositionLat,
          item.Position.PositionLon,
        ]).bindPopup(popupTemplate(item), popupOptions)
      );
      map.value.addLayer(markers);
    });

    map.value.setView(
      [list[0]?.Position.PositionLat, list[0]?.Position.PositionLon],
      18
    );
  }
}

store.$subscribe((a) => {
  setTimeout(() => {
    setMarker();
  }, 0);
});

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const longitude = position.coords.longitude; // 經度
        const latitude = position.coords.latitude; // 緯度

        map.value = L.map("mapContainer", {
          // 解決 _latLngToNewLayerPoint Error
          zoomAnimation: false,
        }).setView([latitude, longitude], 17);

        L.tileLayer(
          "https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 16,
            username: "syuanyuri",
            style_id: "cky9h4r6m3v3k14lofka3avqh",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1Ijoic3l1YW55dXJpIiwiYSI6ImNrd2VjaXl3dTAzNDUyd211d24zdDA2aG0ifQ.drmQawAClWnVDMO16doFog",
          }
        ).addTo(map.value);
      },
      // 錯誤訊息
      function errorCallback(error) {
        console.error(`ERROR ${error.code} : ${error.message}`);
      }
    );
  }
});
</script>

<template>
  <div class="row align-items-center mt-5">
    <div class="col-12 col-md-6 p-0 pe-0 pe-md-3">
      <div id="mapContainer"></div>
    </div>

    <div class="col-12 col-md-6 p-0 mt-5 mt-md-0">
      <div class="row mb-1 mx-3">
        <div class="col-12 col-xl-5 p-0">
          <div class="d-flex justify-content-start">
            <p class="mb-1">
              {{ $t("__found") }}
              <strong>
                {{ listToggle ? searchCount : hotelSearchCount }}
                {{ $t("__search_results") }}
              </strong>
            </p>
          </div>
        </div>
        <div class="col-12 col-xl-7 p-0">
          <div class="d-flex justify-content-start justify-content-xl-end">
            <div @click.stop="store.saveToggle(listToggle)" class="form-check form-switch me-3">
              <input
                v-model="saveState"
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                checked
              />
              <label class="form-check-label" for="flexSwitchCheckChecked">{{ $t("__saved") }}</label>
            </div>
            <button type="button" class="btn btn-white p-0">
              <span style="letter-spacing: 1px">
                {{ $t("__sort") }}
                <strong>{{ $t("__rating") }}</strong>
              </span>
              <i class="bi bi-chevron-expand ms-2"></i>
            </button>
          </div>
        </div>
      </div>

      <div style="overflow-y: scroll; overflow-x: hidden">
        <div v-show="loadingState" class="spinner-border loading-box" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>

        <ul class="list-group list-group-flush" style="height: 50vh">
          <li class="list-group-item px-0" v-for="(item, index) in list" :key="index">
            <div @click="getMarker(item)" class="card border-0 my-1 px-2 card-content">
              <div class="row g-0">
                <div v-show="item.Picture.PictureUrl1" class="col-4 my-auto">
                  <img
                    :src="item.Picture.PictureUrl1"
                    alt="scenicspot-picture"
                    class="border-0 img-fluid"
                    style="
                      border-radius: 0px 32px 32px 32px;
                      width: 200px;
                      height: 200px;
                      object-fit: cover;
                    "
                  />
                </div>
                <div :class="{ 'col-8': item.Picture.PictureUrl1 }" class="my-auto">
                  <div class="card-body text-start">
                    <div class="d-flex justify-content-between">
                      <h3
                        class="single-ellipsis fs-5 my-auto fw-bold"
                      >{{ listToggle ? item.ScenicSpotName : item.HotelName }}</h3>
                      <div class="mb-2">
                        <star-rating
                          :star-size="20"
                          :read-only="true"
                          :show-rating="false"
                          :rating="4"
                        ></star-rating>
                      </div>
                    </div>
                    <div class="d-flex flex-column align-items-start">
                      <small
                        class="fw-light mb-2"
                        style="letter-spacing: 1px"
                      >{{ listToggle ? item.OpenTime : item.Address }}</small>
                      <p class="multiline-ellipsis text-grey-dark">
                        {{
                          listToggle ? item.DescriptionDetail : item.Description
                        }}
                      </p>
                      <div class="d-flex justify-content-between" style="width: 100%">
                        <div class="d-flex">
                          <button
                            type="button"
                            class="link-text btn btn-link p-0 text-decoration-none"
                          >
                            <span @click.stop="saveScenicSpot(item)" class="d-flex">
                              <i
                                v-if="item.isActive"
                                class="bi bi-bookmark-fill fs-5 my-auto text-primary"
                              ></i>
                              <i v-else class="bi bi-bookmark fs-5 my-auto"></i>
                              <p class="my-auto ms-2 fw-bolder" style="letter-spacing: 1px">Save</p>
                            </span>
                          </button>

                          <button
                            type="button"
                            class="link-text btn btn-link p-0 ms-3 text-decoration-none"
                          >
                            <span class="d-flex">
                              <i class="bi bi-share fs-5 my-auto"></i>
                              <p class="my-auto ms-2 fw-bolder" style="letter-spacing: 1px">Share</p>
                            </span>
                          </button>
                        </div>
                        <button
                          @click.stop="getItem(item);"
                          type="button"
                          class="link-text btn btn-link p-0 text-decoration-none"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          <span class="d-flex">
                            <i class="bi bi-link-45deg fs-5 my-auto"></i>
                            <p class="my-auto ms-2 fw-bolder" style="letter-spacing: 1px">More</p>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal -->
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content" style="border-radius: 32px;">
                  <div v-if="assignItem.array.length !== 0" class="modal-body">
                    <div
                      id="carouselExampleControls"
                      class="carousel slide"
                      data-bs-ride="carousel"
                      v-if="assignItem.array.Picture.length !== 0"
                    >
                      <div class="carousel-inner">
                        <div
                          v-if="assignItem.array.Picture.PictureUrl1"
                          class="carousel-item active"
                        >
                          <div
                            class="card bg-dark text-white border-0"
                            style="border-radius: 32px;"
                          >
                            <img
                              :src="assignItem.array.Picture.PictureUrl1"
                              class="card-img"
                              alt="picture"
                              style="height: 300px; object-fit: cover; border-radius: 32px;"
                            />
                            <div class="card-img-overlay p-0">
                              <div
                                class="position-absolute text-start py-2 px-3"
                                style="bottom: 0px; background-color: rgba(0, 0, 0, 0.3); width: 100%; border-radius: 0 0 32px 32px;"
                              >
                                <div class="d-inline-flex align-items-center">
                                  <h5
                                    class="card-title m-0"
                                  >{{ listToggle ? assignItem.array.ScenicSpotName : assignItem.array.HotelName }}</h5>
                                  <div class="mb-2 ms-3">
                                    <star-rating
                                      :inline="true"
                                      :star-size="20"
                                      :read-only="true"
                                      :show-rating="false"
                                      :rating="4"
                                    ></star-rating>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="assignItem.array.Picture.PictureUrl2" class="carousel-item">
                          <div
                            class="card bg-dark text-white border-0"
                            style="border-radius: 32px;"
                          >
                            <img
                              :src="assignItem.array.Picture.PictureUrl2"
                              class="card-img"
                              alt="picture"
                              style="height: 300px; object-fit: cover; border-radius: 32px;"
                            />
                            <div class="card-img-overlay p-0">
                              <div
                                class="position-absolute text-start py-2 px-3"
                                style="bottom: 0px; background-color: rgba(0, 0, 0, 0.3); width: 100%; border-radius: 0 0 32px 32px;"
                              >
                                <div class="d-inline-flex align-items-center">
                                  <h5
                                    class="card-title m-0"
                                  >{{ listToggle ? assignItem.array.ScenicSpotName : assignItem.array.HotelName }}</h5>
                                  <div class="mb-2 ms-3">
                                    <star-rating
                                      :inline="true"
                                      :star-size="20"
                                      :read-only="true"
                                      :show-rating="false"
                                      :rating="4"
                                    ></star-rating>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="assignItem.array.Picture.PictureUrl3" class="carousel-item">
                          <div
                            class="card bg-dark text-white border-0"
                            style="border-radius: 32px;"
                          >
                            <img
                              :src="assignItem.array.Picture.PictureUrl3"
                              class="card-img"
                              alt="picture"
                              style="height: 300px; object-fit: cover; border-radius: 32px;"
                            />
                            <div class="card-img-overlay p-0">
                              <div
                                class="position-absolute text-start py-2 px-3"
                                style="bottom: 0px; background-color: rgba(0, 0, 0, 0.3); width: 100%; border-radius: 0 0 32px 32px;"
                              >
                                <div class="d-inline-flex align-items-center">
                                  <h5
                                    class="card-title m-0"
                                  >{{ listToggle ? assignItem.array.ScenicSpotName : assignItem.array.HotelName }}</h5>
                                  <div class="mb-2 ms-3">
                                    <star-rating
                                      :inline="true"
                                      :star-size="20"
                                      :read-only="true"
                                      :show-rating="false"
                                      :rating="4"
                                    ></star-rating>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        v-if="assignItem.array.Picture.PictureUrl1 && assignItem.array.Picture.PictureUrl2"
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"
                      >
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button
                        v-if="assignItem.array.Picture.PictureUrl1 && assignItem.array.Picture.PictureUrl2"
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"
                      >
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>

                    <div class="p-4">
                      <div
                        v-if="assignItem.array.Class || assignItem.array.Class1"
                        class="d-flex align-items-top"
                      >
                        <i class="bi bi-tag fs-3"></i>

                        <div class="d-flex flex-column ms-2">
                          <span class="my-2 me-auto fw-bold">Category</span>
                          <button
                            type="button"
                            class="btn btn-secondary text-primary px-4 rounded-3"
                            style="cursor: default; letter-spacing: 1px;"
                          >{{ listToggle ? assignItem.array.Class1 : assignItem.array.Class }}</button>
                        </div>
                      </div>

                      <div v-if="assignItem.array.OpenTime" class="d-flex align-items-top mt-3">
                        <i class="bi bi-clock fs-3"></i>

                        <div class="d-flex flex-column ms-2">
                          <span class="my-2 me-auto fw-bold">Open time</span>
                          <p class="text-start">{{ assignItem.array.OpenTime }}</p>
                        </div>
                      </div>

                      <div v-else-if="assignItem.array.ServiceInfo || assignItem.array.ParkingInfo">
                        <div class="row mt-4">
                          <div v-if="assignItem.array.ServiceInfo" class="col-12 col-lg-8">
                            <div class="d-flex">
                              <Icon
                                icon="mdi:information-outline"
                                style="font-size: 30px;"
                                class="mt-2"
                              />
                              <div class="d-flex flex-column ms-2">
                                <span class="my-2 me-auto fw-bold">Service</span>
                                <p class="text-start">{{ assignItem.array.ServiceInfo }}</p>
                              </div>
                            </div>
                          </div>

                          <div v-if="assignItem.array.ParkingInfo" class="col-12 col-lg-4 p-0">
                            <div class="d-flex align-items-start">
                              <Icon icon="mdi:car-hatchback" class="pb-0 pb-lg-3 car-icon" />
                              <div class="d-flex flex-column ms-2">
                                <span class="my-2 me-auto fw-bold">Parking</span>
                                <p class="text-start">{{ assignItem.array.ParkingInfo }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        v-if="assignItem.array.Address || assignItem.array.City || assignItem.array.Phone"
                        class="row mt-2"
                      >
                        <div v-if="assignItem.array.Address" class="col-12 col-sm-6 col-md-8">
                          <div class="d-flex">
                            <i class="bi bi-geo-alt fs-3"></i>
                            <div class="d-flex flex-column ms-2">
                              <span class="my-2 me-auto fw-bold">Address</span>
                              <p class="text-start">{{ assignItem.array.Address }}</p>
                            </div>
                          </div>
                        </div>

                        <div v-else-if="assignItem.array.City" class="col-12 col-sm-6 col-md-8">
                          <div class="d-flex">
                            <i class="bi bi-geo-alt fs-3"></i>
                            <div class="d-flex flex-column ms-2">
                              <span class="my-2 me-auto fw-bold">City</span>
                              <p class="text-start">{{ assignItem.array.City }}</p>
                            </div>
                          </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                          <div class="d-flex ms-auto">
                            <i class="bi bi-telephone fs-3"></i>
                            <div class="d-flex flex-column ms-2">
                              <span class="my-2 me-auto fw-bold">Phone</span>
                              <span class="text-start">{{ assignItem.array.Phone }}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        v-if="assignItem.array.DescriptionDetail || assignItem.array.Description"
                        class="d-flex flex-column"
                      >
                        <span class="my-3 me-auto fw-bold">Description</span>
                        <p
                          class="lh-lg"
                          style="text-align: justify;"
                        >{{ listToggle ? assignItem.array.DescriptionDetail : assignItem.array.Description }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::placeholder {
  color: #ffd803;
  letter-spacing: 1px;
}

#mapContainer {
  width: 100%;
  height: 50vh;
  margin: auto;
  border-radius: 20px;
  font-family: "Noto Sans TC", "Nunito Sans", sans-serif;
}

.multiline-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-align: justify;
}

.single-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.loading-box {
  position: absolute;
  top: 35%;
  left: 50%;
  z-index: 100;
}

@media (max-width: 768px) {
  .loading-box {
    top: 45%;
  }
}

.link-text {
  color: #000;
  &:hover {
    color: #737b7d;
  }
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

.card-content:hover {
  cursor: pointer;
  background: #f3f3f3;
}

.car-icon {
  font-size: 60px;
}

@media (max-width: 1000px) {
  .car-icon {
    font-size: 35px;
    margin-top: 3px;
    margin-left: 5px;
  }
}
</style>
