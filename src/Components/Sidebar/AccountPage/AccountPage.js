import "./AccountPage.css";
import { useEffect, useState } from "react";

const AccountPage = (props) => {
	const URL = props.contents.URL;
	const [editDisplayName, setEditDisplayName] = useState(false);
	const [nameForm, setNameForm] = useState("");
	const handleGoBack = () => {
		props.setPage("nav");
	};
	const handleEdit = () => {
		setNameForm(
			props.contents.user.displayname.length > 1
				? props.contents.user.displayname
				: props.contents.user.username
		);
		setEditDisplayName(true);
	};
	const handleNameSubmit = (e) => {
		e.preventDefault();
		updateDisplayName(nameForm);
		setEditDisplayName(false);
	};

	const handleNameChange = (e) => {
		setNameForm(e.target.value);
	};

	const updateDisplayName = async (newName) => {
		try {
			const updatedUser = await fetch(`${URL}user/${props.contents.user._id}`, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ displayname: `${newName}` }),
			});
			console.log(updatedUser);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="account-page-container">
			<div className="account-header">
				<div className="header-contents">
					<div className="go-back" onClick={handleGoBack}>
						&larr;
					</div>
					<p>Profile</p>
				</div>
			</div>
			<div className="account-info-container">
				<div className="account-image-container">
					<div
						className="account-image"
						style={{ backgroundImage: `url(${props.contents.user.image})` }}
					></div>
				</div>
				<div className="display-name-container">
					<p className="field-name">Your name</p>
					{editDisplayName ? (
						<form onSubmit={handleNameSubmit} className="display-name-field">
							<input
								className="user-form"
								placeholder="display name"
								name="username"
								value={nameForm}
								onChange={handleNameChange}
							/>
							<div className="name-sumbit icon" onClick={handleNameSubmit}>
								✓
							</div>
						</form>
					) : (
						<div className="display-name-field">
							<p className="name-text">
								{props.contents.user.displayname.length > 1
									? props.contents.user.displayname
									: props.contents.user.username}
							</p>
							<div className="edit-icon icon" onClick={handleEdit}>
								&#9998;
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default AccountPage;
