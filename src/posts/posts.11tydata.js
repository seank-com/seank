module.exports = {
  layout: 'post',
  title: 'Untitled',
  date: 'Created',
  eleventyComputed: {
    permalink: (data) => {
      let d = data.page.date;
      let fs = data.page.fileSlug;
      return `${ d.getFullYear() }/${ d.getMonth() + 1 }/${ d.getDate() }/${ fs }.html`;
    },
    thumb: (data) => {
      if (data.thumb) {
        if (data.thumb.search(/^https?:\/\//) !== -1) {
          return data.thumb;
        }
        return `/assets/img/${data.thumb}`;
      } else {
        return false;
      }
    }
  }
};
