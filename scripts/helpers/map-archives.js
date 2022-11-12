"use strict";

const { url_for } = require("hexo-util");

function mapArchivesHelper(options = {}) {
  const { config } = this;
  const { timezone } = config;
  const posts = this.site.posts.sort("date", -1);
  if (!posts.length) return {};

  const archives = {};
  const isDevelopment = this.site.mode === "development";

  posts.forEach((post) => {
    // Clone the date object to avoid pollution
    let date = post.date.clone();
    if (timezone) date = date.tz(timezone);

    const year = date.year();
    const month = date.month() + 1;

    if (!archives.hasOwnProperty(year)) archives[year] = {};
    if (!archives[year].hasOwnProperty(month)) archives[year][month] = [];

    archives[year][month].push({
      title: post.title,
      subtitle: post.subtitle || "",
      permalink: isDevelopment ? url_for.call(this, post.path) : post.permalink,
      date,
      categories: post.categories,
      tags: post.tags,
    });
  });

  return archives;
}

module.exports = mapArchivesHelper;
