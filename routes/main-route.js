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
          $urlRouterProvider.otherwise("tabs/business");



          //2.配置公共路由
          $stateProvider
            .state('tabs', {//框架布局路由
              url: "/tabs",
              templateUrl: "app/tabs/tabs.html",
              controller: 'tabsCtrl',
              resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['app/tabs/tabsCtrl'])
              }
            })


            .state('tabs.business', {//商家路由
              url: '/business',
              views: {
                'tab-business': {
                  templateUrl: 'app/business/business.html'
                }
              },
            controller: 'businessCtrl',
            resolve: {
            dummy: $couchPotatoProvider.resolveDependencies(['app/business/businessCtrl'])
          }
            })
            .state('tabs.orders', {//订单路由
              url: '/orders',
              views: {
                'tab-orders': {
                  templateUrl: 'app/orders/orders.html'
                }
              },
              controller: 'ordersCtrl',
              resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['app/orders/ordersCtrl'])
              }
            })

            .state('tabs.user', {//用户路由
              url: '/user',
              views: {
                'tab-user': {
                  templateUrl: 'app/user/user.html'
                }
              },
              controller: 'userCtrl',
              resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['app/user/userCtrl'])
              }
            })


        }
      ]
    );

  });
