"use strict";

app.controller('HomeCtrl', function($scope, SearchTermData, ProductFactory, AuthFactory){
	$scope.searchText = SearchTermData;
	let user = AuthFactory.getUser();

	
	let getPromos = () => {
			ProductFactory.getAllPromos()
			.then((promodata) => {
				$scope.promotions = promodata;
				console.log("in the getPromos function", promodata); 
			});               
	};
	getPromos();


	$scope.savePromo = (promo) => {
		// console.log("savePromo clicked");
		var savedPromo = {
			name: promo.name,
			location: promo.store,
			end_date: promo.promo_end,
			uid: user
		};
		// console.log("savedPromo created", savedPromo);

		ProductFactory.saveUsersPromos(savedPromo)
		.then((something) => {
			console.log("getting stuff back from factory", something);
		});
	};
});