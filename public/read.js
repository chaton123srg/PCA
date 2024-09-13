const socket = io('https://5237ddd7-d51b-473e-9341-e34fdaa8d051-00-5jionvjpjf38.kirk.replit.dev:8080');

let last ="";

window.onload = () => {
	fetch('https://5237ddd7-d51b-473e-9341-e34fdaa8d051-00-5jionvjpjf38.kirk.replit.dev:8080/chat/datas')
		
	.then(response => response.json())
	.then(datas => {
		const chat = sessionStorage.getItem("Chat");
		const bigDiv = document.getElementById("bigDiv");
		if (datas[chat]){
			for(doc of datas[chat]){
				const DIV = document.createElement("div");
				DIV.id = doc._id;
				DIV.classList.add(doc.Name, "Message");
				bigDiv.appendChild(DIV);
				const User = document.createElement("h5");
				User.id = doc._id + "-User";
				User.classList.add(doc.Name + "-User", "Message");
				User.innerHTML = doc.User;
				DIV.appendChild(User);
				const Message = document.createElement("p");
				Message.id = doc._id + "-Text";
				Message.classList.add(doc.Name + "-Text", "Message");
				Message.innerHTML = doc.Message;
				DIV.appendChild(Message);
				const child = bigDiv.lastElementChild;
				child.scrollIntoView();
			}
		}
		else if(sessionStorage.getItem("Chat")){
			const chat = sessionStorage.getItem("Chat");
			const DIV = document.createElement("div");
			DIV.id = "CHAT_NOT_FOUND";
			DIV.classList.add("ALERT", "Message");
			bigDiv.appendChild(DIV);
			const container = DIV;
			const h5 = document.createElement("h5");
			h5.id = "CHAT_NOT_FOUND h5";
			h5.classList.add("ALERT-h5", "Message");
			h5.innerHTML = "ALERT";
			container.appendChild(h5);
			const p = document.createElement("p");
			p.id = "CHAT_NOT_FOUND p";
			p.classList.add("ALERT-Text", "Message");
			p.innerHTML = "Welcome to " + chat;
			container.appendChild(p);
		}
		else{
			window.location.href = "https://5237ddd7-d51b-473e-9341-e34fdaa8d051-00-5jionvjpjf38.kirk.replit.dev:8080/";
		}
	})
}
socket.on('broadcastMessage', (doc) => {
	let bottom = false
	console.log("New broadcastMessage")
	if (doc["Chat"] == sessionStorage.getItem("Chat")){
		const bigDiv = document.getElementById("bigDiv");
		if ((bigDiv.scrollTop + bigDiv.clientHeight) >= bigDiv.scrollHeight) {
			bottom = true;
		}
		const Client = document.getElementById("Client")
		if (!Client){
			const DIV = document.createElement("div");
			DIV.id = doc._id;
			DIV.classList.add(doc.Name, "Message");
			bigDiv.appendChild(DIV);
			const container = document.getElementById(doc._id);
			const User = document.createElement("h5");
			User.id = doc._id + "User";
			User.classList.add(doc.Name + "User", "Message");
			User.innerHTML = doc.User;
			container.appendChild(User);
			const Message = document.createElement("p");
			Message.id = doc._id + "Text";
			Message.classList.add(doc.Name + "Text", "Message");
			Message.innerHTML = doc.Message;
			container.appendChild(Message);
	
			if (bottom) {
				console.log("bruh");
				DIV.scrollIntoView();
			}
		}
		else{
			Client
		}
	}
})

