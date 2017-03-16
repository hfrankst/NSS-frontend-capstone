"use strict";

var app = angular.module("Bargains", ["ngRoute"]);

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  // console.log("running isAuth");
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
    console.log("userExists", userExists);
        if (userExists){
      console.log("Authenticated, go ahead.");
            resolve();
        }else {
      console.log("Authentication rejected, go away.");
            reject();
        }
    });
});


app.config(function($routeProvider){
	$routeProvider.
	when('/', {
		templateUrl: '/partials/login.html',
		controller: "LoginCtrl"
	}).
	when('/home', {
		templateUrl: '/partials/home.html',
		controller: "HomeCtrl",
		resolve: {isAuth}
	}).
	when('/profile', {
		templateUrl: '/partials/profile.html',
		controller: "ProfileCtrl",
		resolve: {isAuth}
	}).
	when('/map', {
		templateUrl: '/partials/map.html',
		controller: "MapCtrl",
		resolve: {isAuth}
	}).
	otherwise('/');
});


//run when the app loads
app.run(($location, FBCreds) => {
   let creds = FBCreds;
   let authConfig = {
      apiKey: creds.apiKey,
      authDomain: creds.authDomain,
      databaseURL: creds.databaseURL
   };

   firebase.initializeApp(authConfig);
});
