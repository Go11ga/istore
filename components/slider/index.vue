<template>
  <div v-if="categoriesList.length > 0" class="slider">
    <!-- Остановка/запуск автопрокрутки при наведении на любую часть слайдера -->
    <div
      class="slider__container"
      @mouseenter="constrols.autoplay=false"
      @mouseleave="constrols.autoplay=true"
    >
      <agile
        ref="slider"
        :autoplay="constrols.autoplay"
        :slides-to-show="3"
        :dots="false"
        :nav-buttons="false"
        :speed="3000"
        :change-delay="3000"
        :infinite="true"
        :options="constrols.options"
        @after-change="onCurrentSlideChange($event)"
      >
        <div
          v-for="category in categoriesList"
          :key="category.id"
        >
          <n-link :to="`/catalog/${category.cCateg}/1`" class="slider__item">
            <span class="slider__title">{{ category.cTitle }}</span>
            <span class="slider__text">Выбрать изделие</span>
          </n-link>
        </div>
      </agile>

      <!-- Стерлки навигации -->
      <div class="nav-arrow nav-arrow--prev" @click="prev">
        ‹
      </div>
      <div class="nav-arrow nav-arrow--next" @click="next">
        ›
      </div>
      <!-- Точки слайдера -->
      <div class="dots">
        <div
          v-for="(item, index) in navItems"
          :key="index"
          class="dots__item"
          :class="{'dots__item--active': item.active }"
          @click="setIndex(index)"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter } from 'nuxt-property-decorator'

@Component({})
export default class Slider extends Vue {
  /**
   * * Данные для слайдера
   */
  constrols = {
    currentSlideIndex: 0,
    autoplay: false,
    options: {
      responsive: [
        {
          breakpoint: 300,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 5
          }
        }
      ]
    }
  }

  /**
   * * Список категорий
   */
  @Getter('catalog/categoriesList')
  categoriesList

  /**
   * * Массив для точек слайдера
   */
  get navItems () {
    return this.categoriesList.map((el) => ({
      num: el,
      active: this.constrols.currentSlideIndex === el.id - 1
    }))
  }

  /**
   * * Предыдущий слайд
   */
  prev () {
    this.$refs.slider.goToPrev()
  }

  /**
   * * Следующий слайд
   */
  next () {
    this.$refs.slider.goToNext()
  }

  /**
   * * Установить слайд по номеру
   */
  setIndex (index) {
    this.$refs.slider.goTo(index)
    this.constrols.currentSlideIndex = index
  }

  /**
   * * Метод при перелистывании слайдера
   */
  onCurrentSlideChange (event) {
    this.constrols.currentSlideIndex = event.currentSlide
  }

  created () {
    this.slider = this.$refs.slider
  }
}
</script>

<style lang="scss" scoped>
  .slider {
    margin-top: 50px;

    @media (max-width: $point_sm) {
      margin-top: 20px;
    }
  }

  .slider__container {
    padding: 16px;

    position: relative;
  }

  .slider-categories {
    position: relative;
    padding: 16px;
  }

  .slider__item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 90%;
    height: 200px;
    margin-bottom: 20px;
    padding: 25px 35px;
    background: $light_blue 100% 0 no-repeat;
    color: $black;
    text-decoration: none;
    transition: background-color .15s;

    &:hover {
      background-color: $hover_gold;
    }
  }

  .slider__title {
    margin-bottom: 20px;

    font-size: 20px;
    line-height: 24px;
    font-weight: normal;
  }

  .slider__text {
    font-size: 14px;
  }

  .nav-arrow {
    width: 20px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 30px;
    cursor: pointer;
    transition: background-color .15s;

    position: absolute;
    top: 50%;
    transform: translate(0, -50%);

    &:hover {
      background-color: darken($white, 10%);
    }

    &--prev {
      left: -15px;
    }

    &--next {
      right: -15px;
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 16px;
  }
  .dots__item {
    margin: 0 5px;
    width: 10px;
    height: 10px;
    border: 1px solid #CBCBCB;
    border-radius: 50%;

    font-size: 0;
    color: transparent;

    cursor: pointer;

    &--active {
      background-color: #CBCBCB;
    }
  }

  .agile {
    width: 100%;
    position: relative;
  }

  .agile__slide {
    display: flex;
    justify-content: center;
  }
</style>
