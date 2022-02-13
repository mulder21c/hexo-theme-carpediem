const dateFormat = require("date-fns/format");
const { getJosaPicker } = require("josa");

hexo.extend.helper.register(`dateFormat`, function (...arguments) {
  return dateFormat.call(null, ...arguments);
});

hexo.extend.helper.register(`getJosa`, (word, josa) => {
  return getJosaPicker(josa)(word);
});
