import "./MainDisplay.css";
import Chat from "./Chat/Chat.js";

const MainDisplay = (props) => {
	// const selectedChat = props.contents.selectedChat;
	const welcomePage = (
		<div className="welcome-page">
			<div className="whatsapp image"></div>
			<h2 className="title">WhatsApp Web</h2>
			<p className="welcome-text">
				{" "}
				Select a chat or find a user to start chatting
			</p>
		</div>
	);
	return (
		<div className="main-display">
			{props.contents.selectedChat ? (
				<Chat contents={props.contents} />
			) : (
				welcomePage
			)}
		</div>
	);
};
export default MainDisplay;
