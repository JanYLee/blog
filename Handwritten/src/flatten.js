// 数组扁平化

// v1. 递归实现版本
function flatten(arr) {
  let res = [];
  for (let i = 0, len = arr.length; i < len; i++) {
      if (Array.isArray(arr[i])) {
          res = res.concat(flatten(arr[i]));
      }
      else {
          res.push(arr[i]);
      }
  }
  return res;
}

// v2. 使用数组的toString方法实现
function flatten(arr) {
  return arr.toString().split(',').map(item => +item);
}
// TODO: 会把所有的项都变成数字了
// console.log(flatten([1, '1', [2, 3, 4]]));



// v3. 使用reduce函数来实现(重点掌握)
function flatten(arr) {
  return arr.reduce((prev, next) => {
      return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}
console.log(flatten([1, '1', [2, 3, 4]]));


// v4. 使用...运算符来解构数组
function flatten(arr) {
  // 数组中只要有一项是数组的话，就把当前的这个数组解构一层
  while (arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr);
  }
  return arr;
}

