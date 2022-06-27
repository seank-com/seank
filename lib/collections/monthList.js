/* Collection output format:
{
  year: {
    month: {
      name: monthName
      count: numberOfPosts,
  ...
}
*/
module.exports = (coll) => {
  const posts = require('./posts')(coll);
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December' ];

  return posts
    .reduce((map, post) => {
      const month = post.data.page.date.getMonth() + 1;
      const monthName = months[month - 1];
      const year = post.data.page.date.getFullYear();

      map[year] = map[year] || {};
      map[year][month] = map[year][month] || { name: monthName, count: 0};
      map[year][month].count += 1;
      return map;
    }, {});
};
