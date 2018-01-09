var Promise = require("bluebird");
var request = require('request');

// Se definen las URLs de los módulos como constantes
const urlCenso = "http://172.18.2.30"
const urlAutenticacion= "http://172.18.2.20";
const urlVotacion = "http://172.18.2.40";
const urlAlmacenamiento = "http://172.18.2.50";

// La mayoría de las siguientes peticiones a los diferentes módulos son parecidas, se va a detallar el contenido de la siguiente como ejemplo
// El método siguiente se encarga de obtener el usuario dado su id de usuario
function getUser(username){
    // Creamos una Promise donde se retornará o bien el mensaje correcto o un error
    return new Promise((accept, reject) => {
        // Se realiza la llamada a la API del otro grupo y el callback será interpretado como Promise
        request({ url: urlAutenticacion+"/api/index.php?method=getUser&user="+username, json: true }, (err, res, obj) => {
            // Si la respuesta es erronea
            if(err) {
                // Se enviará la información
                return reject(err);
            } else {
                // En caso contrario, enviamos el objeto JSON resultante
                return accept(obj);
            }
        })
    });
}

// El método siguiente encuentra la elección dado su id
function getElection(election_id){
    return new Promise((accept, reject) => {
        return request({ url: urlVotacion+"/api/get/votacion.json?id="+election_id, json:true }, (err, res, obj) => {
            if(err) {
                return reject(err);
            } else {
                return accept(obj.votacion);
            }
        })
    });
}

function getQuestions(election_id){
    return new Promise((accept, reject) => {
        return request({ url: urlVotacion+"/api/get/preguntas.json?id="+election_id, json:true }, (err, res, obj) => {
            if(err) {
                return reject(err);
            } else {
                return accept(obj);
            }
        })
    });
}

// Este método encontrará las preguntas de la votación
function getAnswers(question_id){
    return new Promise((accept, reject) => {
        return request({ url: urlVotacion+"/api/get/respuestas.json?id="+question_id, json:true }, (err, res, obj) => {
            if(err) {
                return reject(err);
            } else {
                return accept(obj);
            }
        })
    });
}

// Metodo para comprobar doble votacion
function getDobleCheck(id_usuario, election_id){
    return new Promise((accept, reject) => {
        return request({ url: urlAlmacenamiento+"/api/get/comprobar_voto/"+id_usuario+"/"+election_id, json:true }, (err, res, obj) => {
            if(err) {
                return reject(err);
            } else {
                return accept(obj);
            }
        })
    });
}

//Implementación de la obtención de las autoridades para el cifrado
function getAuthority(id){
    return new Promise((accept, reject) => {
        return request({ url: urlVotacion+"/api/get/votacion.json?id="+id, json:true }, (err, res, obj) => {
            if(err) {
                return reject(err);
            } else {
                return accept(obj);
            }
        })
    });
}

// Este método se encargará de realizar el guardado del voto, enviándolo a almacenamiento de votos.
function saveVote(ciphered_vote, election_id, user_id, question_id) {
    return new Promise((accept, reject) => {
        return request.post({ url: urlAlmacenamiento+"/api/post/almacenar_voto/"+user_id+"/"+election_id+"/"+question_id, json:true }, (err, res, obj) => {
            if(err) {
                return reject(err);
            } else {
                return accept(obj);
            }
        })
    });
}

// Este método realizará una llamada a la API de censos para comprobar que el usuario está dentro del censo de la votación
function checkUserCensus(username, election_id) {
    return new Promise((accept, reject) => {
        return request({ url: urlCenso+"/can_vote?id_votacion="+election_id+"&username="+username, json:true }, (err, res, obj) => {
            if(err) {
                return reject(err);
            } else {
                return accept(obj.result);
            }
        })
    });
}

exports.getUser = getUser;
exports.getElection = getElection;
exports.getQuestions = getQuestions;
exports.getAnswers = getAnswers;
exports.getDobleCheck = getDobleCheck;
exports.getAuthority = getAuthority;
exports.saveVote = saveVote;
exports.checkUserCensus = checkUserCensus;