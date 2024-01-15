function previewAnnotations(entry = []) {
  return [...entry, require.resolve("../dist/preview.mjs")];
}

module.exports = {
  previewAnnotations,
  experimental_serverChannel:
    require("../dist/preset.js").experimental_serverChannel,
};
