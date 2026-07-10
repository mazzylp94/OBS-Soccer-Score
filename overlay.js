import {
db,
ref,
onValue
}
from "./firebase.js";

onValue(

ref(db,"scorebug"),

(snapshot)=>{

const data =
snapshot.val();

if(!data) return;

/* EQUIPOS */

localTeam.textContent =
data.localTeam;

awayTeam.textContent =
data.awayTeam;

if(document.getElementById("penLocalName")){

penLocalName.textContent =
data.localFullTeam || data.localTeam;

}

if(document.getElementById("penAwayName")){

penAwayName.textContent =
data.awayFullTeam || data.awayTeam;

}

/* GOLES */

localScore.textContent =
data.localScore;

awayScore.textContent =
data.awayScore;

/* RELOJ */

clock.textContent =
data.clock;

period.textContent =
data.period;

/* TIEMPO AÑADIDO */

if(data.addedTime > 0){

    addedTime.style.display = "flex";

    addedTime.textContent = "+" + data.addedTime;

    if(data.addedTime >= 10){

        addedTime.style.width = "260px";

    }else{

        addedTime.style.width = "180px";

    }

}else{

    addedTime.style.display = "none";

}

/* ===========================
   PENALES
=========================== */

const localPens =
data.penLocal || ["","","","",""];

const awayPens =
data.penAway || ["","","","",""];

/* LOCAL */

for(let i=0;i<5;i++){

const pen =
document.getElementById("pl"+(i+1));

if(!pen) continue;

pen.className="pen";

switch(localPens[i]){

case "G":
pen.classList.add("goal");
break;

case "E":
pen.classList.add("miss");
break;

}

}

/* VISITANTE */

for(let i=0;i<5;i++){

const pen =
document.getElementById("pa"+(i+1));

if(!pen) continue;

pen.className="pen";

switch(awayPens[i]){

case "G":
pen.classList.add("goal");
break;

case "E":
pen.classList.add("miss");
break;

}

}

/* MOSTRAR SOLO EN PENALES */

if(document.getElementById("penalties")){

if(data.period=="PEN"){

penalties.style.display="block";

}else{

penalties.style.display="none";

}

}

});
