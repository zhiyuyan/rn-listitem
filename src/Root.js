/**
 * Created by Jackoder on 2017/5/24.
 * 组件入口文件.
 * @flow
 */
import {
  Text,
  TouchableOpacity
} from 'react-native';

function init() {
  //组件默认配置
  Text.defaultProps.allowFontScaling = false;
  TouchableOpacity.defaultProps.activeOpacity = 0.8;
  TouchableOpacity.defaultProps.focusedOpacity = 0.8;
  //扩展方法
  String.prototype.format = function(args) {
    let result = this;
    if (arguments.length > 0) {
      if (arguments.length === 1 && typeof (args) === 'object') {
        for (let key in args) {
          if (args[key] !== undefined){
            let reg = new RegExp('({' + key + '})', 'g');
            result = result.replace(reg, args[key]);
          }
        }
      }
      else {
        for (var i = 0; i < arguments.length; i++) {
          if (arguments[i] !== undefined) {
            var reg = new RegExp('({)' + i + '(})', 'g');
            result = result.replace(reg, arguments[i]);
          }
        }
      }
    }
    return result;
  };
}

export default init;
