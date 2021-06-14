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

document.addEventListener("DOMContentLoaded", () => {
	const inputField = document.getElementById("input")
	inputField.addEventListener("keydown", function(e) {
	/*	if (e.code === 13) {
			let input = inputField.value;
			inputField.value = "";
			output(input);
    }*/
	if (e.keyCode == 13) {
            e.preventDefault();
	}
  });
}); 


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


function addChat(input, product) {
  const mainDiv = document.getElementById("mainChat");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  if(input.includes("agent") || input.includes("customercare"))
     product='To contact an Agent click on link '+' ::'+'<a href="#" onclick="showWindow()">Millennnium Agent</a>'
  else if(product.includes("your"))
	 product=input+ "!" + product 
  else
	  product=product
 var timenow =new Date().toLocaleTimeString();
 
 
 
 userDiv.className ='msg right-msg';
 userDiv.innerHTML = `<div class="msg-img" style="background-image: url(../images/boy.svg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">You</div><div  class="msg-info-time">${timenow}</div></div><div class="msg-text">${input}</div></div>`;
 
 
 //userDiv.innerHTML = `<div class="msg-img" style="background-image: url(../images/boy.svg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">You:</div><div class="msg-info-time">${timenow}</div></div><div class="msg-text">${input}</div> </div></div>';
 
 
  mainDiv.appendChild(userDiv);
  
  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.className ='msg left-msg';
  //botDiv.innerHTML = `<img id="bot" src="../images/bot.png"  width="20" height="20">: <span i"bot-response">${product}</span>`;
  botDiv.innerHTML =`<div class="msg-img" style="background-image: url(../images/bot.png)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">Jesse</div><div  class="msg-info-time">${timenow}</div></div><div class="msg-text">${product}</div></div>`;
 
  mainDiv.appendChild(botDiv);
  
  return product;
  //speak(product);
}

const synth = window.speechSynthesis;
let voices = synth.getVoices();

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


/* global $, JitsiMeetJS */
const options1 = {
	    hosts: {
	          domain: 'qa.thebanknet.com',
	          muc: 'conference.qa.thebanknet.com' // FIXME: use XEP-0030
		        },
        	bosh: 'http//qa.thebanknet.com/http-bind', // FIXME: use xep-0156 for that
			
			

	    // The name of client node advertised in XEP-0115 'c' stanza
             clientNode: 'http://jitsi.org/jitsimeet',
	     id: "jigasi",
	     password: "jigasi",
	  };

const options_qa = {
            hosts: {
                  domain: 'milliqa.thebanknet.com',
                  muc: 'conference.milliqa.thebanknet.com' // FIXME: use XEP-0030
                        },
	bosh: '//milliqa.thebanknet.com:7878/http-bind', // FIXME: use xep-0156 for that

            // The name of client node advertised in XEP-0115 'c' stanza
             clientNode: 'http://jitsi.org/jitsimeet',
             id: "jigasi",
             password: "jigasi",
//	     openBridgeChannel: 'websocket',

         
          };




const options_dev = {
            hosts: {
                  domain: 'dev.thebanknet.com',
                  muc: 'conference.dev.thebanknet.com' // FIXME: use XEP-0030
                        },
        bosh: '//dev.thebanknet.com:7878/http-bind', // FIXME: use xep-0156 for that

            // The name of client node advertised in XEP-0115 'c' stanza
             clientNode: 'http://jitsi.org/jitsimeet',
             id: "jigasi",
             password: "jigasi",
          };





		  
const options2 = {
    hosts: {
        domain: 'beta.meet.jit.si',

        muc: 'conference.beta.meet.jit.si', // FIXME: use XEP-0030
        focus: 'focus.beta.meet.jit.si',
    },
    bosh:'https://beta.meet.jit.si/http-bind?', // FIXME: use xep-0156 for that
    // The name of client node advertised in XEP-0115 'c' stanza
    clientNode: 'http://jitsi.org/jitsimeet',

    openBridgeChannel: 'websocket',

    /*configOverwrite: {
    openBridgeChannel: true,
    }*/
    p2p: {
      enabled: true,
      preferH264: true,
      disableH264: true,
      useStunTurn: true, // use XEP-0215 to fetch STUN and TURN server for the P2P connection
      stunServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
      ],
    },
/*    constraints: {
      video: {
        aspectRatio: 16 / 9,
        height: {
          ideal: 100,
          max: 100,
          min: 50,
        },
        width: {
          ideal: 120,
          max: 150,
          min: 100,
        },
      },
    }, */



};

const INCOMING_CALL_AUDIO="incoming_call_audio";
const INCOMING_CALL_VIDEO="incoming_call_video";
const VIDEO_MUTE="video_mute";
const VIDEO_UNMUTE="video_unmute";
const INCOMING_CALL_VIDEO_ACCEPTED="incoming_call_video_accepted";
const INCOMING_CALL_VIDEO_REJECT="incoming_call_video_reject";
const INCOMING_CALL_AUDIO_ACCEPTED="incoming_call_audio_accepted";
const INCOMING_CALL_AUDIO_REJECT="incoming_call_audio_reject";
const INCOMING_CALL_DISCONNECT="incoming_call_disconnect";


const SCREEN_SHARE_STOP="screen_share_stop";
const SCREEN_SHARE_START="screen_share_start";
let source ="../RingTone/landline-phone-ring-1633.mp3";
//let source = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3';
let ringAudio = new Audio(source);

const screen_share_start = {
	value : SCREEN_SHARE_START,
	attributes:{ from : 'customer',to : 'milli'}
};
const screen_share_stop = {
	value : SCREEN_SHARE_STOP,
	attributes:{ from : 'customer',to : 'milli'}
};



const call_disconnect_values = {
                value : INCOMING_CALL_DISCONNECT,
                attributes:{ from : 'customer',to : 'milli'}
              };


const video_call_accept = {
                value : INCOMING_CALL_VIDEO_ACCEPTED,
                attributes:{ from : 'customer',to : 'milli'}
              };

const video_call_reject = {
                        value : INCOMING_CALL_VIDEO_REJECT,
                        attributes:{ from : 'customer',to : 'milli'}
               };
const audio_call_accept = {
                value : INCOMING_CALL_AUDIO_ACCEPTED,
                attributes:{ from : 'customer',to : 'milli'}
              };

const audio_call_reject = {
                        value : INCOMING_CALL_AUDIO_REJECT,
                        attributes:{ from : 'customer',to : 'milli'}
               };

const video_mute_values = {
	        value :VIDEO_MUTE,
	        attributes:{ from : 'customer',to : 'milli'}
	      };

const video_unmute_values = {
	        value :VIDEO_UNMUTE,
	        attributes:{ from : 'customer',to : 'milli'}
	      };

const video_call_values = {
	        value : INCOMING_CALL_VIDEO,
	        attributes:{ from : 'customer',to : 'milli'}
	      };
	
const audio_call_values = {
	                value : INCOMING_CALL_AUDIO,
	                attributes:{ from : 'customer',to : 'milli'}
	       };



let ip_call_present=false;
let init_called=false;



function acceptVideoCall()
{
disc_room.sendCommand(INCOMING_CALL_VIDEO_ACCEPTED,video_call_accept);
incoming_call=true;
client_videocall();
stopAudio();
$("#videoTab").show();
$("#videoAlertDiv").hide();
$("#audioAlertDiv").hide();
$("#discDiv").hide();	
}

function rejectVideoCall()
{
	stopAudio();
$("#videoAlertDiv").hide();
	$("#audioAlertDiv").hide();
	$("#discDiv").hide();

disc_room.sendCommand(INCOMING_CALL_VIDEO_REJECT,video_call_reject);
Call_Disconnet();
//stopAudio();
}

function acceptAudioCall()
{
$("#videoAlertDiv").hide();
$("#audioAlertDiv").hide();
$("#discDiv").hide();
$("#videoTab").hide();
$("#audioTab").show();	
disc_room.sendCommand(INCOMING_CALL_AUDIO_ACCEPTED,audio_call_accept);
inVideo=false;
inAudio=true;
incoming_call=true;
client_audiocall();
stopAudio();

}
function rejectAudioCall()
{
$("#videoAlertDiv").hide();
$("#audioAlertDiv").hide();
$("#discDiv").hide();
$("#videoTab").hide();
stopAudio();
disc_room.sendCommand(INCOMING_CALL_AUDIO_REJECT,audio_call_reject);
Call_Disconnet(); 
$("#client-local-meeting-container").hide();
$("#client-remote-meeting-container").hide();
stopAudio();
}

function acceptDiscCall()
{
$("#videoAlertDiv").hide();
$("#audioAlertDiv").hide();
$("#discDiv").hide();
$("#videoTab").hide();
stopAudio();
//call_disconnect_consume=true;
	let foraudio=false;
	if(inAudio == true)
		foraudio=true;
//	Call_Disconnet();//endcall();
	incoming_call=false;

	$("#client-local-meeting-container").hide();
	$("#client-remote-meeting-container").hide();
	if(foraudio == true)
	{
		console.error("This part is only for Audio.................");
		foraudio=false;

	}


}


let agentUID;


function fetchAgentId(){
	//var urls =Env_Properties.MILLI_SERVER + "getagentUid?userId=milli3@milli.thebanknet.com";
	var urls="https://milliqa.thebanknet.com:7878/milli/getagentUid?userId=milli3@milli.thebanknet.com";
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json; charset=utf-8',  dataType: 'Json' }
	};
	fetch(urls, requestOptions)
	.then(async response => {
		if (response != null){
			const data = await response.json();
			//alert("fetched data"+data)
			agentUID =data;

		}else{



		}})
	.catch(error => {
		console.error('There was an error!', error);
	});
	 
}




const confOptions = {
   // openBridgeChannel: true
   openBridgeChannel: 'websocket'

};

let incoming_call=false;
let command_check=" "
var connection = null;
var isJoined = false;
var room = null;
var inVideo=false;
var inAudio=false;
var meetingroom="";

var localTracks = [];
const remoteTracks = {};
//const localContainer= document.getElementById('client-remote-meeting-container');
var remote_part_id=0;
let fromscreen_share=false;
let disc_connection = null;
let disc_isJoined = false;
let disc_room = null;
let call_disconnect_consume=false;
/**
 * Handles local tracks.
 * @param tracks Array with JitsiTrack objects
 */

function onLocalTracks(tracks) {
	localTracks = tracks;
	for (let i = 0; i < localTracks.length; i++) {
		localTracks[i].addEventListener(
			JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
			audioLevel => console.log(`Audio Level local: ${audioLevel}`));
		localTracks[i].addEventListener(
			JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
			() => console.log('local track muted'));
		localTracks[i].addEventListener(
			JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
			() => console.log('local track stoped'));
		localTracks[i].addEventListener(
			JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
			deviceId =>
			console.log(
				`track audio output device was changed to ${deviceId}`));
		if (localTracks[i].getType() === 'video') {



		  $('#client-local-meeting-container').show();
                 $('#client-local-meeting-container').append(`<video autoplay='1' id='localVideo${i}'  height='100%' width='100%' />`);
		//	$('body').append(`<video autoplay='1' id='localVideo${i}' />`);
			localTracks[i].attach($(`#localVideo${i}`)[0]);
		} else {
			$('body').append(`<audio autoplay='1' muted='false' id='localAudio${i}' />`);
			localTracks[i].attach($(`#localAudio${i}`)[0]);
		}
		if (isJoined) {
			room.addTrack(localTracks[i]);
		}
	}
}

/**
 *  * Handles remote tracks
 *   * @param track JitsiTrack object
 *    */
	function onRemoteTrack(track) {
		if (track.isLocal()) {
			return;
		}
		const participant = track.getParticipantId();

		if (!remoteTracks[participant]) {
			remoteTracks[participant] = [];
			}
			const idx = remoteTracks[participant].push(track);

		track.addEventListener(
			JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
			audioLevel => console.log(`Audio Level remote: ${audioLevel}`));
		track.addEventListener(
			JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
			() => console.log('remote track muted'));
		track.addEventListener(
			JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
			() => console.log('remote track stoped'));
			track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
				deviceId =>
				console.log(
					`track audio output device was changed to ${deviceId}`));
			const id = participant + track.getType() + idx;
			console.error(" The value of idx= "+idx+" the value of id=  "+id+"  participant  "+participant); 
			if ((track.getType() === 'video')) {
				console.error(" Remote Video is getting add...........................");
				$('#client-remote-meeting-container').html(" ");
				$('#client-remote-meeting-container').show();
				$('#client-remote-meeting-container').append(`<video autoplay='1' id='${id}'  height='100%' width='100%'/>`);


			//	track.attach(document.getElementById(`v${track.getParticipantId()}`))
			//	$('body').append(
			//		`<video autoplay='1' id='${participant}video${idx}' />`);
			} else {
				$('body').append(
					`<audio autoplay='1' id='${participant}audio${idx}' />`);
			}

			
			track.attach($(`#${id}`)[0]);
		}








/**
 * That function is executed when the conference is joined
 */

function setMettingroom(meetindid)
{
		meetingroom=meetindid.toString();;
}	

function onConferenceJoined() {
    console.error("User join the conference.......................");	
    isJoined = true;
    for (var i = 0; i < localTracks.length; i++) {
        room.addTrack(localTracks[i]);
    }
}

/**
 *
 * @param id
 */
function onUserLeft(id) {
    console.error("User left from conference........"+id);
    if (!remoteTracks[id]) {
        return;
    }
    const tracks = remoteTracks[id];

    for (var i = 0; i < tracks.length; i++) {
        tracks[i].detach($(`#${id}${tracks[i].getType()}`));
    }

//	$("#client-remote-meeting-container").hide();
//	endcall();
}

/**
 * That function is called when connection is established successfully
 */



function onConnectionSuccess() {

        console.error(`meeting room name:`+meetingroom);
    room = connection.initJitsiConference("4469", confOptions); //meetingroom
    room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
    room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, track => {
        console.log(`track removed!!!${track}`);
    });
    room.on(
        JitsiMeetJS.events.conference.CONFERENCE_JOINED,
        onConferenceJoined);
    room.on(JitsiMeetJS.events.conference.USER_JOINED, id => {
        console.log('user join');
        remoteTracks[id] = [];
    });
    room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
    room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, track => {
        console.log(`${track.getType()} - ${track.isMuted()}`);
    });
    room.on(
        JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
        (userID, displayName) => console.log(`${userID} - ${displayName}`));
    room.on(
        JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
        (userID, audioLevel) => console.log(`${userID} - ${audioLevel}`));
    room.on(
        JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED,
        () => console.log(`${room.getPhoneNumber()} - ${room.getPhonePin()}`));
    room.join();		
/*		
		room.addCommandListener(INCOMING_CALL_AUDIO,process_agent_command);
		room.addCommandListener(INCOMING_CALL_VIDEO,process_agent_command);
		room.addCommandListener(VIDEO_MUTE,process_agent_command);
		room.addCommandListener(VIDEO_UNMUTE,process_agent_command);
		room.addCommandListener(INCOMING_CALL_VIDEO_ACCEPTED,process_agent_command);
		room.addCommandListener(INCOMING_CALL_VIDEO_REJECT,process_agent_command);
		room.addCommandListener(INCOMING_CALL_AUDIO_ACCEPTED,process_agent_command);
		room.addCommandListener(INCOMING_CALL_AUDIO_REJECT,process_agent_command);	
		room.addCommandListener(INCOMING_CALL_DISCONNECT,process_agent_command);

		room.addCommandListener(SCREEN_SHARE_STOP,process_agent_command);
*/		
//    room.join();
}



/**
 * This function is called when the connection fail.
 */
function onConnectionFailed() {
    console.error('Connection Failed!');
}

/**
 * This function is called when the connection fail.
 */
function onDeviceListChanged(devices) {
    console.info('current devices', devices);
}

/**
 * This function is called when we disconnect.
 */
function disconnect() {
    console.log('disconnect!');
//	alert (" Call disconneted.....................");
    connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        onConnectionSuccess);
    connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_FAILED,
        onConnectionFailed);
    connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
        disconnect);
} 


/**
 *
 */

function Call_Disconnet() {
        console.error("Client Disconnect Call ...................."+call_disconnect_consume);
	let foraudio=false;
	 $("#videoTab").hide();
	$("#audioTab").hide();
//	document.getElementById("videoTab").style.visibility = "hidden";
//	document.getElementById("videoTab").style.display = "none";
//	document.getElementById("#videoTab").style.display='none';
//	$("div#videoTab").hide();
	//if ((incoming_call == false)&
		if (call_disconnect_consume==false) 
		disc_room.sendCommand(INCOMING_CALL_DISCONNECT,call_disconnect_values);
        
	 $("#client-remote-meeting-container").hide();
	 $("#client-local-meeting-container").hide();
	 if(inAudio==true){
		foraudio=true;
         }
	        ip_call_present=false;
	        init_called=false;
		inVideo=false;
		inAudio=false;
		incoming_call=false;	
	for (let i = 0; i < localTracks.length; i++) {
		localTracks[i].dispose();
	}
	room.leave();
	connection.disconnect();
	 //document.getElementById("client-local-meeting-container").innerHTML = "";
	 //document.getElementById("client-remote-meeting-container").innerHTML = "";
	// document.getElementById("videoTab").style.display='none';
//      $('#client-local-meeting-container').innerHTML = "";

         //	clearLocalDiv();
	connection = null;
		room = null;
		isJoined = false;
		localTracks = [];
		//remoteTracks = {};
		isVideo = true;
	if(foraudio==true)
	{
		console.error("This part is only for Audio.................");
		//eadme.txtReadme.txt
		//refresh();
	}
//	 $("#videoTab").hide();
	fromscreen_share=false;
	call_disconnect_consume=false;
}


function endcall(){

console.error("End Call is calling .................");

	     for (var i = 0; i < localTracks.length; i++) {
		    // room.removeTrack(localTracks[i]);
		      localTracks[i].dispose();
                       // remoteTracks.dispose();
		        }
			//	disconnect();
 	$("#client-remote-meeting-container").hide();
	$("#client-local-meeting-container").hide();
//	room.leave();
	ip_call_present=false;
        init_called=false;
unload_disc();
//	disconnect();
//	connection.disconnect();
       // $("#clientbox").hide();
	// $("#client-remote-meeting-container").hide();

}


function unload_disc() {
	    
	console.error("CLIENT DISC ROOM LEAVING.....................");
	disconnect_disc();
	        init_called=false;
	    for (var i = 0; i < localTracks.length; i++) {
		            localTracks[i].dispose();
		        }
	    disc_room.leave();
	    disc_connection.disconnect();
	        $("#clientbox").hide();
	 $("#client-remote-meeting-container").hide();
}





function unload() {
	disconnect();
	init_called=false;
    for (var i = 0; i < localTracks.length; i++) {
        localTracks[i].dispose();
    }
    room.leave();
    connection.disconnect();   
	$("#clientbox").hide();
 $("#client-remote-meeting-container").hide();
}

var isVideo = true;
var flag =false;

/**
 *
 */

function refresh_video()
{
	console.error("in refresh_video.............................");
	for (var i = 0; i < localTracks.length; i++) {
		        localTracks[i].dispose();
	}
	JitsiMeetJS.createLocalTracks({ devices: [ 'audio', 'video' ] })
	.then(onLocalTracks)
	.catch(error => {
		        throw error;
	});
}

function switchVideo() { // eslint-disable-line no-unused-vars

if(inVideo==true){
    isVideo = !isVideo;
    if (localTracks[1]) {
        localTracks[1].dispose();
        localTracks.pop();
    }
    if (isVideo == true){
	    console.error("screen share issues is here........................");
	disc_room.sendCommand(SCREEN_SHARE_STOP,screen_share_stop);
//	    localTracks[1].detach($('#localVideo1')[0]);
	    //room.addTrack(localTracks[1]);
//	    refresh_video();
//	    return ;
	    ip_call_present=false;
	    fromscreen_share=true;
	    refresh();
	    client_videocall();
	    return;
	}	    


    JitsiMeetJS.createLocalTracks({
        devices: [ isVideo ? 'video' : 'desktop' ]
    })
        .then(tracks => {
            localTracks.push(tracks[0]);
            localTracks[1].addEventListener(
                JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log('local track muted'));
            localTracks[1].addEventListener(
                JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log('local track stoped'));
            localTracks[1].attach($('#localVideo1')[0]);
            room.addTrack(localTracks[1]);
        })
        .catch(error => console.log(error));
        }
        else
         alert("You should be in Video call to do screen share");
}

/**
 *
 * @param selected
 */
function changeAudioOutput(selected) { // eslint-disable-line no-unused-vars
    JitsiMeetJS.mediaDevices.setAudioOutputDevice(selected.value);
}

//$(window).bind('beforeunload', unload);
//$(window).bind('unload', unload);



const initOptions = {
    disableAudioLevels: true
};

function init_(){
if(init_called==true)
	return;

init_called=true;
/*if(room!=null){
console.error("Room is not empty....");	
disconnect();
 unload();
} */
console.error("Client init method called........");	
JitsiMeetJS.init(initOptions);
connection = new JitsiMeetJS.JitsiConnection(null, null, options_qa);

connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
    onConnectionSuccess);
connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_FAILED,
    onConnectionFailed);
connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
    disconnect);

JitsiMeetJS.mediaDevices.addEventListener(
    JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
    onDeviceListChanged);

connection.connect();


$("#clientbox").show();
	$('#client-remote-meeting-container').show();
	$('#client-local-meeting-container').show();

}

//init();

function meetingsetup()
{
//     init();
}


function startChat(){
	 
	
    const   inputField = document.getElementById("msginput")
 room.sendTextMessage(inputField.value);
    room.on(    
	    JitsiMeetJS.events.conference.MESSAGE_RECEIVED,
        (id, message, timestamp, nick) => {
            $('#clientchattxt').append(message);
                console.error('Recived messagess eventData ..............................'+message);

            });
			inputField.value="";
 }

function co_browserstart()
{
//TogetherJS(this);
}


var achecked=false;
function toggleAudio()
{

 for (var i = 0; i < localTracks.length; i++)
        if(localTracks[i].getType() == 'audio')
                if(localTracks[i].isMuted())
                        localTracks[i].unmute();
                else
                   localTracks[i].mute()




}
var vchecked=false;


function toggleVideo()
{
	if (inVideo == true){	  
		if (vchecked==false){
			vchecked=true;
			$("#client-local-meeting-container").hide();
			disc_room.sendCommand(VIDEO_MUTE,video_mute_values);
		}
		else{
		vchecked=false;
		$("#client-local-meeting-container").show();
		disc_room.sendCommand(VIDEO_UNMUTE,video_unmute_values);	
		}
	}
	else
		 alert("You are not in Video Call.....");
		
}



function toggleAudio()
	{

		/* for (var i = 0; i < localTracks.length; i++)
		 * if(localTracks[i].getType() == 'audio')
		 * if(localTracks[i].isMuted())
		 * localTracks[i].unmute();
		 * else
		 * localTracks[i].mute()*/

			if (achecked==false){
				for (var i = 0; i < localTracks.length; i++){
					if(localTracks[i].getType() == 'audio'){
						room.removeTrack(localTracks[i]);
						console.error("muted.........");
						/*	localTracks[i].mute();*/
					}
				}
				achecked=true;
			}
		else
		{
			achecked=false;
			for (var i = 0; i < localTracks.length; i++){
				if(localTracks[i].getType() == 'audio'){
					room.addTrack(localTracks[i]);
					console.error("unmuted.........");
					/*localTracks[i].unmute();*/
				}
			}
		}


}


function checkRoom (type) {
           console.error("in side romm checking .....................");
	  if ((room !=null)&(isJoined==true)) {
		  if(fromscreen_share== false){
  		  if(type == 'video'){
  		   if(incoming_call == false){
			    console.error("Making Outgoing Video call......................");
			  disc_room.sendCommand(INCOMING_CALL_VIDEO,video_call_values);
	  		  }
		  }
		  }
		  else
		  {
			  fromscreen_share==false;
		  }
	  if (type == 'audio'){
                  console.error("Making outgoing audio call.......................");
		  if(incoming_call == false)
         	  	disc_room.sendCommand(INCOMING_CALL_AUDIO,audio_call_values);
	 		  }
 	    } else {
	     console.error("Room is still null..................");	    
             setTimeout(checkRoom, 300);  
      }
      }



function refresh()
{
unload();
/*
connection=null;
	room=null;
	isJoined = false;
	localTracks = [];
	remoteTracks = {};
	isVideo = true;
*/
//init();
}


function checkRoomNull (type) 
{
//	if(room == null)

}



function client_videocall(){
if(ip_call_present == false)
{
// checkRoom('video');
//  refresh();

 inVideo=true;
 ip_call_present=true;


/*	
console.error("Client Video call received..........");
$("#clientbox").show();
$('#client-remote-meeting-container').show();
$('#client-local-meeting-container').show();
/*	
JitsiMeetJS.createLocalTracks({ devices: [ 'audio', 'video' ] })
    .then(onLocalTracks)
    .catch(error => {
        throw error;
    });
  */ 
/*	
JitsiMeetJS.createLocalTracks({ devices: [ 'audio', 'video' ],resolution: 50,
constraints: { video: {aspectRatio: 16 / 10 }}
 })
    .then(onLocalTracks)
    .catch(error => {
        throw error;
    });

if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
    JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
        const audioOutputDevices
            = devices.filter(d => d.kind === 'audiooutput');

        if (audioOutputDevices.length > 1) {
            $('#audioOutputSelect').html(
                audioOutputDevices
                    .map(
                        d =>
                            `<option value="${d.deviceId}">${d.label}</option>`)
                    .join('\n'));

            $('#audioOutputSelectWrapper').show();
        }
    });
}
*/
	if(fromscreen_share == true){
		init_video();
	 fromscreen_share=false;
	}
	else{
//	document.getElementById("videoTab").style.display = "none";
	$("#videoTab").show();
	checkrumnull('video');
	}


}
}

function client_audiocall(){

if (ip_call_present==false){

//checkRoom('audio');	
ip_call_present=true
inVideo=false;
inAudio=true;	

	
/*	
refresh();

JitsiMeetJS.createLocalTracks({ devices: ['audio'] })
    .then(onLocalTracks)
    .catch(error => {
        throw error;
    });

if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
    JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
        const audioOutputDevices
            = devices.filter(d => d.kind === 'audiooutput');

        if (audioOutputDevices.length > 1) {
            $('#audioOutputSelect').html(
                audioOutputDevices
                    .map(
                        d =>
                            `<option value="${d.deviceId}">${d.label}</option>`)
                    .join('\n'));

            $('#audioOutputSelectWrapper').show();
        }
    });
}
//checkRoom('audio');
*/

	checkrumnull('audio');

}
}

function process_agent_command(obj)
{

        console.error("Command at client side ....................."+obj['value']+"  "+obj['attributes']['from']);
//	room.removeCommand(obj['value']);
	if(obj['attributes']['from'] == 'customer'){
	
		disc_room.removeCommand(obj['value']);
		return;
	}
	var curr_command=obj['value']
	if(true)
	{


		switch(obj['value']){

		 	case INCOMING_CALL_AUDIO:
				console.error("incoming call audio from....................."+obj['value']);
				 $("#audioAlertDiv").show();
				disc_room.removeCommand(INCOMING_CALL_AUDIO);
				playAudio();
				if(room !=null)
				room.removeCommand(obj['value']);
			//	$("#audioAlertDiv").show();
			//	dialog_show("In coming Audio call",'audio');
					
		        break;
		  	case INCOMING_CALL_VIDEO:
		       		console.error("incoming call video from....................."+obj['value']);
			        $("#videoAlertDiv").show();
					playAudio();
				disc_room.removeCommand(INCOMING_CALL_VIDEO);
				
				if(room !=null)
				room.removeCommand(obj['value']);
			   //	dialog_show("In coming Video call",'video');
			//	$("#videoTab").show();
			//	$("#videoAlertDiv").show();
		        break;
		        case VIDEO_MUTE :
		       		console.error("incoming Video Mute....................."+obj['value']);
		       		disc_room.removeCommand(VIDEO_MUTE);
				if(room !=null)
				room.removeCommand(obj['value']);
			   	$("#client-remote-meeting-container").hide();//show()
		        break;

		        case VIDEO_UNMUTE :
		        	console.error("incoming Video Mute....................."+obj['value']);
				disc_room.removeCommand(VIDEO_UNMUTE);
				if(room !=null)
				room.removeCommand(obj['value']);
				$("#client-remote-meeting-container").show();//hide();
			break;
			case INCOMING_CALL_VIDEO_ACCEPTED :
				console.error("video call accepted. from ...................."+obj['value']);
				disc_room.removeCommand(INCOMING_CALL_VIDEO_ACCEPTED);
				if(room !=null)
				room.removeCommand(obj['value']);
				stopAudio();
				$("#videoAlertDiv").hide();
			/*	inVideo=true;
				isAccept=true;
				for (var i = 0; i < localTracks.length; i++){
				if(localTracks[i].getType() === 'audio'){
				localTracks[i].unmute();
				}
				}
				$("#client-local-meeting-container").show();
				$("#client-remote-meeting-container").show();
				*/
			//	client_videocall();
				
			break;
			case INCOMING_CALL_VIDEO_REJECT :
				console.error("video call rejected....................."+obj['value']);
			   	disc_room.removeCommand(INCOMING_CALL_VIDEO_REJECT);
				if(room !=null)
				room.removeCommand(obj['value']);
                                 stopAudio();
				call_disconnect_consume=true;
			   	Call_Disconnet();//endcall();
		           	//call_disconnected();
			break;
			case INCOMING_CALL_AUDIO_ACCEPTED :
				console.error("audio call accepted....................."+obj['value']);
		                disc_room.removeCommand(INCOMING_CALL_AUDIO_ACCEPTED);
				if(room !=null)
				room.removeCommand(obj['value']);
				$("#audioAlertDiv").hide();
                                stopAudio();
                                
				/*inVideo=false;
				inAudio=true;	
				for (var i = 0; i < localTracks.length; i++){
				if(localTracks[i].getType() === 'audio'){
				localTracks[i].unmute();
				}
				}	
				$("#client-local-meeting-container").hide();
				$("#client-remote-meeting-container").hide();
				*/
			break;
			case INCOMING_CALL_AUDIO_REJECT :
				console.error ("audio call rejected....................."+obj['value']);
			   disc_room.removeCommand(INCOMING_CALL_AUDIO_REJECT);
				if(room !=null)
				room.removeCommand(obj['value']);
				call_disconnect_consume=true;
			   //call_disconnected();
				//
				 stopAudio();
				Call_Disconnet();//endcall();
				$("#client-local-meeting-container").hide();
				$("#client-remote-meeting-container").hide();
			break;
			case INCOMING_CALL_DISCONNECT :
				console.error ("Call Disconnected....................."+obj['value']);
			//	alert("Call Disconnected by Agent.....................");
				$("#discDiv").show();
			   disc_room.removeCommand(INCOMING_CALL_DISCONNECT);
				stopAudio();
				if(room !=null)
				room.removeCommand(obj['value']);
				call_disconnect_consume=true;
			//	call_disconnected();
				call_disconnect_consume=true;
				let foraudio=false;
				if(inAudio == true)
					foraudio=true;
				Call_Disconnet();//endcall();
				incoming_call=false;

				$("#client-local-meeting-container").hide();
				$("#client-remote-meeting-container").hide();
				if(foraudio == true)
				{
				       console.error("This part is only for Audio.................");	
				       foraudio=false;
				     //  refresh();
				}
               		 break;

			case SCREEN_SHARE_STOP :
				console.error ("Screen Share stop....................."+obj['value']);
				disc_room.removeCommand(SCREEN_SHARE_STOP);
				if(room !=null)
				room.removeCommand(obj['value']);
				//if( isVideo == false)
					console.error("Going back to video.....................");
					ip_call_present=false;
				        fromscreen_share=true;
				        refresh();
					client_videocall();
			
				break;

		}
	}
	command_check=curr_command;
	disc_room.removeCommand(curr_command);

}



function init_video()
{
	JitsiMeetJS.init(initOptions);

	connection = new JitsiMeetJS.JitsiConnection(null, null, options_qa);//options);

	connection.addEventListener(
		JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
		onConnectionSuccess);
		connection.addEventListener(
		JitsiMeetJS.events.connection.CONNECTION_FAILED,
		onConnectionFailed);
	connection.addEventListener(
		JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
		disconnect);

	JitsiMeetJS.mediaDevices.addEventListener(
		JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
		onDeviceListChanged);

	connection.connect();

	JitsiMeetJS.createLocalTracks({ devices: [ 'audio', 'video' ] })
	.then(onLocalTracks)
	.catch(error => {
		throw error;
	});

if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
    JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
        const audioOutputDevices
            = devices.filter(d => d.kind === 'audiooutput');

        if (audioOutputDevices.length > 1) {
            $('#audioOutputSelect').html(
                audioOutputDevices
                    .map(
                        d =>
                            `<option value="${d.deviceId}">${d.label}</option>`)
                    .join('\n'));

            $('#audioOutputSelectWrapper').show();
        }
    });
}
	$("#clientbox").show();
        $('#client-remote-meeting-container').show();
        $('#client-local-meeting-container').show();
}


function init_audio()
{
JitsiMeetJS.init(initOptions);

connection = new JitsiMeetJS.JitsiConnection(null, null, options_qa);//options);

connection.addEventListener(
JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
onConnectionSuccess);
connection.addEventListener(
JitsiMeetJS.events.connection.CONNECTION_FAILED,
onConnectionFailed);
connection.addEventListener(
JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
disconnect);

JitsiMeetJS.mediaDevices.addEventListener(
JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
onDeviceListChanged);

connection.connect();

JitsiMeetJS.createLocalTracks({ devices: ['audio'] })
    .then(onLocalTracks)
    .catch(error => {
        throw error;
    });

if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
    JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
        const audioOutputDevices
            = devices.filter(d => d.kind === 'audiooutput');

        if (audioOutputDevices.length > 1) {
            $('#audioOutputSelect').html(
                audioOutputDevices
                    .map(
                        d =>
                            `<option value="${d.deviceId}">${d.label}</option>`)
                    .join('\n'));

            $('#audioOutputSelectWrapper').show();
        }
    });
}

//$("#clientbox").show();
        $('#client-remote-meeting-container').hide();
        $('#client-local-meeting-container').hide();


}



function clearLocalDiv() { 
            var div = document.getElementById("client-local-meeting-container"); 
              
            while(div.firstChild) { 
                div.removeChild(div.firstChild); 
            } 
        } 






function checkrumnull(type)
{
	if(room == null)
	{
			if(type == 'video'){
				if(incoming_call == false){
					console.error("Making Outgoing Video call......................");
					disc_room.sendCommand(INCOMING_CALL_VIDEO,video_call_values);
				}
				init_video();
			}
		if (type == 'audio'){
			console.error("Making outgoing audio call.......................");
			if(incoming_call == false){
				disc_room.sendCommand(INCOMING_CALL_AUDIO,audio_call_values);
			}
			$("#audioTab").show();
			init_audio();		  
		} else {
			console.error("Room is still null..................");
		}
	}
	else {
		console.error(" Agent room is not null.....-2");
		setTimeout(checkrumnull, 300);  
	}
}






function checkrumnull_(type)
{
	if(room == null)
	{
		if(type == 'video'){
			console.error(" Agent room is null...video..-2");
			init_video();
		}
		if (type == 'audio'){
			console.error(" Agent room is null...audio..-2");
			init_audio();
		}

	}
	else {
		console.error(" Agent room is not null.....-2");
		setTimeout(checkrumnull, 300);  
	}
}







/*
let disc_connection = null;
let disc_isJoined = false;
let disc_room = null;
*/


function onConferenceJoined_disc() {
	console.error('disc_conference joined!..........................');
	disc_isJoined = true;
	/* for (let i = 0; i < localTracks.length; i++) {
	 * room.addTrack(localTracks[i]);
	 * }*/
}
function onUserLeft_disc(id) {
	console.error('disc_user left.....................');
	/*  if (!remoteTracks[id]) {
	 *  return;
	 *  }
	 *  const tracks = remoteTracks[id];
	 *
	 *  for (let i = 0; i < tracks.length; i++) {
	 *  tracks[i].detach($(`#${id}${tracks[i].getType()}`));
	 *  }*/
}

/**
 * * That function is called when connection is established successfully
 * */
function onConnectionSuccess_disc() {


	console.error("Room name in client :       ",agentUID);

	disc_room = disc_connection.initJitsiConference(agentUID.toString(), confOptions);
	/*room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
	 * room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, track => {
	 * console.log(`track removed!!!${track}`);
	 * });*/
	disc_room.on(
		JitsiMeetJS.events.conference.CONFERENCE_JOINED,
		onConferenceJoined_disc);
	disc_room.on(JitsiMeetJS.events.conference.USER_JOINED, id => {
		console.log('user join');
		remoteTracks[id] = [];
	});
	disc_room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft_disc);
	/* room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, track => {
	 * console.log(`${track.getType()} - ${track.isMuted()}`);
	 * });*/
	disc_room.on(
		JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
		(userID, displayName) => console.log(`${userID} - ${displayName}`));
	/*room.on(
	 * JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
	 * (userID, audioLevel) => console.log(`${userID} - ${audioLevel}`));
	 * room.on(
	 * JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED,
	 * () => console.log(`${room.getPhoneNumber()} - ${room.getPhonePin()}`));*/
	disc_room.join();


        disc_room.addCommandListener(INCOMING_CALL_AUDIO,process_agent_command);
	                disc_room.addCommandListener(INCOMING_CALL_VIDEO,process_agent_command);
	                disc_room.addCommandListener(VIDEO_MUTE,process_agent_command);
	                disc_room.addCommandListener(VIDEO_UNMUTE,process_agent_command);
	                disc_room.addCommandListener(INCOMING_CALL_VIDEO_ACCEPTED,process_agent_command);
	                disc_room.addCommandListener(INCOMING_CALL_VIDEO_REJECT,process_agent_command);
	                disc_room.addCommandListener(INCOMING_CALL_AUDIO_ACCEPTED,process_agent_command);
			                disc_room.addCommandListener(INCOMING_CALL_AUDIO_REJECT,process_agent_command);
					                disc_room.addCommandListener(INCOMING_CALL_DISCONNECT,process_agent_command);

	                disc_room.addCommandListener(SCREEN_SHARE_STOP,process_agent_command);



}

/**
 * * This function is called when the connection fail.
 * */
function onConnectionFailed_disc() {
	console.error('Connection Failed!');
}

/**
 * * This function is called when the connection fail.
 * */
function onDeviceListChanged(devices) {
	console.info('current devices', devices);
}

/**
 * * This function is called when we disconnect.
 * */
function disconnect_disc() {
	console.log('disconnect!');
	disc_connection.removeEventListener(
		JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
		onConnectionSuccess);
	disc_connection.removeEventListener(
		JitsiMeetJS.events.connection.CONNECTION_FAILED,
		onConnectionFailed);
	disc_connection.removeEventListener(
		JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
		disconnect);
}



function init()
{
	fetchAgentId();
	if(init_called==true)
	        return;
	 console.error("client discussion room started.............");
	init_called=true;

	JitsiMeetJS.init(initOptions);

	disc_connection = new JitsiMeetJS.JitsiConnection(null, null, options_qa);//options);

	disc_connection.addEventListener(
		JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
		onConnectionSuccess_disc);
	disc_connection.addEventListener(
		JitsiMeetJS.events.connection.CONNECTION_FAILED,
		onConnectionFailed_disc);
	disc_connection.addEventListener(
		JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
		disconnect_disc);

	JitsiMeetJS.mediaDevices.addEventListener(
		JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
		onDeviceListChanged);

	disc_connection.connect();
}

function playAudio(){

ringAudio.play();
}

 function stopAudio(){

ringAudio.pause();
}



