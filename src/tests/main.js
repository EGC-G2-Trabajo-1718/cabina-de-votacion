var main = require('./../main');
var encryptor = require('./../encryptor');
var processing = require('./../processing');
var request = require('request');

var count = 0;

//Tests de canVote

processing.canVote(1, 1).then(result => {
    console.log("Test positivo de canVote");
    console.log(result);
});

processing.canVote(1, 0).then(result => {
    console.log("Test elección no existente de canVote");
    console.log(result);
}).catch(error => {
    console.log(error.stack);
});

processing.canVote(0, 1).then(result => {
    console.log("Test usuario no existente de canVote");
    console.log(result);
}).catch(error => {
    console.log(error.stack);
});

processing.canVote(1, 3).then(result =>{
    console.log("Test fecha de elección expirada de canVote");
    console.log(result);
}).catch(error => {
    console.log(error.stack);
});

// JSON de answer
var AnswerJSON = [{
	question_id: 1,
	answer: "Respuesta"
}]

// Tests de vote

processing.vote(1, 1, AnswerJSON).then(result => {
    console.log("Test correcto de vote");
    console.log(result);
}).catch(error => {
    console.log(error.stack);
});

processing.vote(1, 0, AnswerJSON).then(result => {
    console.log("Test elección no encontrada de vote");
    console.log(result);
}).catch(error => {
    console.log(error.stack);
});

processing.vote(0, 1, AnswerJSON).then(result => {
    console.log("Test usuario no encontrado de vote");
    console.log(result);
}).catch(error => {
    console.log(error.stack);
});


// Prueba del sistema
request('http://localhost/api/check/vote.json?user=1&election=1', (err, res, body) => {
    if (err) {
        console.error(err.stack);
    } else {
        console.log("Checked vote with user 1 and election 1");
        // Si la anterior respuesta funciona, vamos a la segunda
        request("http://localhost/api/create/vote.json", { json: {
            id_user: "1", id_election: "1",
            answers: [
                { 
                    question_id: 1,
                    answer: "respuesta1"
                },{
                    question_id: 2,
                    answer: "respuesta2"
                },{
                    question_id: 3,
                    answer: "respuesta3"
                }
            ]
        }, method: "POST", headers: {
            "Content-Type": "application/json",
        } }, (err, res, obj) => {
            if (err) {
                console.error(err.stack);
            } else {
                console.log('Created the vote ' + JSON.stringify(obj));
            }
            // Al terminar ambas, cerramos el servidor
            main.server.close();
        });
    }
});