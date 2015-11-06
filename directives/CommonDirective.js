/**
 * 速度仪指令
 */
define(['app'],
    function (app) {
        /**
         * 输入框自动获取焦点
         */
        app.registerDirective
        ("setFocus",
            ["$rootScope", "$timeout",
                function ($rootScope, $timeout) {
                    return {
                        restrict: 'A',
                        link: function ($scope, $element, $attr) {
                            $scope.$watch($attr.setFocus, function WatchFocus(value) {
                                //如果为true则获取焦点
                                if (value) {
                                    $timeout(
                                        function () {
                                            $element[0].focus();
                                        },
                                        1000
                                    );
                                } else {
                                    //如果为true则失去焦点
                                    $element[0].blur();
                                }
                            });
                        }
                    };
                }])

        /**
         * 自定义文本输入框
         */
        app.registerDirective
        ("bblrTextArea",
            [function () {
                return {
                    restrict: 'E',
                    template: '<div contenteditable="true"></div>',
                    replace: true,
                    require: 'ngModel',
                    link: function (scope, elm, attrs, ngModelController) {
                        elm.on('keyup', function () {
                            scope.$apply(function () {
                                ngModelController.$setViewValue(elm.html());
                            });
                        })

                        ngModelController.$render = function () {
                            elm.html(ngModelController.$viewValue);
                        }

                        ngModelController.$parsers.push(
                            function (value) {

                                return value;
                            }
                        );

                        ngModelController.$formatters.push(
                            function (value) {
                                return value;
                            }
                        );

                    }
                };
            }])


        /**
         * 隐藏底部导航栏
         */
        app.registerDirective('hideTabs', function($rootScope) {
            return {
                restrict: 'A',
                link: function(scope, element, attributes) {
                    scope.$on('$ionicView.beforeEnter', function() {
                        scope.$watch(attributes.hideTabs, function(value){
                            $rootScope.hideTabs = value;
                        });
                    });

                    scope.$on('$ionicView.beforeLeave', function() {
                        $rootScope.hideTabs = false;
                    });
                }
            };
        });
    })