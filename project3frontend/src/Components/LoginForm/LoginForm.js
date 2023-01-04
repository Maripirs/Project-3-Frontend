import "./LoginForm.css";
import { useState, useEffect } from "react";
import UserContext from "../../UserContext";
import { useContext } from "react";

const LoginForm = (props) => {
	const initialState = {
		username: "",
		password: "",
		confirm: "",
	};

	const [activeForm, setActiveForm] = useState("login");
	const [displayForm, setDisplayForm] = useState(null);
	const [formContent, setFormContent] = useState(initialState);

	// const [updateUserConnected] = useContext(UserContext);

	//Will check if the user credentials match something in the database
	const loginSubmit = (e) => {
		e.preventDefault();
		props.contents.setIsUserConnected(true);
		props.contents.setUserName("Maripi");
	};
	//Will create a new user and push it to the database
	const signupSubmit = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		setFormContent({ ...formContent, [e.target.name]: e.target.value });
	};

	//Will alternate between the forms being displayed, updating the necessary States
	const changeForm = () => {
		console.log(activeForm);
		if (activeForm === "login") {
			console.log("active form was login");
			setActiveForm("signup");
			setDisplayForm(signupForm);
		} else {
			console.log("active form was sign up");
			setActiveForm("login");
			setDisplayForm(loginForm);
		}
		setFormContent(initialState);
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
				<input type="submit" />
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
				<input type="submit" />
				<p>
					Already have an account?{" "}
					<span className="change-form" onClick={changeForm}>
						Log In!
					</span>
				</p>
			</form>
		</>
	);

	useEffect(() => {
		setDisplayForm(loginForm);
	}, []);

	return <div className="form-container">{displayForm}</div>;
};
export default LoginForm;
