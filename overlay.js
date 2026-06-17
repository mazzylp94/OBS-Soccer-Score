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

localTeam.textContent =
data.localTeam;

awayTeam.textContent =
data.awayTeam;

localScore.textContent =
data.localScore;

awayScore.textContent =
data.awayScore;

clock.textContent =
data.clock;

period.textContent =
data.period;

if(data.addedTime > 0){

addedTime.style.display =
"flex";

addedTime.textContent =
"+" + data.addedTime;

}
else{

addedTime.style.display =
"none";

}

}

);