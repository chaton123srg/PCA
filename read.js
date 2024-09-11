const socket = io('https://5237ddd7-d51b-473e-9341-e34fdaa8d051-00-5jionvjpjf38.kirk.replit.dev:8080');

let last ="";
let isUserAtBottom = false;

window.onload = () => {
	fetch('https://5237ddd7-d51b-473e-9341-e34fdaa8d051-00-5jionvjpjf38.kirk.replit.dev:8080/chat/datas')
		
	.then(response => response.json())
	.then(datas => {
		console.log(datas);
		const chat = sessionStorage.getItem("Chat");
		const bigDiv = document.getElementById("bigDiv");
		isUserAtBottom = (bigDiv.scrollTop + bigDiv.clientHeight) >= (bigDiv.scrollHeight);
		for(doc of datas[chat]){
			last = doc._id;
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
			window.location.href = "#" + last;
		}
	})
}
socket.on('broadcastMessage', (doc) => {
	console.log("New broadcastMessage")
	if (doc["Chat"] == sessionStorage.getItem("Chat")){
		last = doc._id;
		console.log(last)
		const bigDiv = document.getElementById("bigDiv");
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

		if (isUserAtBottom) {
			console.log("bruh")
			bigDiv.scrollTop = bigDiv.scrollHeight;
		}
	}
})