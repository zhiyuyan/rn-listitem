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

export default class ItemSmallAvatar extends Component {

    static propTypes = {
        avatar: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.element
        ]),
        title: PropTypes.string,
        subtitle: PropTypes.string,
        showCheckbox: PropTypes.bool,
        checked: PropTypes.bool,
        onCheckboxClick: PropTypes.func,
        onItemClick: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.onClick = this._onClick.bind(this);
        this.onCheckboxClick = this._onCheckboxClick.bind(this);
        this.state = {
            checked: this.props.checked
        }
    }

    render() {
        const content = (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 66 }}>
                    {this._renderCheckbox(this.props.showCheckbox, this.state.checked)}
                    <Image source={this.props.avatar} style={styles.image} />
                </View>
                <View style={styles.titleContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flexGrow: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', flexGrow: 1 }}>
                            <Text style={[styles.title, { flexShrink: 1, flexBasis: 'auto' }]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.title}</Text>
                            <Text style={[styles.subtitle, { flexShrink: 1, flexBasis: 'auto' }]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.subtitle}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </View>
        );
        if (this.props.onItemClick) {
            return <TouchableHighlight underlayColor={StaticColor.COLOR8} onPress={this.onClick}>{content}</TouchableHighlight>;
        } else {
            return content;
        }
    }

    _renderCheckbox(showCheckbox, checked) {
        if (showCheckbox) {
            let source = checked ? require('../../../../res/ic_checkbox_pressed.png') : require('../../../../res/ic_checkbox_normal.png');
            return (
                <TouchableWithoutFeedback onPress={this.onCheckboxClick}>
                    <Image source={source} style={styles.checkbox} />
                </TouchableWithoutFeedback>
            );
        } else {
            return null;
        }
    }

    _onClick = () => {
        this.props.onItemClick && this.props.onItemClick(this.props);
    }

    _onCheckboxClick = () => {
        this.setState(previousState => {
            return ({ checked: !previousState.checked });
        });
        this.props.onCheckboxClick && this.props.onCheckboxClick(this.state.checked);
    }

}

const styles = StyleSheet.create({
    container: {
        height: 66,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    checkbox: {
        width: 22,
        height: 22,
        marginRight: 10
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10
    },
    title: {
        fontSize: FontSize.CHARACTER4,
        color: StaticColor.COLOR1
    },
    subtitle: {
        fontSize: FontSize.CHARACTER5,
        color: StaticColor.COLOR4,
        marginLeft: 4
    },
    separator: {
        height: 0.5,
        backgroundColor: StaticColor.COLOR8
    }
});