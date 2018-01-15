if(process.env.NODE_ENV=="test") {
    var auth = require('./tests/authorization');
} else {
    var auth = require('./main/authorization');
}
var encryptor = require('./encryptor.js');

var Promise = require('bluebird');

function canVote(user_id, election_id) {
    return new Promise(voting_form => {
        auth.getElection(election_id).then(election => {
            // Comprobamos si está vacia
            if (!election) {
                return voting_form([false, "election_not_found"]);
            }
            election = election.votacion;
            // Ahora obtenemos el usuario
            auth.getUser(user_id).then(user => {
                if (!user) {
                    return voting_form([false, "user_not_found"]);
                }
                // Realizamos las comprobaciones de que pueda votar
                // Primero, comprobamos que la fecha de la votación no ha pasado:
                // Al estar la fecha en un formato no reconocido por JS, necesitamos dividirlo y pasarlo por el constructor
                var start_date = new Date(election.fecha_ini.substr(6, 4), election.fecha_ini.substr(3, 2) - 1
                    , election.fecha_ini.substr(0, 2), election.fecha_ini.substr(11, 2),
                    election.fecha_ini.substr(14, 2), 0);
                var end_date = new Date(election.fecha_fin.substr(6, 4), election.fecha_fin.substr(3, 2) - 1
                    , election.fecha_fin.substr(0, 2), election.fecha_fin.substr(11, 2),
                    election.fecha_fin.substr(14, 2), 0);
                var actual_date = new Date();

                // Si no está fuera del rango de votación.
                if (!(start_date < actual_date && end_date > actual_date)) {
                    return voting_form([false, "election_not_open"]);
                }

                // Despues hacemos comprobaciones del usuario
                // Se realizará una llamada al módulo de administración de censos para ver si el usuario está en el censo
                auth.checkUserCensus(user.username, election_id).then(result => {
                    // En el caso de que no pertenezca al censo
                    if(!result) {
                        return voting_form([false, "cant_vote"]);
                    }

                    auth.getDobleCheck(user_id, election_id).then(check => {
                        //Si devuelve true no podra votar de nuevo
                        if (check) {
                            return voting_form([false, "already_voted"]);
                        }
                        // Si todo lo anterior es correcto, podemos admitir al usuario a votar
                        return voting_form([true, "can_vote"]);
                    });
                });
            });
        });
    });
}


function vote(id_user, id_election, answers) {
    return new Promise(voting_form => {
        canVote(id_user, id_election).then(canvote => {
            // Comprobamos que el usuario pueda votar en esa encuesta usando la función canVote
            if(canvote[1]=="can_vote"){
                //Obtenemos la clave con la que vamos a encriptar el voto
                auth.getAuthority(id_election).then(key => {
                    var failedVote = false;
                    // Para cada pregunta que tengamos, ciframos su contenido y lo enviamos al módulo de almacenamiento
                    for (var i = 0; i < answers.length; i++) {
                        var answer = answers[i];
                        // Encontramos el id de la respuesta
                        auth.getResponseId(answer.answer, answer.question_id).then(response_id => {
                            // Como se han realizado comprobaciones anteriormente sobre el voto, no debería dar errores en el guardado.
                            auth.saveVote(response_id, id_election, id_user, answer.question_id);
                        });
                    }
                    
                    // Una vez terminemos de encriptar y enviar los votos, tendremos que responder con un mensaje correcto
                    return voting_form([200, JSON.stringify({ "result": true, "reason": "can_vote" })]);
                });
            // Tanto si no se muestra la votación como el usuario, en ambos casos se lanzará un código de estado 404 y la razón del mismo
            } else if(canvote[1]=="election_not_found") {
                return voting_form([404,JSON.stringify({"result":false,"reason":canvote[1]})]);
            } else if(canvote[1]=="user_not_found") {
                return voting_form([404,JSON.stringify({"result":false,"reason":canvote[1]})]);
            // Para el resto de casos lanzaremos un código de estado 403 indicando que la acción no está permitida
            } else {
                return voting_form([403,JSON.stringify({"result":false,"reason":canvote[1]})]);
            }
        });
    });
}

exports.canVote = canVote;
exports.vote = vote;
