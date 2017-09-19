// IDEA: Servidor de node
/*
  NOTE:
    en CLI ejecutamos "npm init -y" para generar un package.json con las opciones por defecto
    En el servidor de node usaremos una libreria llamada Expres.
    Para utilizar esta libreria necesitamos hacer un "npm install express --save",
  "--save" es para que lo guarde en el "package.json".
    Para usar sus funcionalidades hacemos lo sigiente:
*/
var express = require('express'); //llama a la libreria
var app = express(); //ejecuto express

/*
  NOTE:
    La variable "app" contiene la ejecucion de la libreria express.
    En express lo conviene crear el servidor con http.
    Ahora creamos el servidor:
*/
var server = require('http').createServer(app);
/*
  NOTE:
    Podemos utilizar "express" como servidor pero para que funcione
  webSocket utilizamos "socket.io".
    A este objeto "socket.io" le pasamos el servidor "server" que creamos.
*/
var io = require('socket.io')(server); //contiene toda la funcionalidad de webSocket

//var ip = require('ip');
//'messages'
var mensajes = [{
  id: 1,
  text: "Hola soy un mensaje",
  autor: "Juan"
}];

/*
  NOTE:
    indicamos la ruta que tendran nuestros ficheros estaticos
    para eso usamos express.static
    'public' es la carpeta donde se encuentra index.html y main.js
*/
app.use(express.static('public'));

/*
  NOTE:
    vamos a mostrar por el navegar un mensaje
    cuando app reciba un get en la ruta raiz '/' se active la siguiente funcion:
    que tiene como parametro req y res y que envie un status 200 indicando que todo
    llego bien y que de un mensaje
*/
//app.get('/hello', function(req, res) {
//  res.status(200).send("Hola Mundo");
//});

/*
  NOTE:
    con on vamos a escuchar un determinada mensaje ('connect') que le llegue
    del navegador o de otro servidor
    cuando reciba ese mensaje va a devolver una funcion con los parametros
    el socket que esta abierto en ese momento (ese cliente que ha mandado el mensaje en ese momento)
    dentro de este metodo enviaremos el array de objetos mensaje con el evento 'messages'
*/
//users = {};
io.on('connection', function(socket) {
/*  var user_id = 1;//socket.decoded_token.user;


  if(users[user_id] === undefined){
      users[user_id] = {"socket": socket};
  } else {
      console.log('Se ha connectado otro usuario ' + user_id);
    }
    console.log("User Connect: " + user_id + " SocketID: " + socket.id);
  //console.log(ip.address());
  */
  console.log('Alguien se ha conectado con Sockets'); //mostramos por consola el siguiente mensaje

  socket.emit('mensajes', mensajes); //el evento messages lo recogemos del cliente
  //el socket escuchará el evento new-message y cuando llegue traera consigo los datos en data
  socket.on('nuevo-mensaje', function(data) {
    //añadimos esos nuevos datos que llegan a data al array mensajes
    mensajes.push(data);
    //notificara a todos los clientes sockets conectados
    io.sockets.emit('mensajes', mensajes);
  });
});

/*users = {}
ids_disconnect = []

io.of('/example')
    .on('connection', function (socket) {
        var user_id = socket.decoded_token.user;


        if(users[user_id] === undefined){
            users[user_id] = {"socket": socket};
        } else {
            console.log('Se ha connectado otro usuario ' + user_id);
            ids_disconnect.push(users[user_id].socket.id);
            users[user_id].socket.disconnect(true);
            users[user_id] = {"socket": socket};
        }

        console.log("User Connect: " + user_id + " SocketID: " + socket.id);



        //disconnect client
        socket.on('disconnect', function () {
            console.log('User Disconnect ' + user_id);
            if(ids_disconnect.indexOf(socket.id) != -1){
                console.log('Disconnect Force: ' + user_id );                    ids_disconnect.splice(ids_disconnect.indexOf(socket.id),1)
            } else {
                delete users[user_id];
                socket.disconnect(true)
            }
        });
    });
*/
var port = process.env.PORT || 5555;
server.listen(port, function() {
  console.log("Servidor corriendo en http://192.168.0.17:5555");
});
