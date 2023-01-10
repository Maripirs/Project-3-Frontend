import "./App.css";
import React, { useState } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import AccessPage from "./Pages/AccessPage/AccessPage";
// import UserContext from "./UserContext";
// import { useContext } from "react";

function App() {
	const [userList, setUserList] = useState(null);
	const [user, setUser] = useState(null);
	const [selectedChat, setSelectedChat] = useState(null);
	const [chatState, setChatState] = useState(null);

	//Fetching the active user to see if chats have changed (preview chat, not the detailed one)
	const refreshUser = async (userID, setUserFunction, URL) => {
		console.log("refreshing user");
		try {
			const response = await fetch(`${URL}user/${userID}`);
			let user = await response.json();
			setUserFunction(user);
		} catch (error) {
			console.log(error);
		}
	};

	// This object is being passed around between components. it contains most of the States that we need to track through the app
	const contents = {
		//Deployed Backend
		// URL: "https://obscure-dawn-52977.herokuapp.com/",
		//Test Backend
		// URL: "http://localhost:4000/",
		//Local Backend fro Github
		URL: "http://localhost:4005/",
		selectedChat: selectedChat,
		setSelectedChat: setSelectedChat,
		user: user,
		setUser: setUser,
		chatState: chatState,
		setChatState: setChatState,
		userList: userList,
		setUserList: setUserList,
		refreshUser: refreshUser,
	};

	//If user State hasn't been defined, Access page will render, otherwise it will go to the main Page
	return (
		<>
			{user ? (
				<MainPage contents={contents} />
			) : (
				<AccessPage contents={contents} />
			)}
		</>
	);
}

export default App;
