import "./Sidebar.css";

import SidebarHeader from "./SidebarHeader/SidebarHeader";
import ContactsNav from "./ContactsNav/ContactsNav";
const Sidebar = (props) => {
	return (
		<div className="sidebar-container">
			<div className="sidebar-default-container">
				<SidebarHeader contents={props.contents} />
				<ContactsNav contents={props.contents} />
			</div>
		</div>
	);
};
export default Sidebar;
