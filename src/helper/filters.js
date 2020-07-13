/**
 * 忽略 Fb 前缀, 例如: FbTable 会展示为 Table
 * @param {string} val
 * @returns {string}
 */
export const ignoreFbPrefix = (val) => (val || "").replace("Fb", "");
