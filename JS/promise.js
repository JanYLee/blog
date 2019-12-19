// promise 源码
// 使用

const timer = (time = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('time out');
    }, time);
  });

timer(2000)
  .then(log => {
    console.log(log); // 两秒后打印time out
    return Promise.resolve(() => setTimeout(() => 'settimeout', 0));
  })
  .then(data => {
    console.log(data); // 打印 resolve
    return timer(1000);
  })
  .then(log => {
    console.log(log); // 一秒后打印time out
  });

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class JPromise {
  constructor(fn) {
    if(typeof fn !== 'function') {
      throw new TypeError(`${fn} should be a function`);
    }
    this.state = PENDING; // 初始状态
    this.value = null; // 终值
    this.reason = null; // 拒绝原因
    this.onFulfilledCallbacks = []; // 执行态回调
    this.onRejectedCallbacks = []; // 拒绝态回调
    const resolve = value => {
      // setTimeout 保证onfulfilled异步执行
      setTimeout(() => {
        if(this.state === PENDING) {
          this.state = FULFILLED;
          this.value = value;
          this.onFulfilledCallbacks.map(cb => {
            this.value = cb(this.value);
          });
        }
      })
    }
  
    const reject = reason => {
      setTimeout(() => {
        if(this.state === PENDING) {
          this.state = REJECTED;
          this.reason = reason;
          this.onRejectedCallbacks.map(cb => {
            this.reason = cb(this.reason);
          })
        }
      })
    }
    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => reason;
    let newPromise;
    if(this.state === FULFILLED) {
      newPromise = new JPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      })
    }

    if(this.state === REJECTED) {
      newPromise = new JPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      })
    }

    if(this.state === PENDING) {
      // 如果onFulfilled或onRejected返回一个值x, 则运行下面的Promise解决过程
      newPromise = new JPromise((resolve, reject) => {
        this.onFulfilledCallbacks.push(value => {
          try {
            let x = onFulfilled(value);
            resolvePromise(newPromise, x);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(reason => {
          try {
            let x = onRejected(reason);
            resolvePromise(newPromise, x);
          } catch (e) {
            reject(e);
          }
        });
      })
    }
    return newPromise;
  }
}

function resolvePromise (promise2, x, resolve, reject) {
  // 从onFulFilled中返回的x就是promise2, 就会导致循环引用报错
  if(x === promise2) {
    reject(new TypeError('循环引用'))
  } else if(x instanceof JPromise) {
    // 如果x为promise, 则使promise接受x的状态
    // 如果x处于等待状态, promise需要保持为等待态知道x被执行或拒绝
    if(x.state === PENDING) {
      x.then(
        y => {
          resolvePromise(promise2, y, resolve, reject);
        },
        reason => {
          reject(reason);
        }
      );
    } else {
      // 如果x处于执行或者拒绝态, 执行promise
      x.then(resolve, reject);
    }
  } else if(x && (typeof x === 'function' || typeof x === 'object')) {
    let called = false;
    try {
      let then = x.then;
      if(typeof then === 'function') {
        then.call(x, y => {
          if(called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          if(called) return;
          called = true;
          reject(r);
        })
      } else {
        resolve(x);
      }
    } catch(e) {
      if(called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

// const timer = (time = 0) =>
//   new JPromise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('time out');
//     }, time);
//   });

// timer(2000)
//   .then(log => {
//     console.log(log); // 两秒后打印time out
//     return timer(2000);
//   })
//   .then(data => {
//     console.log(data); // 打印 resolve
//     return 'then 1';
//   })
//   .then(log => {
//     console.log(log); // 一秒后打印time out
//   });

