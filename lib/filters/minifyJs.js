const { minify } = require('terser');

module.exports = async (code, callback) => {
  if (process.env.NODE_ENV === 'production') {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      callback(null, code);
    }
  } else {
    callback(null, code);
  }
};
