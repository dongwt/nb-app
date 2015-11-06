/**
 * 注册模块
 */
define(['app'], function (app) {

  app.registerController("registerCtrl",
    ["$rootScope", "$scope", function ($rootScope, $scope) {

      /**********************start 方法定义部分**********************/

      /**
       * 转向第一步
       */
      function goStep1() {
        $scope.step.CURRENT_STEP = $scope.step.STEP1;
      }

      /**
       * 转向第二步
       */
      function goStep2() {
        $scope.step.CURRENT_STEP = $scope.step.STEP2;

      }

      /**
       * 发送邮箱验证码
       */
      $scope.sendEmailCode = function () {

        //校验邮箱是否注册
        $rootScope.$http.get("/nb-web/user/client/emailIsExist",
          {
            params:{
              email: $scope.registerUser.email
            }
          }
        ).then(
          function (data) {
            //邮箱不存在
            $rootScope.$http.post("/nb-web/user/client/sendEmailCode/",
              {
                email: $scope.registerUser.email
              }).then(
              function (data) {
                $rootScope.$log.debug("验证码发送成功!" + data);
                $scope.auth.ordinaryToken = data.result.ordinaryToken;
                goStep2(); //转向第二步

              },
              function (error) {
                if (error) {
                  $rootScope.$log.debug(error);
                  $rootScope.LoadingFactory.show("验证码发送失败!",1000);
                }
              }
            )

          },
          function (error) {
            //邮箱已经存在
            if (error) {
              $rootScope.LoadingFactory.show(error.error,1000);

            }
          }
        );


      }


      /**
       * 注册
       */
      $scope.register = function () {
        $rootScope.$http.post("/nb-web/user/client/register/",
          $scope.registerUser,
          {
            headers: {
              auth: angular.toJson($scope.auth)
            }
          }
        ).then(
          function (data) {
            $rootScope.$log.debug("注册成功!" + data);
            $rootScope.$state.go("login");//转向登录页面
          },
          function (error) {
            if (error) {
              $rootScope.$log.error("注册失败!" + error);
              $rootScope.LoadingFactory.show("注册失败！请重试！",1000);
            }
          }
        )
      }


      /**********************end 方法定义部分**********************/


      /**********************start 代码执行部分**********************/

      function execute() {

        $scope.auth = {};

        $scope.registerUser = {
          email: "",
          passWord: "",
          code: ""
        }

        $scope.step = {
          STEP1: 1,
          STEP2: 2,
          CURRENT_STEP: 1
        }

      }

      //程序执行入口
      execute();

      /**********************end 代码执行部分**********************/

    }])

});
