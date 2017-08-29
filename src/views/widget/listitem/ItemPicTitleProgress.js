/**
 * Created by yzy on 2017/8/17.
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
import ProgressBar from '../ProgressBar';

export default class ItemPicTitleProgres extends Component {

	static propTypes = {
		pic: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.object,
			PropTypes.element
		]),
		title: PropTypes.string,
		subtitle: PropTypes.string,
		onItemClick: PropTypes.func,
		progress: PropTypes.number
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
						<Text style={styles.subtitle} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.subtitle}</Text>
					</View>
					{this._renderProgress()}
				</View>
				<View style={styles.separator} />
			</View>
		);
		if (this.props.clickable || this.props.onItemClick) {
			return <TouchableHighlight underlayColor={StaticColor.COLOR8} onPress={this.onClick}>{content}</TouchableHighlight>;
		} else {
			return content;
		}
	}

	_onClick = () => {
		this.props.onItemClick && this.props.onItemClick(this.props);
	}

	_renderProgress() {
		return <ProgressBar style={{ marginLeft: 18 }} progress={this.props.progress} width={57} height={6} borderWidth={0} borderRadius={3} color={StaticColor.COLOR14} unfilledColor={StaticColor.COLOR11} />;
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
		height: 50
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
	}
});