/**
 * Created by yzy on 2017/8/16.
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

export default class ItemAvatarTitleButton extends Component {

	static propTypes = {
		avatar: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.object,
			PropTypes.element
		]),
		title: PropTypes.string,
		subtitle: PropTypes.string,
		checked: PropTypes.bool,
		unCheckedText: PropTypes.string,
		checkedText: PropTypes.string,
		onButtonClick: PropTypes.func,
		onItemClick: PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.onClick = this._onClick.bind(this);
		this.onButtonClick = this._onButtonClick.bind(this);
		this.state = {
			checked: props.checked
		}
	}

	render() {
		const content = (
			<View>
				<View style={styles.container}>
					<Image source={this.props.avatar} style={styles.image} />
					<View style={styles.titleContainer}>
						<Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.title}</Text>
						<Text style={styles.subtitle} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.subtitle}</Text>
					</View>
					{this._renderButton()}
				</View>
				<View style={styles.separator} />
			</View>
		);
		if (this.props.onItemClick) {
			return <TouchableHighlight underlayColor={'rgba(0,0,0, 0.15)'} onPress={this.onClick}>{content}</TouchableHighlight>;
		} else {
			return content;
		}
	}

	_onClick = () => {
		this.props.onItemClick && this.props.onItemClick(this.props);
	}

	_renderButton() {
		let buttonText = this.state.checked ? this.props.checkedText : this.props.unCheckedText;
		if (buttonText === null) {
			return null;
		} else if (typeof buttonText === 'string') {
			let textColor = this.state.checked ? { color: StaticColor.COLOR4 } : { color: StaticColor.COLOR3 };
			return (
				<TouchableHighlight
					style={styles.button}
					underlayColor={'rgba(0,0,0, 0.15)'}
					onPress={this.onButtonClick}
				>
					<Text style={[styles.buttonText, textColor]} numberOfLines={1}
						ellipsizeMode='tail'>{buttonText}</Text>
				</TouchableHighlight>
			);
		}
	}

	_onButtonClick = () => {
		this.setState(previousState => {
			return { checked: !previousState.checked };
		});
		if (this.props.onButtonClick) {
			this.props.onButtonClick(this.state.checked);
		}
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
		marginLeft: 70
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 57,
		height: 32,
		borderRadius: 4,
		borderColor: StaticColor.COLOR5,
		borderWidth: 0.5,
		marginLeft:18
	},
	buttonText: {
		fontSize: FontSize.CHARACTER5,
		paddingLeft: 4,
		paddingRight: 4
	}
});