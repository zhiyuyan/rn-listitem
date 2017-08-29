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

export default class ItemAvatarTitleTime extends Component {

	static propTypes = {
		avatar: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.object,
			PropTypes.element
		]),
		title: PropTypes.string,
		subtitle: PropTypes.string,
		time: PropTypes.string,
		count: PropTypes.number,
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
						<Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.title}</Text>
						<Text style={styles.subtitle} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.subtitle}</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.time}>{this.props.time}</Text>
						{
							this.props.count ?
								<View style={styles.countContainer}>
									<Text style={styles.count}>{this.props.count > 99 ? '99+' : this.props.count}</Text>
								</View> : null
						}
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
	infoContainer: {
		flexDirection: 'column',
		marginLeft: 18,
		alignItems: 'flex-end'
	},
	time: {
		color: StaticColor.COLOR4,
		fontSize: FontSize.CHARACTER7,
		marginBottom: 10
	},
	countContainer: {
		backgroundColor: StaticColor.COLOR13,
		borderRadius: 9,
		height: 18,
		paddingLeft: 6,
		paddingRight: 6,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'

	},
	count: {
		color: StaticColor.COLOR7,
		fontSize: FontSize.CHARACTER5
	},
	separator: {
		height: 0.5,
		backgroundColor: StaticColor.COLOR8,
		marginLeft: 70
	}
});