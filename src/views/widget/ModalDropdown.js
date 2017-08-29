/**
 * Created by sohobloo on 16/9/13.
 */

'use strict';

import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    Dimensions,
    Platform,
    ART,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    ActivityIndicator,
    ScrollView,
} from 'react-native';

const {Surface, Shape, Path} = ART;

const isIOS = Platform.OS === 'ios';

const TOUCHABLE_ELEMENTS = ['TouchableHighlight', 'TouchableOpacity', 'TouchableWithoutFeedback', 'TouchableNativeFeedback'];
const dropModalIOSWidth = 170;
const dropModalAndWidth = 130;
const ArrowWidth = 20;
const ArrowHeight = 12;

export default class ModalDropdown extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        defaultValue: PropTypes.string,
        options: PropTypes.array,

        accessible: PropTypes.bool,
        animated: PropTypes.bool,
        isCanScroll: PropTypes.bool,

        textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        dropdownStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        dropdownTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

        adjustFrame: PropTypes.func,
        renderRow: PropTypes.func,
        renderSeparator: PropTypes.func,

        onDropdownWillShow: PropTypes.func,
        onDropdownWillHide: PropTypes.func,
        onSelect: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        defaultValue: 'Please select...',
        options: null,
        animated: true,
        isCanScroll: false,
    };

    constructor(props) {
        super(props);

        this._button = null;
        this._buttonFrame = null;
        this._nextValue = null;

        this.state = {
            disabled: props.disabled,
            accessible: !!props.accessible,
            showDropdown: false,
            buttonText: props.defaultValue,
        };
    }

    componentWillReceiveProps(nextProps) {
        var buttonText = this._nextValue == null ? this.state.buttonText : this._nextValue.toString();
        this._nextValue = null;

        this.setState({
            disabled: nextProps.disabled,
            buttonText: buttonText,
        });
    }

    render() {
        return (
            <View {...this.props}>
                {this._renderButton()}
                {this._renderModal()}
            </View>
        );
    }

    _updatePosition(callback) {
        if (this._button && this._button.measure) {
            this._button.measure((fx, fy, width, height, px, py) => {
                this._buttonFrame = {x: px, y: py, w: width, h: height};
                callback && callback();
            });
        }
    }

    show() {
        this._updatePosition(() => {
            this.setState({
                showDropdown: true
            });
        });
    }

    hide() {
        this.setState({
            showDropdown: false
        });
    }

    _renderButton() {
        return (
            <TouchableOpacity ref={button => this._button = button}
                              disabled={this.props.disabled}
                              accessible={this.props.accessible}
                              onPress={this._onButtonPress.bind(this)}>
                {
                    this.props.children ||
                    (
                        <View style={styles.button}>
                            <Text style={[styles.buttonText, this.props.textStyle]}
                                  numberOfLines={1}>
                                {this.state.buttonText}
                            </Text>
                        </View>
                    )
                }
            </TouchableOpacity>
        );
    }

    _onButtonPress() {
        if (!this.props.onDropdownWillShow ||
            this.props.onDropdownWillShow() !== false) {
            this.show();
        }
    }

    _renderModal() {
        if (this.state.showDropdown && this._buttonFrame) {
            let frameStyle = this._calcPosition();
            let animationType = this.props.animated ? 'fade' : 'none';
            let arrowStyle = this._calcArrowPosition(frameStyle);

            let arrow;
            let fillColor = (this.props.dropdownStyle && StyleSheet.flatten(this.props.dropdownStyle).backgroundColor) || '#ffffff';
            if(isIOS){
                arrow = <View style={arrowStyle}>
                    <Triangle
                        fillColor={fillColor}
                    />
                </View>
            }else{
                arrow = <View></View>
            }
            return (
                <Modal animationType={animationType}
                       transparent={true}
                       onRequestClose={this._onRequestClose.bind(this)}
                       supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
                    <TouchableWithoutFeedback accessible={this.props.accessible}
                                              disabled={!this.state.showDropdown}
                                              onPress={this._onModalPress.bind(this)}>
                        <View style={styles.modal}>
                            {arrow}
                            <View style={[styles.dropdown, {width: isIOS ? dropModalIOSWidth : dropModalAndWidth},this.props.dropdownStyle,frameStyle]}>
                                {this._renderDropdown()}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            );
        }
    }

    // 计算箭头的位置
    _calcArrowPosition(frameStyle){
        let style = {
            height: ArrowHeight,
            top: frameStyle.top-ArrowHeight,
        }

        style.left = this._buttonFrame.x+this._buttonFrame.w/2-ArrowWidth/2;

        console.log('arrowStyle', style, this._buttonFrame);

        return style;
    }

    // 计算下拉列表框 的位置：高，顶部距离，左边或右边距离
    _calcPosition() {
        let dimensions = Dimensions.get('window');
        let windowWidth = dimensions.width;
        let windowHeight = dimensions.height;

        // dropdownHeight高度优先选择dropdownStyle中的高度，否则选择dropdown的高度
        let dropdownHeight = (this.props.dropdownStyle && StyleSheet.flatten(this.props.dropdownStyle).height) ||
            StyleSheet.flatten(styles.dropdown).height;

        // 屏幕底部剩下的空间 高度
        let bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
        // 屏幕右边剩下的空间 宽度
        let rightSpace = windowWidth - this._buttonFrame.x;
        // 是否显示在按钮底部
        let showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
        // 是否靠左显示
        let showInLeft = rightSpace >= this._buttonFrame.x;

        console.log('isIOS',isIOS);

        let top = 0;
        if(!isIOS){
            // android  需要遮挡住按钮
            top = showInBottom ? this._buttonFrame.y : Math.max(0, this._buttonFrame.y - dropdownHeight - this._buttonFrame.h);
        }else {
            // ios 不需要遮挡按钮
            top = showInBottom ? this._buttonFrame.y + this._buttonFrame.h : Math.max(0, this._buttonFrame.y - dropdownHeight);
        }

        var style = {
            height: dropdownHeight,
            top: top,
        };

        if (showInLeft) {
            style.left = this._buttonFrame.x;
            // 当按钮在屏幕中间范围位置的时候，保证下拉框居中与文字显示
            let left = 0;
            if(isIOS){
                left = this._buttonFrame.x-(dropModalIOSWidth-this._buttonFrame.w)/2;
            }else{
                left = this._buttonFrame.x-(dropModalAndWidth-this._buttonFrame.w)/2;
            }
            style.left = left<=0?style.left:left;
        } else {
            style.right = rightSpace - this._buttonFrame.w;
        }

        if (this.props.adjustFrame) {
            style = this.props.adjustFrame(style) || style;
        }

        if(this.props.isCanScroll){
            style.height = 200;
        }

        if(isIOS){
            // IOS 上方有箭头
            style.top = style.top+ArrowHeight-2;
        }


        top = (this.props.dropdownStyle && StyleSheet.flatten(this.props.dropdownStyle).top)||-1;
        if(top != -1){
            style.top = top;
        }
        let left = (this.props.dropdownStyle && StyleSheet.flatten(this.props.dropdownStyle).left)||-1;
        let right = (this.props.dropdownStyle && StyleSheet.flatten(this.props.dropdownStyle).right)||-1;
        if(left != -1){
            style.left = left;
        }else if(right != -1){
            style.right = right;
        }


        console.log('style', style);

        return style;
    }

    _onRequestClose() {
        if (!this.props.onDropdownWillHide ||
            this.props.onDropdownWillHide() !== false) {
            this.hide();
        }
    }

    _onModalPress() {
        if (!this.props.onDropdownWillHide ||
            this.props.onDropdownWillHide() !== false) {
            this.hide();
        }
    }

    _renderDropdown() {

        if(this.props.options.length == 0){
            return(
                <View></View>
            );
        }

        let len = this.props.options.length;
        let items =  this.props.options.map(function(data, index){
            if(index == len-1){
                return(
                    <View key={index}>
                        {this._renderRow(data, index)}
                    </View>
                );
            }else{
                return(
                    <View key={index}>
                        {this._renderRow(data, index)}
                        {this._renderSeparator(index)}
                    </View>
                );
            }

        }.bind(this));


        return (
            <ScrollView>
                {items}
            </ScrollView>
        );
    }


    _renderRow(rowData, index) {
        let key = 'row'+index;
        let row = !this.props.renderRow ?
            (<View style={styles.rowStyle}>
                <Text style={[
                styles.rowText,
                {paddingHorizontal: isIOS ? 0 : 10 },
                this.props.dropdownTextStyle,
              ]}
                >
                    {rowData}
                </Text>
            </View>) :
            this.props.renderRow(rowData, index, index);
        let preservedProps = {
            key: key,
            accessible: this.props.accessible,
            onPress: () => this._onRowPress(rowData, index, index, index),
        };
        if (TOUCHABLE_ELEMENTS.find(name => name == row.type.displayName)) {
            var props = {...row.props};
            props.key = preservedProps.key;
            props.onPress = preservedProps.onPress;
            switch (row.type.displayName) {
                case 'TouchableHighlight': {
                    return (
                        <TouchableHighlight {...props}>
                            {row.props.children}
                        </TouchableHighlight>
                    );
                }
                    break;
                case 'TouchableOpacity': {
                    return (
                        <TouchableOpacity {...props}>
                            {row.props.children}
                        </TouchableOpacity>
                    );
                }
                    break;
                case 'TouchableWithoutFeedback': {
                    return (
                        <TouchableWithoutFeedback {...props}>
                            {row.props.children}
                        </TouchableWithoutFeedback>
                    );
                }
                    break;
                case 'TouchableNativeFeedback': {
                    return (
                        <TouchableNativeFeedback {...props}>
                            {row.props.children}
                        </TouchableNativeFeedback>
                    );
                }
                    break;
                default:
                    break;
            }
        }
        return (
            <TouchableOpacity {...preservedProps}>
                {row}
            </TouchableOpacity>
        );
    }

    _onRowPress(rowData, rowID) {
        if (!this.props.onSelect ||
            this.props.onSelect(rowID, rowData) !== false) {
            this._nextValue = rowData;
            this.setState({
                buttonText: rowData.toString(),
            });
        }
        if (!this.props.onDropdownWillHide ||
            this.props.onDropdownWillHide() !== false) {
            this.setState({
                showDropdown: false
            });
        }
    }

    // IOS 需要分割线， android 不需要
    _renderSeparator(rowId) {
        let key = 'sep'+rowId;
        if(isIOS){
            return (<View style={styles.separator}
                          key={key}
            />);
        }else{
            return(
                <View key={key}></View>
            );
        }

    }
}

// 三角形箭头，IOS需要
class Triangle extends Component{
    constructor(props){
        super(props);

        this.fillColor = this.props.fillColor == null?'#892265':this.props.fillColor;
    }
    render(){
        const path = new Path()
            .moveTo(0,ArrowHeight)
            .lineTo(ArrowWidth,ArrowHeight)
            .lineTo(ArrowWidth/2,0)
            .close();

        return(
            <Surface width={ArrowWidth} height={ArrowHeight}>
                <Shape d={path} fill={this.fillColor}  />
            </Surface>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 12
    },
    modal: {
        flexGrow: 1
    },
    dropdown: {
        position: 'absolute',
        borderRadius: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 4,
        paddingBottom: 4,
    },
    rowStyle:{
        height: 44,
        flexDirection:'row',
        justifyContent: isIOS?'center':'flex-start',
        alignItems:'center'
    },
    rowText: {
        fontSize: 15,
        color: '#333333',
        textAlignVertical: 'center',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#dddddd'
    }
});
