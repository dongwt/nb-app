/**
 * 设置模块
 */
define(['app'], function (app) {

  app.registerController("settingCtrl",
    ["$rootScope","$scope",function($rootScope,$scope){


      $scope.loginOut = function(){
        $scope.user.status = 0;
        $rootScope.CacheFactory.put("NB-USER",$scope.user);
        $rootScope.$ionicHistory.goBack();
      }

      function execute(){
        $scope.user = $rootScope.CacheFactory.get("NB-USER");
      }

      execute();


  }])

});
