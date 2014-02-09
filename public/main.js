
$(function(){
	var socket = io.connect(window.location.href);
	var $sendMessage = $('#sendMessage');
	var $chat = $('#chat');
	var $message = $('#message');


	$sendMessage.submit(function(e){
		e.preventDefault();
		if($message.val() != ''){
			socket.emit('sendMessage', $message.val());
			$message.val('');
		}
	});

	socket.on('newMessage', function(data){
		$chat.append(data.msg + '<br>');
	});


});