import { db } from "./firebase.js";
import {
  doc,
  onSnapshot
} from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
window.onload = LoadFinish
window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(async function(OneSignal) {
    await OneSignal.init({
      appId: "d7052c5e-f14a-425d-a03d-888f2f32de1e",
      notifyButton: { enable: true },
    });
  });
let input
function LoadFinish()
{
  input = document.getElementById("input")
  input.addEventListener("change",InputChanged)
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
function InputChanged()
{
  Notification.requestPermission().then(permission => {
    if (permission === "granted")
    {
      OneSignal.push(() => {
        OneSignal.sendTag("number", input.value);
      })
    }
  })
};
