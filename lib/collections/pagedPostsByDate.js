const siteData = require('../../src/_data/site');

module.exports = (coll) => {
  const allPosts = require('./posts')(coll);

  const byYear = allPosts.reduce((map, post) => {
      const month = post.data.page.date.getMonth()+1;
      const year = post.data.page.date.getFullYear();

      map[year] = map[year] || {};
      map[year][month] = map[year][month] || [];
      map[year][month].push(post);
      
      return map;
    }, {});

  const maxPostsPerPage = siteData.paginate;
  const pagedPosts = [];

  Object.keys(byYear).forEach((year) => {
    Object.keys(byYear[year]).forEach((month) => {
      const posts = byYear[year][month].sort((a, b) => b.data.page.date.getTime() - a.data.page.date.getTime());
      const numberOfPages = Math.ceil(posts.length / maxPostsPerPage);

      for (let pageNum = 1; pageNum <= numberOfPages; pageNum++) {
        const sliceFrom = (pageNum - 1) * maxPostsPerPage;
        const sliceTo = sliceFrom + maxPostsPerPage;

        pagedPosts.push({
          year,
            month,
          number: pageNum,
          posts: posts.slice(sliceFrom, sliceTo),
          first: pageNum === 1,
          last: pageNum === numberOfPages
        });
      }
    });
  });

  return pagedPosts;
};
