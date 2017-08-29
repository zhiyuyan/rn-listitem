/**
 * Created by yzy on 2017/8/14.
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

export default class ItemBigAvatar extends Component {

    static propTypes = {
        avatar: PropTypes.oneOfType([
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
                    <Image source={this.props.avatar} style={styles.image} />
                    <View style={styles.titleContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={[styles.title, { flexShrink: 1, flexBasis: 'auto' }]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.title}</Text>
                            <Text style={[styles.firstSubtitle, { flexShrink: 1, flexBasis: 'auto' }]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.firstSubtitle}</Text>
                        </View>
                        {this._renderSecondSubtitle()}
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

    _renderSecondSubtitle() {
        if (this.props.secondSubtitle) {
            return (<Text style={styles.secondSubtitle} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.secondSubtitle}</Text>);
        } else {
            return null;
        }
    }

    _onClick = () => {
        this.props.onItemClick && this.props.onItemClick(this.props);
    }

}

const styles = StyleSheet.create({
    container: {
        height: 66,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
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
    firstSubtitle: {
        fontSize: FontSize.CHARACTER5,
        color: StaticColor.COLOR4,
        marginLeft: 4
    },
    secondSubtitle: {
        fontSize: FontSize.CHARACTER5,
        color: StaticColor.COLOR4,
        marginTop: 10
    },
    separator: {
        height: 0.5,
        backgroundColor: StaticColor.COLOR8,
        marginLeft: 70
    }
});