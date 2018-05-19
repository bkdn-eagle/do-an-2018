// Initialize the Firebase SDK
var config = {
    apiKey: "AIzaSyB4EoIu8YQU7zyAJDHMvHBBifRbC5GpcYI",
    authDomain: "doantotnghiep-6755e.firebaseapp.com",
    databaseURL: "https://doantotnghiep-6755e.firebaseio.com",
    projectId: "doantotnghiep-6755e",
    storageBucket: "doantotnghiep-6755e.appspot.com",
    messagingSenderId: "19235158231"
};
firebase.initializeApp(config);

var app = angular.module("App", ["firebase"]);

app.controller("AppController", function($scope, $firebaseArray) {
    var ref = firebase.database().ref('thanhviens');
    // download the data into a local object
    $scope.member = $firebaseArray(ref);
    console.log($scope.member)
    var memberCount = 0;
    angular.forEach($scope.member, function(val, key) {
        memberCount++;
    });
    $scope.memberCount = memberCount;
    console.log($scope.memberCount)

    var ref = firebase.database().ref('quanans');
    // download the data into a local object
    $scope.food_store = $firebaseArray(ref);
    console.log($scope.food_store)
    $scope.foodStoreCount = 0;
    angular.forEach($scope.food_store, function(val, key) {
        foodStoreCount++;
        $scope.foodStoreCount = foodStoreCount;
        console.log($scope.foodStoreCount)
    });
    // $scope.foodStoreCount = foodStoreCount;
    

    var ref = firebase.database().ref('quanlytienichs');
    // download the data into a local object
    $scope.utility = $firebaseArray(ref);
    console.log($scope.utility)
    var utilityCount = 0;
    angular.forEach($scope.utility, function(val, key) {
        utilityCount++;
    });
    $scope.utilityCount = utilityCount;
    console.log($scope.utilityCount)
});