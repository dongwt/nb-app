/**
 * 用户路由配置
 */
define(['public/js/app'],
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


          //.state('tabs', {//框架布局路由
          //  url: "/tabs",
          //  abstract: true,
          //  templateUrl: "app/main/main.html",
          //  controller: 'mainCtrl',
          //  resolve: {
          //    dummy: $couchPotatoProvider.resolveDependencies(['app/main/mainCtrl'])
          //  }
          //})


          $stateProvider
            .state('info', {//用户信息路由
              url: "/user/info",
              templateUrl: "app/user/info/info.html"
            })
            .state('setting', {//设置路由
              url: "/user/setting",
              templateUrl: "app/user/setting/setting.html"
            })



        }
      ]
    );

  });
