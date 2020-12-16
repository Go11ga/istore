<template>
  <div>
    <button
      class="button"
      :class="{'button--full': wide}"
      @click.prevent="addToCart"
    >
      Добавить в корзину
    </button>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component()
export default class CartBtn extends Vue {
  @Prop()
  wide

  addToCart () {
    console.log(123)
  }
}
</script>

<style lang="scss" scoped>
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    padding: 0 20px;

    font-weight: normal;
    font-size: 16px;
    color: $white;
    text-decoration: none;

    box-shadow: 0 4px 4px rgba(216, 179, 152, 0.15);
    border-radius: 4px;
    border: none;
    background: $red;
    outline: 0;

    cursor: pointer;
    transition: all .15s linear;

    &:hover {
      background-color: darken($red, 10%);
      box-shadow: 0 5px 5px rgba(92, 92, 92, 0.2);
    }

    &--full {
      width: 100%;
    }
  }
</style>
