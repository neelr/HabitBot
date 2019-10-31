import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import {styles} from "../components/Theme"

export default class Home extends React.Component {
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
                <TouchableOpacity style={{ width: "75%" }} onPress={() => this.props.navigation.navigate("Graph")}>
                    <Text style={styles.button}>Adic Graph</Text>
                </TouchableOpacity>
            </View>
        );
    }
}