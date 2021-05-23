var bilderOrginal = ["fagott.jpg", "floyte.gif", "klarinett.jpg", "obo.jpg", "valthorn.jpg"];
var navnOrginal = ["Fagott", "Fløyte", "Klarinett", "Obo", "Valthorn"];
var lydOrginal = ["fagott.mp3", "floyte.mp3", "klarinett.mp3", "obo.mp3", "valthorn.mp3"];
var bilder = bilderOrginal.slice(0);
var navn = navnOrginal.slice(0);
var lyd = lydOrginal.slice(0);

var gjettetRiktig = true;
var antFeil = 0;
var antForsok = 0;
var highscore = 0;
var dinePoeng = 0;
var lydRand = document.getElementById("lydRand");
var lydFeil = new Audio('feil.mp3');
var lydRiktig = new Audio('riktig.mp3');
var antallInstrumenter = bilderOrginal.length;
lagbilderekke();

function lagbilderekke() {
document.getElementById("div1").style.display = "initial"; //Vis del1.
document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
document.getElementById("antForsok").innerHTML = "Antall forsøk: " + antForsok ;
document.getElementById("info").innerHTML = "";
for (var i = 0; i < bilder.length; i++) { //Legger til bildene. Legger også inn navn under med å lage en tabell med samme bredde. Finnes kanskje bedre måter å gjøre det på. 
		var img = document.createElement("IMG");
		img.src = bilder[i];
		gibildefunksjon(i);
		function gibildefunksjon (i) {
			img.onclick = function() {
			bildefunction(i); //legger verdien i til bilde
			};
		}
		Visbilder.appendChild(img);
		VisNavn.innerHTML += "<td>" + navn[i] + "</td>";
		}
}

function Randlyd() {
	document.getElementById("btn").innerHTML = " Gjenta lyd";
	if (gjettetRiktig) {
	 lydIndex = Math.floor(Math.random() * lyd.length);
     lydRand.src = lyd[lydIndex];
     lydRand.play(); 
	 } else {
	 lydRand.play(); 
	 }
	gjettetRiktig = false;
}
	
function bildefunction(bildeIndex) {
	if (lydIndex == -1){
	alert('spill av en lyd først')
	return}
	if (bildeIndex==lydIndex) {
	VisNavn.innerHTML = "";
	Visbilder.innerHTML="";
	//sletter bilde og navn og lyden som hørte til.  
	bilder.splice(bildeIndex, 1); 
	navn.splice(bildeIndex, 1); 
	lyd.splice(bildeIndex, 1);
	lydRand.pause();
	lydRiktig.play();
	lagbilderekke();
	gjettetRiktig = true;
	lydIndex = -1;
	document.getElementById("btn").innerHTML = " Få tilfeldig lyd";
	} else {
	lydRand.pause();
	lydFeil.play();
	antFeil = antFeil + 1;
	}
	if (bilder.length == 0) {
		document.getElementById("div1").style.display = "none"; //Skjul del1
		bilder = bilderOrginal.slice(0);
		navn = navnOrginal.slice(0);
		lyd = lydOrginal.slice(0);
		antForsok = antForsok + 1;
		dinePoeng = antallInstrumenter - antFeil;
		
		if (antFeil == 0) {
		document.getElementById("info").innerHTML += "<p>Du har gjennomført quizen uten feil!</p>"
		}
		if (dinePoeng>highscore) {
		highscore = dinePoeng;
		document.getElementById("info").innerHTML += "<p>Gratulerer! Du har fått nye highscore! </p>"
		} else if (dinePoeng == highscore){
		document.getElementById("info").innerHTML += "<p>Gratulerer! Du har tangert den forrige highscoren! </p>"
		}

		document.getElementById("info").innerHTML += "<p>Highscore: " + highscore + "</p>"
		document.getElementById("info").innerHTML += "<p>Dine poeng: " + dinePoeng + "</p>"
		document.getElementById("info").innerHTML += "<p>Antall forsøk: " + antForsok + "</p>";
		document.getElementById("info").innerHTML += "<p>Antall feil: " + antFeil + "</p>";
		
		document.getElementById("info").innerHTML += '<p><button onclick="lagbilderekke()">Ny runde</button></p>';
		antFeil = 0;
		}
	document.getElementById("antFeil").innerHTML = "Antall feil: " + antFeil ;
} 