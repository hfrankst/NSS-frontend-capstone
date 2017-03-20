'use strict';

app.factory("UserFactory", ($q, $http, FBCreds) => {

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

    return {postNewUser};
});
