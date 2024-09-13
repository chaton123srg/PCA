let User = "";
let Chat = "";
let Message = "";

function handleForm(event) {
  event.preventDefault();
	const User = document.getElementById('username').value;
  let Name = FBI(User);
	if (!Name){
		Name = "User";
	}
  Chat = document.getElementById('chatroom').value;
	Chat = Chat.charAt(0).toUpperCase() + Chat.slice(1);
	while (Chat.endsWith(" ")){
		Chat = Chat.slice(0, Chat.length)
	}
	if (!Chat.endsWith("Room") && !Chat.endsWith("room")){
		Chat = Chat + " Room"
	}
	else if(Chat.endsWith("room")){
		Chat = Chat.slice(0, Chat.length - 4)
		Chat = Chat + " Room"
	}
	
  sessionStorage.setItem("User", User);
  sessionStorage.setItem("Chat", Chat);
	sessionStorage.setItem("Name", Name);
	window.location.href = '/chat';
}
async function handleForm2(event){
  event.preventDefault();
  Message = document.getElementById('message').value;
  document.getElementById('message').value = "";
  User = sessionStorage.getItem("User");
	Name = sessionStorage.getItem("Name");
  Chat = sessionStorage.getItem("Chat");
	if (Chat && User && Name){
		const bigDiv = document.getElementById("bigDiv")
	  var data = {User, Name, Chat, Message}
	  try {
	    const response = await fetch('/chat', {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	      },
	      body: JSON.stringify(data),
	    });
	    if (response.ok) {
	      console.log('Data successfully sent to the server: ', data);
	    }
	    else {
	      console.error('Error posting data:', response.statusText);
	    }
	  }
		catch (error) {
			console.error('Request failed:', error);
		}
		const DIV = document.createElement("div");
		DIV.id = "Client";
		DIV.classList.add(doc.Name, "Message");
		bigDiv.appendChild(DIV);
		const User = document.createElement("h5");
		User.id = "Client" + "-User";
		User.classList.add(doc.Name + "-User", "Message");
		User.innerHTML = doc.User;
		DIV.appendChild(User);
		const Message = document.createElement("p");
		Message.id = "Client" + "-Text";
		Message.classList.add(doc.Name + "-Text", "Message");
		Message.innerHTML = doc.Message;
		DIV.appendChild(Message);
		const child = bigDiv.lastElementChild;
		child.scrollIntoView()
	}
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', handleForm);
  }
  else if (document.getElementById("sender")){
    document.getElementById("sender").addEventListener("submit", handleForm2)
  }
});

function FBI(username){
	const lower = [...'abcdefghijklmnopqrstuvwxyz'];
	const upper = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
	const numbers = [..."0123456789"];
	const allowedChars = [...lower, ...upper, ...numbers];
	
	let name = "";
	for (let i in username) {
		if (allowedChars.includes(username[i])) {
			name = name + username[i];
		}
	}
	for (let num of numbers){
		if (name.startsWith(num)){
			name = name.slice(1);
			break
		}
	}
	return name;
}
function Background() {
  const bgFile = document.getElementById("bgChoice");
	const accept = ["jpg","png", "svg", "gif"]
  for (accept in bgFile) {
		document.body.style.backgroundImage = bgFile;
	}
}




if (document.getElementById('bgChoice')){
	document.getElementById('bgChoice').addEventListener('change', function(event) {
		const file = event.target.files[0]; // Get the selected file
		if (file) {
			const reader = new FileReader();
			reader.onload = function(e) {
				document.body.style.backgroundImage = `url(${e.target.result})`;
			};
			reader.readAsDataURL(file);
		}
	});
}