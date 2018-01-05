var main = require('./../main');
var processing = require('./../processing');
var clients = require('restify-clients');

var count = 0;

var client = clients.createJsonClient({
	url: 'http://localhost:8080',
	version: '*'
});
//Tests de canVote
client.get('/api/check/vote.json?user_id=paco1&election_id=001', (err,req,res,obj) => {
	if(err) console.error(err.stack);
	else console.log('Checked the vote '+JSON.stringify(obj,null,2));
	count = count +1;
});

client.get('/api/check/vote.json?user_id=javi1&election_id=001', (err,req,res,obj) => {
	if(err) console.error(err.stack);
	else console.log('Checked the vote '+JSON.stringify(obj,null,2));
	count = count +1;
});

client.get('/api/check/vote.json?user_id=javi1&election_id=002', (err,req,res,obj) => {
	if(err) console.error(err.stack);
	else console.log('Checked the vote '+JSON.stringify(obj,null,2));
	count = count +1;
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
