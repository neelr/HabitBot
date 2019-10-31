import {StyleSheet} from "react-native"

export const  colors = {
	main: "#4f5257",
	text: "#D2CBCB",
	secondary: "#08090A",
	third: "#F4FAFF"
}

export var styles = StyleSheet.create({
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
	},
	ontainer: {
		flex: 1,
		backgroundColor: colors.main,
		color: colors.third,
		display:"flex"
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
		height: 30,
		backgroundColor: colors.third,
		borderRadius: 30,
		width: "70%",
		padding:10,
		margin:10
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
