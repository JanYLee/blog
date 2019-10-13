/**
 * this指向的例子, 
 * 包含普通函数调用 
 * dom中调用 
 * 构造函数模式 
 * call,apply,bind改变指向
 * 箭头函数中this特性
 * 相关文章 https://www.yuque.com/tokido/ytl05u/egl1po
 */

function consoleThis() {
  console.log(this);
}
/** 普通函数调用之间的this指向, 以.号作为标识 */
let obj = { consoleThis };
consoleThis(); // -> window || undefined
obj.consoleThis(); // -> obj

function wrap() {
  consoleThis();
}
wrap() // -> window || undefined

/** dom对象中绑定事件, 事件触发时, this指向触发的dom元素 */
document.getElementById('root').onclick = consoleThis;

/** 构造函数模式时, this指向当前实例, 也就是构造函数执行的主体 */
function Person (name, age) {
  this.name = name;
  this.age = age;
  this.info = function() {
    // 此处的this就是当前创建对象主体, 以代码为例, 就是jay这个主体
    console.log(`name: ${this.name}, age: ${this.age}`);
  }
}

let jay = new Person('jay', 18);
jay.info(); // -> name: jay, age: 18
let jayInfo = jay.info;
jayInfo(); // -> name: undefined, age: undefined

/** call, apply, bind改变 */
let jolin = new Person('jolin', 17);
jay.info.call(jolin);

/** 箭头函数绑定了声明时候的this */
function ArrowObj(x) {
  this.x = x,
  this.info = () => {
    console.log(`x: ${this.x}`);
  }
}
let arrow = new ArrowObj(1);
arrow.info(); // x: 1
let arrowInfo = arrow.info;
arrowInfo(); // x: 1
