import React from 'react';
import {AsyncStorage, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from "react-native-elements";
import InputToolbar from "./components/Bar";
import { GiftedChat ,Bubble} from 'react-native-gifted-chat';
const colors = {
	main: "#4f5257",
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
	renderInputToolbar (props) {
		return(
			<InputToolbar {...props}/>
		)
	}
	renderBubble(props) { 
		return ( <Bubble {...props} 
		wrapperStyle={{
			left: {
			  backgroundColor: 'white',
			},
			right: {
			  backgroundColor: '#121213'
			}
		  }} />
		)
	}
	ID () {
		return '_' + Math.random().toString(36).substr(2, 9);
	}
	static navigationOptions = {
		title: "Chat"
	}
	state = {
		messages: [],
		key:0,
	}
	async componentWillMount() {
		await AsyncStorage.getItem("logs",(err,res)=> {
			if (res) {
				this.setState({
					messages: JSON.parse(res)
				})
			} else {
				this.setState({
					messages: [
						{
							_id:this.ID(),
							text: 'Hi! Im an Adiction Bot!',
							user: {
								_id: 2,
								name: 'AdicBot',
								avatar: 'http://michaelkonik.com/wp-content/uploads/2010/11/no20drugs1.jpg',
							},
						},
					],
				})
			}
		})
	}

	onSend(messages = []) {
		console.log(messages);
		messages[0].createdAt = null;
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}))
		fetch("https://adicbot.glitch.me/comp",{
			headers: {
				'Content-Type': 'application/json',
			  },
			method:"POST",
			body: JSON.stringify({
				message:messages[0].text
			  }),
		})
			.then((res)=>res.json())
			.then(async (res)=> {
				console.log(res)
				this.setState(previousState => ({
					messages: GiftedChat.append(previousState.messages, [
						{
							_id:this.ID(),
							text: res.response,
							user: {
								_id: 2,
								name: 'AdicBot',
								avatar: 'http://michaelkonik.com/wp-content/uploads/2010/11/no20drugs1.jpg',
							},
						},
					]),
				}))
				await AsyncStorage.setItem("logs",JSON.stringify(this.state.messages));
			})
	}
	render() {
		return (
			<GiftedChat
				messages={this.state.messages}
				onSend={messages => this.onSend(messages)}
				user={{
					_id: 1,
				}}
				renderBubble={this.renderBubble.bind(this.renderBubble)}
				listViewProps={{
					style: {
					  backgroundColor: colors.main,
					},
				  }}
				  renderInputToolbar={this.renderInputToolbar}
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
		backgroundColor: "transparent",
		borderColor:"white",
		overflow: "hidden",
		borderWidth: 2,
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