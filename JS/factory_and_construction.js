/**
 * 工厂模式和构造函数模式的示例
 * 相关文档: https://www.yuque.com/tokido/ytl05u/lggwcw
 */

/** 工厂模式示例 */
function personFactory (name, age) {
  let obj = { name, age };
  obj.info = function() {
    console.log(`name: ${this.name}, age: ${this.age}`);
  };
  return obj;
}

let Jay = personFactory('Jay', 18);
Jay.info(); // name: Jay, age: 18

let Jolin = personFactory('Jolin', 17);
Jolin.info(); // name: Jolin, age: 17
//--------------------------//

/** 构造函数模式示例 */
function StarClass(name, age) {
  this.name = name;
  this.age = age;
  this.info = function() {
    console.log(`name: ${this.name}, age: ${this.age}`);
  }
}

let JoStar = new StarClass('JoStar', 20);
JoStar.info(); // -> name: JoStar, age: 20

let Dio = new StarClass('Dio', 21);
Dio.info(); // -> name: Dio, age: 21

let normalFn = StarClass('GG', 22);
console.log(normalFn); // -> undefined
// normalFn.info(); // 报错
//--------------------------//

/** 构造函数不传参可以不写括号 */
function NoBrackets () {
  this.x = 10;
  this.info = function() {
    console.log(`this x: ${this.x}`);
  }
}

let nobracket = new NoBrackets;
nobracket.info(); // this x: 10
//--------------------------//

/** 私有变量和私有作用域问题 */
function PrivateVariable () {
  let x = 100;
  this.info = function() {
    console.log(`this x: ${this.x}, Private x: ${x}`);
  }
}

let priVar = new PrivateVariable;
priVar.info(); // this x: undefined, Private x: 100
//--------------------------//

/** 返回值问题 */
function ReturnVariable () {
  let x = 100;
  this.info = function() {
    console.log(`this x: ${this.x}, Private x: ${x}`);
  }
  // return 200; // 当返回值为基本数据类型, 不影响构造函数
  return {x: 200} // 当返回值为对象数据类型, 则示例为这个返回值
}

let returnVar = new ReturnVariable;
console.log(returnVar);
//--------------------------//

/** 检测实例所属类 */
function BelongTo (value) {
 this.value = value
 this.info = function () {
   console.log(`value: ${value}`);
 }
}

let belongTo = new BelongTo;
console.log(`is BelongTo Class ? ${belongTo instanceof BelongTo}`); // -> is BelongTo Class ? true
console.log(`is Array ? ${belongTo instanceof Array}`); // -> is Array Class ? true
console.log(`is Object ? ${belongTo instanceof Object}`); // is Object ? true
//--------------------------//

/** 检测属性是否属于对象 */
function HasAttr (value) {
  this.privateValue = value
  this.info = function () {
    console.log(`value: ${value}`);
  }
}

HasAttr.prototype.publicValue = 'public value';
 
let attrObj = new HasAttr('attrValue');
console.log(`${'privateValue' in attrObj}`); // -> true
console.log(`${'publicValue' in attrObj}`); // -> true
console.log(`${attrObj.hasOwnProperty('privateValue')}`); // -> true
console.log(`${attrObj.hasOwnProperty('publicValue')}`); // -> false
 //--------------------------//
