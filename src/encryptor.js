var base64encoder = require('js-base64').Base64;

// Está función solicita el voto como diccionario compuesto por el id de cada pregunta y su respuesta y las
// autoridades de la votación. Retornará un string cifrado en base64 y con el cifrado XOR por cada autoridad.
// IMPORTANTE el voto debe estar encodificado como ASCII
function encrypt_vote(vote, authorities) {
    // Primero, obtenemos el voto como string.
    var vote_s = JSON.stringify(vote);
    // Después convertimos a base64.
    var vote_b = base64encoder.encode(vote_s);
}