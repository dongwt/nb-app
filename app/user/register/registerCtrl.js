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
            $scope.auth.ordinaryToken = data.result.ordinaryToken;
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


        $http.post( "/nb-web/user/client/register/",
          $scope.registerUser,
          {
            headers:{
              auth:angular.toJson($scope.auth)
            }
          }
        ).then(
          function(data){
            $rootScope.$state.go("login");
          },
          function(data){

          }
        )

      }




      function execute(){

        $scope.auth = {};//权限对象

        $scope.registerUser = {
          email:"",
          passWord:"",
          code:""
        }

      }

      execute();

  }])

});
