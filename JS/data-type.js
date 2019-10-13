/**
 * 检测数据类型工具函数
 * 相关文章 https://www.yuque.com/tokido/ytl05u/sx5d7c
 * @export
 * @class Utils
 */
export default class Utils {
  static isObject(data) {
    return Object.prototype.toString.call(data) === '[object Object]';
  }

  static isString(data) {
    return Object.prototype.toString.call(data) === '[object String]';
  }

  static isNumber(data) {
    return Object.prototype.toString.call(data) === '[object Number]';
  }

  // 返回数据类型
  static getTag(data) {
    if (data == null) {
      return data === undefined ? '[object Undefined]'.slice(8, -1) : '[object Null]'.slice(8, -1);
    }
    return Object.prototype.toString.call(data).slice(8, -1);
  }
}
