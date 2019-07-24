import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from "react-native-elements";
import { GiftedChat } from 'react-native-gifted-chat';
const colors = {
	main: "#8789C0",
	text: "#D2CBCB",
	secondary: "#08090A",
	third: "#F4FAFF"
}
class Home extends React.Component {
	static navigationOptions = {
		title: "Home"
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>AdicBot</Text>
				<TouchableOpacity style={{ width: "75%" }} onPress={() => this.props.navigation.navigate("Chat")}>
					<Text style={styles.button}>Chat</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{ width: "75%" }} onPress={() => this.props.navigation.navigate("Help")}>
					<Text style={styles.button}>Help</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{ width: "75%" }} onPress={() => this.props.navigation.navigate("Settings")}>
					<Text style={styles.button}>Settings</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
class Help extends React.Component {
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
class Chat extends React.Component {
	static navigationOptions = {
		title: "Chat"
	}
	state = {
		messages: [],
	}

	componentWillMount() {
		this.setState({
			messages: [
				{
					text: 'ik you are addicted',
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'AdicBot',
						avatar: 'https://avatars3.githubusercontent.com/u/35831013?s=460&v=4',
					},
				},
			],
		})
	}

	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}))
		botmes = [{
			text:"YO I DONT KNOW WHAT YOU ARE SAYING IDIOT",
			createdAt: new Date(),
			user: {
				_id: 2,
				name: 'AdicBot',
				avatar: 'https://avatars3.githubusercontent.com/u/35831013?s=460&v=4',
			}
		}]
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, botmes),
		}))
		console.log(messages)
	}

	render() {
		return (
			<GiftedChat
				messages={this.state.messages}
				onSend={messages => this.onSend(messages)}
				user={{
					_id: 1,
				}}
			/>
		)
	}
}
class Settings extends React.Component {
	static navigationOptions = {
		title: "Settings"
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Settings</Text>
			</View>
		);
	}
}

const StackNav = createStackNavigator(
	{
		Home: Home,
		Chat: Chat,
		Help: Help,
		Settings: Settings
	},
	{
		initialRouteName: "Home"
	}
)

const styles = StyleSheet.create({
	title: {
		fontSize: 30,
		fontWeight: "bold",
		margin: 25,
		color: colors.third
	},
	container: {
		flex: 1,
		backgroundColor: colors.main,
		alignItems: 'center',
		color: colors.third
	}, button: {
		margin: 15,
		padding: 10,
		backgroundColor: colors.secondary,
		overflow: "hidden",
		borderWidth: 0,
		borderRadius: 12,
		textAlign: "center",
		color: colors.third
	},
	chatcontainer: {
		flex: 1,
		backgroundColor: colors.text,
		color: colors.secondary
	}, sendbut: {
		borderRadius: 50,
		backgroundColor: colors.main,
		justifyContent: "flex-end",
		padding: 8,
		margin: 5
	}, input: {
		height: "50%",
		backgroundColor: colors.third,
		borderRadius: 30,
		width: "70%",
		justifyContent: "flex-start"
	},
	chatboxl: {
		justifyContent: "flex-start",
		backgroundColor: "gray",
		padding: 15,
		borderRadius: 30,
		overflow: "hidden",
		fontSize: 17,
		width: "45%",
		margin: 15
	}
});

const AppContainer = createAppContainer(StackNav);

export default class App extends React.Component {
	render() {
		return <AppContainer />
	}
}