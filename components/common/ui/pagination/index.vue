<template>
  <!--navigation-->
  <div v-if="totalCount !== 0" class="navigation">
    <Item
      class="navigation__item navigation__item--back"
      label="Назад"
      :value="currentPage > 1 ? currentPage - 1 : 1"
    />
    <Item
      v-for="(page, index) in pages"
      :key="index"
      :label="page.label"
      :value="page.value"
      :active="page.value == currentPage"
    />
    <Item
      class="navigation__item navigation__item--next"
      label="Вперёд"
      :value="currentPage < totalCount ? currentPage + 1 : totalCount"
    />
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Item from './item.vue'
import { range } from '~/utils/number'

function getPaginationOptions ({
  listLength = 10,
  currentPage = 0,
  totalPages
}) {
  const offest = Math.ceil(listLength / 2)
  let start = currentPage - offest
  let end = currentPage + offest

  if (totalPages <= listLength) {
    start = 0
    end = totalPages
  } else if (currentPage <= offest) {
    start = 0
    end = listLength
  } else if ((currentPage + offest) >= totalPages) {
    start = totalPages - listLength
    end = totalPages
  }
  return range(start, end)
    .map(value => ({
      label: (value + 1),
      value: value + 1
    }))
}
@Component({
  name: 'Pagination',
  components: { Item }
})
export default class Pagination extends Vue {
  /**
   * * Номер текущей страницы
   */
  @Prop()
  currentPage

  /**
   * * Всего страниц
   */
  @Prop()
  totalCount

  /**
   * * Список данных для каждого элемента пагинации
   */
  get pages () {
    return getPaginationOptions({
      totalPages: this.totalCount,
      currentPage: this.currentPage
    })
  }
}
</script>

<style lang="scss" scoped>
  .navigation {
    display: flex;
  }

  .navigation__item {
    margin-right: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 36px;

    border: 1px solid $grey;
    background-color: $white;
    color: $black;
    font-size: 14px;
    text-decoration: none;

    position: relative;

    transition: all .2s linear;

    &--back {
      width: auto;
      padding: 0 10px 0 20px;

      &:before {
        content: "<";

        position: absolute;
        top: 50%;
        left: 5px;
        z-index: 2;

        transform: translate(0, -50%);
      }
    }

    &--next {
      width: auto;
      padding: 0 20px 0 10px;

      &:before {
        content: ">";

        position: absolute;
        top: 50%;
        right: 5px;
        z-index: 2;

        transform: translate(0, -50%);
      }
    }

    &:hover, &.active {
      border-color: $red;
      color: $red;
    }
  }
</style>
