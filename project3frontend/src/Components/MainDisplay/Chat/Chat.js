import "./Chat.css";

const Chat = (props) => {
	const testChat = {
		users: ["Test User", "Test Contact"],
		name: "Test Contact",
		messages: [
			{ content: "test message 1", timestamp: "9:34", user: "Test User" },
			{ content: "test message 2", timestamp: "9:40", user: "Test Contact" },
			{ content: "test message 3", timestamp: "9:41", user: "Test Contact" },
			{ content: "test message 4", timestamp: "9:43", user: "Test User" },
			{ content: "test message 5", timestamp: "9:43", user: "Test User" },
			{ content: "test message 6", timestamp: "9:43", user: "Test User" },
			{ content: "test message 7", timestamp: "9:54", user: "Test Contact" },
		],
		group: false,
	};
	console.log(props.contents);
	return (
		<div className="chat-container">
			<div className="chat-header">
				<div className="contact-info">
					<div className="contact-image"></div>
					<h2 className="contact-name">
						{testChat.users[0] === props.contents.userName
							? testChat.users[0]
							: testChat.users[1]}
					</h2>
				</div>
			</div>
			<div className="messages-display">
				<div className="empty-space"></div>
				{testChat.messages.map((message) => {
					return (
						<div
							className={
								"message-display-bar " +
								(message.user === props.contents.userName
									? "outgoing"
									: "incoming")
							}
						>
							<div className="message-container">
								<div className="message-content">{message.content}</div>
								<div className="message-timestamp">{message.timestamp}</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="type-message-bar">
				<input type="text" name="message-input" placeholder="Type a message" />
				<div className="send-button">{">"} </div>
			</div>
		</div>
	);
};
export default Chat;
