<template>
  <div class="modal">
    <div class="modal__inner">
      <button class="modal__btn" @click="$emit('onClose')">
        ✕
      </button>

      <h2 class="modal__header">
        Адрес:
      </h2>

      <div class="modal__text">
        Москва, ул. Н-ская, д. 1
      </div>

      <div class="modal__text">
        тел: +7-495-123-45-67
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .modal {
    width: 350px;
    padding: 10px;

    background-color: $white;
    box-shadow: 0 10px 15px rgba(125, 125, 125, 0.6);

    position: absolute;
    top: 125px;
    left: 25px;
    z-index: 1;

    @media (max-width: $point_sm) {
      width: 200px;
    }
  }

  .modal__btn {
    padding: 3px 8px;
    background-color: transparent;
    border-radius: 4px;
    border: none;

    font-weight: 700;
    font-size: 14px;
    color: $black;

    cursor: pointer;
    transition: .15s;

    position: absolute;
    top: 2px;
    right: 2px;
    z-index: 2;

    &:hover {
      color: lighten($black, 50%);
    }
  }

  .modal__header {
    margin-bottom: 20px;
  }

  .modal__text {
    margin-bottom: 20px;
  }
</style>
