<template>
  <div>
    <h1>Категория</h1>
    <pagination
      :current-page="3"
      :total-count="9"
    />
  </div>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import pagination from '@/components/common/ui/pagination/index'

@Component({
  components: {
    pagination
  }
})
export default class Category extends Vue {

}
</script>
