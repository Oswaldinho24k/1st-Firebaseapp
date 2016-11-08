
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDl82jej8nFF4TJOyl8Kuho1-5AT9wPorc",
    authDomain: "fcmosw.firebaseapp.com",
    databaseURL: "https://fcmosw.firebaseio.com",
    storageBucket: "fcmosw.appspot.com",
    messagingSenderId: "840721305854"
  };
  firebase.initializeApp(config);

// Get a reference to the database service
	var database = firebase.database();
	var papelito = database.ref('pizza/');

	

	function writeUserData() {
		var user = firebase.auth().currentUser;
		var m = document.getElementById('mes').value;
		papelito.push({
		username: m,
		name: user.displayName,
		link:user.photoURL

		});
		document.getElementById('mes').value = "";  	
	}
	papelito.on('child_added', function(data) {
		//console.log(data.val().username)
		var paper = data.val().username;
		var person = data.val().name;
		var img = data.val().link;
		//document.getElementById('mensajes').append('=>  ' + paper  );
		$('#mensajes').append('<img class="img-circle" src="'+ img +'">');
		$('#mensajes').append(person +' =>'+paper+"<br>");
		
		
		var elem = document.getElementById('nel');
		elem.scrollTop = elem.scrollHeight;

	});
	//Inicia el Logueo
	var provider = new firebase.auth.FacebookAuthProvider();
	var iniciar = function(){
		firebase.auth().signInWithPopup(provider).then(function(result) {
  	// This gives you a Facebook Access Token. You can use it to access the Facebook API.
  		var token = result.credential.accessToken;
  	// The signed-in user info.
  		var user = result.user;
  		console.log(user.displayName);
  	// ...
	}).catch(function(error) {
  	// Handle Errors here.
  		console.log(error);
  // ...
	});
	};
	var cerrar = function(){
		firebase.auth().signOut().then(function() {
		 
	  	
  	}, 
  	function(error) {
		console.log(error);
});
	}
	

	

