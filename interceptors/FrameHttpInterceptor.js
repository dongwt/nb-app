/**
 * 框架拦截器
 */
define(['app'],
  function (app) {
    app.registerFactory("FrameHttpInterceptor", ['$q','$injector','FRAME', function ($q,$injector,FRAME) {


      function request(config) {
        config.isIntercept = false;//是否需要拦截
        if (config.url.indexOf("nb-web") != -1) {
          config.url = NBConfig.server_url + config.url;
          config.isIntercept = true;
          config.timeout = NBConfig.timeout;
        }

        return config;
      }

      function requestError(rejection) {

        //如果需要拦截
        if (rejection.config.isIntercept) {
          return $q.reject(rejection.data);

        }

        return $q.reject(rejection);
      }

      function response(response) {

        //如果需要拦截
        if (response.config.isIntercept) {
          switch (response.data.status){
            case FRAME.RESULT_FRAME.ERROR:
              return $q.reject(response.data);
              break;
            case FRAME.RESULT_FRAME.SUCCESS:
              return response.data;
              break;
            case FRAME.RESULT_FRAME.INVALID_TOKEN:
              return $q.reject(response.data);
              break;
            default : return response.data;
          }
        }

        return response;
      }

      function responseError(rejection) {
        //如果需要拦截
        if (rejection.config.isIntercept) {
          //连接超时
          if(rejection.status == 0){
            var $ionicLoading = $injector.get("$ionicLoading");
            $ionicLoading.show({
              template:"网络请求失败，请检查网络设置！",
              duration:1000,
              noBackdrop:true
            });
            return $q.reject(null);
          }else{
            return $q.reject(rejection.data);
          }

        }
        return $q.reject(rejection);
      }


      return {
        request: request,
        requestError: requestError,
        response: response,
        responseError: responseError
      }

    }])

  });
