/**
 * Created by Jackoder on 2017/6/18.
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewPropTypes
} from 'react-native';
import {
  FontSize,
  StaticColor
} from '../../base';

export default class SearchView extends Component {

  static propTypes = {
    style: ViewPropTypes.style,
    icon: PropTypes.number,
    title: PropTypes.string,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    icon: require('../../../../res/search.png'),
    title: '搜索'
  }

  render = () => (
    <TouchableOpacity style={[styles.container, this.props.style]}
                      onPress={this.props.onPress}>
        <View style={styles.innerContainer}>
          <Image style={styles.icon} source={this.props.icon}/>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: StaticColor.COLOR11,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: StaticColor.COLOR9
  },
  innerContainer: {
    height: 30,
    backgroundColor: StaticColor.COLOR7,
    borderColor: StaticColor.COLOR5,
    borderWidth: 0.5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: 3
  },
  text: {
    fontSize: FontSize.CHARACTER6,
    color: StaticColor.COLOR5
  }
});