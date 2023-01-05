import "./Sidebar.css";
import SidebarDefault from "./SidebarDefault/SidebarDefault";

const Sidebar = (props) => {
	return (
		<div className="sidebar-container">
			<SidebarDefault contents={props.contents} />
		</div>
	);
};
export default Sidebar;
