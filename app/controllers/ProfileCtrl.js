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

		// var marker = L.marker([36.1325, -86.7566]).addTo(mymap);
	};
	leaflet();

	$scope.onEachFeature = (feature, layer) => {
		console.log("the store name", feature);
		console.log("feature.store", feature.store);

		//don't think this is the best way to do this but fuck it
		if(feature.store === "Kroger"){
			var kroger = L.marker([36.1199, -86.7775]).addTo(mymap);
		} else if (feature.store === "ALDI") {
			var aldi = L.marker([36.0903, -86.7323]).addTo(mymap);
		} else if (feature.store === "Publix") {
			var publix = L.marker([36.1266, -86.8474]).addTo(mymap);
		}
		 if (feature.properties && feature.properties.popupContent) {
			        layer.bindPopup(feature.properties.popupContent);
			    }

		// mapboxgl.accessToken = 'pk.eyJ1IjoiaGZyYW5rc3QiLCJhIjoiY2owY3QzODNpMDUxMDMybGMydnBxeGdncCJ9.NQrhhmJVuy175EbL-IsbJw'; 
		//    var map = new mapboxgl.Map({
		//      container: 'mapid',
		//      style: 'mapbox://styles/hfrankst/cj0icofq9005b2sqprh6degmc' 
		//    });
		//    // code from the next step will go here

		//    map.on('click', function(e) {
		//      var features = map.queryRenderedFeatures(e.point, {
		//        layers: ['streets'] 
		//      });

		//      if (!features.length) {
		//        return;
		//      }

		//      var feature = features[0];

		//      var popup = new mapboxgl.Popup({ offset: [0, -15] })
		//        .setLngLat(feature.geometry.coordinates)
		//        .setHTML('<h3>' + feature.properties.name + '</h3><p>' + feature.properties.address + '</p><p>' + feature.properties.phone + '</p>' )
		//        .setLngLat(feature.geometry.coordinates)
		//        .addTo(map);
		//    });


		//
		// console.log("looking into the feature", feature.properties);

		//this code is taking from a mapbox tutorial 
		 // map.on('click', function(e) {
		   // var features = map.queryRenderedFeatures(e.point, {
		   //   layers: ['{layer name}'] // replace this with the name of the layer
		   // });

		   // if (!features.length) {
		   //   return;
		   // }

		 //   var feature = 
		 //   		{
		 //   		    "type": "Feature",
		 //   		    "geometry": {
		 //   		        "type": "Point",
		 //   		        "coordinates": [36.1199, -86.7775]
		 //   		    },
		 //   		    "properties": {
		 //   		        "name": "Kroger",
		 //   		        "amenity": "Grocery Store",
		 //   		        "popupContent": "This is where the promo is offered!"
		 //   		    }
		 //   		};

		 //   var popup = new mapboxgl.Popup({ offset: [0, -15] })
		 //     .setLngLat(feature.geometry.coordinates)
		 //     .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
		 //     .setLngLat(feature.geometry.coordinates)
		 //     .addTo(mymap);
		 // });


		// new L.GeoJSON(feature).addTo(mymap);
	};


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