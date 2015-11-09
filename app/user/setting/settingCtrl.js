/**
 * 设置模块
 */
define(['app'], function (app) {

  app.registerController("settingCtrl",
    ["$rootScope","$scope",function($rootScope,$scope){


      $scope.loginOut = function(){

        $rootScope.LoadingFactory.show();

        $rootScope.$http.get("/nb-web/user/client/loginOut",
          {
            headers:{
              auth: angular.toJson({accessToken:$scope.user.id})
            },
            params:{
              userName: $scope.user.userName
            }
          }
        ).then(
          function(data){
            $rootScope.LoadingFactory.hide();
            $scope.user.status = 0;
            $rootScope.CacheFactory.put("NB-USER",$scope.user);
            $rootScope.$ionicHistory.goBack();
          },
          function(error){
            if(error){
              $rootScope.LoadingFactory.show("退出失败请重试!",1000);
            }

          }
        );
      }

      function execute(){
        $scope.user = $rootScope.CacheFactory.get("NB-USER");
      }

      execute();


  }])

});
