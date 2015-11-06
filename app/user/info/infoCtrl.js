/**
 * 用户信息模块
 */
define(['app'], function (app) {

  app.registerController("infoCtrl",
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


      $scope.showActionSheetForUserImg = function(){

        $rootScope.$ionicActionSheet.show({
          buttons: [
            { text: '拍照' },
            { text: '从手机相册选取' }
          ],
          cancelText: '取消',
          cancel: function() {
          },
          buttonClicked: function(index) {
            return true;
          }
        });


      }


       function execute(){
         $scope.user = $rootScope.CacheFactory.get("NB-USER");
       }

      execute();





  }])

});
