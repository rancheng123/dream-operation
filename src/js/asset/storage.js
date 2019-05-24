class Storage {
  constructor(){
  };

  set(name,data){

    if(!this.isLocalStorageNameSupported()){
      alert('您的浏览器处于无痕浏览模式，此模式不支持本地存储，请关闭此模式，否则会影响您的正常使用');
      return false;
    };


    if(data.expire_custom){
      data.expireTime = Date.now() + data.expire_custom;
    }


    localStorage.setItem(name,JSON.stringify(data));
  }

  get(name){
    if(localStorage[name]){

      //若过期
      if(this.isExpire(name)){
        return '';
      }else{
        return JSON.parse(localStorage[name])
      }


    }else{
      return '';
    }
  }

  isExpire(name){
    var res = false;
    var obj = JSON.parse(localStorage[name]);


    if(obj.expire_custom){
      var nowTime = Date.now();
      if(nowTime>= obj.expireTime){
        localStorage[name] = null;
        delete localStorage[name];
        res = true;
      }
    }

    return res
  }

  isLocalStorageNameSupported(){
    var testKey = 'test', storage = window.localStorage;
    try {
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

}
export default new Storage();
