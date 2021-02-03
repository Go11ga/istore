<template>
  <footer class="footer">
    <div class="footer__item">
      <div class="footer__text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, accusantium! Numquam atque ad velit placeat, maiores quis hic dolor. Recusandae accusamus ducimus quis perspiciatis magnam maxime facilis dolor. Ipsa, ut?
      </div>
    </div>
    <div class="footer__item">
      <div class="footer__wrap">
        <n-link
          v-for="category in categoriesList"
          :key="category.id"
          :to="`/catalog/${category.cCateg}/1`"
          class="footer__link"
        >
          {{ category.cTitle }}
        </n-link>
      </div>
    </div>
    <div class="footer__item">
    </div>
    <div class="footer__item footer__item--100">
      Footer
    </div>
  </footer>
</template>

<script>
import { Vue, Component, Getter } from 'nuxt-property-decorator'

@Component({})
export default class Footer extends Vue {
  @Getter('catalog/categoriesList')
  categoriesList
}
</script>

<style lang="scss" scoped>
  .footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: $point_sm) {
      margin-top: 10px;
    }
  }

  .footer__item {
    width: 33.33333%;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &--100 {
      width: 100%;
      height: 30px;

      background-color: $light_blue;
      color: $black;
      text-align: center;
      line-height: 30px;
      font-size: 18px;
    }

    @media (max-width: $point_md) {
      width: 100%;
    }
  }

  .footer__text {
    margin-top: 5px;
    color: $black;
    font-size: 14px;

    @media (max-width: $point_sm) {
      text-align: justify;
    }
  }

  .footer__wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .footer__link {
    width: 48%;
    height: 30px;
    padding: 2px;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    cursor: pointer;
    text-decoration: none;
    color: $black;
    font-size: 14px;

    transition: all .15s linear;

    &:hover {
      background-color: $hover_gold;
    }

    @media (max-width: $point_xl) {
      margin-bottom: 10px;
    }

    @media (max-width: $point_md) {
      justify-content: center;
      text-align: center;
    }
  }
</style>
