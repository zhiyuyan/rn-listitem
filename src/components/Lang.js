/**
 * Created by Jackoder on 2017/6/13.
 */
import {Lang as InnerLang} from '@sdp.nd/react-appfactory-wrapper';
import Config from '../../example/src/Config';
const zhLang = require('../../i18n.json');
//声明key是为了编码时候能够联想
let Lang = Object.assign({
  hello: null
}, zhLang, InnerLang[Config.RN_NAME]);
export default Lang;