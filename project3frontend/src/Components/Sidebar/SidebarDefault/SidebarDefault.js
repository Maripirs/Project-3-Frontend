import "./SidebarDefault.css";
import SidebarHeader from "./SidebarHeader/SidebarHeader";
import ContactsNav from "./ContactsNav/ContactsNav";

const SidebarDefault = () => {
	return (
		<div className="sidebar-default-container">
			<SidebarHeader />
			<ContactsNav />
		</div>
	);
};
export default SidebarDefault;
