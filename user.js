import { db } from "./firebase.js";
import {
  doc,
  onSnapshot
} from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
window.onload = LoadFinish
function LoadFinish()
{
    onSnapshot(doc(db,"status","main"),snap=>{
      const data = snap.data();
        let elems = [];
        for(const value of data.called)
        {
            const numelem = document.createElement("span");
            numelem.textContent = value;
            numelem.className = "number";
            elems.push(numelem);
        }
        document.getElementById("leftcontainer").replaceChildren(...elems);
        elems = [];
        for(const value of data.pending)
        {
            const numelem = document.createElement("span");
            numelem.textContent = value;
            numelem.className = "number";
            elems.push(numelem);
        }
        document.getElementById("rightcontainer").replaceChildren(...elems);
        elems = [];
        for(const value of data.message)
        {
          const textelem = document.createElement("p");
          textelem.textContent = value;
          textelem.className = "massagetext";
          elems.push(textelem);
        }
        document.getElementById("message").replaceChildren(...elems);
    })
}