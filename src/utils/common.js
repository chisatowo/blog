import constant from "./constant";
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
  },
  /**
 * 图片转换
 */
  pictureReg(content) {
    content = content.replace(/\[[^\[^\]]+\]/g, (word) => {
      let index = word.indexOf(",");
      if (index > -1) {
        let arr = word.replace("[", "").replace("]", "").split(",");
        return '<img class="pictureReg" style="border-radius: 5px;width: 100%;max-width: 250px;display: block" src="' + arr[1] + '" title="' + arr[0] + '"/>';
      } else {
        return word;
      }
    });
    return content;
  },
  /**
 * 表情包转换
 */
  faceReg(content) {
    content = content.replace(/\[[^\[^\]]+\]/g, (word) => {
      let index = constant.emojiList.indexOf(word.replace("[", "").replace("]", ""));
      if (index > -1) {
        let url = constant.qiniuDownload + "emoji/q" + (index + 1) + ".gif";
        return '<img style="vertical-align: middle;width: 32px;height: 32px" src="' + url + '" title="' + word + '"/>';
      } else {
        return word;
      }
    });
    return content;
  },
}
