import { useEffect, useState } from "react";
import "./ContactsNav.css";

const ContactsNav = (props) => {
	let userName = props.contents.user;
	const [chats, setChats] = useState(null);
	// const generateChats = () => {
	// 	let tempChats = [];
	// 	for (let i = 1; i < 25; i++) {
	// 		tempChats.push({
	// 			name: `UserName ${i}`,
	// 			content: `This is a sample message`,
	// 			timestamp: `Today`,
	// 		});
	// 	}
	// 	setChats(tempChats);
	// };

	const handleSelectChat = (e) => {
		let id = e.target.closest(".nav-chat").id;
		console.log(id);
		props.contents.setSelectedChat({ name: `UserName ${id}` });
	};

	let allChats = props.contents.user.chats.map((chat, i) => {
		return (
			<div
				className={
					"nav-chat " +
					(props.contents.selectedChat
						? props.contents.selectedChat.name === chat.name
							? "active"
							: ""
						: "")
				}
				id={i + 1}
				key={i}
				onClick={handleSelectChat}
			>
				<div className="contact-image-container">
					<div className="contact-image"></div>
				</div>
				<div className="message-preview">
					<div className="name-and-time">
						<h3 className="nav-chat-name">
							{chat.users[0].username === userName
								? userName
								: chat.users[1].username}
						</h3>
						<p className="timestamp">{chat.updatedAt}</p>
					</div>
					<p className="text-preview">{chat.lastMessage}</p>
				</div>
			</div>
		);
	});

	return (
		<div className="contacts-nav-container">
			<div className="search-bar">
				<div className="search-icon">
					<div className="icon">&#9906;</div>
				</div>
				<input type="text" placeholder="Search or start a new chat" />
			</div>
			<div className="contacts-nav">{allChats}</div>
		</div>
	);
};
export default ContactsNav;
