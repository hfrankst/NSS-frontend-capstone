"use strict";

app.factory('ProductFactory', function($q, $http, FBCreds){
	console.log("ProductFactory.js");

	let getAllPromos = () => {
		//this function reaches out to firebase to grab all available promos regardless of user uid
		return $q((resolve, reject) => {
      		$http.get(`${FBCreds.databaseURL}/products.json`)
      		.then((promodata) => {
      			resolve(promodata);
      		});
      	});
	};


	//I want to send the uid to this function so that it can then reach out to Firebase and grab all promos attached to the user
	let saveUsersPromos = () => {
		
	};

	return {getAllPromos, saveUsersPromos};
});