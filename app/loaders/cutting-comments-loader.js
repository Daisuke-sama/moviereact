module.exports = function cuttingCommentsLoader(source) {
  return source.replace(/<!--(.*)-->/g, '');
}
