<template>
  <div class="minmax">
    <button class="button button--remove" @click.prevent="onDecrease">
      -
    </button>
    <input
      v-model="current"
      class="minmax__input"
      type="text"
      @input="onSetCnt()"
    />
    <button class="button" @click.prevent="onIncrease">
      +
    </button>
  </div>
</template>

<script>
import { Component, Vue, Prop, Action } from 'nuxt-property-decorator'

@Component()
export default class MinMax extends Vue {
  /**
   * * Информация о товаре
   * {
   * "id": "1",
   * "pTitle": "Boyle",
   * "pSlug": 2684776,
   * "pPrice": 7811,
   * "pDesc": "Adipisicing tempor dolore do ex ipsum tempor ipsum aliquip aliquip do aute. Tempor qui labore sit aliqua irure. Irure nulla deserunt deserunt ut do occaecat. Consectetur pariatur pariatur est excepteur ad sit veniam adipisicing duis culpa consectetur officia.\r\n",
   * "pCategory": "jewelery",
   * "pMetaDescription": "Boyle",
   * "pImg": "https://cataas.com/cat?width=350&height=273&i=1",
   * "qty": "1"
   * }
   */
  @Prop()
  model

  /**
   * * Изменение количества в корзине
   */
  @Action('cart/changeCnt')
  changeCnt

  /**
   * * Свойства для v-model input'а
   */
  data () {
    return {
      current: this.model.qty,
      min: 1,
      max: 10
    }
  }

  applyCurrent (newCnt) {
    const newCurrent = Math.max(Math.min(newCnt, this.max), this.min)
    this.changeCnt({ id: this.model.id, qty: newCurrent })
    this.current = newCurrent
  }

  onDecrease () {
    const current = parseInt(this.model.qty) - 1
    this.applyCurrent(current)
  }

  onIncrease () {
    const current = parseInt(this.model.qty) + 1
    this.applyCurrent(current)
  }

  onSetCnt () {
    const cnt = Number(this.current)
    const newCnt = isNaN(cnt) ? this.min : cnt
    this.applyCurrent(newCnt)
  }
}
</script>

<style lang="scss" scoped>
  .minmax {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .minmax__input {
    height: 42px;
    width: 60px;
    margin: 0 3px;
    padding-left: 5px;
  }

</style>
