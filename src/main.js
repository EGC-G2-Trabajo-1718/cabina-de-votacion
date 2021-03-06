// Importamos el módulo correspondiente
var processing = require('./processing.js');
var restify = require('restify');

// Definimos el método que recibirá la solicitud del exterior.
function canVote(request, response, next) {
    // Este método se encargará de recibir los datos de las solicitudes a votar.
    // Obtenemos los atributos
    var election = request.query.election;
    var user = request.query.user;
    processing.canVote(user, election)
      .then(voting_form => {
        response.send({ "return": voting_form[0], "reason": voting_form[1]});
    }).catch(err => {
        response.send(500, "Internal server error");
    });
}

// Definimos el método de votación
function vote(request, response, next) {
    // Se obtienen los parámetros por body
    processing.vote(request.body.id_user, request.body.id_election, request.body.answers).then(voting_form => {
        response.send(voting_form[0], voting_form[1]);
    }).catch(err => {
        response.send(err[0], err[1]);
    })
}

// Creamos el servidor
var server = restify.createServer();
//Esta línea es necesaria para parsear el cuerpo del mensaje (POST)
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
// Definimos los métodos que se usarán de Callback
server.get('/api/check/vote.json', canVote);
server.post('/api/create/vote.json', vote);

// Finalmente, ejecutamos el servidor:
// En principio usaremos el puerto 80.
server.listen(process.env.NODE_ENV=="test"?8080:80, function() {
    // Avisamos de la activación del servidor.
    console.log("Server "+server.name+" started at URL: "+server.url);
});

exports.server = server;