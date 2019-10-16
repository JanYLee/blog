export default function myNew() {
  // 获取myNew参数, 第一个传入为构造函数, 后面为构造函数的参数
  const [constructor, ...args] = [...arguments];
  
  // 创建一个空对象, 并绑定原型对象
  const obj = Object.create(constructor.prototype);
  
  // 执行构造函数, 通过apply把构造函数中的this替换为上面新建的空对象, 为空对象赋值属性名和属性值
  const instance = constructor.apply(obj, args);
  
  // 判断是否有返回值, 返回值是否是对象类型, 是对象类型则使用, 否则使用原来的空对象
  return (instance && (typeof instance === 'object' || typeof instance === 'function')) ? instance : obj;
}
