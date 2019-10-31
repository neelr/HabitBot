import React from 'react';
import { Grid, LineChart, YAxis } from 'react-native-svg-charts';
import { Text, View, ScrollView, TextInput, KeyboardAvoidingView, Keyboard, AsyncStorage, TouchableOpacity } from "react-native";
import {styles,colors} from "../components/Theme"

export default class Graph extends React.Component {
	state = {
		data: [],
		text: ""
	}
	static navigationOptions = {
		title: "AdicGraph"
	}
	render() {
		return (
			<KeyboardAvoidingView style={styles.ontainer}>
				<Text style={styles.title}>Addiction Levels</Text>
				<ScrollView contentContainerStyle={{ display: "flex", margin: 10, alignItems: "center" }}>
					<Text style={{ color: colors.text, margin: 3 }}>Please enter your adiction level (relative)</Text>
					<TextInput returnKeyType='done' enablesReturnKeyAutomatically={true} onSubmitEditing={() => this.onClick()} style={{ margin: "auto" }} value={this.state.text} keyboardType="numeric" onChangeText={(text) => this.setState({ text: text })} placeholder="Enter a number" editable style={styles.input}></TextInput>
					<TouchableOpacity onPress={() => this.reset()}>
						<Text style={styles.button}>Reset</Text>
					</TouchableOpacity>
				</ScrollView>
				<View style={{ height: 200, padding: 5, flexDirection: 'row' }}>
					<YAxis
						data={this.state.data}

						contentInset={{ top: 20, bottom: 20 }}
						svg={{ fontSize: 10, fill: 'white' }}
						numberOfTicks={5}
					/>
					<View style={{ flex: 1, marginLeft: 10 }}>
						<LineChart
							style={{ flex: 1 }}
							data={this.state.data}
							svg={{ stroke: 'rgb(134, 65, 244)' }}
							contentInset={{ top: 20, bottom: 20 }}
						>
							<Grid />
						</LineChart>
					</View>
				</View>
			</KeyboardAvoidingView>
		);
	}
	onClick() {
		if (!isNaN(this.state.text)) {
			var buff = this.state.data;
			buff.push(parseInt(this.state.text));
			this.setState({ data: buff });
			AsyncStorage.setItem("data", JSON.stringify(this.state.data));
		}
		this.setState({ text: "" })
		Keyboard.dismiss();
	}
	reset() {
		this.setState({ data: [] })
		AsyncStorage.setItem("data", JSON.stringify([]));
	}
	async componentWillMount() {
		var dat = JSON.parse(await AsyncStorage.getItem("data"));
		if (dat) {
			this.setState({ data: dat });
		} else {
			this.setState({ data: [] });
		}
	}
}