var main = require('./../main');
var processing = require('./../processing');
var clients = require('restify-clients');

var count = 0;

var client = clients.createJsonClient({
	url: 'http://localhost:8080',
	version: '*'
});
//Tests de canVote
console.log("Tests de la funcion canVote");
console.log("===========================");

console.log("Test positivo");
console.log(processing.canVote(1, 1));

console.log("Test elección no existente");
console.log(processing.canVote(1, 0));

console.log("Test usuario no existente");
console.log(processing.canVote(0, 1));

console.log("Test fecha de elección expirada");
console.log(processing.canVote(1, 3));

console.log("Test elección no perteneciente al grupo del usuario");
console.log(processing.canVote(1, 2));

console.log("Test el usuario no ha votado ya en dicha elección");
console.log(processing.canVote(1, 1));

// Prueba del sistema
client.get('/api/check/vote.json?user=1&election=1', (err, req, res, obj) => {
    if(err){
        console.error(err.stack);
    } else {
        console.log("Checked vote with user 1 and election 1");
        count++;
    }
});

//Tests de vote
client.post('/api/create/vote.json', {
	id_user: "1", id_election: "1",
	answers: ["respuesta1", "respuesta2", "respuesta3"]
}, (err,req,res,obj) => {
	if(err) console.error(err.stack);
	else console.log('Created the vote '+JSON.stringify(obj,null,2));
	count = count +1;
});

if(count==4){
	main.server.close();
}
