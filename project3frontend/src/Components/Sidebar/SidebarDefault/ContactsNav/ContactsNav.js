import { useEffect, useState } from "react";
import "./ContactsNav.css";

const ContactsNav = (props) => {
	let userName = props.contents.user;
	const [searchInput, setSearchInput] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(null);
	const [chats, setChats] = useState(null);

	const handleSelectChat = (e) => {
		let id = e.target.closest(".nav-chat").id;
		props.contents.setSelectedChat({ id });
	};
	//freeCodeCamp
	const searchUsers = (e) => {
		setSearchInput(e.target.value);
		let newUsers = props.contents.userList.filter((user) => {
			return Object.values(user)
				.join("")
				.toLowerCase()
				.includes(searchInput.toLowerCase());
		});
		if (searchInput !== "") {
			let searchResults = newUsers.map((user, i) => {
				return (
					<div
						className="nav-chat "
						id={user._id}
						key={i}
						onClick={handleSelectChat}
					>
						<div className="contact-image-container">
							<div className="contact-image"></div>
						</div>
						<div className="message-preview">
							<div className="name-and-time">
								<h3 className="nav-chat-name">{user.username}</h3>
							</div>
						</div>
					</div>
				);
			});
			setFilteredUsers(searchResults);
		}
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
				id={chat._id}
				key={i}
				onClick={handleSelectChat}
			>
				<div className="contact-image-container">
					<div className="contact-image"></div>
				</div>
				<div className="message-preview">
					<div className="name-and-time">
						<h3 className="nav-chat-name">
							{chat.users[0].name === userName ? userName : chat.users[1].name}
						</h3>
						<p className="timestamp">{chat.updatedAt}</p>
					</div>
					<p className="text-preview">{chat.lastMessage}</p>
				</div>
			</div>
		);
	});

	useEffect(() => {
		setChats(allChats);
	}, []);

	return (
		<div className="contacts-nav-container">
			<div className="search-bar">
				<div className="search-icon">
					<div className="icon">&#9906;</div>
				</div>
				<input
					type="text"
					placeholder="Search or start a new chat"
					onChange={searchUsers}
				/>
			</div>
			<div className="contacts-nav">
				{searchInput.length > 0 ? filteredUsers : chats}
			</div>
		</div>
	);
};
export default ContactsNav;
