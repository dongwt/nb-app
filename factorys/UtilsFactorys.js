/**
 * 工具服务
 */
define(['app'], function (app) {

  /**
   *加载窗体服务
   */
  app.registerFactory("LoadingFactory", ["$ionicLoading", "$timeout", function ($ionicLoading, $timeout) {

    /**
     * 显示加载窗体
     * @param template {string} 必填
     * @param millisecond {int} 选填
     */
    function show(template, millisecond) {
      var params = {};

      //如果该参数为string且不为""
      if (angular.isString(template) && "" != template) {
        params.template = template;
      }

      //如果该参数存在且为数字
      if (angular.isDefined(millisecond) && angular.isNumber(millisecond)) {
        params.duration = millisecond;
      }
      $ionicLoading.show(params);
    }

    /**
     * 隐藏加载窗体
     * @param millisecond {int} 选填
     */
    function hide(millisecond) {
      //如果该参数存在且为数字
      if (angular.isDefined(millisecond) && angular.isNumber(millisecond)) {
        $timeout(
          function () {
            $ionicLoading.hide();
          },
          millisecond
        );
      } else {
        $ionicLoading.hide();
      }
    }


    return {
      show: show,
      hide: hide
    }
  }]);


  /**
   * 缓存服务
   */
  app.registerFactory("CacheFactory", [function () {

    /**
     * 向缓存中保存数据
     * @param key
     * @param value
     */
    function put(key, value) {
      localStorage.setItem(key, typeof value == 'object' ? angular.toJson(value) : value);
    };


    /**
     * 从缓存中获取数据
     * @param key
     */
    function get(key) {
      var result = localStorage.getItem(key);
      //如果value存在
      if (angular.isDefined(result)) {
        try {
          result = angular.fromJson(result);
        } catch (exception) {
          console.log("从缓存中取出的结果为字符串!");
        }
      } else {
        //如果value不存在
        result = null;
      }
      return result;
    };


    /**
     * 从缓存中删除数据
     * @param key
     */
    function remove(key) {
      localStorage.removeItem(key);
    };

    /**
     * 清空所有缓存
     */
    function clear(){
      localStorage.clear()
    }


    return {
      put: put,//向缓存中保存数据
      get: get,//存缓存中获取数据
      remove: remove,//从缓存中删除数据
      clear:clear//清空所有缓存
    };
  }]);


  /**
   * 公共服务
   */
  app.registerFactory("CommonFactory", [function () {


    var mobileReg = /^13[0-9]{1}[0-9]{8}$|^15[0|3|6|8|9]{1}[0-9]{8}$|^18[6|8|9]{1}[0-9]{8}$|^1[3,5]{1}[0-9]{1}[0-9]{8}$/;//手机号的正则表达
    var telReg = /^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$/;//固话的正则表达
    var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;//邮箱的正则表达


    /**
     * 是否为手机号
     * @param phone 手机号码
     * @returns {boolean}
     */
    function isMobile(phone) {
      if (mobileReg.test(phone)) {
        return true;
      } else {
        return false;
      }

    }

    /**
     * 是否为固话
     * @param phone 固话
     * @returns {boolean}
     */
    function isTelephone(phone) {
      if (telReg.test(phone)) {
        return true;
      } else {
        return false;
      }

    }

    /**
     * 是否为邮箱
     * @param email
     * @returns {boolean}
     */
    function isEmail(email) {
      if (emailReg.test(email)) {
        return true;
      } else {
        return false;
      }

    }


    /**
     * 判断对象是否为空
     * @param obj
     * @returns {boolean}
     */
    function isEmpty(obj) {
      if (undefined == obj || "" == obj || null == obj) {
        return true;
      }
      return false;
    }


    /**
     * 格式化数组
     * @param orgArr 原始数组
     * @param length 每列的长度
     * @returns {Array} 格式化后的数组
     */
    function formatArr(orgArr, length) {
      var newArr = [];
      var tempArr = [];
      var tempOrgArr = orgArr;
      var totalLength = tempOrgArr.length;
      angular.forEach(tempOrgArr, function (item, index) {
        tempArr.push(item);
        //如果当前列的长度>=指定的长度  或  到了数组的末尾
        if (tempArr.length >= length || index == totalLength - 1) {
          newArr.push(tempArr);
          tempArr = [];
        }
      });
      return newArr;
    }


    /**
     * 产生随机数
     * @param len 长度
     * @param radix 基数
     * @returns {string}
     */
    function getUUID(len, radix) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var uuid = [], i;
      radix = radix || chars.length;

      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
      } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
          }
        }
      }

      return uuid.join('');
    }



    return {
      isMobile: isMobile,//是否为手机号
      isTelephone: isTelephone,//是否为固话
      isEmail: isEmail,//是否为邮箱
      isEmpty: isEmpty,//判断对象是否为空
      formatArr: formatArr,//格式化数组
      getUUID: getUUID//产生随机数
    };
  }]);

});
