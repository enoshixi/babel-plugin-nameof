/** 
 * Used to obtain the simple string name of a variable or property. 
 * @param expression An identifier or member expression(s) ending in a non-computed identifier.
 */
declare function nameof(expression: any): string;

/** 
 * Used to obtain the simple string name of a variable or property. 
 * @param expressionFunction A function returning an identifier or member expression(s) ending in a non-computed identifier.
 */
declare function nameof<TSource>(expressionFunction: (source: TSource) => any): string;
