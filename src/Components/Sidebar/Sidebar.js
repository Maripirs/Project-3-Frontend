import "./Sidebar.css";
import { useState, useEffect } from "react";

import SidebarHeader from "./SidebarHeader/SidebarHeader";
import ContactsNav from "./ContactsNav/ContactsNav";
import AccountPage from "./AccountPage/AccountPage";

const Sidebar = (props) => {
	// State that keeps track of where the User is within the sidebar
	const [page, setPage] = useState("nav");

	return (
		<div
			className={
				"sidebar-container " +
				//for responsive design. sidebar will not display if the user is currently on Main Display
				(props.contents.mobileView === "side"
					? "mobile-active"
					: "mobile-inactive")
			}
		>
			<div className="sidebar-default-container">
				{page === "nav" ? (
					<>
						<SidebarHeader contents={props.contents} setPage={setPage} />
						<ContactsNav contents={props.contents} />
					</>
				) : (
					<AccountPage contents={props.contents} setPage={setPage} />
				)}
			</div>
		</div>
	);
};

export default Sidebar;
