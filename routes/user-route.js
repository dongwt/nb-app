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
              templateUrl: "app/user/register/register.html"
            })
            .state('login', {//登录路由
              url: "/user/login",
              templateUrl: "app/user/login/login.html"
            })
            .state('setting', {//设置路由
              url: "/user/setting",
              templateUrl: "app/user/setting/setting.html",
              controller: 'settingCtrl',
              resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['app/user/setting/settingCtrl'])
              }
            })
            .state('info', {//用户信息路由
              url: "/user/info",
              templateUrl: "app/user/info/info.html"
            })




        }
      ]
    );

  });
