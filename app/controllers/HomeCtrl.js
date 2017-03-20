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
	//I call this immediately here, because I want the available promos to load when the user logs in
	getPromos();


	$scope.savePromo = (promo) => {
		console.log("savePromo");
		var savedPromo = {
			name: promo.name,
			store: promo.store,
			reg_price: promo.reg_price,
			discount_price: promo.discount_price,
			promo_end: promo.promo_end,
			uid: user
		};
		ProductFactory.saveUsersPromos(savedPromo);
	};
});