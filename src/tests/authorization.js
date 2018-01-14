var http = require("http");
var rest = require("rest");

//Admite como usuarios válidos a paco1 y javi1. Si no, devuelve mensaje de error
function getUser(username){
	return new Promise(accept => {
        var result;
	
        if(username == "1"){
            //Procedemos a crear el objeto usuario formándolo en una cadena de texto.
            var resultString = {
                result: true,
                msg: "Successfull",
                username: "paco1",
                name: "Paco",
                surname: "Castro Botella",
                email: "paco1@gmail.com",
                genre: "Masculino",
                autonomous_community: "Andalucía",
                age: 21,
                role: "ASISTENTE"
            };
            
            //Pasamos la cadena de texto a objeto JSON
            result = resultString;

        }else if(username == "2"){
            //En este caso se realiza de otra forma también válida
            //Creamos la variable object en la que formaremos el JSON
            resultObject = {

            }
            //Le damos valor a los distintos atributos del JSON
            resultObject.result = true;
            resultObject.msg = "Succesfull";
            resultObject.username = "javi1";
            resultObject.name = "Javi";
            resultObject.surname = "Gallego Santos";
            resultObject.email = "javi1@gmail.com";
            resultObject.genre = "Masculino";
            resultObject.autonomous_community = "Extremadura";
            resultObject.age = "32";
            resultObject.role = "ASISTENTE";
            
            //Esto comprueba que efectivamente el objeto se pase a cadena de texto y luego
            //a un JSON válido
            result = resultString;
        }//Si no cumple con ningun username de los anteriores, se devuelve null

        return accept(result);
    });
}

function getElection(election_id){
    return new Promise(accept => {
        var result;

        if (election_id == "1") {
            //Procedemos a crear la elección en formato JSON
            var resultString = {
                votacion: {
                    id: 1,
                    id_censo: 288,
                    id_grupo: 31,
                    titulo: "Votacion 1 prueba",
                    descripción: "Esta es una votacion de prueba",
                    fecha_ini: "31/07/2017 07:07",
                    fecha_fin: "31/08/2018 07:07",
                    id_preguntas: [2, 3]
                }
            };
            result = resultString;
        } else if (election_id == "2") {
            var resultString = {
                votacion: {
                    id: 2,
                    id_censo: 255,
                    id_grupo: 32,
                    titulo: "Votacion 2 prueba",
                    descripción: "Esta es otra votacion de prueba",
                    fecha_ini: "31/07/2017 07:07",
                    fecha_fin: "31/08/2018 07:07",
                    id_preguntas: [1, 4]
                }
            }
            result = resultString;

        } else if (election_id == "3") {
            var resultString = {
                votacion: {
                    id: 3,
                    id_censo: 255,
                    id_grupo: 31,
                    titulo: "Votacion 3 prueba",
                    descripción: "Esta es otra votacion de prueba, con fecha expirada",
                    fecha_ini: "31/07/2017 07:07",
                    fecha_fin: "31/08/2017 07:07",
                    id_preguntas: [1, 4]
                }
            }
            result = resultString;

        }//Si no cumple con ninguna id de las anteriores, se devuelve null

        return accept(result);
    });
}

function getQuestions(election_id){
    return new Promise(accept => {
        var result;

        if (election_id == "1") {
            var resultString = {
                id: 1,
                id_votacion: 1,
                texto_pregunta: "prueba 1 - pregunta 1",
                tipo_pregunta: "abierta",
                id_dependencia: null
            }
            result = resultString;
        } else if (election_id == "2") {
            var resultString = {
                id: 2,
                id_votacion: 2,
                texto_pregunta: "prueba 2 - pregunta 1",
                tipo_pregunta: "cerrada",
                id_dependencia: null
            }
            result = resultString;
        }
        return accept(result);
    });
}

//Metodo para comprobar doble votacion
function getDobleCheck(id_usuario, election_id){
    // Método de prueba, asumimos que nunca vota doble
    return new Promise(accept => accept(false));
}

//Implementación de la obtención de las autoridades para el cifrado
function getAuthority(id){
    return new Promise(accept => {
        var clave;
        
        clave = "claveprueba";
        
        return accept(clave);
    });
}

// Este método se encargará de realizar el guardado del voto, enviándolo a almacenamiento de votos.
function saveVote(response_id, election_id, user_id, question_id) {
    // Para realizar las pruebas, siempre emitiremos true.
	return new Promise((accept, reject) => accept(true));
}

// Este método realizará una llamada a la API de censos para comprobar que el usuario está dentro del censo de la votación
function checkUserCensus(username, election_id) {
    return new Promise(accept => {
        // Retornaremos true salvo cuando el username sea 1 y el election_id 2
        if(username == "1" && election_id == "2") {
            return accept(false);
        } else {
            return accept(true);
        }
    });
}

function getResponseId(answer, question_id) {
    return new Promise(response_id => {
        return response_id(1);
    });
}

exports.getUser = getUser;
exports.getElection = getElection;
exports.getQuestions = getQuestions;
exports.getDobleCheck = getDobleCheck;
exports.getAuthority = getAuthority;
exports.saveVote = saveVote;
exports.checkUserCensus = checkUserCensus;
exports.getResponseId = getResponseId;