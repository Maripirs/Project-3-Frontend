import { useState, useEffect } from "react";
import "./Chat.css";

const Chat = (props) => {
	let user = props.contents.userName;
	let contact = props.contents.selectedChat.name;
	let [chatState, setChatState] = useState(null);
	let [typed, setTyped] = useState("");
	const testChat = {
		users: ["Test User", `${contact}`],
		name: "Test Contact",
		messages: [
			{ content: `test message 1`, timestamp: "9:34", user: "Test User" },
			{
				content: `test message 2 coming from ${contact}`,
				timestamp: "9:40",
				user: `${contact}`,
			},
			{
				content: `test message 3 coming from ${contact}`,
				timestamp: "9:41",
				user: `${contact}`,
			},
			{ content: `test message 4`, timestamp: "9:43", user: "Test User" },
			{ content: `test message 5`, timestamp: "9:43", user: "Test User" },
			{ content: `test message 6`, timestamp: "9:43", user: "Test User" },
			{
				content: `test message 7 coming from ${contact}`,
				timestamp: "9:54",
				user: `${contact}`,
			},
		],
		group: false,
	};

	useEffect(() => {
		setChatState(testChat);
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		let newMessage = {
			content: typed,
			timestamp: "timestamp",
			user: "Test User",
		};
		let newMessages = [...chatState.messages, newMessage];
		let newChatState = { ...chatState, messages: newMessages };
		setChatState(newChatState);
		setTyped("");
	};

	const handleChange = (e) => {
		setTyped(e.target.value);
	};
	return (
		<>
			{chatState ? (
				<div className="chat-container">
					<div className="chat-header">
						<div className="contact-info">
							<div className="contact-image"></div>
							<h2 className="contact-name">
								{chatState.users[0] === props.contents.userName
									? chatState.users[1]
									: chatState.users[0]}
							</h2>
						</div>
					</div>
					<div className="messages-display">
						<div className="inner-message-display">
							<div className="empty-space"></div>
							{chatState.messages.map((message, i) => {
								return (
									<div
										className={
											"message-display-bar " +
											(message.user === props.contents.userName
												? "outgoing"
												: "incoming")
										}
										key={i}
									>
										<div className="message-container">
											<div className="message-content">{message.content}</div>
											<div className="message-timestamp">
												{message.timestamp}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<form className="type-message-bar">
						<input
							value={typed}
							type="text"
							name="message-input"
							placeholder="Type a message"
							onChange={handleChange}
						/>
						<div type="submit" className="send-button" onClick={sendMessage}>
							{">"}{" "}
						</div>
					</form>
				</div>
			) : (
				<>"loading"</>
			)}
		</>
	);
};
export default Chat;
