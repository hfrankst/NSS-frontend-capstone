"use strict";

app.controller('HomeCtrl', function($scope, SearchTermData, ProductFactory, AuthFactory){
	$scope.searchText = SearchTermData;
	let user = AuthFactory.getUser();

	//this gets all available promos and loads immediately on the promotions page
	let getPromos = () => {
			ProductFactory.getAllPromos()
			.then((promodata) => {
				$scope.promotions = promodata;
				console.log("in the getPromos function", promodata); 
			});               
	};
	getPromos();

	//this function is building a new object to be stored by uid, so that the user can load his/her saved promos on the profile page
	$scope.savePromo = (promo) => {
		console.log("savePromo");
		var savedPromo = {
			name: promo.name,
			store: promo.store,
			reg_price: promo.reg_price,
			discount_price: promo.discount_price,
			promo_end: promo.promo_end,
			uid: user,
			address: promo.address,
			phone: promo.phone
		};
		ProductFactory.saveUsersPromos(savedPromo);
	};
/////////////////////////////////////////////////////////
/////////////////Stretch for later:
////////////use for loops to build objects of promos, with each iteration test for the category value and store promo into corresponding objects.  These objects then need to be fed into the ng-repeat to make the table.  Figure out how to create tables without re-creating the <thead> with every iteration. Do I build the objects in this controller, like the above object? If so, how do I feed all the objects into the partial and the one instance of the ng-repeat? How do I effectively take advantage of the ng-if to control the tables? I think it could be used as part of the "testing" of the category values, but I don't know how that would look.  



	// ===== Scroll to Top...taken from CodePen ==== 
	$(window).scroll(function() {
	    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
	        $('#return-to-top').fadeIn(200);    // Fade in the arrow
	    } else {
	        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
	    }
	});
	$('#return-to-top').click(function() {      // When arrow is clicked
	    $('body,html').animate({
	        scrollTop : 0                       // Scroll to top of body
	    }, 500);
	});
});