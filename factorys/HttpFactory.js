/**
 * 远程请求服务
 */
define(['app'], function (app) {
    app.registerFactory("HttpFactory", ["$http", "$q", "$timeout","$ionicLoading","$ionicPopup",
        function ($http, $q,$timeout, $ionicLoading,$ionicPopup) {

        /**
         * 远程的http请求
         * @param url 请求的地址
         * @param cache 是否缓存
         * @param headers 头部信息
         * @param data 请求参数
         * @returns {*}
         */
        function httpRequest(mothod, url, headers, data) {
            var defer = $q.defer();

            var config = {
                method: mothod,
                url: url,
                timeout:nbConfig.timeout
            };

            //判断请求方式
            if (mothod == 'get') {
                config.params = data;
            } else {
                config.data = data;
            }

            //判断header存在
            if (angular.isDefined(headers)) {
                config.headers = headers;
            }

            $http(config)
                .success(function (data) {
                    //如果status不存在或为0或为success，则表示成功
                    if (angular.isUndefined(data.status) || data.status == '0' || data.status == 'success') {
                        defer.resolve(data);
                    } else {
                        defer.reject(data);
                    }

                })
                .error(function (data, status, headers, config) {

                    if (status == 0) {

                        $ionicLoading.hide();

                        $ionicPopup.alert({
                            title: '温馨提醒',
                            template: "网络不给力,请检查网络!",
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    }else{
                        defer.reject(data);
                    }
                })
                .catch(function (error) {

                })
                .finally(function () {
                }
            );
            return defer.promise;
        }


        /**
         *get请求
         * @param url
         * @param cache
         * @param headers
         * @param data
         */
        function get(url, headers, data) {
            return httpRequest('get', url, headers, data);
        }

        /**
         *post请求
         * @param url
         * @param cache
         * @param headers
         * @param data
         */
        function post(url,headers, data) {
            return httpRequest('post', url,headers, data);
        }

        /**
         * put请求
         * @param url
         * @param cache
         * @param headers
         * @param data
         */
        function put(url,headers, data) {
            return httpRequest('put', url, headers, data);
        }


        return {
            get: get,
            post: post,
            put: put
        }
    }]);
});
