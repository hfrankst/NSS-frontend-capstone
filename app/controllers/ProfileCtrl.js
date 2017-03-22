"use strict";

app.controller('ProfileCtrl', function($scope, SearchTermData, ProductFactory, AuthFactory){
	$scope.searchText = SearchTermData;
	let user = AuthFactory.getUser();
	let mymap = L.map('mapid').setView([36.1325, -86.7566], 15);

	// Creates a red marker with the coffee icon
	 var redMarker = L.AwesomeMarkers.icon({
	   markerColor: 'green'
	 });

	 L.marker([36.1325, -86.7566], {icon: redMarker}).addTo(mymap).bindPopup('<h5><strong>You Are Here!</strong></h5>');

	let leaflet = () => {

		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGZyYW5rc3QiLCJhIjoiY2owY3QzODNpMDUxMDMybGMydnBxeGdncCJ9.NQrhhmJVuy175EbL-IsbJw', {
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		    maxZoom: 18,
		    id: 'hfrankst.4a5bytnl',
		    accessToken: 'pk.eyJ1IjoiaGZyYW5rc3QiLCJhIjoiY2owY3QzODNpMDUxMDMybGMydnBxeGdncCJ9.NQrhhmJVuy175EbL-IsbJw'
		}).addTo(mymap);
	};
	leaflet();

	$scope.onEachFeature = (feature, layer) => {

		if(feature.store === "Kroger"){
			var kroger = L.marker([36.1199, -86.7775]).addTo(mymap).bindPopup('<h5><strong>' + feature.store + '</strong></h5><span>' + feature.name + '</span><br><label>Store Address</label><p>' + feature.address + '</p><label>Phone Number</label><p>' + feature.phone + '</p><label>Sale Ends:</label><p>' + feature.promo_end + '</p>');
			var panToKroger = mymap.panTo([36.1199, -86.7775], {animation: true});
		} else if (feature.store === "ALDI") {
			var aldi = L.marker([36.0903, -86.7323]).addTo(mymap).bindPopup('<h5><strong>' + feature.store + '</strong></h5><span>' + feature.name + '</span><br><label>Store Address</label><p>' + feature.address + '</p><label>Phone Number</label><p>' + feature.phone + '</p><label>Sale Ends:</label><p>' + feature.promo_end + '</p>');
			var panToAldi = mymap.panTo([36.0903, -86.7323]);
		} else if (feature.store === "Publix") {
			var publix = L.marker([36.1266, -86.8474]).addTo(mymap).bindPopup('<h5><strong>' + feature.store + '</strong></h5><span>' + feature.name + '</span><br><label>Store Address</label><p>' + feature.address + '</p><label>Phone Number</label><p>' + feature.phone + '</p><label>Sale Ends:</label><p>' + feature.promo_end + '</p>');
			var panToPublix = mymap.panTo([36.1266, -86.8474]);
		}		
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
		console.log("delete in factory", savedPromoId);
		ProductFactory.deleteUsersPromo(savedPromoId)
		.then((something) => {
			userPromos();
		});
	};
});