class Url{
  constructor(){

  };

  parseUrl(url){
    var a = document.createElement('a');
    a.href = url;
    return {
      host: a.hostname,
      query: a.search,
      params: (function () {
        var ret = {},
          seg = a.search.replace(/^\?/, '').split('&'),
          len = seg.length,
          i = 0,
          s;
        for (; i < len; i++) {
          if (!seg[i]) {
            continue;
          }
          s = seg[i].split('=');
          //ret[s[0]] = s[1];
          ret[s[0]] = decodeURIComponent(s[1]);


        }
        return ret;
      })(),
      hash: a.hash.replace('#', '')
    };
  }
}

export default new Url();