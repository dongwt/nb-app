/**
 * 用户模块
 */
define(['app'], function (app) {

  app.registerController("userCtrl",
    ["$rootScope","$scope",function($rootScope,$scope){

      function checkUserIsLogin(user){

        if($rootScope.CommonFactory.isEmpty(user)){

        }else{

        }


      }


      function execute(){
        $scope.user = $rootScope.CacheFactory.get("NB-USER");

        checkUserIsLogin($scope.user);
      }

      execute();





  }])

});
