const rest = require('rest-js');
const processing = require('./processing.js');

function getElection(user_id, election_id, response){
    //Se crea una variable que tendrá la url base
    var restApi = rest('https://www.reqres.in', {
 	crossDomain: true
    });
    
    //Se llama a Read (tiene la misma función que get)
    restApi.read('/api/users?page=2', function(error, data) {
    /*Si se intenta con rest('https://www.reqres.in/api/users?page=2').then(function(response){  (obviamente cambiando el require de 	 arriba por rest, se quedará bloqueado, por esta razón es mejor usar restApi ya que además es más intuitivo y ofrece más opciones*/
	//Es necesaria esta variable ya que no se puede hacer splice porque no consigue eliminar bien todas las variables
	var res = [];
	/*Son necesarias todas esas llamadas y en ese orden ya que primero se convierte el data (de tipo object) a un string
	mediante stringify, luego se eliminan los espaciosluego se reemplazan aquellas , al lado de " por : para dividirlo todo 	en un solo caracter, luego se reemplazan { } y las " solas por el caracter vacío para eliminarlas, y a continuación se 		divide el texto en por : */
	var arr = JSON.stringify(data).trim().replace(new RegExp('[\\",]','g'),':').replace(new RegExp('[{}\\"]','g'),'').split(':');
	for(i=0; i< arr.length; i++){
		//Se eliminan los espacios
		var str = arr[i].trim();
		//Si algún str vale "" se eliminan de los resultados finales, de ahí que necesitemos el res.push ya 			que splice no funciona bien
		if(str != ""){
			res.push(str);
		}
     	}
	//NO BORRAR ESTA LINEA ESTÁ EN PRUEBAS
	//var res = forArr(arr, null, 0, 0, null);
	//Finalmente se llama a canVote (no puede ser al reves porque debe realizarse durante la llamada sino los datos se reinician)
	processing.canVote(user_id, election_id, res, response);
    });
}
/* NO BORRAR ESTA FUNCIÓN, ESTÁ EN PRUEBAS
function forArr(arr,val,ind,deep,val2){
    var r = [];
    if(val2!=null){
	r.push(val2);
    }
    for(i=ind; i< arr.length; i++){
	var str = arr[i].trim();
	if(str != ""){
	    if(str=="["||str==val){
		if(i+1>=arr.length){
		    return r;
		}
		if(str!=val){
		   val = arr[i+1].trim();
		   val2 = null;
		}else{
		   val2=val;
		}
		r.push(forArr(arr,val,i+1,deep+1,val2));
	    }else if(str=="]"){
		if (deep!=0){
		   return r;
		}
	    }else if(i+1<arr.length && arr[i+1].trim()==val){
		r.push(str);
		return r;
	    }else{
		r.push(str);
	    }
	}
     }
     return r;
}
*/

exports.getElection = getElection;
