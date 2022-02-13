const dateFormat = require("date-fns/format");

hexo.extend.helper.register(`dateFormat`, function (...arguments) {
  return dateFormat.call(null, ...arguments);
});
