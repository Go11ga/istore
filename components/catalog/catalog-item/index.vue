<template>
  <div class="item">
    <div>Артикул: {{ model.id }}</div>
    <img :src="model.image" class="item__img" />
    <div class="item__price">
      Цена: {{ model.pPrice }}
    </div>
    <button class="item__btn">
      Добавить в корзину
    </button>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CatalogItem extends Vue {
  @Prop()
  model
}
</script>

<style lang="scss" scoped>
  .item {
    width: 27%;
    padding: 10px;
    margin-bottom: 20px;

    border: 1px solid grey;
  }

  .item__img {
    margin: 10px auto 0;
    display: block;
    max-width: 80%;
    height: auto;
  }

  .item__price {
    margin-top: 10px;
    font-weight: 700;
  }

  .item__btn {
    margin-top: 20px;
    padding: 5px 20px;

    background-color: red;
    color: #fff;
    border: 0;

    cursor: pointer;

    transition: all .2s linear;

    &:hover {
      background-color: darken(red, 10%)
    }
  }
</style>
