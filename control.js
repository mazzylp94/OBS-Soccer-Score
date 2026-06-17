import {
db,
ref,
set
}
from "./firebase.js";

let running=false;
let seconds=0;

let state={

localTeam:"BOC",
awayTeam:"RIV",

localScore:0,
awayScore:0,

clock:"00:00",

period:"1T",

addedTime:0

};

save();
refreshViews();

function save(){

set(
ref(db,"scorebug"),
state
);

refreshViews();

}

function refreshViews(){

if(localScoreView)
localScoreView.textContent=
state.localScore;

if(awayScoreView)
awayScoreView.textContent=
state.awayScore;

if(addedView)
addedView.textContent=
state.addedTime;

}

function saveTeams(){

state.localTeam=
localInput.value.toUpperCase();

state.awayTeam=
awayInput.value.toUpperCase();

save();

}

function localPlus(){
state.localScore++;
save();
}

function localMinus(){
if(state.localScore>0)
state.localScore--;
save();
}

function awayPlus(){
state.awayScore++;
save();
}

function awayMinus(){
if(state.awayScore>0)
state.awayScore--;
save();
}

function toggleClock(){
running=!running;
}

function resetClock(){

seconds=0;

state.clock="00:00";

save();

}

function plus10(){

seconds+=10;

saveClock();

}

function minus10(){

seconds=Math.max(0,seconds-10);

saveClock();

}

function setPeriod(value){

state.period=value;

save();

}

function addedPlus(){

state.addedTime++;

save();

}

function addedMinus(){

if(state.addedTime>0)
state.addedTime--;

save();

}

function saveClock(){

let m=
Math.floor(seconds/60);

let s=
seconds%60;

state.clock=
String(m).padStart(2,"0")
+
":"
+
String(s).padStart(2,"0");

save();

}

setInterval(()=>{

if(!running) return;

seconds++;

saveClock();

},1000);

document.addEventListener(
"keydown",
e=>{

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