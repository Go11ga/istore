<template>
  <div class="product">
    <div class="product__item">
      <img
        class="product__img"
        :src="model.pImg"
        :alt="model.pTitle"
        :title="model.pTitle"
      />
    </div>
    <div class="product__item product__item--content">
      <h2 class="product__header">
        {{ model.pTitle }}
      </h2>
      <p class="product__code">
        Артикул: {{ model.pSlug }}
      </p>
      <h4 class="product__description">
        Описание:
      </h4>
      <p class="product__text">
        {{ model.pDesc }}
      </p>
      <h3 class="product__price">
        Цена: {{ model.pPrice }} руб.
      </h3>
      <cart-button />
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import CartButton from '@/components/common/ui/cart-btn/index.vue'

@Component({
  components: {
    CartButton
  }
})
export default class ProductDetail extends Vue {
  /**
   * * Выбранный товар
   * {
   * "id": 50,
   * "pTitle": "Nettie",
   * "pSlug": 2893135,
   * "pPrice": 7883,
   * "pDesc": "Labore id laboris officia est commodo amet. Ipsum excepteur ipsum anim in proident amet exercitation excepteur excepteur excepteur laboris ipsum laboris. Duis cupidatat proident amet voluptate ullamco nulla ex reprehenderit nulla culpa commodo ex. Duis voluptate qui ad proident voluptate reprehenderit mollit nulla cillum ex qui enim eu.\r\n",
   * "pCategory": "ring",
   * "pMetaDescription": "Nettie",
   * "pImg": "https://cataas.com/cat?width=350&height=273&i=50"
   * }
   */
  @Prop()
  model
}
</script>

<style lang="scss" scoped>
  .product {
    display: flex;
    justify-content: flex-start;
    padding: 10px;

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .product__item {
    width: 30%;

    &--content {
      width: 70%;
      padding: 0 20px 20px;
    }
  }

  .product__img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  .product__header {
    font-size: 32px;
    margin-bottom: 20px;
  }

  .product__code {
    color: $grey;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .product__description {
    margin-bottom: 10px;
  }

  .product__text {
    text-align: justify;
    margin-bottom: 40px;
  }

  .product__price {
    font-size: 18px;
    margin-bottom: 30px;
  }
</style>
