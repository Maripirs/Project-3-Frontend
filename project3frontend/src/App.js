import "./App.css";
import React, { useState } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import AccessPage from "./Pages/AccessPage/AccessPage";
// import UserContext from "./UserContext";
// import { useContext } from "react";

function App() {
	const [isUserConnected, setIsUserConnected] = useState(false);
	const [userName, setUserName] = useState(null);
	const [user, setUser] = useState(null);
	const [selectedChat, setSelectedChat] = useState(null);
	const contents = {
		isUserConnected: isUserConnected,
		setIsUserConnected: setIsUserConnected,
		userName: userName,
		setUserName: setUserName,
		selectedChat: selectedChat,
		setSelectedChat: setSelectedChat,
		user: user,
		setUser: setUser,
	};
	return (
		// <MainPage contents={contents} />
		<>
			{isUserConnected ? (
				<MainPage contents={contents} />
			) : (
				<AccessPage contents={contents} />
			)}
		</>
	);
}

export default App;
