/**
 * Created by Jackoder on 2017/6/17.
 */
import {NDNavigatorScreen} from '@sdp.nd/NavigatorManager';

export default class BaseScreen extends NDNavigatorScreen {

  static navigationOptions = {
    header: null
  }

  screenDidAppear() {
    console.log('Appear');
  }

  screenDidDisappear() {
    console.log('DisAppear');
  }

  componentDidMount() {
    super.componentDidMount();// 必须
  }

  componentWillUnmount() {
    super.componentWillUnmount();// 必须
  }
}