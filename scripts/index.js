// Register Hexo renderers
// Automatically registered in each renderer file, but explicitly imported here to ensure initialization.
require("./renderers/scss-renderer");
require("./renderers/tsx-renderer");

// Register Hexo filter
require("./filters/ui-bundler");
