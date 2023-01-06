import "./SidebarHeader.css";

const SidebarHeader = (props) => {
	return (
		<div className="sidebar-header">
			<div className="user-info">
				<div
					className="user-picture"
					style={{ backgroundImage: `url(${props.contents.user.image})` }}
				></div>
				<h3 className="user-name">{props.contents.userName}</h3>
			</div>
			<div className="settings-button"> &#xFE19;</div>
		</div>
	);
};
export default SidebarHeader;
