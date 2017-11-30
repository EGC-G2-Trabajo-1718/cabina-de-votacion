var http = require("http");
var url= "urlGrupoAutenticación";
function getUser(username){

	var options = {
		"method": "GET",
		"hostname": url,
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
