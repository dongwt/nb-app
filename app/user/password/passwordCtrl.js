/**
 * 密码模块
 */
define(['app'], function (app) {

  /**
   * 忘记密码
   */
  app.registerController("forgetPasswordCtrl",
    ["$rootScope", "$scope", function ($rootScope, $scope) {

      /**********************start 方法定义部分**********************/

      /**
       * 转向第一步
       */
      $scope.goStep1 = function () {
        $scope.step.CURRENT_STEP = $scope.step.STEP1;
      }

      /**
       * 转向第二步
       */
      $scope.goStep2 = function () {
        $scope.step.CURRENT_STEP = $scope.step.STEP2;

      }

      /**
       * 检查字段
       * @param user
       * @returns {boolean}
       */
      function checkFields(user) {
        if ($rootScope.CommonFactory.isEmpty(user.email)) {
          $rootScope.LoadingFactory.show("用户名不能为空!", 1000);
          return false;
        }

        if (!$rootScope.CommonFactory.isEmail(user.email)) {
          $rootScope.LoadingFactory.show("邮箱格式不正确!", 1000);
          return false;
        }

        if ($rootScope.CommonFactory.isEmpty(user.newPassword)) {
          $rootScope.LoadingFactory.show("新密码不能为空!", 1000);
          return false;
        }

        return true;
      }

      /**
       * 发送邮箱验证码
       */
      $scope.sendEmailCode = function () {

        if (!checkFields($scope.user)) {
          return;
        }

        $rootScope.LoadingFactory.show();

        //校验邮箱是否注册
        $rootScope.$http.get("/nb-web/user/client/emailIsExist",
          {
            params: {
              email: $scope.user.email
            }
          }
        ).then(
          function (data) {
            //邮箱不存在
            $rootScope.LoadingFactory.show("您输入的邮箱不正确!", 1000);
          },
          function (error) {
            //邮箱已经存在
            if (error) {
              $rootScope.$http.post("/nb-web/user/client/sendEmailCode/",
                {
                  email: $scope.user.email
                }).then(
                function (data) {
                  $rootScope.LoadingFactory.hide();
                  $rootScope.$log.debug("验证码发送成功!" + data);
                  $scope.auth.ordinaryToken = data.result.ordinaryToken;
                  $scope.goStep2(); //转向第二步

                },
                function (error) {
                  if (error) {
                    $rootScope.$log.debug(error);
                    $rootScope.LoadingFactory.show("验证码发送失败!", 1000);
                  }
                }
              )
            }
          }
        );


      }


      /**
       * 修改密码
       */
      $scope.commit = function () {

        if ($rootScope.CommonFactory.isEmpty($scope.user.code)) {
          $rootScope.LoadingFactory.show("验证码不能为空!", 1000);
          return;
        }

        $rootScope.LoadingFactory.show();
        $rootScope.$http.post("/nb-web/user/client/forgetPassword/",
          $scope.user,
          {
            headers: {
              auth: angular.toJson($scope.auth)
            }
          }
        ).then(
          function (data) {
            $rootScope.LoadingFactory.hide();
            $rootScope.$log.debug("注册成功!" + data);
            $rootScope.$state.go("login");//转向登录页面
          },
          function (error) {
            if (error) {
              $rootScope.$log.error("注册失败!" + error);
              $rootScope.LoadingFactory.show("注册失败！请重试！", 1000);
            }
          }
        )
      }


      /**********************end 方法定义部分**********************/


      /**********************start 代码执行部分**********************/

      function execute() {

        $scope.auth = {};

        $scope.user = {
          email: "",
          newPassword: "",
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

  /**
   * 修改密码
   */
  app.registerController("editPasswordCtrl",
    ["$rootScope", "$scope", function ($rootScope, $scope) {

      /**********************start 方法定义部分**********************/
      /**
       * 检查字段
       * @param user
       * @returns {boolean}
       */
      function checkFields(user) {
        if ($rootScope.CommonFactory.isEmpty(user.oldPassword)) {
          $rootScope.LoadingFactory.show("旧密码不能为空!", 1000);
          return false;
        }

        if ($rootScope.CommonFactory.isEmpty(user.newPassword)) {
          $rootScope.LoadingFactory.show("新密码不能为空!", 1000);
          return false;
        }

        if ($rootScope.CommonFactory.isEmpty(user.confirmPassword)) {
          $rootScope.LoadingFactory.show("确认密码不能为空!", 1000);
          return false;
        }

        return true;
      }



      /**
       * 修改密码
       */
      $scope.commit = function () {

        if (!checkFields($scope.user)) {
          return;
        }

        $rootScope.LoadingFactory.show();
        $rootScope.$http.post("/nb-web/user/client/editPassword/",
          $scope.user,
          {
            headers: {
              auth: angular.toJson($scope.auth)
            }
          }
        ).then(
          function (data) {
            $rootScope.LoadingFactory.hide();
            $rootScope.$log.debug("修改成功!" + data);
            $rootScope.$ionicHistory.goBack();
          },
          function (error) {
            if (error) {
              $rootScope.$log.error("修改失败!" + error);
              $rootScope.LoadingFactory.show(error.error, 1000);
            }
          }
        )
      }

      /**********************end 方法定义部分**********************/


      /**********************start 代码执行部分**********************/
      function execute() {

        $scope.cacheUser = $rootScope.CacheFactory.get("NB-USER");

        $scope.auth = {
          accessToken:$scope.cacheUser.id
        }

        $scope.user = {
          oldPassword:"",
          newPassword: "",
          confirmPassword: ""
        }
      }


      execute();
      /**********************end 代码执行部分**********************/


    }])

});
