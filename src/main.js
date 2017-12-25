// Importamos el módulo correspondiente
const processing = require('./processing.js');
const restify = require('restify');
const clients = require('restify-clients');

if(process.env.NODE_ENV != "test") {
    // Definimos el método que recibirá la solicitud del exterior.
    function canVote(request, response, next) {
	// Este método se encargará de recibir los datos de las solicitudes a votar.
	var voting_form = processing.canVote(request.params.user, request.params.election);
	response.send({ "return": voting_form[0], "reason": voting_form[1]});    
    }

    // Definimos el método de votación
    function vote(request, response, next) {
	// Se obtienen los parámetros por body
	var voting = processing.vote(request.body.id_user, request.body.id_election, request.body.answers);
	response.send(voting[0],voting[1]);  
    }
    // Mientras el proceso no se esté ejecutando en modo pruebas, se ejecuta el servidor como siempre.
    // Creamos el servidor
    var server = restify.createServer();
    //Esta línea es necesaria para parsear el cuerpo del mensaje (POST)
    server.use(restify.plugins.bodyParser());
    // Definimos los métodos que se usarán de Callback
    server.get('/api/check/vote.json', canVote);
    server.post('/api/create/vote.json', vote);

    // Finalmente, ejecutamos el servidor:
    // En principio usaremos el puerto 80.
    server.listen(8080, function() {
        // Avisamos de la activación del servidor.
        console.log("Server "+server.name+" started at URL: "+server.url);
    });
}else{
    var count = 0
    // Definimos el método que recibirá la solicitud del exterior.
    function canVote(request, response, next) {
	// Este método se encargará de recibir los datos de las solicitudes a votar.
	var voting_form = processing.canVote(request.params.user, request.params.election);
	count = count +1;
	response.send({ "return": voting_form[0], "reason": voting_form[1]});    
    }

    // Definimos el método de votación
    function vote(request, response, next) {
	// Se obtienen los parámetros por body
	var voting = processing.vote(request.body.id_user, request.body.id_election, request.body.answers);
	count = count+1;
	response.send(voting[0],voting[1]);  
    }
    // Mientras el proceso no se esté ejecutando en modo pruebas, se ejecuta el servidor como siempre.
    // Creamos el servidor
    var server = restify.createServer();
    //Esta línea es necesaria para parsear el cuerpo del mensaje (POST)
    server.use(restify.plugins.bodyParser());
    // Definimos los métodos que se usarán de Callback
    server.get('/api/check/vote.json', canVote);
    server.post('/api/create/vote.json', vote);

    var client = clients.createJsonClient({
	url: 'http://localhost:8080',
	version: '*'
    });

    client.get('/api/check/vote.json?user=1&election=1', (err,req,res,obj) => {
	if(err) console.error(err.stack);
	else console.log('Checked the vote '+JSON.stringify(obj,null,2));
    });

    client.post('/api/create/vote.json', {
	id_user: "1", id_election: "1",
	answers: ["respuesta1", "respuesta2", "respuesta3"]
    }, (err,req,res,obj) => {
	if(err) console.error(err.stack);
	else console.log('Created the vote '+JSON.stringify(obj,null,2));
    });

    // Finalmente, ejecutamos el servidor:
    // En principio usaremos el puerto 80.
   if(count<2){
    server.listen(8080, function() {
        // Avisamos de la activación del servidor.
        console.log("Server "+server.name+" started at URL: "+server.url);
    });
   }else{
    server.close();
   }
}
    
// Para las pruebas, exportamos las funciones de llamada
exports.canVote = canVote;
exports.vote = vote;
