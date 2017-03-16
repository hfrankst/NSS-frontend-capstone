"use strict";

app.controller('ProfileCtrl', function($scope, SearchTermData, ProductFactory, AuthFactory){
	$scope.searchText = SearchTermData;
	let user = AuthFactory.getUser();

	//I want this function to fire once the '/profile' partial loads
	let userPromos = () => {
		ProductFactory.getUsersPromos(user)
		.then((userSavedDeals) => {
			console.log("userSavedDeals", userSavedDeals);
			$scope.savedPromos = userSavedDeals;
		});
	};
	userPromos();

	$scope.mapPromo = () => {
		console.log("mapPromo clicked");
		//feed the resolution of userPromos into the Google map somehow to drop a pin on their location
	};

	$scope.removePromo = (savedPromoId) => {
		//delete the uid from the saved promo
		console.log("delete in factory", savedPromoId);
		ProductFactory.deleteUsersPromo(savedPromoId)
		.then((something) => {
			userPromos();
		});
	};
});