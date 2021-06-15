/* global $, JitsiMeetJS */
 /*const options = {
	     hosts: {
             domain: 'qa.thebanknet.com',
             muc: 'conference.dev.thebanknet.com' 
            },
	 bosh: '//dev.thebanknet.com:7878/http-bind',

	      clientNode: 'http://jitsi.org/jitsimeet',
              id: "jigasi",
              password: "jigasi",
          };

*/


// These are words/phrases the user could type in

const trigger = [
  ["hi", "hey", "hello"],
  ["how are you", "how is life", "how are things"],
  ["what are you doing", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you"],
  [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself"
  ],
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "yes", "ok", "okay", "nice"],
  ["thanks", "thank you"],
  ["bye", "good bye", "goodbye", "see you later"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["Contact an Agent","Need to contact customer care","Talk to a repesentative"]
];

// These are bot responses, paired in order with the above 'trigger' phrases

var botconv=[];	

const reply = [
  ["May I know your Name?"],
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
  ],
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],
  ["I am infinite"],
  ["I am just a bot", "I am a bot. What are you?"],
  ["The one true God, JavaScript"],
  ["I am nameless", "I don't have a name"],
  ["I love you too", "Me too"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Why?", "Why? You shouldn't!", "Try watching TV"],
  ["What about?", "Once upon a time..."],
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  ["You're welcome"],
  ["Bye", "Goodbye", "See you later"],
  ["Sushi", "Pizza"],
  ["Bro!"],
  ["Yes?"]
];

// This is a small set of basically random 'catch alls' for anything that the user enters outside of the possible trigger phrases

const alternative = [
  ["May I know your phone number?"],
  ["May I know your email?"],
  ["Hi What is your issue?"]
];

// Same purpose as the 'alternative' but an attempt at being culturally relevant ;)

const coronavirus = ["Please stay home"];

//document.addEventListener("DOMContentLoaded", () => {
	//const inputField = document.getElementById("input")
	/*inputField.addEventListener("keydown", function(e) {
	/*	if (e.code === 13) {
			let input = inputField.value;
			inputField.value = "";
			output(input);
    }
	if (e.keyCode == 13) {
            e.preventDefault();
	}
  });*/
//}); 


function output(input) {
  let product;

  //Transforms whatever the user inputs to lowercase and remove all chars except word characters, space, and digits
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  // For example 'tell me a story' becomes 'tell me story'
  // Or 'i feel happy' -> 'happy'
  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

  // Searches for an exact match with the 'trigger' array, if there are none, it goes will check if message contains 'coronavirus,' and if not - random alternative
  if (compare(trigger, reply, text)) {
    product = compare(trigger, reply, text);
  } else if (text.match(/coronavirus/gi)) {
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  //update DOM
  addChat(input, product);
}


function getShowTime(){
  var todayDate=new Date().toDateString();
  var nowtime=new Date().toLocaleTimeString();
  var showtime=todayDate+' '+ nowtime;
  alert(showtime);
  return showtime;
}




function compare(triggerArray, replyArray, string) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (triggerArray[x][y] == string) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  return item;
}
function showWindow(){
	$('#main').hide();
	$('#clientbox').show();
//	sendClientDetails();
	
	
}

function sendClientDetails(){
	let name = document.getElementById("name").value;
	let email = document.getElementById("email").value;
	let question =  document.getElementById("question").value;
	return clientdetails;
}

 let gotoagent=false;
 
 
function addChat(product) {
  const mainDiv = document.getElementById("mainChat");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
 
  if(product.includes("again") || product.includes("sorry") || product.includes("repeat") || product.includes("rephrase") || gotoagent==true){
     product='Please wait while your request is forwarded to a live agent';
	 gotoagent=true;
	 
  }
  
 var timenow =new Date().toLocaleTimeString();

 
  
  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.className ='msg left-msg';
  //botDiv.innerHTML = `<img id="bot" src="../images/bot.png"  width="20" height="20">: <span i"bot-response">${product}</span>`;
  botDiv.innerHTML =`<div class="msg-img" style="background-image: url(../images/bot.png)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">Tia</div><div  class="msg-info-time">${timenow}</div></div><div class="msg-text">${product}</div></div>`;

createMessageObject(product,'S')
 //botconv.push(product);
  mainDiv.appendChild(botDiv);
  
  //return gotoagent;
  //speak(product);
}

const synth = window.speechSynthesis;
let voices = synth.getVoices();

function gotoAgent(){
return gotoagent;
}

function getBotConvList(){
return botconv;
}

function speak(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-US";
  u.volume = 1; //0-1 interval
  u.rate = 1;
  u.pitch = 1; //0-2 interval
  synth.speak(u);
  debugger
}

var counter =0;

function startBotChat(mesg){
const mainDiv = document.getElementById("mainChat");
 let userDiv = document.createElement("div");
 var timenow =new Date().toLocaleTimeString();
	var clientMsg;
  userDiv.id = "user";
  //document.getElementById("msginput").value = '';
 //userDiv.innerHTML = `You: <span id="user-response">${mesg}</span>`;
 if(counter==0){
 var strIndex = mesg.indexOf('Data');
 if(strIndex == -1) {
     clientMsg =mesg;
  } else {
	  counter++
   var array = mesg.split(":"); 
		clientMsg = array[3];
		name = array[1]
  }
 }else{
	clientMsg =mesg; 
 }
  /*  if(mesg.includes("Data")){
		var array = mesg.split(":"); 
		clientMsg = array[3];
		name = array[1]
	}else
		clientMsg =mesg; */
	
	userDiv.className ='msg right-msg';
 userDiv.innerHTML = `<div class="msg-img" style="background-image: url(../images/boy.svg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">${name}</div><div  class="msg-info-time">${timenow}</div></div><div class="msg-text">${clientMsg}</div></div>`;
	//botconv.push(clientMsg);
	createMessageObject(clientMsg,'R')
	
	mainDiv.appendChild(userDiv);
	getIntentResponse(clientMsg);
	
}

function createMessageObject(msg,type){	
  var msgObj = {	
      type: type,	
      messagebody: msg,	
      time: new Date().toLocaleTimeString(),	
    };	
	botconv.push(msgObj);
}

 function setBotMsg(data){
  // alert("got data"+data);
  if(null != data &&  0 != data.length){
   addChat(data);
  }else{
	 gotoagent=true;
	      addChat('');  
  }
   console.error("data!", data);
   }

   function  getIntentResponse(msg){
	// alert("In getIntentResponse");
	   //var urls =Env_Properties.MILLI_SERVER + "getagentUid?userId=milli3@milli.thebanknet.com";
	var urls="https://demo.thebanknet.com:6625/milli/Dialog";
	//var urls="https://cors-anywhere.herokuapp.com/https://milliqa.thebanknet.com:6625/milli/Dialog";
	var discount=msg;

	const requestOptions = {
		method: 'POST',
		 headers: { 'Content-Type': 'application/json; charset=utf-8',  dataType: 'Json' },
		 body: JSON.stringify({ msg})
	};
	  fetch(urls, requestOptions)	
      .then(async (response) => {	
        const data = await response.text();	
		console.error("There was data!", data);
		botresponse =data;
        setBotMsg(data);	
      })	
      .catch((error) => {	
        // setSmsStatus('failed');	
              gotoagent=true;
	      addChat('');
	      console.error("There was an error!", error);	
      });	
	 //return botresponse;
}
