"use strict";
/* global module, require, __dirname */

const compact = require("lodash/compact");
const JSONStream = require("JSONStream");
const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
const prettier = require("prettier");

/**
 * Create markdown file from
 * pug-doc stream or json file
 */

function PugDocMarkdown(options) {
  if (typeof options.output === "undefined") {
    throw new Error("Pug doc markdown requires settings.output to be set.");
  }

  // options
  options = {
    input: null,
    output: null,
    ...options,
  };

  // create output file
  mkdirp.sync(path.dirname(options.output));
  var output = fs.createWriteStream(options.output);
  output.on(
    "close",
    function () {
      stream.emit("complete");
    }.bind(this)
  );

  output.write("# Pug Documentation \n\n");

  /**
   * Create markdown snippet
   */

  function createSnippet(obj) {
    var lines = [];

    obj = JSON.parse(JSON.stringify(obj));

    // push name to markdown output
    lines.push("## " + obj.meta.name + "\n");
    lines.push(obj.meta.description);
    lines.push("\n");

    lines.push("### path \n");
    lines.push(`\`${obj.file}\``);
    lines.push("\n");

    if (obj.meta.arguments) {
      lines.push("### arguments \n");
      lines.push(
        obj.meta.arguments.reduce((table, arg) => {
          const { name, description, type, optional } = arg;
          const [, , defaultVal, , , desc] = description.match(
            /(\[(.+)\])*(\s-?)*(\s?)*(.*)/
          );
          return `${table}|${name}|${desc.replace(/\|/g, "\\|")}|${type}|${
            defaultVal ?? ""
          }|${optional}|\n`;
        }, `|name|description|type|default|optional|\n|:---:|:---|:---:|:---:|:---:|\n`)
      );
      lines.push("\n");
    }

    if (obj.meta.attributes) {
      lines.push("### attributes \n");
      lines.push(
        obj.meta.attributes.reduce((table, arg) => {
          return `${table}|${arg.name}|${arg.description}|${arg.type}|${
            arg.default ?? ""
          }|${arg.optional}|\n`;
        }, `|name|description|type|default|optional|\n|:---:|:---|:---:|:---:|:---:|\n`)
      );
      lines.push("");
    }

    if (obj.meta.slots) {
      lines.push("### slots \n");
      lines.push(
        obj.meta.slots.reduce((table, arg) => {
          const [, name, desc] = arg.match(
            /(^[^\s.]*)\s(.*)/
          );
          return `${table}|${name}|${desc.replace(/\|/g, "\\|")}|\n`;
        }, `|name|description|\n|:---:|:---|\n`)
      );
      lines.push("\n");
    }

    if (obj.meta.example || obj.meta.examples) {
      lines.push("### examples\n");
      for (let example of compact([
        obj.meta.example,
        ...(obj.meta.examples || []),
      ])) {
        if (typeof example === `string`) {
          lines.push("```jade");
          lines.push(example.trim());
          lines.push("```");
        } else {
          lines.push(`#### ${example.name}`);
          lines.push(`#### ${example.description}`);
          lines.push("```jade");
          lines.push(example.example.trim());
          lines.push("```");
        }
      }
      lines.push("\n");
    }

    // push html snippet
    lines.push("### output example \n");
    lines.push("```html");
    lines.push(
      prettier.format(obj.output, {
        parser: "html",
        plugins: ["@prettier/plugin-xml"],
        htmlWhitespaceSensitivity: "ignore",
      })
    );
    lines.push("```");

    // whitespace
    lines.push("");
    lines.push("");
    lines.push("---");
    lines.push("");
    lines.push("");
    lines.push("");

    return lines.join("\n");
  }

  /**
   * Output stream
   */

  var stream = JSONStream.parse("*");
  stream.on("data", function (data) {
    // create code snippet
    var snippet = createSnippet(data);

    // push lines
    output.write(snippet);
  });

  stream.on("end", function () {
    output.end();
  });

  /**
   * Input from file
   */

  if (typeof options.input !== "undefined") {
    // read input json
    var input = fs.createReadStream(options.input);
    input.on(
      "data",
      function (data) {
        var json = JSON.parse(data.toString());

        var snippet;
        json.forEach(function (obj) {
          // create code snippet
          snippet = createSnippet(obj);

          // append json data to template
          output.write(snippet);
        });

        // end stream
        stream.push(null);
        stream.end();
      }.bind(this)
    );
  }

  return stream;
}

module.exports = PugDocMarkdown;
