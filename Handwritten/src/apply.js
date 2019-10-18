/** apply */
Function.prototype.myApply = function(ctx=window, arr) {
  ctx.fn = this;
  let result;
  if(arr) {
    const args = [];
    for(let i=0; i<arr.length; i++) {
      args.push(`arr[${i}]`);
    }
    result = eval(`ctx.fn(${args.join(',')})`);
  } else {
    result = ctx.fn();
  }
  delete ctx.fn;
  return result;
}
