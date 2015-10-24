/**
 * 主路由配置
 */
define(['app'],
  function (app) {
    app.registerProvider(
      'main-route',
      [
        '$stateProvider',
        '$urlRouterProvider',
        '$couchPotatoProvider',
        function ($stateProvider, $urlRouterProvider, $couchPotatoProvider) {

          this.$get = function () {
            return {};
          };

          //1.默认路由跳转
          $urlRouterProvider.otherwise("user/login");

          //.state('tabs', {//框架布局路由
          //  url: "/tabs",
          //  abstract: true,
          //  templateUrl: "app/main/main.html",
          //  controller: 'mainCtrl',
          //  resolve: {
          //    dummy: $couchPotatoProvider.resolveDependencies(['app/main/mainCtrl'])
          //  }
          //})


          //2.配置公共路由
          $stateProvider
            .state('tabs', {//框架布局路由
              url: "/tabs",
              templateUrl: "app/tabs/tabs.html"
            })


            .state('tabs.business', {//商家路由
              url: '/business',
              views: {
                'tab-business': {
                  templateUrl: 'app/business/list.html'
                }
              }
            })
            .state('tabs.orders', {//订单路由
              url: '/orders',
              views: {
                'tab-orders': {
                  templateUrl: 'app/orders/list.html'
                }
              }
            })

            .state('tabs.user', {//用户路由
              url: '/user',
              views: {
                'tab-user': {
                  templateUrl: 'app/user/index.html'
                }
              }
            })


        }
      ]
    );

  });
