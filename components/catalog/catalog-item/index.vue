<template>
  <div class="element">
    <div>
      <n-link to="/">
        <img
          class="element__img"
          :src="model.image"
          :alt="model.cTitle"
          :title="model.cTitle"
        />
      </n-link>
    </div>
    <div class="element__article">
      Артикул: {{ model.pSlug }}
    </div>
    <div class="element__name">
      <n-link to="/">
        {{ model.pName }}
      </n-link>
    </div>
    <div class="element__overlay">
      <div class="element__price">
        {{ model.pPrice }} руб.
      </div>
      <button
        class="button button--full"
        @click.prevent="addToCart"
      >
        Добавить товар в корзину
      </button>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CatalogItem extends Vue {
  @Prop()
  model

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
