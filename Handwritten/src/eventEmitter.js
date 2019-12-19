// eventEmitter

class Event {
  constructor() {
    this.pool = {};
  }

  on(event, cb) {
    if (!this.pool[event]) {
      this.pool[event] = [];
    }
    this.pool[event].push(cb);
    return this;
  }

  emit(event, ...args) {
    if(!this.pool[event]) return this;
    this.pool[event].forEach(cb => cb.call(this, ...args));
    return this;
  }

  off(event, fn) {
    if(!this.pool[event]) return this;
    if(!fn) {
      this.pool[event] = null;
      return this;
    }
    const index = this.pool[event].indexOf(fn);
    this.pool[event].splice(index, 1);
    return this;
  }

  once(event, cb) {
    this.on(event, (...args) => {
      cb(...args);
      this.off(event);
    });
  }
}
