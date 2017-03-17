"use strict";

app.controller('ProfileCtrl', function($scope, SearchTermData, ProductFactory, AuthFactory, MapApi){
	$scope.searchText = SearchTermData;
	let user = AuthFactory.getUser();

	//build an object with the long and lat of each store hard coded, so you can call on them in the leaflet function
	//I may need to build a function that takes the store front name from the info that is in the ng-repeat and then correctly feed that store's coords to the leaflet function


	var mymap = L.map('mapid').setView([36.1325, -86.7566], 13);
	let leaflet = () => {

		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGZyYW5rc3QiLCJhIjoiY2owY3QzODNpMDUxMDMybGMydnBxeGdncCJ9.NQrhhmJVuy175EbL-IsbJw', {
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		    maxZoom: 18,
		    id: 'your.mapbox.project.id',
		    accessToken: 'pk.eyJ1IjoiaGZyYW5rc3QiLCJhIjoiY2owY3QzODNpMDUxMDMybGMydnBxeGdncCJ9.NQrhhmJVuy175EbL-IsbJw'
		}).addTo(mymap);

		var marker = L.marker([36.1325, -86.7566]).addTo(mymap);
	};
	leaflet();

	$scope.onEachFeature = (feature, layer) => {
	    // does this feature have a property named popupContent?
	    if (feature.properties && feature.properties.popupContent) {
	        layer.bindPopup(feature.properties.popupContent);
	    }
	};

	var geojsonFeature = {
	    "type": "Feature",
	    "properties": {
	        "name": "Kroger",
	        "amenity": "Grocery Store",
	        "popupContent": "This is where the promo is offered!"
	    },
	    "geometry": {
	        "type": "Point",
	        "coordinates": [36.1199, 86.7775]
	    }
	};

	L.geoJSON(geojsonFeature, {
	    onEachFeature: onEachFeature
	}).addTo(mymap);


















	//I want this function to fire once the '/profile' partial loads
	let userPromos = () => {
		ProductFactory.getUsersPromos(user)
		.then((userSavedDeals) => {
			console.log("userSavedDeals", userSavedDeals);
			$scope.savedPromos = userSavedDeals;
		});
	};
	userPromos();

	$scope.removePromo = (savedPromoId) => {
		//delete the uid from the saved promo
		console.log("delete in factory", savedPromoId);
		ProductFactory.deleteUsersPromo(savedPromoId)
		.then((something) => {
			userPromos();
		});
	};
});