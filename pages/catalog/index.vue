<template>
  <div class="main-catalog">
    <h1 class="main-catalog-title">
      Главная страница каталога
    </h1>
    <!-- <div>
      <div
        v-for="(categoryChunk, index) in categoryChunks"
        :key="index"
        class="main-catalog-item"
      >
        <menu-item
          v-for="category in categoryChunk"
          :key="category.id"
          :category-item="category"
          :wide="index % 2 != 0"
          :background="index > categoryChunk.length/2"
        />
      </div>
    </div> -->
  </div>
</template>
