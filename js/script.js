$(document).ready(function() {

    var like = document.querySelector('#like');
    var dislike = document.querySelector('#dislike');

    like.addEventListener('click', function() {

        if (dislike.classList.contains('dislike')) {
            dislike.classList.remove('dislike');
        }
        this.classList.toggle('like');

    });

    dislike.addEventListener('click', function() {

        if (like.classList.contains('like')) {
            like.classList.remove('like');
        }
        this.classList.toggle('dislike');

    });

    /*Mute/UnMute toggle*/
    $('.mute').click(function() {
        $(this).find('i').toggleClass('fa-microphone fa-microphone-slash')
    });
    
    /*Video ON/OFF Toggle*/
    $('.video-camera').click(function() {
        $(this).toggleClass('active')
    });

    /*Video Screen share Toggle*/
    $('.screen-share').click(function() {
        $(this).toggleClass('active')
    });

	/*Call accept*/
/*    $('.call-controls .accept').click(function() {
        $('.call-controls .mute').css('display', 'block');
        $('.call-controls .accept').css('display', 'none');
    });*/

    /*Call reject*/
/*    $('.call-controls .reject').click(function() {
        $('.call-controls .mute').css('display', 'none');
        $('.call-controls .accept').css('display', 'block');
    });*/


    /*Video Call screen*/

    $('.video-call').click(function() {
       // $('.video-chat').slideToggle("slow");
       // $('.video-chat').css('display', 'flex');
    });

    /*Audio Call screen*/
	
    $('.audio-call').click(function() {
        //$('.audio-chat ').slideToggle("slow");
        //$('.audio-chat ').css('display', 'flex');
    });

    /*Chat open screen*/
    $('.chat-toggler .agent-image-wrapper,.chat-toggler .initial-chat,.close-btn,.minimize-btn').click(function() {
        $('.msger').slideToggle("slow");
        $('.msger').css('display', 'flex');
    });

    /*Initial chat closer*/
	$( ".initial-chat-close" ).click(function() {
	    $( ".initial-chat-close,.initial-chat" ).fadeOut( "slow", function() {
	      $( ".initial-chat-close,.initial-chat" ).remove();
	    });
	});

    /*Tooltip*/
    $(function () {
	  $('[data-toggle="tooltip"]').tooltip({container: 'body',trigger : 'hover'});
	});
	$(".close-btn,.initial-chat-close").click(function(){
	  $("[data-toggle='tooltip']").tooltip('hide');
	});



	/*Scroll down when sent chat*/
        function updateScroll(){
               $('.msger-chat').scrollTop($('.msger-chat')[0].scrollHeight);
              }
            $( ".msger-send-btn" ).click(function() {
                updateScroll();
          });  

        //   Removing File attached items
            $('#fileList').on("click", "li span", function () {
                $(this).closest('li').remove();
            });
});
