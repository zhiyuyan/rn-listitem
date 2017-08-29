/**
 * Created by yzy on 2017/8/14.
 */

import React, { PropTypes, Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
    Image
} from 'react-native';
import {
    FontSize,
    StaticColor
} from '../../base';

export default class ItemOnlyText extends Component {

    static propTypes = {
        title: PropTypes.string,
        onItemClick: PropTypes.func,
        showIcon: PropTypes.bool,
        onIconPress: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.onClick = this._onClick.bind(this);
        this.onIconPress = this._onIconPress.bind(this);
    }

    render() {
        const content = (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, marginRight: 10 }}>
                    <Text style={[styles.title]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.title}</Text>
                    {this._renderImage()}
                </View>
                <View style={styles.separator} />
            </View>
        );
        if (this.props.onItemClick) {
            return <TouchableHighlight underlayColor={StaticColor.COLOR8} onPress={this.onClick}>{content}</TouchableHighlight>;
        } else {
            return content;
        }
    }

    _renderImage() {
        if (this.props.showIcon) {
            return (
                <TouchableWithoutFeedback onPress={this.onIconPress}>
                    <Image source={require('../../../../res/ic_chat_list.png')} style={styles.image} />
                </TouchableWithoutFeedback>
            );
        } else {
            return null;
        }
    }

    _onClick = () => {
        this.props.onItemClick && this.props.onItemClick(this.props);
    }

    _onIconPress = () => {
        this.props.onIconPress && this.props.onIconPress(this.props);
    }

}

const styles = StyleSheet.create({
    container: {
        height: 44,
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10
    },
    title: {
        fontSize: FontSize.CHARACTER4,
        color: StaticColor.COLOR1,
        flexShrink: 1
    },
    image: {
        width: 30,
        height: 30,
        marginLeft: 10
    },
    separator: {
        height: 0.5,
        backgroundColor: StaticColor.COLOR8
    }
});
