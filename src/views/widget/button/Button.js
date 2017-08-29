/**
 * Created by Administrator on 2017/8/23.
 */
import {
    FontSize,
    StaticColor
} from '../../base';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';


export default class Button extends Component{

    static propTypes = {
        text: React.PropTypes.string,
        enable:React.PropTypes.bool,
        fontTextColor:React.PropTypes.string,
        borderColor:React.PropTypes.string,
        backgroundColor:React.PropTypes.string,//背景颜色
        borderRadius:React.PropTypes.number,//边框圆角半径
        activeOpacity:React.PropTypes.number,//按下时的不透明度
        textPaddingLeft:React.PropTypes.number,
        textPaddingRight: React.PropTypes.number,
        textPaddingTop: React.PropTypes.number,
        textPaddingBottom:React.PropTypes.number,
        disabledborderColor: React.PropTypes.string,
        disabledbackgroudColor: React.PropTypes.string,
        disabledfontTextColor: React.PropTypes.string,
        padding:React.PropTypes.number,
        fontSize: React.PropTypes.number,
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        onclick: React.PropTypes.func
    }


    constructor(props){
        super(props);
    }

    static defaultProps = {
        enable:false,
        fontTextColor:StaticColor.COLOR3,
        borderColor:StaticColor.COLOR5,
        backgroundColor:StaticColor.COLOR7,//背景颜色
        borderRadius:4,//边框圆角半径
        activeOpacity:0.85,//按下时的不透明度
        textPaddingLeft:0,
        textPaddingRight:0,
        textPaddingTop: 0,
        textPaddingBottom:0,
        disabledborderColor: StaticColor.COLOR5,
        disabledbackgroudColor: StaticColor.COLOR7,
        disabledfontTextColor: StaticColor.COLOR5,
        fontSize: FontSize.CHARACTER5,
        padding:0,
        width:58,
        height:32,
    }


    render(){
         return (
         <TouchableOpacity
             activeOpacity={this.props.activeOpacity}
             onPress={this.onClick.bind(this)}>

          <View style={[styles.viewTag,{
             borderColor:this.props.enable?this.props.borderColor:this.props.disabledborderColor,
             backgroundColor:this.props.enable?this.props.backgroundColor:this.props.disabledbackgroudColor,
             borderRadius:this.props.borderRadius,
             width:this.props.width,
             height:this.props.height,
             paddingLeft:this.props.textPaddingLeft,
             paddingRight:this.props.textPaddingRight,
             paddingTop: this.props.textPaddingTop,
             paddingBottom:this.props.textPaddingBottom,
             padding:this.props.padding,

         }]}>
            <Text style={[styles.tagText,{
                color:this.props.enable?this.props.fontTextColor:this.props.disabledfontTextColor,
                fontSize:this.props.fontSize,
            }]}>{this.props.text}</Text>
        </View>
        </TouchableOpacity>);
    }


    onClick(){
        if(this.props.onClick != null){
            this.props.onClick();
        }
    }

}

const styles = StyleSheet.create({
    viewTag: {
        borderWidth: 0.5,
        borderRadius:4,
        borderColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center',
    },


    tagText:{
        fontSize:12,
        textAlign:'center',
        color:'#f43531',
    },

});