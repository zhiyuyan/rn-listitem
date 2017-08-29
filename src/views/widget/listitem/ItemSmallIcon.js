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
    Image,
    Platform
} from 'react-native';
import {
    FontSize,
    StaticColor
} from '../../base';

const isIOS = Platform.OS === 'ios';

export default class ItemSmallIcon extends Component {

    static propTypes = {
        header: PropTypes.string,
        showHeader: PropTypes.bool,
        pic: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.element
        ]),
        title: PropTypes.string,
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
        return (
            <View>
                {this._renderHeader()}
                {this._renderContent()}
            </View>
        );
    }

    _renderHeader() {
        if (this.props.showHeader) {
            return (
                <View style={{ flexDirection: 'column', height: 34 }} >
                    <View style={{ flexDirection: 'column', justifyContent: 'center', flexGrow: 1 }} >
                        <Text style={{
                            fontSize: FontSize.CHARACTER5,
                            color: StaticColor.COLOR4,
                            marginLeft: 10
                        }}>
                            {this.props.header}
                        </Text>
                    </View>
                    <View style={{
                        height: 0.5,
                        backgroundColor: StaticColor.COLOR8,
                        marginLeft: 10
                    }} />
                </View>
            );
        } else {
            return null;
        }
    }

    _renderContent() {
        const content = (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    {this._renderCheckbox(this.props.showCheckbox, this.state.checked)}
                    <Image source={this.props.pic} style={styles.image} />
                </View>
                <View style={styles.titleContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1, marginRight: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', flexShrink: 1 }}>
                            <Text style={[styles.title, { flexShrink: 1, flexBasis: 'auto' }]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.title}</Text>
                        </View>
                        {this._renderMoreIcon()}
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

    _renderMoreIcon() {
        if (isIOS) {
            return (
                <Image source={require('../../../../res/ic_arrow_right.png')} style={{ height: 14, width: 8, marginLeft: 10 }} />
            );
        } else {
            return null;
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
        height: 44,
        flexDirection: 'row'
    },
    checkbox: {
        width: 22,
        height: 22,
        marginRight: 10
    },
    image: {
        width: 30,
        height: 30
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
    separator: {
        height: 0.5,
        backgroundColor: StaticColor.COLOR8
    }
});