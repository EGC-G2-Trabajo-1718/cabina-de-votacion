var base64encoder = require('js-base64').Base64;

// Está función solicita el voto como diccionario compuesto por el id de cada pregunta y su respuesta
// y la clave de la votación
function encrypt_vote(vote, key) {
    // Primero, obtenemos el voto como string.
    var vote_s = JSON.stringify(vote);
    // Después convertimos a base64.
    var vote_b = base64encoder.encode(vote_s);

    // Dividimos los bloques
    var blocks = [vote_b];
    var blocks_size = vote_b.length;
    // Si el tamaño del string es mayor que la clave
    if(blocks_size > key.length) {
        var new_blocks = [];
        // Crearemos un nuevo conjunto de bloques que tendrán asegurado un tamaño igual o menor (sólo el último) a la clave
        for(var i = 0; i < blocks_size; i += key.length) {
            new_blocks.push(blocks[0].substring(i*key.length, (i+1)*key.length));
        }
        blocks = new_blocks;
    }
    // Añadiremos padding al último bloque del conjunto
    if(blocks[blocks.length-1] < key.length) {
        // El nuevo último bloque será el último bloque más el caracter de padding por el número de caracteres necesarios para que tenga la misma cantidad que la clave
        blocks[blocks.length-1] = blocks[blocks.length-1].concat(multiply_string("-", (key.length - blocks[blocks.length-1].length)));
    }
    // Ahora que tenemos los bloques correctos, ciframos:
    var result = new String();
    // Iteramos por cada bloque y ciframos por XOR cada bloque, añadiendo el resultado a un string final
    blocks.forEach(function(block) {
        result = result.concat(xor_cipher(block, key));
        console.log("Cifrado de "+block+" es "+result);
    });

    return result;
}

// Esta función multiplicará por el exponente el caracter introducido.
function multiply_string(character, exponent) {
    var result = character;
    for(var i = 1; i < exponent; i++) {
        result = result.concat(character);
    }
    return result;
}

// Esta función se encargará de cifrar cada bloque
function xor_cipher(text, key) {
    var result = new String();
    for(var i = 0; i < text.length; i++) {
        result = result.concat(String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i)));
    }
    return result;
}

exports.encrypt_vote = encrypt_vote;