const utils = {

  /**
   * 将类数组转为数组
   * @param {类数组} likeArr 
   */
  listToArray: function(likeArr) {
    let arr = [];
    try{
      arr = Array.prototype.slice.call(likeArr);
    } catch (e) {
      for(let i=0; i<likeArr.length; i++) {
        arr[arr.length] = likeArr[i];
      }
    }
    return arr;
  },

  /**
   * 把json格式字符串转为json格式
   * @param {*} str 
   */
  jsonParse: function(str) {
    return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
  }
}
