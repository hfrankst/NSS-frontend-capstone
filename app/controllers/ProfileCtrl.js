"use strict";

app.controller('ProfileCtrl', function($scope, SearchTermData, ProductFactory, AuthFactory){
	$scope.searchText = SearchTermData;
	let user = AuthFactory.getUser();

	//I want this function to fire once the '/profile' partial loads
	let userPromos = () => {
		ProductFactory.getUsersPromos(user)
		.then((userSavedDeals) => {
			$scope.savedPromos = userSavedDeals;
		});
	};
	userPromos();

	let mapPromo = () => {
		//feed the resolution of userPromos into the Google map somehow to drop a pin on their location
	};

	let removePromo = (promoId) => {
		//delete the uid from the saved promo
		console.log("delete in factory", promoId);
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/users/${promoId}.json`)
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};
});