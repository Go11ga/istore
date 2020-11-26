<template>
  <nuxt/>
</template>

<script>
export default {
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
    // todo исправить на свой домен
    const canonical = `https://mysite.com${this.$route.path
      .toLowerCase()
      .replace(/\/$/, '')}`
    return {
      meta: [...this.meta],
      link: [{ rel: 'canonical', href: canonical }
      ]
    }
  }
}
</script>

<style>
/* дефолтные стили здесь */
</style>
