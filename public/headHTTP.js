var net = require('net')
var httpHeaders = require('http-headers')

// create TCP server
net.createServer(function (c) {
  var buffers = []
  c.on('data', buffers.push.bind(buffers))
  c.on('end', function () {
    var data = Buffer.concat(buffers)

    // parse incoming data as an HTTP request and extra HTTP headers
    console.log(httpHeaders(data))
  })
}).listen(5555);
