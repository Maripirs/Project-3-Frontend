import "./SidebarHeader.css";

const SidebarHeader = () => {
	return (
		<div className="sidebar-header">
			<div className="user-info">
				<div className="user-picture"></div>
				<h3 className="user-name">Test User</h3>
			</div>
			<div className="settings-button"> &#xFE19;</div>
		</div>
	);
};
export default SidebarHeader;
