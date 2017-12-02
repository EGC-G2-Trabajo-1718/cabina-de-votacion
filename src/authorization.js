var http = require("http");
var url= "urlGrupoAutenticacion";
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
function getElection(user_id, election_id) {
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
		
exports.getUser = getUser;
exports.testGetUser = testGetUser;
exports.getElection = getElection;
