import "./MainPage.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MainDisplay from "../../Components/MainDisplay/MainDisplay";

const MainPage = (props) => {
	return (
		<div className="main-page-background">
			<div className="main-page-container">
				<Sidebar contents={props.contents} />
				<MainDisplay contents={props.contents} />
			</div>
		</div>
	);
};
export default MainPage;
