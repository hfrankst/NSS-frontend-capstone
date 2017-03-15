"use strict";

app.factory('ProductFactory', function($q, $http, FBCreds){

	let getAllPromos = () => {
		//this function reaches out to firebase to grab all available promos regardless of user uid
		return $q((resolve, reject) => {
      		$http.get(`${FBCreds.databaseURL}/products.json`)
      		.then((promodata) => {
      			resolve(promodata);
      		});
      	});
	};

	let saveUsersPromos = (savedPromo) => {
		//this function should send a post call to send a promo with a uid attached to Firebase 
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/products.json`,
				JSON.stringify(savedPromo))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
				console.log("object from firebase after the promo has been saved", ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});

	};

	let getUsersPromos = () => {

	};

	return {getAllPromos, saveUsersPromos, getUsersPromos};
});