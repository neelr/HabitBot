import React from "react";
import {Text, View} from "react-native";
import {styles} from "../components/Theme";
import { vw } from 'react-native-expo-viewport-units';

export default class Help extends React.Component {
	static navigationOptions = {
		title: "Help"
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Help</Text>
                <Text style={{width:vw(80),color:"white",fontSize:18}}>Hi! This app is to help people go through addictions such as drugs, or even small ones like a TV show! You can talk to the Bot in the Chat screen and can Graph and see how well you are doing in the Graph section! A tip for the Graph, use it for hours of TV or doses of drugs and keep track over time!</Text>
			</View>
		);
	}
}