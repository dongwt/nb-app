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

      function goStep1(){
        $scope.shortcutSteps.CURRENT_STEP = $scope.shortcutSteps.STEP1;
        $scope.loginUser.mobilePhone = "";
        $scope.loginUser.code = "";
      }

      function goStep2(){
        $scope.shortcutSteps.CURRENT_STEP = $scope.shortcutSteps.STEP2;
      }

      /**
       * 检查字段(快捷登录)
       * @param user
       * @returns {boolean}
       */
      function checkFieldsForShortcut(user){
        if($rootScope.CommonFactory.isEmpty(user.email)){
          $rootScope.LoadingFactory.show("邮箱不能为空!",1000);
          return false;
        }

        if(!$rootScope.CommonFactory.isEmail(user.email)){
          $rootScope.LoadingFactory.show("邮箱格式不正确!",1000);
          return false;
        }

        return true;
      }


      /**
       * 发送邮箱验证码
       */
      $scope.sendEmailCode = function () {

        if(!checkFieldsForShortcut($scope.loginUser)){
          return;
        }

        //校验邮箱是否注册
        $rootScope.$http.get("/nb-web/user/client/emailIsExist",
          {
            params:{
              email: $scope.loginUser.email
            }
          }
        ).then(
          function (data) {
            //邮箱不存在
            $rootScope.LoadingFactory.show("邮箱未注册，请先注册！",1000);
          },
          function (error) {
            //邮箱已经存在
            if (error) {
              $rootScope.$http.post("/nb-web/user/client/sendEmailCode/",
                {
                  email: $scope.loginUser.email
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
            }
          }
        );


      }

      $scope.shortcutLogin = function(){

        if($rootScope.CommonFactory.isEmpty($scope.loginUser.code)){
          $rootScope.LoadingFactory.show("验证码不能为空!",1000);
          return false;
        }

        $rootScope.LoadingFactory.show();
        $http.post(
          "/nb-web/user/client/shortcutLogin",
          $scope.loginUser,
          {
           headers:{
             auth: angular.toJson($scope.auth)
           }
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



      function executeShortcut() {

        $scope.auth = {};

        $scope.shortcutSteps = {
          STEP1: 1,
          STEP2: 2,
          CURRENT_STEP: 1
        }

        goStep1();

      }

      /**********************************end 邮件快捷登录************************************/

      /**********************************start 普通登录************************************/

      /**
       * 检查字段(普通登录)
       * @param user
       * @returns {boolean}
       */
      function checkFieldsForGeneral(user){
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

        if(!checkFieldsForGeneral($scope.loginUser)){
          return;
        }


        $rootScope.LoadingFactory.show();
        $http.post(
          "/nb-web/user/client/generalLogin",
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
