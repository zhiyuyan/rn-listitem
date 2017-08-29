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

export default class ItemMultiLineSubtitle extends Component {

    static propTypes = {
        pic: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.element
        ]),
        title: PropTypes.string,
        subtitle: PropTypes.string,
        time: PropTypes.string,
        onItemClick: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.onClick = this._onClick.bind(this);
    }

    render() {
        const content = (
            <View style={styles.container}>
                <Image source={this.props.pic} style={styles.image} />
                <View style={styles.titleContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, marginTop: 15, marginRight: 10 }}>
                        <Text style={[styles.title]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.title}</Text>
                        <Text style={[styles.time]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.time}</Text>
                    </View>
                    <Text style={{
                        fontSize: FontSize.CHARACTER5,
                        color: StaticColor.COLOR4,
                        marginTop: 7,
                        marginRight: 10
                    }} numberOfLines={6} ellipsizeMode={'tail'}>
                        {this.props.subtitle}
                    </Text>
                    <View style={styles.separator} />
                </View>
            </View >
        );
        if (this.props.onItemClick) {
            return <TouchableHighlight underlayColor={StaticColor.COLOR8} onPress={this.onClick}>{content}</TouchableHighlight>;
        } else {
            return content;
        }
    }

    _onClick = () => {
        this.props.onItemClick && this.props.onItemClick(this.props);
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 8,
        marginLeft: 10
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10
    },
    title: {
        fontSize: FontSize.CHARACTER4,
        color: StaticColor.COLOR1,
        flexShrink: 1
    },
    time: {
        fontSize: FontSize.CHARACTER7,
        color: StaticColor.COLOR4,
        marginLeft: 4
    },
    separator: {
        height: 0.5,
        marginTop: 15,
        backgroundColor: StaticColor.COLOR8
    }
});