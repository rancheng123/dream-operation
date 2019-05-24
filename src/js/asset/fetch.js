import fetch from 'isomorphic-fetch';
import promise from 'es6-promise';
promise.polyfill();


let requestData = function(opts) {
  var url = opts.url || null;
  var method = opts.method || 'post';
  var data = opts.data || {};
  var qpToken =  this.Storage.get('user').token;

  if(method.toLowerCase() == 'get'){
    var arr = [];
    for(var key in data){
      var subStr = (key + '=' + data[key])
      arr.push(subStr)
    }

    var req = new Request(url+ '?' + arr.join('&'), {
      method: method,
      //不缓存响应的结果
      cache: 'reload'
    });
  }
  else if(method.toLowerCase() == 'post'){
    var req = new Request(url, {
      method: method,
      //不缓存响应的结果
      cache: 'reload',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "qpToken": qpToken
      }
    });
  }


  return new Promise(function(resolve, reject){
     fetch(req)
      .then(response => {
        // 处理状态码
        let status = response.status;
        switch (status){
          case 502:
            error[502]();
            break;
          case 404:
            error[404]();
            break;
          default:
            return response.json(); //此处必须有返回值，否则数据返回
            break;
        }
      })
      .then(data => {
        //失败
        if(data.code != 200){
          alert(data.message)
          reject(data)
        }else{
          resolve(data)
        }
      })
      .catch(error => {
        console.log('error is', error)

        reject(error)
      });

  })
};


export default requestData;
