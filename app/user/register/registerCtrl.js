/**
 * 注册模块
 */
define(['app'], function (app) {

  app.registerController("registerCtrl",
    ["$rootScope","$scope","$http",function($rootScope,$scope,$http){

      $scope.goStep1 = function(){
        $scope.step.CURRENT_STEP = $scope.step.STEP1;
      }

      $scope.goStep2 = function(){
        //$scope.step.CURRENT_STEP = $scope.step.STEP2;


        $http.post( "/nb-web/user/client/sendEmail",
          {
            email:$scope.registerUser.email,
            passWord:$scope.registerUser.password
          },
          {
            headers:{
              "access-token":"11"
            }
          }
        ).then(
          function(data){

          },
          function(data){

          }
        )


      }

      $scope.register = function(){

        $http.get( "/nb-web/user/client/register/" + $scope.registerUser.code).then(
          function(data){
            $rootScope.$state.go("login");
          },
          function(data){

          }
        )

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
