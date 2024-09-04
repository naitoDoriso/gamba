function make_index(data, id, token){
	let username = data.display_name;
	let imagesrc = data.profile_image_url;

	localStorage.setItem("data", `{"username": "${username}", "image": "${imagesrc}", "id": "${id}", "token": "${token}"}`);
	location.replace("./login.html");
}

if (location.hash != ''){
	let aux = location.hash.split(/&|=/g);
	let data = [];

	for (let i=0; i<aux.length-1; i+=2){
		data[aux[i]] = aux[i+1];
	}

	let out;

	let key = "a37mbwznyogk5b4hy45c5eob62xhwg";
	let tok = data["#access_token"];

	fetch("https://api.twitch.tv/helix/users",
		{
			headers: {
				'Authorization': `Bearer ${tok}`,
				'Client-Id': `${key}`
			}
		})
	.then(res => res.json())
	.then(data => out = data.data[0])
	.then(() => {
		make_index(out, key, tok);
	})
	.catch(err => console.error("Você não está logado!"));
} else if (localStorage.getItem("data") && JSON.parse(localStorage.getItem("data")).id.length == 30) {
	location.replace("./login.html");
} else if (localStorage.getItem("data") && JSON.parse(localStorage.getItem("data")).id.length < 30){
	window.alert("Amabatukan 😳💦");
}
