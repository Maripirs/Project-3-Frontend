import { useState, useEffect } from "react";
import "./Chat.css";

const Chat = (props) => {
	let URL = props.contents.URL;
	let chatState = props.contents.chatState;
	let setChatState = props.contents.setChatState;
	let userList = props.contents.userList;
	const [refresh, setRefresh] = useState("0");
	const [typed, setTyped] = useState("");
	const [contact, setContact] = useState("");
	const [time, setTime] = useState(Date.now());

	useEffect(() => {
		if (props.contents.selectedChat) {
			//fetch the selected chat
			const getChat = async () => {
				try {
					const response = await fetch(
						`${URL}chat/${props.contents.selectedChat}`
					);
					let chat = await response.json();
					setChatState(chat);
					console.log("fetched chat", chat);
					let contact = null;
					//Checks which user in the chat is NOT the current user
					let contactID =
						chat.users[0].userid === props.contents.user._id
							? chat.users[1].userid
							: chat.users[0].userid;
					//looks for the object of the user in the userList
					for (let i = 0; i < userList.length; i++) {
						if (userList[i]._id === contactID) {
							setContact(userList[i]);
							break;
						}
					}
					props.contents.setChatLoaded(true);
					console.log(contact);
				} catch (error) {
					console.log(error);
				}
			};
			getChat();
		}
	}, [props.contents.selectedChat, refresh, props.contents.chatLoaded]);

	// function to force page reloads
	const handleRefresh = () => {
		console.log("refresh");
		if (refresh === "0") {
			setRefresh("1");
		} else {
			setRefresh("0");
		}
	};

	//Only for mobile, used to change the active view to the sidebar
	const backToNav = () => {
		props.contents.setMobileView("side");
	};

	//fetches a put route to add a message to the chat
	const createMessage = async (messageData) => {
		try {
			const newMessage = await fetch(
				`${URL}chat/${props.contents.selectedChat}`,
				{
					method: "put",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(messageData),
				}
			);
			props.contents.refreshUser(
				props.contents.user._id,
				props.contents.setUser,
				props.contents.URL
			);
			handleRefresh();
			console.log(newMessage);
		} catch (error) {
			console.log(error);
		}
	};

	//fetches a delete route for a specific chat and modifies the users to remove the reference
	const deleteChat = async () => {
		let chatUsers = [];
		chatUsers.push(props.contents.chatState.users[0].userid);
		chatUsers.push(props.contents.chatState.users[1].userid);
		try {
			const deletedChat = await fetch(
				`${URL}chat/${props.contents.selectedChat}`,
				{
					method: "delete",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(chatUsers),
				}
			);
			console.log(deletedChat);
			console.log("hi");
			props.contents.refreshUser(
				props.contents.user._id,
				props.contents.setUser,
				props.contents.URL
			);
			props.contents.setSelectedChat(null);
			props.contents.setMobileView("side");
		} catch (error) {
			console.log(error);
		}
	};

	//event handler for new message
	const sendMessage = (e) => {
		e.preventDefault();
		let newMessage = {
			content: typed,
			user: `${props.contents.user._id}`,
		};
		createMessage(newMessage);
		setTyped("");
	};

	const handleChange = (e) => {
		setTyped(e.target.value);
	};

	return (
		<>
			{/* if the chat fetch is ready. it renders a normal chat window */}
			{props.contents.chatLoaded && chatState ? (
				<div className="chat-container">
					<div className="chat-header">
						<div className="contact-info">
							<div className="mobile-only icon back-to-nav" onClick={backToNav}>
								{" "}
								&#60;
							</div>
							<div
								className="contact-image-chat"
								style={{ backgroundImage: `url(${contact.image})` }}
							></div>
							<h2 className="contact-name">{contact.displayname}</h2>
						</div>
						<div className="settings">
							<div className="refresh icon" onClick={handleRefresh}>
								&#8635;
							</div>
							<div className="delete icon" onClick={deleteChat}>
								x
							</div>
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
												{props.contents.formatTimestamp(
													message.createdAt,
													"time"
												)}
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
							className="message-field"
						/>
						<div type="submit" className="send-button" onClick={sendMessage}>
							{">"}{" "}
						</div>
					</form>
				</div>
			) : (
				// if the chat is not ready, display loading screen
				<>
					<div className="chat-container">
						<div className="chat-header ">
							{/* mobile only. Gives an exit from the chat menu */}
							<div className="mobile-only icon back-to-nav" onClick={backToNav}>
								{" "}
								&#60;
							</div>
							<h2 className="loading">"Loading..."</h2>
						</div>
						<div className="messages-display"></div>
						<div className="type-message-bar"></div>
					</div>
				</>
			)}
		</>
	);
};
export default Chat;
