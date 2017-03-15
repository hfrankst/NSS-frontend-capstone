'use strict';

app.factory("UserFactory", ($q, $http, FBCreds) => {
  let checkIfUserExists = (newUser) => {
    return $q((resolve, reject) => {
      $http.get(`${FBCreds.databaseURL}/products.json`)
      .then((userObject) => {
        // console.log("userObject coming back from $http getter", userObject.data);
        let userCollection = userObject.data;
        // console.log('the first item in userCollection: ', userCollection[0]);
        resolve(userCollection);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

//walk through this to see if it is necessary, or needs to be refactored. I'm not sure I need to post a new user to FB
  let postNewUser = (newUser) =>  {
    return $q((resolve, reject) => {
      $http.post(`${FBCreds.databaseURL}/products.json`,
        JSON.stringify(newUser))
      .then((ObjectFromFirebase) => {
        resolve(ObjectFromFirebase);
        })
      .catch((error) => {
        reject(error);
          });
      });
  };




  return {postNewUser, checkIfUserExists};
});
