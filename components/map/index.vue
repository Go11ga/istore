<template>
  <div class="map">
    <h2 class="map__title">
      Мы находимся:
    </h2>
    <div>
      <client-only>
        <yandex-map
          :coords="controls.mapCoords"
          zoom="10"
          class="map-ya"
        >
          <ymap-marker
            marker-id="1"
            marker-type="placemark"
            :coords="controls.markerCoords"
            :icon="{color: 'red', glyph: 'Government'}"
            cluster-name="1"
            @click="showInfo"
          />
        </yandex-map>
      </client-only>
    </div>

    <app-modal v-show="controls.isShown" @onClose="closeModal" />
  </div>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import appModal from '@/components/map/modal'

@Component({
  components: {
    appModal
  }
})
export default class Map extends Vue {
  controls = {
    mapCoords: [55.45, 37.36],
    markerCoords: [55.44, 37.35],
    isShown: false
  }

  showInfo () {
    this.controls.isShown = !this.controls.isShown
  }

  closeModal () {
    this.showInfo()
  }
}
</script>

<style lang="scss" scoped>
  .map {
    margin-top: 50px;

    position: relative;

    @media (max-width: $point_sm) {
      margin-top: 20px;
    }
  }

  .map__title {
    margin-bottom: 20px;
  }

  .map-ya {
    height: 600px;

    @media (max-width: $point_sm) {
      height: 400px;
    }
  }
</style>
