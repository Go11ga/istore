<template>
  <div class="error">
    <div class="error__content">
      <h1 class="error__title">
        Ошибка 404
      </h1>
      <nuxt-link to="/">
        Вернуться на главную
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 300px;
  }

  .error__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
  }

  .error__title {
    color: $red;
    margin-bottom: 20px;
  }
</style>
