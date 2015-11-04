/**
 * 注册模块
 */
define(['app'], function (app) {

  app.registerController("registerCtrl",
    ["$rootScope","$scope","$http",function($rootScope,$scope,$http){


      /**
       * 发送验证码
       */
      $scope.sendEmailCode = function(){
        $http.post("/nb-web/user/client/sendEmail/",
          {
            email:$scope.registerUser.email
          }).then(
          function(data){

          },
          function(error){

            if(error){

            }

          }
        )
      }


      /**
       * 注册
       */
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

      }

      execute();

  }])

});
