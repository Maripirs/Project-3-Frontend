import { useEffect, useState } from "react";
import "./ContactsNav.css";

const ContactsNav = (props) => {
	let URL = props.contents.URL;
	let chatsList = props.contents.user.chats;
	let userId = props.contents.user._id;
	let userList = props.contents.userList;
	const [searchInput, setSearchInput] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(null);
	const [chatsDisplay, setChatsDisplay] = useState(null);

	//Creates a new chat and adds it to the respective users
	const createChat = async (chatData) => {
		console.log("creating chat");
		try {
			const response = await fetch(`${URL}chat`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(chatData),
			});
			const newChat = await response.json();
			return await newChat;
		} catch (error) {}
	};

	//Will set the chat to active and pull it up on the main display
	const handleSelectChat = (e) => {
		let id = e.target.closest(".nav-chat").id;
		props.contents.setChatLoaded(false);
		props.contents.setSelectedChat(id);
		props.contents.setMobileView("main");
	};

	//For when we are searching
	//If chat exists it will open it
	//If chat doesn't exists it will create it
	const handleSelectContact = async (e) => {
		let contactId = e.target.closest(".nav-chat").id;
		let foundChat = false;
		for (let i = 0; i < chatsList.length; i++) {
			if (
				chatsList[i].users[0].id === userId ||
				chatsList[i].users[1].id === userId
			) {
				props.contents.setSelectedChat(chatsList[i]);
			}
			setSearchInput("");
			break;
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
				{ userid: userId, name: props.contents.user.username },
			];
			let newChatData = {
				users: usersArray,
			};
			props.contents.setChatLoaded(false);
			let createdChat = await createChat(newChatData);
			console.log("created chat ID", createdChat._id);
			props.contents.setSelectedChat(createdChat._id);
			props.contents.refreshUser(
				props.contents.user._id,
				props.contents.setUser,
				props.contents.URL
			);
			setSearchInput("");
		}
	};

	//freeCodeCamp
	//Using the search bar input states, it filters the list of users to display
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
							<div
								className="contact-image"
								style={{ backgroundImage: `url(${user.image})` }}
							></div>
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

	//function that translates the list of chats of the user into HTML elements
	const getAllChats = () => {
		if (props.contents.user.chats) {
			let allChats = props.contents.user.chats.map((chat, i) => {
				let contact = null;
				//Checks which user in the chat is NOT the current user
				let contactID =
					chat.users[0].userid === props.contents.user._id
						? chat.users[1].userid
						: chat.users[0].userid;
				//looks for the object of the user in the userList
				for (let i = 0; i < userList.length; i++) {
					if (userList[i]._id === contactID) {
						contact = userList[i];
						break;
					}
				}

				return (
					<div
						className={
							"nav-chat " +
							(props.contents.selectedChat
								? props.contents.selectedChat === chat._id
									? "active"
									: ""
								: "")
						}
						id={chat._id}
						key={i}
						onClick={handleSelectChat}
					>
						<div className="contact-image-container">
							<div
								className="contact-image"
								style={{ backgroundImage: `url(${contact.image})` }}
							></div>
						</div>
						<div className="message-preview">
							<div className="name-and-time">
								<h3 className="nav-chat-name">{contact.displayname}</h3>
								<p className="timestamp">
									{props.contents.formatTimestamp(chat.updatedAt, "date")}
								</p>
							</div>
							<p className="text-preview">
								{chat.lastMessage
									? chat.lastMessage.length > 60
										? `${chat.lastMessage.slice(0, 40)} . . .`
										: chat.lastMessage
									: ""}
							</p>
						</div>
					</div>
				);
			});
			return allChats;
		}
	};
	useEffect(() => {
		let allChats = getAllChats();
		setChatsDisplay(allChats);
	}, []);

	useEffect(() => {
		let allChats = getAllChats();
		setChatsDisplay(allChats);
	}, [props.contents.user, props.contents.selectedChat]);

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
			<div className={"contacts-nav"}>
				{searchInput.length > 0 ? <div>{filteredUsers}</div> : chatsDisplay}
			</div>
		</div>
	);
};
export default ContactsNav;
