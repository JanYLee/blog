/** call apply 源码实现 */
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

window.name = 'window';

function infoCall(arg) {
  console.log('this.name:', this.name, ', arg: ', arg);
}

infoCall('test window'); // this.name: window , arg:  test window

const obj = { name: 'obj' }

infoCall.myCall(obj, 'test arg'); // this.name: obj , arg:  test arg

/** apply */
Function.prototype.myApply = function(ctx=window, arr) {
  const fn = Symbol();
  ctx[fn] = this;
  let result;
  if(arr) {
    const args = [];
    for(let i=0; i<arr.length; i++) {
      args.push(`arr[${i}]`);
    }
    result = eval(`ctx[fn](${args.join(',')})`);
  } else {
    result = ctx[fn]();
  }
  delete ctx[fn];
  return result;
}

function infoApply(arg1, arg2) {
  console.log('this.name:', this.name, ', arg1: ', arg1, ', arg2: ', arg2);
}

infoApply('test window1', 'test window2'); // this.name: window , arg:  test window1 , arg2:  test window2

infoApply.myApply(obj, ['test arg1', 'test arg2']); // this.name: obj , arg:  test arg1 , arg2:  test arg2
