/*
  NOTE:
    creamos una variable que va a contener la libreria "io" y
    metodo connect para que el cliente se conecte a un servidor socket
    para nuestro caso (http://loaclhost:8080) y le pasamos un objeto
    de configuracion con atributo 'forceNew'
*/

var msj = 'Cual es la direccion a la que desea conectarse';
var ip = prompt(msj,0);

var socket = io.connect('http://192.168.0.17:5555', { 'forceNew': true }); //forceNew permite reutilzar una conexion

/*
  NOTE:
    escuchamos el evento messages
    data tendrá el array de mensajes que envia el servidor
*/
socket.on('mensajes', function(data) {
  //console.log(data);
  cargar(data);
})

/*
  NOTE:
    esta funcion se encargará de colocar los mensajes en en el html
    se encarga de iterar sobre los datos que llegan a traves del socket
      con la funcion 'map' de js.
    y para cada elemento del array pinta una plantilla HTML con el nombre y texto de mensje
    con html dom puedes acceder y cambiar todos los elementos de un documento html
*/
function cargar (data) {
  var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.autor}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" "); //el metodo join pintará los elementos del array separados con un espacio entre los elementos
  //insertamos los elementos en el html
  //get.. es un metodo para acceder a un elemento (id: messages) y innerHTML es una propiedad para obtener el contenido de un elemento
  document.getElementById('mensajes').innerHTML = html;
}

/*
  NOTE:
    la funcion recoge el valor de los input del nombre y texto;
*/
function agregarMensaje() {
  var mensaje = {
    autor: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };
  // envia por el socket con el mensaje new-message para que lo escuche el servidor
  socket.emit('nuevo-mensaje', mensaje);
  document.getElementById('texto').value = "";
  return false;
}
