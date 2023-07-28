<template>
  <div class="container bg-black w-full">
    <nav class="flex justify-between items-center p-4 text-white">
      <span
        class="text-[1.4rem] font-semibold py-2 px-4 bg-green-400 text-black rounded"
        >Add City</span
      >
      <div class="text-[2.5rem]">
        <i class="fas fa-edit ml-4"></i>
        <i class="fas fa-sync ml-4"></i>
        <i class="fas fa-plus ml-4"></i>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavApp",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
