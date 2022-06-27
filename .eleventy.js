/* jshint esversion: 8, undef: true, unused: true, strict: true, eqeqeq: true, curly: true, bitwise: true */
/* globals module, require */

module.exports = (config) => {
  "use strict";
  
  config.setDataDeepMerge(true);

  config.addPassthroughCopy('src/assets/css/**/*');
  config.addPassthroughCopy('src/assets/img/**/*');
  config.addPassthroughCopy('src/assets/other/**/*');
  config.addPassthroughCopy({ 'src/posts/img/**/*': 'assets/img/' });

  config.addWatchTarget("src/assets/js/");

  config.addLayoutAlias('default', 'layouts/default.njk');
  config.addLayoutAlias('post', 'layouts/post.njk');
  config.addLayoutAlias('page', 'layouts/page.njk');

  config.addFilter('readableDate', require('./lib/filters/readableDate'));
  config.addNunjucksAsyncFilter('minifyJs', require('./lib/filters/minifyJs'));

  config.addTransform('minifyHtml', require('./lib/transforms/minifyHtml'));

  config.addCollection('posts', require('./lib/collections/posts'));
  config.addCollection('tagList', require('./lib/collections/tagList'));
  config.addCollection('monthList', require('./lib/collections/monthList'));
  config.addCollection('pagedPosts', require('./lib/collections/pagedPosts'));
  config.addCollection('pagedPostsByTag', require('./lib/collections/pagedPostsByTag'));
  config.addCollection('pagedPostsByDate', require('./lib/collections/pagedPostsByDate'));

  config.addPlugin(require('eleventy-plugin-embed-everything'));

  return {
    dir: {
      input: 'src',
      output: '_site'
    },
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};