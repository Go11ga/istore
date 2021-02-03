<template>
  <!-- Компонент карточки каталога -->
  <div
    class="category"
    :class="{'category--wide' : wide}"
  >
    <n-link
      :to="link"
      class="category__link"
      :class="{'category__link--bgc' : background}"
    >
      <span class="category__title">
        {{ model.cTitle }}
      </span>
      <span class="category__bottom">
        Выбрать изделие
      </span>
    </n-link>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CatalogItem extends Vue {
  /**
   * * Ширина карточки категории в зависимости от чанка
   */
  @Prop({ required: true, type: Boolean })
  wide

  /**
   * * Информация по категории
   * { "id": 1,
   * "cTitle": "Ювелирные изделия",
   * "cCateg": "jewelery",
   * "cMetaDescription": "Мета описание",
   * "cDesc": "Описание",
   * "products": [] }
   */
  @Prop({ required: true, type: Object })
  model

  /**
   * * Фон карточки в зависимости от расположения
   */
  @Prop({ required: true, type: Boolean })
  background

  /**
   * * Роут для перехода к конкретной категории
   */
  get link () {
    return `/catalog/${this.model.cCateg}/1`
  }
}
</script>

<style lang="scss" scoped>
  .category {
    width: 33.33333%;
    margin: 0 10px;

    background: $light_blue 100% 0 no-repeat;
    color: $black;
    transition: background-color .15s;

    &--wide {
      width: 50%;
    }

    @media (max-width: $point_md) {
      width: 45%;
      margin: 0 10px 10px;
    }

    @media (max-width: $point_sm) {
      width: 100%;
    }
  }

  .category__link {
    padding: 20px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    text-decoration: none;
    color: $black;

    &--bgc {
      background: $light_gold 100% 0 no-repeat;
    }

    &:hover {
      background-color: $hover_gold;
    }

    @media (max-width: $point_sm) {
      height: 120px;
    }
  }

  .category__title {
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
  }

  .category__bottom {
    font-size: 14px;
  }
</style>
