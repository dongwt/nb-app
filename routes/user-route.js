/**
 * 用户路由配置
 */
define(['app'],
  function (app) {
    app.registerProvider(
      'user-route',
      [
        '$stateProvider',
        '$urlRouterProvider',
        '$couchPotatoProvider',
        function ($stateProvider, $urlRouterProvider, $couchPotatoProvider) {

          this.$get = function () {
            return {};
          };


          $stateProvider
            .state('register', {//注册路由
              url: "/user/register",
              templateUrl: "app/user/register/register.html",
              controller: 'registerCtrl',
              resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['app/user/register/registerCtrl'])
              }
            })
            .state('forgetPassword', {//忘记密码路由
              url: "/user/password/forger",
              templateUrl: "app/user/password/forgetPassword.html",
              controller: 'forgetPasswordCtrl',
              resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['app/user/password/passwordCtrl'])
              }
            })
            .state('login', {//登录路由
              url: "/user/login",
              templateUrl: "app/user/login/login.html",
              controller: 'loginCtrl',
              resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['app/user/login/loginCtrl'])
              }
            })

            .state('tabs.setting', {//设置路由
              url: "/user/setting",
              views: {
                'tab-user': {
                  templateUrl: "app/user/setting/setting.html",
                  controller: 'settingCtrl',
                  resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies(['app/user/setting/settingCtrl'])
                  }
                }
              }
            })


            .state('tabs.info', {//用户信息路由
              url: "/user/info",
              views: {
                'tab-user': {
                  templateUrl: "app/user/info/info.html",
                  controller: 'infoCtrl',
                  resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies(['app/user/info/infoCtrl'])
                  }
                }
              }
            })

            .state('tabs.editPassword', {//修改密码路由
              url: "/user/info/editPassword",
              views: {
                'tab-user': {
                  templateUrl: "app/user/password/editPassword.html",
                  controller: 'editPasswordCtrl',
                  resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies(['app/user/password/passwordCtrl'])
                  }
                }
              }
            })

        }
      ]
    );

  });
