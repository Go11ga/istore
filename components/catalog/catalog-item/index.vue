<template>
  <!-- Компонент карточки товара  -->
  <div class="element">
    <div>
      <n-link :to="link">
        <img
          class="element__img"
          :src="model.pImg"
          :alt="model.pTitle"
          :title="model.pTitle"
        />
      </n-link>
    </div>
    <div class="element__article">
      Артикул: {{ model.pSlug }}
    </div>
    <div class="element__name">
      <n-link :to="link">
        {{ model.pTitle }}
      </n-link>
    </div>
    <div class="element__overlay">
      <div class="element__price">
        {{ model.pPrice }} руб.
      </div>

      <cart-button :id="model.id" />
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
  @Prop({ required: true, type: Object })
  model

  /**
   * * Текущая категория - jewelery
   * 'jewelery'
   */
  @Prop({ required: true, type: String })
  category

  /**
   * * Ссылка с id товара
   */
  get link () {
    return `/catalog/${this.category}/detail/${this.model.id}`
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

    background-color: $white;
    display: none;
  }

  .element__price {
    margin: 10px 0;

    font-weight: 700;
    font-size: 16px;
    color: $black;
  }
</style>
