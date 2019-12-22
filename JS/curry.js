// 柯里化函数

// const curry = (fn, arr = []) =>
//   fn.length === arr.length
//     ? fn(...arr)
//     : (...args) => curry(fn, [...arr, ...args]);

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


function multi() {
  var args = Array.prototype.slice.call(arguments);
  var fn = function() {
    var newArgs = args.concat(Array.prototype.slice.call(arguments));
      return multi.apply(this, newArgs);
  }
  fn.toString = function() {
    return args.reduce(function(a, b) {
      return a * b;
    })
  }
  return fn;
}

let res1 = multi(1)(2)(3)(4);
console.log(res1);
