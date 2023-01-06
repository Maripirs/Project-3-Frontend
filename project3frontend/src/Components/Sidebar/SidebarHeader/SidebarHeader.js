import "./SidebarHeader.css";

const SidebarHeader = (props) => {
	const refreshFunction = () => {
		props.contents.refreshUser(
			props.contents.user._id,
			props.contents.setUser,
			props.contents.URL
		);
	};
	return (
		<div className="sidebar-header">
			<div className="user-info">
				<div
					className="user-picture"
					style={{ backgroundImage: `url(${props.contents.user.image})` }}
				></div>
				<h3 className="user-name">{props.contents.user.username}</h3>
			</div>
			<div className="refresh" onClick={refreshFunction}>
				{" "}
				refresh{" "}
			</div>
			<div className="settings-button"> &#xFE19;</div>
		</div>
	);
};
export default SidebarHeader;
