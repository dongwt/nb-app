/**
 * 项目的初始化配置
 */
define(['app'], function (app) {

  /**
   * ionic 的配置
   */
  app.config(['$ionicConfigProvider', '$ionicLoadingConfig',
    function ($ionicConfigProvider, $ionicLoadingConfig) {

      $ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.views.transition('ios');
      $ionicConfigProvider.tabs.style('standard');
      $ionicConfigProvider.navBar.alignTitle('center');
      $ionicConfigProvider.form.checkbox('square');
      $ionicConfigProvider.form.toggle('small');
      $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
      $ionicConfigProvider.backButton.text('');
      $ionicConfigProvider.backButton.previousTitleText(false);

      $ionicLoadingConfig.template = '<ion-spinner icon="bubbles" class="spinner-stable"></ion-spinner>';
    }]);

  /**
   * 框架配置
   */
  app.config(['$httpProvider',function($httpProvider){

    $httpProvider.interceptors.push('FrameHttpInterceptor');

  }]);


  /**
   * 路由状态的控制
   */
  app.run([ '$rootScope','InjectorFactory',function ($rootScope,InjectorFactory) {

      //获取基本的依赖服务,并放置于$rootScope下
      angular.extend($rootScope,InjectorFactory.getDependence(InjectorFactory.BASE_DEPENDENCE));

      //控制路由跳转
      $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {


        })
    }
  ]);


  /**
   * android端返回事件的处理
   */
  app.run(["$ionicPlatform", "$rootScope", "$ionicPopup", "$location",
    function ($ionicPlatform, $rootScope, $ionicPopup, $location) {



    }
  ]);

});
