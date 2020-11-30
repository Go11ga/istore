<template>
  <div
    class="category"
    :class="{'category--wide' : wide}"
  >
    <n-link
      :to="link"
      class="category__link"
      :class="{'category__link--bgc' : background}"
    >
      <span class="category__title">
        {{ categoryItem.cTitle }}
      </span>
      <span class="category__bottom">
        Выбрать изделие
      </span>
    </n-link>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CatalogItem extends Vue {
  @Prop()
  wide

  @Prop()
  categoryItem

  @Prop()
  background

  get link () {
    return '/'
  }
}
</script>

<style lang="scss" scoped>
  .category {
    width: 33.33333%;
    margin: 0 10px;

    background: #F8F9FB 100% 0 no-repeat;
    color: #313A47;
    transition: background-color .15s;

    &--wide {
      width: 50%;
    }
  }

  .category__link {
    padding: 20px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    text-decoration: none;
    color: #313A47;

    &--bgc {
      background: #FFFBF3 100% 0 no-repeat;
    }

    &:hover {
      background-color: #FEF7EA;
    }
  }

  .category__title {
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
  }

  .category__bottom {
    font-size: 14px;
  }
</style>
