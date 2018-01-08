var main = require('./../main');
var encryptor = require('./../encryptor');
var processing = require('./../processing');
<<<<<<< HEAD

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
=======
var clients = require('restify-clients');

var count = 0;

var client = clients.createJsonClient({
	url: 'http://localhost:8080',
	version: '*'
});

client.get('/api/check/vote.json?user=1&election=1', (err,req,res,obj) => {
	if(err) console.error(err.stack);
	else console.log('Checked the vote '+JSON.stringify(obj,null,2));
	count = count +1;
});

client.post('/api/create/vote.json', {
	id_user: "1", id_election: "1",
	answers: ["respuesta1", "respuesta2", "respuesta3"]
}, (err,req,res,obj) => {
	if(err) console.error(err.stack);
	else console.log('Created the vote '+JSON.stringify(obj,null,2));
	count = count +1;
});

if(count==2){
	main.server.close();
}
>>>>>>> tests
