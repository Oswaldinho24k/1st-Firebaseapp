var config = {
    apiKey: "AIzaSyDl82jej8nFF4TJOyl8Kuho1-5AT9wPorc",
    authDomain: "fcmosw.firebaseapp.com",
    databaseURL: "https://fcmosw.firebaseio.com",
    storageBucket: "fcmosw.appspot.com",
    messagingSenderId: "840721305854"
  };
  firebase.initializeApp(config);

  //Referencia a la base de datos
var database = firebase.database().ref('papelito');

//ocultamos todo



	//checar sesión
	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		$('#charla').show();
		$('#ini').hide();
		$('#nel').scrollTop($('#nel')[0].scrollHeight - $('#nel')[0].clientHeight);
	} else {
		$('#charla').hide();
		$('#ini').show();
		}
	});

	

function writeUserData() {

	

	var user = firebase.auth().currentUser;
	var message = $('#mes').val();
	database.push({
		text:message,
		name: user.displayName,
		link: user.photoURL		
	});
	$('#mes').val('');
	$('#nel').scrollTop($('#nel')[0].scrollHeight - $('#nel')[0].clientHeight);
	//emojis
	

	
}

database.on('child_added', function(data) {
	var text = data.val().text;
	var name = data.val().name;
	var img = data.val().link;

	$('#mensajes').append('<img class="img-circle" src="'+ img +'">');
	$('#mensajes').append(name +' =>'+text+"<br>");
	
	
});
var elem = $('#mensajes');
	elem.scrollTop = elem.scrollHeight;	 

$("#mes").keyup(function(event){
    if(event.keyCode == 13){
        $("#send").click();
    }
});



//Inicia el Logueo
var provider = new firebase.auth.FacebookAuthProvider();
	//checar sesión
  //iniciar sesión
	var iniciar = function(){
		firebase.auth().signInWithPopup(provider).then(function(result) {
  	// This gives you a Facebook Access Token. You can use it to access the Facebook API.
  		var token = result.credential.accessToken;
  	// The signed-in user info.
  		var user = result.user;
  		console.log(user.displayName);
  		

  		$('#charla').show();
  		$('#ini').hide();
  		$('#nel').scrollTop($('#nel')[0].scrollHeight - $('#nel')[0].clientHeight);

  	// ...
	}).catch(function(error) {
  	// Handle Errors here.
  		console.log(error);
	});
	};
//cerrar sesión
	var cerrar = function(){
		firebase.auth().signOut().then(function() {
		 
	  	$('#charla').hide();
	  	$('#ini').show();
  	}, 
  	function(error) {
		console.log(error);
	});
	};

//emojis
 

 

