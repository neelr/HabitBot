import React from "react";
import {Text, View} from "react-native";
import {styles} from "../components/Theme";

export default class Help extends React.Component {
	static navigationOptions = {
		title: "Help"
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Help</Text>
			</View>
		);
	}
}