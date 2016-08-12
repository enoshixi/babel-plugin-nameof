function makeError(path) {
	return path.buildCodeFrameError(
      "[nameof] Invalid parameter - Expected an identifier, member expression(s) returning "
      + "a non-computed identifier, or a function returning one of the former."
	);
}

function extractIdentifierName(t, path, node, isComputed = false) {
  if (t.isIdentifier(node) && !isComputed) {
    return t.name;
  }

  if (t.isMemberExpression(node)) {
    return extractIdentifierName(t, path, node.property, node.computed);
  }

  throw makeError(path);
}

export default ({ types: t }) => {
  return {
    visitor: {
      CallExpression: function CallExpression(path) {
        if (path.node.callee.name === "nameof" && !path.scope.hasBinding("nameof")) {       	
          if (path.node.arguments.length !== 1) {
            throw makeError(path);
          }

          let node = path.node.arguments[0];

          if (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node)) {
            node = node.body;

            if (t.isBlockStatement(node) && node.body.length === 1) {
              node = node.body[0];
            }

            if (t.isReturnStatement(node)) {
              node = node.argument;
            }
          }

          const name = extractIdentifierName(t, path, node);
          path.replaceWith(t.stringLiteral(name));
        }
      }
    }
  };
};
