//throttle节流 一定延时后执行，延时内到达的请求作废，只有延时结束后的第一个请求被执行，然后再更新开始计时的时刻从新计时。
function throttle(delay, callback) {
    let timeoutID; //保存上一个在延时时间内到达的请求setTimeout的id
    let lastExec = 0;//保存一个请求被执行后的时间，用于从新计时
  
    function wrapper() {
      const self = this; //保存this，用于处理函数被call、apply、bind修改this指向
      const elapsed = Number(new Date()) - lastExec;//获取时间间隔
      const args = arguments;//获取实参
  
      function exec() {
        lastExec = Number(new Date());
        callback.apply(self, args);
      }
  
      clearTimeout(timeoutID); //清除上一个在延时时间内到达的请求setTimeout的id
  
      if (elapsed > delay) {
          //若已经过了延时，则延时后的有且只有第一个请求被执行，然后从新计时
        exec();
      } else {
          //保存ID，如果再有请求，则删除目前保存的事件，如果没有就等到该时间间隔（delay - elapsed）结束后执行
        timeoutID = setTimeout(exec, delay - elapsed);
      }
    }
  
    return wrapper;
  }


  //debounce 防抖,
  //与上一个被执行的请求结束时间无关，只与延时有关，
  function debounce(delay, callback) {
    let timeoutID;
  
    function wrapper() {
      const self = this;
      const args = arguments;
  
      function exec() {
        callback.apply(self, args);
      }
  
      clearTimeout(timeoutID);//延时内多次请求，都将清除上一个请求，且当前请求还是要在固定延时时间后执行（这是与节流唯一的不同）
  
      timeoutID = setTimeout(exec, delay);
    }
  
    return wrapper;
  }
  






  