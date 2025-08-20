const htmlmin = require('html-minifier-terser');

module.exports = (content, outputPath) => {
  if (process.env.NODE_ENV === 'production' && outputPath.endsWith('.html')) {
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
  }

  return content;
};
