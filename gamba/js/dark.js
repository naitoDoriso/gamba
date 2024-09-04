function turn(change=false){
	let val = (localStorage.getItem("dark") == "1") ? true : false;

   	if (change) {
		val = !val;
		localStorage.setItem("dark", (val) ? 1 : 0);
	}

    if (!val){
        dark.querySelector("img").src = "img/dark.png";
        document.body.className = document.body.className.replaceAll("dark","body-secondary").replaceAll("text-white","").trim();
		dark.className = dark.className.replaceAll("light", "dark");

		if (header) header.className = header.className.replaceAll("black", "light");
    } else {
        dark.querySelector("img").src = "img/light.png";
        document.body.className = document.body.className.replaceAll("body-secondary","dark")+" text-white";
        dark.className = dark.className.replaceAll("dark", "light");

		if (header) header.className = header.className.replaceAll("light", "black");
    }
}

if (!localStorage.getItem("dark")){
	localStorage.setItem("dark", "1");
} else {
	turn();
}

dark.onclick = () => {
	turn(true);
}
