const authorization = require('./authorization.js');

/*Ha sido necesario añadir arr para comprobar la funcionalidad de restApi, y response para poder realizar el envío (no puedo hacer return y volver al main porque cancelaría la llamada del get y se reiniciarían los datos*/
function canVote(user_id, election_id, arr, response) {
    //return [true, "can_vote", authorization.getElection(election_id)];
    var voting = [true, "can_vote"];
    response.send({ "return": voting[0], "reason": voting[1], "election": arr });
}

exports.canVote = canVote;
