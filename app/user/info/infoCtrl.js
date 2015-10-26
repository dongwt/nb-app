/**
 * 用户信息模块
 */
define(['app'], function (app) {

  app.registerController("infoCtrl",
    ["$rootScope","$scope",function($rootScope,$scope){

      $scope.loginOut = function(){
        $scope.user.status = 0;
        $rootScope.CacheFactory.put("NB-USER",$scope.user);
        $rootScope.$ionicHistory.goBack();
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
