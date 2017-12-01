// Importamos el módulo correspondiente
const processing = require('./processing.js');
const authorization = require('./authorization.js');
const restify = require('restify');

// Definimos el método que recibirá la solicitud del exterior.
function canVote(request, response, next) {
    // Este método se encargará de recibir los datos de las solicitudes a votar.
    //var voting_form = processing.canVote(request.params.user, request.params.election);
    //No envíamos al servidor (se realiza internamente desde esta llamada a la función), se explica dentro la razón
    authorization.getElection(request.params.user, request.params.election, response);
    //response.send({ "return": voting_form[0], "reason": voting_form[1], "election": voting_form[2] });    
}

// Creamos el servidor
var server = restify.createServer();
// Definimos los métodos que se usarán de Callback
server.get('/api/check/vote.json', canVote);

// Finalmente, ejecutamos el servidor:
// En principio usaremos el puerto 80.
server.listen(8080, function() {
    // Avisamos de la activación del servidor.
    console.log("Server "+server.name+" started at URL: "+server.url);
});
