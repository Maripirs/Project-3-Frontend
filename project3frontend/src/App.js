import "./App.css";
import React, { useState } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import AccessPage from "./Pages/AccessPage/AccessPage";
import UserContext from "./UserContext";
import { useContext } from "react";

function App() {
	const [isUserConnected, setIsUserConnected] = useState(false);
	const [userName, setUserName] = useState(null);
	const contents = {
		isUserConnected: isUserConnected,
		setIsUserConnected: setIsUserConnected,
		userName: userName,
		setUserName: setUserName,
	};
	return (
		<>{isUserConnected ? <MainPage /> : <AccessPage contents={contents} />}</>
	);
}

export default App;
