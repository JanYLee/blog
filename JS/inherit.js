/**
 * 通过原型链和es5实现继承
 * 相关文档: https://www.yuque.com/tokido/ytl05u/lw6hdy
 */
/** 原型继承 */
console.log('原型继承');
function ProParent() {
  this.x = [1,2];
  this.z = 100;
}

ProParent.prototype.getX = function() {
  console.log('this.x :', this.x);
}

function ProChild(y) {
  this.y = y;
}

ProChild.prototype = new ProParent();

const proCh1 = new ProChild('prochild1 y');
const proCh2 = new ProChild('prochild2 y');
proCh1.getX(); // this.x :[1, 2]
proCh1.x.push(3);
proCh2.getX(); // this.x :[1, 2, 3]

proCh1.z = 200;
console.log(proCh1.z); // 200
console.log(proCh2.z); // 100

/** 构造函数继承call, apply */
console.log('构造函数继承call, apply');
function CallParent() {
  this.x = [1,2];
  this.z = 100;
}

CallParent.prototype.getX = function() {
  console.log('this.x :', this.x);
}

function CallChild(y) {
  CallParent.call(this);
  this.y = y;
}

const callCh1 = new CallChild('callChild1 y');
const callCh2 = new CallChild('callChild2 y');

callCh1.z = 200;
console.log(callCh1.z); // 200
console.log(callCh2.z); // 100

console.log(callCh1.x); // [1, 2]
callCh1.x.push(3);
console.log(callCh1.x); // [1, 2, 3]
console.log(callCh2.x); // [1, 2]

// callCh1.getX(); // Uncaught TypeError: callCh1.getX is not a function

/** 组合继承 */
console.log('组合继承');
function ComParent() {
  this.x = [1,2];
  this.z = 100;
}

ComParent.prototype.getX = function() {
  console.log('this.x :', this.x);
}

function ComChild(y) {
  ComParent.call(this);
  this.y = y;
}

ComChild.prototype = new ComParent();

const comCh1 = new ComChild('comChild1 y');
const comCh2 = new ComChild('comChild2 y');

comCh1.z = 200;
console.log(comCh1.z); // 200
console.log(comCh2.z); // 100

console.log(comCh1.x); // [1, 2]
comCh1.x.push(3);
console.log(comCh1.x); // [1, 2, 3]
console.log(comCh2.x); // [1, 2]

comCh1.getX(); // this.x: [1, 2, 3]

console.log(comCh1.constructor === ComChild); // false

/** 寄生组合继承 */
console.log('寄生组合继承');
function ParasiticParent() {
  this.x = [1,2];
  this.z = 100;
}

ParasiticParent.prototype.getX = function() {
  console.log('this.x :', this.x);
}

function ParasiticChild(y) {
  ParasiticParent.call(this);
  this.y = y;
}

ParasiticChild.prototype = Object.create(ParasiticParent.prototype);
ParasiticChild.prototype.constructor = ParasiticChild;

const parCh1 = new ParasiticChild('ParasiticChild1 y');
const parCh2 = new ParasiticChild('ParasiticChild2 y');

parCh1.z = 200;
console.log(parCh1.z); // 200
console.log(parCh2.z); // 100

console.log(parCh1.x); // [1, 2]
parCh1.x.push(3);
console.log(parCh1.x); // [1, 2, 3]
console.log(parCh2.x); // [1, 2]

parCh1.getX(); // this.x: [1, 2, 3]

console.log(parCh1.constructor === ParasiticChild); // true

/** 冒充对象继承 */
console.log('冒充对象继承');
function SimulateParent() {
  this.x = [1,2];
  this.z = 100;
}

SimulateParent.prototype.getX = function() {
  console.log('this.x :', this.x);
}

function SimulateChild(y) {
  let parent = new SimulateParent;
  for(let key in parent) {
    this[key] = parent[key];
  }
  parent = null;
  this.y = y;
}

const simulateCh1 = new SimulateChild('simulateChild1 y');
const simulateCh2 = new SimulateChild('simulateChild2 y');

simulateCh1.z = 200;
console.log(simulateCh1.z); // 200
console.log(simulateCh2.z); // 100

console.log(simulateCh1.x); // [1, 2]
simulateCh1.x.push(3);
console.log(simulateCh1.x); // [1, 2, 3]
console.log(simulateCh2.x); // [1, 2]

simulateCh1.getX();
