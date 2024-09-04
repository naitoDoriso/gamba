if (!localStorage.getItem("data")){
	location.replace("../");
}

let data = JSON.parse(localStorage.getItem("data"));

icon.src = data.image;
nome.innerText = data.username;
document.title += " "+data.username;

nome.onmouseover = () => {
	nome.innerText = "Desconectar";
}

nome.onclick = () => {
	fetch("https://id.twitch.tv/oauth2/revoke", {
		method: "POST",
		headers: {"Content-Type": "application/x-www-form-urlencoded"},
		body: new URLSearchParams({"client_id": data.id, "token": data.token})
	})
	.then(res => {
		localStorage.removeItem("data");
		window.alert("Desconectado!")
		location.reload();
	});
}

nome.onmouseout = () => {
	nome.innerText = data.username;
}
