<template>
  <div class="main">
    <app-slider />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import appSlider from '@/components/slider'

@Component({
  components: {
    appSlider
  },
  head () {
    return {
      title: `Главная | ${process.env.appName}`
    }
  }
})
export default class Main extends Vue {

}

</script>

<style lang="scss" scoped>
  .main {
    height: 200vh;
  }
</style>
