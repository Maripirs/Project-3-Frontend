import "./AccessPage.css";
import LoginForm from "../../Components/LoginForm/LoginForm";

const AccessPage = (props) => {
	return (
		<div className="AccessPage">
			<div className="access-header">
				<div className="page-title">
					<div className="whatsapp-logo"></div>
					<h3 className="title-text">WHATSAPP WEB</h3>
				</div>
			</div>
			<div className="access-body"></div>
			<div className="access-overlay">
				<LoginForm contents={props.contents} />
			</div>
		</div>
	);
};
export default AccessPage;
