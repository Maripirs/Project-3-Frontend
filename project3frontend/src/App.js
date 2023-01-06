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
			console.log(`${URL}user/${userID}`);
			const response = await fetch(`${URL}user/${userID}`);
			let user = await response.json();
			console.log(user);
			setUserFunction(user);
		} catch (error) {
			console.log(error);
		}
	};
	const contents = {
		URL: "http://localhost:4000/",
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
	return (
		// <MainPage contents={contents} />
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
