/**
 * Created by seshasai on 11/3/2016.
 */


(function () {
    angular
        .module("TaPortal")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider

            // Student Profile
            .when("/sprofile",{
                templateUrl :"views/user/sprofile.view.client.html",
                controller: "SProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            // Student Register
            .when("/sregister",{
                templateUrl: "views/user/sregister.view.client.html",
                controller: "SRegisterController",
                controllerAs: "model"
                // ,
                // resolve: {
                //     freeView : freeView
                // }
            })

            // Home page is the login page
            .when("/home", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model"
            })

            // Any other error takes to login page
            .otherwise({
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model"
            });


        // $q is part of angularlibrary used to handle promises(asynchronous calls)
        function checkLoggedIn(UserService, $location, $q, $rootScope) {
            //deferred obj has promise
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(function (response) {
                    var user = response.data;
                    if(user=='0'){
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url("/login");
                    }else{
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                },function (err) {
                    $location.url("/login");
                });

            return deferred.promise;
        }

        function freeView (UserService, $location, $q, $rootScope) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        if(user == '0'){
                            deferred.resolve();
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }



    }
})();
