var auth = require('./authorization.js');
var encryptor = require('./encryptor.js');

function canVote(user_id, election_id) {
    // Obtenemos la elección
    var election = auth.getElection(election_id);
    // Comprobamos si está vacia
    if(!election) {
        return [false, "election_not_found"];
    }
    // Ahora obtenemos el usuario
    var user = auth.getUser(user_id);
    if(!user) {
        return [false, "user_not_found"];
    }
    // Realizamos las comprobaciones de que pueda votar
    // Primero, comprobamos que la fecha de la votación no ha pasado:
    // Al estar la fecha en un formato no reconocido por JS, necesitamos dividirlo y pasarlo por el constructor
    var start_date = new Date(election.fecha_ini.substr(6, 4), election.fecha_ini.substr(3, 2) - 1
        ,election.fecha_ini.substr(0, 2),election.fecha_ini.substr(11, 2),
         election.fecha_ini.substr(14, 2), 0);
    var end_date = new Date(election.fecha_fin.substr(6, 4), election.fecha_fin.substr(3, 2) - 1
        ,election.fecha_fin.substr(0, 2),election.fecha_fin.substr(11, 2),
         election.fecha_fin.substr(14, 2), 0);
    var actual_date = new Date();

    // Si no está fuera del rango de votación.
    if(!(start_date < actual_date && end_date > actual_date)) {
        return [false, "election_not_open"];
    }

    // Despues hacemos comprobaciones del usuario
    // Si el usuario no está en el grupo que puede votar:
    if(user.id_grupo != election.id_grupo) {
        return [false, "cant_vote"];
    }

    var election = auth.getDobleCheck(user_id, election_id);
    //Si devuelve true no podra votar de nuevo
    if(election){
      return [false, "already_voted"];
    }
    // Si todo lo anterior es correcto, podemos admitir al usuario a votar
    return [true, "can_vote"];
}


function vote(id_user, id_election, answers) {
	var canvote = canVote(id_user, id_election);
	// Comprobamos que el usuario pueda votar en esa encuesta usando la función canVote
	if(canvote[1]=="can_vote"){
		//Obtenemos la clave con la que vamos a encriptar el voto
		var key = auth.getAuthority(id_election);
		// Procedemos a encriptar 
        var encrypted_answers = encryptor.encrypt_vote(answers,key);
        // Comprobamos que el envío a almacenamiento es correcto:
        if(!authorization.saveVote(encrypted_answers, id_election, id_user)) {
	    // Si no es correcto se mostrará el mensaje de error en el envío
            return [500, JSON.stringify({"result": false, "reason":"error_sending"})];
		} else {
	    // En caso de éxito se enviará el voto 
            return [200,JSON.stringify({"result":true,"vote":{"id_user":id_user,"id_election":id_election,"encrypted_answers":encrypted_answers}})];
        } 
	// Tanto si no se muestra la votación como el usuario, en ambos casos se lanzará un código de estado 404 y la razón del mismo
	}else if(canvote[1]=="election_not_found"){
		return [404,JSON.stringify({"result":false,"reason":canvote[1]})];
	}else if(canvote[1]=="user_not_found"){
		return [404,JSON.stringify({"result":false,"reason":canvote[1]})];
	// Para el resto de casos lanzaremos un código de estado 403 indicando que la acción no está permitida
	}else{
		return [403,JSON.stringify({"result":false,"reason":canvote[1]})];
	}
	
}

exports.canVote = canVote;
exports.vote = vote;
