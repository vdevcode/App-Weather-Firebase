<template>
  <div
    class="container mt-[57.5px] sm:grid-cols-2 grid bg-[#31363d] w-full h-full"
  >
    <div class="" v-for="(city, index) in cities" :key="index">
      <city-app :city="city" />
    </div>
  </div>
</template>

<script>
import CityApp from "@/components/CityApp.vue";

export default {
  name: "addCity",
  components: {
    CityApp,
  },
  props: ["cities"],
  created() {
    console.log(this.cities);
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
