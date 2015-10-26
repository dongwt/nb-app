/**
 * 注册模块
 */
define(['app'], function (app) {

  app.registerController("registerCtrl",
    ["$rootScope","$scope",function($rootScope,$scope){

      $scope.goStep1 = function(){
        $scope.step.CURRENT_STEP = $scope.step.STEP1;
      }

      $scope.goStep2 = function(){
        $scope.step.CURRENT_STEP = $scope.step.STEP2;

      }




      function execute(){

        $scope.registerUser = {
          email:"",
          password:"",
          code:""
        }

        $scope.step = {
          STEP1:1,
          STEP2:2,
          CURRENT_STEP:1
        }

      }

      execute();

  }])

});
