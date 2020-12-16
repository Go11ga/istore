<template>
  <div class="container">
    <!-- Header -->
    <the-header />

    <!-- Основное содержание -->
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '@/components/common/header'

export default {
  components: {
    TheHeader
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
  },

  head () {
    const canonical = `https://mysite.com${this.$route.path
      .toLowerCase()
      .replace(/\/$/, '')}`
    return {
      meta: Array.from(this.meta),
      link: [{ rel: 'canonical', href: canonical }
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
