"use strict";

app.controller('ProfileCtrl', function($scope, SearchTermData, ProductFactory, AuthFactory, MapApi){
	$scope.searchText = SearchTermData;
	let user = AuthFactory.getUser();

	let leaflet = () => {
		var mymap = L.map('mapid').setView([36.1325, -86.7566], 13);

		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGZyYW5rc3QiLCJhIjoiY2owY3QzODNpMDUxMDMybGMydnBxeGdncCJ9.NQrhhmJVuy175EbL-IsbJw', {
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		    maxZoom: 18,
		    id: 'your.mapbox.project.id',
		    accessToken: 'pk.eyJ1IjoiaGZyYW5rc3QiLCJhIjoiY2owY3QzODNpMDUxMDMybGMydnBxeGdncCJ9.NQrhhmJVuy175EbL-IsbJw'
		}).addTo(mymap);

		var marker = L.marker([36.1325, -86.7566]).addTo(mymap);
	};
	leaflet();

// function initMap() {
//   var uluru = {lat: -25.363, lng: 131.044};
//    map = new google.maps.Map(document.getElementById('map'), {
//             center: uluru,
//             zoom: 17
//         });
  
//   };

	//I want this function to fire once the '/profile' partial loads
	let userPromos = () => {
		ProductFactory.getUsersPromos(user)
		.then((userSavedDeals) => {
			console.log("userSavedDeals", userSavedDeals);
			$scope.savedPromos = userSavedDeals;
		});
	};
	userPromos();

	//feed the resolution of userPromos into the Google map somehow to drop a pin on their location
	$scope.mapPromo = () => {
		console.log("mapPromo clicked");
	};

 


	// function initMap() {
	//     // Constructor creates a new map - only center and zoom are required.
	//     var nashville = {lat: 36.1325, lng: -86.7566}; 
 //        var map = new google.maps.Map(document.getElementById('map'), {
 //          center: nashville,
 //          zoom: 13
 //        });
 //    }

	$scope.removePromo = (savedPromoId) => {
		//delete the uid from the saved promo
		console.log("delete in factory", savedPromoId);
		ProductFactory.deleteUsersPromo(savedPromoId)
		.then((something) => {
			userPromos();
		});
	};
});