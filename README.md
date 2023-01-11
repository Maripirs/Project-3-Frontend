
# 📱 GA Project 3 - WhatsApp Clone 📱
##### By Maripi Bartosch and Jeddy Cheng
###### [Whatsapp Clone](https://project3-whatsapp.netlify.app/)

## About The Project
Welcome to WhatsApp Clone. This project is a clone of the Meta messaging app, WhatsApp. It includes the basic features of WhatsApp, such as messaging and searching for users to message  <br>
<br>
Unlike WhatsApp, this clone does not rely on phone numbers and contacts. This is an account based messaging app.<br>
<br>
<br>

## Why a Whatsapp Clone? 
Project 3 presented the challenge to Reverse Engenieer a App with the objective of gaining better understanging of core Web Dev concepts.
WhatsApp seemed like a fun excercise to experiment with multiple clients interacting directly through the website.

<br><br>
## Wireframe 
##### Access Page

###### The Access Page, where the user is prompted with a log-in form and with an option to swap to a sign up form in case the user doesn't have an account
<img width="1870" alt="Screen Shot 2023-01-11 at 12 58 01 PM" src="https://user-images.githubusercontent.com/112437477/211916515-827330d1-8800-46f6-8a95-568c1baf3fa7.png">


##### Main Page
###### The Main Page, where the user will land after succesfully loggin in
<img width="1835" alt="Screen Shot 2023-01-11 at 12 21 22 PM" src="https://user-images.githubusercontent.com/112437477/211909674-55712f49-60b4-4a44-a186-90a73409023b.png">

##### Chat Page
###### The Chat Page, when the user has selected a Chat to start messaging
<img width="1871" alt="Screen Shot 2023-01-11 at 12 37 13 PM" src="https://user-images.githubusercontent.com/112437477/211912655-27d588dc-a1c7-4a0a-ba60-4bb1fb100041.png">

##### Account Settings
###### Where the user can update their Display name, Profile Picture and Log out
<img width="1869" alt="Screen Shot 2023-01-11 at 12 42 21 PM" src="https://user-images.githubusercontent.com/112437477/211913553-a0fd5109-3635-4b12-95dd-eae9bec97e8f.png">
<br><br>
## Features

- Send messages to other users through the app
- Refresh the chat to see if you have received any new messages
- Update your display name and profile picture

<br>
<br>

##  Built With
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

<br><br>




## Code Snippets

#### Login and Sign Up forms
###### Allows the User to change the active form

```js
const [activeForm, setActiveForm] = useState("login");
const changeForm = () => {
		if (activeForm === "login" || !activeForm) {
			setActiveForm("signup");
		} else {
			setActiveForm("login");
		}
		setWarning(null);
	}
const signupForm =(
    //...
    <span className="change-form" onClick={changeForm}>
	    Create One!
	  </span>
    //...
  )
  
const signupForm =(
    //...
    <span className="change-form" onClick={changeForm}>
	    Log In!
	  </span>
    //...
  )
   
return (
		<div className="form-container">
			{activeForm === "login" ? loginForm : signupForm}
		</div>
	);
```

#### Create a Message 
###### Collects the information from the User. Creates the message and adds it to the corresponding chat
###### Backend
```js
router.put("/:id", async (req, res) => {
	try {
		createdMessage = await Messages.create(req.body);

		res.json(
			await Chat.findByIdAndUpdate(req.params.id, {
				$push: {
					messages: createdMessage._id,
				},
				lastMessage: req.body.content,
			})
		);
	} catch (error) {
		console.log(error);
	}
});
```
###### Frontend
```js
const createMessage = async (messageData) => {
		try {
			await fetch(`${URL}chat/${props.contents.selectedChat}`, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(messageData),
			});
			props.contents.refreshUser(
				props.contents.user._id,
				props.contents.setUser,
				props.contents.URL
			);
			handleRefresh();
		} catch (error) {
			console.log(error);
		}
	};
  const sendMessage = (e) => {
		e.preventDefault();
		let newMessage = {
			content: typed,
			user: `${props.contents.user._id}`,
		};
		createMessage(newMessage);
		setTyped("");
	};
  	return (
      //...
      <form className="type-message-bar" onSubmit={sendMessage}>
					//...
      </form>
      //...
    )
```



<br><br>

## Whats next? 
I the future, the following features could be implemented<br>


- Make the messages and chats update in Real Time with the use of WebSockets<br>
- Allow the user to change the background of a specific chat<br>
- Implementing Group Chats

<br><br>

## Thank you for reading! 
Contact Us!
<p>
  <a href="https://www.linkedin.com/in/maripirs/" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/gVE0j.png" alt="linkedin"> Maripi's LinkedIn
  </a>
<p>
<p>
  <a href="https://www.linkedin.com/in/jeddy-cheng" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/gVE0j.png" alt="linkedin"> Jeddy's LinkedIn
  </a>
<p>
