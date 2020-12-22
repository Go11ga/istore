<template>
  <div class="header">
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
      <n-link
        class="nav__item"
        active-class="nav__active"
        to="/cart"
      >
        Корзина
      </n-link>
    </nav>
    <div class="header__aux">
      <div class="header__item">
        cart
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
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
</style>
