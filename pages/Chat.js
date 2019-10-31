import React from 'react';
import InputToolbar from "../components/Bar";
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {AsyncStorage} from "react-native";
import {colors} from "../components/Theme";
export default class Chat extends React.Component {
	renderInputToolbar(props) {
		return (
			<InputToolbar {...props} />
		)
	}
	renderBubble(props) {
		return (<Bubble {...props}
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
	ID() {
		return '_' + Math.random().toString(36).substr(2, 9);
	}
	static navigationOptions = {
		title: "Chat"
	}
	state = {
		messages: [],
		key: 0,
	}
	async componentWillMount() {
		await AsyncStorage.getItem("logs", (err, res) => {
			if (res) {
				this.setState({
					messages: JSON.parse(res)
				})
			} else {
				this.setState({
					messages: [
						{
							_id: this.ID(),
							text: "Hi! I'm an adiction chatbot to help you throughout the process! Feel free to talk to me and say hi!",
							user: {
								_id: 2,
								name: 'HabitBot',
								avatar: 'https://cdn.glitch.com/6bafb8e5-2b46-482f-9eea-969f482187f4%2Flogo.png?v=1572494705978',
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
		fetch("https://habitbot.glitch.me/comp", {
			headers: {
				'Content-Type': 'application/json',
			},
			method: "POST",
			body: JSON.stringify({
				message: messages[0].text
			}),
		})
			.then((res) => res.json())
			.then(async (res) => {
				console.log(res)
				this.setState(previousState => ({
					messages: GiftedChat.append(previousState.messages, [
						{
							_id: this.ID(),
							text: res.response,
							user: {
								_id: 2,
								name: 'HabitBot',
								avatar: 'https://cdn.glitch.com/6bafb8e5-2b46-482f-9eea-969f482187f4%2Flogo.png?v=1572494705978',
							},
						},
					]),
				}))
				await AsyncStorage.setItem("logs", JSON.stringify(this.state.messages));
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
