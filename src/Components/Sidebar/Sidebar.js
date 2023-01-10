import "./Sidebar.css";
import { useState, useEffect } from "react";

import SidebarHeader from "./SidebarHeader/SidebarHeader";
import ContactsNav from "./ContactsNav/ContactsNav";
import AccountPage from "./AccountPage/AccountPage";

const Sidebar = (props) => {
	const [page, setPage] = useState("nav");

	return (
		<div className="sidebar-container">
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
