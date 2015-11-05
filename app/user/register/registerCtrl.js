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

        var auth = {ordinaryToken:"563b1e643004440824377d45"};

        $http.post( "/nb-web/user/client/register/",
          {
            email:"834575475@qq.com",
            passWord:"111111",
            code:"89630"
          },
          {
            headers:{
              auth:angular.toJson(auth)
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

        $scope.registerUser = {
          email:"",
          passWord:"",
          code:""
        }

      }

      execute();

  }])

});
