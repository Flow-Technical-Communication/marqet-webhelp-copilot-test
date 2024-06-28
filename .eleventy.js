const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {

    //slugify filter
    const slugify = eleventyConfig.getFilter('slugify');
    
    //export to named html files (instead of named folders containing index.html files)
    eleventyConfig.addGlobalData("permalink", () => {
      return (data) => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
    });

    // Copy the `netlify.toml` file to the output
    eleventyConfig.addPassthroughCopy("netlify.toml");

    // Copy the `_redirects` file to the output
    eleventyConfig.addPassthroughCopy("_redirects");

    // Copy the `maintenance.html` file to the output
    eleventyConfig.addPassthroughCopy("maintenance.html");

    // Copy the `css` directory to the output
    eleventyConfig.addPassthroughCopy("css");
  
    // Watch the `css` directory for changes
    eleventyConfig.addWatchTarget("css");

    // Copy the `assets` directory to the output
    eleventyConfig.addPassthroughCopy("assets");

    // Copy the `_graphics` directory to the output
    eleventyConfig.addPassthroughCopy("src/_graphics");

    // Copy the `_en` directory to the output
    eleventyConfig.addPassthroughCopy("src/en");

    // Watch the `assets` directory for changes
    eleventyConfig.addWatchTarget("assets");

    //Add plugin
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    //Add filter for search index
    eleventyConfig.addFilter("squash", function(text) {
    var content = new String(text);
      
        // all lower case, please
        var content = content.toLowerCase();
      
        // remove all html elements and new lines
        var plain = content.replace(/<script.*?<\/script>/g, ' ')
        .replace(/<style.*?<\/style>/g, ' ')
        .replace(/(<([^>]+)>)/ig, ' ')
        .replace(/(?:\r\n|\r|\n)/g, ' ')
        .replace("\t","");
      
        // remove duplicated words
        var words = plain.split(' ');
        var deduped = [...(new Set(words))];
        var dedupedStr = deduped.join(' ')
      
        // remove short and less meaningful words
        var result = dedupedStr.replace(/\b(\.|\,|the|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi, '');
        //remove newlines, and punctuation
        result = result.replace(/\.|\,|\?|-|—|\n|\"|\<|\>|\{|\[|\}|\]|\\|\/|\:|\(|\)/g, '');
        //remove repeated spaces
        result = result.replace(/[ ]{2,}/g, ' ');
    
        return result;
      });
    
    return {
        dir: {
            input: "src"
        }
    }
  };