/**
 * 项目入口
 */
require.config({

    baseUrl: '',

    paths: {
        "angular":"lib/ionic/js/ionic.bundle.min",
        "angular-couch-potato": "lib/angular-couch-potato/angular-couch-potato",
        "ngCordova": "lib/ngCordova/dist/ng-cordova.min"
    },

    //为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置
    shim: {
        'angular': {
            exports:'angular'
        },
        'ngCordova': {
            deps:['angular']
        }
    },

    waitSeconds: 1000//加载1个js文件最多等待多长时间

});


var nbConfig = "";//全局的配置信息

require(['angular','public/js/app','config/config','public/js/app-init'], function (angular,app,config) {

    nbConfig = config;

    // 页面加载完成后,再加载模块
    angular.element(document).ready(function () {

        //模块的手动加载
        angular.bootstrap(document, [app['name'], function () {
            angular.element(document).find('html').addClass('ng-app');
        }]);

    });

});
