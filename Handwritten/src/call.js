/** call */
Function.prototype.myCall = function() {
  const ctx = arguments[0] || window;
  const fn = Symbol();
  ctx[fn] = this;
  const args = [];
  for(let i=1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }
  const result = eval(`ctx[fn](${args.join(',')})`);
  delete ctx[fn];
  return result;
}
