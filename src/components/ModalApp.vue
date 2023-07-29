<template>
  <div
    @click="closeModal"
    class="bg-[rgba(0,0,0,0.5)] w-full top-0 bottom-0 left-0 h-screen z-30 flex fixed justify-center items-center"
    ref="modal"
  >
    <div class="rounded bg-[#31363d] p-4 w-[80%] text-center" ref="modalWrap">
      <label for="city-name" class="text-white text-[1.2rem]"
        >Enter location city:
      </label>
      <input
        type="text"
        class="outline-none ml-1 bg-transparent border border-b py-2 px-4 text-xl text-white"
        name="city-name"
        placeholder="Search City..."
        v-model="city"
      />
      <span v-if="isShowMessage" class="text-red-400 text-xl mt-2 block"
        >Không tìm thấy vị trí này,vui lòng nhập lại</span
      >
      <button
        @click="addCity"
        class="block py-2 px-4 bg-green-500 text-white rounded text-center mx-auto mt-[1rem] text-xl"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "../firebase/firebaseinit.js";

export default {
  name: "ModalApp",
  props: ["api_key"],
  data() {
    return {
      city: null,
      isShowMessage: false,
    };
  },
  methods: {
    closeModal(e) {
      if (e.target === this.$refs.modal) {
        this.$emit("close-modal");
      }
    },
    async addCity() {
      if (this.city === "") {
        this.isShowMessage = true;
      } else {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&appid=${this.api_key}`
        );
        this.isShowMessage = false;
        const data = await res.data;
        db.collection("cities")
          .doc()
          .set({
            city: this.city,
            currentWeather: data,
          })
          .then(() => {
            this.$emit("close-modal");
          });
      }
    },
  },
};
</script>

<style lang="scss"></style>
