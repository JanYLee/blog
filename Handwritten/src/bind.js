/** bind */
Function.prototype.myBind = function myBind(ctx = window, ...outArgs) {
  const _this = this;
  const bound = function(...innerArgs) {
    const args = outArgs.concat(innerArgs);
    if (!(this instanceof bound)) return _this.call(ctx, ...args);
    const obj = Object.create(_this.prototype);
    const result = _this.call(obj, ...args);
    if (typeof result === "object") return result;
    return obj;
  };

  return bound;
};
