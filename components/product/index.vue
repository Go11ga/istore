<template>
  <div class="product">
    <div class="product__item">
      <img
        class="product__img"
        :src="`https://cataas.com/cat?width=350&height=273&i=${model.id}`"
        :alt="model.cTitle"
        :title="model.cTitle"
      />
    </div>
    <div class="product__item product__item--content">
      <h2 class="product__header">
        {{ model.pName }}
      </h2>
      <p class="product__code">
        Артикул: {{ productCode }}
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
  @Prop()
  model

  /**
   * * Обрезка строки артикула товара
   */
  get productCode () {
    return this.model.pSlug.substr(0, 8)
  }
}
</script>

<style lang="scss" scoped>
  .product {
    display: flex;
    justify-content: flex-start;

    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  .product__item {
    width: 30%;

    &--content {
      width: 70%;
      padding: 0 15px 30px;
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
    margin-bottom: 50px;
  }

  .product__price {
    font-size: 18px;
    margin-bottom: 30px;
  }
</style>
