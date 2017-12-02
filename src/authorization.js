// le paso el username y me devuelve todos los datos del usuario si existe. 
function getUser(user) {
	// compruebo con .length ya que es más óptimo
	return {
       username : "tansalalv",
       name : "Tania",
       surname : "Salguero Álvarez",
       email : "mail@example.com",
       genre : "Femenino",
       autonomous_community : "Andalucía",
       age : "21",
       role : "USUARIO",
	   // FIXME Esto no lo tiene la wiki de autorización!
	   id_grupo: "31"
   }
}

// Le paso el user_id y el election_id y compruebo restricciones. Si se cumplen devuelvo la encuesta
function getElection(user_id, election_id) {
	// Compruebo que existen ambos id	
	return {
		id: "1",
		id_censo: "288",
		id_grupo: "31",
		titulo: "Votación sobre consolas",
		descripción: "En esta votación comprobaremos si hay mas gamers de PC o consolas",
		fecha_ini: "31/07/2017 07:07",
		fecha_fin: "31/08/2017 07:07"
	};
};
		
exports.getUser = getUser;
exports.getElection = getElection;