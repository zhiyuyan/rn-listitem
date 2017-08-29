/**
 * Created by Administrator on 2017/8/22 0022.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import {
    FontSize,
    StaticColor
} from '../base';

export default class SegmentedControl extends Component{
    static propTypes = {
        values: PropTypes.arrayOf(PropTypes.string),        // 按顺序每一个段落的标题文字
        selectedIndex: PropTypes.number,                    // 组件显示时，一开始被选中的段落的下标
        onValueChange: PropTypes.func,                      // 当用户点击某一段的时候调用, 参数是被选中段的值。
        segmentedControlStyle:PropTypes.object,             // 控制属性
    }

    static get getDefaultProps(){
        return {
            selectedIndex: 0,
            values:[],
            segmentedControlStyle:{
                borderColor: StaticColor.COLOR14,              // 边框颜色
                selectSegmentColor: StaticColor.COLOR14,       // 选中段的颜色
                unselectSegmentColor:StaticColor.COLOR7,     // 未选中段的颜色
                selectTextColor:StaticColor.COLOR7,          // 选中字体的颜色
                unSelectTextColor: StaticColor.COLOR14,       // 未选中字体的颜色
                fontSize: FontSize.CHARACTER5,                       // 字体的大小
            }
        };
    }

    constructor(props){
        super(props);

        this.state = {
            currentSelectIndex: props.selectedIndex
        }
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    render(){

        let segStyle = this.getStyleFromUserStyle();
        console.log('segmentedControlStyle', this.props.segmentedControlStyle, 'segStyle', segStyle);

        let len = this.props.values.length;

        if(len == 0){
            return(
                <View></View>
            );
        }else {
            let content = this.getContent(segStyle);
            return(
                <View>
                    <View style={[styles.warpView, {width:76*len+1.6}, {borderColor: segStyle.borderColor}]}>
                        {content}
                    </View>
                </View>

            );
        }
    }

    getStyleFromUserStyle(){

        let userStyle = this.props.segmentedControlStyle;
        let segStyle = new Object();
        segStyle.borderColor = userStyle.borderColor == null?StaticColor.COLOR14:userStyle.borderColor;
        segStyle.selectSegmentColor = userStyle.selectSegmentColor == null?StaticColor.COLOR14:userStyle.selectSegmentColor;
        segStyle.unselectSegmentColor = userStyle.unselectSegmentColor == null?StaticColor.COLOR7:userStyle.unselectSegmentColor;
        segStyle.selectTextColor = userStyle.selectTextColor == null?StaticColor.COLOR7:userStyle.selectTextColor;
        segStyle.unSelectTextColor = userStyle.unSelectTextColor == null?StaticColor.COLOR14:userStyle.unSelectTextColor;
        segStyle.fontSize = userStyle.fontSize == null?FontSize.CHARACTER5:userStyle.fontSize;

        return segStyle;
    }

    getContent(style){

        let len = this.props.values.length;
        console.log('len=',len, 'currentSelectIndex=', this.state.currentSelectIndex);
        let items;
        if(len == 0){
            items = <Text />;
        }else if(len == 1){     // 只有一个段
            items = <Segment
                index={0}
                value={this.props.values[0]}
                segmentFlag={oneSegment}
                onSelectClick={this.onSelectChange}
                style={style}
            />
        }else{
            items = this.props.values.map(function(data, index){
                let isSelect = (index == this.state.currentSelectIndex)?true:false;
                if(index == 0){
                    return (
                        <Segment
                            key={index}
                            index={index}
                            value={data}
                            isSelect={isSelect}
                            segmentFlag={leftSegment}
                            onSelectClick={this.onSelectChange}
                            style={style}
                        />
                    );
                }else if(index == len-1){
                    return (
                        <Segment
                            key={index}
                            index={index}
                            value={data}
                            isSelect={isSelect}
                            segmentFlag={rightSegment}
                            onSelectClick={this.onSelectChange}
                            style={style}
                        />
                    );
                }else{
                    return (
                        <Segment
                            key={index}
                            index={index}
                            value={data}
                            isSelect={isSelect}
                            segmentFlag={centerSegment}
                            onSelectClick={this.onSelectChange}
                            style={style}
                        />
                    );
                }
            }.bind(this));
        }

        return items;
    }

    onSelectChange(index, value){
        console.log("value", index,value)
        this.setState({
            currentSelectIndex: index
        });
        if(this.props.onValueChange != null){
            this.props.onValueChange(index, value);
        }
    }

}

// ES6的用法
SegmentedControl.defaultProps = {
    selectedIndex: 0,
    values:[],
    segmentedControlStyle:{
        borderColor:StaticColor.COLOR14,              // 边框颜色
        selectSegmentColor:StaticColor.COLOR14,       // 选中段的颜色
        unselectSegmentColor:StaticColor.COLOR7,     // 未选中段的颜色
        selectTextColor:StaticColor.COLOR7,          // 选中字体的颜色
        unSelectTextColor: StaticColor.COLOR14,       // 未选中字体的颜色
        fontSize: FontSize.CHARACTER5,
    }
};

const leftSegment = 1;
const centerSegment = 2;
const rightSegment = 3;
const oneSegment = 4;

// 每一个段
class Segment extends Component{
    static propTypes = {
        value: PropTypes.string,
        index: PropTypes.number,
        isSelect: PropTypes.bool,
        segmentFlag: PropTypes.number,
        onSelectClick: PropTypes.func
    }

    static get getDefaultProps(){
        return {
            value: '',
            index: 0,
            isSelect: false,
            style:{
                borderColor:StaticColor.COLOR14,              // 边框颜色
                selectSegmentColor:StaticColor.COLOR14,       // 选中段的颜色
                unselectSegmentColor:StaticColor.COLOR7,     // 未选中段的颜色
                selectTextColor:StaticColor.COLOR7,          // 选中字体的颜色
                unSelectTextColor: StaticColor.COLOR14,       // 未选中字体的颜色
                fontSize: FontSize.CHARACTER5,                       // 字体的大小
            }
        };
    }

    constructor(props){
        super(props);

        this.onSelectClick = this.onSelectClick.bind(this);
    }

    render(){
        if(this.props.segmentFlag == leftSegment){   // 左边段

            return (
                <TouchableOpacity
                    style={[
                        this.props.isSelect?styles.leftSelectedCornerBtn:styles.leftNormalCornerBtn,
                        {backgroundColor:this.props.isSelect?this.props.style.selectSegmentColor:this.props.style.unselectSegmentColor}
                        ]}
                    onPress={this.onSelectClick}
                    disabled={this.props.isSelect}
                >
                    <Text
                        numberOfLines={1}
                        style={[
                            this.props.isSelect?styles.selectText:styles.unSelectText,
                            {color:this.props.isSelect?this.props.style.selectTextColor:this.props.style.unSelectTextColor},
                            {fontSize:this.props.style.fontSize}
                        ]}
                    >{this.props.value}</Text>
                    <View style={[styles.divideLine, {backgroundColor: this.props.style.borderColor}]}></View>
                </TouchableOpacity>
            );

        }else if(this.props.segmentFlag == rightSegment){   // 右边段
            return (
                <TouchableOpacity
                    style={[
                    this.props.isSelect?styles.rightSelectedCornerBtn:styles.rightNormalCornerBtn,
                    {backgroundColor: this.props.isSelect?this.props.style.selectSegmentColor:this.props.style.unselectSegmentColor}
                    ]}
                    onPress={this.onSelectClick}
                    disabled={this.props.isSelect}
                >
                    <Text
                        numberOfLines={1}
                        style={[
                            this.props.isSelect?styles.selectText:styles.unSelectText,
                            {color:this.props.isSelect?this.props.style.selectTextColor:this.props.style.unSelectTextColor},
                            {fontSize:this.props.style.fontSize}
                            ]}

                    >{this.props.value}</Text>
                </TouchableOpacity>
            );
        }else if(this.props.segmentFlag == oneSegment){     // 只有一个段 指示为选中状态
            return (
                <TouchableOpacity
                    style={[styles.oneCornerBtn, {backgroundColor: this.props.style.selectSegmentColor}]}
                    onPress={this.onSelectClick}
                    disabled={true}
                >
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.selectText,
                            {color:this.props.style.selectTextColor},
                            {fontSize:this.props.style.fontSize}
                            ]}
                    >{this.props.value}</Text>
                </TouchableOpacity>
            );
        }else{          // 中间段
            return (
                <TouchableOpacity
                    style={[
                    this.props.isSelect?styles.centerSelectedBtn:styles.centerNormalBtn,
                    {backgroundColor: this.props.isSelect?this.props.style.selectSegmentColor:this.props.style.unselectSegmentColor}
                    ]}
                    onPress={this.onSelectClick}
                    disabled={this.props.isSelect}
                >
                    <Text
                        numberOfLines={1}
                        style={[
                            this.props.isSelect?styles.selectText:styles.unSelectText,
                            {color:this.props.isSelect?this.props.style.selectTextColor:this.props.style.unSelectTextColor},
                            {fontSize:this.props.style.fontSize}
                            ]}
                    >{this.props.value}</Text>
                    <View style={[styles.divideLine, {backgroundColor: this.props.style.borderColor}]}></View>
                </TouchableOpacity>
            );
        }
    }

    onSelectClick(){
        if(this.props.onSelectClick != null){
            this.props.onSelectClick(this.props.index, this.props.value);
        }
    }
}

// ES6的用法
Segment.defaultProps = {
    value: '',
    index: 0,
    isSelect: false,
    style:{
        borderColor:StaticColor.COLOR14,              // 边框颜色
        selectSegmentColor:StaticColor.COLOR14,       // 选中段的颜色
        unselectSegmentColor:StaticColor.COLOR14,     // 未选中段的颜色
        selectTextColor:StaticColor.COLOR7,          // 选中字体的颜色
        unSelectTextColor: StaticColor.COLOR14,       // 未选中字体的颜色
        fontSize: FontSize.CHARACTER5,                       // 字体的大小
    }
};

const styles = StyleSheet.create({
    warpView:{
        height: 31,
        flexDirection:'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: StaticColor.COLOR14,
        borderRadius: 4,
    },
    oneCornerBtn:{
        height:29,
        width: 76,
        backgroundColor: StaticColor.COLOR14,
        borderRadius: 4,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftSelectedCornerBtn:{
        height:29,
        width: 76,
        backgroundColor: StaticColor.COLOR14,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftNormalCornerBtn:{
        height:29,
        width: 76,
        backgroundColor: StaticColor.COLOR7,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightSelectedCornerBtn:{
        height:29,
        width: 76,
        backgroundColor: StaticColor.COLOR14,
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightNormalCornerBtn:{
        height:29,
        width: 76,
        backgroundColor: StaticColor.COLOR7,
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerSelectedBtn:{
        height:29,
        width: 76,
        backgroundColor: StaticColor.COLOR14,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerNormalBtn:{
        height:29,
        width: 76,
        backgroundColor: StaticColor.COLOR7,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectText:{
        flex:1,
        fontSize: FontSize.CHARACTER5,
        textAlign:'center',
        color: StaticColor.COLOR7
    },
    unSelectText:{
        flex:1,
        fontSize: FontSize.CHARACTER5,
        textAlign:'center',
        color: StaticColor.COLOR14
    },
    divideLine:{
        height:29,
        width: 1,
        backgroundColor:StaticColor.COLOR14,
    }
})