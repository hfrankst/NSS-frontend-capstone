"use strict";

app.controller('ProfileCtrl', function($scope, SearchTermData, ProductFactory, AuthFactory, MapApi){
	$scope.searchText = SearchTermData;
	let user = AuthFactory.getUser();

	//build an object with the long and lat of each store hard coded, so you can call on them in the leaflet function
	//I may need to build a function that takes the store front name from the info that is in the ng-repeat and then correctly feed that store's coords to the leaflet function
	var mymap = L.map('mapid').setView([36.1325, -86.7566], 15);

	let leaflet = () => {

		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGZyYW5rc3QiLCJhIjoiY2owY3QzODNpMDUxMDMybGMydnBxeGdncCJ9.NQrhhmJVuy175EbL-IsbJw', {
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		    maxZoom: 18,
		    id: 'hfrankst.4a5bytnl',
		    accessToken: 'pk.eyJ1IjoiaGZyYW5rc3QiLCJhIjoiY2owY3QzODNpMDUxMDMybGMydnBxeGdncCJ9.NQrhhmJVuy175EbL-IsbJw'
		}).addTo(mymap);
	};
	leaflet();

	var stores = [
		{"type":"Feature",
			"geometry":{"type":"Point", "coordinates":[-86.7775, 36.0903]},
			"properties":{"name":"Kroger", "address": "2615 Franklin Pike Nashville, TN 37204", "phone": "(855) 955-2534"}
		},
		{"type":"Feature",
			"geometry":{"type":"Point", "coordinates":[-86.7323, 36.0903]},
			"properties":{"name":"ALDI", "address": "3758 Nolensville Pike Nashville, TN 37211", "phone": "(855) 955-2534"}
		},
		{"type":"Feature",
			"geometry":{"type":"Point", "coordinates":[-86.8474, 36.1266]},
			"properties":{"name":"Publix", "address": "4324 Harding Pike Nashville, TN 37205","phone": "(615) 279-2038"}
		}
	];

	// let layerCountries = L.geoJson(stores, {
 //        // correctly map the geojson coordinates on the image
 //        coordsToLatLng: function(coords) {
 //            return rc.unproject(coords);
 //        }
 //    });


	$scope.onEachFeature = (feature, layer) => {
		// console.log("the store object", feature);
		// console.log("feature.store", feature.store);
		// console.log("feature.address", feature.address);
		// console.log("feature.phone", feature.phone);
		// console.log("feature.promo_end", feature.promo_end);

		if(feature.store === "Kroger"){
			var kroger = L.marker([36.1199, -86.7775]).addTo(mymap).bindPopup('<h5><style text-align: center></style>' + feature.store + '</h5><br><p>' + feature.address + '</p><br>' + feature.phone + '</p>');
		} else if (feature.store === "ALDI") {
			var aldi = L.marker([36.0903, -86.7323]).addTo(mymap).bindPopup('<h5><style text-align: center></style>' + feature.properties.name + '</h5><br><p>' + feature.properties.address + '</p><br>' + feature.properties.phone + '</p>');
		} else if (feature.store === "Publix") {
			var publix = L.marker([36.1266, -86.8474]).addTo(mymap).bindPopup('<h5><style text-align: center></style>' + feature.properties.name + '</h5><br><p>' + feature.properties.address + '</p><br>' + feature.properties.phone + '</p>');
		}
		
		// if (feature.properties && feature.properties.address) {
		//     layer.bindPopup('<h5><style text-align: center></style>' + feature.properties.name + '</h5><br><p>' + feature.properties.address + '</p><br>' + feature.properties.phone + '</p>');
		// }

	};
	// L.geoJSON(stores, {
	//     onEachFeature: onEachFeature
	// }).addTo(mymap);

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