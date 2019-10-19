function myBind(ctx = window, ...outArgs) {
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
}

Function.prototype.myBind = myBind;

function f1(x, y) {
  this.x = x;
  this.y = y;
  this.info = function() {
    console.log(this.x, this.y);
  };
}

const obj = {
  y: null
};

const bar = f1.myBind(obj, "bind args");
bar(100);
let b = new bar("new args");
b.info(); // bind args new args
