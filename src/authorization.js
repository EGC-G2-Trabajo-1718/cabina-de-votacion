var http = require("http");
var urlVotacion = "https://www.reqres.in";

function getElection(election_id){

	var options = {
		"method": "GET",
		"hostname": url,
		"port": 80,
		//"path":"/api/get/votacion.json?id="+election_id,
		"path": "/api/users?page=2",
		"json":true
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf-8');
		var responseString='';
	
		res.on('data', function(data){
			responseString += data;
		});
		res.on('end', function(){
			console.log(responseString); //Muestra la respuesta por consola
			var responseObject = JSON.parse(responseString);
			success(responseObject);
		});
	});

	req.write(dataString);

	req.end();

}

//METODO PROVISIONAL, HAY QUE ESPERAR A QUE NOS DIGAN COMO HACERLO O SI VA DENTRO DE GETELECTION O SI HAY QUE HACER OTRO METODO MÁS PARA LAS RESPUESTAS
function getQuestions(election_id){

	var options = {
		"method": "GET",
		"hostname": url,
		"port": 80,
		"path":	"/api/get/preguntas.json?id="+election_id,
		"json":true
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf-8');
		var responseString='';
	
		res.on('data', function(data){
			responseString += data;
		});
		res.on('end', function(){
			console.log(responseString); //Muestra la respuesta por consola
			var responseObject = JSON.parse(responseString);
			success(responseObject);
		});
	});

	req.write(dataString);

	req.end();

}

exports.getElection = getElection;
exports.getQuestions = getQuestions;
