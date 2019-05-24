
import Cookies from './js-cookie';
 class Cookie {
     constructor() {}
    set(name, token, expires = 0){
        if (expires) {
            Cookies.set(name, token, { expires})
        }
    }
    get(name){
        return Cookies.get(name)
    }
    remove(name) {
        Cookies.remove(name)
    }
}
export default new Cookie()