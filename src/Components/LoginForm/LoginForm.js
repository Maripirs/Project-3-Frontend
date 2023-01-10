import "./LoginForm.css";
import { useState, useEffect } from "react";

const LoginForm = (props) => {
	const initialState = {
		username: "",
		password: "",
		confirm: "",
	};

	const [activeForm, setActiveForm] = useState("login");
	const [formContent, setFormContent] = useState(initialState);
	const [allUsers, setAllUsers] = useState([]);
	const [refresh, setRefresh] = useState("0");
	const [warning, setWarning] = useState(null);

	const URL = props.contents.URL;

	// This function is solely changing the value to force a rerender
	const handleRefresh = () => {
		console.log("Refreshing");
		if (refresh === "0") {
			setRefresh("1");
		} else {
			setRefresh("0");
		}
	};

	//Fetch for the selected user, Onlyu ocurs after a succesful login
	const getUser = async (userID) => {
		try {
			const response = await fetch(`${URL}user/${userID}`);
			let user = await response.json();
			props.contents.setUser(user);
			console.log(user);
		} catch (error) {
			console.log(error);
		}
	};

	//Fetching a list of all users in database upon everytime the refresh state gets updated
	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await fetch(`${URL}user`);
				let users = await response.json();

				setAllUsers(users);
				props.contents.setUserList(users);
				console.log(users);
			} catch (error) {
				console.log(error);
			}
		};
		getUsers();
	}, [refresh]);

	//Making a refresh upon loading so GetUsers Runs for the first time
	useEffect(() => {
		handleRefresh();
	}, []);

	//looping through the list of users to see iif the input matches an existing user
	const userExists = (users, username) => {
		console.log(username, users);
		if (users.length > 0) {
			for (let i = 0; i < users.length; i++) {
				if (users[i].username === username) {
					getUser(users[i]._id);
					return true;
				}
			}
		}
	};

	//Post route to create a new user with the data provided by the form
	const createUser = async (userData) => {
		try {
			const newUser = await fetch(`${URL}user`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			}).then(() => {
				handleRefresh();
			});
		} catch (error) {}
	};

	const createTestUsers = () => {
		console.log("creating users");
		let usersArr = [
			{
				username: "troy",
				password: "password",
			},
			{
				username: "sarahrose",
				password: "password",
			},
			{
				username: "ken",
				password: "password",
			},
			{
				username: "austin",
				password: "password",
			},
			{
				username: "barezi",
				password: "password",
			},
			{
				username: "david",
				password: "password",
			},
			{
				username: "jeddy",
				password: "password",
			},
			{
				username: "luigi",
				password: "password",
			},
			{
				username: "megan",
				password: "password",
			},
			{
				username: "tim",
				password: "password",
			},
			{
				username: "tyler",
				password: "password",
			},
			{
				username: "maripi",
				password: "password",
			},
		];
		// for (let i = 0; i < 20; i++) {
		// 	usersArr.push({
		// 		username: `test${i + 1}`,
		// 		password: "password",
		// 		image:
		// 			"https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
		// 	});
		// }
		usersArr.forEach((user) => {
			createUser(user);
		});
	};

	//Will check if the user credentials match something in the database
	const loginSubmit = (e) => {
		e.preventDefault();
		if (userExists(allUsers, formContent.username)) {
		} else {
			setWarning("invalid credentials");
		}
	};

	//Will create a new user and push it to the database
	const signupSubmit = (e) => {
		e.preventDefault();
		let foundUser = false;
		for (let i = 0; i < props.contents.userList.length; i++) {
			if (props.contents.userList[i].username === formContent.username) {
				setWarning("username not available");
				foundUser = true;
				break;
			}
		}
		if (!foundUser) {
			if (formContent.password) {
				createUser({
					username: formContent.username,
					password: formContent.password,
				});
				changeForm();
				e.target.reset();
			} else {
				setWarning("invalid password");
			}
		}
	};

	const handleChange = (e) => {
		setFormContent({ ...formContent, [e.target.name]: e.target.value });
	};

	//Will alternate between the forms being displayed, updating the necessary States
	const changeForm = () => {
		if (activeForm === "login" || !activeForm) {
			setActiveForm("signup");
		} else {
			setActiveForm("login");
		}
		setWarning(null);
	};

	// HTML elements for login form
	const loginForm = (
		<>
			<h2 className="form-name">Login</h2>
			<form className="forms" onSubmit={loginSubmit}>
				<input
					type="text"
					placeholder="username"
					name="username"
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="password"
					name="password"
					onChange={handleChange}
				/>
				<p className="warning">{warning ? warning : ""}</p>
				<input className="submit-button" type="submit" />
				<p>
					Don't have an account?{" "}
					<span className="change-form" onClick={changeForm}>
						Create One!
					</span>
				</p>
			</form>
		</>
	);

	//HTML elements for signup form
	const signupForm = (
		<>
			<h2 className="form-name">Sign up</h2>
			<form className="forms" onSubmit={signupSubmit}>
				<input
					type="text"
					placeholder="username"
					name="username"
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="password"
					name="password"
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="confirm password"
					name="confirm"
					onChange={handleChange}
				/>
				<p className="warning">{warning ? warning : ""}</p>
				<input className="submit-button" type="submit" />
				<p>
					Already have an account?{" "}
					<span className="change-form" onClick={changeForm}>
						Log In!
					</span>
				</p>
			</form>
		</>
	);

	return (
		<div className="form-container">
			<div className="testusers" onClick={createTestUsers}>
				Create Test Users
			</div>
			{activeForm === "login" ? loginForm : signupForm}
		</div>
	);
};
export default LoginForm;
