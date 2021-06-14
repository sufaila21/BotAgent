/* global $, JitsiMeetJS */
const options_qa = {
            hosts: {
                  domain: 'milliqa.thebanknet.com',
                  muc: 'conference.milliqa.thebanknet.com' // FIXME: use XEP-0030
                        },
	bosh: '//milliqa.thebanknet.com:7173/http-bind', // FIXME: use xep-0156 for that

            // The name of client node advertised in XEP-0115 'c' stanza
             clientNode: 'http://jitsi.org/jitsimeet',

         
          };

const options = {
    hosts: {
        domain: 'jitsi-meet.example.com',
        muc: 'conference.jitsi-meet.example.com' // FIXME: use XEP-0030
    },
    bosh: '//jitsi-meet.example.com/http-bind', // FIXME: use xep-0156 for that

    // The name of client node advertised in XEP-0115 'c' stanza
    clientNode: 'http://jitsi.org/jitsimeet'
};


const options_dev = {
     hosts: {
           domain: 'dev.thebanknet.com',
           muc: 'conference.dev.thebanknet.com' 
           },
          bosh: '//dev.thebanknet.com:6623/http-bind', 
          clientNode: 'http://jitsi.org/jitsimeet',
          id: "jigasi",
          password: "jigasi",
}



const GUEST_WANT_TO_JOIN_PERMISSION = "guest_seeking_permission";
const GUEST_WANT_TO_JOIN_ACCEPTED = "guest_permission_accepted";
const GUEST_WANT_TO_JOIN_REJECTED = "guest_permission_rejected";
const GUEST_DISCONNECTED_CALL="guest_disconnected_call";
const END_DISCUSSION="end_discussion";

const SCREEN_SHARE_STOP="screen_share_stop";
const SCREEN_SHARE_START="screen_share_start";


const GUEST_SCREEN_SHARE_STOP="guest_screen_share_stop";
const GUEST_SCREEN_SHARE_START="guest_screen_share_start";



const guest_seeking_permission = {
value : GUEST_WANT_TO_JOIN_PERMISSION,
attributes:{ from : 'guest',to : 'milli'}
};

const guest_permission_accepted = {
value : GUEST_WANT_TO_JOIN_ACCEPTED,
attributes:{ from : 'guest',to : 'milli'}
};

const guest_permission_rejected = {
value : GUEST_WANT_TO_JOIN_REJECTED,
attributes:{ from : 'guest',to : 'milli'}
};

const guest_disconnected_call = {
value : GUEST_DISCONNECTED_CALL,
attributes:{ from : 'guest',to : 'milli'}
};

const discussion_end = {
value : END_DISCUSSION,
attributes:{ from : 'guest',to : 'milli'}
};

const screen_share_start = {
value : SCREEN_SHARE_START,
attributes:{ from : 'guest',to : 'milli'}
};
const screen_share_stop = {
value : SCREEN_SHARE_STOP,
attributes:{ from : 'guest',to : 'milli'}
};


const guest_screen_share_start = {
	value : GUEST_SCREEN_SHARE_START,
	attributes:{ from : 'guest',to : 'milli'}
};
const guest_screen_share_stop = {
	value : GUEST_SCREEN_SHARE_STOP,
	attributes:{ from : 'guest',to : 'milli'}
};


let already_call_disc=false;
function acceptVideoCall()
{
$("#videoTab").css('display', 'flex');
disc_room.sendCommand(INCOMING_CALL_VIDEO_ACCEPTED,video_call_accept);
incoming_call=true;
already_call_disc=true;
stopAudio();
VideoCall();	
//$("#videoTab").show();
//$("#videoTab").css('display', 'flex');
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
Call_Disconnect();
//stopAudio();
}

function acceptAudioCall()
{
$("#videoAlertDiv").hide();
$("#audioAlertDiv").hide();
$("#discDiv").hide();
$("#videoTab").css('display', 'none');
//$("#audioTab").show();	
$("#audioTab").css('display', 'flex');
disc_room.sendCommand(INCOMING_CALL_AUDIO_ACCEPTED,audio_call_accept);
inVideo=false;
inAudio=true;
incoming_call=true;
already_call_disc=true;	
stopAudio();
AudioCall();
}
function rejectAudioCall()
{
$("#videoAlertDiv").hide();
$("#audioAlertDiv").hide();
$("#discDiv").hide();
$("#videoTab").css('display', 'none');
stopAudio();
disc_room.sendCommand(INCOMING_CALL_AUDIO_REJECT,audio_call_reject);
Call_Disconnect(); 
$("#guest-local-meeting-container").hide();
$("#guest-remote-meeting-container").hide();
stopAudio();
}

function acceptDiscCall()
{
$("#videoAlertDiv").hide();
$("#audioAlertDiv").hide();
$("#discDiv").hide();
$("#videoTab").css('display', 'none');
stopAudio();
//call_disconnect_consume=true;
let foraudio=false;
if(inAudio == true)
foraudio=true;
Call_Disconnet();//endcall();
incoming_call=false;

$("#guest-local-meeting-container").hide();
$("#guest-remote-meeting-container").hide();
if(foraudio == true)
{
console.error("This part is only for Audio.................");
foraudio=false;
}

}


let agentUID='1234';


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
    openBridgeChannel: true
};


let refusesamecommand="";
let connection = null;
let isJoined = false;
let room = null;
let inVideo=false;
let inAudio=false;
let meetingroom="";
let init_status=false;
let confstatus=false;
let localTracks = [];
let a_localTracks =[];
let  remoteTracks = {};
let remote_participent_id=0;
let local_participent_id=0;
let vachecked=false;
let aachecked=false;
let userpresent=false;
let ip_call_present=false;
let ispstndone=false;
let room_status=false;
let isVideo = true;
let disconnect_status=false;
let disconnet_count=0;
let incoming_call=false;
let  vchecked=false;
let  achecked=false;
let pstn_call=false;
let call_type='none';
let joinuser_id=0;
let pstn_join=false;
let in_call=false;
let jitsi_init=false;
let fromscreen_share=false;

let disc_connection = null;
let disc_isJoined = false;
let disc_room = null;
let call_disconnect_consume=false
//let agentUID;
//let src ="https://qa.thebanknet.com:7878/RingTone/Office.mp3";
//let audio = new Audio(src);
let pstn_number;
let pstn_call_process;
let list_remotetrack=[];
let list_remotedivid=[];
let videotracklist=[];
let videotrackcounter=0;
let remotetrackcounter=1;
let disc_event_consume=false;
let audiocall_event_consume=false;
let videocall_event_consume=false;
let disc_room_created=false;
let conf_setup;
let isAudiomute=false;
let isVideomute=false;
let screenshare=false;
let source ="../RingTone/landline-phone-ring-1633.mp3";
let ringAudio = new Audio(source);
let isAgentjoin=false;
let screenVideo=false;
let noOfUserJoin=1;


let drName="disctest23";
let commRoom="3357";


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
		    $('#guest-remote-meeting-container').html(" ");
	//	    $('#guest-remote-meeting-container').append(
	//		    `<div class="local-video"><video autoplay='1'   id='localVideo${i}' height='100%' width='100%' /></div>`);
	            $('#guest-remote-meeting-container').append(`<video autoplay='autoplay' loop controls playsinline  id='localVideo${i}' width='100%' height='100%' />`);
        //	    $('#guest-local-meeting-container').append(
	//	    `<div class="local-video"><video  autoplay='autoplay' loop controls playsinline id='localVideo${i}' height='100%' width='100%' /></div>`);
		    localTracks[i].attach($(`#localVideo${i}`)[0]);
	    } else {
		    $('body').append(`<audio autoplay='1' muted='true' id='localAudio${i}' />`);
		    localTracks[i].attach($(`#localAudio${i}`)[0]);
	    }
	    
	  /*if (localTracks[i].getType() === 'video') {
		$('#client-local-meeting-container').html(" ");
		$('#client-local-meeting-container').append(`<video autoplay='autoplay' loop controls playsinline  id='localVideo${i}' width='100%' height='100%' />`);
            localTracks[i].attach($(`#localVideo${i}`)[0]);

        } else {
            $('body').append(
                `<audio autoplay='1' muted='true' id='localAudio${i}' />`);
            localTracks[i].attach($(`#localAudio${i}`)[0]);
        }*/
        if (isJoined) {
            room.addTrack(localTracks[i]);
        }
    }
}

/**
 * Handles remote tracks
 * @param track JitsiTrack object
 */
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

	if (track.getType() === 'video'){
	let i=0;	
        let str = id;
	let v_id = str.split("video");
        for (let j=0;j<list_remotetrack.length;j++)
		{
		  if (list_remotetrack[j]== v_id[0])
	          {
			for(let k=0;k<v_id[1];k++){
			 let tid='#'+list_remotetrack[j]+'video'+k;
		         let divid="#local-video"+list_remotetrack[j]+'video'+k;		
			  $(tid).hide();
			  $(divid).hide(); 
			  
			}
		  }
		}
	}


	

if (track.getType() === 'video' ) {
let trackpresent=false;
for(let x=0;x<videotracklist.length;x++)
	{
		let str = id;
		let v_id = str.split("video");
		var n = videotracklist[x].search(v_id[0]);
		console.error(" The value of n is .....",n);
	//	if(n >=0)
	//		trackpresent=true;

		if(videotracklist[x].indexOf(v_id[0]) >= 0){
		//	trackpresent=true;
		}
	

			if ((parseInt(v_id[1])%2)==1){
				console.error("Unwanted video found....",videotracklist[x]);
				trackpresent=false;
			}
			        
				

 /*             //     let str = id;
	      //	   let v_id = str.split("video");
	           if(videotracklist[x].indexOf(v_id[0]) >= 0){
			trackpresent=true;   
		   }
		   */
		console.error("customer remote track count",remotetrackcounter,trackpresent,videotracklist[x],v_id[0],x,v_id[1]);
		}
	console.error("Number of user joined.................",noOfUserJoin,"screen Share video ",screenVideo);
//	if((remotetrackcounter >=2)&(trackpresent==false)){//xxx&(screenVideo==false)){
	var class_name="local-video"+id
	list_remotedivid[remotetrackcounter]=class_name;
	$('#guest-local-meeting-container').append(
		`<div class="local-video" id='${class_name}'><video autoplay loop controls playsinline   id='${id}' height='100%' width='100%' /></div>`);
	//$('#guest-local-meeting-container').append(
	//        `<div class="local-video" id='${class_name}'><video autoplay loop controls playsinline   id='${id}' height='100%' width='100%' /></div>`);
//	}else{
//        console.error(" Remote track less than 2>>>>>>>>>>>>>>>>>>>>>>>>>");		
//	$('#guest-remote-meeting-container').html(" ");
//	$('#guest-remote-meeting-container').append(`<video autoplay='1' id='${id}'  height='100%' width='100%'/>`);
       // $('#guest-remote-meeting-container').append(`<video autoplay loop controls playsinline id='${id}'  height='100%' width='100%'/>`);		
//        }
} else {
	$('body').append(
		`<audio autoplay='1' id='${participant}audio${idx}' />`);
}
track.attach($(`#${id}`)[0]);
		


    if (track.getType() === 'video'){
           let i=0;
           let str = id;
           let v_id = str.split("video");
           remotetrackcounter=remotetrackcounter+1;
           list_remotetrack[remotetrackcounter]=v_id[0];
	    videotracklist[videotrackcounter]=id;
	    videotrackcounter=videotrackcounter+1
    }

}

/**
 * That function is executed when the conference is joined
 */
function onConferenceJoined() {
    console.error('conference joined..........');
    isJoined = true;
    for (let i = 0; i < localTracks.length; i++) {
        room.addTrack(localTracks[i]);
    }
    
    for (let i = 0; i < localTracks.length; i++) {
	    isVideomute=true;     
	    localTracks[i].mute();
	  }


	for (let i = 0; i < localTracks.length; i++) {
		if (localTracks[i].getType() === 'audio'){

			localTracks[i].unmute();
		}
		}

	
}

/**
 *
 * @param id
 */


function onUserLeft(id) {
	console.error('user left...............',id);
//	remotetrackcounter = remotetrackcounter - 1;
	const tracks = remoteTracks[id];
	for (let j=1;j<list_remotetrack.length;j++)
	{
	      if (list_remotedivid[j]!= null){	
		if(list_remotedivid[j].indexOf(id) >= 0)
		      {
                       var ddivid=list_remotedivid[j];
		       ddivid='#'+ddivid;
		       $(ddivid).hide();	      
		      }
	      }
               var v_id='#'+id+'video'+j;
	       $(v_id).hide();

	}
	if (!remoteTracks[id]) {
		return;
	}
	for (let i = 0; i < tracks.length; i++) {
		console.error(" error is here in user left....................");
	}

}
/**
 * That function is called when connection is established successfully
 */
function onConnectionSuccess() {
    room = connection.initJitsiConference(commRoom, confOptions);
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
function unload() {
    for (let i = 0; i < localTracks.length; i++) {
        localTracks[i].dispose();
    }
    room.leave();
    connection.disconnect();
    $('#guest-local-meeting-container').html(" ");
    $('#guest-remote-meeting-container').html(" ");	
}


/**
 *
 */
function getback_screen(type)
{
	 screenshare=false;
	disc_room.addCommandListener(SCREEN_SHARE_STOP,process_event);
	disc_room.addCommandListener(GUEST_SCREEN_SHARE_STOP,process_event);
	 isVideo = !isVideo;
	    if (localTracks[1]) {
		            localTracks[1].dispose();
		            localTracks.pop();
		        }
	    JitsiMeetJS.createLocalTracks({
		            devices: [ isVideo ? 'video' : 'desktop' ]
		        }).then(tracks => {
	            localTracks.push(tracks[0]);
	            localTracks[1].addEventListener(
			                    JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
			                    () => console.error('screen share local track muted..................'));
	            localTracks[1].addEventListener(
			                    JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
			                    () =>console.error("this is local track stopped..........."));

	            //localTracks[1].addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,getback_screen);
	                localTracks[1].attach($('#localVideo1')[0]);
	                            room.addTrack(localTracks[1]);
           })

}
function switchVideo_dummy(){

}
function switchVideo() { // eslint-disable-line no-unused-vars
    if((inVideo==true)&&(screenshare==false)){
	disc_room.addCommandListener(SCREEN_SHARE_START,process_event);    
	disc_room.addCommandListener(GUEST_SCREEN_SHARE_START,process_event);
	screenshare=true;	
    isVideo = !isVideo;
    if (localTracks[1]) {
        localTracks[1].dispose();
        localTracks.pop();
    }
    JitsiMeetJS.createLocalTracks({
        devices: [ isVideo ? 'video' : 'desktop' ]
    })
        .then(tracks => {
            localTracks.push(tracks[0]);
            localTracks[1].addEventListener(
                JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.error('screen share local track muted..................'));
            localTracks[1].addEventListener(
                JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () =>getback_screen(isVideo));

	//    localTracks[1].addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,getback_screen);	
            localTracks[1].attach($('#localVideo1')[0]);
            room.addTrack(localTracks[1]);
        })
        .catch(error => console.log(error));
	}
	else
		console.error("You should be in Video call to share the screen");
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

// JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
const initOptions = {
    disableAudioLevels: true
};

function VideoCall(){
	if((ip_call_present == false)&&(disc_room_created==true)){
	ip_call_present=true;
	already_call_disc=true;	
	inVideo=true;
	$("#guest-local-meeting-container").show();
	$("#guest-remote-meeting-container").show();
	//JitsiMeetJS = window.JitsiMeetJS
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
	}
	else
	   console.error(" You are in another Video call......",ip_call_present,disc_room_created);

}




function toggleAudio()
{
	if (ip_call_present == true){
	if(isAudiomute==false){
		isAudiomute=true;
		for (let i = 0; i < localTracks.length; i++) {
			if (localTracks[i].getType() === 'audio'){
				localTracks[i].mute();
			}
		}
	}
	else
	{
		isAudiomute=false;
		for (let i = 0; i < localTracks.length; i++) {
			if (localTracks[i].getType() === 'audio'){

				localTracks[i].unmute();
			}
		}

	}
   }
}



function toggleVideo()
{
	if(ip_call_present == true){
	if(isVideomute==false){
		isVideomute=true;
		for (let i = 0; i < localTracks.length; i++) {
			localTracks[i].mute();
		}
	}
	else
	{
		isVideomute=false;
		for (let i = 0; i < localTracks.length; i++) {
			localTracks[i].unmute();
		}

	}
	}
}








function Call_Disconnect(){

if(ip_call_present== true){
console.error("Call Disconected........................");
//if((incoming_call == false)&
if(call_disconnect_consume==false){
	disc_room.sendCommand(GUEST_DISCONNECTED_CALL,guest_disconnected_call);
}

//$("#disconnectAlertPopup").show();
$("#videoAlertPopup").hide();
$("#audioAlertPopup").hide();
$("#audioTab").css('display', 'none');
$("#videoTab").css('display', 'none');


list_remotetrack=[];
list_remotedivid=[];
videotracklist=[];
videotrackcounter=0;
remotetrackcounter=1;

if(already_call_disc == true){
already_call_disc=false;
}
else{
  console.error("Call disconnected called before......");
 // return;
}

noOfUserJoin=1;
remotetrackcounter=1;	

unload();

if (pstn_join==true)
{
pstn_call=false;
pstn_join=false;
room.hangup();
}
incoming_call=false;
ip_call_present=false;
in_call=false;
//room.kickParticipant(joinuser_id);
inVideo=false;
inAudio=false;
call_type='none';
if(incoming_call ==true){
//	room.kickParticipant(remote_participent_id);
incoming_call=false;
}

/*
for (let i = 0; i < localTracks.length; i++) {
localTracks[i].dispose();
}
*/
//if(room != null)
//room.leave();
$("#guest-remote-meeting-container").hide();
$("#guest-local-meeting-container").hide();
connection=null;
room=null;
isJoined = false;
localTracks = [];
remoteTracks = {};
isVideo = true;
call_disconnect_consume=false;
//$("#videoLayout").hide();
//$("#normalLayout").show();
}
}


function process_event(obj)
{
	if(disc_room_created == false)
	{
	  return;
	}
	console.error("Command at guest side ....................."+obj['value']+"  "+obj['attributes']['from']);
	//	room.removeCommand(obj['value']);
	if(obj['attributes']['from'] == 'guest'){
	disc_room.removeCommand(obj['value']);
	console.error("From guest so returning ....................."+obj['value']+"  "+obj['attributes']['from']);
	return;
	}
	var curr_command=obj['value'];
	if(true)//refusesamecommand != curr_command)
	{
	console.error("state machine for guest only .....");	
	switch(obj['value']){	

	case GUEST_WANT_TO_JOIN_PERMISSION :
	console.error("video call accepted....................."+obj['value']);
	//$("#videoTab").css('display', 'flex');    			
	disc_room.removeCommand(GUEST_WANT_TO_JOIN_PERMISSION);
	//stopAudio();
	if(room !=null)
	room.removeCommand(GUEST_WANT_TO_JOIN_PERMISSION);
	break;
	case GUEST_WANT_TO_JOIN_ACCEPTED :
	console.error("Guest permission accepeted....................."+obj['value']);
	disc_room.removeCommand(GUEST_WANT_TO_JOIN_ACCEPTED);
	if(room !=null)
	room.removeCommand(GUEST_WANT_TO_JOIN_ACCEPTED);
	$("#videoTab").css('display', 'flex');
	incoming_call=true;
	
	VideoCall();
	break;
	case GUEST_WANT_TO_JOIN_REJECTED :
	console.error("Guest permission rejected....................."+obj['value']);
	disc_room.removeCommand(GUEST_WANT_TO_JOIN_REJECTED);
	if(room !=null)
	room.removeCommand(GUEST_WANT_TO_JOIN_REJECTED);
	disc_event_consume=true;
	unload_disc();
	break;
	
	case GUEST_DISCONNECTED_CALL :
	console.error ("Guest permission call disconnected by agent................"+obj['value']);
	//$("#disconnectAlertPopup").show();
	$("#videoAlertPopup").hide();
	$("#audioAlertPopup").hide();
	disc_room.removeCommand(GUEST_DISCONNECTED_CALL);
	if(room !=null)
	room.removeCommand(GUEST_DISCONNECTED_CALL);
	call_disconnect_consume=true;
	Call_Disconnect();
	$("#audioTab").css('display', 'none');
	$("#videoTab").css('display', 'none');
	$("#guest-local-meeting-container").hide();
	$("#guest-remote-meeting-container").hide();
	break;	
	
	case SCREEN_SHARE_START :
	console.error ("Screen Share start....................."+obj['value']);
	disc_room.removeCommand(SCREEN_SHARE_START);
	if(room !=null)
	room.removeCommand(obj['value']);
	//remotetrackcounter = remotetrackcounter - 1;
//if(remotetrackcounter <=2)
	 if (noOfUserJoin <3)		
	 remotetrackcounter = remotetrackcounter;// - 1;
	 else
	  screenVideo=true;		
	console.error("Remote Track counter....On Screen Share..",remotetrackcounter);
	break;



	case SCREEN_SHARE_STOP :
	console.error ("Screen Share stop....................."+obj['value']);
	disc_room.removeCommand(SCREEN_SHARE_STOP);
	if(room !=null)
	room.removeCommand(obj['value']);
	//remotetrackcounter = remotetrackcounter - 1;
//	if(remotetrackcounter <=2)
	if(noOfUserJoin<3)		
	remotetrackcounter = remotetrackcounter;// - 1;
	else 
	screenVideo=false;
	break;


	case END_DISCUSSION:
	console.error ("End Discussion from Agent Side ....................."+obj['value']);		
	disc_room.removeCommand(END_DISCUSSION);
	disc_event_consume=true;
	unload_disc();
	if(room !=null)
	room.removeCommand(obj['value']);			   
	break;

	}


	}
	else
	console.error("state machine for guest at else..."+obj['value']+"  "+obj['attributes']['from']);
	//room.removeCommand(curr_command);
	refusesamecommand=curr_command;		
	disc_room.removeCommand(curr_command);
}




function onConferenceJoined_disc() {
	console.error ('Disc room -----conference joined!');
	disc_isJoined = true;
}
function onUserLeft_disc(id) {
	console.log('Disc room -----------------------user left');	
}
function onUserjoin_disc(id){
	
	remoteTracks[id] = [];
	if(disc_isJoined == true){
		console.error("Agent join the room.....................",id);
		isAgentjoin=true;
		noOfUserJoin=noOfUserJoin+1;
	}
}

/**
 * * That function is called when connection is established successfully
 * */
function onConnectionSuccess_disc() {

		console.error("Room name in agent :       ",agentUID);
		//disc_room = disc_connection.initJitsiConference(agentUID.toString(), confOptions);
		disc_room = disc_connection.initJitsiConference(drName, confOptions);
		disc_room.on(
		JitsiMeetJS.events.conference.CONFERENCE_JOINED,
		onConferenceJoined_disc);
		/*disc_room.on(JitsiMeetJS.events.conference.USER_JOINED, id => {
		console.log('user join');
		remoteTracks[id] = [];
		});*/
		disc_room.on(JitsiMeetJS.events.conference.USER_JOINED,onUserjoin_disc);
		disc_room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft_disc);
		disc_room.on(
		JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
		(userID, displayName) => console.log(`${userID} - ${displayName}`));
		disc_room.join();
		disc_room.addCommandListener(GUEST_WANT_TO_JOIN_PERMISSION,process_event);
		disc_room.addCommandListener(GUEST_WANT_TO_JOIN_ACCEPTED,process_event);
		disc_room.addCommandListener(GUEST_WANT_TO_JOIN_REJECTED,process_event);
		disc_room.addCommandListener(GUEST_DISCONNECTED_CALL,process_event);
                disc_room.addCommandListener(END_DISCUSSION,process_event);
	        disc_room.addCommandListener(SCREEN_SHARE_START,process_event);
	        disc_room.addCommandListener(SCREEN_SHARE_STOP,process_event);
	        disc_room.addCommandListener(GUEST_SCREEN_SHARE_START,process_event);
	        disc_room.addCommandListener(GUEST_SCREEN_SHARE_STOP,process_event);
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
function onDeviceListChanged_disc(devices) {
	console.info('current devices', devices);
}

/**
 * * This function is called when we disconnect.
 * */
function disconnect_disc() {
	console.log('disconnect!');
	disc_connection.removeEventListener(
	JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
	onConnectionSuccess_disc);
	disc_connection.removeEventListener(
	JitsiMeetJS.events.connection.CONNECTION_FAILED,
	onConnectionFailed);
	disc_connection.removeEventListener(
	JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
	disconnect);
}

function startDisc(){
init("2322");
}

function init(type)
{

	agentUID=type;
	console.error("Guest joining to  discussion room .............");
	//JitsiMeetJS = window.JitsiMeetJS
	JitsiMeetJS.init(initOptions);

	disc_connection = new JitsiMeetJS.JitsiConnection(null, null, options_qa);//beta);//options);

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
	wait_for_discussion_room();
	disc_connection.connect();
}


function unload_disc() {
	isAgentjoin=false;
	if(disc_event_consume==false)
	  disc_room.sendCommand(END_DISCUSSION,discussion_end);
	console.error("CUSTOMER  ROOM LEAVING.....................");	
	if(disc_room != null)   
	disc_room.leave();
	disc_connection.disconnect();
	disc_event_consume=false;
	disc_room_created=false;

}


function wait_for_discussion_room()
{
	if((disc_room != null)&(disc_isJoined==true))
	{
		console.error("GUEST DISC ROOM CREATED.....................");
		disc_room_created=true;	
        	 disc_room.sendCommand(GUEST_WANT_TO_JOIN_PERMISSION,guest_seeking_permission);		 

	}
	else {
		setTimeout(wait_for_discussion_room,300); 
	}
}
function playAudio(){

	//ringAudio.play();
}

function stopAudio(){

	//ringAudio.pause();
}
