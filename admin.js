import { db } from "./firebase.js";
import {
  updateDoc,
  getDoc,
  doc,
  onSnapshot
} from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from 
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
window.onload = LoadFinish;
const docref = doc(db,"status","main");
let input
function LoadFinish()
{
    input = document.getElementById("input")
    document.getElementById("addbutton").addEventListener("click",AddNumber)
    document.getElementById("callbutton").addEventListener("click",Call)
    document.getElementById("deletebutton").addEventListener("click",DeleteNumber)
    document.getElementById("loginbutton").addEventListener("click",LogIn)
    document.getElementById("messagebutton").addEventListener("click",SendMessage)
    onSnapshot(docref,snap=>{
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
async function LogIn() 
{
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const login_notifyer = document.getElementById("login_notifyer")
    try {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
    const user = userCredential.user;
    login_notifyer.textContent = "ログイン成功";
    login_notifyer.style.color = '#00FF69';
    document.getElementById("email_block").remove()
    document.getElementById("password_block").remove()
  } catch (error) {
    login_notifyer.textContent = "ログイン失敗";
    login_notifyer.style.color = '#FF9B9B';
  }
}
async function AddNumber()
{
  const number = Number(input.value);
  if (number === 0){return;}
  let pendingarray = (await getDoc(docref)).data().pending;
  if (!pendingarray.includes(number))
  {
      pendingarray.push(number);
      updateDoc(docref,{pending: pendingarray});
  }
}
async function Call() 
{
  let pendingarray = (await getDoc(docref)).data().pending;
  if (pendingarray.length === 0){return;}
  let calledarray = (await getDoc(docref)).data().called;
  let number = input.value;
  if (number === "")
  {
    number = pendingarray.shift();
  }
  else
  {
    number = Number(number);
    if (!pendingarray.includes(number)){return;}
    pendingarray = pendingarray.filter(num => num!=number);
  }
  calledarray.push(number);
  updateDoc(docref,{pending: pendingarray, called: calledarray});
}
async function DeleteNumber() 
{
  let number = input.value;
  let calledarray = (await getDoc(docref)).data().called;
  if (calledarray.length === 0){return;}
  if (number === "")
  {
    calledarray.shift();
  }
  else
  {
    number = Number(number);
    if (!calledarray.includes(number)){return;}
    calledarray = calledarray.filter(num => num!=number);
  }
  updateDoc(docref,{called: calledarray});
}
async function SendMessage() 
{
  const date = new Date();
  const message = String(date.getHours())+":"+String(date.getMinutes())+" "+document.getElementById("messagebox").value;
  let messagearray = (await getDoc(docref)).data().message;
  messagearray.unshift(message);
  updateDoc(docref,{message: messagearray});
}
