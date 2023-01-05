import "./SidebarDefault.css";
import SidebarHeader from "./SidebarHeader/SidebarHeader";
import ContactsNav from "./ContactsNav/ContactsNav";

const SidebarDefault = (props) => {
	return (
		<div className="sidebar-default-container">
			<SidebarHeader contents={props.contents} />
			<ContactsNav contents={props.contents} />
		</div>
	);
};
export default SidebarDefault;
