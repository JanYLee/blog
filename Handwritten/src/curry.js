// 柯里化函数

const curryEs6 = (fn, arr = []) =>
  fn.length === arr.length
    ? fn(...arr)
    : (...args) => curry(fn, [...arr, ...args]);

function sum(a, b, c) {
  return a + b + c;
}

function curry(fn, args = []) {
  let length = fn.length;
  return function(){
      let newArgs = [...args, ...arguments];
      return newArgs.length < length ? curry.call(this, fn, newArgs) : fn.apply(this, newArgs);
  }
}

let res = curry(sum)(1)(2)(3);
console.log(res);

