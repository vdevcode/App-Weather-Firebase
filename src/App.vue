<template>
  <div class="">
    <modal-app
      v-if="modalOpen"
      v-on:close-modal="toggleModal"
      :api_key="api_key"
    />
    <nav-app v-on:add-city="toggleModal" v-on:edit-city="toggleEdit" />
    <router-view :cities="cities" :edit="edit" />
  </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebaseinit.js";
import NavApp from "@/components/NavApp.vue";
import ModalApp from "@/components/ModalApp.vue";

export default {
  name: "App",
  components: {
    NavApp,
    ModalApp,
  },
  data() {
    return {
      api_key: "f1937617cb4bbd501edd56b39b759522",
      cities: [],
      modalOpen: null,
      edit: null,
    };
  },
  created() {
    this.getCityWeather();
  },
  methods: {
    getCityWeather() {
      let firebaseDB = db.collection("cities");
      firebaseDB.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (doc) => {
          if (doc.type === "added" && !doc.doc.Nd) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=imperial&appid=${this.api_key}`
              );
              const data = response.data;
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                })
                .then(() => {
                  this.cities.push(doc.doc.data());
                });
            } catch (err) {
              console.log(err);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          } else if (doc.type === "removed") {
            this.cities = this.cities.filter((city) => {
              return city.city !== doc.doc.data().city;
            });
          }
        });
      });
    },
    // async getCurrentWeather() {
    //   await axios
    //     .get(
    //       `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&appid=${this.api_key}`
    //     )
    //     .then((response) => {
    //       console.log(response.data);
    //     });
    // },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  font-size: 62.5%;
}
</style>
