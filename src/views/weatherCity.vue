<template>
  <div class="mt-[57.5px]">
    <h1 class="">weather app</h1>
  </div>
</template>

<script>
import axios from "axios";
import db from "../firebase/firebaseinit.js";

export default {
  name: "WeatherCity",
  props: ["api_key"],
  data() {
    return {
      forecast: null,
      currentWeather: null,
      loading: true,
    };
  },
  created() {
    this.getWeather();
  },
  methods: {
    getWeather() {
      const cityParam = this.$route.params.city;
      if (!cityParam) {
        console.error("Invalid city parameter.");
        return;
      }

      db.collection("cities")
        .where("city", "==", cityParam)
        .get()
        .then((docs) => {
          if (docs.empty) {
            console.error("City not found in database.");
            return;
          }

          docs.forEach((doc) => {
            this.currentWeather = doc.data().currentWeather;
            axios
              .get(
                `https://api.openweathermap.org/data/3.0/onecall?lat=${
                  doc.data().currentWeather.coord.lat
                }&lon=${
                  doc.data().currentWeather.coord.lon
                }&exclude=current,minutely,alert&units=imperial&appid=${
                  this.api_key
                }`
              )
              .then((res) => {
                this.forecast = res.data;
              })
              .then(() => {
                this.loading = false;
                console.log(this.forecast);
                console.log(this.currentWeather);
              })
              .catch((error) => {
                console.error("Error fetching forecast data:", error);
              });
          });
        })
        .catch((error) => {
          console.error("Error querying Firestore:", error);
        });
    },
  },
};
</script>
