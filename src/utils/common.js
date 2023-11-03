// import constant from "./constant";
// import CryptoJS from 'crypto-js';

export default {
  mobile() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    return flag && flag.length && flag.length > 0;
  },
  isEmpty(value) {
    if (typeof value === "undefined" || value === null || (typeof value === "string" && value.trim() === "") || (Array.prototype.isPrototypeOf.call(value) && value.length === 0) || (Object.prototype.isPrototypeOf.call(value) && Object.keys(value).length === 0)) {
      return true;
    } else {
      return false;
    }
  }
}
