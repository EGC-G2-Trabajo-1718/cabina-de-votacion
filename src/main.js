// Importamos el módulo correspondiente
const processing = require('./processing.js');
const restify = require('restify');

// Definimos el método que recibirá la solicitud del exterior.
function canVote(request, response, next) {
    // Este método se encargará de recibir los datos de las solicitudes a votar.
    var voting_form = processing.canVote(request.params.user, request.params.election);
    response.send({ "return": voting_form[0], "reason": voting_form[1]});    
}

// Definimos el método de votación
function vote(request, response, next) {
    // Este método se encargará de recibir la solicitud de votación
    var voting = processing.vote(request.params.id_user, request.params.id_election, request.params.answers);
    response.send(voting[0],voting[1]);    
}

// Creamos el servidor
var server = restify.createServer();
// Definimos los métodos que se usarán de Callback
server.get('/api/check/vote.json', canVote);
server.get('/api/create/vote.json', canVote);

// Finalmente, ejecutamos el servidor:
// En principio usaremos el puerto 80.
server.listen(8080, function() {
    // Avisamos de la activación del servidor.
    console.log("Server "+server.name+" started at URL: "+server.url);
});
