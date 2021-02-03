<template>
  <div class="container">
    <!-- Иконки -->
    <symbols />

    <!-- Header -->
    <the-header />

    <!-- Основное содержание -->
    <nuxt />

    <!-- Footer -->
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/common/header'
import Symbols from '@/components/common/symbols/index'
import TheFooter from '@/components/common/footer'

export default {
  components: {
    TheHeader,
    Symbols,
    TheFooter
  },
  computed: {
    meta () {
      return [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1 shrink-to-fit=no'
        },
        { hid: 'description', name: 'description', content: 'Главная' }
      ]
    }
  }
}
</script>

<style lang="scss">
  html {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: $black;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    max-width: $widthXL;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
  }
</style>
