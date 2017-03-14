'use strict';

app.factory("UserFactory", ($q, $http, FBCreds) => {
  let checkNewUser = (newUser) => {
    return $q((resolve, reject) => {
      $http.get(`${FBCreds.databaseURL}/products.json`)
      .then((userObject) => {
        console.log("userObject coming back from $http getter", userObject.data);
        let userCollection = Object.keys(userObject.data);
        console.log('userCollection: ', userCollection);
        resolve(userCollection);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

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




  return {postNewUser, checkNewUser};
});
