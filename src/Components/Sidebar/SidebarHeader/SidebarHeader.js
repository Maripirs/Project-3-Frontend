import "./SidebarHeader.css";

const SidebarHeader = (props) => {
	const refreshFunction = () => {
		props.contents.refreshUser(
			props.contents.user._id,
			props.contents.setUser,
			props.contents.URL
		);
	};
	const handleSettings = () => {
		props.setPage("account");
	};
	return (
		<div className="sidebar-header">
			<div className="user-info">
				<div
					onClick={handleSettings}
					className="user-picture"
					style={{ backgroundImage: `url(${props.contents.user.image})` }}
				></div>
				<h3 className="user-name">{props.contents.user.displayname}</h3>
			</div>
			<div className="settings">
				<div className="refresh" onClick={refreshFunction}>
					&#8635;
				</div>
				<div className="settings-button"> &#xFE19;</div>
			</div>
		</div>
	);
};
export default SidebarHeader;
