"use strict";

app.controller("LoginCtrl", function($scope, $window, AuthFactory, UserFactory, $location, ProductFactory){

    //creates the account object for the login creds to be put in
    $scope.account = {
        email: "",
        password: ""
    };


    let logout = () => {
        AuthFactory.logoutUser()
        .then(function(data){
            $window.location.url = "#!/login";
        }, function(error){
            console.log("error occured on logout");
        });
    };
    //when first loaded, make sure no one is logged in
    if(AuthFactory.isAuthenticated()){
        logout();
    }

//////////////////////////////////////////////////////////
/////////////////LOGIN FUNCTIONS//////////////////////////
//////////////////////////////////////////////////////////

    $scope.register = () => {
        console.log("you clicked register");
        AuthFactory.createUser({
          email: $scope.account.email,
          password: $scope.account.password
        })
        .then( (userData) => {
          console.log("UserCtrl newUser:", userData);
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
            $window.location.href = "#!/home";
        });
    };

    $scope.loginGoogle = () => {
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
        }).catch(function(error) {
            // Handle the Errors.
            console.log("error with google login", error);
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
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
