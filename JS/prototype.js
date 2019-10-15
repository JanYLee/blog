/**
 * 原型链的一些示例代码
 * 相关文档: https://www.yuque.com/tokido/ytl05u/rt0gkg
 */

function Fn(x) {
  this.x = x;
}

Fn.prototype.getX = function() {
  console.log(this.x);
}

var instance1 = new Fn('instance1');
var instance2 = new Fn('instance2');

console.log(instance1.x === instance2.x); // false
console.log(instance1.getX === instance2.getX); // true
console.dir(instance1);

// -------------------------- //

// 改变prototype指向注意点
function PrototypeChange(x) {
  this.x = x;
}

PrototypeChange.prototype = {
  constructor: PrototypeChange,
  a: function() {}
}
// -------------------------- //

// 链式写法
var arr = [3,7,5,3,8,4,0,2];
arr.sort().reverse().pop()
console.log(arr); // [8, 7, 5, 4, 3, 3, 2]

function Chain(str) {
  this.str = str;
}

Chain.prototype.addName = function(name) {
  this.str = name + ': ' + this.str
  return this;
}

Chain.prototype.addFriends = function(friends) {
  friends.forEach(name => {
    this.str = this.str + ' ' + name;
  });
  return this;
}

var p1 = new Chain('play with');
p1.addName('jay').addFriends(['jolin', 'jojo']);
console.log(p1.str); // jay: play with jolin jojo
