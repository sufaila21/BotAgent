

var server = 'milli.thebanknet.com';
var BOSH_SERVICE = 'https://milli.thebanknet.com:5281/http-bind';
var ROOM = 'localhost@conference.' + server;
var ROOM_SERVICE = 'conference.' + server;
var clientConnection = null;
var toid =null;
var sessionID = null;
function log(msg) {
    $('#log').append('<div></div>').append(document.createTextNode(msg));
    console.log(msg);
}

function onConnect(status) {
    if (status == Strophe.Status.CONNECTING) {
        log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
        log('Strophe failed to connect.');
        $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
        log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
        log('Strophe is disconnected.');
       $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
        log('Strophe is connected.');
		sessionID = clientConnection._proto.sid;
		// alert(" session id1"+connection._proto.sid);
	  // alert(" session id2"+connection.sid);
       // $('#to').get(0).value = connection.jid; // full JID
	   //alert(" sendMessage"+toid);
	   clientConnection.jid =toid;
        // set presence
        clientConnection.send($pres());
        // set handlers
        clientConnection.addHandler(onMessage, null, 'message', null, null, null);
        clientConnection.addHandler(onSubscriptionRequest, null, "presence", "subscribe");
        clientConnection.addHandler(onPresence, null, "presence");
      
        //listRooms();
    }
}

function onMessage(msg) {
	//alert("In onMessage function");
    var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');
    const mainDiv = document.getElementById("mainChat");
	  const surveyDiv = document.getElementById("surveyAtEnd");
    let userDiv = document.createElement("div");
    var timenow =new Date().toLocaleTimeString();
    userDiv.id = "user";
    
  if (type == "chat" && elems.length > 0) {
        var body = elems[0];   
		 var sentmsg = Strophe.getText(body);
		// userDiv.innerHTML = `Agent:<span id="user-response">${sentmsg}</span>`;
	   if(sentmsg.includes("CHAT_CLOSED_DISCONNECT_TRIGGER")){
	       // surveyDiv.show();
		 $('#surveyAtEnd').show();
		 mainDiv.appendChild(surveyDiv);
	   }else if(sentmsg.includes("FILE")){
		   var array = sentmsg.split("::"); 
		   var type=array[1].split(".");
		   if (type=='pdf'){
			   img='../images/pdfIcon.svg';
		   }else{
			   if(type=="doc" || type=="docx")
				   img='../images/pdfIcon.svg';
		   }
		   
		   userDiv.className ='msg left-msg';
     userDiv.innerHTML = `<div class="msg-img" style="background-image: url(../images/agent.svg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">Agent</div><div  class="msg-info-time">${timenow}</div></div><div class="file-upload-name"><div class="img-wrapper"><img src="../images/pdfIcon.svg"} /></div><a href=${array[2]} target="_blank">${array[1]}</a></div></div>`;	 
           mainDiv.appendChild(userDiv);
		   
  	 }else{
		 userDiv.className ='msg left-msg';
     userDiv.innerHTML = `<div class="msg-img" style="background-image: url(../images/agent.svg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">Agent</div><div  class="msg-info-time">${timenow}</div></div><div class="msg-text">${sentmsg}</div></div>`;	 
           mainDiv.appendChild(userDiv);
        }
    }
    // we must return true to keep the handler alive.  
    // returning false would remove it after it finishes.
    return true;
}
 var name;
function sendMessage(mesg) {
	
//	   alert("Calling sendMessage function");
	const mainDiv = document.getElementById("mainChat");
 let userDiv = document.createElement("div");
 var timenow =new Date().toLocaleTimeString();

  var clientMsg;
  userDiv.id = "user";
  //document.getElementById("msginput").value = '';
 //userDiv.innerHTML = `You: <span id="user-response">${mesg}</span>`;
    if(mesg.includes("Data")){
		var array = mesg.split(":"); 
		clientMsg = array[3];
		name = array[1]
		
		userDiv.className ='msg right-msg';
 userDiv.innerHTML = `<div class="msg-img" style="background-image: url(../images/boy.svg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">${name}</div><div  class="msg-info-time">${timenow}</div></div><div class="msg-text">${clientMsg}</div></div>`;
	}else if(mesg.includes("http")){
		   var farray = mesg.split("::"); 
		   var type=farray[0].split(".");
		   if (type=='pdf'){
			   img='../images/pdfIcon.svg';
		   }else{
			   if(type=="doc" || type=="docx")
				   img='../images/pdfIcon.svg';
		   }
		   
		   userDiv.className ='msg right-msg';
     userDiv.innerHTML = `<div class="msg-img" style="background-image: url(../images/boy.svg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">${name}</div><div  class="msg-info-time">${timenow}</div></div><div class="file-upload-name"><div class="img-wrapper"><img src="../images/pdfIcon.svg"} /></div><a href=${farray[1]} target="_blank">${farray[0]}</a></div></div>`;	 
           mainDiv.appendChild(userDiv);
		   mesg='FILE'+'::'+mesg;
  	 }else{
		clientMsg =mesg;
	
	userDiv.className ='msg right-msg';
 userDiv.innerHTML = `<div class="msg-img" style="background-image: url(../images/boy.svg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">${name}</div><div  class="msg-info-time">${timenow}</div></div><div class="msg-text">${clientMsg}</div></div>`;
	
	 }
	mainDiv.appendChild(userDiv);
	
 toid ='jitsi1@milli.thebanknet.com';
  var m =  $msg({to: 'jitsi1@milli.thebanknet.com', from: 'milli1@milli.thebanknet.com', type: 'chat'}).c('body').t(mesg);
    
//	alert(" sendMessage"+mesg);
   clientConnection.send(m);
  

    
}

function getsessionID() {
	return sessionID;
}

function sendMessageAgent(mesg) {
	  // alert("Calling sendMessage function");
	const mainDiv = document.getElementById("chattxt");
 let userDiv = document.createElement("div");
  userDiv.id = "user";
  document.getElementById("sendtxt").value = '';
 userDiv.innerHTML = `You: <span id="user-response">${mesg}</span>`;
    mainDiv.appendChild(userDiv);
 toid ='milli2@milli.thebanknet.com';
  var m =  $msg({to: 'milli3@milli.thebanknet.com', from: 'milli1@milli.thebanknet.com', type: 'chat'}).c('body').t(mesg);
    
	//alert(" sendMessage"+mesg);
   clientConnection.send(m);
  

	
	
	
 //   log('CHAT: Send a message to ' + $('#to').get(0).value + ': ' + msg);

    
}

var fileUrl='';
//Send Attachment
function getfileUrl() {
	return fileUrl;
}
async function addAttachment(info){
 //file="/C:/Users/Rekha/Desktop/RChat.pdf";
  console.log("Filename:::",info);
  var urls = 'https://milliqa.thebanknet.com:6625/milli/Document/Customer';	
  const  formData = new FormData();

   formData.append("file", info);
   
    const requestOptions = {	
      method: "POST",	
      headers: {	
        'Accept': '*/*',
         'Access-Control-Allow-Origin': '*'
		
      },	
	   body:formData,

    };	
    fetch(urls, requestOptions)	
    .then(async response => {	
    const data = await response.json();	
   
      fileUrl=info+'::'+data.url;
      sendMessage(data.fileName+'::'+data.url);
      
  
     })	
     .catch(error => {	
     	
     console.error('There was an error!', error);	
     });	

console.log("fileUrl ",fileUrl);	
    //return fileUrl;
}




function setStatus(s) {
    log('setStatus: ' + s);
    var status = $pres().c('show').t(s);
    clientConnection.send(status);
}

function subscribePresence(jid) {
    log('subscribePresence: ' + jid);
    clientConnection.send($pres({
        to: jid,
        type: "subscribe"
    }));
}

function getPresence(jid) {
    log('getPresence: ' + jid);
    var check = $pres({
        type: 'probe',
        to: jid
    });
    clientConnection.send(check);
}

function getRoster() {
    log('getRoster');
    var iq = $iq({
        type: 'get'
    }).c('query', {
        xmlns: 'jabber:iq:roster'
    });
    clientConnection.sendIQ(iq, rosterCallback);
}

function rosterCallback(iq) {
    log('rosterCallback:');
    $(iq).find('item').each(function () {
        var jid = $(this).attr('jid'); // The jabber_id of your contact
        // You can probably put them in a unordered list and and use their jids as ids.
        log(' >' + jid);
    });
}

function onSubscriptionRequest(stanza) {
    if (stanza.getAttribute("type") == "subscribe") {
        var from = $(stanza).attr('from');
        log('onSubscriptionRequest: from=' + from);
        // Send a 'subscribed' notification back to accept the incoming
        // subscription request
        clientConnection.send($pres({
            to: from,
            type: "subscribed"
        }));
    }
    return true;
}

function onPresence(presence) {
    log('onPresence:');
    var presence_type = $(presence).attr('type');
    var from = $(presence).attr('from');
    if (!presence_type) presence_type = "online";
    log(' >' + from + ' --> ' + presence_type);
    if (presence_type != 'error') {
        if (presence_type === 'unavailable') {
            // Making contact as offline
        } else {
            var show = $(presence).find("show").text();
            if (show === 'chat' || show === '') {
                // Making contact as online
            } else {
                // etc...
            }
        }
    }
    return true;
}

function listRooms() {
    clientConnection.muc.listRooms(mydomain, function (msg) {
        log("listRooms - success: ");
        $(msg).find('item').each(function () {
            var jid = $(this).attr('jid'),
                name = $(this).attr('name');
            log(' >room: ' + name + ' (' + jid + ')');
        });
    }, function (err) {
        log("listRooms - error: " + err);
    });
}

function enterRoom(room) {
    log("enterRoom: " + room);
    clientConnection.muc.init(clientConnection);
    clientConnection.muc.join(room, $('#jid').get(0).value, room_msg_handler, room_pres_handler);
}

function room_msg_handler(a, b, c) {
    log('MUC: room_msg_handler');
    return true;
}

function room_pres_handler(a, b, c) {
    log('MUC: room_pres_handler');
    return true;
}

function exitRoom(room) {
    log("exitRoom: " + room);
}

function rawInput(data) {
    console.log('RECV: ' + data);
}

function rawOutput(data) {
    console.log('SENT: ' + data);
}



function chatinit(username,pwd) {

  //  $('#jid').get(0).value = "username@mydomain.com";
   // $('#pass').get(0).value = "userpassword";

  // alert("Calling Chatinit function" +username+"::"+pwd);
        var url = BOSH_SERVICE;
        clientConnection = new Strophe.Connection(url);
        clientConnection.rawInput = rawInput;
        clientConnection.rawOutput = rawOutput;
        
            clientConnection.connect(username, pwd, onConnect);
        
    
}


$(document).ready(function () {

   // $('#jid').get(0).value = "username@mydomain.com";
   // $('#pass').get(0).value = "userpassword";

   /* $('#connect').bind('click', function () {
        var url = BOSH_SERVICE;
        connection = new Strophe.Connection(url);
        connection.rawInput = rawInput;
        connection.rawOutput = rawOutput;
        var button = $('#connect').get(0);
        if (button.value == 'connect') {
            button.value = 'disconnect';
            connection.connect($('#jid').get(0).value, $('#pass').get(0).value, onConnect);
        } else {
            button.value = 'connect';
            connection.disconnect();
        }
    }); */

    $('#btnsendMsg').bind('click', function () {
        var msg = $('#msginput').val();
        sendMessage(msg);
		// $('#msginput').val()='';
    });

$('#btnsend').bind('click', function () {
        var msg = $('#sendtxt').val();
        sendMessageAgent(msg);
		// $('#msginput').val()='';
    });
    $('#btnGetPres').bind('click', function () {
        var jid = $('#to').val();
        getPresence(jid);
    });

    $('#btnSubPres').bind('click', function () {
        var jid = $('#to').val();
        subscribePresence(jid);
    });

    $('#btnRoster').bind('click', function () {
        getRoster();
    });

    $('#btnAway').bind('click', function () {
        setStatus('away');
    });

    $('#room').val(ROOM);

    $('#btnEnter').bind('click', function () {
        enterRoom($('#room').val());
    });

    $('#btnExit').bind('click', function () {
        exitRoom($('#room').val());
    });

});

