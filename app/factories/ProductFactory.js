"use strict";

app.factory('ProductFactory', function($q, $http, FBCreds){

	let getAllPromos = () => {
		//this function reaches out to firebase to grab all available promos regardless of user uid
		return $q((resolve, reject) => {
      		$http.get(`${FBCreds.databaseURL}/products.json`)
      		.then((promodata) => {
      			let promoArray = [];
      			let promoCollection = promodata.data;
      			Object.keys(promoCollection).forEach((key) => {
      				promoCollection[key].id = key;
      				promoArray.push(promoCollection[key]);
      			});
      			resolve(promoArray);
      		});
      	});
	};

	let saveUsersPromos = (savedPromo) => {
		//this function should send a post call to send a promo with a uid attached to Firebase 
		console.log("savedPromo in factory", savedPromo);
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/users.json`, savedPromo)
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
				console.log("ObjectFromFirebase after the saved promo is passed in", ObjectFromFirebase);
				// console.log("object from firebase after the promo has been saved", ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});

	};

	let getUsersPromos = (user) => {
		console.log("getUsersPromos");
		return $q((resolve, reject) => {
      		$http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${user}"`)
      		.then((userpromo) => {
      			// console.log("userpromo after the get call", userpromo.data);
      			let userSavedDeals = [];
      			let savedCollection = userpromo.data;
      			Object.keys(savedCollection).forEach((key) => {
      				savedCollection[key].id = key;
      				userSavedDeals.push(savedCollection[key]);
      			});
      			resolve(userSavedDeals);
      		});
      	});

	};

	return {getAllPromos, saveUsersPromos, getUsersPromos};
});