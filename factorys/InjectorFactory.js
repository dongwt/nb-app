/**
 * 依赖注入服务
 */
define(['app'], function (app) {
  app.registerFactory("InjectorFactory",
    ["$injector", function ($injector) {

      /**常量定义**/
      var IONIC_DEPENDENCE = "ionic_dependence";//ionic所有依赖
      var CORDOVA_DEPENDENCE = "cordova_dependence";//cordova所有依赖
      var BASE_DEPENDENCE = "base_dependence";//项目基础依赖


      /**依赖定义**/

      //ionic所有依赖
      var ionicDependence = [
        "$ionicActionSheet", "$ionicBackdrop", "$ionicGesture", "$ionicScrollDelegate", "$ionicListDelegate",
        "$ionicLoading", "$ionicModal", "$ionicNavBarDelegate", "$ionicHistory", "$ionicPlatform", "$ionicPopover",
        "$ionicPopup", "$ionicSideMenuDelegate", "$ionicSlideBoxDelegate", "$ionicTabsDelegate", "$ionicConfigProvider",
        "$ionicPosition"
      ];

      //cordova所有依赖
      var cordovaDependence = [
        "$cordovaAppVersion", "$cordovaCamera", "$cordovaDevice", "$cordovaFile", "$cordovaFileTransfer",
        "$cordovaGeolocation", "$cordovaNetwork"
      ];


      // 项目基础依赖
      var baseDependence = [
        "$ionicActionSheet", "$ionicLoading", "$ionicModal", "$ionicHistory", "$ionicPlatform",
        "$ionicPopover", "$ionicPopup",
        "$state","$stateParams","$timeout","$log","$q",
        "HttpFactory"
      ];


      /**
       * 注入依赖
       * @param dependenceArr
       * @returns {*}
       */
      function injector(dependenceArr) {
        var result;
        //如果为数组类型
        if ((angular.isArray(dependenceArr))) {
          result = {};
          angular.forEach(dependenceArr, function (item) {
            result[item] = $injector.get(item);
          });
        } else if (angular.isString(dependenceArr)) {
          //如果为字符串类型
          result = $injector.get(dependenceArr);
        } else {
          //如果类型不正确
          result = "inject参数类型错误:" + dependenceArr + ".   请判断是否为string或array类型!";
          console.error(result);
        }

        return result;
      }


      /**
       * 获取依赖
       * @param dependence 类型:String 或 Array
       * @returns {*} 类型:String 或 Array
       */
      function getDependence(dependence) {
        var result;//返回结果

        switch (dependence) {
          //ionic所有依赖
          case IONIC_DEPENDENCE:
            result = injector(ionicDependence);
            break;
          //cordova所有依赖
          case CORDOVA_DEPENDENCE:
            result = injector(cordovaDependence);
            break;
          //项目基础依赖
          case BASE_DEPENDENCE:
            result = injector(baseDependence);
            break;
          default:
            result = injector(dependence);
        }
        return result;
      }


      return {
        IONIC_DEPENDENCE: IONIC_DEPENDENCE,//ionic所有依赖
        CORDOVA_DEPENDENCE: CORDOVA_DEPENDENCE,//cordova所有依赖
        BASE_DEPENDENCE: BASE_DEPENDENCE,//项目基础依赖
        getDependence: getDependence //获取依赖
      }
    }]);
});
