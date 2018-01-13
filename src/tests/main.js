var main = require('./../main');
var encryptor = require('./../encryptor');
var processing = require('./../processing');
var request = require('request');

// Pruebas de la función de encriptado
function encryptTests() {
    // Estos tests comprobarán si el funcionamiento del desencriptado es correcto
    // Creamos un objecto a encriptar:
    var text = "texto de prueba.";
    var key = "clave";

    // Ciframos el texto con la clave, debe tenerse en cuenta que la función asume un objeto (voto) que lo convierte a JSON
    // Debido a eso, el objeto que cifrará será '"texto de prueba."'
    var cipheredText = encryptor.encrypt_vote(text, key);

    // Para compobar que el encifrado es correcto, realizamos el proceso invertido
    var decipheredText = decipher(cipheredText, key);

    // Finalmente, comprobamos que en efecto sean el mismo texto, teniendo en cuenta la conversión a JSON.
    console.assert("\""+text+"\"" == decipheredText);
}

function decipher(text, key) {
    // Este código es una copia del que se encuentra en el desencriptado, pero añadiendo la conversión a base64 del final.
    // Creamos el bloque
    var blocks = [text];
    var blocks_size = text.length;

    // Si el tamaño del string es mayor que la clave
    if (blocks_size > key.length) {
        // Crearemos un nuevo conjunto de bloques que tendrán asegurado un tamaño igual o menor (sólo el último) a la clave
        var new_blocks = [];
        for (var i = 0; i < Math.ceil(blocks_size / key.length); i++) {
            new_blocks.push(blocks[0].substring(i * key.length, (i + 1) * key.length));
        }
        blocks = new_blocks;
    }

    // Ahora que tenemos los bloques correctos, ciframos:
    var result = new String();
    // Iteramos por cada bloque y ciframos por XOR cada bloque, añadiendo el resultado a un string final
    blocks.forEach(function (block) {
        result = result.concat(xor_cipher(block, key));
    });

    return Buffer.from(result, 'base64').toString();
}

function xor_cipher(text, key) {
    var result = new String();
    for(var i = 0; i < text.length; i++) {
        // Itera por cada caracter y cifra el resultado, conviriéndolo en string.
        result = result.concat(String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i)));
    }
    return result;
}

encryptTests();

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
request('http://localhost:8080/api/check/vote.json?user=1&election=1', (err, res, body) => {
    if (err) {
        console.error(err.stack);
    } else {
        console.log("Checked vote with user 1 and election 1");
        // Si la anterior respuesta funciona, vamos a la segunda
        request("http://localhost:8080/api/create/vote.json", { json: {
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