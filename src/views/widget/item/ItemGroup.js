/**
 * Created by Jackoder on 2017/6/18.
 */
import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ViewPropTypes,
  Text,
  ScrollView
} from 'react-native';
import {FontSize, StaticColor} from '../../base';
import _ from 'lodash';

export default class ItemInfoGroup extends Component {

  static propTypes = {
    style: ViewPropTypes.style,
    marginDividerStyle: ViewPropTypes.style,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    bottom: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
  }

  render() {
    let children = null;
    if (typeof(this.props.children) === 'array') {
      children = [];
      for (let i = 0; i < this.props.children.length; i++) {
        children.push(this.props.children[i]);
        if (i != this.props.children.length - 1) {
          children.push(<View key={i} style={[styles.marginDivider, this.props.marginDividerStyle]}/>);
        }
      }
    } else {
      children = this.props.children;
    }
    let key = 0;
    return (
      <ScrollView style={[styles.container, this.props.style]}
        bounces={false}
        keyboardDismissMode={'none'}
        keyboardShouldPersistTaps={'handled'}>
        {
          _.isEmpty(this.props.name) ? null : (
            <View key={'item-' + ++key} style={styles.nameContainer}>
              {
                typeof(this.props.name) == 'string' ? <Text style={styles.name}>{this.props.name}</Text> : this.props.name
              }
            </View>
          )
        }
        <View key={'item-' + ++key} style={styles.itemContainer}>
          <View style={styles.divider}/>
          {children}
          <View style={styles.divider}/>
        </View>
        {
          _.isEmpty(this.props.bottom) ? null : (
            <View key={'item-' + ++key} style={styles.nameContainer}>
              {
                typeof(this.props.bottom) == 'string' ? <Text style={styles.name}>{this.props.bottom}</Text> : this.props.bottom
              }
            </View>
          )
        }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  nameContainer: {
    paddingLeft: 10,
    paddingTop: 13,
    paddingBottom: 6
  },
  itemContainer: {
    backgroundColor: StaticColor.COLOR7
  },
  name: {
    fontSize: FontSize.CHARACTER7,
    color: StaticColor.COLOR4
  },
  divider: {
    height: 0.5,
    backgroundColor: StaticColor.COLOR9
  },
  marginDivider: {
    marginLeft: 10,
    height: 0.5,
    backgroundColor: StaticColor.COLOR9
  }
});
