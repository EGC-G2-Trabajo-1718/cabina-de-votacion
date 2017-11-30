const authorization = require('./authorization.js');

function canVote(user_id, election_id) {
    return [true, "can_vote", authorization.getElection(election_id)];
}

exports.canVote = canVote;
