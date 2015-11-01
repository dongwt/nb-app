/**
 * 设置模块
 */
define(['app'], function (app) {

  app.registerController("loginCtrl",
    ["$rootScope", "$scope","$http", function ($rootScope, $scope,$http) {


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

      /**
       * 检查字段是否为空
       * @param user
       * @returns {boolean}
       */
      function checkFieldsIsEmpty(user){
        if($rootScope.CommonFactory.isEmpty(user.userName)){
          $rootScope.LoadingFactory.show("用户名不能为空!",1000);
          return false;
        }

        if($rootScope.CommonFactory.isEmpty(user.password)){
          $rootScope.LoadingFactory.show("密码不能为空!",1000);
          return false;
        }

        return true;
      }

      $scope.generalLogin = function () {

        if(!checkFieldsIsEmpty($scope.loginUser)){
          return;
        }


        $rootScope.LoadingFactory.show();
        $http.post(
          "/nb-web/user/client/login",
          {
            nickname:$scope.loginUser.userName,
            passWord:$scope.loginUser.password
          }
        ).then(
          function(data){
            $scope.user = data.result;
            if(!$scope.user.img){
              $scope.user.img = "public/img/ionic.png";
            }
            $scope.user.status = 1;
            $rootScope.CacheFactory.put("NB-USER",$scope.user);
            $rootScope.$state.go("tabs.user");//登录成功转向用户中心
            $rootScope.LoadingFactory.hide();
          },
          function(data){
            if(data){
              $rootScope.LoadingFactory.show(data.error,1000);
            }
          }
        )
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
