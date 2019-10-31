import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from "./pages/Home";
import Graph from "./pages/Graph";
import Help from "./pages/Help";
import Chat from "./pages/Chat";

const StackNav = createStackNavigator(
	{
		Home: Home,
		Chat: Chat,
		Help: Help,
		Graph:Graph
	},
	{
		initialRouteName: "Home"
	}
)

const AppContainer = createAppContainer(StackNav);

export default class App extends React.Component {
	render() {
		return <AppContainer />
	}
}