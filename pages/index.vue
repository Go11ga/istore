<template>
  <div>
    <app-slider />
    <app-map />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import appSlider from '@/components/slider'
import appMap from '@/components/map'

@Component({
  components: {
    appSlider,
    appMap
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

</style>
