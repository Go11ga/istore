<template>
  <!-- Компонент карточки товара  -->
  <div class="element">
    <div>
      <n-link :to="link">
        <img
          class="element__img"
          :src="model.image"
          :alt="model.cTitle"
          :title="model.cTitle"
        />
      </n-link>
    </div>
    <div class="element__article">
      Артикул: {{ productCode }}
    </div>
    <div class="element__name">
      <n-link :to="link">
        {{ model.pName }}
      </n-link>
    </div>
    <div class="element__overlay">
      <div class="element__price">
        {{ model.pPrice }} руб.
      </div>
      <cart-button wide="true" />
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import CartButton from '@/components/common/ui/cart-btn/index.vue'

@Component({
  components: { CartButton }
})
export default class CatalogItem extends Vue {
  /**
   * * Информация о товаре
   * {
   * "id": 1,
   * "pName": "Lily trotter",
   * "pSlug": "21051c12-c720-4418-ad76-d4166e66bee0",
   * "pPrice": "1777.82",
   * "image": "https://cataas.com/cat?width=350&height=273&i=1"
   * }
   */
  @Prop()
  model

  /**
   * * Текущая категория
   * {
   * cDesc: "Описание"
   * cMetaDescription: "Мета описание"
   * cName: "Ювелирные изделия"
   * cSlug: "jewelery"
   * cTitle: "Ювелирные изделия"
   * id: 1
   * products: Array(12)
   * }
   */
  @Prop()
  category

  /**
   * * Обрезка строки артикула товара
   */
  get productCode () {
    return this.model.pSlug.substr(0, 8)
  }

  /**
   * * Текущая категория
   */
  get currentCategory () {
    return this.category.cSlug
  }

  /**
   * * Ссылка с id товара
   */
  get link () {
    return `/catalog/${this.currentCategory}/detail/${this.model.id}`
  }

  addToCart () {
    console.log(123)
  }
}
</script>

<style lang="scss" scoped>
  .element {
    padding: 0 10px 10px;
    margin-bottom: 20px;
    width: 235px;

    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);

    position: relative;

    &:hover {
      .element__overlay {
        display: block;
      }
    }
  }

  .element__img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  .element__article {
    margin-top: 10px;

    color: $dark_grey;
    font-size: 14px;
  }

  .element__name {
    margin-top: 20px;

    font-size: 16px;
    line-height: 20px;

    a {
      text-decoration: none;
      color: $black;

      transition: color .15s linear;

      &:hover {
        color: $red;
      }
    }
  }

  .element__overlay {
    padding: 0 10px 10px;
    width: 100%;

    position: absolute;
    left: 0;
    top: 100%;
    z-index: 5;

    background-color: #fff;
    display: none;
  }

  .element__price {
    margin: 10px 0;

    font-weight: 700;
    font-size: 16px;
    color: $black;
  }
</style>
