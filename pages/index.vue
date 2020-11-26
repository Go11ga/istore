<template>
  <div>
    <h1>Main page</h1>
    <CategoriesList />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import CategoriesList from '@/components/common/CategoriesList'

@Component({
  components: {
    CategoriesList
  }
})
export default class MainPage extends Vue {

}

</script>

<style>
</style>
