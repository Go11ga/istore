<template>
  <n-link
    :to="path"
    class="navigation__item"
    :class="{ active }"
  >
    <slot></slot>
    {{ label }}
  </n-link>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class PaginationItem extends Vue {
  /**
   * * Название
   */
  @Prop()
  label

  /**
   * * Номер страницы
   */
  @Prop()
  value

  /**
   * * Активен ли элемент
   */
  @Prop()
  active

  get path () {
    const { name, query, params } = this.$route
    const route = {
      name,
      query,
      params: {
        ...params,
        page: this.value
      }
    }
    return route
  }
}
</script>

<style lang="scss" scoped>
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

    transition: .2s;

    &:hover, &.active {
      border-color: $red;
      color: $red;
      z-index: 2;
    }
  }
</style>
