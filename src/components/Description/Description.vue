<template>
  <div class="description">
    <div class="description__label">{{ label }}：</div>
    <div class="description__value">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: "Description",
  props: {
    label: {
      type: String,
      value: "",
    },
    value: {
      type: String,
      value: "",
    },
  },
};
</script>

<style lang="less">
.description {
  &__label {
    display: table-cell;
    padding-bottom: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 20px;
    white-space: nowrap;
  }

  &__value {
    display: table-cell;
    width: 100%;
    padding-bottom: 16px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 20px;
  }
}
</style>
