"use strict";

app.controller('HomeCtrl', function($scope, $q, $window, SearchTermData, ProductFactory, AuthFactory){
	$scope.searchText = SearchTermData;
	let user = AuthFactory.getUser();
	
	let getPromos = () => {
			ProductFactory.getAllPromos()
			.then((promodata) => {
				$scope.promotions = promodata.data; 
			});               
	};
	getPromos();


	$scope.savePromo = (promo) => {
		var savedPromo = {
			name: promo.name,
			location: promo.store,
			uid: user
		};

		ProductFactory.saveUsersPromos(savedPromo);
	};
});