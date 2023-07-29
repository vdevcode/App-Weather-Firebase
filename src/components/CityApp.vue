<template>
  <div class="city">
    <i
      class="fa-solid fa-trash z-2 text-3xl text-red-400 font-semibold absolute top-6 right-[10px]"
      ref="edit"
      v-if="edit"
      @click="removeCity"
    ></i>
    <div class="inline-block z-1">
      <h1
        class="text-white text-[1.5rem] inline-block rounded py-2 px-4 bg-black items-center"
      >
        <i class="fa-solid fa-globe mr-2 text-[1.3rem] text-green-300"></i>
        {{ this.city.city }} , {{ this.city.currentWeather.sys.country }}
      </h1>
    </div>
    <div class="weather">
      <span
        >{{
          Math.round((this.city.currentWeather.main.temp - 32) / 1.8)
        }}&deg;</span
      >
      <img
        :src="
          require(`@/assets/images-weather/conditions/${city.currentWeather.weather[0].icon}.svg`)
        "
        alt=""
      />
    </div>
    <div class="video">
      <video
        autoplay
        loop
        muted
        :src="
          require(`@/assets/images-weather/videos/${city.currentWeather.weather[0].icon}.mp4`)
        "
      ></video>
    </div>
    <div class="w-full h-[3px] bg-black absolute bottom-0 left-0"></div>
  </div>
</template>

<script>
import db from "../firebase/firebaseinit.js";

export default {
  name: "CityApp",
  props: ["city", "edit"],
  data() {
    return {
      id: null,
    };
  },
  created() {
    console.log(this.city);
  },
  methods: {
    removeCity() {
      db.collection("cities")
        .where("city", "==", `${this.city.city}`)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            this.id = doc.id;
          });
        })
        .then(() => {
          db.collection("cities").doc(this.id).delete();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.city {
  display: flex;
  position: relative;
  flex-direction: column;
  flex-basis: 50%;
  min-height: 183px;
  padding: 10px;
  .weather {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    padding: 10px;
    z-index: 1;
    justify-content: flex-end;
    flex: 1;
    bottom: 20px;
    span {
      font-size: 2rem;
      color: white;
      margin-right: 1rem;
    }
    img {
      height: 20px;
      width: auto;
    }
  }
  .video {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}
</style>
