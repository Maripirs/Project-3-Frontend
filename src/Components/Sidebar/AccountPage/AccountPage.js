import "./AccountPage.css";
import { useEffect, useState } from "react";

const AccountPage = (props) => {
	const URL = props.contents.URL;
	const [editDisplayName, setEditDisplayName] = useState(false);
	const [nameForm, setNameForm] = useState("");
	const [editImage, setEditImage] = useState(false);
	const [imageForm, setImageForm] = useState("");
	const handleGoBack = () => {
		props.setPage("nav");
	};
	const handleEditName = () => {
		setNameForm(
			props.contents.user.displayname.length > 1
				? props.contents.user.displayname
				: props.contents.user.username
		);
		setEditDisplayName(true);
	};
	const handleEditImage = () => {
		setEditImage(true);
	};
	const handleNameSubmit = (e) => {
		e.preventDefault();
		updateUser({ displayname: nameForm });
		setEditDisplayName(false);
	};
	const handleImageSubmit = (e) => {
		e.preventDefault();
		if (imageForm.length > 0) {
			updateUser({ image: imageForm });
		}
		setEditImage(false);
	};

	const handleNameChange = (e) => {
		setNameForm(e.target.value);
	};

	const handleImageChange = (e) => {
		setImageForm(e.target.value);
	};
	const updateUser = async (updates) => {
		try {
			const updatedUser = await fetch(`${URL}user/${props.contents.user._id}`, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updates),
			});
			console.log(updatedUser);
			props.contents.refreshUser(
				props.contents.user._id,
				props.contents.setUser,
				props.contents.URL
			);
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
						onClick={handleEditImage}
					></div>
				</div>
				<div className="account-form-container">
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
							<div className="edit-icon icon" onClick={handleEditName}>
								&#9998;
							</div>
						</div>
					)}
					<p className="form-description">
						This is not your username or pin. This name will be visible to your
						WhatsApp contacts.
					</p>
				</div>
				<div className="account-form-container">
					<p className="field-name">Your profile image</p>
					{editImage ? (
						<>
							<form onSubmit={handleImageSubmit} className="display-name-field">
								<input
									className="user-form"
									placeholder="image URL"
									name="username"
									value={imageForm}
									onChange={handleImageChange}
								/>
								<div className="name-sumbit icon" onClick={handleImageSubmit}>
									✓
								</div>
							</form>
							<p className="form-description">
								You can add a URL to update your Profile Picture.
							</p>
						</>
					) : (
						<div className="display-name-field" onClick={handleEditImage}>
							<p className="name-text">Edit Image</p>
							<div className="edit-icon icon">&#9998;</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default AccountPage;
