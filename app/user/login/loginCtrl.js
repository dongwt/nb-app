/**
 * 设置模块
 */
define(['app'], function (app) {

  app.registerController("loginCtrl",
    ["$rootScope", "$scope", function ($rootScope, $scope) {


      /**
       * 选择登录方式
       * @param loginWay 0 邮件快捷登录 1 普通登录
       */
      $scope.selectLoginWay = function (loginWay) {
        switch (loginWay) {
          //普通登录
          case $scope.loginWays.GENERAL_LOGIN:
            $scope.loginWays.CURRENT_LOGIN = $scope.loginWays.GENERAL_LOGIN;
            $scope.loginUser.userName = "";
            $scope.loginUser.password = "";
            break;
          //邮件快捷登录
          case $scope.loginWays.SHORTCUT_LOGIN:
            $scope.loginWays.CURRENT_LOGIN = $scope.loginWays.SHORTCUT_LOGIN;
            $scope.goStep1();
            break;
        }

      }


      /**********************************start 邮件快捷登录**********************************/

      $scope.goStep1 = function(){
        $scope.shortcutSteps.CURRENT_STEP = $scope.shortcutSteps.STEP1;
        $scope.loginUser.mobilePhone = "";
        $scope.loginUser.code = "";
      }

      $scope.goStep2 = function(){
        $scope.shortcutSteps.CURRENT_STEP = $scope.shortcutSteps.STEP2;
      }

      $scope.shortcutLogin = function(){

      }



      function executeShortcut() {

        $scope.shortcutSteps = {
          STEP1: 1,
          STEP2: 2,
          CURRENT_STEP: 1
        }

        $scope.goStep1();

      }

      /**********************************end 邮件快捷登录************************************/

      /**********************************start 普通登录************************************/

      $scope.generalLogin = function () {

      }


      function executeGeneral() {


      }

      /**********************************end 普通登录**************************************/




      function execute() {

        $scope.loginUser = {
          userName: "",
          password: "",
          mobilePhone: "",
          code: ""
        }

        $scope.loginWays = {
          SHORTCUT_LOGIN: 0,//邮件快捷登录
          GENERAL_LOGIN: 1,//普通登录
          CURRENT_LOGIN: 0//当前的登录方式
        }

        //邮箱快捷登录
        executeShortcut();

        //普通登录
        executeGeneral();

      }

      //代码执行部分
      execute();


    }])

});
