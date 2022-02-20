import { defineStore } from "pinia";
import axios from "axios";
import { getAuthorization } from "../utils/authorization";

export const useStore = defineStore("Main", {
  state: () => ({
    loadingState: false,
    adultsCount: 2,
    kidCount: 0,
    personState: false,
    peoplePopup: false,
    cityName: "",
    date: "",
    activityList: [],
    scenicSpotList: [],
    hotelList: [],
    listToggle: null,
    searchCount: 0,
    hotelSearchCount: 0,
    searchScenicSpot: "",
    searchHotel: "",
    filterScenicSpotList: [],
    filterHotelList: [],
    saveState: false
  }),
  getters: {},
  actions: {
    adultsCountCompute(method) {
      method === "plus" ? this.adultsCount++ : this.adultsCount--;
    },
    kidCountCompute(method) {
      method === "plus" ? this.kidCount++ : this.kidCount--;
    },
    togglePopup() {
      this.peoplePopup = !this.peoplePopup;
    },
    setDate(value) {
      this.date = value;
    },
    clearInput() {
      this.date = "";
      this.cityName = "";
      this.searchHotel = "";
      this.searchScenicSpot = "";
    },
    clearData() {
      this.searchCount = 0;
      this.hotelSearchCount = 0
      this.filterScenicSpotList = [];
      this.filterHotelList = [];
    },
    saveToggle(val) {
      if (!this.saveState) {
        if (val && this.filterScenicSpotList.length !== 0) {
          this.filterScenicSpotList = this.scenicSpotList.filter(item => item.isActive === true);
          this.searchCount = this.filterScenicSpotList.length;
        } else {
          this.filterHotelList = this.hotelList.filter(item => item.isActive === true);
          this.hotelSearchCount = this.filterHotelList.length;
        }
      } else {
        if (val) {
          this.getScenicSpot();
        } else {
          this.getHotel();
        }
      }
    },
    async getAllActivity() {
      try {
        const res = await axios({
          method: "get",
          url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?%24top=200&%24format=JSON',
          headers: getAuthorization(),
        });
        // 篩選有圖片的資料
        this.activityList = res.data.filter(
          (x) => Object.keys(x.Picture).length !== 0
        );
      } catch (error) {
        console.log("getAllActivity_error", error);
      }
    },
    async getScenicSpot() {
      this.loadingState = true;
      this.listToggle = true;

      let apiURL;
      if (this.cityName === "") {
        apiURL = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24top=300&%24format=JSON`;
      } else {
        apiURL = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${this.cityName}?%24format=JSON`;
      }

      try {
        const res = await axios({
          method: "get",
          url: apiURL,
          headers: getAuthorization(),
        });

        this.scenicSpotList = res.data.map((e) => ({ ...e, isActive: false }));

        if (this.searchScenicSpot !== "") {
          this.filterScenicSpotList = this.scenicSpotList.filter((item) =>
            item.ScenicSpotName.match(this.searchScenicSpot)
          );
        } else {
          this.filterScenicSpotList = this.scenicSpotList;
        }

        this.loadingState = false;

        let saveScenicSpotList = JSON.parse(
          localStorage.getItem("saveScenicSpot")
        );

        // 若存在 localStorage 則修改儲存狀態
        if (saveScenicSpotList !== null) {
          this.scenicSpotList.map((e) => {
            return saveScenicSpotList.map((i) => {
              if (i.ScenicSpotID === e.ScenicSpotID) {
                e.isActive = !e.isActive;
              }
            });
          });
        }

        this.searchCount = this.filterScenicSpotList.length;
      } catch (error) {
        console.log("getAllActivity_error", error);
      }
    },
    async getHotel() {
      this.loadingState = true;
      this.listToggle = false;
      let apiURL;

      if (this.cityName === "") {
        apiURL = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?%24top=100&%24format=JSON`;
      } else {
        apiURL = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel/${this.cityName}?%24format=JSON`;
      }

      try {
        const res = await axios({
          method: "get",
          url: apiURL,
          headers: getAuthorization(),
        });

        this.hotelList = res.data.map((e) => ({ ...e, isActive: false }));

        if (this.searchHotel !== "") {
          this.filterHotelList = this.hotelList.filter((item) =>
            item.HotelName.match(this.searchHotel)
          );
        } else {
          this.filterHotelList = this.hotelList;
        }

        let saveHotelList = JSON.parse(
          localStorage.getItem("saveScenicSpot")
        );

        // 若存在 localStorage 則修改儲存狀態
        if (saveHotelList !== null) {
          this.hotelList.map((e) => {
            return saveHotelList.map((i) => {
              if (i.HotelID === e.HotelID) {
                e.isActive = !e.isActive;
              }
            });
          });
        }

        this.hotelSearchCount = this.filterHotelList.length;
        this.loadingState = false;
      } catch (error) {
        console.log("getAllActivity_error", error);
      }
    },
  },
});
