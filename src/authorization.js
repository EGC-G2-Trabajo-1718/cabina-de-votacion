var http = require("http");
var rest = require("rest");
var urlGrupoAutenticacion= "urlGrupoAutenticacion";
var urlVotacion = "https://www.reqres.in";

function getUser(username){
	var options = {
		"method": "GET",
		"hostname": urlGrupoAutenticacion,
		"port": 80,
		"path":	"/api/index.php?method=getUser&user="+username,
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

function getElection(election_id){
	var options = {
		"method": "GET",
		"hostname": urlVotacion,
		"port": 80,
		"path":"/api/get/votacion.json?id="+election_id,
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

function getAnswers(question_id){
	var options = {
		"method": "GET",
		"hostname": url,
		"port": 80,
		"path":	"/api/get/respuestas.json?id="+question_id,
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

//Metodo para comprobar doble votacion
function getDobleCheck(id_usuario, election_id){
	//Paso 1- Establecemos el encabezado
	var request = require('request');

	//Paso 2- Configuramos la solicitudes
	var options = {
		"method": "GET",
		"url": "https://almacenamiento.nvotesus.es/api/get/comprobar_voto/"+id_usuario+"/"+election_id,
		"port": 80,
		"json": true
	}

	//Paso 3-Comprobamos si ya ha habido una votacion o no
	var compr=false;
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			compr=true;
		}
	});
	return compr;
}

//Implementación de la obtención de las autoridades para el cifrado
function getAuthority(id){
	//Obtenemos la peticion
	var requestURL = 'http://egc-votacion1718.es/api/get/votacion.json?id='+id;
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();

  	var authority = request.response;
	//Devolvemos la clave
	return authority.clave;
}

// Este método se encargará de realizar el guardado del voto, enviándolo a almacenamiento de votos.
function saveVote(ciphered_vote, election_id, user_id, question_id) {
	result = true; // Declaramos la variable global, que será modificada por la función de abajo.
	// Por ahora asumimos que el almacenamiento es por elección y usuario, no por pregunta
	rest("https://almacenamiento.nvotesus.es/api/post/almacenar_voto/"+user_id+"/"+election_id+"/"+question_id)
	  .then(function (response) {
		// Comprobamos que la respuesta es correcta (200)
		if(response.status.code != 200) {
			// Avisamos de un error de envío o otro error.
			result = false;
		}
	});

	return result;
}

exports.getUser = getUser;
exports.getElection = getElection;
exports.getQuestions = getQuestions;
exports.getAnswers = getAnswers;
exports.getDobleCheck = getDobleCheck;
exports.getAuthority = getAuthority;
exports.saveVote = saveVote;