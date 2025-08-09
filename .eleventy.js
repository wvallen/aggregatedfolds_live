// .eleventy.js
module.exports = function(eleventyConfig) {
  // Existing passthroughs
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Video shortcode (pointing to /images folder since that's where you’ll put the file)
  eleventyConfig.addShortcode("video", function(src, poster, alt) {
    const posterAttr = poster ? ` poster="${poster}"` : "";
    const altAttr = alt ? ` aria-label="${alt}"` : "";
    const mp4Candidate = src.endsWith(".mov") ? src.replace(/\.mov$/i, ".mp4") : null;

    return `
<video controls playsinline${posterAttr}${altAttr} style="width:100%;height:auto;">
  <source src="${src}" type="video/quicktime">
  ${mp4Candidate ? `<source src="${mp4Candidate}" type="video/mp4">` : ""}
  Your browser does not support the video tag.
</video>`.trim();
  });

  // Existing posts collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByTag("post").reverse();
  });

  // Your existing dir/template settings
  return {
    dir: {
      input: "src",
      includes: "includes",
      layouts: "layouts",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
