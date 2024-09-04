function make_timer(str, win=false){
	if (win){
		info.className = "alert alert-success";
		info.innerHTML = str;
		return 1;
	}

	let tod = new Date( new Date().valueOf()+(24*60*60*1000) );
	window.tom = new Date
	(
		((tod.getFullYear() > 9) ? tod.getFullYear() : '0'+tod.getFullYear())+'-'+
		((tod.getMonth()+1 > 9) ? tod.getMonth()+1 : '0'+(tod.getMonth()+1))+'-'+
		((tod.getDate() > 9) ? tod.getDate() : '0'+tod.getDate())+
		"T00:00:00"
	).valueOf();

	info.className = "alert alert-danger";
	info.innerHTML = str;

	let once = true;
	window.tim = setInterval(() => {
		if (once) {
			info.innerHTML += " Tente novamente em <span id='timer'>...</span>.";
			once = false;
		}

		let fs = window.tom-new Date().valueOf();
		let h = fs/(60*60*1000);
		let m = (h%1)*60;
		let s = (m%1)*60;

		if (h >= 0 && m >= 0 && s >= 0){
			h = Math.round(h); m = Math.round(m); s = Math.round(s);

			h = (h > 9) ? h : '0'+h;
			m = (m > 9) ? m : '0'+m;
			s = (s > 9) ? s : '0'+s;

			timer.innerText = `${h}:${m}:${s}`;
		} else {
			timer.innerText = "00:00:00";
			clearInterval(window.tim);
		}
	}, 1000);
}

let perc = [-1, 100, 88.8, 77.7, 66.6, 55.5, 44.4, 33.3, 22.2, 11.1, 0];

function intervalo(i, k, rand, wheels, t, voltas, print=false) {
    let rep = voltas*2-1 + 2*(3*i);

    let maxrep = voltas*2-1 + 12;
    let meiavolta = t/(maxrep*1000);
	let tanim = t/400;
    let tcomp = 1000*meiavolta;
    let act = 5;

    wheels[i].style.transition = `object-position ${meiavolta}s linear`;
    wheels[i].style.objectPosition = `0% ${perc[10]}%`;

    if (rand[i] < 10) voltas--;

	let int = setInterval(() => {
        if (k >= rep) {
            wheels[i].setAttribute("role", rand[i]);

            if (act > rand[i]){
                wheels[i].style.objectPosition = `0% ${perc[10]}%`; // act -> 10

                setTimeout(()=>{
                    wheels[i].style.transition = "unset";
                    wheels[i].style.objectPosition = `0% ${perc[1]}%`; // 10 -- 1

                    setTimeout(()=>{
                        wheels[i].style.transition = `object-position ${meiavolta}s linear`;
                        wheels[i].style.objectPosition = `0% ${perc[rand[i]]}%`; // 1->rand[i]
                    }, tanim);
                }, tanim);
            } else wheels[i].style.objectPosition = `0% ${perc[rand[i]]}%`;

            act = rand[i];

			if (print) {
				if (rand[0] == rand[1] && rand[0] == rand[2] && rand[0] == 5){
					info.className = "alert alert-success";
					info.innerHTML = "Parabéns, você ganhou! Mande o print no <a href='https://feridinha.com'>Feridinha.</a>";
				} else {
					make_timer("Você perdeu!");
				}
			}

            clearInterval(int);
        } else {
            if (k%2 == 1) {
            	act = 10;
            	wheels[i].style.objectPosition = `0% ${perc[10]}%`; // 5->10
            } else {
            	act = 5;
                wheels[i].style.transition = "unset";
                wheels[i].style.objectPosition = `0% ${perc[1]}%`; // 10 -- 1

                setTimeout(()=>{
                    wheels[i].style.transition = `object-position ${meiavolta}s linear`;
                    wheels[i].style.objectPosition = `0% ${perc[5]}%`; // 1->5
                }, tanim);
            }
        }

        k++;
    }, tcomp);

    return 1;
}

function roleta(rand){
	let wheels = [...document.querySelectorAll(".gimg")];
	let duracao = 10000;
	let voltas = (duracao)/1000;

	// primeira
	intervalo(0, 0, rand, wheels, duracao, voltas);

	// segunda
	intervalo(1, 0, rand, wheels, duracao, voltas);

	// terceira
	intervalo(2, 0, rand, wheels, duracao, voltas, true);
}

function action(data, key){
	let now = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();

	let url = `https://eweymwrodfxsmgqbfpyn.supabase.co/rest/v1/users?username=eq.${data.login}&data=eq.${now}&select=*`;
	let rand = [];

	fetch(url, {
		headers:
		{
			"apikey": key,
		    "Authorization": `Bearer ${key}`
		}
	})
	.then(res => res.json())
	.then(data => {
		data = data[0];
		rand[0] = data["rand1"];
		rand[1] = data["rand2"];
		rand[2] = data["rand3"];

		roleta(rand);
	})
	.catch(err => console.error(err));
}

function config_gamba(data, key){
	let now = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();

    let url = `https://eweymwrodfxsmgqbfpyn.supabase.co/rest/v1/users?username=eq.${data.login}&data=eq.${now}&select=*`;

    fetch(url, {
        headers:
        {
            "apikey": key,
            "Authorization": `Bearer ${key}`
        }
    })
    .then(res => res.json())
    .then(data => {
        data = data[0];
        gamba_1.setAttribute("role", data["rand1"]);
        gamba_1.style.objectPosition = `0% ${perc[data["rand1"]]}%`;

        gamba_2.setAttribute("role", data["rand2"]);
        gamba_2.style.objectPosition = `0% ${perc[data["rand2"]]}%`;

        gamba_3.setAttribute("role", data["rand3"]);
        gamba_3.style.objectPosition = `0% ${perc[data["rand3"]]}%`;

		if (gamba_1.getAttribute("role") == gamba_2.getAttribute("role") && gamba_1.getAttribute("role") == gamba_3.getAttribute("role") && gamba_1.getAttribute("role") == "5"){
			make_timer("Você já ganhou, paizão!", true);
		} else {
			make_timer("Você já fez gamba hoje!");
		}
    })
    .catch(err => console.error(err));
}

gambabtn.onclick = () => {
	info.className = "";
	info.innerText = "";

	let data = JSON.parse(localStorage.getItem("data"));

	fetch("https://api.twitch.tv/helix/users",
	    {
	        headers: {
	            'Authorization': `Bearer ${data.token}`,
	            'Client-Id': `${data.id}`
	        }
	    })
	.then(res => res.json())
	.then(tdata => {
		tdata = tdata.data[0];

		let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZXltd3JvZGZ4c21ncWJmcHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMDk4NzMsImV4cCI6MjA0MDg4NTg3M30.-_sk-7o3uSTf4slgqTuRwJ5mOc1wdya3R6httrFLmho";
		let ins = {"username": tdata.login};

		fetch("https://eweymwrodfxsmgqbfpyn.supabase.co/rest/v1/users", {
			method: "POST",
			headers:
			{
				"apikey": key,
				"Authorization": `Bearer ${key}`,
				"Content-Type": "application/json",
				"Prefer": "return=minimal"
			},
			body: JSON.stringify(ins)
		})
		.then(res => {
			gambabtn.disabled = true;
			gamba.style.cursor = "not-allowed";

			if (!res.ok) {
				config_gamba(tdata, key);

				throw new Error("Você já fez gamba hoje, volte amanhã!");
			} else return 1;
		})
		.then(() => {
			action(tdata, key);
			//console.log("Inserido 1 linha com sucesso.");
		})
		.catch(err => console.error(err))
	})
	.catch(err => {
		localStorage.removeItem("data");
		location.replace("../gamba");
	});
};

if (localStorage.getItem("secret")) {
	[...document.querySelectorAll(".gimg")].map(x => {
            x.src = localStorage.getItem("secret");
	});
}

document.onkeydown = (e) => {
	if (e.keyCode == 191){
		if (!localStorage.getItem("secret")) window.alert("Secret ativado!");

		[...document.querySelectorAll(".gimg")].map(x => {
			if (x.src.split("img/")[1] == "gamba.png") {
				x.src = "img/gamba-orig.png";
				localStorage.setItem("secret", "img/gamba-orig.png");
			} else {
				x.src = "img/gamba.png";
				localStorage.setItem("secret", "img/gamba.png");
			}
		});
	}
}
