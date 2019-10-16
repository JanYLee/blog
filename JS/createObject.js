/**
 * js中创建实例的方法, 字面量, 构造函数, Object.create
 * 相关文档: https://www.yuque.com/tokido/ytl05u/gxt7o4
 */

/** 字面量方式 */
const obj = {x: 1};
const obj1 = new Object({x: 1});

/** 构造函数创建实例的过程 */ 
function Fn (x) {
  this.x = x;
}

const FnPrototype = {
  constructor: Fn,
  getX: function() {
    console.log(this.x);
  }
}

Fn.prototype = FnPrototype

const ins1 = new Fn('ins1');
ins1.getX(); // ins1

/** Object.create创建对象 */
const prototypeObj = {
  getX: function () {
    console.log(this.x);
  }
}

const ins2 = Object.create(prototypeObj);
ins2.x = 'ins2';
ins2.getX();
console.log('ins2 :', ins2);

/** 实现Object.create */
function ObjectCreate (obj) {
  function Fn() {}
  Fn.prototype = obj;
  return new Fn();
}

const ins3 = ObjectCreate(prototypeObj);
ins3.x = 'ins3';
ins3.getX();
console.log('ins3 :', ins3);
