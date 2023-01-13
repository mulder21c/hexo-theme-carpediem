function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
(function (e, t) {
  var n = e.themePrefix,
    a = e.instantsearch;
  if (!a) return;
  e.uis.set("search", function (_ref) {
    var e = _ref.searchBoxId,
      r = _ref.inputId,
      s = _ref.searchBtnId,
      i = _ref.hitsId,
      l = _ref.statusId,
      _ref$widgetClasses = _ref.widgetClasses,
      c = _ref$widgetClasses === void 0 ? {} : _ref$widgetClasses,
      o = _ref.noResultTemplate,
      h = _ref.itemTemplate,
      _ref$stateMsg = _ref.stateMsg,
      g = _ref$stateMsg === void 0 ? {
        loading: "Loading...",
        error: "Search failed, please try again later.",
        idle: "%d results found."
      } : _ref$stateMsg,
      _ref$truncateLen = _ref.truncateLen,
      u = _ref$truncateLen === void 0 ? 200 : _ref$truncateLen;
    var d = a.connectors.connectSearchBox,
      m = d(function (e, n) {
        var a = e.query,
          i = e.refine,
          l = e.searchAsYouType,
          c = e.widgetParams;
        if (n) {
          var _e = t.querySelector("".concat(r)),
            _n = t.querySelector("".concat(s));
          _e.addEventListener("input", function (e) {
            l && i(e.target.value);
          }), _e.addEventListener("keyup", function (e) {
            var t = e.key;
            "enter" === t.toLowerCase() && i(e.target.value);
          }), _n.addEventListener("click", function () {
            i(_e.value);
          });
        }
        c.container.querySelector("".concat(r)).value = a;
      }),
      p = function p(e) {
        return e.length - (e.match(/(<mark\s*.*?>|<\/mark>)/g) || []).join("").length - (e.match(/\&[^;]+;/g) || []).length;
      },
      y = function y(e) {
        var t = e.split("\n"),
          n = t.findIndex(function (e) {
            return e.includes("<mark");
          });
        var a = t[n] || "",
          r = p(a),
          s = 1,
          i = -1;
        for (; r < u;) {
          a = i < 0 ? [t[n + s * i] || "", a].join("\n") : [a, t[n + s++ * i] || ""].join("\n"), a = a.replace(/\n(\s|\t|\n)+/g, "\n"), r = p(a), i *= -1;
        }
        return a.replace(/\n/g, "<br>").replace(/&amp;/g, "&");
      },
      f = algoliasearch("C8MDWOPK4E", "ec1b0bea99ad67a872b574eb06de630f"),
      k = a({
        indexName: "prod_mulder21c-io",
        searchClient: f,
        searchFunction: function searchFunction(e) {
          e.state.query && e.state.query.length > 1 && e.setQueryParameter("typoTolerance", !1).search();
        }
      });
    k.on("render", function () {
      var _k$helper$lastResults, _k$helper$lastResults2;
      var e = t.querySelector("".concat(l));
      if (!e) return;
      var n = (_k$helper$lastResults = k.helper.lastResults) === null || _k$helper$lastResults === void 0 ? void 0 : (_k$helper$lastResults2 = _k$helper$lastResults.hits) === null || _k$helper$lastResults2 === void 0 ? void 0 : _k$helper$lastResults2.length;
      switch (k.status) {
        case "loading":
        case "error":
          e.textContent = g.loading;
          break;
        case "idle":
          e.textContent = g.idle.replace(/%d/, Number.isInteger(n) ? n : "");
      }
    }), k.addWidgets([m({
      container: t.querySelector("".concat(e)),
      searchAsYouType: !1
    }), a.widgets.hits({
      container: i,
      cssClasses: _objectSpread({}, c),
      transformItems: function transformItems(e) {
        return e.map(function (e) {
          return _objectSpread(_objectSpread({}, e), {}, {
            _highlightResult: Object.fromEntries(Object.entries(e._highlightResult).map(function (_ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                e = _ref3[0],
                t = _ref3[1];
              return e.startsWith("content") && (e = "content"), [[e], t];
            }))
          });
        });
      },
      templates: {
        empty: function empty(e) {
          return "".concat(o.replace(/{query}/g, e.query));
        },
        item: function item(e) {
          return h({
            themePrefix: n,
            permalink: e.permalink,
            title: a.highlight({
              hit: e,
              attribute: "title"
            }),
            content: y(a.highlight({
              hit: e,
              attribute: "content"
            })),
            tags: e.tags.slice(0, 3).map(function (t, n) {
              return "#".concat(a.highlight({
                hit: e,
                attribute: "tags.".concat(n)
              }));
            }).sort(function (e, t) {
              return e.includes("<mark") && t.includes("<mark") ? e.length - t.length : t.includes("<mark") ? 1 : e.length - t.length;
            })
          });
        }
      }
    })]), k.start();
  });
})(window, document);
//# sourceMappingURL=multi-entry.js.map

//# sourceMappingURL=/js/vendor.js.map