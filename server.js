var express = require('express'),
	app 	= express(),
	server 	= require('http').createServer(app),
	io 		= require('socket.io').listen(server),
	cons 	= require('consolidate');

server.listen(8090, function(req){
	console.log("Escuchando en el puerto 8090");
});

// Configuracion de vistas
app.engine('.html', cons.swig);
app.set('view engine', 'html');

app.use(express.static('./public'))

app.get('/', function(req, res) {
	res.render('index.html', {titulo: 'Mini Chat'});
});

io.sockets.on('connection', function(socket){
	socket.on('sendMessage', function(data){ // Enviado por el cliente
		//io.sockets.emit('newMessage', {msg: data}); // Enviado por el server
		socket.broadcast.emit('newMessage', {msg: data});
	});
});