"use strict";

app.controller('HomeCtrl', function($scope, $window, SearchTermData, ProductFactory){
	$scope.searchText = SearchTermData;
	//I want functions in here that will get and post to firebase, because this is where the user will search for grocery promos
	let getPromos = () => {
		//this will be the getter function that pulls initiates the pull from FB
			ProductFactory.getAllPromos()
			.then((promodata) => {
				// console.log("promodata from the product factory", promodata);
				$scope.promotions = promodata.data; 
			});               
	};
	

	getPromos();
	let postPromo = () => {
		//this function will post the user's saved promos that they want to see displayed on the map to firebase
	};
});