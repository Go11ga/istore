<template>
  <div class="header">
    <div class="header__item">
      <nav class="nav">
        <n-link
          exact
          class="nav__item"
          active-class="nav__active"
          to="/"
        >
          Главная
        </n-link>
        <n-link
          class="nav__item"
          active-class="nav__active"
          to="/catalog"
        >
          Каталог
        </n-link>
      </nav>
    </div><!-- /.header__item -->
    <div class="header__item header__item--icon">
      <n-link
        active-class="header__link"
        to="/cart"
      >
        <svg class="header__icon">
          <use xlink:href="#cart" />
        </svg>
      </n-link>
      <span
        v-if="qty !== 0"
        class="header__cnt"
      >
        {{ qty }}
      </span>
    </div><!-- /.header__item -->
  </div>
</template>

<script>
import { Component, Vue, Getter } from 'nuxt-property-decorator'

@Component()
export default class Header extends Vue {
  @Getter('cart/qty')
  qty
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }

  .header__item {
    &--icon {
      width: 50px;
      height: 30px;
      position: relative;

      &:hover {
        .header__icon {
          fill: $red;
        }
      }
    }
  }

  .nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  @mixin after () {
    display: block;
    content: "";
    height: 2px;

    background-color: $red;

    position: absolute;
    bottom: 2px;
    left: 0;
    z-index: 2;

    transition: width .15s linear;
  }

  .nav__item {
    display: inline-block;
    padding: 5px 0;
    margin-right: 40px;

    font-size: 18px;
    text-decoration: none;
    color: $black;

    position: relative;

    transition: color .15s linear;

    &:hover {
      color: $red;

      &:after {
        width: 100%;
      }
    }

    &:after {
      width: 0;
      @include after;
    }
  }

  .nav__active {
    color: $red;

    position: relative;

    &:after {
      width: 100%;
      @include after;
    }
  }

  .header__link {
    .header__icon {
      fill: $red;
    }
  }

  .header__icon {
    width: 27px;
    height: 27px;
    fill: $black;

    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;

    transform: translate(-50%, -50%);

    transition: fill .15s linear;
  }

  .header__cnt {
    position: absolute;
    top: 0;
    right: 3px;
    z-index: 3;

    font-size: 12px;
    color: $red;
    font-weight: 700;
  }
</style>
