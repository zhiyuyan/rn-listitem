/**
 * Created by yzy on 2017/8/16.
 */

import React, { PropTypes, Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    Image,
    Platform
} from 'react-native';
import {
    FontSize,
    StaticColor
} from '../../base';

const isIOS = Platform.OS === 'ios';

export default class ItemSerachResult extends Component {

    static propTypes = {
        showHeader: PropTypes.bool,
        header: PropTypes.string,
        pic: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.element
        ]),
        title: PropTypes.string,
        firstSubtitle: PropTypes.string,
        secondSubtitle: PropTypes.string,
        onItemClick: PropTypes.func,
        showSearchMore: PropTypes.bool,
        searchMoreText: PropTypes.string,
        onSearchMoreClick: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.onClick = this._onClick.bind(this);
        this.onSearchMoreClick = this._onSearchMoreClick.bind(this);
        this.state = {
            checked: props.checked
        }
    }

    render() {
        return (
            <View>
                {this._renderHeader()}
                {this._renderContent()}
                {this._renderMoreResult()}
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
            <View>
                <View style={styles.container}>
                    <Image source={this.props.pic} style={styles.image} />
                    <View style={styles.titleContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={[styles.title, { flexShrink: 1, flexBasis: 'auto' }]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.title}</Text>
                            <Text style={[styles.firstSubtitle, { flexShrink: 0, flexBasis: 'auto' }]} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.firstSubtitle}</Text>
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
            return (<Text style={styles.subtitle} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.secondSubtitle}</Text>);
        } else {
            return null;
        }
    }

    _renderMoreResult() {
        if (this.props.showSearchMore) {
            let content = (<View style={{ height: 44, flexDirection: 'column' }}>
                <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>
                    <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../../res/ic_search_more.png')} style={{ height: 14, width: 14 }} />
                        <Text style={{ fontSize: FontSize.CHARACTER5, color: StaticColor.COLOR2, marginLeft: 10 }}>
                            {this.props.searchMoreText}
                        </Text>
                    </View>
                    {this._renderMoreIcon()}
                </View>
                <View style={{
                    height: 0.5,
                    backgroundColor: StaticColor.COLOR9
                }} />
            </View>);
            if (this.props.onSearchMoreClick) {
                return <TouchableHighlight underlayColor={StaticColor.COLOR8} onPress={this.onSearchMoreClick}>{content}</TouchableHighlight>;
            } else {
                return content;
            }
        } else {
            return null;
        }
    }

    _renderMoreIcon() {
        if (isIOS) {
            return (
                <Image source={require('../../../../res/ic_arrow_right.png')} style={{ height: 14, width: 8 }} />
            );
        } else {
            return null;
        }
    }

    _onSearchMoreClick = () => {
        this.props.onSearchMoreClick && this.props.onSearchMoreClick();
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
        fontSize: FontSize.CHARACTER2,
        color: StaticColor.COLOR1
    },
    subtitle: {
        fontSize: FontSize.CHARACTER5,
        color: StaticColor.COLOR4,
        marginTop: 10
    },
    separator: {
        height: 0.5,
        backgroundColor: StaticColor.COLOR8,
        marginLeft: 10
    }
});