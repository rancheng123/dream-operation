import 'babel-polyfill';
import './componentStore';

//引入子功能
//import requestData from './fetch';
import Storage from './storage';
import Cookies from './cookie';
import Router from './router';
import Url from './url';
const utils = {
  paramSerialize (params) {
    let queryString = ''
    if (params) {
      for (let p in params) {
        if (params.hasOwnProperty(p)) {
          if (params[p] !== '' && params[p] !== undefined && params[p] !== null) {
            queryString = `${queryString}${p}=${params[p]}&`
          }
        }
      }
    }
    return queryString.replace(/&$/, '')
  },
  //requestData,
  Storage,
  Url,
  Router,
  Cookies
}
export default utils;
