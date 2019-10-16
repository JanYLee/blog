/**
 * js中创建实例的方法, 字面量, 构造函数, Object.create
 * 实现new
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

/** 实现new */
function myNew() {
  // 获取myNew参数, 第一个传入为构造函数, 后面为构造函数的参数
  const [constructor, ...args] = [...arguments];
  
  // 创建一个空对象, 并绑定原型对象
  const obj = Object.create(constructor.prototype);
  
  // 执行构造函数, 通过apply把构造函数中的this替换为上面新建的空对象, 为空对象赋值属性名和属性值
  const instance = constructor.apply(obj, args);
  
  // 判断是否有返回值, 返回值是否是对象类型, 是对象类型则使用, 否则使用原来的空对象
  return (instance && (typeof instance === 'object' || typeof instance === 'function')) ? instance : obj;
}

const ins4 = myNew(Fn, 'ins4');
ins4.getX();
console.log('ins4 :', ins4);
