export default (config) => {
  return `
  <div class="description">
    <div class="description__label">${config.label}：</div>
    <div class="description__value">${config.value}</div>
  </div>
  `;
};
