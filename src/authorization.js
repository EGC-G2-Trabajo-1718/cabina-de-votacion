var http = require("http");
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



// le paso el username y me devuelve todos los datos del usuario si existe.
function testGetUser(user) {
	// compruebo con .length ya que es más óptimo
	return {
       username : "tansalalv",
       name : "Tania",
       surname : "Salguero Álvarez",
       email : "mail@example.com",
       genre : "Femenino",
       autonomous_community : "Andalucía",
       age : "21",
       role : "USUARIO",
	   // FIXME Esto no lo tiene la wiki de autorización!
	   id_grupo: "31"
   }
}

// Le paso el user_id y el election_id y compruebo restricciones. Si se cumplen devuelvo la encuesta
function testGetElection(user_id, election_id) {
	// Compruebo que existen ambos id
	return {
		id: "1",
		id_censo: "288",
		id_grupo: "31",
		titulo: "Votación sobre consolas",
		descripción: "En esta votación comprobaremos si hay mas gamers de PC o consolas",
		fecha_ini: "31/07/2017 07:07",
		fecha_fin: "31/08/2017 07:07"
	};
};

function getElection(election_id){

	var options = {
		"method": "GET",
		"hostname": urlVotacion,
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

//Metodo para comprobar doble votacion

function getDobleCheck(id_usuario, election_id){
//Paso 1- Establecemos el encabezado
var request = require('request');
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

//Paso 2- Configuramos la solicitudes

var options = {
    url     : "https://almacenamiento.nvotesus.es/api/get/comprobar_voto/"+{id_usuario}+"/"+{election_id},
    method  : 'GET',
    jar     : true,
    headers : headers
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



exports.getUser = getUser;
exports.testGetUser = testGetUser;
exports.getElection = getElection;
exports.testGetElection = testGetElection;
exports.getQuestions = getQuestions;
exports.getDobleCheck = getDobleCheck;
exports.getAuthority = getAuthority;
