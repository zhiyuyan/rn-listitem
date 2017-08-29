/**
 * Created by Jackoder on 2017/6/17.
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {FontSize, StaticColor} from '../../base';
import _ from 'lodash';

export default class ItemInfo extends Component {

  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    labelIcon: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.element
    ]),
    value: PropTypes.string,
    valueTip: PropTypes.string,
    hasMore: PropTypes.bool,
    onMoreClick: PropTypes.func,
    clickable: PropTypes.bool,
  };

  static defaultProps = {
    hasMore: false,
    clickable: true
  };

  constructor(props) {
    super(props);
    this.onClick = this._onClick.bind(this);
  }

  render() {
    const value = (
      <Text style={_.isEmpty(this.props.value) ? styles.value : styles.valueTip}
        numberOfLines={1}
        ellipsizeMode={'tail'}>
        {_.isEmpty(this.props.value) ? this.props.valueTip : this.props.value}
      </Text>
    );
    const content = (
      <View style={styles.container}>
        {
          typeof(this.props.label) == 'element' ? this.props.label : (
            this.props.labelIcon == null ? <Text style={styles.label}>{this.props.label}</Text> : (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {
                  typeof(this.props.labelIcon) == 'object' ? this.props.labelIcon :
                    <Image style={styles.labelIcon} source={this.props.labelIcon}/>
                }
                <Text style={styles.label}>{this.props.label}</Text>
              </View>
          ))
        }
        {
          this.props.hasMore ? (
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              {value}
              <Image style={styles.more} source={require('../../../../res/more.png')}/>
            </View>
          ) : value
        }
      </View>
    );
    if (this.props.clickable) {
      return <TouchableOpacity onPress={this.onClick}>{content}</TouchableOpacity>
    } else {
      return content;
    }
  }

  _onClick = () => {
    this.props.onMoreClick && this.props.onMoreClick();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  labelIcon: {
    width: 14,
    height: 14,
    marginRight: 8
  },
  label: {
    fontSize: FontSize.CHARACTER4,
    color: StaticColor.COLOR1
  },
  value: {
    flex: 1,
    fontSize: FontSize.CHARACTER5,
    color: StaticColor.COLOR4,
    textAlign: 'right',
    marginLeft: 10
  },
  valueTip: {
    flex: 1,
    fontSize: FontSize.CHARACTER5,
    color: StaticColor.COLOR1,
    textAlign: 'right',
    marginLeft: 10
  },
  more: {
    width: 8,
    height: 14,
    marginLeft: 6
  }
});
