"use strict";

//login, logout, register, loginGoogle, clever conditional, authfactory

app.controller("LoginCtrl", function($scope, $window, AuthFactory, UserFactory, $location){
// console.log("LoginCtrl");
    //run these when controller loads
    $scope.account = {
        email: "",
        password: ""
    };


    let logout = () => {
        // console.log("logout clicked");
        AuthFactory.logoutUser()
        .then(function(data){
            // console.log("logged out?", data);
            $window.location.url = "#!/login";
        }, function(error){
            console.log("error occured on logout");
        });
    };//end of logout

    //when first loaded, make sure no one is logged in
    if(AuthFactory.isAuthenticated()){
        logout();
    }

    //setup functions to be available to the app for register, login email/password, and google
    $scope.register = () => {
        console.log("you clicked register");
        AuthFactory.createUser({
          email: $scope.account.email,
          password: $scope.account.password
        })
        .then( (userData) => {
          console.log("UserCtrl newUser:", userData );
          $scope.login();
        }, (error) => {
            console.log("Error creating user:", error);
        });
    };

    $scope.login = () => {
        console.log("you clicked login");
        AuthFactory
        .loginUser($scope.account)
        .then( () => {
            // $scope.isLoggedIn = true;
            // console.log("UserCtrl: user is loggedIn", $scope.isLoggedIn );
            // $scope.$apply();
            $window.location.href = "#!/home";
        });
    };

    $scope.loginGoogle = () => {
        // console.log("you clicked login with Google");
        AuthFactory.authWithProvider()
        .then(function(result) {
            var user = result.user.uid;
            var newName = result.user.displayName;
            console.log("logged in user name:", newName);
            $scope.newUser = {
              uid: user,
              name: newName
            };
            $window.location.href = "#!/home";
            // console.log("newUser", $scope.newUser);
            // $scope.$apply();
        }).catch(function(error) {
            // Handle the Errors.
            console.log("error with google login", error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

        });
    };

    $scope.addNewUser = (newUser) => {
      UserFactory.postNewUser(newUser)
      .then ( () => {
        $window.location.href = "#!/home";
      });
    };
});
