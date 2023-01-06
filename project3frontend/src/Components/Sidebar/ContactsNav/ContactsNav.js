import { useEffect, useState } from "react";
import "./ContactsNav.css";

const ContactsNav = (props) => {
	let URL = props.contents.URL;
	let userName = props.contents.userName;
	let chatsList = props.contents.user.chats;
	let userId = props.contents.user._id;
	let userList = props.contents.userList;
	const [searchInput, setSearchInput] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(null);
	const [chats, setChats] = useState(null);

	const createChat = async (chatData) => {
		try {
			const newChat = await fetch(`${URL}chat`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(chatData),
			});
			console.log(userId);
			props.contents.refreshUser(
				props.contents.user._id,
				props.contents.setUser,
				props.contents.URL
			);
		} catch (error) {}
	};

	const handleSelectChat = (e) => {
		let id = e.target.closest(".nav-chat").id;
		props.contents.setSelectedChat({ id });
	};

	//For when we are searching
	//If chat exists it will open it
	//If chat doesn't exists it will create it
	const handleSelectContact = (e) => {
		let contactId = e.target.closest(".nav-chat").id;
		let foundChat = false;
		for (let i = 0; i < chatsList.length; i++) {
			if (
				chatsList[i].users[0].id === userId ||
				chatsList[i].users[1].id === userId
			) {
				props.contents.setSelectedChat(chatsList[i]._id);
				setSearchInput("");
				break;
			}
		}
		if (!foundChat) {
			let contactName = "";
			for (let i = 0; i < userList.length; i++) {
				if (userList[i]._id === contactId) {
					contactName = userList[i].username;
					break;
				}
			}
			let usersArray = [
				{
					userid: contactId,
					name: contactName,
				},
				{ userid: userId, name: userName },
			];
			console.log(usersArray);
			let newChatData = {
				users: usersArray,
			};
			let createdChat = createChat(newChatData);
			props.contents.setSelectedChat(createdChat._id);
			setSearchInput("");
		}
	};
	//freeCodeCamp
	const searchUsers = (e) => {
		console.log(props.contents.userList);
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
						name={user.username}
						onClick={handleSelectContact}
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
	const getChats = () => {
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
								{chat.users[0].name === userName
									? chat.users[1].name
									: chat.users[0].name}
							</h3>
							<p className="timestamp">{chat.updatedAt}</p>
						</div>
						<p className="text-preview">{chat.lastMessage}</p>
					</div>
				</div>
			);
		});
		return allChats;
	};

	useEffect(() => {
		let allChats = getChats();
		setChats(allChats);
	}, []);

	useEffect(() => {
		console.log("looking for chats");
		let allChats = getChats();
		setChats(allChats);
	}, [props.contents.user]);

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
				{searchInput.length > 0 ? <div>{filteredUsers}</div> : chats}
			</div>
		</div>
	);
};
export default ContactsNav;
