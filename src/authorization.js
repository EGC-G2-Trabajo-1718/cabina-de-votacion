// le paso el username y me devuelve todos los datos del usuario si existe. 
function getUser(user) {
	// compruebo con .length ya que es más óptimo
	if (user.length > 0) {
		var user = 'jorgoragu';
		var user_id = 30;
		var user_group_id = 41;
		var user_name = 'Jorge';
		var user_surname = 'Gordo Aguilar';
		var user_email = 'jorgoragu@alum.us.es';
		var user_genre = Masculino;
		var user_autonomous_community = 'Extremadura';
		var user_age = 21;
		var user_role = 'USUARIO';

		return [user, user_id, user_group_id, user_name, user_surname, user_email, user_genre, user_autonomous_community, user_age, user_role];
	
	} else {
		// En caso de que no se haya introducido un user devuelvo un mensaje de error
		return "Debe introducir un nombre de usuario";
	}
}

// Le paso el user_id y el election_id y compruebo restricciones. Si se cumplen devuelvo la encuesta
function getElection(user_id, election_id) {
	// Compruebo que existen ambos id	
	if (user_id > 0 && election_id > 0) {
		var user_group_id = 41;	// obtenemos el ID del grupo al que pertenece el usuario	
		var election_group_id = 41; // obtenemos el ID del grupo que puede realizar la encuesta ¿y si la pueden realizar varios grupos?
		var election_endDate = '31/12/2017 07:07'; // obtenemos la fecha de vencimiento de la votación
		var date = new Date();
		var rightNow = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
			
		if(user_group_id == election_group_id && election_endDate > rightNow) {	// comprobamos que el usuario pertenece al grupo que puede realizar la encuesta y que la fecha de finalización de la encuesta sea posterior a la fecha actual
			return [election_id, election_censo_id, election_group_id, election_title, election_description, election_startDate, election_endDate];
		}
	}
}
		
	
