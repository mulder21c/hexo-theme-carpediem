const doctrine = require("doctrine");
const doctrineSyntax = doctrine.Syntax;
const codeBlock = require("indented-code-block");

const TYPE_MAPPING = {};
TYPE_MAPPING[doctrineSyntax.RecordType] = "Object";

const NAME_REGEX = /(\s|\[|^)(\w+((-+|\.)\w+)*)($|\s+?|\-|=|\]).*$/;

/**
 * Get JSDoc type
 */

function getJSDocType(tag) {
  const type = tag.type;

  if (type) {
    if (type.elements) {
      return type.elements.map(function (item) {
        if (item.name) return item.name;
        if (item.type === `TypeApplication`) {
          return `${item.expression.name}.<${item.applications.map(
            item => item.name
          ).join(` \\| `)}>`
        }
      });
    }

    if (type.name) {
      return type.name;
    }

    if (type.expression) {
      if (type.expression.name) return type.expression.name;
      if (type.expression.type === `TypeApplication`) {
        return `${type.expression.expression.name}\\<${
          type.expression.applications.map(item => item.name).join(` \\| `)
        }>`
      }
      if (type.expression.type === "UnionType") {
        return type.expression.elements.map(function (item) {
          if (item.name) return item.name;
          if (item.type === `TypeApplication`) {
            return `${item.expression.name}\\<${item.applications.map(
              item => item.name
            ).join(` \\| `)}>`
          }
        }).join(` \\| `);
      }
    }

    if (type.type) {
      return TYPE_MAPPING[type.type] || type.type;
    }

    return type;
  }

  return "";
}

/**
 * Check if param is nullable
 */

function getJSDocNullable(tag) {
  if (tag && tag.type && tag.type.type) {
    return tag.type.type === doctrineSyntax.NullableType;
  }
  return false;
}

/**
 * Check if param is optional
 */

function getJSDocOptional(tag) {
  if (tag && tag.type && tag.type.type) {
    return tag.type.type === doctrineSyntax.OptionalType;
  }
  return false;
}

/**
 * Escape the name part so it is
 * recognized as a name value by jsdoc.
 * This is needed because in pug 'data-foo'
 * is a valid attribute, but that's not a
 * valid jsdoc name.
 * https://github.com/Aratramba/pug-doc/issues/39
 */

function getJSDocName(str) {
  return NAME_REGEX.exec(str)[2];
}

/**
 * Parse param string
 */

function parseJSDocParam(str, escapeName) {
  const original = str;
  let name;
  if (escapeName) {
    console.log(str);
    name = getJSDocName(str);
    str = str.replace(name, name.replace("-", "_", "g"));
  }

  const tag = getJSDocParamAst(str);

  if (!tag) {
    return null;
  }

  const param = {
    name: name || tag.name || "",
    description: tag.description || "",
    type: getJSDocType(tag),
    default: tag.default || null,
    nullable: getJSDocNullable(tag),
    optional: getJSDocOptional(tag),
    original: original,
  };

  return param;
}

/**
 * Get JSDoc param ast by parsing '* param ...' with doctrine
 */

function getJSDocParamAst(str) {
  const ast = doctrine.parse("* @param " + str, {
    unwrap: true,
    tags: ["param"],
    sloppy: true,
  });

  if (!ast.tags.length) {
    return null;
  }

  return ast.tags[0];
}

/**
 * Wrap arguments list items in quotes to be able
 * to use jsdoc like `{type} foo - foo`.
 * The {} are special yaml characters so the
 * jsdoc string needs to be escaped with quotes.
 */

function escapeArgumentsYAML(str, needle) {
  let argsBlock = codeBlock.byString(str, needle);
  if (Array.isArray(argsBlock)) {
    argsBlock = argsBlock[0];
  }

  const escapedArgsBlock = argsBlock.replace(/([\s]?-[\s>|]*\s+?)(.*[^-]*(?!\s*-).*)/gi, function (
    match,
    p1,
    p2
  ) {
    return [p1.replace(/[\|>]/,''), '"', p2.replace(/\s*\n\s+/g, ' '), '"'].join("");
  });
  str = str.replace(argsBlock, escapedArgsBlock);
  return str;
}

module.exports = {
  getType: getJSDocType,
  isOptional: getJSDocOptional,
  isNullable: getJSDocNullable,
  parse: parseJSDocParam,
  getAst: getJSDocParamAst,
  escapeArgumentsYAML: escapeArgumentsYAML,
  getJSDocName: getJSDocName,
};