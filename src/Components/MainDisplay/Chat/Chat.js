import { useState, useEffect } from "react";
import "./Chat.css";

const Chat = (props) => {
	let URL = props.contents.URL;
	let chatState = props.contents.chatState;
	let setChatState = props.contents.setChatState;
	const [refresh, setRefresh] = useState("0");
	const [typed, setTyped] = useState("");

	useEffect(() => {
		if (props.contents.selectedChat._id) {
			const getChat = async () => {
				try {
					const response = await fetch(
						`${URL}chat/${props.contents.selectedChat._id}`
					);
					let chat = await response.json();
					setChatState(chat);
					console.log("fetched chat", chat);
				} catch (error) {
					console.log(error);
				}
			};
			getChat();
		}
	}, [props.contents.selectedChat, refresh]);

	const handleRefresh = () => {
		if (refresh === "0") {
			setRefresh("1");
		} else {
			setRefresh("0");
		}
	};

	const createMessage = async (messageData) => {
		try {
			const newMessage = await fetch(
				`${URL}chat/${props.contents.selectedChat._id}`,
				{
					method: "put",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(messageData),
				}
			);
			console.log(newMessage);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteChat = async () => {
		try {
			const deletedChat = await fetch(
				`${URL}chat/${props.contents.selectedChat._id}`,
				{
					method: "delete",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			props.contents.refreshUser(
				props.contents.user._id,
				props.contents.setUser,
				props.contents.URL
			);
			props.contents.setSelectedChat(null);
		} catch (error) {
			console.log(error);
		}
	};

	const sendMessage = (e) => {
		e.preventDefault();
		let newMessage = {
			content: typed,
			user: `${props.contents.user._id}`,
		};
		createMessage(newMessage);
		//this should probably be a new fetch - refresh chat
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
								{chatState.users[0].name === props.contents.userName
									? chatState.users[1].name
									: chatState.users[0].name}
							</h2>
						</div>
						<div className="refresh" onClick={handleRefresh}>
							&#8635;
						</div>
						<div className="delete" onClick={deleteChat}>
							x
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
											(message.user === props.contents.user._id
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
					<form className="type-message-bar" onSubmit={sendMessage}>
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
