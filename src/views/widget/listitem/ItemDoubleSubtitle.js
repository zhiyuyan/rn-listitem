/**
 * Created by yzy on 2017/8/18.
 */

import React, { PropTypes, Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    Image
} from 'react-native';
import {
    FontSize,
    StaticColor
} from '../../base';

export default class ItemDoubleSubtitle extends Component {

    static propTypes = {
        pic: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.object,
			PropTypes.element
		]),
        title: PropTypes.string,
        firstSubtitle: PropTypes.string,
        secondSubtitle: PropTypes.string,
        onItemClick: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.onClick = this._onClick.bind(this);
    }

    render() {
        const content = (
            <View>
                <View style={styles.container}>
                    <Image source={this.props.pic} style={styles.image} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.title}</Text>
                        <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.firstSubtitle}</Text>
                        <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.secondSubtitle}</Text>
                    </View>
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

    _onClick = () => {
        this.props.onItemClick && this.props.onItemClick(this.props);
    }

}

const styles = StyleSheet.create({
    container: {
        height: 66,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50
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
    subTitle: {
        fontSize: FontSize.CHARACTER8,
        color: StaticColor.COLOR4,
        marginTop: 4
    },
    separator: {
        height: 0.5,
        backgroundColor: StaticColor.COLOR8,
        marginLeft: 70
    }
});