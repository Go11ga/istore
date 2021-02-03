<template>
  <div>
    <bread-crumbs :pages="breadcumbs" />
    <div class="product">
      <div class="product__item">
        <img
          class="product__img"
          :src="product.pImg"
          :alt="product.pTitle"
          :title="product.pTitle"
        />
      </div>
      <div class="product__item product__item--content">
        <h2 class="product__header">
          {{ product.pTitle }}
        </h2>
        <p class="product__code">
          Артикул: {{ product.pSlug }}
        </p>
        <h4 class="product__description">
          Описание:
        </h4>
        <p class="product__text">
          {{ product.pDesc }}
        </p>
        <h3 class="product__price">
          Цена: {{ product.pPrice }} руб.
        </h3>
        <div class="product-btn__container">
          <cart-button :id="product.id" />
        </div>
      </div>
    </div><!-- /.product -->
  </div>
</template>

<script>
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import BreadCrumbs from '@/components/common/ui/breadcrumbs/index'
import CartButton from '@/components/common/ui/cart-btn/index.vue'

@Component({
  components: {
    BreadCrumbs,
    CartButton
  },
  head () {
    return {
      title: `${this.product.pTitle} | ${process.env.appName}`
    }
  }
})
export default class ProductDeatail extends Vue {
  /**
   * * Получить один товар
   */
  @Getter('products/one')
  one

  /**
   * * Текущая категория
   */
  @Getter('catalog/currentCategory')
  currentCategory

  /**
   * * Получить один товар с id
   */
  get product () {
    const id = this.$route.params.id

    return this.one(id)
  }

  /**
   * * Текущая категория c параметром
   */
  get currentCategoryRender () {
    const category = this.$route.params.category

    return this.currentCategory(category)
  }

  /**
   * * Хлебные крошки для подкатегорий
   */
  get breadcumbs () {
    const crumbs = [
      { title: 'Каталог', href: '/catalog' },
      { title: this.currentCategoryRender.cTitle, href: `/catalog/${this.currentCategoryRender.cCateg}/1` },
      { title: this.product.pTitle, href: '' }
    ]

    return crumbs
  }
}
</script>

<style lang="scss" scoped>
  .product {
    margin-top: 30px;
    margin-bottom: 200px;
    display: flex;
    justify-content: flex-start;
    padding: 10px;

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    @media (max-width: $point_md) {
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 50px;
    }
  }

  .product__item {
    width: 30%;

    @media (max-width: $point_md) {
      width: 100%;
    }

    &--content {
      width: 70%;
      padding: 0 20px 20px;

      @media (max-width: $point_md) {
        width: 100%;
      }
    }
  }

  .product__img {
    display: block;
    max-width: 100%;
    height: auto;

    @media (max-width: $point_md) {
      margin: 0 auto 20px;
    }
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

  .product-btn__container {
    width: 30%;

    @media (max-width: $point_md) {
      width: 100%;
    }
  }
</style>
