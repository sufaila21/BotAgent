

var server = 'milli.thebanknet.com';
var BOSH_SERVICE = 'https://milli.thebanknet.com:5281/http-bind';
var ROOM = 'localhost@conference.' + server;
var ROOM_SERVICE = 'conference.' + server;
var connection = null;
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
		sessionID = connection._proto.sid;
		// alert(" session id1"+connection._proto.sid);
	  // alert(" session id2"+connection.sid);
       // $('#to').get(0).value = connection.jid; // full JID
	   //alert(" sendMessage"+toid);
	   connection.jid =toid;
        // set presence
        connection.send($pres());
        // set handlers
        connection.addHandler(onMessage, null, 'message', null, null, null);
        connection.addHandler(onSubscriptionRequest, null, "presence", "subscribe");
        connection.addHandler(onPresence, null, "presence");
      
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
 let userDiv = document.createElement("div");
 var timenow =new Date().toLocaleTimeString();
  userDiv.id = "user";
    if (type == "chat" && elems.length > 0) {
        var body = elems[0];
		//agent.svg
      //  log('CHAT: I got a message from ' + from + ': ' + Strophe.getText(body));
		var sentmsg = Strophe.getText(body);
		// userDiv.innerHTML = `Agent:<span id="user-response">${sentmsg}</span>`;
		 
		 userDiv.className ='msg left-msg';
 userDiv.innerHTML = `<div class="msg-img" style="background-image: url(../images/agent.svg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">Agent</div><div  class="msg-info-time">${timenow}</div></div><div class="msg-text">${sentmsg}</div></div>`;
	
		 
           mainDiv.appendChild(userDiv);

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
	}else
		clientMsg =mesg;
	
	userDiv.className ='msg right-msg';
 userDiv.innerHTML = `<div class="msg-img" style="background-image: url(../images/boy.svg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">${name}</div><div  class="msg-info-time">${timenow}</div></div><div class="msg-text">${clientMsg}</div></div>`;
	
	
	mainDiv.appendChild(userDiv);
	
 toid ='milli3@milli.thebanknet.com';
  var m =  $msg({to: 'milli3@milli.thebanknet.com', from: 'milli1@milli.thebanknet.com', type: 'chat'}).c('body').t(mesg);
    
//	alert(" sendMessage"+mesg+"value sent::"+m);
   connection.send(m);
  

    
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
  var m =  $msg({to: 'milli2@milli.thebanknet.com', from: 'milli3@milli.thebanknet.com', type: 'chat'}).c('body').t(mesg);
    
	//alert(" sendMessage"+mesg);
   connection.send(m);
  

	
	
	
 //   log('CHAT: Send a message to ' + $('#to').get(0).value + ': ' + msg);

    
}
function setStatus(s) {
    log('setStatus: ' + s);
    var status = $pres().c('show').t(s);
    connection.send(status);
}

function subscribePresence(jid) {
    log('subscribePresence: ' + jid);
    connection.send($pres({
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
    connection.send(check);
}

function getRoster() {
    log('getRoster');
    var iq = $iq({
        type: 'get'
    }).c('query', {
        xmlns: 'jabber:iq:roster'
    });
    connection.sendIQ(iq, rosterCallback);
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
        connection.send($pres({
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
    connection.muc.listRooms(mydomain, function (msg) {
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
    connection.muc.init(connection);
    connection.muc.join(room, $('#jid').get(0).value, room_msg_handler, room_pres_handler);
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
        connection = new Strophe.Connection(url);
        connection.rawInput = rawInput;
        connection.rawOutput = rawOutput;
        
            connection.connect(username, pwd, onConnect);
        
    
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

