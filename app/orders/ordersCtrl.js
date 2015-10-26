/**
 * 订单模块
 */
define(['app'], function (app) {

  app.registerController("ordersCtrl",
    ["$rootScope","$scope",function($rootScope,$scope){

      function execute(){
        $scope.user = $rootScope.CacheFactory.get("NB-USER");
      }

      execute();



  }])

});
