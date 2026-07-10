import {
db,
ref,
set
}
from "./firebase.js";

let running = false;
let seconds = 0;

/* ===========================
   ESTADO GENERAL
=========================== */

let state = {

localTeam:"BOC",
awayTeam:"RIV",

localFullTeam:"Boca Juniors",
awayFullTeam:"River Plate",

localScore:0,
awayScore:0,

clock:"00:00",

period:"1T",

addedTime:0,

localRedCards:0,
awayRedCards:0,
/* ===========================
   PENALES
=========================== */

penLocal:["","","","",""],
penAway:["","","","",""]

};

save();
refreshViews();

/* ===========================
   GUARDAR EN FIREBASE
=========================== */

function save(){

set(
ref(db,"scorebug"),
state
);

refreshViews();

}

/* ===========================
   REFRESH UI CONTROL
=========================== */

function refreshViews(){

if(document.getElementById("localScoreView"))
localScoreView.textContent =
state.localScore;

if(document.getElementById("awayScoreView"))
awayScoreView.textContent =
state.awayScore;

if(document.getElementById("addedView"))
addedView.textContent =
state.addedTime;

if(document.getElementById("localRedView"))
    localRedView.textContent = state.localRedCards;

if(document.getElementById("awayRedView"))
    awayRedView.textContent = state.awayRedCards;
}

/* ===========================
   EQUIPOS
=========================== */

function saveTeams(){

state.localTeam =
localInput.value.toUpperCase();

state.awayTeam =
awayInput.value.toUpperCase();

/* NOMBRES COMPLETOS */

state.localFullTeam =
localFullInput.value.trim();

state.awayFullTeam =
awayFullInput.value.trim();

/* Si quedaron vacíos usa la abreviatura */

if(state.localFullTeam=="")
state.localFullTeam =
state.localTeam;

if(state.awayFullTeam=="")
state.awayFullTeam =
state.awayTeam;

save();

}

/* ===========================
   MARCADOR
=========================== */

function localPlus(){
state.localScore++;
save();
}

function localMinus(){
if(state.localScore > 0)
state.localScore--;
save();
}

function awayPlus(){
state.awayScore++;
save();
}

function awayMinus(){
if(state.awayScore > 0)
state.awayScore--;
save();
}

/* ===========================
   RELOJ
=========================== */

function toggleClock(){
running = !running;
}

function resetClock(){
seconds = 0;
state.clock = "00:00";
save();
}

function plus10(){
seconds += 10;
saveClock();
}

function minus10(){
seconds = Math.max(0, seconds - 10);
saveClock();
}

function saveClock(){

let m =
Math.floor(seconds / 60);

let s =
seconds % 60;

state.clock =
String(m).padStart(2,"0")
+
":"
+
String(s).padStart(2,"0");

save();

}

/* ===========================
   PERIODO
=========================== */

function setPeriod(value){
state.period = value;
save();
}

/* ===========================
   AÑADIDO
=========================== */

function addedPlus(){
state.addedTime++;
save();
}

function addedMinus(){
if(state.addedTime > 0)
state.addedTime--;
save();
}

/* ===========================
   TARJETAS ROJAS
=========================== */

function localRedPlus(){

    if(state.localRedCards < 5){

        state.localRedCards++;

        save();

    }

}

function localRedMinus(){

    if(state.localRedCards > 0){

        state.localRedCards--;

        save();

    }

}

function awayRedPlus(){

    if(state.awayRedCards < 5){

        state.awayRedCards++;

        save();

    }

}

function awayRedMinus(){

    if(state.awayRedCards > 0){

        state.awayRedCards--;

        save();

    }

}

/* ===========================
   PENALES
=========================== */

function setPenLocal(index,value){

state.penLocal[index] = value;

save();

}

function setPenAway(index,value){

state.penAway[index] = value;

save();

}

function resetPenalties(){

state.penLocal = ["","","","",""];
state.penAway = ["","","","",""];

save();

}

function markPen(team,index,value){

if(team === "L"){
state.penLocal[index] = value;
}

if(team === "A"){
state.penAway[index] = value;
}

save();

}

/* ===========================
   TIMER
=========================== */

setInterval(()=>{

if(!running) return;

seconds++;

saveClock();

},1000);

/* ===========================
   TECLAS
=========================== */

document.addEventListener("keydown",(e)=>{

if(!(e.ctrlKey && e.altKey))
return;

switch(e.code){

case "Space":
running=!running;
break;

case "KeyQ":
localPlus();
break;

case "KeyA":
localMinus();
break;

case "KeyP":
awayPlus();
break;

case "KeyL":
awayMinus();
break;

case "Digit1":
setPeriod("1T");
break;

case "Digit2":
setPeriod("ET");
break;

case "Digit3":
setPeriod("2T");
break;

case "Digit4":
setPeriod("PR");
break;

case "Digit5":
setPeriod("PEN");
break;

case "PageUp":
addedPlus();
break;

case "PageDown":
addedMinus();
break;

case "ArrowRight":
plus10();
break;

case "ArrowLeft":
minus10();
break;

case "KeyR":
resetClock();
break;

}

});

/* ===========================
   EXPONER FUNCIONES AL HTML
=========================== */

window.saveTeams = saveTeams;

window.localPlus = localPlus;
window.localMinus = localMinus;

window.awayPlus = awayPlus;
window.awayMinus = awayMinus;

window.toggleClock = toggleClock;
window.resetClock = resetClock;

window.plus10 = plus10;
window.minus10 = minus10;

window.setPeriod = setPeriod;

window.addedPlus = addedPlus;
window.addedMinus = addedMinus;

window.localRedPlus = localRedPlus;
window.localRedMinus = localRedMinus;

window.awayRedPlus = awayRedPlus;
window.awayRedMinus = awayRedMinus;

/* PENALES */

window.setPenLocal = setPenLocal;
window.setPenAway = setPenAway;
window.resetPenalties = resetPenalties;
window.markPen = markPen;
