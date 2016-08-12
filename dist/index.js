"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function makeError(path) {
  throw path.buildCodeFrameError("[nameof] Invalid parameter - Expected an identifier, member expression(s) returning " + "a non-computed identifier, or a function returning one of the former.");
}

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      CallExpression: function CallExpression(path) {
        if (path.node.callee.name === "nameof" && !path.scope.hasBinding("nameof")) {
          if (path.node.arguments.length !== 1) {
            makeError(path);
          }

          var node = path.node.arguments[0];
          var rootNode = true;
          var computed = false;

          while (!t.isIdentifier(node) || computed) {
            if (t.isMemberExpression(node)) {
              node = node.property;
              computed = node.computed;
            } else if (rootNode && (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node))) {
              node = node.body;
            } else if (t.isReturnStatement(node)) {
              node = node.argument;
            } else if (t.isBlockStatement(node) && node.body.length === 1) {
              node = node.body[0];
            } else {
              makeError(path);
            }

            rootNode = false;
          }

          path.replaceWith(t.stringLiteral(node.name));
        }
      }
    }
  };
};
