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
	const [mobileView, setMobileView] = useState("side");
	const [chatLoaded, setChatLoaded] = useState(false);
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
	//function that will restructure the timestamp string
	const formatTimestamp = (timestamp, scope) => {
		if (scope === "date") {
			let year = timestamp.slice(0, 4);
			let month = timestamp.slice(5, 7);
			let day = timestamp.slice(8, 10);
			return month + "/" + day + "/" + year;
		} else {
			let hour = timestamp.slice(11, 16);
			return hour;
		}
	};
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty("--vh", `${vh}px`);

	// We listen to the resize event
	window.addEventListener("resize", () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	});
	// This object is being passed around between components. it contains most of the States that we need to track through the app
	const contents = {
		//Deployed Backend
		URL: "https://obscure-dawn-52977.herokuapp.com/",
		//Test Backend
		// URL: "http://localhost:4000/",
		//Local Backend fro Github
		// URL: "http://localhost:4005/",
		selectedChat: selectedChat,
		setSelectedChat: setSelectedChat,
		user: user,
		setUser: setUser,
		chatState: chatState,
		setChatState: setChatState,
		chatLoaded: chatLoaded,
		setChatLoaded: setChatLoaded,
		userList: userList,
		setUserList: setUserList,
		mobileView: mobileView,
		setMobileView: setMobileView,
		refreshUser: refreshUser,
		formatTimestamp: formatTimestamp,
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
