<template>
  <ul class="breadcrumbs">
    <li>
      <nuxt-link to="/">
        Главная
      </nuxt-link>
    </li>
    <li
      v-for="(item, index) in pages"
      :key="index"
    >
      <nuxt-link
        v-if="index < pages.length - 1"
        :to="item.href"
        :title="item.title"
      >
        {{ item.title }}
      </nuxt-link>
      <span v-else>
        {{ item.title }}
      </span>
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Breadcrumbs extends Vue {
  @Prop({ required: true, type: Array })
  pages
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;

  li {
    font-size: 12px;
    line-height: 20px;
    display: flex;

    &:not(:first-child):before {
      content: '>';
      margin: 0 3px;
      font-size: 12px;
    }

    a:not(:hover) {
      color: $red;
    }
  }
}
</style>
