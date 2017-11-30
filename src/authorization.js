const rest = require('rest');

function getElection(election_id){
    rest('https://httpbin.org/get').then(function(response) {
	getElection.staticProperty = response;
	console.log(getElection.staticProperty);
    });
    
}

exports.getElection = getElection;
